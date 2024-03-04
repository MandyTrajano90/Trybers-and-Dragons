import Fighter from './Fighter';
import Archetype, { Mage } from './Archetypes';
import Race, { Elf } from './Races';
import Energy from './Energy';
import getRandomInt from './utils';
import SimpleFighter from './Fighter/SimpleFighter';

class Character implements Fighter {
  private _lifePoints: number;
  private _maxLifePoints: number;
  private _strength: number;
  private _archetype: Archetype;
  private _race: Race;
  private _defense: number;
  private _energy: Energy;
  private _dexterity: number;
  private name: string;

  constructor(name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._archetype = new Mage(name);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
    this.name = name;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get energy(): Energy {
    return { ...this._energy };
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifePoints -= damage;
    }

    if (damage <= 0) {
      this._lifePoints -= 1;
    }

    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this._lifePoints;
  }

  attack(enemy: Fighter | SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  special(enemy: Fighter | SimpleFighter): void {
    const superPower = 15;
    enemy.receiveDamage(superPower);
    console.log(`${this.name} uses his super power!`);
  }
}

export default Character;