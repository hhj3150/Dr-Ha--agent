"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Msg {
  role: "user" | "assistant";
  content: string;
  agentLabel?: string;
  agentKey?: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Msg[];
  createdAt: number;
  updatedAt: number;
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

const STORE_KEY = "ha_conversations_v1";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function newConversation(): Conversation {
  const now = Date.now();
  return { id: uid(), title: "새 대화", messages: [], createdAt: now, updatedAt: now };
}

/* ───────────────────────── 인증 게이트 ───────────────────────── */
export default function Page() {
  const [authed, setAuthed] = useState(false);
  const [needAuth, setNeedAuth] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? window.localStorage.getItem("ha_pw") || "" : "";
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
  if (needAuth && !authed) return <Gate onPass={() => setAuthed(true)} />;
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

/* ───────────────────────── 메인 채팅 ───────────────────────── */
function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentId, setCurrentId] = useState<string>("");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [agentKey, setAgentKey] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOK, setVoiceOK] = useState(false);
  const [attachments, setAttachments] = useState<
    { name: string; mediaType: string; data: string }[]
  >([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const loaded = useRef(false);

  const MAX_FILE = 4.5 * 1024 * 1024; // 4.5MB/파일

  /* 저장된 대화 불러오기 (최초 1회) */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      const saved: Conversation[] = raw ? JSON.parse(raw) : [];
      if (saved.length > 0) {
        setConversations(saved);
        setCurrentId(saved[0].id);
      } else {
        const c = newConversation();
        setConversations([c]);
        setCurrentId(c.id);
      }
    } catch {
      const c = newConversation();
      setConversations([c]);
      setCurrentId(c.id);
    }
    loaded.current = true;
  }, []);

  /* 대화 변경 시 자동 저장 */
  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(conversations));
    } catch {
      /* 저장 용량 초과 등은 무시 */
    }
  }, [conversations]);

  /* 에이전트 목록 */
  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then((d) => setAgents(d.agents || []))
      .catch(() => {});
  }, []);

  /* 음성 인식 준비 (브라우저 지원 시) */
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = "ko-KR";
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let transcript = "";
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    setVoiceOK(true);
    return () => {
      try {
        rec.stop();
      } catch {}
    };
  }, []);

  const current = useMemo(
    () => conversations.find((c) => c.id === currentId),
    [conversations, currentId]
  );
  const messages = current?.messages ?? [];

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const patchCurrent = useCallback(
    (updater: (c: Conversation) => Conversation) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === currentId ? updater(c) : c))
      );
    },
    [currentId]
  );

  function startNew() {
    const c = newConversation();
    setConversations((prev) => [c, ...prev]);
    setCurrentId(c.id);
    setSidebarOpen(false);
    setInput("");
  }

  function selectConversation(id: string) {
    setCurrentId(id);
    setSidebarOpen(false);
  }

  function deleteConversation(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setConversations((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (next.length === 0) {
        const c = newConversation();
        setCurrentId(c.id);
        return [c];
      }
      if (id === currentId) setCurrentId(next[0].id);
      return next;
    });
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(",")[1] || "");
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ];
    for (const file of Array.from(files)) {
      if (!allowed.includes(file.type)) {
        alert(`지원하지 않는 형식입니다: ${file.name}\n(PDF·PNG·JPG·GIF·WEBP만 가능)`);
        continue;
      }
      if (file.size > MAX_FILE) {
        alert(`파일이 너무 큽니다(4.5MB 초과): ${file.name}`);
        continue;
      }
      const data = await fileToBase64(file);
      setAttachments((prev) => [...prev, { name: file.name, mediaType: file.type, data }]);
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeAttachment(idx: number) {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  }

  function toggleVoice() {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (listening) {
      rec.stop();
      setListening(false);
    } else {
      try {
        rec.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  }

  async function send(text?: string) {
    const content = (text ?? input).trim();
    const atts = attachments;
    if ((!content && atts.length === 0) || busy || !currentId) return;
    if (listening) toggleVoice();

    const pw = window.localStorage.getItem("ha_pw") || "";
    const userText = content || "첨부한 파일을 검토하고 핵심을 정리해줘.";
    const note = atts.length ? `\n\n📎 첨부: ${atts.map((a) => a.name).join(", ")}` : "";
    const displayContent = userText + note;
    const baseMsgs: Msg[] = [...messages, { role: "user", content: displayContent }];

    // 사용자 메시지 + 답변 자리표시자 추가, 첫 메시지면 제목 설정
    patchCurrent((c) => ({
      ...c,
      title: c.messages.length === 0 ? displayContent.slice(0, 24) : c.title,
      messages: [...baseMsgs, { role: "assistant", content: "" }],
      updatedAt: Date.now(),
    }));
    setInput("");
    setAttachments([]);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json", "x-app-password": pw },
        body: JSON.stringify({
          messages: baseMsgs.map((m) => ({ role: m.role, content: m.content })),
          agentKey: agentKey || null,
          attachments: atts,
        }),
      });

      const label = decodeURIComponent(res.headers.get("x-agent-label") || "");
      const key = res.headers.get("x-agent-key") || "";
      if (!res.body) throw new Error("응답 본문이 없습니다.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      patchCurrent((c) => {
        const copy = [...c.messages];
        copy[copy.length - 1] = { role: "assistant", content: "", agentLabel: label, agentKey: key };
        return { ...c, messages: copy };
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        patchCurrent((c) => {
          const copy = [...c.messages];
          copy[copy.length - 1] = { ...copy[copy.length - 1], content: acc };
          return { ...c, messages: copy, updatedAt: Date.now() };
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "오류가 발생했습니다.";
      patchCurrent((c) => {
        const copy = [...c.messages];
        copy[copy.length - 1] = { role: "assistant", content: `⚠️ 오류: ${msg}` };
        return { ...c, messages: copy };
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
    <div className="layout">
      {/* 사이드바 */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="new-chat" onClick={startNew}>
          ＋ 새 대화
        </button>
        <div className="conv-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`conv-item ${c.id === currentId ? "active" : ""}`}
              onClick={() => selectConversation(c.id)}
            >
              <span className="conv-title">{c.title || "새 대화"}</span>
              <button
                className="conv-del"
                title="삭제"
                onClick={(e) => deleteConversation(c.id, e)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="sidebar-foot">대화는 이 기기에 자동 저장됩니다.</div>
      </aside>
      {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)} />}

      {/* 본문 */}
      <div className="app">
        <header className="header">
          <button className="hamburger" onClick={() => setSidebarOpen((v) => !v)} title="대화 목록">
            ☰
          </button>
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
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                    ) : (
                      <span className="typing">작성 중…</span>
                    )
                  ) : (
                    m.content
                  )}
                </div>
                {m.role === "assistant" && m.content && !busy && (
                  <div className="msg-actions">
                    <button onClick={() => navigator.clipboard.writeText(m.content)}>복사</button>
                    <button onClick={() => download(m.content, m.agentLabel)}>
                      문서 다운로드 (.md)
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {attachments.length > 0 && (
          <div className="attach-strip">
            {attachments.map((a, i) => (
              <span className="chip" key={i}>
                {a.mediaType === "application/pdf" ? "📄" : "🖼️"} {a.name}
                <button onClick={() => removeAttachment(i)} title="제거">
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="composer">
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf,image/png,image/jpeg,image/gif,image/webp"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            className="attach"
            onClick={() => fileRef.current?.click()}
            title="문서·이미지 첨부 (PDF·이미지)"
          >
            📎
          </button>
          {voiceOK && (
            <button
              className={`mic ${listening ? "on" : ""}`}
              onClick={toggleVoice}
              title="음성으로 지시"
            >
              {listening ? "■" : "🎤"}
            </button>
          )}
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
            placeholder={
              listening
                ? "듣고 있습니다… 말씀하세요."
                : "지시사항을 입력하세요. (Enter 전송 · Shift+Enter 줄바꿈)"
            }
            rows={1}
          />
          <button className="send" onClick={() => send()} disabled={busy}>
            {busy ? "…" : "전송"}
          </button>
        </div>
      </div>
    </div>
  );
}
