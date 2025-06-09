
import { Button } from "@/components/ui/button";

interface GameOverProps {
  level: number;
  playerWins: number;
  totalRounds: number;
  winsNeeded: number;
  onRestart: () => void;
}

const GameOver = ({ level, playerWins, totalRounds, winsNeeded, onRestart }: GameOverProps) => {
  return (
    <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-8 mb-6 text-center animate-fade-in border border-red-400/30">
      <div className="text-6xl mb-4 animate-scale-in">😅</div>
      <h2 className="text-4xl font-bold text-red-400 mb-4">
        Level {level} Failed!
      </h2>
      <p className="text-2xl text-white mb-2">
        You won {playerWins} out of {totalRounds} rounds
      </p>
      <p className="text-xl text-white/90 mb-6">
        You needed {winsNeeded} wins to advance. Don't give up! 💪
      </p>
      <Button
        onClick={onRestart}
        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transform transition-all duration-200 hover:scale-105 text-lg"
      >
        Try Again from Level 1! 🔄
      </Button>
    </div>
  );
};

export default GameOver;
