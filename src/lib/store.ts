import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  totalScore: number;
  completedMissions: string[];
  badges: string[];
}

export interface MissionResult {
  missionKey: string;
  score: number;
  detectionTime: number;
  dataLoss: number;
  toolsUsed: string[];
  timestamp: number;
}

interface AppState {
  user: User | null;
  currentMission: string | null;
  missionResults: MissionResult[];
  setUser: (user: User) => void;
  setCurrentMission: (missionKey: string | null) => void;
  addMissionResult: (result: MissionResult) => void;
  updateUserProgress: (xp: number, missionKey: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      currentMission: null,
      missionResults: [],
      
      setUser: (user) => set({ user }),
      
      setCurrentMission: (missionKey) => set({ currentMission: missionKey }),
      
      addMissionResult: (result) =>
        set((state) => ({
          missionResults: [...state.missionResults, result],
        })),
      
      updateUserProgress: (xp, missionKey) =>
        set((state) => {
          if (!state.user) return state;
          
          const newXp = state.user.xp + xp;
          const newLevel = Math.floor(newXp / 200) + 1;
          const completedMissions = state.user.completedMissions.includes(missionKey)
            ? state.user.completedMissions
            : [...state.user.completedMissions, missionKey];
          
          return {
            user: {
              ...state.user,
              xp: newXp,
              level: newLevel,
              completedMissions,
            },
          };
        }),
    }),
    {
      name: 'vncrypt-storage',
    }
  )
);
