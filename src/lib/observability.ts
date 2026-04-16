/**
 * Observability Mode — browser-based debug logging for voice agent interactions.
 *
 * Enable:  window.observability = true
 * Disable: window.observability = false
 *
 * Zero overhead when disabled — every log function checks the flag before
 * doing any work (no string formatting, no console calls, no serialization).
 */

declare global {
  interface Window {
    observability: boolean;
  }
}

if (typeof window !== 'undefined') {
  window.observability = true;
}

function isEnabled(): boolean {
  return typeof window !== 'undefined' && window.observability === true;
}

const COLORS = {
  siteToAgent: '#2196F3',
  agentToSite: '#9C27B0',
  dataChannel: '#FF9800',
  stateChange: '#4CAF50',
  speech:      '#E91E63',
  lifecycle:   '#9E9E9E',
  siteFunction:'#FF5722',
} as const;

function badge(label: string, color: string): string[] {
  return [
    `%c ${label} `,
    `background:${color};color:#fff;border-radius:3px;font-weight:bold;padding:1px 6px;`,
  ];
}

function ts(): string {
  return new Date().toISOString().slice(11, 23);
}

// ── Blue — Site to Agent ────────────────────────────────────────────────────

export function logSiteToAgent(
  method: string,
  payload?: unknown,
  response?: unknown,
  error?: unknown,
) {
  if (!isEnabled()) return;
  const [fmt, style] = badge('SITE → AGENT', COLORS.siteToAgent);
  console.groupCollapsed(`${fmt} ${method}  [${ts()}]`, style);
  if (payload !== undefined) console.log('Payload:', payload);
  if (response !== undefined) console.log('Response:', response);
  if (error !== undefined) console.error('Error:', error);
  console.groupEnd();
}

// ── Purple — Agent to Site ──────────────────────────────────────────────────

export function logAgentToSite(
  method: string,
  payload?: unknown,
  response?: unknown,
  error?: unknown,
) {
  if (!isEnabled()) return;
  const [fmt, style] = badge('AGENT → SITE', COLORS.agentToSite);
  console.groupCollapsed(`${fmt} ${method}  [${ts()}]`, style);
  if (payload !== undefined) console.log('Payload:', payload);
  if (response !== undefined) console.log('Response:', response);
  if (error !== undefined) console.error('Error:', error);
  console.groupEnd();
}

// ── Amber — Data Channel ────────────────────────────────────────────────────

export function logDataChannel(
  topic: string,
  data?: unknown,
  direction: 'inbound' | 'outbound' = 'inbound',
) {
  if (!isEnabled()) return;
  const arrow = direction === 'outbound' ? '↑' : '↓';
  const [fmt, style] = badge(`DATA ${arrow}`, COLORS.dataChannel);
  console.groupCollapsed(`${fmt} ${topic}  [${ts()}]`, style);
  if (data !== undefined) console.log('Data:', data);
  console.groupEnd();
}

// ── Green — State Changes ───────────────────────────────────────────────────

export function logStateChange(
  field: string,
  from: unknown,
  to: unknown,
) {
  if (!isEnabled()) return;
  const [fmt, style] = badge('STATE', COLORS.stateChange);
  console.groupCollapsed(`${fmt} ${field}: ${String(from)} → ${String(to)}  [${ts()}]`, style);
  console.log('From:', from);
  console.log('To:', to);
  console.groupEnd();
}

// ── Pink — Speech / Transcription ───────────────────────────────────────────

export function logSpeech(
  speaker: 'user' | 'agent',
  text: string,
  isFinal: boolean,
  meta?: { id?: string; participantName?: string },
) {
  if (!isEnabled()) return;
  const label = speaker === 'user' ? 'USER' : 'AGENT';
  const marker = isFinal ? 'final' : 'interim';
  const [fmt, style] = badge(`SPEECH ${label}`, COLORS.speech);
  console.groupCollapsed(`${fmt} [${marker}] "${text.slice(0, 80)}${text.length > 80 ? '…' : ''}"  [${ts()}]`, style);
  console.log('Text:', text);
  console.log('Final:', isFinal);
  if (meta) console.log('Meta:', meta);
  console.groupEnd();
}

// ── Gray — Lifecycle ────────────────────────────────────────────────────────

export function logLifecycle(
  event: string,
  detail?: unknown,
) {
  if (!isEnabled()) return;
  const [fmt, style] = badge('LIFECYCLE', COLORS.lifecycle);
  console.groupCollapsed(`${fmt} ${event}  [${ts()}]`, style);
  if (detail !== undefined) console.log('Detail:', detail);
  console.groupEnd();
}

// ── Orange — Site Functions ─────────────────────────────────────────────────

export function logSiteFunction(
  name: string,
  args?: unknown,
  result?: unknown,
  error?: unknown,
) {
  if (!isEnabled()) return;
  const [fmt, style] = badge('SITE FN', COLORS.siteFunction);
  console.groupCollapsed(`${fmt} ${name}  [${ts()}]`, style);
  if (args !== undefined) console.log('Args:', args);
  if (result !== undefined) console.log('Result:', result);
  if (error !== undefined) console.error('Error:', error);
  console.groupEnd();
}
