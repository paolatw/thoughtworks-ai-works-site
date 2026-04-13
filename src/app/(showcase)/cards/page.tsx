import {
  KPIStrip,
  BarChart,
  DonutChart,
  LineChart,
  TableCard,
  MetricList,
  AlertCard,
  StatCard,
  CalloutCard,
  HeatmapCard,
  TimelineCard,
  WaterfallCard,
  StackedBarCard,
  PersonCard,
  OrgRoster,
  ChecklistCard,
  InfoCard,
  BulletListCard,
  ImageCard,
  ComparisonTable,
  RankedListCard,
  IncidentCard,
  PipelineCard,
  RiskMatrixCard,
  DecisionCard,
  DelegationCard,
  RelationshipCard,
  CountryCard,
  DataClusterCard,
  CalendarCard,
} from '@/components/cards';

// ─── Sample Data ──────────────────────────────────────────────────────────────

const kpiStripData = {
  items: [
    { label: 'Revenue', value: '$4.2M', change: '+12%', trend: 'up' as const, status: 'good' as const },
    { label: 'Churn', value: '2.1%', change: '+0.3%', trend: 'up' as const, status: 'watch' as const },
    { label: 'NPS', value: '72', change: '-4', trend: 'down' as const, status: 'watch' as const },
    { label: 'ARR', value: '$50M', change: '+8%', trend: 'up' as const, status: 'good' as const },
  ],
};

const barChartData = {
  title: 'Revenue by Region',
  bars: [
    { label: 'APAC', value: 1200000 },
    { label: 'EMEA', value: 980000 },
    { label: 'AMER', value: 1540000 },
    { label: 'LATAM', value: 420000 },
  ],
  unit: 'USD',
};

const donutChartData = {
  title: 'Market Share',
  segments: [
    { label: 'Product A', percent: 42 },
    { label: 'Product B', percent: 28 },
    { label: 'Product C', percent: 18 },
    { label: 'Others', percent: 12 },
  ],
  centerLabel: 'Share',
  centerValue: '42%',
};

const lineChartData = {
  title: 'Monthly Active Users',
  data: [18000, 21000, 19500, 24000, 28000, 31000, 29000, 34000],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  unit: 'users',
};

const tableCardData = {
  title: 'Top Accounts',
  headers: ['Account', 'ARR', 'Health', 'Owner'],
  rows: [
    ['Acme Corp', '$820K', 'Green', 'Sam K.'],
    ['Globex', '$540K', 'Yellow', 'Dana P.'],
    ['Initech', '$320K', 'Red', 'Chris R.'],
    ['Umbrella', '$290K', 'Green', 'Taylor M.'],
  ],
  highlights: [2],
};

const metricListData = {
  title: 'System Health',
  items: [
    { label: 'API Latency', value: '142ms', status: 'good' as const },
    { label: 'Error Rate', value: '0.8%', status: 'watch' as const },
    { label: 'DB Load', value: '74%', status: 'watch' as const },
    { label: 'Uptime', value: '99.97%', status: 'good' as const },
    { label: 'Queue Depth', value: '1,240', status: 'bad' as const },
  ],
};

const alertCardData = {
  title: 'Active Alerts',
  alerts: [
    { severity: 'critical' as const, title: 'Payment Gateway Down', detail: 'Stripe webhook callbacks failing since 14:32 UTC. ~$18K in blocked transactions.' },
    { severity: 'warning' as const, title: 'High Memory Usage', detail: 'prod-api-03 at 91% memory utilization for 20+ minutes.' },
    { severity: 'info' as const, title: 'Scheduled Maintenance', detail: 'DB migration window starts at 02:00 UTC tomorrow.' },
  ],
};

const statCardData = {
  label: 'Pipeline Value',
  value: '$12.4M',
  subtitle: 'Q3 forecast — 84% weighted coverage',
  trend: 'up' as const,
  change: '+18% vs Q2',
  status: 'good' as const,
};

const calloutCardData = {
  icon: 'target',
  value: '94%',
  label: 'Customer Retention',
  body: 'Highest retention rate in company history, driven by the new onboarding flow.',
  subtitle: 'Updated 2 hours ago',
};

