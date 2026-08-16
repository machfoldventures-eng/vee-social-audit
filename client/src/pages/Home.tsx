/**
 * Design reminder — The Social Edit: a fashion-editorial audit using warm paper,
 * ink black, berry-red markup, Signal Chartreuse actions, and contact-sheet imagery.
 */
import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { CAL_BOOKING_URL, PDF_FILENAME } from "@/lib/auditConfig";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  ChartNoAxesCombined,
  CircleCheck,
  Clapperboard,
  FileDown,
  FileText,
  MessageCircle,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  WandSparkles,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

const assets = {
  mark: "/media/machfold-mark_d38757ff.png",
  hero: "/media/machfold-hero-paper_8d8482bf.jpg",
  reel: "/media/machfold-reel-diagnosis_e406db7d.jpg",
  growth: "/media/machfold-growth-collage_8cc2af56.jpg",
  services: "/media/machfold-services-paper_bc1ddb40.jpg",
  makeup: "/media/vidhervi-makeup_28f96510.jpg",
  bandana: "/media/vidhervi-bandana_d7fbf94a.jpg",
  yellow: "/media/vidhervi-yellow_15f11cfd.jpg",
};

const issues = [
  {
    no: "01",
    title: "The niche is still too open-ended.",
    body: "Lifestyle, fashion, and beauty says what is posted — not who it is for. The feed needs one sharper audience promise before every post can work together.",
    tag: "POSITIONING",
  },
  {
    no: "02",
    title: "The feed looks good, but it does not always teach.",
    body: "Portrait-led content can earn likes. Useful content earns the saves, shares, profile visits, and follows that expand distribution over time.",
    tag: "CONTENT VALUE",
  },
  {
    no: "03",
    title: "Search intent is not doing enough work.",
    body: "Captions, keywords, hashtags, on-screen copy, locations, and collaborator tags should all describe one relevant topic — not act as an afterthought.",
    tag: "DISCOVERABILITY",
  },
  {
    no: "04",
    title: "Consistency arrives in bursts.",
    body: "The visible history shows long pauses followed by clusters. That makes it harder to teach the audience what to expect and harder to learn what performs.",
    tag: "CADENCE",
  },
];

const timing = [
  { day: "TUE", time: "7:30 PM", focus: "Fashion Reel / GRWM" },
  { day: "WED", time: "12:30 PM", focus: "Outfit carousel" },
  { day: "THU", time: "6:30 PM", focus: "Priority Reel" },
  { day: "SAT", time: "11:00 AM", focus: "Lookbook / routine" },
];

const services = [
  { icon: Target, title: "Brand Collabs", text: "A clear partnership story, sharper packages, and content that helps the right brands see the fit.", detail: "We shape your collaboration story, identify the right-fit partners, and make the deliverables easier for a brand to say yes to." },
  { icon: WandSparkles, title: "Edits", text: "Reel-led edits, cover frames, visual pacing, and a feed system that feels recognisable at a glance.", detail: "From hook pacing to cover frames, we edit for retention, clarity, and a visual signature that still feels like the creator." },
  { icon: CalendarDays, title: "Post Scheduling", text: "A sustainable posting rhythm that matches campaigns, creation capacity, and audience-active windows.", detail: "We turn a pile of ideas into a realistic content calendar with slots, priorities, and a rhythm the team can actually keep." },
  { icon: FileText, title: "Captions + Keywords", text: "Search-aware captions with hooks, a useful point of view, a focused CTA, and natural language that fits the creator.", detail: "Every caption gets a clear first line, a relevant phrase, a point of view, and one action — written in the account's real voice." },
  { icon: Search, title: "Hashtags + Relevance", text: "Topic clusters, local tags, collaborator metadata, and post-by-post relevance instead of a copied hashtag block.", detail: "We align the post topic, location, collaborators, keywords, and hashtags so the content is easier to understand and find." },
  { icon: ChartNoAxesCombined, title: "Monthly Reports", text: "A clear monthly read on content, reach, follows, saves, shares, and the next decisions to make.", detail: "A monthly report turns the feed into a learning loop: what moved, what stalled, and what to do next." },
  { icon: TrendingUp, title: "Analytics", text: "A working measurement layer that separates a good-looking post from a post that genuinely moves growth.", detail: "We track the metrics that match the goal — discovery, utility, community, conversion, or commercial readiness." },
];

