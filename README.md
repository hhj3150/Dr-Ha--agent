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