const heatmapData = {
  title: 'Support Volume by Day & Hour',
  rows: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  cols: ['9am', '12pm', '3pm', '6pm'],
  cells: [
    [{ label: '', value: 12 }, { label: '', value: 34 }, { label: '', value: 28 }, { label: '', value: 8 }],
    [{ label: '', value: 18 }, { label: '', value: 45 }, { label: '', value: 32 }, { label: '', value: 11 }],
    [{ label: '', value: 22 }, { label: '', value: 51 }, { label: '', value: 40 }, { label: '', value: 14 }],
    [{ label: '', value: 17 }, { label: '', value: 42 }, { label: '', value: 37 }, { label: '', value: 9 }],
    [{ label: '', value: 8 }, { label: '', value: 21 }, { label: '', value: 16 }, { label: '', value: 4 }],
  ],
};

const timelineData = {
  title: 'Product Milestones',
  events: [
    { date: 'Aug 2024', title: 'Series B Closed', category: 'financial', impact: '$40M raised at $220M valuation' },
    { date: 'Jun 2024', title: 'EU GDPR Certification', category: 'regulatory', impact: 'Unlocks enterprise sales in EU' },
    { date: 'Mar 2024', title: 'v3.0 GA Launch', category: 'product', impact: '2× performance vs v2.x' },
    { date: 'Jan 2024', title: 'Reached 10K customers', category: 'milestone', impact: 'ARR crossed $50M' },
  ],
};

const waterfallData = {
  title: 'Q3 P&L Bridge',
  unit: '$',
  segments: [
    { label: 'Start', value: 3200000, isTotal: true },
    { label: 'New Biz', value: 820000 },
    { label: 'Expansion', value: 340000 },
    { label: 'Churn', value: -210000 },
    { label: 'COGS', value: -480000 },
    { label: 'End', value: 0, isTotal: true },
  ],
};

const stackedBarData = {
  title: 'Revenue Mix by Quarter',
  unit: 'K',
  groups: [
    { label: 'Q1', segments: [{ label: 'SaaS', value: 3200 }, { label: 'Services', value: 800 }, { label: 'Support', value: 400 }] },
    { label: 'Q2', segments: [{ label: 'SaaS', value: 3600 }, { label: 'Services', value: 950 }, { label: 'Support', value: 410 }] },
    { label: 'Q3', segments: [{ label: 'SaaS', value: 4100 }, { label: 'Services', value: 1100 }, { label: 'Support', value: 420 }] },
  ],
};

const personCardData = {
  name: 'Jordan Lee',
  title: 'VP Engineering',
  company: 'Acme Corp',
  metric: '$820K',
  metricLabel: 'ARR',
  status: 'good' as const,
  detail: 'Decision-maker for infrastructure spending',
  traits: ['Technical', 'Budget Owner', 'Champion'],
};

const orgRosterData = {
  title: 'Engineering Leadership',
  members: [
    { name: 'Jordan Lee', role: 'VP Engineering', badge: 'Budget Owner' },
    { name: 'Alex Chen', role: 'Staff Engineer', badge: 'Tech Lead' },
    { name: 'Sam Patel', role: 'Engineering Mgr', badge: 'Team Lead' },
    { name: 'Morgan Kim', role: 'Principal Arch', badge: 'Reviewer' },
    { name: 'Riley Wang', role: 'SRE Lead', badge: 'On-Call' },
    { name: 'Drew Singh', role: 'Data Engineer', badge: 'Analytics' },
  ],
};

const checklistData = {
  title: 'Launch Readiness',
  items: [
    { text: 'Security penetration test', status: 'done' as const },
    { text: 'Load test at 10× peak traffic', status: 'done' as const },
    { text: 'Runbook updated', status: 'pending' as const, detail: 'Owner: SRE team' },
    { text: 'Legal sign-off on ToS', status: 'blocked' as const, detail: 'Waiting on legal review' },
    { text: 'Feature flags configured', status: 'pending' as const },
  ],
};

