'use client';

import { useState, useCallback } from 'react';
import { useVoiceSessionStore } from '@/lib/stores/voice-session-store';
import { ChevronLeft, ChevronRight, X, Mic } from 'lucide-react';

const agentName = process.env.NEXT_PUBLIC_AGENT_NAME || 'Catherine';

const platformNavItems = [
  { label: 'Developer experience', teleQuery: 'Show me about the developer experience' },
  { label: 'Reverse engineering', teleQuery: 'Show me reverse engineering capabilities' },
  { label: 'Requirement capture & Enrichment', teleQuery: 'Show me requirements capture and enrichment' },
  { label: 'Context Library', teleQuery: 'Show me about the context library' },
  { label: 'Capabilities & Industry Solution', teleQuery: 'Show me capabilities and industry solution library' },
  { label: 'Components Library', teleQuery: 'Show me about the components library' },
  { label: 'Dynamic Spec Development', teleQuery: 'Show me dynamic spec development' },
  { label: 'Spec to code Execution', teleQuery: 'Show me spec-to-code execution' },
  { label: 'Runtime Operations', teleQuery: 'Show me about runtime operations' },
];

interface WelcomeLandingProps {
  knowledgeBaseQuestions: string[];
}

const defaultCards = [
  {
    question: 'Two economies are colliding',
    subtext: 'SaaS and services economics are converging. The shift from purchasing hours to purchasing outcomes is redefining enterprise technology.',
    actionPhrase: 'Show me the collision',
  },
  {
    question: 'Why pay 3\u00D7 for the same thing?',
    subtext: 'Build for X. Maintain for X. Modernize for X. Then repeat forever. 70% of IT budgets are trapped in this maintenance cycle.',
    actionPhrase: 'Show me the reality',
  },
  {
    question: 'What if you never modernized again?',
    subtext: 'Self-modernizing systems that regenerate daily. Natural language requirements. Zero maintenance contracts. Modernization as a heartbeat.',
    actionPhrase: 'Show me the vision',
  },
  {
    question: 'Who built this platform?',
    subtext: '30 years of Thoughtworks engineering leadership. Agile Manifesto signers. Microservices inventors. 10,000+ engineers globally.',
    actionPhrase: 'Show me the platform',
  },
  {
    question: 'Ready to see if this fits?',
    subtext: '90 minutes with our architects. They review your systems, identify pilot candidates, and give you an honest assessment.',
    actionPhrase: 'Show me orientation',
  },
  {
    question: 'Book Your Orientation',
    subtext: 'Start your 3-3-3 journey today. 3 days to concept, 3 weeks to prototype, 3 months to production.',
    actionPhrase: 'I want to schedule an Orientation',
  },
];

