'use client';

import { useVoiceSessionStore } from '@/lib/stores/voice-session-store';
import { ChevronLeft } from 'lucide-react';

const agentName = process.env.NEXT_PUBLIC_AGENT_NAME || 'Catherine';

interface WelcomeLandingProps {
  knowledgeBaseQuestions: string[];
}

export function WelcomeLanding({
  knowledgeBaseQuestions: _knowledgeBaseQuestions,
}: WelcomeLandingProps) {
  const connect = useVoiceSessionStore((s) => s.connect);
  const sessionState = useVoiceSessionStore((s) => s.sessionState);
  const isConnecting = sessionState === 'connecting';
  const isConnected = sessionState === 'connected';

  return (
    <div
      className="welcome-landing min-h-dvh relative overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url(/avatar/background-hero.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0c2127',
      }}
    >
      {/* Dark overlay for mobile readability */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/20 lg:bg-transparent z-0 pointer-events-none" />

      {/* Header bar */}
      <header className="relative z-10 h-16 md:h-20 bg-transparent border-b border-cyan-800 overflow-hidden shrink-0">
        <div className="h-full px-4 sm:px-6 md:px-10 flex items-center justify-between">
          <ThoughtworksLogo />
        </div>
      </header>

      {/* Back link */}
      <nav className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-[43px] pt-3">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 md:gap-3.5 text-white text-base md:text-lg font-bold font-body leading-7 hover:text-white/70 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
          Back
        </button>
      </nav>

      {/* Main content */}
      <main className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-[140px] flex-1">
        <h1
          className="animate-slide-in-left font-display text-[24px] sm:text-[28px] md:text-[34px] font-bold leading-[1.2] md:leading-[40.8px] text-white mt-6 sm:mt-8 lg:mt-[34px]"
          style={{ animationDelay: '0.15s' }}
        >
          Hello, I&rsquo;m {agentName},
          <br />
          your AI guide to AI/works&trade;
        </h1>

        <p
          className="animate-slide-in-left font-body text-base sm:text-lg md:text-[20px] font-normal leading-[1.6] md:leading-[32.5px] text-white max-w-[628px] mt-5 sm:mt-6 lg:mt-[44px]"
          style={{ animationDelay: '0.3s' }}
        >
          Ask me anything about the Thoughtworks Agentic Development
          Platform, its capabilities, its architecture, and how it fits your
          organization.
        </p>

        <div
          className="animate-slide-in-left mt-6 sm:mt-8 lg:mt-[43px]"
          style={{ animationDelay: '0.45s' }}
        >
          <button
            onClick={connect}
            disabled={isConnecting || isConnected}
            className="tw-cta-button disabled:opacity-60"
          >
            {isConnecting
              ? 'Connecting...'
              : isConnected
                ? 'Connected'
                : 'Start conversation'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-[144px] pb-4 md:pb-6 pt-4 flex flex-col gap-4 md:gap-6 shrink-0">
        <AIWorksLogo />

        <p className="font-body text-[10px] sm:text-xs font-normal leading-4 text-slate-50 max-w-[859px]">
          Our assistant helps you find content about AI/works. By asking a
          question, you acknowledge that we will process your data in accordance
          with our{' '}
          <span className="underline">Privacy Policy</span>, and consent to
          de-identified tracking of your conversation to help us improve the
          experience. Please close this page if you don&apos;t agree to these
          conditions. While we strive for accuracy, AI responses may be
          inaccurate.
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:w-[836px]">
            {[
              'Privacy Policy',
              'Modern slavery statement',
              'Code of conduct',
              'Integrity helpline',
              'Speakup Policy',
              'Sustainable procurement policy',
            ].map((label) => (
              <span
                key={label}
                className="font-body text-[10px] sm:text-xs font-normal leading-4 text-white"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex items-start gap-2.5">
            <span className="font-body text-[10px] sm:text-xs font-normal leading-4 text-white">
              Powered by Mobeus
            </span>
            <span className="font-body text-[10px] sm:text-xs font-normal leading-4 text-white">
              |
            </span>
            <span className="font-body text-[10px] sm:text-xs font-normal leading-4 text-white">
              &copy; 2025 Thoughtworks, Inc.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ThoughtworksLogo() {
  return (
    <img
      src="/thoughtworks_logo.svg"
      alt="Thoughtworks"
      className="h-6 sm:h-8 w-auto"
    />
  );
}

function AIWorksLogo() {
  return (
    <img
      src="/aiworks_logo.png"
      alt="AI/works — Agentic Development Platform"
      className="w-20 h-8 sm:w-24 sm:h-10 object-contain"
    />
  );
}