const infoCardData = {
  icon: 'rocket',
  title: 'Platform AI Assistant Now Live',
  body: 'The new conversational AI assistant helps users explore their data hands-free. Available to all Enterprise tier customers starting today.',
  cta: 'Learn More',
};

const bulletListData = {
  title: 'Key Risks This Quarter',
  items: [
    { text: 'Competitor pricing pressure in mid-market segment', status: 'bad' },
    { text: 'Engineering headcount 2 below plan through Q4', status: 'watch' },
    { text: 'EU data residency requirements ahead of schedule', status: 'good' },
    { text: 'Customer success capacity stretched across 3 accounts', status: 'watch' },
  ],
};

const imageCardData = {
  caption: 'Global Operations Center',
  subtitle: 'Austin, TX — opened March 2024',
};

const comparisonTableData = {
  title: 'Plan Comparison',
  headers: ['Feature', 'Starter', 'Growth', 'Enterprise'],
  rows: [
    { cells: ['Users', '5', '25', 'Unlimited'] },
    { cells: ['Storage', '10 GB', '100 GB', '1 TB'] },
    { cells: ['API calls/mo', '10K', '500K', 'Unlimited'], highlights: [3] },
    { cells: ['SSO / SAML', '✗', '✗', '✓'], highlights: [3] },
    { cells: ['SLA', 'None', '99.9%', '99.99%'], highlights: [3] },
  ],
};

const rankedListData = {
  title: 'Top Sales Reps',
  unit: 'K',
  items: [
    { label: 'Sam K.', value: 820, displayValue: '$820K', change: '+12%' },
    { label: 'Dana P.', value: 740, displayValue: '$740K', change: '+8%' },
    { label: 'Chris R.', value: 610, displayValue: '$610K', change: '-3%' },
    { label: 'Taylor M.', value: 580, displayValue: '$580K', change: '+22%' },
    { label: 'Jamie O.', value: 510, displayValue: '$510K', change: '+5%' },
  ],
};

const incidentCardData = {
  severity: 'critical' as const,
  title: 'Payment Gateway Outage',
  summary: 'Stripe webhook processing halted. ~$18K in blocked transactions.',
  timeline: [
    { time: '14:32', description: 'First alert triggered by monitoring' },
    { time: '14:38', description: 'On-call engineer paged, incident opened' },
    { time: '14:51', description: 'Root cause identified: cert expiry' },
  ],
  impact: '~340 failed payment attempts in 20 min',
  resolution: 'Certificate renewed — monitoring recovery',
};

const pipelineCardData = {
  title: 'Deployment Pipeline',
  stages: [
    { label: 'Unit Tests', status: 'complete' as const, duration: '2m 14s' },
    { label: 'Integration', status: 'complete' as const, duration: '4m 32s' },
    { label: 'Build', status: 'active' as const, detail: 'Building Docker image…', duration: 'Running' },
    { label: 'Staging Deploy', status: 'pending' as const },
    { label: 'Prod Deploy', status: 'pending' as const },
  ],
};

const riskMatrixData = {
  title: 'Risk Matrix',
  risks: [
    { label: 'Churn', likelihood: 1, impact: 2 },
    { label: 'Outage', likelihood: 0, impact: 2 },
    { label: 'Delay', likelihood: 2, impact: 1 },
    { label: 'Breach', likelihood: 0, impact: 2 },
    { label: 'Scope', likelihood: 1, impact: 1 },
  ],
};

const decisionCardData = {
  title: 'Decision Required',
  subject: 'Should we extend the Initech contract at a 20% discount?',
  urgency: 'high' as const,
  deadline: 'Aug 22, 2024',
  consequence: 'Losing Initech risks $320K ARR and a reference customer.',
  options: [
    { label: 'Accept 20% discount for 12-month renewal', recommended: true, recommender: 'VP Sales' },
    { label: 'Counter at 10% discount with added support tier' },
    { label: 'Let contract lapse and focus on replacement' },
  ],
  owner: 'CFO',
};

