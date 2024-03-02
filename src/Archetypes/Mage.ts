import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Mage extends Archetype {
  private _energyType: EnergyType;
  static _createdArchetypeInstances = 0; 

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
    Mage._createdArchetypeInstances += 1;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return Mage._createdArchetypeInstances;
  }

  override get name(): string {
    return this.name;
  }
}

export default Mage;