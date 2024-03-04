import Battle from './Battle';
import Fighter from '../Fighter';

class PVP extends Battle {
  constructor(protected player: Fighter, protected enemy: Fighter) {
    super(player);
  }

  fight(): number {
    while (this.player.lifePoints !== -1 && this.enemy.lifePoints !== -1) {
      this.player.attack(this.enemy);
      this.enemy.attack(this.player);
    }
    return super.fight();
  }
}

export default PVP;