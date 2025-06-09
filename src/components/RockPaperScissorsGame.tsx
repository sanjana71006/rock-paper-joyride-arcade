
import { useState } from "react";
import ChoiceButton from "./ChoiceButton";
import ScoreBoard from "./ScoreBoard";
import GameResult from "./GameResult";
import LevelDisplay from "./LevelDisplay";
import LevelComplete from "./LevelComplete";
import GameOver from "./GameOver";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type Choice = "rock" | "paper" | "scissors";
type GameOutcome = "win" | "lose" | "draw";
type GameState = "playing" | "level-complete" | "game-over";

const choices: { id: Choice; emoji: string; name: string }[] = [
  { id: "rock", emoji: "🪨", name: "Rock" },
  { id: "paper", emoji: "📄", name: "Paper" },
  { id: "scissors", emoji: "✂️", name: "Scissors" },
];

const getWinner = (player: Choice, computer: Choice): GameOutcome => {
  if (player === computer) return "draw";
  
  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  
  return winConditions[player] === computer ? "win" : "lose";
};

const getComputerChoice = (): Choice => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex].id;
};

const RockPaperScissorsGame = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameOutcome | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  // Level system state
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [levelPlayerWins, setLevelPlayerWins] = useState(0);
  const [gameState, setGameState] = useState<GameState>("playing");

  const getRoundsInLevel = (level: number) => level * 3;
  const getWinsNeeded = (level: number) => Math.ceil(getRoundsInLevel(level) / 2);

  const handleChoice = (choice: Choice) => {
    if (isPlaying || gameState !== "playing") return;
    
    setIsPlaying(true);
    setShowResult(false);
    setPlayerChoice(choice);
    
    setTimeout(() => {
      const compChoice = getComputerChoice();
      setComputerChoice(compChoice);
      
      setTimeout(() => {
        const gameResult = getWinner(choice, compChoice);
        setResult(gameResult);
        setShowResult(true);
        
        if (gameResult === "win") {
          setPlayerScore(prev => prev + 1);
          setLevelPlayerWins(prev => prev + 1);
        } else if (gameResult === "lose") {
          setComputerScore(prev => prev + 1);
        }
        
        setIsPlaying(false);
      }, 500);
    }, 1000);
  };

  const nextRound = () => {
    const roundsInLevel = getRoundsInLevel(currentLevel);
    
    if (currentRound >= roundsInLevel) {
      // Level complete - check if player won enough rounds
      const winsNeeded = getWinsNeeded(currentLevel);
      if (levelPlayerWins >= winsNeeded) {
        setGameState("level-complete");
      } else {
        setGameState("game-over");
      }
    } else {
      // Continue to next round
      setCurrentRound(prev => prev + 1);
    }
    
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowResult(false);
    setIsPlaying(false);
  };

  const nextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    setCurrentRound(1);
    setLevelPlayerWins(0);
    setGameState("playing");
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowResult(false);
    setIsPlaying(false);
  };

  const restartGame = () => {
    setCurrentLevel(1);
    setCurrentRound(1);
    setLevelPlayerWins(0);
    setGameState("playing");
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowResult(false);
    setPlayerScore(0);
    setComputerScore(0);
    setIsPlaying(false);
  };

  const resetGame = () => {
    restartGame();
  };

  if (gameState === "level-complete") {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
        <ScoreBoard playerScore={playerScore} computerScore={computerScore} />
        <LevelComplete
          level={currentLevel}
          playerWins={levelPlayerWins}
          totalRounds={getRoundsInLevel(currentLevel)}
          onNextLevel={nextLevel}
        />
      </div>
    );
  }

  if (gameState === "game-over") {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
        <ScoreBoard playerScore={playerScore} computerScore={computerScore} />
        <GameOver
          level={currentLevel}
          playerWins={levelPlayerWins}
          totalRounds={getRoundsInLevel(currentLevel)}
          winsNeeded={getWinsNeeded(currentLevel)}
          onRestart={restartGame}
        />
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
      <ScoreBoard playerScore={playerScore} computerScore={computerScore} />
      
      <LevelDisplay
        currentLevel={currentLevel}
        roundsInLevel={getRoundsInLevel(currentLevel)}
        currentRound={currentRound}
        playerWins={levelPlayerWins}
        winsNeeded={getWinsNeeded(currentLevel)}
      />
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Player Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">You 👤</h3>
          <div className="bg-white/20 rounded-2xl p-6 min-h-[200px] flex items-center justify-center">
            {playerChoice ? (
              <div className="text-8xl animate-scale-in">
                {choices.find(c => c.id === playerChoice)?.emoji}
              </div>
            ) : (
              <div className="text-white/60 text-lg">Make your choice!</div>
            )}
          </div>
        </div>

        {/* Computer Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Computer 🤖</h3>
          <div className="bg-white/20 rounded-2xl p-6 min-h-[200px] flex items-center justify-center">
            {isPlaying && !computerChoice ? (
              <div className="text-6xl animate-pulse">🤔</div>
            ) : computerChoice ? (
              <div className="text-8xl animate-scale-in">
                {choices.find(c => c.id === computerChoice)?.emoji}
              </div>
            ) : (
              <div className="text-white/60 text-lg">Waiting...</div>
            )}
          </div>
        </div>
      </div>

      {/* Game Result */}
      {showResult && result && (
        <GameResult 
          result={result} 
          playerChoice={playerChoice!}
          computerChoice={computerChoice!}
          onPlayAgain={nextRound}
        />
      )}

      {/* Choice Buttons */}
      {!isPlaying && !showResult && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {choices.map((choice) => (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              onClick={() => handleChoice(choice.id)}
              disabled={isPlaying}
            />
          ))}
        </div>
      )}

      {/* Reset Button */}
      <div className="text-center">
        <Button
          onClick={resetGame}
          variant="outline"
          className="bg-white/20 hover:bg-white/30 border-white/30 text-white hover:text-white"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Game
        </Button>
      </div>
    </div>
  );
};

export default RockPaperScissorsGame;
