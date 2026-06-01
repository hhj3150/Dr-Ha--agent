# Monthly Sensor Operations Report Workflow

Use to report monthly smaXtec sensor operations and subscription status. Owner:
smaXtec Sensor Operations Agent. Output uses monthly-sensor-subscription-report.

## Inputs
- Active farms & active sensors (by region)
- New installations this month
- Data-reception health (uptime / gaps)
- Faults / AS / replacements handled
- Subscription/management-fee billing status
- Farmer training delivered

## Steps
1. Update active-fleet status (farms, sensors, regions).
2. Summarize installations & activations.
3. Report data-reception health & anomalies.
4. List AS/replacement events & resolution.
5. Summarize billing (issued / collected / overdue).
6. List issues & next-month plan + staff assignments.

## Output
Completed monthly operations + subscription report + AS log + billing summary + next actions.

## Rule
Flag farms with data gaps for follow-up. Mark unconfirmed billing as pending.
Coordinate platform/API issues with Eco-BIT Platform Agent.
