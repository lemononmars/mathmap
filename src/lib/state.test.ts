import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addPoints, userState } from './state.svelte';
import * as supabaseModule from './supabase';

vi.mock('./supabase', () => {
    const eqMock = vi.fn(() => Promise.resolve({ error: null }));
    const updateMock = vi.fn(() => ({ eq: eqMock }));
    const fromMock = vi.fn(() => ({ update: updateMock }));

    return {
        supabase: {
            from: fromMock
        }
    };
});

describe('addPoints', () => {
    beforeEach(() => {
        userState.points = 0;
        userState.user = { id: 'test-user' } as any;
        userState.isGuest = false;
        vi.clearAllMocks();
    });

    it('should add points and sync progress', async () => {
        addPoints(50);
        expect(userState.points).toBe(50);

        // Wait a tick for the async syncProgress to execute
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(supabaseModule.supabase!.from).toHaveBeenCalledWith('profiles');
        const fromResult = supabaseModule.supabase!.from('profiles') as any;
        expect(fromResult.update).toHaveBeenCalledWith(expect.objectContaining({
            points: 50
        }));
    });

    it('should add points but not sync if user is guest', async () => {
        userState.isGuest = true;
        addPoints(20);
        expect(userState.points).toBe(20);

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(supabaseModule.supabase!.from).not.toHaveBeenCalled();
    });

    it('should add points but not sync if user is null', async () => {
        userState.user = null;
        addPoints(30);
        expect(userState.points).toBe(30);

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(supabaseModule.supabase!.from).not.toHaveBeenCalled();
    });

    it('should allow adding negative points', async () => {
        userState.points = 100;
        addPoints(-20);
        expect(userState.points).toBe(80);

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(supabaseModule.supabase!.from).toHaveBeenCalledWith('profiles');
    });

    it('should handle multiple consecutive additions', async () => {
        addPoints(10);
        addPoints(20);
        expect(userState.points).toBe(30);

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(supabaseModule.supabase!.from).toHaveBeenCalledTimes(2);
    });
});
