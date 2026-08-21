import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Copy, Check, RotateCcw, Sparkles, ChevronRight, CornerDownLeft, Shield, Code2, BarChart3, Radio } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { cyberAudio } from '../utils/soundEngine';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'success' | 'error' | 'info' | 'json';
  text: string;
  timestamp?: string;
}

interface InteractiveTerminalProps {
  accentColor?: string;
  onThemeSwitch?: (idx: number) => void;
}

const INITIAL_LINES: TerminalLine[] = [
  { id: '1', type: 'info', text: 'SATHYA OS [Version 2.6.4] — Enterprise Production Console' },
  { id: '2', type: 'info', text: 'Type "help" to view executable commands or click any quick-run script below.' },
  { id: '3', type: 'command', text: 'npm run build --analyze' },
  { id: '4', type: 'output', text: '▶ Initializing build process...' },
  { id: '5', type: 'output', text: '✔ Resolving dependencies (128 packages)' },
  { id: '6', type: 'output', text: '✔ Tree-shaking unused modules' },
  { id: '7', type: 'output', text: 'Bundle Analysis: main.js (142 KB), vendor.js (312 KB), styles.css (28 KB)' },
  { id: '8', type: 'success', text: '✔ Build completed successfully in 1.2s' },
  { id: '9', type: 'command', text: 'curl https://api.sathya.dev/v1/auth' },
  { 
    id: '10', 
    type: 'json', 
    text: JSON.stringify({
      status: 'authorized',
      role: 'Web & App Developer @ BSRocks | Cyber Security Engineer',
      organizations: ['BSRocks (Web & App Developer)', 'Braiil Academy (Technical Associate)'],
      degree: 'B.E. Cyber Security (2024-2027)',
      location: 'Chennai, India',
      availability: 'Immediate Engagement'
    }, null, 2)
  }
];

