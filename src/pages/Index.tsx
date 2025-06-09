
import RockPaperScissorsGame from "@/components/RockPaperScissorsGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            🎮 Rock Paper Scissors 🎮
          </h1>
          <p className="text-xl text-white/90 animate-fade-in">
            The ultimate showdown! Can you beat the computer? 🤖
          </p>
        </div>
        <RockPaperScissorsGame />
      </div>
    </div>
  );
};

export default Index;
