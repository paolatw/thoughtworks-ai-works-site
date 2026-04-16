'use client';

import {
  Mic,
  MicOff,
  Volume2,
  VolumeOff,
  X,
} from 'lucide-react';
import { useVoiceSessionStore } from '@/lib/stores/voice-session-store';
import { playUISound } from '@/utils/soundGenerator';

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 1.5C5.3 1.5 1.5 4.86 1.5 9c0 1.76.7 3.37 1.88 4.64L2 17.5l4.12-1.37C7.28 16.7 8.6 17 10 17c4.7 0 8.5-3.36 8.5-7.5S14.7 1.5 10 1.5Z"
        fill="currentColor"
        opacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="7" y="7" width="1.5" height="6" rx="0.75" fill="currentColor" />
      <rect x="9.5" y="5.5" width="1.5" height="9" rx="0.75" fill="currentColor" />
      <rect x="12" y="7" width="1.5" height="6" rx="0.75" fill="currentColor" />
    </svg>
  );
}

export function ControlBar() {
  const sessionState = useVoiceSessionStore((s) => s.sessionState);
  const isMuted = useVoiceSessionStore((s) => s.isMuted);
  const isVolumeMuted = useVoiceSessionStore((s) => s.isVolumeMuted);
  const isChatPanelOpen = useVoiceSessionStore((s) => s.isChatPanelOpen);
  const disconnect = useVoiceSessionStore((s) => s.disconnect);
  const toggleMute = useVoiceSessionStore((s) => s.toggleMute);
  const toggleVolume = useVoiceSessionStore((s) => s.toggleVolume);
  const toggleChatPanel = useVoiceSessionStore((s) => s.toggleChatPanel);

  const isConnected = sessionState === 'connected';

  const handleToggleChat = () => {
    playUISound(isChatPanelOpen ? 'off' : 'on', 'chat');
    toggleChatPanel();
  };

  const handleToggleMute = () => {
    playUISound(isMuted ? 'on' : 'off', 'mic');
    toggleMute();
  };

  const handleToggleVolume = () => {
    playUISound(isVolumeMuted ? 'on' : 'off', 'mic');
    toggleVolume();
  };

  const handleDisconnect = () => {
    playUISound('off', 'avatar');
    disconnect();
  };

  const zIndex = isChatPanelOpen ? 'z-[100]' : 'z-[60]';

  if (isConnected) {
    return (
      <header
        className={`fixed top-0 left-0 right-0 ${zIndex} h-16 md:h-20 bg-transparent border-b border-cyan-800 overflow-hidden`}
      >
        <div className="h-full px-4 sm:px-6 md:px-10 flex items-center justify-between">
          <img
            src="/thoughtworks_logo.svg"
            alt="Thoughtworks"
            className="h-6 sm:h-8 w-auto"
          />

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mic Active status label */}
            <div className="h-8 px-3 sm:px-4 py-2 outline outline-1 outline-white/0 backdrop-blur-sm flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isMuted ? 'bg-gray-400' : 'bg-red-400'
                }`}
              />
              <span className="hidden sm:inline font-body text-xs font-normal text-white leading-4">
                {isMuted ? 'Mic Muted' : 'Mic Active'}
              </span>
            </div>

            {/* Volume / Sound toggle */}
            <button
              onClick={handleToggleVolume}
              className={`w-8 h-8 bg-sky-900 outline outline-1 outline-white/0 backdrop-blur-sm flex items-center justify-center hover:bg-sky-800 transition-colors ${
                isVolumeMuted ? 'opacity-50' : ''
              }`}
              title={isVolumeMuted ? 'Unmute volume' : 'Mute volume'}
            >
              {isVolumeMuted ? (
                <VolumeOff className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>

            {/* Mic toggle */}
            <button
              onClick={handleToggleMute}
              className={`w-8 h-8 bg-sky-900 outline outline-1 outline-white/0 backdrop-blur-sm flex items-center justify-center hover:bg-sky-800 transition-colors ${
                isMuted ? 'opacity-50' : ''
              }`}
              title={isMuted ? 'Unmute mic' : 'Mute mic'}
            >
              {isMuted ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-white" />
              )}
            </button>

            {/* Chat toggle */}
            <button
              onClick={handleToggleChat}
              className={`w-8 h-8 bg-sky-900 outline outline-1 outline-white/0 backdrop-blur-sm flex items-center justify-center transition-colors ${
                isChatPanelOpen ? 'bg-sky-700' : 'hover:bg-sky-800'
              }`}
              title={isChatPanelOpen ? 'Close chat' : 'Open chat'}
            >
              <ChatBubbleIcon className="w-5 h-5 text-white" />
            </button>

            {/* End Conversation */}
            <button
              onClick={handleDisconnect}
              className="h-8 px-4 sm:px-5 py-2.5 bg-sky-900 outline outline-1 outline-white/0 backdrop-blur-sm flex items-center gap-2 hover:bg-red-700 transition-colors"
              title="End Conversation"
            >
              <X className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline font-body text-sm font-normal text-white leading-5">
                End Conversation
              </span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return null;
}
