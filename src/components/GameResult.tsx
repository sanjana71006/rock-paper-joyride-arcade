
import { Button } from "@/components/ui/button";

type Choice = "rock" | "paper" | "scissors";
type GameResult = "win" | "lose" | "draw";

interface GameResultProps {
  result: GameResult;
  playerChoice: Choice;
  computerChoice: Choice;
  onPlayAgain: () => void;
}

const getResultMessage = (result: GameResult): { text: string; emoji: string; color: string } => {
  switch (result) {
    case "win":
      return {
        text: "You Win! 🎉",
        emoji: "✅",
        color: "text-green-400"
      };
    case "lose":
      return {
        text: "You Lose! 😅",
        emoji: "❌", 
        color: "text-red-400"
      };
    case "draw":
      return {
        text: "It's a Draw! 🤝",
        emoji: "😐",
        color: "text-yellow-400"
      };
  }
};

const getMotivationalMessage = (result: GameResult): string => {
  const winMessages = [
    "You're crushing it! 💪",
    "Amazing choice! 🌟",
    "You're on fire! 🔥",
    "Brilliant move! 🧠"
  ];
  
  const loseMessages = [
    "Oof! Try again 🌀",
    "So close! 🎯",
    "Don't give up! 💫",
    "Next round is yours! ⚡"
  ];
  
  const drawMessages = [
    "Neck and neck! 😬",
    "Great minds think alike! 🤝",
    "What are the odds! 🎲",
    "Perfect match! ⚖️"
  ];

  let messages: string[];
  switch (result) {
    case "win":
      messages = winMessages;
      break;
    case "lose":
      messages = loseMessages;
      break;
    case "draw":
      messages = drawMessages;
      break;
  }
  
  return messages[Math.floor(Math.random() * messages.length)];
};

const GameResult = ({ result, onPlayAgain }: GameResultProps) => {
  const resultInfo = getResultMessage(result);
  const motivationalMessage = getMotivationalMessage(result);

  return (
    <div className="bg-white/20 rounded-2xl p-6 mb-6 text-center animate-fade-in">
      <div className={`text-4xl font-bold mb-2 ${resultInfo.color}`}>
        {resultInfo.text}
      </div>
      <div className="text-6xl mb-4 animate-scale-in">
        {resultInfo.emoji}
      </div>
      <div className="text-xl text-white/90 mb-6 animate-fade-in">
        {motivationalMessage}
      </div>
      <Button
        onClick={onPlayAgain}
        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transform transition-all duration-200 hover:scale-105"
      >
        Play Again! 🎮
      </Button>
    </div>
  );
};

export default GameResult;
