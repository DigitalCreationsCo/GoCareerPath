import { test, expect, vi } from 'vitest';
import { sessionManager } from '@/lib/deepResearcher/sessionManager';

// Mock sessionManager
vi.mock('@/lib/deepResearcher/sessionManager', () => ({
  sessionManager: {
    createSession: vi.fn((userId) => Promise.resolve({ threadId: 'mock-thread-id', id: 'session-id', userId })),
    createRunnableConfig: vi.fn((threadId, userId) => ({ configurable: { thread_id: threadId, user_id: userId } }))
  }
}));

const userId = 'user-123';

test('session has threadId', async () => {
  const session = await sessionManager.createSession(userId);
  expect(session.threadId).toBeTruthy();
  expect(typeof session.threadId).toBe('string');
});

test('config preserves threadId', () => {
  const config = sessionManager.createRunnableConfig('test-123', userId);
  expect(config.configurable.thread_id).toBe('test-123');
});
