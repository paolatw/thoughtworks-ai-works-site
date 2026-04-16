'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Send, ThumbsUp, ThumbsDown, User } from 'lucide-react';
import { useVoiceSessionStore } from '@/lib/stores/voice-session-store';
import { assets } from '@/assets';
import { ToolCallIndicator } from './ToolCallIndicator';

const SLEEP_TIMEOUT = 5000;

export function ChatPanel() {
  const sessionState = useVoiceSessionStore((s) => s.sessionState);
  const transcripts = useVoiceSessionStore((s) => s.transcripts);
  const toolActivity = useVoiceSessionStore((s) => s.toolActivity);
  const isChatPanelOpen = useVoiceSessionStore((s) => s.isChatPanelOpen);
  const sendTextMessage = useVoiceSessionStore((s) => s.sendTextMessage);
  const currentAgentName = useVoiceSessionStore((s) => s.currentAgentName);
  const avatarThumbnailUrl = useVoiceSessionStore((s) => s.avatarThumbnailUrl);

  const [textInput, setTextInput] = useState('');
  const [isSleeping, setIsSleeping] = useState(false);
  const showToolCalls = true;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isConnected = sessionState === 'connected';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts, toolActivity]);

  const resetSleep = useCallback(() => {
    setIsSleeping(false);
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    sleepTimerRef.current = setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        setIsSleeping(true);
      }
    }, SLEEP_TIMEOUT);
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !isChatPanelOpen) return;

    resetSleep();
    panel.addEventListener('mousemove', resetSleep);
    panel.addEventListener('mousedown', resetSleep);

    return () => {
      panel.removeEventListener('mousemove', resetSleep);
      panel.removeEventListener('mousedown', resetSleep);
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    };
  }, [isChatPanelOpen, resetSleep]);

  useEffect(() => {
    if (isSleeping) {
      document.body.classList.add('chat-sleeping');
    } else {
      document.body.classList.remove('chat-sleeping');
    }
    return () => {
      document.body.classList.remove('chat-sleeping');
    };
  }, [isSleeping]);

  const handleSend = async () => {
    const message = textInput.trim();
    if (!message) return;
    setTextInput('');
    await sendTextMessage(message);
  };

  const allEntries = [...transcripts, ...(showToolCalls ? toolActivity : [])];
  allEntries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  const visibleTranscripts = allEntries.filter((t) => {
    if (t.participant === 'tool') return true;
    return t.isFinal || t.isAgent;
  });

  const agentAvatar = avatarThumbnailUrl || assets.avatarProfile;

  return (
    <div
      ref={panelRef}
      className={`fixed telelabor-panel top-16 md:top-20 h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] z-50 flex flex-col
        border-l border-cyan-800/50
        bg-gray-950/85 backdrop-blur-md
        transition-[right,opacity] duration-500 ease-out
        max-xl:left-0 max-xl:right-0 max-xl:w-full
      `}
      style={{
        width: 'var(--glass-chat-width)',
        maxWidth: '100vw',
        right: isChatPanelOpen ? '0' : 'calc(-1 * var(--glass-chat-width))',
        opacity: isChatPanelOpen ? 1 : 0,
        pointerEvents: isChatPanelOpen ? 'auto' : 'none',
      }}
    >
      {/* Chat messages area */}
      <div className="chat-messages-container flex-1 px-4 pt-4 pb-4 flex flex-col gap-5 overflow-y-auto">
        {transcripts.length === 0 && isConnected && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm font-body text-white/30">
              Conversation will appear here...
            </p>
          </div>
        )}

        {visibleTranscripts.map((t, i) => {
          if (t.participant === 'tool') {
            let toolParams: Record<string, unknown> = {};
            let source: string | undefined;
            try {
              const parsed = JSON.parse(t.text);
              source = parsed._source;
              const { _source: _, ...rest } = parsed;
              toolParams = rest;
            } catch {
              toolParams = { raw: t.text };
            }
            return (
              <ToolCallIndicator
                key={t.id}
                toolName={t.participantName}
                parameters={toolParams}
                timestamp={t.timestamp}
                source={source as 'speak-llm' | 'show-llm' | undefined}
              />
            );
          }

          if (t.participant === 'agent') {
            return (
              <div
                key={t.id}
                className="animate-chat-bubble-enter flex flex-col items-start gap-2"
                style={{ animationDelay: `${Math.min(i * 0.05, 0.3)}s` }}
              >
                {/* Agent avatar centered above bubble */}
                <div className="flex justify-center w-full mb-1">
                  <div className="chat-avatar w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-700/40">
                    <img
                      src={agentAvatar}
                      alt={currentAgentName || 'Agent'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Agent bubble */}
                <div
                  className="chat-message-bubble w-full rounded-xl px-4 py-3 text-sm leading-relaxed font-body"
                  style={{
                    background: 'rgba(12, 33, 39, 0.85)',
                    color: '#e0e0e0',
                  }}
                >
                  {t.text}
                </div>

                {/* Thumbs feedback */}
                <div className="flex items-center gap-3 pl-1">
                  <button
                    className="text-white/30 hover:text-white/70 transition-colors"
                    title="Helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    className="text-white/30 hover:text-white/70 transition-colors"
                    title="Not helpful"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          }

          // User message
          return (
            <div
              key={t.id}
              className="animate-chat-bubble-enter flex items-start gap-2.5 justify-end"
              style={{ animationDelay: `${Math.min(i * 0.05, 0.3)}s` }}
            >
              <div
                className="chat-message-bubble max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed font-body text-right"
                style={{
                  background: 'rgba(12, 33, 39, 0.65)',
                  color: '#e0e0e0',
                }}
              >
                {t.text}
              </div>
              <div className="w-6 h-6 rounded-full bg-sky-900/80 flex items-center justify-center shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-white/70" />
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Text input area */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        <div className="flex items-center gap-2 bg-gray-900/80 border border-cyan-700/30 rounded-lg px-3 sm:px-4 py-2.5">
          <input
            ref={inputRef}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            onFocus={resetSleep}
            placeholder="Speak or Type your questions...."
            className="flex-1 min-w-0 bg-transparent text-white text-sm placeholder:text-white/40 focus:outline-none font-body"
            disabled={!isConnected}
          />
          <button
            onClick={handleSend}
            disabled={!isConnected || textInput.trim().length === 0}
            className="w-8 h-8 rounded-md bg-[#E84855] flex items-center justify-center text-white hover:bg-[#d63d4a] transition-colors disabled:opacity-30 disabled:hover:bg-[#E84855] shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