function IssueCard({ issue }: { issue: (typeof issues)[number] }) {
  return (
    <article className="issue-card">
      <div className="issue-topline">
        <span>{issue.no}</span>
        <span>{issue.tag}</span>
      </div>
      <h3>{issue.title}</h3>
      <p>{issue.body}</p>
      <div className="issue-rule" />
    </article>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handlePdfDownload = async () => {
    if (!pdfRef.current || isExporting) return;
    setIsExporting(true);
    try {
      await html2pdf()
        .set({
          margin: [0.22, 0.22, 0.22, 0.22],
          filename: PDF_FILENAME,
          image: { type: "jpeg", quality: 0.96 },
          html2canvas: { scale: 1.45, useCORS: true, backgroundColor: "#f8f3ea", ignoreElements: (element: Element) => element.classList.contains("side-rail"), onclone: (documentClone: Document) => { documentClone.querySelectorAll<HTMLElement>(".service-detail").forEach((detail) => { detail.style.maxHeight = "none"; detail.style.opacity = "1"; }); } },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .from(pdfRef.current)
        .save();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="site-shell">
      <aside className="side-rail" aria-label="Section navigation">
        <a className="rail-brand" href="#top" aria-label="Machfold home">
          <img src={assets.mark} alt="Machfold" />
        </a>
        <div className="rail-wordmark" aria-hidden="true">MACHFOLD</div>
        <nav className="rail-nav">
          <a href="#diagnosis"><i />01 <span>Diagnosis</span></a>
          <a href="#reset"><i />02 <span>Reset</span></a>
          <a href="#services"><i />03 <span>Machfold</span></a>
        </nav>
        <div className="rail-foot"><span>CREATOR</span><span>GROWTH</span></div>
      </aside>

      <main id="top" ref={pdfRef}>
        <header className="topbar">
          <a className="mobile-brand" href="#top"><img src={assets.mark} alt="Machfold" /><span>machfold</span></a>
          <a className="desk-brand" href="#top"><img src={assets.mark} alt="Machfold" /><span>machfold</span><small>CREATOR GROWTH STUDIO</small></a>
          <p>Instagram growth audit <span>—</span> Vidhervi Agrawal</p>
          <div className="topbar-actions"><button className="text-link pdf-link" type="button" onClick={handlePdfDownload} disabled={isExporting}><FileDown size={15} />{isExporting ? "Building PDF…" : "Download PDF"}</button><a className="text-link" href="#services">What Machfold solves <ArrowUpRight size={15} /></a></div>
        </header>

        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="dot" />Profile audit / August 2026</div>
            <h1 id="hero-title">The content is good.<br /><em>The system around it is not.</em></h1>
            <p className="hero-intro">An editorial growth diagnosis for <strong>@vidhervi__agrawal</strong> — built around clearer relevance, more organic Reel ideas, and a publishing rhythm that can compound.</p>
            <div className="hero-actions">
              <a href="#diagnosis" className="solid-cta">Read the audit <ArrowDown size={17} /></a>
              <a href="#reset" className="underlined-cta">See the 4-week reset</a>
            </div>
          </div>
          <div className="hero-art" style={{ backgroundImage: `url(${assets.hero})` }}>
            <div className="hero-art-shade" />
            <div className="hero-stamp"><span>CASE FILE</span><strong>01</strong></div>
            <div className="profile-cutout photo-frame photo-one"><img src={assets.makeup} alt="Vidhervi in a beauty-led profile image" /></div>
            <div className="profile-cutout photo-frame photo-two"><img src={assets.bandana} alt="Vidhervi in a styling-focused profile image" /></div>
            <div className="scribble-note">LOOKS<br />AREN'T<br />THE ISSUE <span>↗</span></div>
            <div className="hero-stat-card"><span>VISIBLE AUDIT SIGNAL</span><strong>22.6K</strong><small>followers to convert into an active audience</small></div>
          </div>
        </section>

        <section className="signal-strip" aria-label="Key audit metrics">
          <div><strong>85</strong><span>visible posts in profile snapshot</span></div>
          <div><strong>12</strong><span>dated assets observed in the export</span></div>
          <div><strong>4</strong><span>growth levers to fix first</span></div>
          <div className="signal-callout"><Sparkles size={19} /><span>Stop optimising for <em>nice.</em> Start optimising for <em>repeatable.</em></span></div>
        </section>

        <section className="diagnosis-section section-wrap" id="diagnosis" aria-labelledby="diagnosis-title">
          <div className="section-kicker">01 / The diagnosis</div>
          <div className="diagnosis-head">
            <h2 id="diagnosis-title">Where the profile is<br /><em>leaving attention on the table.</em></h2>
            <div className="diagnosis-side-note"><span>MARKED UP BY<br />MACHFOLD</span><p>The profile has a compelling personal presence, but it needs a sharper audience promise and stronger content mechanics. The fixes below turn a fashion-and-beauty feed into a growth system.</p></div>
          </div>
          <div className="issue-grid">
            {issues.map((issue) => <IssueCard issue={issue} key={issue.no} />)}
          </div>
          <div className="diagnosis-quote">
            <div className="quote-mark">“</div>
            <p>A beautiful post is the beginning of the job. The next job is earning a save, a share, a profile visit, and a reason to return.</p>
            <span>MACHFOLD AUDIT NOTE</span>
          </div>
        </section>

        <section className="reel-section" id="reels" aria-labelledby="reel-title">
          <div className="reel-image" style={{ backgroundImage: `url(${assets.reel})` }}>
            <div className="reel-image-label"><Clapperboard size={17} /><span>LOW VIEWS / TRIAL REELS</span></div>
          </div>
          <div className="reel-copy">
            <div className="section-kicker berry">02 / The view problem</div>
            <h2 id="reel-title">Low views on trial Reels?<br /><em>Go more organic, not more generic.</em></h2>
            <p>When even trial Reels are not moving, the answer is rarely another polished montage. The more useful test is a creator-led Reel that sounds like the person behind the account: a current topic, a real opinion, a practical takeaway, and a recognisable point of view.</p>
            <div className="organic-rule"><span className="circled">TEST</span><p><strong>Face + voice + a relevant opinion.</strong> Record short talking Reels about fashion, beauty, creator life, or local culture — but make one clear point in Vidhervi’s natural tone and vibe.</p></div>
            <div className="reel-formula">
              <span>01</span><p><strong>Hook:</strong> Start with the opinion or problem in the first two seconds.</p>
              <span>02</span><p><strong>Proof:</strong> Show the look, product, outfit, or real moment that makes the point.</p>
              <span>03</span><p><strong>Response:</strong> Ask for a take, a save, or a share — one action only.</p>
            </div>
          </div>
        </section>

        <section className="reset-section section-wrap" id="reset" aria-labelledby="reset-title">
          <div className="reset-intro">
            <div>
            <div className="section-kicker">03 / The 4-week reset <span className="markup-pill">FIX THE SIGNAL</span></div>
              <h2 id="reset-title">Make every post<br /><em>easier to understand.</em></h2>
            </div>
            <p>The reset is not “post more.” It is a repeatable mix of content people can use, a clearer relevance signal, and timing tests that produce real account-level learning.</p>
          </div>

          <div className="reset-board">
            <div className="board-column identity-column">
              <span className="board-label">THE NEW PROMISE</span>
              <h3>Wearable Indian fashion + easy beauty looks for young women in the Indore–Mumbai orbit.</h3>
              <div className="identity-tags"><span>INDIAN FASHION</span><span>EASY BEAUTY</span><span>CREATOR LIFE</span></div>
            </div>
            <div className="board-column keyword-column">
              <span className="board-label">SEARCHABLE CONTENT</span>
              <p><strong>Caption:</strong> name the outfit, occasion, place, or beauty problem in the first line.</p>
              <p><strong>Keyword:</strong> repeat the one phrase that makes the Reel or carousel discoverable.</p>
              <p><strong>Hashtag:</strong> use 3–8 relevant topic, local, or occasion tags — never a copied wall.</p>
              <div className="search-examples"><span>#kurtistyling</span><span>#mumbaifashionblogger</span><span>#everydaymakeupindia</span></div>
            </div>
            <div className="board-column photo-column"><img src={assets.yellow} alt="Vidhervi wearing an Indian fashion look" /><span>MAKE IT SAVE-WORTHY</span></div>
          </div>

          <div className="timing-layout">
            <div className="timing-copy"><span className="board-label">STARTING TEST WINDOWS / IST</span><h3>Use timing as a hypothesis. Then let the account’s own Insights choose the winners.</h3><p>Post comparable content across these windows for four weeks. Judge tutorials by saves and shares, lifestyle posts by comments and profile visits, and collaborations by clicks and inquiries.</p></div>
            <div className="timing-table">
              {timing.map((slot) => <div className="time-row" key={slot.day}><span className="time-day">{slot.day}</span><strong>{slot.time}</strong><p>{slot.focus}</p></div>)}
            </div>
          </div>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-title">
          <div className="service-hero" style={{ backgroundImage: `url(${assets.services})` }}>
            <div className="service-hero-overlay" />
            <div className="service-hero-content">
              <div className="section-kicker on-dark">04 / The Machfold layer</div>
              <h2 id="services-title">The audit finds the friction.<br /><em>Machfold builds the system.</em></h2>
              <p>From the first content idea to the monthly readout, Machfold turns creator attention into a structured growth engine.</p>
              <a href="#service-grid" className="service-cta">Explore the growth stack <ArrowDown size={17} /></a>
            </div>
          </div>

          <div className="services-grid" id="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isOpen = activeService === index;
              return <article className={`service-card ${isOpen ? "is-open" : ""}`} key={service.title}>
                <button className="service-card-toggle" type="button" aria-expanded={isOpen} onClick={() => setActiveService(isOpen ? null : index)}>
                  <div className="service-number">0{index + 1}</div>
                  <div className="service-stamp">MACHFOLD<br />METHOD</div>
                  <div className="service-icon"><Icon size={23} /></div>
                  <div className="service-title-row"><h3>{service.title}</h3><ChevronDown size={17} className="service-chevron" /></div>
                  <p>{service.text}</p>
                </button>
                <div className="service-detail" aria-hidden={!isOpen}><span>WHAT CHANGES</span><p>{service.detail}</p></div>
                <CircleCheck size={18} className="service-check" />
              </article>;
            })}
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-image" style={{ backgroundImage: `url(${assets.growth})` }}><div className="closing-stamp">GROWTH<br />IS A<br />SYSTEM</div></div>
          <div className="closing-copy">
            <div className="section-kicker berry">Next chapter</div>
            <h2>Turn a scroll-stopper into a <em>follow, save, share, and inquiry.</em></h2>
            <p>Vidhervi does not need to become a different creator. The account needs a content system that makes the existing point of view easier to find, trust, and act on.</p>
            <div className="closing-actions"><a className="solid-cta large-cta" href={CAL_BOOKING_URL} target="_blank" rel="noreferrer">Schedule a discovery meet <ArrowUpRight size={17} /></a><button className="underlined-cta pdf-bottom" type="button" onClick={handlePdfDownload} disabled={isExporting}><FileDown size={15} />{isExporting ? "Building PDF…" : "Download the full audit"}</button></div>
          </div>
        </section>

        <section className="booking-section" aria-labelledby="booking-title">
          <div className="booking-kicker"><MessageCircle size={16} /> READY WHEN YOU ARE</div>
          <div className="booking-copy"><h2 id="booking-title">Bring the friction.<br /><em>Leave with a plan.</em></h2><p>Book a 45-minute Discovery Meet with Machfold Ventures to talk through the content, the collaborations, and the growth system that comes next.</p></div>
          <a className="booking-button" href={CAL_BOOKING_URL} target="_blank" rel="noreferrer"><span>Book Discovery Meet</span><span>45 min <ArrowUpRight size={15} /></span></a>
        </section>

        <section className="privacy-note" aria-label="Source and privacy note"><ShieldCheck size={18} /><p><strong>Public information note.</strong> All images, media, and profile details in this audit were sourced from publicly available information. This page does not use private data, private account access, or breach of privacy.</p></section>
      </main>

      <footer className="site-footer">
        <div><img src={assets.mark} alt="Machfold" /><span>machfold</span></div>
        <p>Creator growth, with a point of view.</p>
        <a href="#top">Top <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  );
}
