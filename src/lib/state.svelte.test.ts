import { describe, it, expect, vi, beforeEach } from 'vitest';
import { completeLesson, userState } from './state.svelte';
import { supabase } from './supabase';

// Mock supabase
vi.mock('./supabase', () => {
    const updateFn = vi.fn().mockReturnValue(Promise.resolve({ error: null }));
    const eqFn = vi.fn().mockReturnValue(Promise.resolve({ error: null }));
    const updateChain = { eq: eqFn };
    updateFn.mockReturnValue(updateChain);

    return {
        supabase: {
            from: vi.fn(() => ({
                update: updateFn
            }))
        }
    };
});

describe('completeLesson', () => {
    beforeEach(() => {
        userState.completedLessons = [];
        userState.user = { id: 'test-user-id' } as any;
        userState.isGuest = false;
        vi.clearAllMocks();
    });

    it('adds lessonId to completedLessons and syncs progress if not already completed', () => {
        completeLesson('lesson-1');

        expect(userState.completedLessons).toContain('lesson-1');
        expect(supabase.from).toHaveBeenCalledWith('profiles');
    });

    it('does not add lessonId or sync progress if already completed', () => {
        userState.completedLessons = ['lesson-1'];

        completeLesson('lesson-1');

        expect(userState.completedLessons).toEqual(['lesson-1']);
        expect(supabase.from).not.toHaveBeenCalled();
    });
});
