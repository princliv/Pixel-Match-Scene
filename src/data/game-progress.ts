import { arenaQuestions, levels } from "@/data/game-content";

export type LevelStatus = "locked" | "available" | "in_progress" | "complete";

export type SavedLevel = {
  status: LevelStatus;
  videoWatched: boolean;
  attempts: number;
  bestScore: number;
  completedAt?: string;
};

export type GameProgress = {
  currentLevel: number;
  levels: SavedLevel[];
  badges: number[];
  finalScore: number | null;
  commanderName: string;
  introSeen: boolean;
};

export const createInitialProgress = (): GameProgress => ({
  currentLevel: 1,
  levels: levels.map((_, index) => ({
    status: index === 0 ? "available" : "locked",
    videoWatched: false,
    attempts: 0,
    bestScore: 0,
  })),
  badges: [],
  finalScore: null,
  commanderName: "",
  introSeen: false,
});

export const ARENA_PASS_MARK = 4;

export function recordLevelResult(progress: GameProgress, levelIndex: number, score: number): GameProgress {
  if (levelIndex < 0 || levelIndex >= levels.length || score < 0 || score > (levels[levelIndex]?.questions.length ?? 0)) return progress;
  if (score < ARENA_PASS_MARK) {
    const failedLevels = progress.levels.map((saved, index) =>
      index === levelIndex ? { ...saved, attempts: saved.attempts + 1, bestScore: Math.max(saved.bestScore, score) } : saved,
    );
    return { ...progress, levels: failedLevels };
  }

  const nextLevels = progress.levels.map((saved, index) => {
    if (index === levelIndex) {
      return { ...saved, status: "complete" as const, attempts: saved.attempts + 1, bestScore: Math.max(saved.bestScore, score), completedAt: new Date().toISOString() };
    }
    if (index === levelIndex + 1 && saved.status === "locked") return { ...saved, status: "available" as const };
    return saved;
  });
  const badges = progress.badges.includes(levelIndex + 1) ? progress.badges : [...progress.badges, levelIndex + 1];
  return { ...progress, levels: nextLevels, badges, currentLevel: Math.min(levelIndex + 2, levels.length) };
}

export function canEnterArena(progress: GameProgress): boolean {
  return progress.levels.length === levels.length && progress.levels.every((level) => level.status === "complete") && progress.badges.length === levels.length;
}

export function scoreAnswer(selected: string[], correct: string[], type: "single" | "multi"): boolean {
  if (type === "single") return selected.length === 1 && selected[0] === correct[0];
  return selected.length === correct.length && correct.every((answer) => selected.includes(answer));
}

export function calculateArenaScore(answers: boolean[]): number {
  return Math.min(answers.filter(Boolean).length, arenaQuestions.length);
}