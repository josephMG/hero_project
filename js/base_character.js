export default class BaseCharacter {
  constructor(name, hp, ap) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.ap = ap;
    this.alive = true;
  }

  isAlive() {
    return this.alive ;
  }

  attack(character, apValue){
    character.getHurt(apValue)
    if (character.hp < 0) {
      character.die();
    }
  }

  die() {
    this.alive = false;
  }

  getHurt(val){
    this.hp -= val;
  }
}
