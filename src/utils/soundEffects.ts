
// Simple sound effect utility for the game
export class SoundEffects {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private enabled: boolean = true;

  constructor() {
    // Create audio elements for each sound effect
    this.sounds = {
      click: this.createAudio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqN2e/QfSsEKnLM7+CVQQ0RbLfz6qVTEgxOrNzhtmMcBjuQ1/LKePbTvVrZy3nMcysEJn2U2fDQfSOdPwsVXrXs6qhUEQtPou/rwAsiZy7C1vHMfSsFJ3LM7t+QQAoUXrTp66hVFApGn+DyvmwhBjqN2e/QfSsEKnLM7+CVQQ0RbLfz6qVTEgxOrNzhtmMcBjuQ1/LKeyAA'),
      win: this.createAudio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqN2e/QfSsEKnLM7+CVQQ0RbLfz6qVTEgxOrNzhtmMcBjuQ1/LKeyAA'),
      lose: this.createAudio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqN2e/QfSsEKnLM7+CVQQ0RbLfz6qVTEgxOrNzhtmMcBjuQ1/LKeyAA'),
      draw: this.createAudio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqN2e/QfSsEKnLM7+CVQQ0RbLfz6qVTEgxOrNzhtmMcBjuQ1/LKeyAA'),
      levelUp: this.createAudio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqN2e/QfSsEKnLM7+CVQQ0RbLfz6qVTEgxOrNzhtmMcBjuQ1/LKeyAA'),
      gameOver: this.createAudio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqN2e/QfSsEKnLM7+CVQQ0RbLfz6qVTEgxOrNzhtmMcBjuQ1/LKeyAA')
    };
  }

  private createAudio(dataUrl: string): HTMLAudioElement {
    const audio = new Audio(dataUrl);
    audio.volume = 0.3; // Keep sounds subtle
    return audio;
  }

  play(soundName: string): void {
    if (!this.enabled) return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0; // Reset to beginning
      sound.play().catch(() => {
        // Ignore play errors (e.g., if user hasn't interacted with page yet)
      });
    }
  }

  toggleSound(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

// Export a singleton instance
export const soundEffects = new SoundEffects();
