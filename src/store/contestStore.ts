import { create } from 'zustand';
import { Contest } from '../types';
import { contests as initialContests } from '../data/seedData';

interface ContestStore {
  contests: Contest[];
  isLoading: boolean;
  updateContest: (index: number, updates: Partial<Contest>) => void;
  setIsLoading: (loading: boolean) => void;
  setContests: (contests: Contest[]) => void;
}

export const useContestStore = create<ContestStore>((set) => ({
  contests: initialContests,
  isLoading: true,
  updateContest: (index, updates) =>
    set((state) => ({
      contests: state.contests.map((contest, i) =>
        i === index ? { ...contest, ...updates } : contest
      ),
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setContests: (contests) => set({ contests }),
}));