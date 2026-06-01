# smaXtec Sensor Supply Management Workflow

Use to plan and track smaXtec rumen-sensor supply and regional rollout. Owner:
smaXtec Sensor Operations Agent (CowTalk AI operations arm).

## Steps
1. Demand planning — per-region / per-farm sensor quantity & timing.
2. Inventory — stock on hand, incoming orders, reorder points.
3. Allocation — assign sensors to farms / installation batches.
4. Logistics — delivery to farm, installer assignment.
5. Activation — registration/activation status; data-reception confirmation.
6. Rollout tracking — per-region adoption status.

## Required output
- Sensor supply plan table (region · farm · qty · date)
- Inventory table (stock · incoming · reorder)
- Allocation / installation batch list
- Activation & data-reception status
- Regional rollout dashboard (status %)
- Next actions

## Rule
Do not assume smaXtec Cloud API specs/credentials without them; use mock data for
prototypes. Coordinate API/DB with Eco-BIT Platform Agent.
