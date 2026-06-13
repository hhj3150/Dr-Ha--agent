"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Msg {
  role: "user" | "assistant";
  content: string;
  agentLabel?: string;
  agentKey?: string;
}

interface AgentInfo {
  key: string;
  label: string;
  blurb: string;
}

const EXAMPLES = [
  "내 사업 전체를 우선순위화하고 이번 분기 30/90일 액션플랜 만들어줘",
  "경기도 5년 102.3억 AI 축산행정 플랫폼 제안서 개념서 v1 써줘",
  "피트모스 낙농가 제안서 + ROI 표 만들어줘",
  "산자부 이번 달 진도보고서 + 성과지표 정리해줘",
];

export default function Page() {
  const [authed, setAuthed] = useState(false);
  const [needAuth, setNeedAuth] = useState(false);
  const [checking, setChecking] = useState(true);

  // 시작 시 비밀번호 필요 여부 확인 (저장된 비번으로 자동 통과 시도)
  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem("ha_pw") || ""
        : "";
    fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json", "x-app-password": saved },
      body: JSON.stringify({ messages: [] }),
    }).then((r) => {
      if (r.status === 401) {
        setNeedAuth(true);
        setAuthed(false);
      } else {
        setAuthed(true);
      }
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <div className="gate">
        <div className="typing">불러오는 중…</div>
      </div>
    );
  }

  if (needAuth && !authed) {
    return <Gate onPass={() => setAuthed(true)} />;
  }

  return <Chat />;
}

function Gate({ onPass }: { onPass: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setErr("");
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json", "x-app-password": pw },
      body: JSON.stringify({ messages: [] }),
    });
    setBusy(false);
    if (r.status === 401) {
      setErr("비밀번호가 올바르지 않습니다.");
      return;
    }
    window.localStorage.setItem("ha_pw", pw);
    onPass();
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <div style={{ fontSize: 30 }}>🐮</div>
        <h2>하실장 비서실</h2>
        <p>접속 비밀번호를 입력하세요.</p>
        {err && <div className="err">{err}</div>}
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="비밀번호"
          autoFocus
        />
        <button onClick={submit} disabled={busy}>
          {busy ? "확인 중…" : "입장"}
        </button>
      </div>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [agentKey, setAgentKey] = useState<string>(""); // "" = 자동 배정
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then((d) => setAgents(d.agents || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || busy) return;

    const pw =
      typeof window !== "undefined"
        ? window.localStorage.getItem("ha_pw") || ""
        : "";

    const nextMsgs: Msg[] = [...messages, { role: "user", content }];
    setMessages(nextMsgs);
    setInput("");
    setBusy(true);

    // 답변 자리표시자
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json", "x-app-password": pw },
        body: JSON.stringify({
          messages: nextMsgs.map((m) => ({ role: m.role, content: m.content })),
          agentKey: agentKey || null,
        }),
      });

      const label = decodeURIComponent(res.headers.get("x-agent-label") || "");
      const key = res.headers.get("x-agent-key") || "";

      if (!res.body) throw new Error("응답 본문이 없습니다.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      // 라벨 먼저 반영
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "",
          agentLabel: label,
          agentKey: key,
        };
        return copy;
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            content: acc,
          };
          return copy;
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "오류가 발생했습니다.";
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: `⚠️ 오류: ${msg}`,
        };
        return copy;
      });
    } finally {
      setBusy(false);
      taRef.current?.focus();
    }
  }

  function download(content: string, label?: string) {
    const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
    const base = (heading || label || "하실장-문서").replace(/[\\/:*?"<>|]/g, "");
    const stamp = new Date().toISOString().slice(0, 10);
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${base}_${stamp}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">河</div>
        <div>
          <h1>하실장 비서실</h1>
          <div className="sub">D2O · 17개 전문 에이전트 자동 배정</div>
        </div>
        <div className="spacer" />
        <select
          className="agent-select"
          value={agentKey}
          onChange={(e) => setAgentKey(e.target.value)}
          title="에이전트 직접 지정 (기본: 자동 배정)"
        >
          <option value="">🤖 자동 배정</option>
          {agents.map((a) => (
            <option key={a.key} value={a.key}>
              {a.label}
            </option>
          ))}
        </select>
      </header>

      <div className="messages" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="empty">
            <h2>회장님, 무엇부터 챙겨드릴까요?</h2>
            <p>
              평소 말로 지시하시면 가장 알맞은 에이전트가 자동 배정되어
              <br />
              바로 쓸 수 있는 실행 문서를 만들어드립니다.
            </p>
            <div className="examples">
              {EXAMPLES.map((ex) => (
                <button key={ex} onClick={() => send(ex)}>
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.role === "assistant" && m.agentLabel && (
                <span className="agent-tag">{m.agentLabel}</span>
              )}
              <div className="bubble">
                {m.role === "assistant" ? (
                  m.content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    <span className="typing">작성 중…</span>
                  )
                ) : (
                  m.content
                )}
              </div>
              {m.role === "assistant" && m.content && !busy && (
                <div className="msg-actions">
                  <button onClick={() => navigator.clipboard.writeText(m.content)}>
                    복사
                  </button>
                  <button onClick={() => download(m.content, m.agentLabel)}>
                    문서 다운로드 (.md)
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="composer">
        <textarea
          ref={taRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="지시사항을 입력하세요. (Enter 전송 · Shift+Enter 줄바꿈)"
          rows={1}
        />
        <button className="send" onClick={() => send()} disabled={busy}>
          {busy ? "…" : "전송"}
        </button>
      </div>
    </div>
  );
}
