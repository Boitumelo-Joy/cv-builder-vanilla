// ============================================================================
// CV Builder Pro — vanilla JS port (converted from React/TSX)
// ============================================================================

// ── Mock Data ────────────────────────────────────────────────────────────

const TEMPLATES = [
  { id: 'minimal', name: 'Minimal', tier: 'free', desc: 'Clean single-column layout' },
  { id: 'executive', name: 'Executive', tier: 'premium', desc: 'Two-column with sidebar accents' },
  { id: 'creative', name: 'Creative', tier: 'premium', desc: 'Bold headline, color blocks' },
  { id: 'timeline', name: 'Timeline', tier: 'platinum', desc: 'Vertical timeline with icons' },
  { id: 'academic', name: 'Academic', tier: 'platinum', desc: 'Publication-ready scholarly format' },
  { id: 'tech', name: 'Tech', tier: 'premium', desc: 'Skills matrix, compact grid layout' },
];

const PLANS = [
  {
    id: 'basic', name: 'Basic', price: 'R50',
    desc: 'Everything you need to get started',
    features: ['3 CV documents', '2 templates (Minimal + Executive)', 'PDF export (no watermark)', 'ATS score checker', 'Job board access', 'Email support'],
    cta: 'Get Basic', highlight: false,
  },
  {
    id: 'standard', name: 'Standard', price: 'R150',
    desc: 'For serious job seekers',
    features: ['Unlimited CVs', 'All 6 premium templates', 'Cover letter builder', 'Version history', 'Interview prep (all questions)', 'AI writing assistant', 'Priority email support'],
    cta: 'Get Standard', highlight: true,
  },
  {
    id: 'premium', name: 'Premium', price: 'R250',
    desc: 'For career professionals',
    features: ['Everything in Standard', 'LinkedIn profile import', 'Custom shareable CV link', 'Voice interview coaching', 'Dedicated career advisor', '1-on-1 CV review session', 'Priority phone support'],
    cta: 'Get Premium', highlight: false,
  },
];

const defaultCVData = {
  name: 'Alexandra Chen',
  title: 'Senior Product Designer',
  email: 'alex.chen@email.com',
  phone: '+1 (415) 555-0192',
  location: 'San Francisco, CA',
  summary: 'Product designer with 8 years shaping consumer and enterprise experiences at scale. I bridge research, strategy, and craft — turning ambiguous problems into clear, beautiful solutions.',
  experience: [
    { company: 'Stripe', role: 'Senior Product Designer', period: '2021 – Present', desc: 'Led redesign of the Payments dashboard serving 4M+ merchants. Reduced task completion time by 34%.' },
    { company: 'Figma', role: 'Product Designer', period: '2018 – 2021', desc: 'Shipped the component library feature used by 90% of enterprise customers.' },
    { company: 'IDEO', role: 'UX Designer', period: '2016 – 2018', desc: 'Designed healthcare and fintech products for Fortune 500 clients.' },
  ],
  education: [
    { school: 'Carnegie Mellon University', degree: 'M.Des. Interaction Design', year: '2016' },
    { school: 'UC Berkeley', degree: 'B.A. Cognitive Science', year: '2014' },
  ],
  skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'React', 'TypeScript'],
};

const INTERVIEW_QUESTIONS = {
  Behavioral: [
    { q: "Tell me about yourself.", tip: "Use the Present–Past–Future formula: current role, how you got here, where you're headed.", tier: 'free' },
    { q: "Describe a time you handled a conflict with a colleague.", tip: "Use STAR (Situation, Task, Action, Result). Focus on resolution, not blame.", tier: 'free' },
    { q: "What is your greatest professional achievement?", tip: "Quantify the impact. Numbers (%, $, time saved) make answers memorable.", tier: 'free' },
    { q: "Tell me about a time you failed and what you learned.", tip: "Pick a real failure. Interviewers reward self-awareness and growth mindset.", tier: 'premium' },
    { q: "How do you prioritize when you have multiple deadlines?", tip: "Show a system (Eisenhower matrix, MoSCoW, etc.) not just 'I make a list'.", tier: 'premium' },
    { q: "Describe a situation where you had to lead without authority.", tip: "Highlight influence through credibility, not hierarchy.", tier: 'premium' },
    { q: "Tell me about a time you disagreed with your manager.", tip: "Show you raised it respectfully, explained your reasoning, then committed to the decision.", tier: 'platinum' },
    { q: "How have you handled receiving critical feedback?", tip: "Show you seek it proactively and act on it. Give a concrete example.", tier: 'platinum' },
  ],
  Situational: [
    { q: "If a key team member quit the day before a major launch, what would you do?", tip: "Show calm decision-making: triage scope, communicate proactively, mobilize resources.", tier: 'free' },
    { q: "How would you handle a client who is unhappy with your work?", tip: "Listen first, validate the concern, then propose a concrete remediation plan.", tier: 'free' },
    { q: "You're given a project with an impossible deadline. What do you do?", tip: "Push back with data, offer scope alternatives, and document the trade-offs.", tier: 'premium' },
    { q: "A junior team member is consistently underperforming. How do you approach it?", tip: "Early, direct, private feedback. Set clear expectations and offer support.", tier: 'premium' },
    { q: "You discover a colleague is cutting corners in a way that could harm the company. What do you do?", tip: "Document first, raise internally before escalating. Show judgment, not just rule-following.", tier: 'platinum' },
    { q: "How would you turn around a team with low morale?", tip: "Diagnose the root cause (workload? recognition? clarity?), then address it systematically.", tier: 'platinum' },
  ],
  Technical: [
    { q: "Walk me through how you approach a complex problem you've never seen before.", tip: "Show structured decomposition: clarify constraints, break into sub-problems, prototype fast.", tier: 'free' },
    { q: "How do you stay current with trends in your field?", tip: "Name specific sources. Saying 'I read blogs' is weak; name the blogs.", tier: 'free' },
    { q: "Describe your workflow for delivering high-quality work under tight timelines.", tip: "Show a real system — tools, habits, review rituals. Specific > vague.", tier: 'premium' },
    { q: "How do you measure the success of your work?", tip: "Link outputs to outcomes. Show you track results, not just deliverables.", tier: 'premium' },
    { q: "What technical skill are you working on improving right now, and why?", tip: "Show genuine self-awareness and a concrete learning plan.", tier: 'platinum' },
    { q: "Describe a technical decision you made that you later regretted.", tip: "Be honest. Show you spotted it, fixed it, and changed your process to prevent recurrence.", tier: 'platinum' },
  ],
  Motivation: [
    { q: "Why do you want to work at this company?", tip: "Reference something specific: a product, a value, a mission — not just 'great culture'.", tier: 'free' },
    { q: "Where do you see yourself in 5 years?", tip: "Show ambition aligned with the role. Avoid 'your job' or 'I don't know'.", tier: 'free' },
    { q: "What motivates you to do your best work?", tip: "Be honest. Interviewers can tell when answers are rehearsed platitudes.", tier: 'premium' },
    { q: "Why are you leaving your current role?", tip: "Be positive or neutral. Never badmouth previous employers.", tier: 'premium' },
    { q: "What does your ideal work environment look like?", tip: "Research the company culture and align your answer — but stay honest.", tier: 'platinum' },
    { q: "What's a non-negotiable for you in your next role?", tip: "Pick something meaningful that reveals your values, not a deal-breaker that disqualifies you.", tier: 'platinum' },
  ],
};

const CATEGORY_ICONS = { Behavioral: '◈', Situational: '⟡', Technical: '⬡', Motivation: '◎' };

const JOB_LISTINGS = [
  { id: '1', title: 'Senior Product Designer', company: 'Stripe', location: 'San Francisco, CA', type: 'Full-time', salary: '$160k – $210k', posted: '2d ago', category: 'Design', tier: 'free', match: 97, tags: ['Figma', 'Design Systems', 'Prototyping'], desc: "Join Stripe's design team to shape the future of payments infrastructure. You'll lead end-to-end design for our core dashboard products.", logo: 'S' },
  { id: '2', title: 'UX Researcher', company: 'Notion', location: 'Remote', type: 'Remote', salary: '$130k – $160k', posted: '3d ago', category: 'Design', tier: 'free', match: 84, tags: ['User Research', 'Interviews', 'Usability Testing'], desc: "Work with product and design teams to uncover user insights that shape Notion's roadmap. Mixed-methods research across web and mobile.", logo: 'N' },
  { id: '3', title: 'Product Manager – Growth', company: 'Linear', location: 'New York, NY', type: 'Full-time', salary: '$150k – $190k', posted: '1d ago', category: 'Product', tier: 'premium', match: 79, tags: ['Growth', 'Analytics', 'A/B Testing'], desc: "Own the growth funnel at Linear — from activation to retention. You'll run experiments, analyze funnels, and partner with engineering.", logo: 'L' },
  { id: '4', title: 'Frontend Engineer', company: 'Vercel', location: 'Remote', type: 'Remote', salary: '$140k – $180k', posted: '5d ago', category: 'Engineering', tier: 'free', match: 71, tags: ['React', 'TypeScript', 'Next.js'], desc: "Build the interfaces powering Vercel's developer platform. Work across the full stack with a focus on performance and DX.", logo: 'V' },
  { id: '5', title: 'Brand Designer', company: 'Loom', location: 'Los Angeles, CA', type: 'Full-time', salary: '$120k – $150k', posted: '1w ago', category: 'Design', tier: 'premium', match: 88, tags: ['Brand', 'Motion', 'Figma'], desc: "Define and evolve Loom's visual identity across marketing, product, and video. End-to-end ownership from concept to execution.", logo: 'L' },
  { id: '6', title: 'Design Systems Lead', company: 'Atlassian', location: 'Sydney, AU', type: 'Full-time', salary: 'AU$180k – AU$220k', posted: '4d ago', category: 'Design', tier: 'premium', match: 93, tags: ['Design Systems', 'Tokens', 'React'], desc: 'Build and scale the Atlassian Design System used by thousands of developers and designers across Jira, Confluence, and Trello.', logo: 'A' },
  { id: '7', title: 'Staff Software Engineer', company: 'Figma', location: 'San Francisco, CA', type: 'Full-time', salary: '$220k – $280k', posted: '2d ago', category: 'Engineering', tier: 'platinum', match: 66, tags: ['C++', 'WebAssembly', 'Performance'], desc: "Work on the core rendering engine that powers Figma's canvas. Requires deep systems programming expertise.", logo: 'F' },
  { id: '8', title: 'Head of Content Design', company: 'Airbnb', location: 'San Francisco, CA', type: 'Full-time', salary: '$180k – $230k', posted: '6d ago', category: 'Design', tier: 'platinum', match: 75, tags: ['Content Design', 'UX Writing', 'Leadership'], desc: "Lead a team of content designers embedded across Airbnb's product org. Set the strategy for voice, tone, and information architecture.", logo: 'A' },
  { id: '9', title: 'Product Designer – Mobile', company: 'Cash App', location: 'Remote', type: 'Remote', salary: '$140k – $175k', posted: '3d ago', category: 'Design', tier: 'premium', match: 81, tags: ['Mobile', 'iOS', 'Fintech'], desc: 'Design the mobile experience for millions of Cash App users. Own flows across payments, investing, and banking products.', logo: 'C' },
  { id: '10', title: 'Engineering Manager', company: 'Shopify', location: 'Remote', type: 'Remote', salary: '$160k – $200k', posted: '1w ago', category: 'Engineering', tier: 'platinum', match: 58, tags: ['Ruby', 'Leadership', 'Agile'], desc: "Lead a team of 6–8 engineers building Shopify's checkout infrastructure. Partner with product and design on roadmap planning.", logo: 'S' },
  { id: '11', title: 'Motion Designer', company: 'Apple', location: 'Cupertino, CA', type: 'Full-time', salary: '$130k – $165k', posted: '2w ago', category: 'Design', tier: 'free', match: 69, tags: ['After Effects', 'Motion', 'Protopie'], desc: "Create micro-interactions and motion design for Apple's system UI. Work closely with engineering to implement production-ready animations.", logo: 'A' },
  { id: '12', title: 'Data Analyst – Product', company: 'Duolingo', location: 'Pittsburgh, PA', type: 'Full-time', salary: '$110k – $140k', posted: '5d ago', category: 'Analytics', tier: 'premium', match: 62, tags: ['SQL', 'Python', 'Looker'], desc: 'Analyse engagement and retention data to inform product decisions. Build dashboards and partner with PMs on experimentation.', logo: 'D' },
];

