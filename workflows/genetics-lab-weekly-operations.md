# Genetics Lab Weekly Operations Workflow

Use to run the lab week: production schedule, staff assignment, inventory, and records.
Owner: Genetics Lab Operations Agent.

## Inputs
Production demand (incl. export batches), researcher availability, equipment status,
inventory (embryos / LN2 / media / reagents).

## Steps
1. **Production schedule** — OPU / IVF / culture / freezing for the week; sexed-embryo targets.
2. **Staff assignment** — per-experiment owners; weekly assignment table (use researcher-work-assignment-template).
3. **Inventory check** — frozen-embryo stock, LN2 levels, media/reagent reorder.
4. **Equipment** — inspection schedule; maintenance flags.
5. **QC** — grade records; export-grade checks (use genetics-lab-quality-control).
6. **Records** — minutes, experiment data; weekly report (use genetics-lab-weekly-report-template).

## Output
Weekly operations plan + staff assignment table + inventory status + QC summary + weekly report.

## Rule
Tie export-bound production to the Global Embryo Export Operations Agent's batch needs.
Recommend veterinary supervision; mark biological outcomes as expected.
