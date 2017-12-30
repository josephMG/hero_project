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

  attack(character, type, apValue) {
    if (this.isAlive() == false) return;
    console.log(`Attack ${character.name} hp: ${apValue}`)
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

  updateHtml(hpElement, hurtElement) {
    hpElement.innerHTML = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%"
  }
}
