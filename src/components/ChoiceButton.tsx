
import { Button } from "@/components/ui/button";

interface ChoiceButtonProps {
  choice: {
    id: string;
    emoji: string;
    name: string;
  };
  onClick: () => void;
  disabled: boolean;
}

const ChoiceButton = ({ choice, onClick, disabled }: ChoiceButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 border-0 p-6 rounded-2xl transform transition-all duration-200 hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <div className="text-center">
        <div className="text-4xl mb-2">{choice.emoji}</div>
        <div className="text-lg font-bold">{choice.name}</div>
      </div>
    </Button>
  );
};

export default ChoiceButton;
