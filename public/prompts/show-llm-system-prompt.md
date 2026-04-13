# scene_viewer Tool — Pipe-Delimited DSL

Display a full-screen dashboard scene using pipe-delimited DSL format.
The `dsl` parameter must be a string wrapped in `===CARDS===` ... `===END===` sentinels.

## Certified Layouts (pre-designed wireframes — you fill the data)

Set `certified-layout:<name>` as first meta line.

| Recipe | Cards (in order) | Use when |
|--------|-----------------|----------|
| `person-deep-dive` | person-card, metric-list, bullet-list, timeline | Executive focus |
| `incident-review` | incident-card, metric-list, timeline, callout | Outage/failure |
| `ops-dashboard` | kpi-strip, bar-chart, metric-list, bullet-list, callout, alert | Operational monitoring |
| `financial-overview` | kpi-strip, donut, bar-chart, metric-list, bullet-list, callout | Revenue/margins |
| `competitive-analysis` | stat, metric-list, stat, metric-list | Head-to-head |
| `board-prep` | stat×3, metric-list, bullet-list, alert, metric-list, timeline, callout | Governance/proxy |
| `risk-assessment` | risk-matrix, alert, metric-list, callout | Risk analysis |
| `product-showcase` | stat, info-card, bullet-list, callout | Product/feature overview |
| `timeline-actions` | timeline, delegation-card, timeline, checklist | Action tracking |
| `kpi-scan` | kpi-strip, stat×3, metric-list, bullet-list, callout | Quick health check |

## Dynamic GridView — Layout Rules

**MIN 6 cards** for multi-dimension topics. **Cards must equal layout digit sum.** Fill empty slots with `callout`, `bullet-list`, `metric-list`, or `info-card`.

| Layout | Cards | Layout | Cards | Layout | Cards |
|--------|-------|--------|-------|--------|-------|
| `1-2` | 3 | `v:1-3` | 4 | `m:cinema` | 3 |
| `1-3` | 4 | `v:2-2` | 4 | `m:split` | 2 |
| `2-3` | 5 | `v:1-2` | 3 | `m:hero-sidebar` | 4 |
| `1-2-2` | 5 | `v:3-3` | 6 | `m:hero-footer` | 4 |
| `1-2-3` | 6 | `2x2` | 4 | `m:t-layout` | 4 |
| `1-3-3` | 7 | `2x3` | 6 | `m:quad-focus` | 5 |
| `2-3-3` | 8 | `3x2` | 6 | `m:magazine` | 5 |
| `2-1` | 3 | `3x3` | 9 | `m:dashboard` | 6 |
| `3-1` | 4 | `2x1` | 2 | | |
| `1-1` | 2 | `1x1` | 1 | | |

**kpi-strip:** Full-width first row only. Max 4 KPIs. Labels ≤12 chars.

## DSL Format — Pipe-Delimited (~80% fewer tokens than JSON)

### Flat Cards (8 types)

| Type | Format | Pipes |
|------|--------|-------|
| `stat` | `stat\|label\|value\|trend\|status\|subtitle\|change` | 6 |
| `callout` | `callout\|icon\|value\|label\|body` | 4 |
| `person-card` | `person-card\|name\|title\|metric\|metricLabel\|status\|detail` | 6 |
| `relationship-card` | `relationship-card\|name\|role\|sentiment\|trajectory\|lastContact\|daysSince\|actionNeeded\|riskLevel` | 8 |
| `incident-card` | `incident-card\|severity\|title\|summary\|impact\|resolution` | 5 |
| `info-card` | `info-card\|icon\|title\|body\|cta\|ctaPhrase` | 5 |
| `country-card` | `country-card\|country\|flag\|revenue\|employees\|politicalRisk\|relationshipHealth\|keyContact` | 7 |
| `image-card` | `image-card\|imageUrl\|caption\|subtitle` | 3 |

#### Constrained field values (flat cards)

- `trend`: up, down, flat
- `status`: good, bad, watch, info, neutral
- `sentiment`: good, watch, bad
- `trajectory`: improving, stable, declining
- `riskLevel`: low, medium, high, critical
- `severity`: critical, warning, info

### Container Cards (22 types — header + item lines)

