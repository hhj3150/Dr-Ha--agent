# D2O Claude Code Agent Kit

This kit is designed for building practical Claude Code / Codex agents for Dr. Ha Hyunjae's integrated work across livestock biotech, D2O environment technology, Eco-BIT digital platform, A2 Hay Milk branding, and CEO-level strategy.

## Agent structure

1. `ceo-strategy-agent.md` - top-level strategy, prioritization, business architecture, partnerships, policy narrative
2. `eco-bit-platform-agent.md` - digital livestock platform, sensor data, dashboards, AI workflows, public-sector reporting
3. `genetics-biotech-agent.md` - embryo transfer, genomic selection, Hanwoo and dairy breeding, veterinary biotech business
4. `d2o-environment-carbon-agent.md` - D2O bedding, Dr. Ha Liquid/Bedding, HBP, compost, odor, manure, carbon, patents
5. `a2-haymilk-brand-agent.md` - Song Young Shin Farm, A2 Jersey Hay Milk, dairy products, cafe, tourism, packaging, sales
6. `cowtalk-ai-agent.md` - CowTalk AI, the sensor-intelligence / AI-decision **component within Eco-BIT** (rumen-sensor interpretation, estrus/calving/disease prediction, reproduction AI, alert generation, PRDs)

### Song Young Shin Farm Growth Team (A2 Jersey Hay Milk execution)
7. `songyoungshin-product-development-agent.md` - dairy product development, line-up, manufacturing process, cost/price/margin
8. `songyoungshin-brand-marketing-agent.md` - brand story, A2 Hay Milk message, package & detail-page copy, SNS/blog/YouTube content
9. `songyoungshin-sales-distribution-agent.md` - online sales, subscription, B2B (cafe/bakery/hotel/department store), first-1,000-customer
10. `songyoungshin-ecommerce-agent.md` - shop.a2jerseymilk.com IA, PDP, checkout/membership/subscription, CRM, SEO, CRO

Growth Team shared context: `context/songyoungshin-growth-context.md` (core channel: shop.a2jerseymilk.com).

### Business operations agents
11. `d2o-peatmoss-commercial-agent.md` - peat-moss sales execution (farm proposals, quotes, dealers, 농협/축협, ROI)
12. `government-rnd-secretary-agent.md` - 3-year MOTIE (산자부) R&D project PMO (reports, settlement, performance indicators)
13. `smaxtec-sensor-operations-agent.md` - CowTalk AI's field arm (smaXtec sensor supply/install/AS/subscription); see `context/cowtalk-business-context.md`

### Global Holstein embryo export & Genetics lab
14. `global-embryo-export-operations-agent.md` - Korean Holstein sexed dairy embryo export (Dubai hub, Central/SE Asia, quarantine/documents, partners, logistics, performance tracking)
15. `genetics-lab-operations-agent.md` - Genetics lab production (OPU/IVF/freezing), QC, embryo inventory, SOP, researcher/staff management

Export business context: `context/global-embryo-export-context.md`. Export target = Korean Holstein sexed dairy embryos only; Hanwoo genetic export is prohibited.

### CowTalk + Eco-BIT expansion (province → national → international)
16. `provincial-government-expansion-agent.md` - domestic provincial-government go-to-market (governor proposals, provincial master plans, budget, PPP, economic/job/carbon impact; Gyeonggi→Gangwon→Jeolla→national)
17. `cowtalk-global-expansion-agent.md` - international platform export (Central/SE Asia, Middle East, Dubai hub; country entry, pilots, export proposals, investor decks)

Expansion context: `context/eco-bit-expansion-context.md` (government-scale livestock OS; 5-phase path; Tier 1/2/3 priorities; Uzbekistan CowTalk reference).

## Agent → workflows / templates map

