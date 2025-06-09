
interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
}

const ScoreBoard = ({ playerScore, computerScore }: ScoreBoardProps) => {
  return (
    <div className="bg-white/20 rounded-2xl p-6 mb-8">
      <h2 className="text-3xl font-bold text-white text-center mb-6">🏆 Score Board 🏆</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-500/30 rounded-xl p-4">
          <div className="text-white/80 text-sm font-medium">YOU</div>
          <div className="text-3xl font-bold text-white">{playerScore}</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-2xl font-bold text-white">VS</div>
        </div>
        <div className="bg-red-500/30 rounded-xl p-4">
          <div className="text-white/80 text-sm font-medium">COMPUTER</div>
          <div className="text-3xl font-bold text-white">{computerScore}</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
