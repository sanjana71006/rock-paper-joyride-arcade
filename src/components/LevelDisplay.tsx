
interface LevelDisplayProps {
  currentLevel: number;
  roundsInLevel: number;
  currentRound: number;
  playerWins: number;
  winsNeeded: number;
}

const LevelDisplay = ({ 
  currentLevel, 
  roundsInLevel, 
  currentRound, 
  playerWins, 
  winsNeeded 
}: LevelDisplayProps) => {
  const progressPercentage = (currentRound / roundsInLevel) * 100;
  
  return (
    <div className="bg-white/20 rounded-2xl p-6 mb-6">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-white mb-2">
          🎯 Level {currentLevel}
        </h2>
        <p className="text-white/90 text-lg">
          Round {currentRound} of {roundsInLevel}
        </p>
      </div>
      
      <div className="bg-white/20 rounded-full h-4 mb-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-white/90">
        <span>Wins needed: {winsNeeded}</span>
        <span>Current wins: {playerWins}</span>
      </div>
    </div>
  );
};

export default LevelDisplay;