const delegationCardData = {
  title: 'Open Actions',
  items: [
    { task: 'Finalize Q3 board deck', owner: 'Dana P.', ownerTitle: 'VP Finance', status: 'in-progress', eta: 'Aug 18' },
    { task: 'Complete PenTest remediation', owner: 'Alex C.', ownerTitle: 'Sec Eng', status: 'blocked', eta: 'Aug 20', detail: 'Waiting on vendor patch' },
    { task: 'Initech renewal proposal', owner: 'Sam K.', ownerTitle: 'AE', status: 'pending', eta: 'Aug 22' },
    { task: 'Update DR runbook', owner: 'Riley W.', ownerTitle: 'SRE', status: 'complete' },
  ],
};

const relationshipCardData = {
  name: 'Jordan Lee',
  role: 'VP Engineering, Acme Corp',
  sentiment: 'watch' as const,
  trajectory: 'cooling' as const,
  lastContact: 'Jul 31, 2024',
  daysSince: 22,
  commitments: [
    'Intro to their CISO by end of Q3',
    'Feedback on v3.0 beta by Aug 15',
  ],
  actionNeeded: 'Schedule QBR — no touchpoint in 22 days',
  riskLevel: 'medium' as const,
};

const countryCardData = {
  country: 'Germany',
  flag: '🇩🇪',
  revenue: '€18.4M',
  employees: '142',
  factories: ['Berlin', 'Munich', 'Hamburg'],
  politicalRisk: 'low' as const,
  tradeExposure: 'Moderate tariff exposure on US-manufactured components',
  currency: 'EUR',
  hedgedPercent: 65,
  relationshipHealth: 'strong' as const,
  keyContact: 'Maja Becker',
};

const dataClusterData = {
  title: 'Platform Vitals',
  metrics: [
    { label: 'DAU', value: '84K', trend: 'up' as const, change: '+9%' },
    { label: 'MAU', value: '312K', trend: 'up' as const, change: '+14%' },
    { label: 'P99 Latency', value: '340ms', trend: 'down' as const, change: '-18%' },
    { label: 'Error Rate', value: '0.4%', trend: 'flat' as const, change: '0' },
    { label: 'Uptime', value: '99.97%', trend: 'up' as const, change: '+0.02' },
    { label: 'Deploys/wk', value: '12', trend: 'up' as const, change: '+4' },
  ],
};

const calendarCardData = {
  title: 'Upcoming Schedule',
  events: [
    { title: 'Q3 Board Review', date: 'Aug 20, 2024', time: '10:00 AM', duration: '2h', status: 'confirmed' },
    { title: 'Initech QBR', date: 'Aug 22, 2024', time: '2:00 PM', duration: '1h', status: 'tentative', note: 'Confirm with Jordan Lee' },
    { title: 'Product All-Hands', date: 'Aug 25, 2024', time: '11:00 AM', duration: '1.5h', status: 'confirmed' },
    { title: 'Infra Maintenance', date: 'Aug 27, 2024', time: '2:00 AM', duration: '4h', status: 'pending', note: 'DB migration window' },
  ],
};

// ─── Layout helpers ───────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-data text-xs uppercase tracking-[0.2em] mb-4 pb-2 border-b"
        style={{ color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.08)' }}>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {children}
      </div>
    </section>
  );
}

