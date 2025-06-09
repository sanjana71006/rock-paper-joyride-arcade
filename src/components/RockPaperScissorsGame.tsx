
import { useState } from "react";
import ChoiceButton from "./ChoiceButton";
import ScoreBoard from "./ScoreBoard";
import GameResult from "./GameResult";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type Choice = "rock" | "paper" | "scissors";
type GameResult = "win" | "lose" | "draw";

const choices: { id: Choice; emoji: string; name: string }[] = [
  { id: "rock", emoji: "🪨", name: "Rock" },
  { id: "paper", emoji: "📄", name: "Paper" },
  { id: "scissors", emoji: "✂️", name: "Scissors" },
];

const getWinner = (player: Choice, computer: Choice): GameResult => {
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
  const [result, setResult] = useState<GameResult | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleChoice = (choice: Choice) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setShowResult(false);
    setPlayerChoice(choice);
    
    // Add suspense with computer "thinking"
    setTimeout(() => {
      const compChoice = getComputerChoice();
      setComputerChoice(compChoice);
      
      setTimeout(() => {
        const gameResult = getWinner(choice, compChoice);
        setResult(gameResult);
        setShowResult(true);
        
        if (gameResult === "win") {
          setPlayerScore(prev => prev + 1);
        } else if (gameResult === "lose") {
          setComputerScore(prev => prev + 1);
        }
        
        setIsPlaying(false);
      }, 500);
    }, 1000);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowResult(false);
    setPlayerScore(0);
    setComputerScore(0);
    setIsPlaying(false);
  };

  const playAgain = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowResult(false);
    setIsPlaying(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
      <ScoreBoard playerScore={playerScore} computerScore={computerScore} />
      
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
          onPlayAgain={playAgain}
        />
      )}

      {/* Choice Buttons */}
      {!isPlaying && (
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
