import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

const photo = '/sathya-profile.jpeg';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function RunningText({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) {
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-white/10 py-3" aria-hidden="true">
      <div className={`sjs-marquee ${reverse ? 'sjs-marquee-reverse' : ''}`}>
        {[0, 1].map((i) => (
          <span key={i} className="inline-flex items-center gap-8 pr-8">{children}<i className="not-italic text-white/25">✦</i></span>
        ))}
      </div>
    </div>
  );
}

export const SathyaCinematicPortfolio: React.FC = () => {
  const [intro, setIntro] = useState(true);
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('home');
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      if (hero) {
        const max = Math.max(1, hero.offsetHeight - window.innerHeight);
        setProgress(clamp(window.scrollY / max, 0, 1));
      }
      const ids = ['home', 'about', 'skills', 'work', 'journey', 'contact'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.35 && r.bottom >= window.innerHeight * 0.35) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = intro || menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [intro, menu]);

  const roles = useMemo(() => PORTFOLIO_PROFILE.roles, []);
  const projects = useMemo(() => PORTFOLIO_PROFILE.projects.slice(0, 5), []);
  const timeline = useMemo(() => PORTFOLIO_PROFILE.timeline, []);

  const enter = () => {
    setIntro(false);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
  };

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const rotate = progress * 360;
  const photoScale = 1.02 + progress * 0.08;
  const photoY = progress * -7;
  const photoOpacity = 1 - Math.max(0, progress - 0.72) * 2.2;

  return (
    <div className="sjs-site min-h-screen overflow-x-hidden bg-[#050505] text-[#f4f1e8]">
      <style>{`
        :root{color-scheme:dark}
        html{scroll-behavior:smooth}
        .sjs-site{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}
        .sjs-display{font-family:Georgia,"Times New Roman",serif;letter-spacing:-.055em}
        .sjs-track{letter-spacing:.18em;text-transform:uppercase}
        .sjs-marquee{display:inline-flex;min-width:max-content;animation:sjsMarquee 24s linear infinite;font-size:clamp(2.5rem,7vw,8rem);line-height:.9;font-weight:500}
        .sjs-marquee-reverse{animation-name:sjsMarqueeReverse;animation-duration:30s}
        @keyframes sjsMarquee{to{transform:translateX(-50%)}}
        @keyframes sjsMarqueeReverse{to{transform:translateX(50%)}}
        @keyframes sjsReveal{from{opacity:0;transform:translateY(30px);filter:blur(12px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
        @keyframes sjsFloat{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-12px,0)}}
        .sjs-reveal{animation:sjsReveal 1s cubic-bezier(.22,1,.36,1) both}
        .sjs-delay-1{animation-delay:.12s}.sjs-delay-2{animation-delay:.24s}.sjs-delay-3{animation-delay:.36s}.sjs-delay-4{animation-delay:.48s}
        .sjs-noise{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E")}
        .sjs-grid{background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:72px 72px}
        .sjs-photo-shell{transform-style:preserve-3d;perspective:1400px}
        .sjs-photo{transform-style:preserve-3d;backface-visibility:hidden;will-change:transform}
        .sjs-orbit{animation:sjsFloat 5s ease-in-out infinite}
        .sjs-word{display:inline-block;animation:sjsReveal .9s cubic-bezier(.22,1,.36,1) both}
        @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.sjs-marquee,.sjs-reveal,.sjs-word,.sjs-orbit{animation:none!important}.sjs-photo{transition:none!important}}
      `}</style>

      {intro && (
        <div className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-black" onClick={enter}>
          <div className="absolute inset-0 sjs-noise opacity-20" />
          <div className="relative text-center">
            <div className="sjs-track mb-5 text-[10px] text-white/40">PERSONAL PORTFOLIO / 2026</div>
            <div className="sjs-display text-[clamp(4rem,12vw,11rem)] leading-none">SJS</div>
            <div className="mt-8 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[.35em] text-white/50">
              <span className="h-px w-12 bg-white/30" /> Click to enter <span className="h-px w-12 bg-white/30" />
            </div>
          </div>
        </div>
      )}

      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference sm:px-8">
        <button onClick={() => go('home')} className="sjs-track text-xs font-semibold">SATHYA SAI JS</button>
        <div className="hidden items-center gap-7 text-[10px] uppercase tracking-[.2em] md:flex">
          {['about','skills','work','journey','contact'].map((id) => <button key={id} onClick={() => go(id)} className={`${active===id?'text-white':'text-white/45'} transition hover:text-white`}>{id}</button>)}
        </div>
        <button aria-label="Menu" onClick={() => setMenu(true)} className="rounded-full border border-white/25 p-2 md:hidden"><Menu size={18}/></button>
      </header>

      {menu && (
        <div className="fixed inset-0 z-[90] bg-black/90 p-7 backdrop-blur-xl md:hidden">
          <button className="absolute right-6 top-6" onClick={() => setMenu(false)}><X/></button>
          <div className="mt-24 flex flex-col gap-7 text-4xl sjs-display">
            {['home','about','skills','work','journey','contact'].map(id => <button key={id} onClick={() => go(id)} className="text-left">{id}</button>)}
          </div>
        </div>
      )}

      <main>
        <section id="home" ref={heroRef} className="relative h-[145vh]">
          <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 sjs-grid opacity-40" style={{ transform: `translate3d(0,${progress * 80}px,0) scale(${1 + progress * .08})` }} />
            <div className="absolute inset-0 sjs-noise opacity-25" />
            <div className="absolute -left-32 top-1/3 h-[42vw] w-[42vw] rounded-full bg-white/[.025] blur-3xl" />
            <div className="absolute right-[-12vw] top-1/4 h-[38vw] w-[38vw] rounded-full bg-amber-100/[.035] blur-3xl" />

            <div className="absolute inset-x-5 top-[15%] z-20 sm:inset-x-8 sm:top-[18%]">
              <div className="sjs-track sjs-reveal text-[9px] text-white/45">CYBERSECURITY · SOFTWARE · DATA · ENTREPRENEUR</div>
              <h1 className="sjs-display mt-4 max-w-4xl text-[clamp(4.5rem,12vw,12rem)] leading-[.78] font-medium">
                <span className="sjs-word">SATHYA</span><br/>
                <span className="sjs-word sjs-delay-2 text-white/80">SAI JS</span>
              </h1>
              <p className="sjs-reveal sjs-delay-3 mt-8 max-w-xl text-sm leading-7 text-white/60 sm:text-base">{PORTFOLIO_PROFILE.tagline}</p>
            </div>

            <div className="sjs-photo-shell absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="sjs-orbit relative mt-12 h-[58vh] w-[min(72vw,500px)] sm:h-[72vh] sm:w-[min(42vw,540px)]" style={{ opacity: photoOpacity }}>
                <div className="absolute inset-[-8%] rounded-[50%] border border-white/15" style={{ transform: `rotate(${progress * 22 - 10}deg) scale(${1 + progress*.12})` }} />
                <div className="absolute inset-[-15%] rounded-[50%] border border-white/10" style={{ transform: `rotate(${progress * -30 + 15}deg) scale(${1 + progress*.18})` }} />
                <div className="absolute inset-0 overflow-hidden rounded-[48%] [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]">
                  <img src={photo} alt="Sathya Sai JS" className="sjs-photo h-full w-full object-cover object-top" style={{ transform: `translate3d(0,${photoY}px,0) scale(${photoScale}) rotateY(${rotate}deg)`, transformOrigin:'50% 50%', filter:`contrast(1.03) saturate(.86) brightness(${1 - progress*.08})` }} />
                </div>
                <div className="absolute inset-x-0 bottom-8 flex justify-center"><span className="sjs-track rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[8px] text-white/65 backdrop-blur">REAL IMAGE · SCROLL ORBIT</span></div>
              </div>
            </div>

            <div className="absolute bottom-8 left-5 z-30 sm:left-8">
              <div className="sjs-track text-[9px] text-white/40">SCROLL TO EXPLORE</div>
              <div className="mt-3 h-20 w-px bg-white/15"><div className="w-px bg-white" style={{height:`${Math.max(8,progress*100)}%`}} /></div>
            </div>
            <div className="absolute bottom-8 right-5 z-30 text-right sm:right-8">
              <div className="text-xs text-white/50">{String(Math.round(progress*360)).padStart(3,'0')}°</div>
              <div className="sjs-track mt-2 text-[8px] text-white/35">PHOTO ORBIT</div>
            </div>
          </div>
        </section>

        <RunningText>CYBERSECURITY · WEB DEVELOPMENT · APP DEVELOPMENT · DATA ANALYTICS · ENTREPRENEURSHIP</RunningText>

        <section id="about" className="relative px-5 py-28 sm:px-8 sm:py-40">
          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[.25fr_1fr]">
            <div className="sjs-track text-[9px] text-white/35">01 / ABOUT</div>
            <div>
              <h2 className="sjs-display max-w-5xl text-[clamp(3.2rem,8vw,8rem)] leading-[.88]">{PORTFOLIO_PROFILE.aboutHeadline}</h2>
              <p className="mt-12 max-w-3xl text-lg leading-8 text-white/60 sm:text-2xl sm:leading-10">{PORTFOLIO_PROFILE.bio}</p>
              <div className="mt-16 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
                {PORTFOLIO_PROFILE.stats.map((s) => <div key={s.label}><div className="sjs-display text-5xl">{s.value}</div><div className="sjs-track mt-2 text-[9px] text-white/40">{s.label}</div><p className="mt-3 text-xs text-white/45">{s.desc}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <RunningText reverse>SECURE · BUILD · ANALYZE · CREATE · GROW</RunningText>

        <section id="skills" className="relative px-5 py-28 sm:px-8 sm:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-[.25fr_1fr]">
              <div className="sjs-track text-[9px] text-white/35">02 / EXPERTISE</div>
              <div>
                <h2 className="sjs-display text-[clamp(4rem,10vw,10rem)] leading-[.8]">WHAT I<br/><span className="text-white/35">BUILD.</span></h2>
                <div className="mt-20 divide-y divide-white/10 border-y border-white/10">
                  {PORTFOLIO_PROFILE.toolkitCategories.slice(0,4).map((cat, i) => (
                    <div key={cat.id} className="group grid gap-5 py-8 md:grid-cols-[90px_1fr_2fr] md:items-start">
                      <div className="text-sm text-white/30">0{i+1}</div>
                      <h3 className="text-2xl font-medium transition-transform duration-500 group-hover:translate-x-2">{cat.name}</h3>
                      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/45">{cat.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="relative px-5 py-28 sm:px-8 sm:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 grid gap-12 md:grid-cols-[.25fr_1fr]">
              <div className="sjs-track text-[9px] text-white/35">03 / SELECTED WORK</div>
              <h2 className="sjs-display text-[clamp(4rem,9vw,9rem)] leading-[.8]">SELECTED<br/><span className="text-white/35">WORK.</span></h2>
            </div>
            <div className="space-y-28">
              {projects.map((p, i) => (
                <article key={p.id} className="group grid gap-8 md:grid-cols-[80px_1.25fr_1fr] md:items-center">
                  <div className="text-sm text-white/30">{p.number}</div>
                  <a href={p.liveUrl || p.githubUrl} target="_blank" rel="noreferrer" className="relative aspect-[16/10] overflow-hidden bg-white/5">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute bottom-5 left-5 text-[9px] uppercase tracking-[.2em] text-white/60">Open project <ArrowUpRight size={13} className="inline"/></span>
                  </a>
                  <div>
                    <div className="sjs-track text-[9px] text-white/35">{p.category}</div>
                    <h3 className="sjs-display mt-3 text-4xl leading-none sm:text-6xl">{p.title}</h3>
                    <p className="mt-6 max-w-lg text-sm leading-7 text-white/50">{p.shortDesc}</p>
                    <div className="mt-7 flex flex-wrap gap-2">{p.tags.map(tag => <span key={tag} className="text-[9px] uppercase tracking-[.15em] text-white/35">{tag}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="relative border-t border-white/10 px-5 py-28 sm:px-8 sm:py-40">
          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[.25fr_1fr]">
            <div className="sjs-track text-[9px] text-white/35">04 / JOURNEY</div>
            <div>
              <h2 className="sjs-display text-[clamp(4rem,9vw,9rem)] leading-[.8]">THE<br/><span className="text-white/35">PATH.</span></h2>
              <div className="mt-20 border-t border-white/10">
                {timeline.map((item, i) => <div key={`${item.period}-${item.institution}`} className="grid gap-5 border-b border-white/10 py-10 md:grid-cols-[160px_1fr]">
                  <div className="sjs-track text-[9px] text-white/35">{item.period}</div>
                  <div><h3 className="text-2xl">{item.degree}</h3><div className="mt-1 text-sm text-white/45">{item.institution} · {item.location}</div><p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">{item.highlight}</p></div>
                </div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden border-t border-white/10 px-5 py-32 sm:px-8 sm:py-48">
          <div className="absolute inset-0 sjs-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl">
            <div className="sjs-track text-[9px] text-white/35">05 / CONTACT</div>
            <h2 className="sjs-display mt-8 max-w-6xl text-[clamp(4rem,11vw,12rem)] leading-[.78]">LET'S<br/><span className="text-white/35">BUILD.</span></h2>
            <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <a href={PORTFOLIO_PROFILE.socials.email} className="text-lg underline decoration-white/20 underline-offset-8 transition hover:decoration-white">{PORTFOLIO_PROFILE.email}</a>
              <div className="flex gap-3">
                <a aria-label="GitHub" href={PORTFOLIO_PROFILE.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-3 hover:bg-white hover:text-black"><Github size={18}/></a>
                <a aria-label="LinkedIn" href={PORTFOLIO_PROFILE.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-3 hover:bg-white hover:text-black"><Linkedin size={18}/></a>
                <a aria-label="Email" href={PORTFOLIO_PROFILE.socials.email} className="rounded-full border border-white/15 p-3 hover:bg-white hover:text-black"><Mail size={18}/></a>
              </div>
            </div>
            <div className="mt-32 flex items-end justify-between border-t border-white/10 pt-5 text-[9px] uppercase tracking-[.18em] text-white/30"><span>SATHYA SAI JS</span><span>© 2026</span></div>
          </div>
        </section>
      </main>

      <button onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="fixed bottom-5 right-5 z-40 rounded-full border border-white/15 bg-black/50 p-3 backdrop-blur hover:bg-white hover:text-black" aria-label="Back to top"><ArrowUp/></button>
    </div>
  );
};
