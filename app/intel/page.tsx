"use client";

import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function IntelPage() {
  const [dates, setDates] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [authErr, setAuthErr] = useState(false);

  const pw = () =>
    typeof window !== "undefined" ? window.localStorage.getItem("ha_pw") || "" : "";

  const loadList = useCallback(async () => {
    const r = await fetch("/api/intel/reports", {
      headers: { "x-app-password": pw() },
    });
    if (r.status === 401) {
      setAuthErr(true);
      return;
    }
    const d = await r.json();
    setDates(d.dates || []);
    if ((d.dates || []).length && !current) loadReport(d.dates[0]);
  }, [current]);

  async function loadReport(date: string) {
    setCurrent(date);
    const r = await fetch(`/api/intel/reports?date=${date}`, {
      headers: { "x-app-password": pw() },
    });
    if (r.ok) {
      const d = await r.json();
      setReport(d.report || "");
    }
  }

  async function generate() {
    setBusy(true);
    setStatus("검색하고 분석하는 중입니다… (최대 1~2분)");
    try {
      const r = await fetch("/api/intel/generate", {
        method: "POST",
        headers: { "x-app-password": pw() },
      });
      const d = await r.json();
      if (d.ok) {
        setStatus(
          d.searchUsed
            ? `리포트 생성 완료 (신규 후보 ${d.itemCount}건)`
            : "검색 API 키가 없어 안내 리포트만 생성되었습니다."
        );
        await loadList();
        await loadReport(d.date);
      } else {
        setStatus(`오류: ${d.error || "생성 실패"}`);
      }
    } catch (e) {
      setStatus(`오류: ${e instanceof Error ? e.message : "생성 실패"}`);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUrgent = report.includes("🚨 URGENT");

  return (
    <div className="layout">
      <aside className="sidebar">
        <a className="new-chat" href="/" style={{ textAlign: "center", textDecoration: "none" }}>
          ← 비서실로
        </a>
        <button className="new-chat" onClick={generate} disabled={busy}>
          {busy ? "생성 중…" : "📊 오늘 리포트 생성"}
        </button>
        <div className="sidebar-foot" style={{ borderTop: "none", paddingTop: 0 }}>
          최근 리포트
        </div>
        <div className="conv-list">
          {dates.map((d) => (
            <div
              key={d}
              className={`conv-item ${d === current ? "active" : ""}`}
              onClick={() => loadReport(d)}
            >
              <span className="conv-title">{d}</span>
            </div>
          ))}
          {dates.length === 0 && (
            <div className="sidebar-foot">아직 리포트가 없습니다.</div>
          )}
        </div>
        <div className="sidebar-foot">매일 07:00(KST) 자동 생성</div>
      </aside>

      <div className="app">
        <header className="header">
          <div className="logo">河</div>
          <div>
            <h1>Daily Intelligence</h1>
            <div className="sub">정책 · 국내 · 국외 · 전략기회 Top 3</div>
          </div>
          <div className="spacer" />
          {isUrgent && (
            <span
              style={{
                background: "#e06c75",
                color: "#fff",
                borderRadius: 8,
                padding: "6px 12px",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              🚨 URGENT
            </span>
          )}
        </header>

        <div className="messages">
          {status && (
            <div className="sidebar-foot" style={{ border: "none" }}>
              {status}
            </div>
          )}
          {authErr ? (
            <div className="empty">
              <h2>로그인이 필요합니다</h2>
              <p>
                먼저 <a href="/" style={{ color: "var(--accent-2)" }}>비서실 메인</a>에서
                비밀번호로 입장한 뒤 다시 열어주세요.
              </p>
            </div>
          ) : report ? (
            <div className="msg assistant">
              <div className="bubble">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
                  }}
                >
                  {report}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="empty">
              <h2>오늘의 인텔리전스</h2>
              <p>
                왼쪽 <b>「📊 오늘 리포트 생성」</b>을 누르면 정책·국내·국외·전략기회를
                <br />
                검색·분석해 Top 3 리포트를 만듭니다. (검색 API 키 필요)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
