import { describe, expect, it } from "vitest";
import {
  levels,
  arenaQuestions,
  getShuffledQuestionsForLevel,
  getShuffledQuestionsForArena,
  shuffleArray,
} from "@/data/game-content";
import {
  createInitialProgress,
  isLevelPassed,
  recordLevelResult,
  scoreAnswer,
} from "@/data/game-progress";

describe("Game Content & Option Shuffling", () => {
  it("shuffles options while preserving all choices and correct answers", () => {
    const level = levels[0]!;
    const shuffled = getShuffledQuestionsForLevel(level);

    expect(shuffled.length).toBe(level.questions.length);

    shuffled.forEach((q, i) => {
      const original = level.questions[i]!;
      expect(q.id).toBe(original.id);
      expect(q.stem).toBe(original.stem);
      expect(q.correctAnswers).toEqual(original.correctAnswers);
      expect(q.options.sort()).toEqual([...original.options].sort());
    });
  });

  it("shuffles arena questions options while preserving choices", () => {
    const shuffled = getShuffledQuestionsForArena();
    expect(shuffled.length).toBe(arenaQuestions.length);

    shuffled.forEach((q, i) => {
      const original = arenaQuestions[i]!;
      expect(q.id).toBe(original.id);
      expect(q.correctAnswers).toEqual(original.correctAnswers);
      expect(q.options.sort()).toEqual([...original.options].sort());
    });
  });

  it("produces varying option distributions rather than all correct options at index 0", () => {
    // Over multiple samples, correct answer position should not be stuck at index 0
    const level = levels[0]!;
    let notAtIndexZeroCount = 0;
    const trials = 20;

    for (let t = 0; t < trials; t++) {
      const shuffled = getShuffledQuestionsForLevel(level);
      for (const q of shuffled) {
        if (q.options[0] !== q.correctAnswers[0]) {
          notAtIndexZeroCount++;
        }
      }
    }

    expect(notAtIndexZeroCount).toBeGreaterThan(0);
  });

  it("correctly scores answers irrespective of option positions", () => {
    const question = levels[0]!.questions[0]!;
    const correctAnswer = question.correctAnswers[0]!;
    expect(scoreAnswer([correctAnswer], question.correctAnswers, "single")).toBe(true);
    expect(scoreAnswer(["Wrong Answer"], question.correctAnswers, "single")).toBe(false);
  });
});

describe("Level Results & 80% Pass Rules", () => {
  it("determines pass status strictly based on 80% threshold", () => {
    expect(isLevelPassed(0, 5)).toBe(false); // 0%
    expect(isLevelPassed(1, 5)).toBe(false); // 20%
    expect(isLevelPassed(2, 5)).toBe(false); // 40%
    expect(isLevelPassed(3, 5)).toBe(false); // 60%
    expect(isLevelPassed(4, 5)).toBe(true);  // 80% (Pass mark)
    expect(isLevelPassed(5, 5)).toBe(true);  // 100%
  });

  it("does not unlock next level when score is less than 80%", () => {
    const progress = createInitialProgress();
    const result = recordLevelResult(progress, 0, 3); // 3/5 = 60% < 80%

    expect(result.levels[0]!.status).not.toBe("complete");
    expect(result.levels[0]!.attempts).toBe(1);
    expect(result.levels[0]!.bestScore).toBe(3);
    expect(result.levels[1]!.status).toBe("locked");
  });

  it("unlocks next level when score is 80% or higher", () => {
    const progress = createInitialProgress();
    const result = recordLevelResult(progress, 0, 4); // 4/5 = 80%

    expect(result.levels[0]!.status).toBe("complete");
    expect(result.levels[0]!.attempts).toBe(1);
    expect(result.levels[0]!.bestScore).toBe(4);
    expect(result.levels[1]!.status).toBe("available");
    expect(result.badges).toContain(1);
  });
});

