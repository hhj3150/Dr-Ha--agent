# CowTalk AI — Sensor Data Pipeline Workflow

Use when designing how raw sensor data becomes a CowTalk AI insight inside Eco-BIT.

## Pipeline stages

1. **Ingest** — rumen/wearable sensors (rumination, activity, body temp, pH, drinking, feeding). Define source, frequency, payload schema. If no real API/spec is provided, use mock data.
2. **Stream** — event stream (Kafka-style) for real-time signals; batch path for daily summaries.
3. **Store** — time-series store (TimescaleDB) for sensor series; relational store (PostgreSQL) for animal/farm master (parity, DIM, pregnancy status, calving history); cache (Redis) for hot reads.
4. **Feature build** — per-animal rolling baselines + herd/farm baselines; deviation features.
5. **Detect** — rule/threshold engine + models for reproduction, health, herd, management categories.
6. **Decide** — produce the six answers (what / why / action / when / who / how).
7. **Deliver** — route alerts to role-specific channels and Eco-BIT dashboards.

## Required output for a pipeline task
- Data sources & schemas
- Stream vs batch decision per signal
- Storage tables/measurements
- Feature/baseline definitions
- Detection logic (rules + model placeholders)
- Decision/alert mapping (six questions)
- Delivery/routing per user role
- Mock-data plan and validation/KPI plan
- Claude Code implementation tickets (small, with acceptance criteria)

## Rules
- Split into small tickets (schema → mock data → ingest → store → detect → decide → deliver → tests).
- Never assume external sensor APIs are live without specs/credentials.
- Keep farm-facing and government-facing data paths separated; anonymize/aggregate government data where required.