const PRESET_SCRIPTS = [
  { label: 'npm run build', cmd: 'npm run build --analyze' },
  { label: 'npm run dev', cmd: 'npm run dev' },
  { label: 'curl /v1/auth', cmd: 'curl https://api.sathya.dev/v1/auth' },
  { label: 'whatsapp', cmd: 'whatsapp' },
  { label: 'gmail', cmd: 'gmail' },
  { label: 'skills', cmd: 'skills' },
  { label: 'projects', cmd: 'projects' },
  { label: 'contact', cmd: 'contact' },
  { label: 'clear', cmd: 'clear' }
];

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  accentColor = '#60a5fa',
  onThemeSwitch
}) => {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<string[]>(['npm run build --analyze', 'curl https://api.sathya.dev/v1/auth']);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines, isExecuting]);

  const executeCommand = async (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    cyberAudio.playKeyClick();
    const newId = Date.now().toString();

    // Append user command
    const cmdLine: TerminalLine = {
      id: newId,
      type: 'command',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);
    setInputVal('');

    const lower = trimmed.toLowerCase();

    // Check clear
    if (lower === 'clear' || lower === 'cls') {
      setLines([
        { id: Date.now().toString(), type: 'info', text: 'Terminal cleared. Type "help" for available commands.' }
      ]);
      return;
    }

    setLines((prev) => [...prev, cmdLine]);
    setIsExecuting(true);

    // Simulate async command execution
    setTimeout(() => {
      let outputLines: TerminalLine[] = [];

      if (lower === 'help') {
        outputLines = [
          { id: Math.random().toString(), type: 'info', text: '=== SATHYA OS EXECUTION MATRIX ===' },
          { id: Math.random().toString(), type: 'output', text: '  whoami          - Display current verified engineer identity' },
          { id: Math.random().toString(), type: 'output', text: '  cat bio.md      - Stream verified professional biography' },
          { id: Math.random().toString(), type: 'output', text: '  skills          - Inspect Technical Arsenal across domains' },
          { id: Math.random().toString(), type: 'output', text: '  projects        - List production architectures & repositories' },
          { id: Math.random().toString(), type: 'output', text: '  certifications  - View verified credentials (Power BI, Python, Security)' },
          { id: Math.random().toString(), type: 'output', text: '  contact         - Output transmission channels & direct contact' },
          { id: Math.random().toString(), type: 'output', text: '  npm run build   - Run full production build & package analyzer' },
          { id: Math.random().toString(), type: 'output', text: '  npm run dev     - Start local Vite development runtime' },
          { id: Math.random().toString(), type: 'output', text: '  curl <url>      - Execute REST endpoint queries' },
          { id: Math.random().toString(), type: 'output', text: '  theme <1|2|3>   - Switch theme (1: Cyber, 2: Dev, 3: Data)' },
          { id: Math.random().toString(), type: 'output', text: '  clear           - Wipe console screen buffer' }
        ];
      } else if (lower === 'whoami') {
        outputLines = [
          { id: Math.random().toString(), type: 'success', text: `USER: ${PORTFOLIO_PROFILE.name}` },
          { id: Math.random().toString(), type: 'output', text: `ROLE: ${PORTFOLIO_PROFILE.roleTitle}` },
          { id: Math.random().toString(), type: 'output', text: `ENGAGEMENT: Web & App Developer @ BSRocks | Technical Associate @ Braiil Academy` },
          { id: Math.random().toString(), type: 'output', text: `STATUS: ${PORTFOLIO_PROFILE.availability}` }
        ];
      } else if (lower.includes('bio') || lower.includes('cat bio')) {
        outputLines = [
          { id: Math.random().toString(), type: 'info', text: '=== cat /var/profile/bio.md ===' },
          { id: Math.random().toString(), type: 'output', text: PORTFOLIO_PROFILE.bio },
          { id: Math.random().toString(), type: 'success', text: `Signature: ${PORTFOLIO_PROFILE.signature}` }
        ];
      } else if (lower === 'skills' || lower.includes('skill')) {
        outputLines = [
          { id: Math.random().toString(), type: 'info', text: '=== VERIFIED TOOLKIT MATRIX ===' },
          { id: Math.random().toString(), type: 'output', text: '• WEB & APP DEV: React.js, React Native, TypeScript, Tailwind CSS, Node.js, Next.js, REST APIs' },
          { id: Math.random().toString(), type: 'output', text: '• CYBER SECURITY: Network Security, Penetration Testing, Zero Trust, Incident Response, Cryptography' },
          { id: Math.random().toString(), type: 'output', text: '• DATA ANALYTICS: Power BI, DAX Modeling, SQL Database Architecture, Business Intelligence' }
        ];
      } else if (lower === 'projects' || lower.includes('project')) {
        outputLines = [
          { id: Math.random().toString(), type: 'info', text: '=== PRODUCTION CASE STUDIES ===' },
          ...PORTFOLIO_PROFILE.projects.map((p) => ({
            id: Math.random().toString(),
            type: 'output' as const,
            text: `[${p.number}] ${p.title} (${p.category}) -> ${p.githubUrl}`
          }))
        ];
      } else if (lower === 'certifications' || lower.includes('cert')) {
        outputLines = [
          { id: Math.random().toString(), type: 'info', text: '=== VERIFIED CREDENTIALS ===' },
          ...PORTFOLIO_PROFILE.certifications.map((c) => ({
            id: Math.random().toString(),
            type: 'success' as const,
            text: `✔ [${c.year}] ${c.title} — ${c.issuer} (ID: ${c.credentialId})`
          }))
        ];
      } else if (lower === 'whatsapp' || lower.includes('wa')) {
        window.open(PORTFOLIO_PROFILE.getWhatsAppUrl(), '_blank');
        outputLines = [
          { id: Math.random().toString(), type: 'info', text: '=== WHATSAPP DIRECT SECURE CHANNEL ===' },
          { id: Math.random().toString(), type: 'success', text: `✔ Opening WhatsApp chat with ${PORTFOLIO_PROFILE.name} (${PORTFOLIO_PROFILE.whatsappNumber || PORTFOLIO_PROFILE.phone})` },
          { id: Math.random().toString(), type: 'output', text: `Direct Link: ${PORTFOLIO_PROFILE.whatsapp}` }
        ];
      } else if (lower === 'gmail' || lower === 'email') {
        window.open(PORTFOLIO_PROFILE.getGmailUrl(), '_blank');
        outputLines = [
          { id: Math.random().toString(), type: 'info', text: '=== GMAIL INBOX TRANSMISSION ===' },
          { id: Math.random().toString(), type: 'success', text: `✔ Opening Gmail web composer to ${PORTFOLIO_PROFILE.email}` },
          { id: Math.random().toString(), type: 'output', text: `Inbox: ${PORTFOLIO_PROFILE.email}` }
        ];
      } else if (lower === 'contact' || lower.includes('mail')) {
        outputLines = [
          { id: Math.random().toString(), type: 'info', text: '=== TRANSMISSION ENDPOINTS ===' },
          { id: Math.random().toString(), type: 'output', text: `GMAIL:     ${PORTFOLIO_PROFILE.email} (Type "gmail" to compose)` },
          { id: Math.random().toString(), type: 'output', text: `WHATSAPP:  ${PORTFOLIO_PROFILE.whatsappNumber || PORTFOLIO_PROFILE.phone} (Type "whatsapp" to chat)` },
          { id: Math.random().toString(), type: 'output', text: `LOCATION:  ${PORTFOLIO_PROFILE.location}` },
          { id: Math.random().toString(), type: 'output', text: `LINKEDIN:  ${PORTFOLIO_PROFILE.linkedin}` },
          { id: Math.random().toString(), type: 'output', text: `INSTAGRAM: ${PORTFOLIO_PROFILE.instagram}` },
          { id: Math.random().toString(), type: 'output', text: `GITHUB:    ${PORTFOLIO_PROFILE.github}` }
        ];
      } else if (lower === 'insta' || lower === 'instagram') {
        window.open(PORTFOLIO_PROFILE.instagram, '_blank');
        outputLines = [
          { id: Math.random().toString(), type: 'info', text: '=== INSTAGRAM PROFILE ===' },
          { id: Math.random().toString(), type: 'success', text: `✔ Opening Instagram: ${PORTFOLIO_PROFILE.instagram}` }
        ];
      } else if (lower.startsWith('theme')) {
        if (lower.includes('cyber') || lower.includes('1')) {
          onThemeSwitch?.(0);
          outputLines = [{ id: Math.random().toString(), type: 'success', text: '✔ Theme switched to Cyber Security Mode.' }];
        } else if (lower.includes('dev') || lower.includes('2')) {
          onThemeSwitch?.(1);
          outputLines = [{ id: Math.random().toString(), type: 'success', text: '✔ Theme switched to Software Developer Mode.' }];
        } else if (lower.includes('data') || lower.includes('3')) {
          onThemeSwitch?.(2);
          outputLines = [{ id: Math.random().toString(), type: 'success', text: '✔ Theme switched to Data Analyst Mode.' }];
        } else {
          outputLines = [{ id: Math.random().toString(), type: 'error', text: 'Usage: theme <1|2|3> or theme <cyber|dev|data>' }];
        }
      } else if (lower.includes('npm run build') || lower.includes('build')) {
        outputLines = [
          { id: Math.random().toString(), type: 'output', text: '▶ Initializing build process...' },
          { id: Math.random().toString(), type: 'output', text: '✔ Loading environment configurations' },
          { id: Math.random().toString(), type: 'output', text: '✔ Resolving modules (128 packages)' },
          { id: Math.random().toString(), type: 'output', text: '✔ Tree-shaking & WebGL asset bundling' },
          { id: Math.random().toString(), type: 'output', text: 'Bundle Analysis: main.js (142 KB), vendor.js (312 KB), styles.css (28 KB)' },
          { id: Math.random().toString(), type: 'success', text: '✔ Build completed in 1.14s. Ready for deployment.' }
        ];
      } else if (lower.includes('npm run dev') || lower.includes('npm dev')) {
        outputLines = [
          { id: Math.random().toString(), type: 'output', text: 'VITE v5.4.1 ready in 240 ms' },
          { id: Math.random().toString(), type: 'success', text: '➜ Local:   http://localhost:3000/' },
          { id: Math.random().toString(), type: 'output', text: '➜ Network: http://192.168.1.42:3000/' }
        ];
      } else if (lower.startsWith('curl')) {
        outputLines = [
          { 
            id: Math.random().toString(), 
            type: 'json', 
            text: JSON.stringify({
              status: '200 OK',
              protocol: 'HTTPS/2',
              timestamp: new Date().toISOString(),
              engineer: PORTFOLIO_PROFILE.name,
              affiliation: 'Braiil Academy',
              verified_endpoints: [
                '/api/v1/auth',
                '/api/v1/projects',
                '/api/v1/certifications',
                '/api/v1/contact'
              ]
            }, null, 2)
          }
        ];
      } else if (lower.startsWith('sudo')) {
        outputLines = [
          { id: Math.random().toString(), type: 'error', text: 'Access Denied: Sathya Sai JS zero-trust defense policy strictly enforces root sandbox isolation.' }
        ];
      } else {
        outputLines = [
          { id: Math.random().toString(), type: 'error', text: `Command not found: "${trimmed}". Type "help" to list available commands.` }
        ];
      }

      setLines((prev) => [...prev, ...outputLines]);
      setIsExecuting(false);
      cyberAudio.playSuccess();
    }, 280);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx >= history.length) {
          setHistoryIdx(-1);
          setInputVal('');
        } else {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx] || '');
        }
      }
    }
  };

  const handleCopyLogs = () => {
    cyberAudio.playKeyClick();
    const allText = lines.map((l) => `${l.type === 'command' ? '> ' : ''}${l.text}`).join('\n');
    navigator.clipboard.writeText(allText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetConsole = () => {
    cyberAudio.playGlitch();
    setLines(INITIAL_LINES);
  };

  return (
    <div className="rounded-3xl bg-[#07090e] border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      {/* Sleek Terminal Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-black/60 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-sm" />
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-code font-bold text-white/90 tracking-wide">
              sathya@dev-cluster: ~/workspace (git:main)
            </span>
          </div>
        </div>

        {/* Console Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLogs}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-code text-white/70 hover:text-white transition-all cursor-pointer"
            title="Copy Console Output"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Logs</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetConsole}
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
            title="Reset Console"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Quick Run Command Chips Strip */}
      <div className="px-5 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-code text-white/40 tracking-wider uppercase whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-blue-400" /> QUICK SCRIPTS:
        </span>
        <div className="flex items-center gap-1.5">
          {PRESET_SCRIPTS.map((script) => (
            <button
              key={script.label}
              onClick={() => executeCommand(script.cmd)}
              className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-[11px] font-code text-white/75 hover:text-white transition-all whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <ChevronRight className="w-2.5 h-2.5 text-blue-400" />
              {script.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Screen Buffer */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="p-5 font-mono text-xs sm:text-sm leading-relaxed max-h-[360px] overflow-y-auto space-y-2 select-text cursor-text"
      >
        {lines.map((line) => {
          if (line.type === 'command') {
            return (
              <div key={line.id} className="flex items-start gap-2 text-white">
                <span className="text-emerald-400 font-bold select-none">❯</span>
                <span className="font-semibold">{line.text}</span>
              </div>
            );
          }
          if (line.type === 'success') {
            return (
              <div key={line.id} className="text-emerald-400 flex items-start gap-2 pl-3">
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.type === 'error') {
            return (
              <div key={line.id} className="text-rose-400 flex items-start gap-2 pl-3">
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.type === 'json') {
            return (
              <pre key={line.id} className="text-sky-300 bg-black/40 p-3 rounded-xl border border-white/[0.08] overflow-x-auto text-[11px] sm:text-xs leading-tight ml-3">
                {line.text}
              </pre>
            );
          }
          if (line.type === 'info') {
            return (
              <div key={line.id} className="text-blue-300 font-medium pl-3">
                {line.text}
              </div>
            );
          }
          return (
            <div key={line.id} className="text-white/75 pl-3">
              {line.text}
            </div>
          );
        })}

        {isExecuting && (
          <div className="flex items-center gap-2 text-blue-400 pl-3 animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>Processing command stream...</span>
          </div>
        )}

        {/* Live Input Prompt Line */}
        <div className="flex items-center gap-2 pt-2 text-white">
          <span className="text-emerald-400 font-bold select-none">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. help, projects, skills, npm run build)..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-white placeholder:text-white/30"
            autoFocus
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="px-5 py-2.5 bg-black/40 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-code text-white/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            NODE ONLINE
          </span>
          <span>LATENCY: 18ms</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>PORT: 3000</span>
          <span>ENCRYPTION: AES-256-GCM</span>
        </div>
      </div>
    </div>
  );
};
