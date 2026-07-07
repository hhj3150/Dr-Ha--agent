# CowTalk-Core Model Context (카우톡 코어 축산 디지털 전환 모델)

Shared, **reusable** model framework for every domestic and international
livestock-platform proposal. Read with `eco-bit-expansion-context.md`,
`cowtalk-business-context.md`, `founder-context.md`, `master-context.md`,
`confidentiality-rules.md`.

> Founder directive (2026-07): "이 모델은 국내외 공히 적용될 수 있음." Treat this as the
> **standard architecture** for CowTalk+Eco-BIT go-to-market — reuse it for provinces
> (Provincial Government Expansion) and for countries (CowTalk Global Expansion),
> swapping only the partner/finance/localization layer.

## Core thesis
**CowTalk AI is the core (the operating system); genetics, environment, sensors, and
finance are modules layered on top.** Do not sell CowTalk as one feature among many —
position it as the national livestock **data hub**, and attach the other businesses as
value modules that feed data into it and draw insight out of it.

Legacy framing put Eco-BIT (platform shell) first with CowTalk as a component. The
**go-to-market narrative** inverts this: CowTalk (AI decision core) leads; Eco-BIT is
its platform/integration layer. Internally the routing is unchanged (CowTalk AI =
intelligence, Eco-BIT = platform/dashboard/gov-reporting); this is a *positioning*
model for proposals, not a re-architecture.

## The 4-layer + module stack (reuse verbatim, localize the names)

**CORE — CowTalk AI (the decision engine)**
- Data collection layer: rumen bolus + collar + ear-tag biosensors (smaXtec) +
  AI video/behavior analysis + Eco-BIT environmental sensors (temp/humidity/ammonia).
- AI analysis engine: estrus & optimal-insemination alerts, early disease surveillance
  (mastitis / respiratory / metabolic), heat-stress warning, per-animal lifecycle mgmt.
- Management & service layer: individual traceability, breeding management
  (embryo / A2A2 Jersey), farm dashboard, multilingual localization.

**MODULES ON TOP OF THE CORE**
- **Genetics module** — Genetics Korean-type embryos / A2A2 Jersey; CowTalk tracks
  transfer → conception → growth performance. (See `global-embryo-export-context.md`.)
- **Environment module (Eco-BIT)** — odor / harmful-gas reduction, hygiene &
  heat-stress management; environmental data feeds back into CowTalk.
- **Finance module** — data-based livestock finance & insurance products; individual &
  productivity data used for credit scoring, leasing, subsidy review. (**International
  differentiator** — e.g., Agrobank API in Uzbekistan; domestically → 축산금융/공제.)

**INTEGRATION (differentiation) layer — Eco-BIT**
- Standardizes sensor + CowTalk insights (metadata, RAG/MCP) and connects them to the
  government/administration dashboard. Farm↔admin data paths separated; admin view is
  aggregated/anonymized.

## Why this beats single-product competitors
Competitors sell **point** solutions (a sensor, a camera, a video-analytics box). This
model sells a **platform that binds genetics + environment + reproduction + finance** —
switching cost and data-network effects accrue to the core (CowTalk), not to a device.

## Pilot pattern (reusable KPI set)
- Scale: 1–2 lead farms, ~100 cows, 3–6 months (Uzbekistan reference = ~50 cows).
- KPIs: milk yield, milk quality (somatic cell / bacteria count), conception rate,
  disease incidence, harmful-gas concentration, sensor/AI prediction accuracy.
- Outputs: measured CowTalk dashboard dataset + economic-feasibility report.

## Business model (3-stage, reusable)
1. **Pilot** — policy/grant matching (KOICA CTS · KOPIA · Eximbank domestically; 정부
   R&D / 道 예산 for provinces).
2. **Monetize** — CowTalk **SaaS subscription + equipment supply (sensors · Eco-BIT)**;
   finance-linkage expansion.
3. **Scale** — platform **license** expansion (province → province, or country →
   neighboring country).

## Roadmap skeleton (reusable, ~12 months)
- M1–2: partner & farm selection, MOU (finance partner + livestock research institute).
- M3–8: CowTalk localization build + pilot.
- M9–12: performance evaluation + finance-linkage agreement + main-project design.

## Standard risk register
- Comms/power infra → offline caching + low-power sensor design.
- Data sovereignty / local regulation → local servers + government co-management.
- Equipment import permits → institute/government pre-consultation.

## Domestic vs international application
- **Domestic (provinces):** finance module = 축산금융/공제/보조금; partner = 道·시군·
  축협; grant = 道 예산·정부 R&D. Route via **Provincial Government Expansion Agent**.
- **International (countries):** finance module = local policy bank (e.g., Agrobank);
  partner = 농업부·축산연구소·정책은행; grant = KOICA/KOPIA/Eximbank/ODA. Route via
  **CowTalk Global Expansion Agent**. First reference = Uzbekistan.

## Positioning decisions to confirm per proposal
For each new proposal, confirm two axes (default in **bold**):
1. Lead strength: **disease/reproduction surveillance (productivity)** vs
   finance-linkage data (bank partner). Pick per audience.
2. First counterpart: policy bank vs **Ministry/livestock research institute**.

## Discipline
Mark all figures/budgets as estimates or pilot targets. Documents are internal drafts
pending legal/partner review. Apply `confidentiality-rules.md` (no Dr. Ha Liquid
origin, no confidential methane strategy, **no Hanwoo genetic export** — Holstein dairy
embryos only). Korean when the user writes Korean.
