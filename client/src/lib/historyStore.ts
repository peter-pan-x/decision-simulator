import type { OptionAnalysis } from '@/components/AnalysisResults';
import type { DecisionInput } from '@/components/DecisionInput';
import type { CompleteAnalysis, DebateLog } from '@/lib/aiAgents/types';

export interface StoredAnalysis {
  id: string;
  question: string;
  timestamp: number;
  recommendation: string;
  confidence: number;
  input: DecisionInput;
  results: OptionAnalysis[];
  completeAnalysis: CompleteAnalysis;
  debateLogs: DebateLog[];
}

const HISTORY_KEY = 'decision_history';

function readRawHistory(): StoredAnalysis[] {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch (error) {
    console.error('Failed to parse decision history:', error);
    return [];
  }
}

function writeHistory(items: StoredAnalysis[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

export function listAnalyses(): StoredAnalysis[] {
  return readRawHistory().sort((a, b) => b.timestamp - a.timestamp);
}

export function getAnalysis(id: string): StoredAnalysis | undefined {
  return readRawHistory().find((item) => item.id === id);
}

export function saveAnalysis(analysis: Omit<StoredAnalysis, 'id' | 'timestamp'>) {
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 11);

  const item: StoredAnalysis = {
    ...analysis,
    id,
    timestamp: Date.now(),
    confidence: Math.round(
      Number(analysis.confidence) <= 1 ? Number(analysis.confidence) * 100 : Number(analysis.confidence)
    ),
  };

  writeHistory([item, ...readRawHistory()].slice(0, 50));
  return item;
}

export function deleteAnalysis(id: string) {
  const nextHistory = readRawHistory().filter((item) => item.id !== id);
  writeHistory(nextHistory);
  return nextHistory;
}