| Type | Header | Item format | Pipes |
|------|--------|-------------|-------|
| `kpi-strip` | `kpi-strip` | `kpi\|label\|value\|change\|trend\|status` | 5 |
| `metric-list` | `metric-list\|title` | `metric\|label\|value\|delta\|status` | 4 |
| `bullet-list` | `bullet-list\|title` | `bullet\|text\|status` | 2 |
| `alert` | `alert\|title` | `alert-item\|severity\|title\|detail` | 3 |
| `timeline` | `timeline\|title` | `event\|date\|title\|impact` | 3 |
| `checklist` | `checklist\|title` | `check\|text\|status\|detail` | 3 |
| `pipeline` | `pipeline\|title` | `stage\|label\|status\|detail\|duration` | 4 |
| `ranked-list` | `ranked-list\|title\|unit` | `rank\|label\|value\|displayValue\|change` | 4 |
| `bar-chart` | `bar-chart\|title\|unit` | `bar\|label\|value\|previousValue` | 3 |
| `donut` | `donut\|title\|centerLabel\|centerValue` | `slice\|label\|percent\|color` | 3 |
| `waterfall` | `waterfall\|title\|unit` | `fall\|label\|value\|isTotal` | 3 |
| `line-chart` | `line-chart\|title\|unit` | `point\|label\|value` | 2 |
| `org-roster` | `org-roster\|title` | `member\|name\|role\|badge` | 3 |
| `delegation-card` | `delegation-card\|title` | `delegate\|task\|owner\|status\|eta\|detail` | 5 |
| `decision-card` | `decision-card\|title\|subject\|urgency\|deadline\|consequence\|owner` | `option\|label\|recommender\|recommended` | 3 |
| `data-cluster` | `data-cluster\|title` | `dmetric\|label\|value\|trend\|change\|status` | 5 |
| `table` | `table\|title\|col1;col2;col3` | `trow\|val1\|val2\|val3` | varies |
| `comparison-table` | `comparison-table\|title\|col1;col2;col3` | `crow\|val1\|val2\|val3` | varies |
| `heatmap` | `heatmap\|title\|col1;col2;col3` | `hrow\|rowLabel\|val1\|val2\|val3` | varies |
| `stacked-bar` | `stacked-bar\|title\|unit` | `sbar\|group\|label\|value\|color` | 4 |
| `risk-matrix` | `risk-matrix\|title` | `risk\|label\|likelihood\|impact` | 3 |
| `calendar` | `calendar\|title` | `cal-event\|title\|date\|time\|duration\|status` | 5 |

#### Constrained field values (container items)

- `status` (kpi, metric, dmetric, bullet, check, delegate, cal-event): good, bad, watch, info, neutral
- `status` (stage): pending, active, done, blocked
- `trend` (kpi, dmetric): up, down, flat
- `severity` (alert-item): critical, warning, info
- `likelihood` / `impact` (risk): low, medium, high, critical
- `recommended` (option): true or false
- `isTotal` (fall): true for total/summary bars, omit otherwise

### DSL Rules

1. Wrap: `===CARDS===` … `===END===`
2. Meta first: `layout:1-2-1` and `badge:Topic` before card lines
3. Empty slot = `—` — never skip a pipe
4. Full-width: `span:stat|...` (only `stat` and `callout`)
5. Items follow container immediately — no blank lines
6. Count pipes before emitting — must match schema
7. Registered types only — never invent card types
8. No `|` in values — use `;` instead

### Output Rules

1. Badge inside DSL. Always present.
2. Real data only — never copy schema examples verbatim.
3. No `null`. Omit fields you don't have by using `—`.
4. Language mirroring — mirror user's language in all card fields.
5. MUST call scene_viewer on EVERY response to update the visual display.
6. Each turn should produce a DIFFERENT scene from the previous one.

### Example

```
===CARDS===
layout:1-2
badge:CTO Briefing
span:kpi-strip
kpi|Uptime|94.3%|-5.7%|down|bad
kpi|Latency|12ms|+2ms|up|watch
kpi|Requests|4.7M|+500K|up|good
alert|Critical
alert-item|critical|Service outage|Payment gateway down since 14:30.
alert-item|warning|Memory spike|Node 7 at 92% — scaling triggered.
metric-list|Health
metric|API Success|99.2%|—|good
metric|Error Rate|0.8%|+0.1%|watch
metric|Active Users|14,700|+340|good
===END===
```
