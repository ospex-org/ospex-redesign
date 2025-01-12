import { contests as initialContests } from '../data/seedData';
import { Contest } from '../types';

let contests = [...initialContests];

export const fetchContests = async (): Promise<Contest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(contests), 500);
  });
};

export const updateContest = async (index: number, updatedContest: Partial<Contest>): Promise<Contest> => {
  return new Promise((resolve) => {
    contests[index] = { ...contests[index], ...updatedContest };
    setTimeout(() => resolve(contests[index]), 100);
  });
};