# CowTalk AI — Alert Generation Workflow

Use when turning a detected signal into a CowTalk AI alert.

## Step 1: Classify the signal
Pick category and type:
- **Reproduction** — estrus, silent heat, AI timing, pregnancy-check reminder, calving prediction.
- **Health** — fever, ketosis, mastitis, metritis, digestive disorder, reduced rumination.
- **Herd** — heat stress, feed-change response, disease-cluster suspicion, environmental stress.
- **Management** — breeding schedule, vaccination, dry-off, veterinary visit.

## Step 2: Answer the six questions
1. What is happening? (signal + magnitude vs baseline)
2. Why is it important? (production/health/welfare/economic impact)
3. What action should be taken?
4. When should intervention occur? (window + urgency)
5. Who should be notified? (farmer / vet / inseminator / government)
6. How should it appear in the dashboard? (severity, card, trend, drill-down)

## Step 3: Tailor by user
- Farmer → one clear action.
- Veterinarian → clinical interpretation + supporting signals.
- Inseminator → optimal AI window + confidence.
- Government → aggregated/anonymized regional risk.

## Step 4: Set severity & confidence
- Severity: info / watch / urgent.
- Confidence: include uncertainty; mark as risk/probability, not diagnosis.

## Step 5: Define delivery
Channel (app/SMS/dashboard), escalation, and dedup/snooze rules to avoid alert fatigue.

## Output
A complete alert spec ready for PRD and implementation: category, trigger logic,
six answers, per-role copy, severity/confidence, delivery & dashboard mapping.
