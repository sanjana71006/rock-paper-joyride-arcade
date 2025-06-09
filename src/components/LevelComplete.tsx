
import { Button } from "@/components/ui/button";

interface LevelCompleteProps {
  level: number;
  playerWins: number;
  totalRounds: number;
  onNextLevel: () => void;
}

const LevelComplete = ({ level, playerWins, totalRounds, onNextLevel }: LevelCompleteProps) => {
  return (
    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 mb-6 text-center animate-fade-in border border-green-400/30">
      <div className="text-6xl mb-4 animate-scale-in">🎉</div>
      <h2 className="text-4xl font-bold text-green-400 mb-4">
        Level {level} Complete!
      </h2>
      <p className="text-2xl text-white mb-4">
        You won {playerWins} out of {totalRounds} rounds!
      </p>
      <p className="text-xl text-white/90 mb-6">
        Great job! Next Level unlocked! 🔓
      </p>
      <Button
        onClick={onNextLevel}
        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transform transition-all duration-200 hover:scale-105 text-lg"
      >
        Continue to Level {level + 1}! 🚀
      </Button>
    </div>
  );
};

export default LevelComplete;