function CardFrame({
  label,
  children,
  wide = false,
  tall = false,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
  tall?: boolean;
}) {
  return (
    <div className={wide ? 'md:col-span-2 xl:col-span-3' : ''}>
      <p className="font-data text-[10px] uppercase tracking-widest mb-1.5"
        style={{ color: 'rgba(255,255,255,0.28)' }}>
        {label}
      </p>
      <div
        className="rounded-xl p-4 border overflow-hidden"
        style={{
          backgroundColor: 'var(--theme-card-bg)',
          borderColor: 'var(--theme-card-border)',
          backdropFilter: 'blur(var(--theme-card-blur))',
          height: tall ? '320px' : '220px',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CardShowcasePage() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-12" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-hero text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Card Showcase
        </h1>
        <p className="font-voice text-base" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Visual reference for all {30} card components — rendered with sample data exactly as they appear in live scenes.
        </p>
      </div>

      {/* Core Data */}
      <Section title="Core Data">
        <CardFrame label="KPIStrip" wide>
          <KPIStrip {...kpiStripData} />
        </CardFrame>
        <CardFrame label="BarChart">
          <BarChart {...barChartData} />
        </CardFrame>
        <CardFrame label="DonutChart">
          <DonutChart {...donutChartData} />
        </CardFrame>
        <CardFrame label="LineChart">
          <LineChart {...lineChartData} />
        </CardFrame>
        <CardFrame label="TableCard" wide>
          <TableCard {...tableCardData} />
        </CardFrame>
        <CardFrame label="MetricList">
          <MetricList {...metricListData} />
        </CardFrame>
        <CardFrame label="AlertCard" tall>
          <AlertCard {...alertCardData} />
        </CardFrame>
        <CardFrame label="StatCard">
          <StatCard {...statCardData} />
        </CardFrame>
        <CardFrame label="CalloutCard">
          <CalloutCard {...calloutCardData} />
        </CardFrame>
      </Section>

      {/* Data Visualization */}
      <Section title="Data Visualization">
        <CardFrame label="HeatmapCard" wide>
          <HeatmapCard {...heatmapData} />
        </CardFrame>
        <CardFrame label="TimelineCard" tall>
          <TimelineCard {...timelineData} />
        </CardFrame>
        <CardFrame label="WaterfallCard" tall>
          <WaterfallCard {...waterfallData} />
        </CardFrame>
        <CardFrame label="StackedBarCard">
          <StackedBarCard {...stackedBarData} />
        </CardFrame>
      </Section>

      {/* People & Organization */}
      <Section title="People & Organization">
        <CardFrame label="PersonCard">
          <PersonCard {...personCardData} />
        </CardFrame>
        <CardFrame label="OrgRoster" tall wide>
          <OrgRoster {...orgRosterData} />
        </CardFrame>
      </Section>

      {/* Rich Content */}
      <Section title="Rich Content">
        <CardFrame label="ChecklistCard" tall>
          <ChecklistCard {...checklistData} />
        </CardFrame>
        <CardFrame label="InfoCard">
          <InfoCard {...infoCardData} />
        </CardFrame>
        <CardFrame label="BulletListCard">
          <BulletListCard {...bulletListData} />
        </CardFrame>
        <CardFrame label="ImageCard">
          <ImageCard {...imageCardData} />
        </CardFrame>
      </Section>

      {/* Comparison */}
      <Section title="Comparison">
        <CardFrame label="ComparisonTable" wide tall>
          <ComparisonTable {...comparisonTableData} />
        </CardFrame>
        <CardFrame label="RankedListCard" tall>
          <RankedListCard {...rankedListData} />
        </CardFrame>
      </Section>

      {/* Operational */}
      <Section title="Operational">
        <CardFrame label="IncidentCard" tall>
          <IncidentCard {...incidentCardData} />
        </CardFrame>
        <CardFrame label="PipelineCard" tall>
          <PipelineCard {...pipelineCardData} />
        </CardFrame>
        <CardFrame label="RiskMatrixCard" tall>
          <RiskMatrixCard {...riskMatrixData} />
        </CardFrame>
      </Section>

      {/* Executive Action */}
      <Section title="Executive Action">
        <CardFrame label="DecisionCard" tall>
          <DecisionCard {...decisionCardData} />
        </CardFrame>
        <CardFrame label="DelegationCard" tall>
          <DelegationCard {...delegationCardData} />
        </CardFrame>
      </Section>

      {/* Cross-Domain Intelligence */}
      <Section title="Cross-Domain Intelligence">
        <CardFrame label="RelationshipCard" tall>
          <RelationshipCard {...relationshipCardData} />
        </CardFrame>
        <CardFrame label="CountryCard" tall>
          <CountryCard {...countryCardData} />
        </CardFrame>
        <CardFrame label="DataClusterCard" tall>
          <DataClusterCard {...dataClusterData} />
        </CardFrame>
        <CardFrame label="CalendarCard" tall>
          <CalendarCard {...calendarCardData} />
        </CardFrame>
      </Section>
    </main>
  );
}