const JOB_CATEGORIES = ['All', 'Design', 'Engineering', 'Product', 'Analytics'];
const JOB_TYPES = ['All', 'Full-time', 'Remote', 'Contract', 'Part-time'];
const LOGO_COLORS = { S: '#635bff', N: '#f4f4f5', L: '#5e6ad2', V: '#000', F: '#a259ff', A: '#ff5a5f', C: '#00d54b', D: '#58cc02' };

// ── Utility ──────────────────────────────────────────────────────────────

function esc(str) {
  if (str === undefined || str === null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function tierBadge(tier) {
  if (tier === 'free') return `<span class="badge badge-free">FREE</span>`;
  if (tier === 'pro' || tier === 'premium') return `<span class="badge badge-premium">PREMIUM</span>`;
  return `<span class="badge badge-platinum">PLATINUM</span>`;
}

function canAccessTemplate(templateTier, userPlan) {
  if (templateTier === 'free') return true;
  if (templateTier === 'pro' || templateTier === 'premium') return userPlan === 'standard' || userPlan === 'premium' || userPlan === 'platinum';
  if (templateTier === 'elite' || templateTier === 'platinum') return userPlan === 'platinum';
  return false;
}

function canAccessTier(tier, userPlan) {
  return canAccessTemplate(tier, userPlan);
}

function initials(name) {
  return name.split(' ').map(n => n[0]).join('');
}

function getDeep(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function setDeep(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

// ── CV Preview ───────────────────────────────────────────────────────────

function cvPreviewHTML(data, template) {
  if (template === 'executive') {
    return `
    <div style="background:#fff;color:#1a1a1a;font-family:'DM Sans',sans-serif;font-size:11px;line-height:1.5;display:flex;min-height:600px;">
      <div style="width:180px;background:#1a1a1a;color:#f4f4f5;padding:28px 16px;flex-shrink:0;">
        <div style="width:52px;height:52px;border-radius:50%;background:#d4f84b;display:flex;align-items:center;justify-content:center;color:#09090b;font-weight:700;font-size:18px;margin-bottom:16px;">${esc(initials(data.name))}</div>
        <div style="font-size:13px;font-weight:600;color:#d4f84b;margin-bottom:4px;">${esc(data.name)}</div>
        <div style="font-size:10px;color:#a1a1aa;margin-bottom:20px;">${esc(data.title)}</div>
        <div style="font-size:9px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Contact</div>
        <div style="font-size:10px;color:#d4d4d8;margin-bottom:4px;">${esc(data.email)}</div>
        <div style="font-size:10px;color:#d4d4d8;margin-bottom:4px;">${esc(data.phone)}</div>
        <div style="font-size:10px;color:#d4d4d8;margin-bottom:20px;">${esc(data.location)}</div>
        <div style="font-size:9px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Skills</div>
        ${data.skills.map(s => `<div style="font-size:10px;color:#d4d4d8;margin-bottom:3px;">• ${esc(s)}</div>`).join('')}
      </div>
      <div style="flex:1;padding:28px 20px;">
        <div style="font-size:9px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Summary</div>
        <div style="font-size:10px;color:#3f3f46;margin-bottom:20px;line-height:1.6;">${esc(data.summary)}</div>
        <div style="font-size:9px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;">Experience</div>
        ${data.experience.map(exp => `
          <div style="margin-bottom:14px;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <span style="font-weight:600;font-size:11px;">${esc(exp.role)}</span>
              <span style="font-size:9px;color:#71717a;">${esc(exp.period)}</span>
            </div>
            <div style="font-size:10px;color:#d4f84b;margin-bottom:3px;background:#09090b;display:inline-block;padding:0 4px;border-radius:2px;">${esc(exp.company)}</div>
            <div style="font-size:10px;color:#3f3f46;">${esc(exp.desc)}</div>
          </div>`).join('')}
        <div style="font-size:9px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;margin-top:16px;">Education</div>
        ${data.education.map(edu => `
          <div style="margin-bottom:10px;">
            <div style="font-weight:600;font-size:11px;">${esc(edu.degree)}</div>
            <div style="font-size:10px;color:#71717a;">${esc(edu.school)} · ${esc(edu.year)}</div>
          </div>`).join('')}
      </div>
    </div>`;
  }

  return `
  <div style="background:#fff;color:#1a1a1a;font-family:'DM Sans',sans-serif;font-size:11px;line-height:1.5;padding:32px 28px;">
    <div style="border-bottom:2px solid #09090b;padding-bottom:16px;margin-bottom:20px;">
      <div style="font-size:22px;font-family:'Fraunces',serif;font-weight:700;margin-bottom:2px;">${esc(data.name)}</div>
      <div style="font-size:12px;color:#71717a;margin-bottom:8px;">${esc(data.title)}</div>
      <div style="display:flex;gap:16px;font-size:10px;color:#52525b;">
        <span>${esc(data.email)}</span><span>${esc(data.phone)}</span><span>${esc(data.location)}</span>
      </div>
    </div>
    <div style="margin-bottom:18px;">
      <div style="font-size:9px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#71717a;margin-bottom:6px;">Summary</div>
      <div style="font-size:10px;color:#3f3f46;line-height:1.7;">${esc(data.summary)}</div>
    </div>
    <div style="margin-bottom:18px;">
      <div style="font-size:9px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#71717a;margin-bottom:8px;">Experience</div>
      ${data.experience.map(exp => `
        <div style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;">
            <span style="font-weight:600;">${esc(exp.role)}</span>
            <span style="color:#71717a;font-size:10px;">${esc(exp.period)}</span>
          </div>
          <div style="color:#52525b;font-size:10px;margin-bottom:2px;">${esc(exp.company)}</div>
          <div style="color:#3f3f46;font-size:10px;">${esc(exp.desc)}</div>
        </div>`).join('')}
    </div>
    <div style="margin-bottom:18px;">
      <div style="font-size:9px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#71717a;margin-bottom:8px;">Education</div>
      ${data.education.map(edu => `
        <div style="margin-bottom:8px;">
          <div style="font-weight:600;">${esc(edu.degree)}</div>
          <div style="color:#71717a;font-size:10px;">${esc(edu.school)} · ${esc(edu.year)}</div>
        </div>`).join('')}
    </div>
    <div>
      <div style="font-size:9px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#71717a;margin-bottom:8px;">Skills</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${data.skills.map(s => `<span style="background:#f4f4f5;padding:2px 8px;border-radius:3px;font-size:10px;">${esc(s)}</span>`).join('')}
      </div>
    </div>
  </div>`;
}

// ── Global State ─────────────────────────────────────────────────────────

const state = {
  view: 'landing',
  user: null, // { name, email, plan }
  cvs: [], // { id, title, template, updatedAt, locked }
  activeCVId: null,
  cvData: JSON.parse(JSON.stringify(defaultCVData)),
  selectedTemplate: 'minimal',
  idCounter: 1,

  auth: { mode: 'signin', name: '', email: '', password: '', error: '' },

  dashboard: { showPaywall: false, uploading: false },

  editor: { tab: 'personal', showTemplateLock: false, saved: false, skillInput: '' },

  interview: {
    category: 'Behavioral', activeQ: null, practiced: new Set(), showUpgrade: false,
    messages: [], speechStatus: 'idle', transcript: '', achievements: [], recognition: null,
  },

  jobs: {
    category: 'All', jobType: 'All', search: '', selectedJob: null,
    saved: new Set(), showUpgrade: false, appliedJobs: new Set(),
  },
};

// ── Render dispatch ──────────────────────────────────────────────────────

function render() {
  const root = document.getElementById('root');
  let html = '';
  switch (state.view) {
    case 'landing': html = renderLanding(); break;
    case 'signin': case 'signup': html = renderAuth(); break;
    case 'pricing': html = renderPricing(); break;
    case 'dashboard': html = state.user ? renderDashboard() : renderAuth(); break;
    case 'editor': html = state.user ? renderEditor() : renderAuth(); break;
    case 'interview': html = state.user ? renderInterview() : renderAuth(); break;
    case 'jobs': html = state.user ? renderJobs() : renderAuth(); break;
    default: html = renderLanding();
  }
  root.innerHTML = html;
  afterRender();
}

function afterRender() {
  // Auto-scroll chat to bottom in interview modal
  const chatEnd = document.getElementById('chat-end');
  if (chatEnd && typeof chatEnd.scrollIntoView === 'function') chatEnd.scrollIntoView({ behavior: 'smooth' });
}

function nav(v) {
  if ((v === 'dashboard' || v === 'editor' || v === 'interview' || v === 'jobs') && !state.user) {
    state.view = 'signin';
    render();
    return;
  }
  state.view = v;
  render();
}

// Re-render while preserving focus/selection on the active data-model input
function rerenderPreserveFocus() {
  const active = document.activeElement;
  let model = null, selStart = null, selEnd = null;
  if (active && active.dataset && active.dataset.model) {
    model = active.dataset.model;
    selStart = active.selectionStart;
    selEnd = active.selectionEnd;
  }
  render();
  if (model) {
    const el = document.querySelector(`[data-model="${CSS.escape(model)}"]`);
    if (el) {
      el.focus();
      if (typeof selStart === 'number' && el.setSelectionRange) {
        try { el.setSelectionRange(selStart, selEnd); } catch (e) {}
      }
    }
  }
}

// ── Landing Page ─────────────────────────────────────────────────────────

function renderLanding() {
  const features = [
    { icon: '◈', title: 'Professional templates', desc: '6 ATS-optimized designs from minimal to creative. Unlock more with Pro.' },
    { icon: '⟡', title: 'Smart content editor', desc: 'Real-time preview as you type. Section reordering, bullet suggestions.' },
    { icon: '⬡', title: 'AI writing assistant', desc: 'Get tailored bullet point suggestions based on your role and industry. Pro feature.' },
    { icon: '◎', title: 'One-click PDF export', desc: 'Pixel-perfect PDF output. Pro removes the watermark from exports.' },
    { icon: '⊞', title: 'Version history', desc: 'Restore any previous version of your CV. Available on Pro and Elite.' },
    { icon: '◆', title: 'Shareable links', desc: 'Share your CV via a custom URL. Requires Elite plan.' },
  ];
  const stats = [['12k+', 'CVs created'], ['94%', 'Interview rate'], ['6 min', 'Avg. build time']];

  return `
  <div class="page-dark">
    <nav class="topnav">
      <div class="brand">CV Builder<span> Pro</span></div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="btn-text" data-nav="pricing">Pricing</button>
        <button class="btn btn-ghost-outline" data-nav="signin">Sign in</button>
        <button class="btn btn-primary" data-nav="signup">Get started</button>
      </div>
    </nav>

    <section class="container" style="padding:96px 40px 80px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
      <div>
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(212,248,75,0.08);border:1px solid rgba(212,248,75,0.2);border-radius:20px;padding:4px 12px;margin-bottom:24px;">
          <span style="width:6px;height:6px;border-radius:50%;background:#d4f84b;display:inline-block;"></span>
          <span style="font-size:12px;color:#d4f84b;font-family:'DM Mono';">CV builder for professionals</span>
        </div>
        <h1 style="font-family:'Fraunces',serif;font-size:clamp(40px,5vw,64px);line-height:1.1;font-weight:800;margin-bottom:20px;letter-spacing:-0.02em;">
          Build CVs that<br><span style="color:#d4f84b;font-style:italic;">get noticed.</span>
        </h1>
        <p style="font-size:17px;color:#a1a1aa;line-height:1.7;margin-bottom:36px;max-width:420px;">
          Create, customize, and export stunning CVs in minutes. ATS-optimized templates, AI suggestions, and one-click exports — all in one place.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn btn-primary" style="padding:14px 28px;font-size:15px;" data-nav="signup">Start for free →</button>
          <button class="btn btn-ghost-outline" style="padding:14px 28px;font-size:15px;" data-nav="pricing">View pricing</button>
        </div>
        <div style="display:flex;gap:24px;margin-top:40px;">
          ${stats.map(([n, l]) => `
            <div>
              <div style="font-family:'Fraunces',serif;font-size:24px;font-weight:700;color:#d4f84b;">${n}</div>
              <div style="font-size:12px;color:#71717a;">${l}</div>
            </div>`).join('')}
        </div>
      </div>
      <div style="position:relative;">
        <div style="background:#111113;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,0.6);">
          <div style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;gap:6px;">
            ${['#ff5f57', '#febc2e', '#28c840'].map(c => `<div style="width:10px;height:10px;border-radius:50%;background:${c};"></div>`).join('')}
            <div style="flex:1;height:10px;background:rgba(255,255,255,0.04);border-radius:4px;margin-left:8px;"></div>
          </div>
          <div style="transform:scale(0.85);transform-origin:top center;height:420px;">
            ${cvPreviewHTML(defaultCVData, 'executive')}
          </div>
        </div>
        <div style="position:absolute;bottom:-16px;right:-16px;background:#d4f84b;border-radius:8px;padding:10px 14px;box-shadow:0 8px 24px rgba(212,248,75,0.3);">
          <div style="font-size:10px;font-family:'DM Mono';color:#09090b;font-weight:500;">ATS SCORE</div>
          <div style="font-size:20px;font-weight:700;color:#09090b;font-family:'Fraunces',serif;">98%</div>
        </div>
      </div>
    </section>

    <section class="container" style="padding:80px 40px;">
      <div style="text-align:center;margin-bottom:56px;">
        <div style="font-size:11px;font-family:'DM Mono';color:#71717a;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;">Features</div>
        <h2 style="font-family:'Fraunces',serif;font-size:clamp(28px,3.5vw,44px);font-weight:700;letter-spacing:-0.02em;">Everything you need to land the job</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:2px;">
        ${features.map(f => `
          <div class="feature-card">
            <div style="font-size:22px;color:#d4f84b;margin-bottom:12px;">${f.icon}</div>
            <div style="font-weight:600;font-size:15px;margin-bottom:8px;">${f.title}</div>
            <div style="font-size:13px;color:#71717a;line-height:1.6;">${f.desc}</div>
          </div>`).join('')}
      </div>
    </section>

    <section class="container" style="margin-bottom:80px;">
      <div style="background:linear-gradient(135deg, rgba(212,248,75,0.08) 0%, rgba(212,248,75,0.03) 100%);border:1px solid rgba(212,248,75,0.15);border-radius:16px;padding:64px 48px;text-align:center;">
        <h2 style="font-family:'Fraunces',serif;font-size:clamp(28px,3vw,40px);font-weight:700;margin-bottom:16px;letter-spacing:-0.02em;">Ready to build your next CV?</h2>
        <p style="font-size:15px;color:#a1a1aa;margin-bottom:32px;">Join 12,000+ professionals who landed their dream jobs with CV Builder Pro.</p>
        <button class="btn btn-primary" style="padding:14px 32px;font-size:15px;" data-nav="signup">Create your free account →</button>
      </div>
    </section>

    <footer class="container" style="border-top:1px solid rgba(255,255,255,0.06);padding:32px 40px;display:flex;justify-content:space-between;align-items:center;color:#71717a;font-size:13px;">
      <div style="font-family:'Fraunces',serif;font-size:18px;color:#d4f84b;font-weight:700;">CV Builder<span style="color:#52525b;"> Pro</span></div>
      <div>© 2025 CV Builder Pro. All rights reserved.</div>
    </footer>
  </div>`;
}

// ── Auth Page ────────────────────────────────────────────────────────────

function renderAuth() {
  const mode = state.view === 'signup' ? 'signup' : (state.view === 'signin' ? 'signin' : state.auth.mode);
  state.auth.mode = mode;
  const a = state.auth;
  const highlights = [
    { icon: '◈', title: 'Professional CV Builder', desc: 'Create stunning, ATS-optimised CVs in minutes with our expert templates.' },
    { icon: '⬡', title: 'Live Job Board', desc: 'Browse curated job listings matched to your skills and experience.' },
    { icon: '◇', title: 'Voice Interview Prep', desc: 'Practice with Morgan, your AI coach, using real voice conversations.' },
    { icon: '◎', title: 'Plans from R50/yr', desc: 'Affordable annual plans — Standard, Premium, and Platinum — billed in Rands.' },
  ];
  const trust = [['12k+', 'CVs created'], ['94%', 'Interview rate'], ['4.9★', 'User rating']];

  return `
  <div style="min-height:100vh;background:#09090b;display:flex;font-family:'DM Sans',sans-serif;">
    <div style="flex:1;background:linear-gradient(160deg, #0f1a06 0%, #09090b 60%);border-right:1px solid rgba(255,255,255,0.06);padding:48px 56px;display:flex;flex-direction:column;justify-content:space-between;">
      <div>
        <button class="btn-text" style="margin-bottom:48px;padding:0;" data-nav="landing">← Back to home</button>
        <div style="font-family:'Fraunces',serif;font-size:26px;font-weight:700;color:#d4f84b;margin-bottom:40px;">CV Builder<span style="color:#f4f4f5;"> Pro</span></div>
        <h2 style="font-family:'Fraunces',serif;font-size:clamp(28px,3vw,40px);font-weight:800;line-height:1.15;letter-spacing:-0.02em;color:#f4f4f5;margin-bottom:12px;">
          Land your dream job<br><span style="color:#d4f84b;font-style:italic;">faster.</span>
        </h2>
        <p style="font-size:15px;color:#71717a;line-height:1.7;margin-bottom:48px;max-width:380px;">South Africa's professional CV platform — built for job seekers who want results, not guesswork.</p>
        <div style="display:flex;flex-direction:column;gap:24px;">
          ${highlights.map(h => `
            <div style="display:flex;gap:16px;align-items:flex-start;">
              <div style="width:36px;height:36px;border-radius:8px;background:rgba(212,248,75,0.08);border:1px solid rgba(212,248,75,0.15);display:flex;align-items:center;justify-content:center;font-size:16px;color:#d4f84b;flex-shrink:0;">${h.icon}</div>
              <div>
                <div style="font-size:14px;font-weight:600;color:#f4f4f5;margin-bottom:3px;">${h.title}</div>
                <div style="font-size:13px;color:#71717a;line-height:1.55;">${h.desc}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>
      <div style="margin-top:48px;padding-top:28px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:11px;font-family:'DM Mono';color:#52525b;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:16px;">Trusted by professionals</div>
        <div style="display:flex;gap:28px;">
          ${trust.map(([n, l]) => `<div><div style="font-family:'Fraunces',serif;font-size:20px;font-weight:700;color:#d4f84b;">${n}</div><div style="font-size:11px;color:#71717a;">${l}</div></div>`).join('')}
        </div>
      </div>
    </div>

    <div style="width:480px;padding:48px 56px;display:flex;flex-direction:column;justify-content:center;">
      <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:700;margin-bottom:8px;color:#f4f4f5;">${mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
      <p style="color:#71717a;font-size:14px;margin-bottom:32px;">
        ${mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
        <button class="btn-link" data-action="auth-switch-mode">${mode === 'signin' ? 'Sign up free' : 'Sign in'}</button>
      </p>

      ${a.error ? `<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:7px;padding:10px 14px;font-size:13px;color:#f87171;margin-bottom:20px;">${esc(a.error)}</div>` : ''}

      <div style="display:flex;flex-direction:column;gap:16px;">
        ${mode === 'signup' ? `
        <div>
          <label class="field-label">Full name</label>
          <input class="input" data-model="auth.name" value="${esc(a.name)}" placeholder="Thabo Nkosi" />
        </div>` : ''}
        <div>
          <label class="field-label">Email address</label>
          <input class="input" type="email" data-model="auth.email" value="${esc(a.email)}" placeholder="you@email.co.za" />
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <label class="field-label" style="margin-bottom:0;">Password</label>
            ${mode === 'signin' ? `<button class="btn-link" style="font-size:12px;">Forgot?</button>` : ''}
          </div>
          <input class="input" type="password" data-model="auth.password" value="${esc(a.password)}" placeholder="••••••••" />
        </div>
        <button class="btn btn-primary" style="padding:13px;font-size:15px;font-weight:700;margin-top:4px;" data-action="auth-submit">${mode === 'signin' ? 'Sign in →' : 'Create free account →'}</button>
      </div>

      ${mode === 'signup' ? `<p style="font-size:11px;color:#52525b;text-align:center;margin-top:20px;line-height:1.6;">By signing up you agree to our Terms of Service and Privacy Policy.</p>` : ''}

      <div style="margin-top:36px;background:#111113;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:16px 18px;">
        <div style="font-size:11px;font-family:'DM Mono';color:#71717a;margin-bottom:10px;letter-spacing:0.06em;text-transform:uppercase;">Annual plans</div>
        <div style="display:flex;justify-content:space-between;">
          ${[['Standard', 'R50'], ['Premium', 'R150'], ['Platinum', 'R250']].map(([plan, price]) => `
            <div style="text-align:center;">
              <div style="font-size:13px;font-weight:600;color:${plan === 'Premium' ? '#d4f84b' : '#a1a1aa'};margin-bottom:2px;">${plan}</div>
              <div style="font-size:12px;font-family:'DM Mono';color:${plan === 'Premium' ? '#d4f84b' : '#52525b'};">${price}</div>
            </div>`).join('')}
        </div>
        <button class="btn" style="margin-top:12px;width:100%;background:none;border:1px solid rgba(255,255,255,0.08);color:#71717a;padding:7px;font-size:12px;" data-nav="pricing">View full pricing →</button>
      </div>
    </div>
  </div>`;
}

function authSubmit() {
  const a = state.auth;
  if (!a.email || !a.password) { a.error = 'Please fill in all fields.'; render(); return; }
  if (a.mode === 'signup' && !a.name) { a.error = 'Please enter your name.'; render(); return; }
  state.user = { name: a.name || a.email.split('@')[0], email: a.email, plan: 'free' };
  state.view = 'dashboard';
  a.error = '';
  render();
}

// ── Pricing Page ─────────────────────────────────────────────────────────

function renderPricing() {
  const user = state.user;
  const compareRows = [
    ['CV documents', '3', 'Unlimited', 'Unlimited'],
    ['Templates', '2', '6', '6'],
    ['PDF export (no watermark)', '✓', '✓', '✓'],
    ['ATS optimisation', '✓', '✓', '✓'],
    ['Interview prep', '–', '✓', '✓'],
    ['AI writing assistant', '–', '✓', '✓'],
    ['Voice interview coach', '–', '✓', '✓'],
    ['LinkedIn import', '–', '–', '✓'],
    ['1-on-1 CV review', '–', '–', '✓'],
    ['Dedicated career advisor', '–', '–', '✓'],
  ];

  return `
  <div style="min-height:100vh;background:#09090b;color:#f4f4f5;font-family:'DM Sans',sans-serif;">
    <nav class="topnav">
      <button class="brand" data-nav="landing" style="cursor:pointer;">CV Builder<span> Pro</span></button>
      ${user
        ? `<button class="btn btn-primary" data-nav="dashboard">Dashboard</button>`
        : `<button class="btn btn-primary" data-nav="signup">Get started</button>`}
    </nav>

    <div class="container" style="max-width:1060px;padding:80px 40px;">
      <div style="text-align:center;margin-bottom:60px;">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(212,248,75,0.07);border:1px solid rgba(212,248,75,0.18);border-radius:20px;padding:4px 14px;margin-bottom:20px;">
          <span style="width:6px;height:6px;border-radius:50%;background:#d4f84b;display:inline-block;"></span>
          <span style="font-size:12px;color:#d4f84b;font-family:'DM Mono';">Annual billing · Priced in ZAR</span>
        </div>
        <h1 style="font-family:'Fraunces',serif;font-size:clamp(32px,4vw,52px);font-weight:700;letter-spacing:-0.02em;margin-bottom:14px;">Choose your plan</h1>
        <p style="color:#a1a1aa;font-size:16px;max-width:480px;margin:0 auto;">One annual payment. No hidden fees. Cancel anytime. All prices in South African Rands.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;">
        ${PLANS.map(plan => {
          const isCurrent = user && user.plan === plan.id;
          return `
          <div style="background:${plan.highlight ? 'linear-gradient(160deg, #141a07, #111113)' : '#111113'};border:${plan.highlight ? '1px solid rgba(212,248,75,0.35)' : '1px solid rgba(255,255,255,0.07)'};border-radius:14px;padding:36px 28px;position:relative;display:flex;flex-direction:column;">
            ${plan.highlight ? `<div style="position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:#d4f84b;color:#09090b;font-size:10px;font-family:'DM Mono';font-weight:700;padding:4px 14px;border-radius:12px;white-space:nowrap;">MOST POPULAR</div>` : ''}
            <div style="font-size:11px;font-family:'DM Mono';color:${plan.highlight ? '#d4f84b' : '#71717a'};letter-spacing:0.12em;margin-bottom:12px;text-transform:uppercase;">${plan.name}</div>
            <div style="margin-bottom:4px;"><span style="font-family:'Fraunces',serif;font-size:44px;font-weight:800;color:#f4f4f5;letter-spacing:-0.02em;">${plan.price}</span></div>
            <div style="font-size:12px;font-family:'DM Mono';color:#52525b;margin-bottom:6px;">per year · billed annually</div>
            <div style="font-size:13px;color:#71717a;margin-bottom:28px;line-height:1.5;">${plan.desc}</div>
            <button data-action="upgrade-plan" data-plan="${plan.id}" ${isCurrent ? 'disabled' : ''}
              style="width:100%;background:${plan.highlight ? '#d4f84b' : isCurrent ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)'};border:${plan.highlight ? 'none' : isCurrent ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.12)'};color:${plan.highlight ? '#09090b' : isCurrent ? '#52525b' : '#f4f4f5'};cursor:${isCurrent ? 'default' : 'pointer'};padding:12px;font-size:14px;font-weight:700;border-radius:9px;margin-bottom:28px;transition:all 0.15s;">
              ${isCurrent ? '✓ Current plan' : plan.cta}
            </button>
            <div style="display:flex;flex-direction:column;gap:11px;flex:1;">
              ${plan.features.map(f => `
                <div style="display:flex;gap:10px;align-items:flex-start;">
                  <span style="color:${plan.highlight ? '#d4f84b' : '#71717a'};font-size:13px;flex-shrink:0;margin-top:1px;">✓</span>
                  <span style="font-size:13px;color:#a1a1aa;line-height:1.45;">${f}</span>
                </div>`).join('')}
            </div>
          </div>`;
        }).join('')}
      </div>

      <div style="margin-top:48px;background:#111113;border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;">
        <div style="padding:20px 28px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:14px;font-weight:600;color:#f4f4f5;">Feature comparison</span>
          <span style="font-size:12px;color:#52525b;font-family:'DM Mono';">All prices incl. VAT</span>
        </div>
        ${compareRows.map(([feature, std, prem, plat], i) => `
          <div style="display:grid;grid-template-columns:1fr repeat(3, 120px);padding:13px 28px;border-bottom:${i < compareRows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'};background:${i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'};">
            <span style="font-size:13px;color:#a1a1aa;">${feature}</span>
            ${[std, prem, plat].map(val => `<span style="font-size:13px;text-align:center;color:${val === '✓' ? '#d4f84b' : val === '–' ? '#3f3f46' : '#f4f4f5'};">${val}</span>`).join('')}
          </div>`).join('')}
        <div style="display:grid;grid-template-columns:1fr repeat(3, 120px);padding:16px 28px;border-top:1px solid rgba(255,255,255,0.08);background:rgba(212,248,75,0.03);">
          <span style="font-size:13px;font-weight:600;color:#f4f4f5;">Annual price</span>
          ${['R50', 'R150', 'R250'].map((p, j) => `<span style="font-size:14px;font-weight:700;text-align:center;color:${j === 1 ? '#d4f84b' : '#f4f4f5'};font-family:'DM Mono';">${p}</span>`).join('')}
        </div>
      </div>

      <div style="text-align:center;margin-top:40px;color:#52525b;font-size:13px;line-height:1.7;">
        All plans come with a <strong style="color:#a1a1aa;">14-day money-back guarantee</strong>. Questions? Email
        <span style="color:#d4f84b;">support@cvbuilderpro.co.za</span>
      </div>
    </div>
  </div>`;
}

function upgradePlan(planId) {
  if (!state.user) { nav('signup'); return; }
  state.user.plan = planId;
  render();
}

// ── App Sidebar ──────────────────────────────────────────────────────────

function renderSidebar(active) {
  const user = state.user;
  const navItems = [
    { label: 'My CVs', icon: '◈', view: 'dashboard' },
    { label: 'Job Board', icon: '⬡', view: 'jobs' },
    { label: 'Interview Prep', icon: '◇', view: 'interview' },
  ];
  return `
  <aside class="sidebar">
    <div class="sidebar-brand">CV Builder<span> Pro</span></div>
    <nav class="sidebar-nav">
      ${navItems.map(item => `
        <div class="sidebar-item ${active === item.view ? 'active' : ''}" data-nav="${item.view}">
          <span>${item.icon}</span><span>${item.label}</span>
        </div>`).join('')}
    </nav>
    <div class="sidebar-plan-box">
      <div class="sidebar-plan-card ${user.plan !== 'free' ? 'paid' : ''}">
        <div style="font-size:10px;font-family:'DM Mono';color:#71717a;margin-bottom:4px;">CURRENT PLAN</div>
        <div style="font-size:13px;font-weight:600;color:${user.plan === 'free' ? '#a1a1aa' : '#d4f84b'};text-transform:uppercase;margin-bottom:${user.plan === 'free' ? '10px' : '0'};">${user.plan}</div>
        ${user.plan === 'free' ? `<button class="btn" style="width:100%;background:#d4f84b;border:none;color:#09090b;padding:6px;font-size:11px;font-weight:700;border-radius:5px;font-family:'DM Mono';" data-nav="pricing">UPGRADE →</button>` : ''}
      </div>
    </div>
  </aside>`;
}

// ── Dashboard ────────────────────────────────────────────────────────────

function renderDashboard() {
  const user = state.user, cvs = state.cvs, d = state.dashboard;
  const canCreate = user.plan !== 'free' || cvs.length < 1;

  return `
  <div class="page-dark">
    <div style="display:flex;min-height:100vh;">
      ${renderSidebar('dashboard')}
      <div style="margin-left:220px;padding:0 12px;">
        <button class="signout-btn" data-action="sign-out">⇥ Sign out</button>
      </div>
      <input id="cv-upload-input" type="file" accept=".pdf,.doc,.docx,.txt" style="display:none;" data-action="upload-file-change" />
      <main class="app-main">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:40px;">
          <div>
            <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:700;margin-bottom:4px;">My CVs</h1>
            <p style="color:#71717a;font-size:14px;">Hello, ${esc(user.name)} · ${cvs.length} document${cvs.length !== 1 ? 's' : ''}</p>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="btn" data-action="dashboard-upload-click" ${d.uploading ? 'disabled' : ''}
              style="display:flex;align-items:center;gap:8px;background:${d.uploading ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.06)'};border:1px solid rgba(255,255,255,0.12);color:${d.uploading ? '#52525b' : '#f4f4f5'};padding:10px 18px;font-size:14px;font-weight:500;">
              ${d.uploading ? '⏳ Reading CV…' : '↑ Upload CV'}
            </button>
            <button class="btn btn-primary" data-action="dashboard-new-cv" style="display:flex;align-items:center;gap:8px;padding:10px 20px;">+ New CV</button>
          </div>
        </div>

        ${cvs.length === 0 ? `
        <div class="dashed-box">
          <div style="font-size:32px;margin-bottom:16px;">◈</div>
          <div style="font-size:16px;font-weight:600;margin-bottom:8px;">No CVs yet</div>
          <div style="font-size:13px;color:#71717a;margin-bottom:28px;">Start fresh or upload an existing CV — your details will be filled in automatically.</div>
          <div style="display:flex;gap:12px;justify-content:center;">
            <button class="btn" data-action="dashboard-upload-click" ${d.uploading ? 'disabled' : ''}
              style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);color:#f4f4f5;padding:11px 24px;font-size:14px;font-weight:500;">
              ${d.uploading ? '⏳ Reading…' : '↑ Upload CV'}
            </button>
            <button class="btn btn-primary" data-action="dashboard-new-cv" style="padding:11px 24px;">+ New CV</button>
          </div>
          <div style="margin-top:16px;font-size:12px;color:#52525b;">Supports PDF, Word (.docx), and text files · Your credentials are filled in automatically</div>
        </div>` : `
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:20px;">
          ${cvs.map(cv => `
            <div class="cv-card">
              <div style="height:160px;background:#161618;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
                <div style="transform:scale(0.38);transform-origin:center;width:420px;pointer-events:none;">
                  ${cvPreviewHTML(defaultCVData, cv.template)}
                </div>
                ${cv.locked ? `
                <div style="position:absolute;inset:0;background:rgba(9,9,11,0.75);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;">
                  <span style="font-size:20px;">🔒</span><span style="font-size:11px;font-family:'DM Mono';color:#d4f84b;">PRO TEMPLATE</span>
                </div>` : ''}
              </div>
              <div style="padding:16px;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                  <div>
                    <div style="font-weight:600;font-size:15px;margin-bottom:2px;">${esc(cv.title)}</div>
                    <div style="font-size:11px;color:#71717a;">Updated ${cv.updatedAt}</div>
                  </div>
                  ${tierBadge(cv.template === 'minimal' ? 'free' : 'pro')}
                </div>
                <div style="display:flex;gap:8px;margin-top:14px;">
                  <button class="btn" data-action="dashboard-edit-cv" data-id="${cv.id}" style="flex:1;background:rgba(212,248,75,0.08);border:1px solid rgba(212,248,75,0.15);color:#d4f84b;padding:7px;font-size:12px;font-weight:600;">Edit</button>
                  <button class="btn" data-action="dashboard-delete-cv" data-id="${cv.id}" style="background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.15);color:#f87171;padding:7px 12px;font-size:12px;">✕</button>
                </div>
              </div>
            </div>`).join('')}
        </div>`}
      </main>
    </div>

    ${d.showPaywall ? `
    <div class="modal-overlay">
      <div class="modal-card">
        <div style="font-size:36px;margin-bottom:16px;">🔒</div>
        <h2 style="font-family:'Fraunces',serif;font-size:24px;font-weight:700;margin-bottom:10px;">Upgrade to create more CVs</h2>
        <p style="color:#a1a1aa;font-size:14px;margin-bottom:28px;line-height:1.6;">Free accounts are limited to 1 CV. Upgrade to Pro to create unlimited CVs and unlock premium templates.</p>
        <div style="display:flex;gap:10px;">
          <button class="btn" data-action="dashboard-close-paywall" style="flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#a1a1aa;padding:11px;">Maybe later</button>
          <button class="btn btn-primary" data-action="dashboard-paywall-pricing" style="flex:2;padding:11px;">See pricing →</button>
        </div>
      </div>
    </div>` : ''}
  </div>`;
}

function dashboardNewCV() {
  const user = state.user, cvs = state.cvs;
  const canCreate = user.plan !== 'free' || cvs.length < 1;
  if (!canCreate) { state.dashboard.showPaywall = true; render(); return; }
  const id = String(state.idCounter++);
  state.cvs.unshift({ id, title: `CV #${id}`, template: 'minimal', updatedAt: 'just now', locked: false });
  state.activeCVId = id;
  state.cvData = JSON.parse(JSON.stringify(defaultCVData));
  state.selectedTemplate = 'minimal';
  nav('editor');
}

function dashboardEditCV(id) {
  state.activeCVId = id;
  state.cvData = JSON.parse(JSON.stringify(defaultCVData));
  const cv = state.cvs.find(c => c.id === id);
  if (cv) state.selectedTemplate = cv.template;
  nav('editor');
}

function dashboardDeleteCV(id) {
  state.cvs = state.cvs.filter(c => c.id !== id);
  render();
}

function dashboardUploadFileChange(fileList) {
  const file = fileList && fileList[0];
  if (!file) return;
  state.dashboard.uploading = true;
  render();
  setTimeout(() => {
    const user = state.user;
    const parsed = {
      name: user.name, title: 'Professional', email: user.email, phone: '+27 (0) 11 000 0000',
      location: 'Johannesburg, South Africa',
      summary: 'Experienced professional with a strong background in their field. Passionate about delivering results and growing within a dynamic organisation.',
      experience: [
        { company: 'Previous Employer', role: 'Senior Role', period: '2020 – Present', desc: 'Led key projects and initiatives that contributed to organisational growth.' },
        { company: 'Earlier Company', role: 'Mid-level Position', period: '2017 – 2020', desc: 'Delivered high-quality work across multiple projects and teams.' },
      ],
      education: [{ school: 'University of the Witwatersrand', degree: 'Bachelor of Science', year: '2017' }],
      skills: ['Communication', 'Problem Solving', 'Microsoft Office', 'Teamwork', 'Leadership'],
    };
    const id = String(state.idCounter++);
    state.cvs.unshift({ id, title: parsed.name + "'s CV (Uploaded)", template: 'minimal', updatedAt: 'just now', locked: false });
    state.activeCVId = id;
    state.cvData = parsed;
    state.selectedTemplate = 'minimal';
    state.dashboard.uploading = false;
    nav('editor');
  }, 1400);
}

// ── CV Editor ────────────────────────────────────────────────────────────

function renderEditor() {
  const user = state.user, cvData = state.cvData, e = state.editor;
  const tab = e.tab;

  function personalTab() {
    const fields = [['name', 'Full name'], ['title', 'Job title'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Location']];
    return `
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${fields.map(([key, label]) => `
        <div>
          <label class="field-label" style="font-size:10px;">${label}</label>
          <input class="input-dark" data-model="cvData.${key}" value="${esc(cvData[key])}" />
        </div>`).join('')}
      <div>
        <label class="field-label" style="font-size:10px;">Summary</label>
        <textarea class="input-dark textarea" data-model="cvData.summary" rows="4">${esc(cvData.summary)}</textarea>
      </div>
    </div>`;
  }

  function experienceTab() {
    return `
    <div>
      ${cvData.experience.map((exp, i) => `
        <div class="card" style="padding:14px;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
            <span style="font-size:11px;font-family:'DM Mono';color:#71717a;">ROLE ${i + 1}</span>
            <button class="btn" style="background:none;border:none;color:#52525b;font-size:14px;" data-action="editor-remove-experience" data-index="${i}">✕</button>
          </div>
          ${['company', 'role', 'period', 'desc'].map(field => `
            <div style="margin-bottom:8px;">
              <label class="field-label" style="font-size:9px;margin-bottom:4px;">${field}</label>
              ${field === 'desc'
                ? `<textarea class="input-dark" style="resize:none;font-size:12px;" rows="2" data-model="cvData.experience.${i}.${field}">${esc(exp[field])}</textarea>`
                : `<input class="input-dark" style="font-size:12px;" data-model="cvData.experience.${i}.${field}" value="${esc(exp[field])}" />`}
            </div>`).join('')}
        </div>`).join('')}
      <button class="dashed-add-btn" data-action="editor-add-experience">+ Add experience</button>
    </div>`;
  }

  function educationTab() {
    return `
    <div>
      ${cvData.education.map((edu, i) => `
        <div class="card" style="padding:14px;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
            <span style="font-size:11px;font-family:'DM Mono';color:#71717a;">ENTRY ${i + 1}</span>
            <button class="btn" style="background:none;border:none;color:#52525b;font-size:14px;" data-action="editor-remove-education" data-index="${i}">✕</button>
          </div>
          ${['school', 'degree', 'year'].map(field => `
            <div style="margin-bottom:8px;">
              <label class="field-label" style="font-size:9px;margin-bottom:4px;">${field}</label>
              <input class="input-dark" style="font-size:12px;" data-model="cvData.education.${i}.${field}" value="${esc(edu[field])}" />
            </div>`).join('')}
        </div>`).join('')}
      <button class="dashed-add-btn" data-action="editor-add-education">+ Add education</button>
    </div>`;
  }

  function skillsTab() {
    return `
    <div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
        ${cvData.skills.map((skill, i) => `
          <div style="display:flex;align-items:center;gap:6px;background:rgba(212,248,75,0.07);border:1px solid rgba(212,248,75,0.15);border-radius:6px;padding:4px 10px;">
            <span style="font-size:12px;color:#d4f84b;">${esc(skill)}</span>
            <button class="btn" style="background:none;border:none;color:#71717a;font-size:11px;line-height:1;" data-action="editor-remove-skill" data-index="${i}">✕</button>
          </div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;">
        <input class="input-dark" id="skill-input" data-model="editor.skillInput" value="${esc(e.skillInput)}" placeholder="Type a skill & press Enter" style="flex:1;" />
        <button class="btn btn-primary" data-action="editor-add-skill" style="padding:9px 14px;">+</button>
      </div>
    </div>`;
  }

  const tabContent = tab === 'personal' ? personalTab() : tab === 'experience' ? experienceTab() : tab === 'education' ? educationTab() : skillsTab();

  return `
  <div style="display:flex;height:100vh;background:#09090b;color:#f4f4f5;font-family:'DM Sans',sans-serif;overflow:hidden;">
    <div style="width:340px;background:#0d0d10;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;overflow:hidden;">
      <div style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;">
        <button class="btn-text" style="padding:0;font-size:12px;" data-nav="dashboard">← Dashboard</button>
        <button class="btn" data-action="editor-save"
          style="background:${e.saved ? 'rgba(212,248,75,0.15)' : '#d4f84b'};border:${e.saved ? '1px solid rgba(212,248,75,0.3)' : 'none'};color:${e.saved ? '#d4f84b' : '#09090b'};padding:6px 16px;font-size:12px;font-weight:600;">
          ${e.saved ? '✓ Saved' : 'Save'}
        </button>
      </div>

      <div style="display:flex;border-bottom:1px solid rgba(255,255,255,0.06);overflow-x:auto;">
        ${['personal', 'experience', 'education', 'skills'].map(t => `<button class="editor-tab ${tab === t ? 'active' : ''}" data-action="editor-set-tab" data-tab="${t}">${t}</button>`).join('')}
      </div>

      <div style="flex:1;overflow-y:auto;padding:20px;">${tabContent}</div>

      <div style="padding:16px 20px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:10px;font-family:'DM Mono';color:#71717a;letter-spacing:0.08em;margin-bottom:10px;text-transform:uppercase;">Template</div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;">
          ${TEMPLATES.map(t => {
            const accessible = canAccessTemplate(t.tier, user.plan);
            const selected = state.selectedTemplate === t.id;
            return `
            <button class="tpl-btn ${selected ? 'selected' : ''}" data-action="editor-select-template" data-template="${t.id}" data-accessible="${accessible}">
              <div style="font-size:10px;color:${selected ? '#d4f84b' : '#a1a1aa'};margin-bottom:2px;font-weight:${selected ? '600' : '400'};">${t.name}</div>
              <div style="position:absolute;top:4px;right:4px;">${!accessible ? '<span style="font-size:8px;color:#d4f84b;">🔒</span>' : ''}</div>
            </button>`;
          }).join('')}
        </div>
      </div>
    </div>

    <div style="flex:1;background:#0a0a0d;display:flex;flex-direction:column;overflow:hidden;">
      <div style="padding:14px 24px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:11px;font-family:'DM Mono';color:#52525b;text-transform:uppercase;letter-spacing:0.1em;">Preview · ${state.selectedTemplate}</span>
        <button class="btn" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#a1a1aa;padding:6px 14px;font-size:12px;">↓ Export PDF</button>
      </div>
      <div style="flex:1;overflow-y:auto;padding:32px;display:flex;justify-content:center;align-items:flex-start;">
        <div style="width:100%;max-width:680px;box-shadow:0 24px 64px rgba(0,0,0,0.6);border-radius:4px;overflow:hidden;">
          ${cvPreviewHTML(cvData, state.selectedTemplate)}
        </div>
      </div>
    </div>

    ${e.showTemplateLock ? `
    <div class="modal-overlay">
      <div class="modal-card" style="max-width:380px;padding:36px;">
        <div style="font-size:32px;margin-bottom:14px;">🔒</div>
        <h3 style="font-family:'Fraunces',serif;font-size:20px;font-weight:700;margin-bottom:10px;">Premium template</h3>
        <p style="color:#a1a1aa;font-size:13px;margin-bottom:24px;line-height:1.6;">This template is available on Pro and Elite plans. Upgrade to unlock all templates.</p>
        <div style="display:flex;gap:10px;">
          <button class="btn" data-action="editor-close-template-lock" style="flex:1;background:none;border:1px solid rgba(255,255,255,0.1);color:#a1a1aa;padding:10px;font-size:13px;">Not now</button>
          <button class="btn btn-primary" data-action="editor-template-lock-upgrade" style="flex:1;padding:10px;font-size:13px;">Upgrade</button>
        </div>
      </div>
    </div>` : ''}
  </div>`;
}

function editorUpdate(key, value) {
  state.cvData[key] = value;
}

function editorSave() {
  const cvData = state.cvData;
  state.cvs = state.cvs.map(cv => cv.id === state.activeCVId ? { ...cv, title: cvData.name + "'s CV", template: state.selectedTemplate, updatedAt: 'just now' } : cv);
  state.editor.saved = true;
  render();
  setTimeout(() => { state.editor.saved = false; render(); }, 2000);
}

// ── Interview Prep ───────────────────────────────────────────────────────

function renderInterview() {
  const user = state.user, iv = state.interview;
  const questions = INTERVIEW_QUESTIONS[iv.category] || [];
  const totalPracticed = iv.practiced.size;
  const totalQ = Object.values(INTERVIEW_QUESTIONS).flat().length;
  const activeQ = iv.activeQ;

  return `
  <div style="min-height:100vh;background:#09090b;color:#f4f4f5;font-family:'DM Sans',sans-serif;display:flex;">
    ${renderSidebar('interview')}
    <main class="app-main" style="max-width:calc(100vw - 220px);">
      <div style="margin-bottom:36px;">
        <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:700;margin-bottom:6px;">Interview Prep</h1>
        <p style="color:#71717a;font-size:14px;">Practice your answers. Build confidence before the real thing.</p>
      </div>

      <div class="card" style="padding:20px 24px;margin-bottom:32px;display:flex;align-items:center;gap:24px;">
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <span style="font-size:13px;color:#a1a1aa;">Questions practiced</span>
            <span style="font-size:13px;font-family:'DM Mono';color:#d4f84b;">${totalPracticed} / ${totalQ}</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;">
            <div style="height:100%;width:${(totalPracticed / totalQ) * 100}%;background:#d4f84b;border-radius:3px;transition:width 0.4s ease;"></div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'Fraunces',serif;font-size:28px;font-weight:700;color:${totalPracticed > 0 ? '#d4f84b' : '#52525b'};">${Math.round((totalPracticed / totalQ) * 100)}%</div>
          <div style="font-size:11px;color:#71717a;">complete</div>
        </div>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap;">
        ${Object.keys(INTERVIEW_QUESTIONS).map(cat => {
          const catPracticed = INTERVIEW_QUESTIONS[cat].filter(q => iv.practiced.has(q.q)).length;
          const total = INTERVIEW_QUESTIONS[cat].length;
          const active = iv.category === cat;
          return `
          <button class="filter-chip ${active ? 'active-green' : ''}" data-action="interview-set-category" data-category="${cat}" style="display:flex;align-items:center;gap:8px;padding:9px 18px;">
            <span>${CATEGORY_ICONS[cat]}</span><span>${cat}</span>
            <span style="font-size:10px;font-family:'DM Mono';color:${catPracticed === total ? '#d4f84b' : '#52525b'};background:rgba(255,255,255,0.05);padding:1px 6px;border-radius:10px;">${catPracticed}/${total}</span>
          </button>`;
        }).join('')}
      </div>

      <div style="margin-bottom:12px;display:flex;align-items:center;gap:8px;">
        <span style="font-size:11px;font-family:'DM Mono';color:#52525b;letter-spacing:0.08em;text-transform:uppercase;">Questions are hidden — Morgan will ask you verbally</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${questions.map((item, i) => {
          const isPracticed = iv.practiced.has(item.q);
          const locked = !canAccessTier(item.tier, user.plan);
          return `
          <div class="list-row" data-action="interview-open-question" data-index="${i}"
            style="border:1px solid ${isPracticed ? 'rgba(212,248,75,0.2)' : 'rgba(255,255,255,0.05)'};cursor:${locked ? 'default' : 'pointer'};opacity:${locked ? '0.55' : '1'};">
            <div style="width:32px;height:32px;border-radius:50%;border:2px solid ${isPracticed ? '#d4f84b' : 'rgba(255,255,255,0.1)'};background:${isPracticed ? 'rgba(212,248,75,0.08)' : 'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${isPracticed ? '#d4f84b' : '#52525b'};font-size:13px;font-family:'DM Mono';font-weight:600;">
              ${isPracticed ? '✓' : i + 1}
            </div>
            <div style="flex:1;">
              <div style="font-size:14px;color:${isPracticed ? '#52525b' : '#a1a1aa'};font-style:italic;">
                ${isPracticed ? 'Completed — well done!' : locked ? 'Locked question' : `Question ${i + 1} · ${iv.category}`}
              </div>
              ${!isPracticed && !locked ? `<div style="font-size:11px;color:#3f3f46;margin-top:2px;font-family:'DM Mono';">Morgan will ask you — tap to begin</div>` : ''}
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
              ${tierBadge(item.tier)}
              ${locked ? '<span style="font-size:14px;">🔒</span>' : ''}
              ${!locked && !isPracticed ? `<div style="background:rgba(212,248,75,0.08);border:1px solid rgba(212,248,75,0.2);border-radius:6px;padding:4px 12px;font-size:11px;color:#d4f84b;font-family:'DM Mono';">START →</div>` : ''}
            </div>
          </div>`;
        }).join('')}
      </div>
    </main>

    ${activeQ ? renderInterviewModal() : ''}
    ${iv.showUpgrade ? `
    <div class="modal-overlay">
      <div class="modal-card">
        <div style="font-size:36px;margin-bottom:16px;">🔒</div>
        <h2 style="font-family:'Fraunces',serif;font-size:22px;font-weight:700;margin-bottom:10px;">Premium question</h2>
        <p style="color:#a1a1aa;font-size:14px;line-height:1.7;margin-bottom:28px;">This question is locked on your current plan. Upgrade to Pro or Elite to access all interview questions and coaching tips.</p>
        <div style="display:flex;gap:10px;">
          <button class="btn" data-action="interview-close-upgrade" style="flex:1;background:none;border:1px solid rgba(255,255,255,0.1);color:#a1a1aa;padding:11px;font-size:14px;">Not now</button>
          <button class="btn btn-primary" data-action="interview-upgrade-pricing" style="flex:2;padding:11px;font-size:14px;">See pricing →</button>
        </div>
      </div>
    </div>` : ''}
  </div>`;
}

function renderInterviewModal() {
  const user = state.user, iv = state.interview;
  const activeQ = iv.activeQ;
  const listening = iv.speechStatus === 'listening';
  const speaking = iv.speechStatus === 'speaking';
  const processing = iv.speechStatus === 'processing';

  return `
  <div class="modal-overlay" style="background:rgba(0,0,0,0.85);">
    <div style="background:#0f0f12;border:1px solid rgba(255,255,255,0.08);border-radius:16px;width:100%;max-width:560px;box-shadow:0 40px 100px rgba(0,0,0,0.8);overflow:hidden;display:flex;flex-direction:column;max-height:90vh;">
      <div style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:12px;">
        <div style="position:relative;flex-shrink:0;">
          <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg, #d4f84b, #a8e000);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:#09090b;">M</div>
          ${speaking ? `<div style="position:absolute;inset:-3px;border-radius:50%;border:2px solid #d4f84b;animation:pulse 1.2s ease-in-out infinite;opacity:0.7;"></div>` : ''}
        </div>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:600;color:#f4f4f5;">Morgan</div>
          <div style="font-size:11px;color:${speaking ? '#d4f84b' : '#52525b'};font-family:'DM Mono';transition:color 0.3s;">
            ${speaking ? '● speaking…' : listening ? '● listening…' : processing ? '● processing…' : '● interview coach'}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:11px;font-family:'DM Mono';color:#52525b;text-transform:uppercase;">${iv.category}</span>
          ${tierBadge(activeQ.tier)}
          <button class="btn" style="background:none;border:none;color:#52525b;font-size:18px;margin-left:4px;" data-action="interview-close-modal">✕</button>
        </div>
      </div>

      <div style="flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:16px;min-height:260px;">
        ${iv.messages.map((msg, i) => `
          <div style="display:flex;gap:10px;align-items:flex-start;flex-direction:${msg.role === 'user' ? 'row-reverse' : 'row'};">
            <div style="width:32px;height:32px;border-radius:50%;background:${msg.role === 'interviewer' ? 'linear-gradient(135deg, #d4f84b, #a8e000)' : 'rgba(255,255,255,0.08)'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${msg.role === 'interviewer' ? '#09090b' : '#a1a1aa'};flex-shrink:0;">
              ${msg.role === 'interviewer' ? 'M' : esc(user.name[0].toUpperCase())}
            </div>
            <div style="max-width:78%;background:${msg.role === 'interviewer' ? '#1a1a1f' : 'rgba(212,248,75,0.08)'};border:1px solid ${msg.role === 'interviewer' ? 'rgba(255,255,255,0.07)' : 'rgba(212,248,75,0.2)'};border-radius:${msg.role === 'interviewer' ? '4px 14px 14px 14px' : '14px 4px 14px 14px'};padding:12px 16px;">
              ${msg.role === 'interviewer' && i === 0 ? `<div style="font-size:10px;font-family:'DM Mono';color:#71717a;margin-bottom:6px;letter-spacing:0.06em;">QUESTION</div>` : ''}
              ${msg.role === 'interviewer' && i > 0 ? `<div style="font-size:10px;font-family:'DM Mono';color:#d4f84b;margin-bottom:6px;letter-spacing:0.06em;">💡 COACHING TIP</div>` : ''}
              <p style="font-size:14px;color:${msg.role === 'interviewer' ? '#e4e4e7' : '#d4f84b'};line-height:1.65;margin:0;font-style:${msg.role === 'interviewer' && i === 0 ? 'italic' : 'normal'};font-family:${msg.role === 'interviewer' && i === 0 ? "'Fraunces',serif" : "'DM Sans',sans-serif"};">
                ${msg.role === 'interviewer' && i === 0 ? `"${esc(msg.text)}"` : esc(msg.text)}
              </p>
              ${msg.role === 'interviewer' && i === 0 ? `<button class="btn" style="margin-top:8px;background:none;border:none;color:#52525b;font-size:11px;font-family:'DM Mono';padding:0;display:flex;align-items:center;gap:4px;" data-action="interview-replay">↺ replay question</button>` : ''}
            </div>
          </div>`).join('')}

        ${listening ? `
        <div style="display:flex;gap:10px;align-items:flex-start;flex-direction:row-reverse;">
          <div style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#a1a1aa;flex-shrink:0;">${esc(user.name[0].toUpperCase())}</div>
          <div style="max-width:78%;background:rgba(212,248,75,0.05);border:1px solid rgba(212,248,75,0.15);border-radius:14px 4px 14px 14px;padding:12px 16px;">
            <div style="font-size:10px;font-family:'DM Mono';color:#d4f84b;margin-bottom:4px;">● LISTENING</div>
            <p style="font-size:14px;color:#a1a1aa;margin:0;line-height:1.65;font-style:italic;">${esc(iv.transcript) || '…'}</p>
          </div>
        </div>` : ''}

        ${processing ? `
        <div style="display:flex;gap:10px;align-items:center;">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg, #d4f84b, #a8e000);display:flex;align-items:center;justify-content:center;font-weight:700;color:#09090b;font-size:12px;flex-shrink:0;">M</div>
          <div style="background:#1a1a1f;border:1px solid rgba(255,255,255,0.07);border-radius:4px 14px 14px 14px;padding:12px 18px;display:flex;gap:5px;align-items:center;">
            ${[0, 1, 2].map(i => `<div style="width:6px;height:6px;border-radius:50%;background:#d4f84b;animation:bounce 1.2s ease-in-out ${i * 0.2}s infinite;"></div>`).join('')}
          </div>
        </div>` : ''}
        <div id="chat-end"></div>
      </div>

      <div style="padding:16px 20px;border-top:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:center;">
          <button class="mic-btn" data-action="${listening ? 'interview-stop-listening' : 'interview-start-listening'}" ${(speaking || processing) ? 'disabled' : ''}
            style="background:${listening ? 'rgba(248,113,113,0.15)' : (speaking || processing) ? 'rgba(255,255,255,0.04)' : 'rgba(212,248,75,0.1)'};border:2px solid ${listening ? '#f87171' : (speaking || processing) ? 'rgba(255,255,255,0.08)' : '#d4f84b'};cursor:${(speaking || processing) ? 'not-allowed' : 'pointer'};">
            ${listening ? '⏹' : '🎤'}
          </button>
        </div>
        <div style="text-align:center;font-size:11px;font-family:'DM Mono';color:${listening ? '#f87171' : speaking ? '#d4f84b' : '#52525b'};text-transform:uppercase;letter-spacing:0.08em;">
          ${listening ? 'Tap to stop recording' : speaking ? 'Morgan is speaking…' : processing ? 'Processing…' : 'Tap mic to answer'}
        </div>

        <div style="border-top:1px solid rgba(255,255,255,0.05);padding-top:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-size:11px;font-family:'DM Mono';color:#52525b;text-transform:uppercase;letter-spacing:0.07em;">Other achievements (optional)</span>
            <button class="btn" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#a1a1aa;padding:4px 12px;font-size:11px;border-radius:5px;font-family:'DM Mono';" data-action="interview-achievement-click">+ Upload</button>
            <input id="achievement-input" type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" style="display:none;" data-action="interview-achievement-change" />
          </div>
          ${iv.achievements.length === 0
            ? `<div style="font-size:12px;color:#3f3f46;font-style:italic;">Upload certificates, awards, or documents to support your answers</div>`
            : `<div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${iv.achievements.map((a, i) => `
                  <div style="display:flex;align-items:center;gap:6px;background:rgba(212,248,75,0.06);border:1px solid rgba(212,248,75,0.15);border-radius:5px;padding:3px 8px 3px 10px;">
                    <span style="font-size:11px;color:#d4f84b;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(a.name)}</span>
                    <button class="btn" style="background:none;border:none;color:#52525b;font-size:11px;line-height:1;padding:0 2px;" data-action="interview-remove-achievement" data-index="${i}">✕</button>
                  </div>`).join('')}
              </div>`}
        </div>

        <div style="display:flex;gap:8px;">
          <button class="btn" data-action="interview-close-modal" style="flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#71717a;padding:9px;font-size:13px;">Skip</button>
          <button class="btn" data-action="interview-mark-practiced"
            style="flex:2;background:${iv.messages.some(m => m.role === 'user') ? '#d4f84b' : 'rgba(255,255,255,0.06)'};border:${iv.messages.some(m => m.role === 'user') ? 'none' : '1px solid rgba(255,255,255,0.08)'};color:${iv.messages.some(m => m.role === 'user') ? '#09090b' : '#52525b'};cursor:${iv.messages.some(m => m.role === 'user') ? 'pointer' : 'default'};padding:9px;font-size:13px;font-weight:700;">
            ✓ Mark as practiced
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

// ── Interview Prep — actions / speech logic ────────────────────────────

function speak(text, onEnd) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.92;
  utter.pitch = 1.05;
  utter.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.name.includes('Google UK English Female')) ||
    voices.find(v => v.name.includes('Samantha')) ||
    voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female')) ||
    voices.find(v => v.lang.startsWith('en'));
  if (preferred) utter.voice = preferred;
  utter.onstart = () => { state.interview.speechStatus = 'speaking'; render(); };
  utter.onend = () => { state.interview.speechStatus = 'idle'; render(); if (onEnd) onEnd(); };
  window.speechSynthesis.speak(utter);
}

function interviewStartListening() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Speech recognition is not supported in this browser. Please use Chrome.'); return; }
  const iv = state.interview;
  const rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = true;
  rec.continuous = false;
  iv.recognition = rec;
  iv.transcript = '';
  iv.speechStatus = 'listening';
  render();
  rec.onresult = (e) => {
    const t = Array.from(e.results).map(r => r[0].transcript).join('');
    iv.transcript = t;
    render();
  };
  rec.onend = () => {
    iv.speechStatus = 'processing';
    const prev = iv.transcript;
    iv.transcript = '';
    if (prev && prev.trim()) {
      const userMsg = prev.trim();
      iv.messages.push({ role: 'user', text: userMsg });
      render();
      setTimeout(() => {
        if (iv.activeQ) {
          const reply = iv.activeQ.tip;
          iv.messages.push({ role: 'interviewer', text: reply });
          render();
          speak(reply, () => { iv.speechStatus = 'idle'; render(); });
        }
      }, 600);
    } else {
      iv.speechStatus = 'idle';
      render();
    }
  };
  rec.onerror = () => { iv.speechStatus = 'idle'; render(); };
  rec.start();
}

function interviewStopListening() {
  const rec = state.interview.recognition;
  if (rec) rec.stop();
}

function interviewOpenQuestion(item) {
  const iv = state.interview;
  if (!canAccessTier(item.tier, state.user.plan)) { iv.showUpgrade = true; render(); return; }
  window.speechSynthesis && window.speechSynthesis.cancel();
  iv.activeQ = item;
  iv.messages = [];
  iv.transcript = '';
  iv.speechStatus = 'idle';
  render();
  const greeting = `Hello! I'm Morgan, your interview coach. Here is your question: ${item.q}`;
  setTimeout(() => {
    iv.messages = [{ role: 'interviewer', text: item.q }];
    render();
    speak(greeting);
  }, 200);
}

function interviewCloseModal() {
  const iv = state.interview;
  window.speechSynthesis && window.speechSynthesis.cancel();
  if (iv.recognition) iv.recognition.stop();
  iv.activeQ = null;
  iv.speechStatus = 'idle';
  iv.transcript = '';
  iv.messages = [];
  render();
}

function interviewMarkPracticed() {
  const iv = state.interview;
  if (iv.activeQ) {
    iv.practiced.add(iv.activeQ.q);
    interviewCloseModal();
  }
}

function interviewReplayQuestion() {
  const iv = state.interview;
  if (iv.activeQ) speak(iv.activeQ.q);
}

// ── Job Board ────────────────────────────────────────────────────────────

function matchColor(m) { return m >= 90 ? '#d4f84b' : m >= 75 ? '#facc15' : '#71717a'; }

function jobFiltered() {
  const j = state.jobs;
  return JOB_LISTINGS.filter(job => {
    if (j.category !== 'All' && job.category !== j.category) return false;
    if (j.jobType !== 'All' && job.type !== j.jobType) return false;
    if (j.search && !job.title.toLowerCase().includes(j.search.toLowerCase()) && !job.company.toLowerCase().includes(j.search.toLowerCase())) return false;
    return true;
  });
}

function renderJobs() {
  const user = state.user, j = state.jobs;
  const filtered = jobFiltered();
  const canAccess = (tier) => canAccessTier(tier, user.plan);

  const stats = [
    { label: 'Open roles', value: JOB_LISTINGS.length, color: '#f4f4f5' },
    { label: 'High match (90%+)', value: JOB_LISTINGS.filter(x => x.match >= 90).length, color: '#d4f84b' },
    { label: 'Saved', value: j.saved.size, color: '#facc15' },
    { label: 'Applied', value: j.appliedJobs.size, color: '#60a5fa' },
  ];

  return `
  <div style="min-height:100vh;background:#09090b;color:#f4f4f5;font-family:'DM Sans',sans-serif;display:flex;">
    ${renderSidebar('jobs')}
    <main class="app-main" style="overflow-y:auto;">
      <div style="margin-bottom:32px;">
        <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:700;margin-bottom:6px;">Job Board</h1>
        <p style="color:#71717a;font-size:14px;">${filtered.length} openings matched to your profile · Updated today</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;margin-bottom:28px;">
        ${stats.map(s => `
          <div class="card" style="padding:16px 20px;">
            <div style="font-family:'Fraunces',serif;font-size:26px;font-weight:700;color:${s.color};margin-bottom:2px;">${s.value}</div>
            <div style="font-size:12px;color:#71717a;">${s.label}</div>
          </div>`).join('')}
      </div>

      <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center;">
        <div style="position:relative;flex:1;min-width:200px;">
          <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#52525b;font-size:13px;">⌕</span>
          <input class="input" data-model="jobs.search" value="${esc(j.search)}" placeholder="Search role or company…" style="padding:9px 12px 9px 32px;font-size:13px;" />
        </div>
        <div style="display:flex;gap:6px;">
          ${JOB_CATEGORIES.map(cat => `<button class="filter-chip ${j.category === cat ? 'active-green' : ''}" data-action="jobs-set-category" data-category="${cat}">${cat}</button>`).join('')}
        </div>
        <div style="display:flex;gap:6px;">
          ${JOB_TYPES.map(t => `<button class="filter-chip ${j.jobType === t ? 'active-blue' : ''}" data-action="jobs-set-type" data-type="${t}">${t}</button>`).join('')}
        </div>
      </div>

      ${filtered.length === 0 ? `
      <div style="text-align:center;padding:60px 40px;color:#52525b;">
        <div style="font-size:32px;margin-bottom:12px;">⬡</div>
        <div style="font-size:15px;">No jobs match your filters</div>
      </div>` : `
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${filtered.map(job => {
          const locked = !canAccess(job.tier);
          const isApplied = j.appliedJobs.has(job.id);
          const isSaved = j.saved.has(job.id);
          return `
          <div class="list-row" data-action="jobs-open-job" data-id="${job.id}"
            style="border:1px solid ${isApplied ? 'rgba(96,165,250,0.2)' : 'rgba(255,255,255,0.05)'};cursor:${locked ? 'default' : 'pointer'};opacity:${locked ? '0.65' : '1'};">
            <div style="width:44px;height:44px;border-radius:10px;background:${LOGO_COLORS[job.logo] || '#333'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:#fff;flex-shrink:0;">${job.logo}</div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap;">
                <span style="font-weight:600;font-size:15px;">${job.title}</span>
                ${locked ? '<span style="font-size:12px;">🔒</span>' : ''}
                ${isApplied ? `<span style="font-size:10px;font-family:'DM Mono';background:rgba(96,165,250,0.12);color:#60a5fa;padding:2px 8px;border-radius:10px;">APPLIED</span>` : ''}
              </div>
              <div style="font-size:13px;color:#a1a1aa;margin-bottom:6px;">${job.company} · ${job.location}</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                <span style="font-size:11px;background:rgba(255,255,255,0.05);color:#71717a;padding:2px 8px;border-radius:10px;">${job.type}</span>
                <span style="font-size:11px;background:rgba(255,255,255,0.05);color:#71717a;padding:2px 8px;border-radius:10px;">${job.salary}</span>
                <span style="font-size:11px;color:#52525b;padding:2px 8px;">${job.posted}</span>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:10px;flex-shrink:0;">
              <div style="display:flex;align-items:center;gap:6px;">
                <div style="width:36px;height:36px;border-radius:50%;border:2px solid ${matchColor(job.match)};display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:10px;font-family:'DM Mono';font-weight:700;color:${matchColor(job.match)};">${job.match}%</span>
                </div>
                <span style="font-size:10px;color:#52525b;">match</span>
              </div>
              <div style="display:flex;gap:6px;" data-stop-propagation="true">
                <button class="btn" data-action="jobs-toggle-save" data-id="${job.id}"
                  style="background:${isSaved ? 'rgba(250,204,21,0.1)' : 'rgba(255,255,255,0.05)'};border:1px solid ${isSaved ? 'rgba(250,204,21,0.3)' : 'rgba(255,255,255,0.08)'};color:${isSaved ? '#facc15' : '#71717a'};padding:5px 10px;font-size:13px;">${isSaved ? '★' : '☆'}</button>
                <button class="btn" data-action="jobs-apply" data-id="${job.id}" ${(isApplied || locked) ? 'disabled' : ''}
                  style="background:${isApplied ? 'rgba(96,165,250,0.08)' : locked ? 'rgba(255,255,255,0.03)' : 'rgba(212,248,75,0.1)'};border:1px solid ${isApplied ? 'rgba(96,165,250,0.2)' : locked ? 'rgba(255,255,255,0.06)' : 'rgba(212,248,75,0.25)'};color:${isApplied ? '#60a5fa' : locked ? '#52525b' : '#d4f84b'};padding:5px 14px;font-size:12px;font-weight:600;">${isApplied ? 'Applied' : 'Apply'}</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>`}
    </main>

    ${j.selectedJob ? renderJobModal(j.selectedJob) : ''}
    ${j.showUpgrade ? `
    <div class="modal-overlay" style="z-index:200;">
      <div class="modal-card">
        <div style="font-size:36px;margin-bottom:16px;">🔒</div>
        <h2 style="font-family:'Fraunces',serif;font-size:22px;font-weight:700;margin-bottom:10px;">Premium job listing</h2>
        <p style="color:#a1a1aa;font-size:14px;line-height:1.7;margin-bottom:28px;">This listing is available to Pro and Elite subscribers. Upgrade to view full details and apply directly.</p>
        <div style="display:flex;gap:10px;">
          <button class="btn" data-action="jobs-close-upgrade" style="flex:1;background:none;border:1px solid rgba(255,255,255,0.1);color:#a1a1aa;padding:11px;font-size:14px;">Not now</button>
          <button class="btn btn-primary" data-action="jobs-upgrade-pricing" style="flex:2;padding:11px;font-size:14px;">See pricing →</button>
        </div>
      </div>
    </div>` : ''}
  </div>`;
}

function renderJobModal(job) {
  const j = state.jobs;
  const isSaved = j.saved.has(job.id);
  const isApplied = j.appliedJobs.has(job.id);
  return `
  <div class="modal-overlay" data-action="jobs-close-modal">
    <div data-modal-card="true" style="background:#111113;border:1px solid rgba(255,255,255,0.1);border-radius:14px;width:100%;max-width:580px;box-shadow:0 40px 100px rgba(0,0,0,0.7);overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:flex-start;">
        <div style="display:flex;gap:14px;align-items:center;">
          <div style="width:52px;height:52px;border-radius:12px;background:${LOGO_COLORS[job.logo] || '#333'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;color:#fff;flex-shrink:0;">${job.logo}</div>
          <div>
            <div style="font-family:'Fraunces',serif;font-size:20px;font-weight:700;margin-bottom:2px;">${job.title}</div>
            <div style="font-size:14px;color:#a1a1aa;">${job.company} · ${job.location}</div>
          </div>
        </div>
        <button class="btn" style="background:none;border:none;color:#52525b;font-size:18px;" data-action="jobs-close-modal-btn">✕</button>
      </div>
      <div style="padding:24px 28px;display:flex;flex-direction:column;gap:20px;">
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          ${[job.type, job.salary, job.posted].map(m => `<span style="font-size:12px;background:rgba(255,255,255,0.05);color:#a1a1aa;padding:4px 12px;border-radius:8px;">${m}</span>`).join('')}
          <span style="font-size:12px;background:rgba(${job.match >= 90 ? '212,248,75' : '250,204,21'},0.1);color:${matchColor(job.match)};padding:4px 12px;border-radius:8px;font-family:'DM Mono';">${job.match}% match</span>
        </div>
        <div>
          <div style="font-size:11px;font-family:'DM Mono';color:#71717a;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">About the role</div>
          <p style="font-size:14px;color:#a1a1aa;line-height:1.75;">${job.desc}</p>
        </div>
        <div>
          <div style="font-size:11px;font-family:'DM Mono';color:#71717a;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Key skills</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${job.tags.map(tag => `<span style="font-size:12px;background:rgba(212,248,75,0.07);border:1px solid rgba(212,248,75,0.15);color:#d4f84b;padding:4px 12px;border-radius:6px;">${tag}</span>`).join('')}
          </div>
        </div>
        <div style="background:rgba(212,248,75,0.04);border:1px solid rgba(212,248,75,0.12);border-radius:10px;padding:14px 16px;font-size:13px;color:#a1a1aa;line-height:1.65;">
          💡 <strong style="color:#f4f4f5;">CV tip:</strong> Your current CV matches ${job.match}% of this job's requirements. ${job.match < 90 ? 'Consider adding more detail around ' + job.tags[0] + ' to boost your score.' : 'Great match — your profile aligns well with this role.'}
        </div>
      </div>
      <div style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:10px;">
        <button class="btn" data-action="jobs-toggle-save" data-id="${job.id}"
          style="flex:1;background:${isSaved ? 'rgba(250,204,21,0.1)' : 'rgba(255,255,255,0.05)'};border:1px solid ${isSaved ? 'rgba(250,204,21,0.3)' : 'rgba(255,255,255,0.1)'};color:${isSaved ? '#facc15' : '#a1a1aa'};padding:11px;font-size:14px;">${isSaved ? '★ Saved' : '☆ Save'}</button>
        <button class="btn" data-action="jobs-apply-close" data-id="${job.id}" ${isApplied ? 'disabled' : ''}
          style="flex:2;background:${isApplied ? 'rgba(96,165,250,0.08)' : '#d4f84b'};border:${isApplied ? '1px solid rgba(96,165,250,0.2)' : 'none'};color:${isApplied ? '#60a5fa' : '#09090b'};padding:11px;font-size:14px;font-weight:700;">${isApplied ? '✓ Applied' : 'Apply now →'}</button>
      </div>
    </div>
  </div>`;
}

function jobsToggleSave(id) {
  const s = state.jobs.saved;
  if (s.has(id)) s.delete(id); else s.add(id);
  render();
}

function jobsApply(job) {
  if (!canAccessTier(job.tier, state.user.plan)) { state.jobs.showUpgrade = true; render(); return; }
  state.jobs.appliedJobs.add(job.id);
  render();
}

function jobsOpenJob(job) {
  if (!canAccessTier(job.tier, state.user.plan)) { state.jobs.showUpgrade = true; render(); return; }
  state.jobs.selectedJob = job;
  render();
}

// ── Event delegation ─────────────────────────────────────────────────────

function handleAction(action, el) {
  const ds = el.dataset;
  switch (action) {
    // Auth
    case 'auth-switch-mode':
      state.auth.mode = state.auth.mode === 'signin' ? 'signup' : 'signin';
      state.view = state.auth.mode;
      state.auth.error = '';
      render();
      break;
    case 'auth-submit': authSubmit(); break;

    // Sign out
    case 'sign-out':
      state.user = null; state.cvs = []; state.view = 'landing';
      render();
      break;

    // Pricing
    case 'upgrade-plan': upgradePlan(ds.plan); break;

    // Dashboard
    case 'dashboard-new-cv': dashboardNewCV(); break;
    case 'dashboard-edit-cv': dashboardEditCV(ds.id); break;
    case 'dashboard-delete-cv': dashboardDeleteCV(ds.id); break;
    case 'dashboard-upload-click': document.getElementById('cv-upload-input').click(); break;
    case 'dashboard-close-paywall': state.dashboard.showPaywall = false; render(); break;
    case 'dashboard-paywall-pricing': state.dashboard.showPaywall = false; nav('pricing'); break;

    // Editor
    case 'editor-set-tab': state.editor.tab = ds.tab; render(); break;
    case 'editor-save': editorSave(); break;
    case 'editor-add-experience':
      state.cvData.experience.push({ company: '', role: '', period: '', desc: '' });
      render();
      break;
    case 'editor-remove-experience':
      state.cvData.experience.splice(Number(ds.index), 1);
      render();
      break;
    case 'editor-add-education':
      state.cvData.education.push({ school: '', degree: '', year: '' });
      render();
      break;
    case 'editor-remove-education':
      state.cvData.education.splice(Number(ds.index), 1);
      render();
      break;
    case 'editor-remove-skill':
      state.cvData.skills.splice(Number(ds.index), 1);
      render();
      break;
    case 'editor-add-skill': {
      const val = (state.editor.skillInput || '').trim();
      if (val && !state.cvData.skills.includes(val)) state.cvData.skills.push(val);
      state.editor.skillInput = '';
      render();
      break;
    }
    case 'editor-select-template': {
      const accessible = ds.accessible === 'true';
      if (accessible) state.selectedTemplate = ds.template;
      else state.editor.showTemplateLock = true;
      render();
      break;
    }
    case 'editor-close-template-lock': state.editor.showTemplateLock = false; render(); break;
    case 'editor-template-lock-upgrade': state.editor.showTemplateLock = false; nav('pricing'); break;

    // Interview
    case 'interview-set-category': state.interview.category = ds.category; render(); break;
    case 'interview-open-question': {
      const questions = INTERVIEW_QUESTIONS[state.interview.category] || [];
      interviewOpenQuestion(questions[Number(ds.index)]);
      break;
    }
    case 'interview-close-modal': interviewCloseModal(); break;
    case 'interview-close-upgrade': state.interview.showUpgrade = false; render(); break;
    case 'interview-upgrade-pricing': state.interview.showUpgrade = false; nav('pricing'); break;
    case 'interview-start-listening': interviewStartListening(); break;
    case 'interview-stop-listening': interviewStopListening(); break;
    case 'interview-mark-practiced': interviewMarkPracticed(); break;
    case 'interview-replay': interviewReplayQuestion(); break;
    case 'interview-achievement-click': document.getElementById('achievement-input').click(); break;
    case 'interview-remove-achievement':
      state.interview.achievements.splice(Number(ds.index), 1);
      render();
      break;

    // Jobs
    case 'jobs-set-category': state.jobs.category = ds.category; render(); break;
    case 'jobs-set-type': state.jobs.jobType = ds.type; render(); break;
    case 'jobs-toggle-save': jobsToggleSave(ds.id); break;
    case 'jobs-apply': {
      const job = JOB_LISTINGS.find(x => x.id === ds.id);
      if (job) jobsApply(job);
      break;
    }
    case 'jobs-apply-close': {
      const job = JOB_LISTINGS.find(x => x.id === ds.id);
      if (job) { jobsApply(job); state.jobs.selectedJob = null; render(); }
      break;
    }
    case 'jobs-open-job': {
      const job = JOB_LISTINGS.find(x => x.id === ds.id);
      if (job) jobsOpenJob(job);
      break;
    }
    case 'jobs-close-modal':
    case 'jobs-close-modal-btn':
      state.jobs.selectedJob = null; render();
      break;
    case 'jobs-close-upgrade': state.jobs.showUpgrade = false; render(); break;
    case 'jobs-upgrade-pricing': state.jobs.showUpgrade = false; nav('pricing'); break;

    default: break;
  }
}

function initApp() {
  const root = document.getElementById('root');

  root.addEventListener('click', (e) => {
    // closest() walks up from the click target, so a nested button's own
    // data-action (e.g. "jobs-toggle-save") is always found before a
    // surrounding row's data-action (e.g. "jobs-open-job").
    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      // Backdrop-close actions (data-action on the overlay itself) should only
      // fire when the click actually hit the backdrop, not content inside the card.
      if (actionEl.dataset.action === 'jobs-close-modal' && e.target.closest('[data-modal-card]')) return;
      handleAction(actionEl.dataset.action, actionEl);
      return;
    }
    const navEl = e.target.closest('[data-nav]');
    if (navEl) { nav(navEl.dataset.nav); return; }
  });

  root.addEventListener('input', (e) => {
    const el = e.target;
    if (!el.dataset || !el.dataset.model) return;
    setDeep(state, el.dataset.model, el.value);
    // Do not re-render the entire page on every keystroke. Replacing the input
    // element causes the browser to reset/reposition the caret while typing.
    // State is updated immediately, and the preview will refresh on other UI actions.
  });

  root.addEventListener('change', (e) => {
    const el = e.target;
    if (el.id === 'cv-upload-input') { dashboardUploadFileChange(el.files); el.value = ''; return; }
    if (el.id === 'achievement-input') {
      const files = Array.from(el.files || []);
      state.interview.achievements.push(...files.map(f => ({ name: f.name })));
      el.value = '';
      render();
      return;
    }
  });

  root.addEventListener('keydown', (e) => {
    const el = e.target;
    if (el.id === 'skill-input' && e.key === 'Enter') {
      e.preventDefault();
      const val = (state.editor.skillInput || '').trim();
      if (val && !state.cvData.skills.includes(val)) state.cvData.skills.push(val);
      state.editor.skillInput = '';
      render();
    }
  });

  render();
}

document.addEventListener('DOMContentLoaded', initApp);

// Expose internals for debugging/testing convenience
if (typeof window !== 'undefined') {
  window.state = state;
  window.jobFiltered = jobFiltered;
}
