import React, { useState } from 'react';
import { PORTFOLIO_PROFILE, ProjectCaseStudy } from '../data/portfolioData';
import profileImage from '../assets/profileImage';
import { 
  Terminal, 
  Shield, 
  Code2, 
  BarChart3, 
  ArrowUpRight, 
  Download, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  ExternalLink,
  Award,
  Sparkles,
  CheckCircle2,
  Send,
  Zap,
  Layers,
  Flame,
  Globe,
  Radio
} from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

export const NeoBrutalistLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'cyber' | 'software' | 'data'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const filteredProjects = activeTab === 'all' 
    ? PORTFOLIO_PROFILE.projects 
    : PORTFOLIO_PROFILE.projects.filter(p => {
        if (activeTab === 'cyber') return p.category.toLowerCase().includes('security') || p.category.toLowerCase().includes('cyber');
        if (activeTab === 'software') return p.category.toLowerCase().includes('software') || p.category.toLowerCase().includes('python') || p.category.toLowerCase().includes('full stack');
        if (activeTab === 'data') return p.category.toLowerCase().includes('data') || p.category.toLowerCase().includes('power bi');
        return true;
      });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cyberAudio.playSuccess();
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 2800);
  };

  const handleDownloadCV = () => {
    cyberAudio.playSuccess();
    const element = document.createElement('a');
    const file = new Blob([
      `SATHYA SAI JS - Brutalist Engineering Resume\n\n` +
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
    <div className="min-h-screen bg-[#f4f0ea] text-[#111111] font-sans antialiased selection:bg-[#ff5500] selection:text-white pb-24">
      {/* Brutalist Top Marquee Banner */}
      <div className="w-full bg-[#ff5500] text-white py-2 px-4 border-b-3 border-black font-mono text-xs font-black tracking-widest uppercase overflow-hidden flex items-center gap-8 whitespace-nowrap">
        <div className="flex items-center gap-6 animate-pulse">
          <span className="flex items-center gap-1.5"><Radio className="w-3.5 h-3.5" /> LIVE STATUS: {PORTFOLIO_PROFILE.availability}</span>
          <span>•</span>
          <span>SYSTEMS: SECURED (ZERO BREACH)</span>
          <span>•</span>
          <span>LOCATION: CHENNAI, TN, INDIA</span>
          <span>•</span>
          <span>SECURITY • DEV • ANALYTICS</span>
          <span>•</span>
          <span>CODEBASE: SATBOY-12</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        {/* Navigation Bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 bg-white border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white font-mono font-black text-lg flex items-center justify-center border-2 border-black">
              {PORTFOLIO_PROFILE.brandMark}
            </div>
            <div>
              <h1 className="font-black text-lg sm:text-xl tracking-tight leading-none uppercase">
                {PORTFOLIO_PROFILE.name}
              </h1>
              <p className="font-mono text-[10px] font-bold text-[#ff5500] uppercase tracking-wider">
                ENGINEER & ANALYST
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs font-bold">
            <button
              onClick={handleDownloadCV}
              className="px-4 py-2 bg-[#ffdd00] hover:bg-[#ffe633] text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> CV.TXT
            </button>
            <a
              href="#contact"
              className="px-4 py-2 bg-black hover:bg-[#ff5500] text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer uppercase"
            >
              HIRE ME
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column (Hero Content) */}
          <div className="lg:col-span-8 p-6 sm:p-10 bg-white border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div className="inline-block px-3 py-1 bg-[#ffdd00] border-2 border-black font-mono text-xs font-black tracking-wider uppercase">
              DEFENSE • FULL-STACK • INTELLIGENCE
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.95] uppercase">
              ARCHITECTING <span className="text-[#ff5500] underline decoration-4">UNBREAKABLE</span> DIGITAL SYSTEMS.
            </h2>

            <p className="text-base sm:text-lg font-medium text-black/80 leading-relaxed max-w-2xl">
              {PORTFOLIO_PROFILE.tagline}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t-3 border-black">
              {PORTFOLIO_PROFILE.stats.map((st, i) => (
                <div key={i} className="p-3 bg-[#f8f6f0] border-2 border-black">
                  <div className="text-2xl sm:text-3xl font-black text-black">{st.value}</div>
                  <div className="font-mono text-[10px] font-bold uppercase text-black/60">{st.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 bg-[#00e599] hover:bg-[#00c985] text-black font-black text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
              >
                VIEW CASE STUDIES <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-white hover:bg-black hover:text-white text-black font-mono font-bold text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> GITHUB REPOS
              </a>
            </div>
          </div>

          {/* Right Column (Brutalist Portrait Box) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative p-4 bg-[#ffdd00] border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
              <div className="w-full aspect-[4/5] bg-black border-2 border-black overflow-hidden relative group">
                <img 
                  src={profileImage} 
                  alt="Sathya Sai JS" 
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase">
                  VERIFIED IDENT
                </div>
              </div>
              <div className="w-full mt-3 p-2 bg-white border-2 border-black font-mono text-xs font-bold text-center">
                SATHYA SAI JS // CHENNAI
              </div>
            </div>

            <div className="p-4 bg-white border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-2">
              <div className="font-mono text-xs font-black uppercase text-[#ff5500]">ACTIVE ENGAGEMENT</div>
              <div className="font-bold text-sm">Technical Associate — Braiil Academy</div>
              <p className="text-xs text-black/70">Educational technology, data reporting & automated systems infrastructure.</p>
            </div>
          </div>
        </section>

        {/* 4 Core Pillars Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PORTFOLIO_PROFILE.pillars.map((p) => (
            <div key={p.id} className="p-5 bg-white border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-black">
                <span className="px-2 py-0.5 bg-black text-white">{p.number}</span>
                <span className="text-[#ff5500]">ACTIVE</span>
              </div>
              <h3 className="font-black text-base uppercase">{p.title}</h3>
              <p className="text-xs text-black/70 leading-relaxed font-medium">{p.description}</p>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">FEATURED ARCHITECTURES</h2>
              <p className="font-mono text-xs font-bold text-black/60 uppercase">PROVEN PRODUCTION WORK</p>
            </div>

            <div className="flex gap-2 font-mono text-xs font-bold">
              {[
                { id: 'all', label: 'ALL WORK' },
                { id: 'cyber', label: 'CYBER DEFENSE' },
                { id: 'software', label: 'SOFTWARE' },
                { id: 'data', label: 'DATA / BI' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 border-2 border-black transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(255,85,0,1)]' 
                      : 'bg-white text-black hover:bg-[#ffdd00]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id} 
                className="p-6 bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs font-bold">
                    <span className="px-2 py-0.5 bg-[#ffdd00] border border-black uppercase">{proj.category}</span>
                    <span className="text-black/50">{proj.number}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">{proj.title}</h3>
                  <p className="text-sm text-black/80 font-medium leading-relaxed">{proj.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y-2 border-black font-mono">
                  {proj.metrics.map((m, mi) => (
                    <div key={mi} className="text-center">
                      <div className="font-black text-sm text-[#ff5500]">{m.value}</div>
                      <div className="text-[9px] uppercase text-black/60 font-bold">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 3).map((t, ti) => (
                      <span key={ti} className="px-2 py-0.5 bg-[#f0eee9] border border-black font-mono text-[10px] font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs font-black text-black hover:text-[#ff5500] flex items-center gap-1 uppercase"
                  >
                    CODE <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Certifications Split */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Skills Arsenal */}
          <div className="p-6 sm:p-8 bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="text-2xl font-black uppercase">TECHNICAL ARSENAL</h3>
            <p className="font-mono text-xs text-black/60 uppercase font-bold">CORE CAPABILITIES & TOOLS</p>

            <div className="space-y-3 pt-2">
              {PORTFOLIO_PROFILE.toolkitCategories.map(cat => (
                <div key={cat.id} className="p-3 bg-[#fbf9f5] border-2 border-black space-y-2">
                  <div className="font-mono text-xs font-black text-[#ff5500] uppercase flex items-center justify-between">
                    <span>{cat.name}</span>
                    <span>{cat.count} SKILLS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s, si) => (
                      <span key={si} className="px-2 py-1 bg-white border border-black text-xs font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Certifications */}
          <div className="p-6 sm:p-8 bg-[#ffdd00] border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="text-2xl font-black uppercase text-black">VERIFIED CREDENTIALS</h3>
            <p className="font-mono text-xs text-black/70 uppercase font-bold">ACCREDITATIONS & CERTIFICATES</p>

            <div className="space-y-3 pt-2">
              {PORTFOLIO_PROFILE.certifications.map(cert => (
                <div key={cert.id} className="p-4 bg-white border-2 border-black space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs font-black">
                    <span className="text-[#ff5500]">{cert.year}</span>
                    <span className="px-2 py-0.5 bg-black text-white text-[9px] uppercase">VERIFIED</span>
                  </div>
                  <h4 className="font-black text-base uppercase">{cert.title}</h4>
                  <p className="text-xs text-black/70 font-medium">{cert.issuer} • {cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="p-6 sm:p-10 bg-white border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-3xl font-black uppercase">INITIALIZE CONTACT</h3>
              <p className="text-sm font-medium text-black/80 leading-relaxed">
                Available for cyber defense auditing, custom software architectures, and automated data telemetry pipelines.
              </p>

              <div className="space-y-2 pt-2 font-mono text-xs font-bold">
                <div className="p-3 bg-[#f8f6f0] border-2 border-black flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#ff5500]" />
                    <span>{PORTFOLIO_PROFILE.email}</span>
                  </div>
                </div>
                <div className="p-3 bg-[#f8f6f0] border-2 border-black flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#00e599]" />
                    <span>{PORTFOLIO_PROFILE.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 font-mono text-xs font-bold">
                <a
                  href={PORTFOLIO_PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-2.5 bg-black text-white text-center border-2 border-black hover:bg-[#ff5500] transition-colors"
                >
                  LINKEDIN
                </a>
                <a
                  href={PORTFOLIO_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-2.5 bg-black text-white text-center border-2 border-black hover:bg-[#ff5500] transition-colors"
                >
                  GITHUB
                </a>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="lg:col-span-7 space-y-4">
              <div>
                <label className="font-mono text-xs font-black uppercase block mb-1">NAME / ENTITY</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full p-3 bg-[#f8f6f0] border-2 border-black font-sans text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="font-mono text-xs font-black uppercase block mb-1">COMMUNICATION CHANNEL (EMAIL)</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full p-3 bg-[#f8f6f0] border-2 border-black font-sans text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="font-mono text-xs font-black uppercase block mb-1">SPECIFICATION / MESSAGE</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your security challenge or engineering project..."
                  className="w-full p-3 bg-[#f8f6f0] border-2 border-black font-sans text-sm focus:outline-none focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#ff5500] hover:bg-black text-white font-black text-sm tracking-wider uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {contactSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> TRANSMISSION LOGGED
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> DISPATCH MESSAGE
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
