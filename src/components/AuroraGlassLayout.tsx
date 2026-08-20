import React, { useState } from 'react';
import { PORTFOLIO_PROFILE, ProjectCaseStudy } from '../data/portfolioData';
import profileImage from '../assets/profileImage';
import { 
  Shield, 
  Terminal, 
  Code2, 
  BarChart3, 
  ArrowUpRight, 
  FileDown, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Sparkles, 
  CheckCircle2, 
  Send,
  Zap,
  Layers,
  Cpu,
  Lock,
  ChevronRight,
  Database
} from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

export const AuroraGlassLayout: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeToolkitTab, setActiveToolkitTab] = useState<string>('cyber_security');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_PROFILE.projects
    : PORTFOLIO_PROFILE.projects.filter(p => {
        if (activeCategory === 'cyber') return p.category.toLowerCase().includes('security') || p.category.toLowerCase().includes('cyber');
        if (activeCategory === 'software') return p.category.toLowerCase().includes('software') || p.category.toLowerCase().includes('python') || p.category.toLowerCase().includes('full stack');
        if (activeCategory === 'data') return p.category.toLowerCase().includes('data') || p.category.toLowerCase().includes('power bi');
        return true;
      });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cyberAudio.playSuccess();
    confetti({ particleCount: 70, spread: 90, origin: { y: 0.6 } });
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 2500);
  };

  const handleDownloadCV = () => {
    cyberAudio.playSuccess();
    const element = document.createElement('a');
    const file = new Blob([
      `SATHYA SAI JS - Minimalist Engineering Resume\n\n` +
      `ROLE: Cyber Security Engineer • Software Developer • Data Analyst\n` +
      `EMAIL: ${PORTFOLIO_PROFILE.email}\n` +
      `PHONE: ${PORTFOLIO_PROFILE.phone}\n` +
      `LOCATION: ${PORTFOLIO_PROFILE.location}\n\n` +
      `SUMMARY:\n${PORTFOLIO_PROFILE.bio}\n\n` +
      `EXPERIENCE:\nTechnical Associate @ Braiil Academy (2025 - Present)\n\n` +
      `EDUCATION:\n- B.E. Cyber Security, Sri Ram Engineering College\n- Diploma in ECE, CPCL Polytechnic College`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Sathya_Sai_JS_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden pb-24">
      {/* Aurora Gradient Mesh Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[130px] pointer-events-none" />
      <div className="fixed top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-pink-600/15 blur-[140px] pointer-events-none" />

      {/* Grid Mesh Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-8 relative z-10">
        {/* Floating Gloss Header */}
        <header className="flex items-center justify-between p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center">
              <span className="font-mono font-bold text-sm tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-pink-200">
                {PORTFOLIO_PROFILE.brandMark}
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-sm sm:text-base text-white/90">
                {PORTFOLIO_PROFILE.name}
              </h1>
              <p className="text-[10px] font-mono text-white/40 tracking-wider">
                PORTFOLIO
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadCV}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 font-mono text-xs transition-all"
            >
              <FileDown className="w-3.5 h-3.5" /> CV
            </button>
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {PORTFOLIO_PROFILE.availability}
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              Engineering{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                Next-Generation
              </span>{' '}
              Security & Intelligence.
            </h2>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
              {PORTFOLIO_PROFILE.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-2xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-white/90 transition-all flex items-center gap-2 shadow-xl"
              >
                Explore Projects <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#toolkit"
                className="px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 font-medium text-xs transition-all"
              >
                Skills & Tech Stack
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] max-w-md">
              {PORTFOLIO_PROFILE.stats.map((st, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white tracking-tight">{st.value}</div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Frosted Portrait Stage */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl p-3 bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/20 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img 
                  src={profileImage} 
                  alt="Sathya Sai JS" 
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-white/[0.08] border border-white/15 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">{PORTFOLIO_PROFILE.name}</div>
                    <div className="text-[10px] font-mono text-white/50">{PORTFOLIO_PROFILE.roleTitle}</div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {PORTFOLIO_PROFILE.pillars.map(p => (
            <div 
              key={p.id} 
              className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all backdrop-blur-lg space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-indigo-400">{p.number}</span>
                <span className="text-white/30 font-bold">PILLAR</span>
              </div>
              <h3 className="font-semibold text-base text-white">{p.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase">PORTFOLIO</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Featured Case Studies</h2>
            </div>

            <div className="flex gap-2 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              {[
                { id: 'all', label: 'All' },
                { id: 'cyber', label: 'Cyber' },
                { id: 'software', label: 'Software' },
                { id: 'data', label: 'Data BI' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-white text-black font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map(proj => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-all backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-indigo-300 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono text-white/30">{proj.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">{proj.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.06]">
                  {proj.metrics.map((m, mi) => (
                    <div key={mi}>
                      <div className="text-sm font-semibold text-white">{m.value}</div>
                      <div className="text-[9px] font-mono text-white/40">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 3).map((t, ti) => (
                      <span key={ti} className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[9px] font-mono text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-indigo-300 hover:text-indigo-100 flex items-center gap-1"
                  >
                    Source <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Experience */}
        <section id="toolkit" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-6">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase">TECH MATRIX</span>
              <h3 className="text-xl font-bold text-white">Skills & Toolkit</h3>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-3">
              {PORTFOLIO_PROFILE.toolkitCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    cyberAudio.playKeyClick();
                    setActiveToolkitTab(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    activeToolkitTab === cat.id
                      ? 'bg-indigo-500 text-white'
                      : 'text-white/60 hover:text-white bg-white/[0.03]'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PORTFOLIO_PROFILE.toolkitCategories
                .find(c => c.id === activeToolkitTab)?.skills.map((skill, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-white/90">{skill}</span>
                    <span className="text-[10px] font-mono text-emerald-400">PRO</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Certifications & Experience */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-6">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase">CREDENTIALS</span>
              <h3 className="text-xl font-bold text-white">Verified Certifications</h3>
            </div>

            <div className="space-y-3">
              {PORTFOLIO_PROFILE.certifications.map(cert => (
                <div key={cert.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/50">{cert.year}</span>
                    <span className="text-[9px] text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10">VERIFIED</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm">{cert.title}</h4>
                  <p className="text-xs text-white/50">{cert.issuer} • {cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.1] backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-indigo-400 uppercase">TRANSMIT INQUIRY</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Let's build secure solutions together.</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                Open to cybersecurity defense roles, full stack engineering, and enterprise BI analytics.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between font-mono">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>{PORTFOLIO_PROFILE.email}</span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between font-mono">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{PORTFOLIO_PROFILE.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 font-mono text-xs">
                <a
                  href={PORTFOLIO_PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-center border border-white/10 text-white/80 transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href={PORTFOLIO_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-center border border-white/10 text-white/80 transition-all"
                >
                  GitHub
                </a>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="lg:col-span-7 space-y-3">
              <div>
                <label className="text-[10px] font-mono text-white/50 block mb-1">YOUR NAME</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/50 block mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/50 block mb-1">MESSAGE</label>
                <textarea
                  rows={3}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-indigo-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                {contactSubmitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Transmission Sent
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Transmit Message
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