| Agent | Workflows | Templates |
|---|---|---|
| ceo-strategy | multi-agent-router, policy-proposal-workflow, claude-code-build-workflow | decision-memo-template, proposal-template, agent-task-template |
| eco-bit-platform | claude-code-build-workflow, policy-proposal-workflow | dashboard-feature-template, proposal-template |
| cowtalk-ai | cowtalk-sensor-pipeline, cowtalk-alert-workflow | cowtalk-prd-template, alert-design-template, dashboard-feature-template |
| smaxtec-sensor-operations | smaxtec-sensor-supply-management, farm-sensor-installation-checklist, monthly-sensor-operations-report | sensor-installation-checklist, farm-sensor-contract-template, sensor-as-response-template, monthly-sensor-subscription-report, farmer-sensor-training-material |
| genetics-biotech | patent-workflow | proposal-template |
| genetics-lab-operations | genetics-lab-weekly-operations, genetics-lab-quality-control, researcher-staff-management | genetics-lab-weekly-report-template, researcher-work-assignment-template, lab-sop-template, lab-qc-checklist-template, staff-onboarding-template, embryo-batch-inventory-template |
| global-embryo-export-operations | global-holstein-embryo-export-playbook, dubai-hub-business-development, country-entry-checklist, embryo-export-document-preparation, embryo-export-logistics-management | country-entry-report-template, embryo-export-checklist-template, export-document-list-template, international-partner-mou-template, embryo-batch-inventory-template, recipient-cow-selection-template, pregnancy-result-tracker-template, calving-result-tracker-template |
| government-rnd-secretary | 3-year-rnd-project-management, monthly-rnd-progress-report, rnd-meeting-minutes | monthly-progress-report-template, rnd-meeting-minutes-template, annual-report-template, performance-indicator-tracker, rnd-expense-checklist |
| d2o-environment-carbon | patent-workflow | proposal-template |
| d2o-peatmoss-commercial | peatmoss-sales-playbook, dealer-recruitment-plan, farm-proposal-workflow, monthly-peatmoss-sales-meeting | peatmoss-farm-proposal-template, peatmoss-price-quote-template, dealer-recruitment-template, farm-education-material-template, monthly-sales-report-template |
| songyoungshin-product-development | a2-jersey-haymilk-product-launch | product-development-brief |
| songyoungshin-brand-marketing | sns-content-calendar | sns-post-template, product-detail-page-template |
| songyoungshin-sales-distribution | songyoungshin-90-day-growth-plan, b2b-sales-playbook | b2b-sales-proposal-template, weekly-growth-meeting-template |
| songyoungshin-ecommerce | ecommerce-launch-checklist | product-detail-page-template |
| provincial-government-expansion | policy-proposal-workflow | proposal-template, decision-memo-template |
| cowtalk-global-expansion | policy-proposal-workflow, country-entry-checklist | country-entry-report-template, proposal-template |

## How to use in Claude Code

Copy an agent file into Claude Code as the system/developer instruction for that agent, or create separate subagents if your Claude Code setup supports them.

Recommended command style:

```text
You are now the D2O CEO Strategy Agent. Read agents/ceo-strategy-agent.md and follow it strictly.
Task: Convert the following idea into a 3-page government proposal.
[Paste idea]
```

For multi-agent work, start with CEO Strategy Agent, then route the task to the specialist agent.

## Best routing

- Government proposal, public funding, MOU, national strategy -> CEO Strategy Agent + Eco-BIT Platform Agent
- Patent, technical paper, field manual, odor/compost/bedding -> D2O Environment Carbon Agent
- Embryo transfer, genomic selection, Hanwoo strategy, A2A2 breeding -> Genetics Biotech Agent
- Milk, yogurt, cafe, brochure, package, brand story -> A2 Hay Milk Brand Agent
- Financial model, business roadmap, investor deck -> CEO Strategy Agent, then relevant specialist

## Non-disclosure rules

Some information is strategic and should not be disclosed externally unless the user explicitly authorizes it:

- Scientific/geological origin of Dr. Ha Liquid
- Confidential monensin + fulvic acid / peat moss methane-reduction strategy
- Internal product sourcing or trade-secret mechanisms not already public
- Any export of Hanwoo genetics, because Hanwoo genetic export is illegal under Korean law

When producing external materials, describe Dr. Ha Liquid by function and performance, not origin.