export function WelcomeLanding({
  knowledgeBaseQuestions,
}: WelcomeLandingProps) {
  const connect = useVoiceSessionStore((s) => s.connect);
  const sessionState = useVoiceSessionStore((s) => s.sessionState);
  const avatarVideoTrack = useVoiceSessionStore((s) => s.avatarVideoTrack);
  const tellAgent = useVoiceSessionStore((s) => s.tellAgent);
  const sceneActive = useVoiceSessionStore((s) => s.sceneActive);
  const currentScene = useVoiceSessionStore((s) => s.currentScene);
  const isConnecting = sessionState === 'connecting';
  const isConnected = sessionState === 'connected';
  const hasVideo = isConnected && !!avatarVideoTrack;
  const hasScene = sceneActive || !!currentScene;

  const [showMicModal, setShowMicModal] = useState(false);
  const [page, setPage] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleStartClick = useCallback(() => {
    setShowMicModal(true);
  }, []);

  const handleAccept = useCallback(() => {
    setShowMicModal(false);
    connect();
  }, [connect]);

  const handleDecline = useCallback(() => {
    setShowMicModal(false);
  }, []);

  const connectedCards = defaultCards;

  const visibleCount = 3;
  const maxPage = Math.max(0, Math.ceil(connectedCards.length / visibleCount) - 1);
  const startIdx = page * visibleCount;
  const visibleCards = connectedCards.slice(startIdx, startIdx + visibleCount);

  const scrollPrev = useCallback(() => {
    setPage((p) => (p > 0 ? p - 1 : maxPage));
  }, [maxPage]);

  const scrollNext = useCallback(() => {
    setPage((p) => (p < maxPage ? p + 1 : 0));
  }, [maxPage]);

  // When a scene is active, hide completely
  if (hasScene) return null;

  // Connected with video: show "Ask me anything" layout
  if (hasVideo) {
    return (
      <div className="h-dvh relative flex flex-col overflow-hidden">
        {/* Spacer for fixed header */}
        <div className="h-16 md:h-20 shrink-0" />

        {/* Back link — always in the same position beneath the header */}
        <nav className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-[43px] pt-3 shrink-0">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 md:gap-3.5 text-white text-base md:text-lg font-bold font-body leading-7 hover:text-white/70 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
            Back
          </button>
        </nav>

        <div className="flex-1 flex relative min-h-0">
          {/* Collapsed sidebar tab */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden lg:flex fixed left-0 top-[140px] z-20 bg-gray-900/80 backdrop-blur-sm border border-cyan-700/30 border-l-0 rounded-r-md px-1.5 py-4 items-center cursor-pointer hover:bg-gray-800/90 transition-colors"
            >
              <span
                className="font-body text-xs font-semibold text-white tracking-wide"
                style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
              >
                Explore the platform &rsaquo;
              </span>
            </button>
          )}

          {/* Expanded sidebar */}
          <div
            className={`hidden lg:flex flex-col shrink-0 self-start mt-6 bg-gray-900/80 backdrop-blur-sm border-r border-cyan-700/30 rounded-r-md transition-all duration-300 ease-in-out overflow-hidden ${
              sidebarOpen ? 'w-[220px] px-5 py-6' : 'w-0 px-0 py-0'
            }`}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2 mb-5 text-white hover:text-white/70 transition-colors"
            >
              <span className="font-body text-base font-bold text-white leading-5 tracking-tight whitespace-nowrap">
                Explore the platform
              </span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <nav className="flex flex-col gap-1">
              {platformNavItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => tellAgent(item.teleQuery)}
                  className="text-left font-body text-sm font-normal text-white/80 hover:text-white hover:bg-white/5 px-2 py-2 rounded transition-colors leading-snug"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content wrapper */}
          <div
            className={`relative z-10 px-4 sm:px-6 md:px-10 flex flex-col transition-all duration-300 ease-in-out ${
              sidebarOpen ? 'lg:pl-8 lg:pr-[36%]' : 'lg:pl-[140px] lg:pr-[36%]'
            }`}
          >
            {/* Main content */}
            <main className="flex flex-col justify-start">
              <h1 className="font-display text-[24px] sm:text-[28px] md:text-[34px] font-bold leading-[1.2] md:leading-[40.8px] text-white mt-6 sm:mt-8 lg:mt-[34px]">
                Ask me anything about AI/works&trade;
              </h1>

              <p className="font-body text-base sm:text-lg md:text-[20px] font-normal leading-[1.6] md:leading-[32.5px] text-white mt-3 sm:mt-4">
                Or pick a question below to get started.
              </p>

              {/* Cards */}
              <div className="mt-6 sm:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {visibleCards.map((card, idx) => (
                    <button
                      key={`${page}-${idx}`}
                      onClick={() => tellAgent(card.actionPhrase)}
                      className="text-left p-5 sm:p-6 bg-sky-900/80 backdrop-blur-sm border border-cyan-700/30 hover:bg-sky-800/90 transition-colors duration-200 min-h-[100px] sm:min-h-[120px] flex flex-col gap-3 animate-fade-in"
                    >
                      <span className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                        {card.question}
                      </span>
                      {card.subtext && (
                        <span className="font-body text-xs sm:text-sm font-normal text-white/70 leading-relaxed">
                          {card.subtext}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Navigation arrows */}
                {connectedCards.length > visibleCount && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={scrollPrev}
                      className="w-8 h-8 bg-sky-900/80 border border-cyan-700/30 flex items-center justify-center hover:bg-sky-800 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={scrollNext}
                      className="w-8 h-8 bg-sky-900/80 border border-cyan-700/30 flex items-center justify-center hover:bg-sky-800 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </main>

          </div>
        </div>

        {/* Footer — outside the sidebar flex so it's unaffected by sidebar state */}
        <footer className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-[140px] pb-4 md:pb-6 pt-4 flex flex-col gap-4 md:gap-5 shrink-0">
          <AIWorksLogo />
          <p className="font-body text-[10px] sm:text-xs font-normal leading-4 text-slate-50 max-w-[628px]">
            Our assistant helps you find content about AI/works. By asking a
            question, you acknowledge that we will process your data in accordance
            with our{' '}
            <span className="underline">Privacy Policy</span>, and consent to
            de-identified tracking of your conversation to help us improve the
            experience. Please close this page if you don&apos;t agree to these
            conditions. While we strive for accuracy, AI responses may be
            inaccurate.
          </p>
        </footer>
      </div>
    );
  }

  // Pre-connection state
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
            onClick={handleStartClick}
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

      {/* Microphone consent modal */}
      {showMicModal && (
        <MicrophoneConsentModal
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </div>
  );
}

function MicrophoneConsentModal({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onDecline}
      />
      <div className="relative w-full max-w-md bg-white rounded-lg border-2 border-cyan-800 shadow-2xl animate-fade-in">
        <button
          onClick={onDecline}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center px-8 pt-8 pb-6">
          <div className="w-14 h-14 rounded-full border-2 border-gray-800 flex items-center justify-center mb-5">
            <Mic className="w-7 h-7 text-gray-800" />
          </div>
          <h2 className="font-body text-xl font-bold text-gray-900 mb-3">
            Allow microphone access
          </h2>
          <p className="font-body text-sm text-gray-600 text-center leading-relaxed mb-6">
            To enable the voice conversation, we need access to your
            microphone. Your audio data will be processed in real time to
            facilitate the interaction and will not be stored after the session
            ends.
          </p>
          <div className="flex items-center gap-4 mb-5">
            <button
              onClick={onDecline}
              className="font-body text-sm font-bold px-7 py-2.5 border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="font-body text-sm font-bold px-7 py-2.5 border-2 border-transparent bg-[#8B2131] text-white hover:bg-[#7a1c2b] transition-colors"
            >
              Accept
            </button>
          </div>
          <p className="font-body text-[11px] text-gray-400 text-center leading-4 max-w-xs">
            By accepting, you expressly consent to the use of your microphone
            data for this purpose. You can revoke this consent at any time by
            turning off the microphone.
          </p>
        </div>
      </div>
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
