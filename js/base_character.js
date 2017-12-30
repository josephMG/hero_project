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
    var self = this;
    var i = 1;
    self.timeInterval = setInterval(function() {
      self.element.getElementsByClassName("effect-image")[0].style.display = "block";
      self.element.getElementsByClassName("effect-image")[0].src = `images/sprite/wave/images/${i}.png`;
      i++;
      if (i>18) {
        self.element.getElementsByClassName("effect-image")[0].style.display = "none";
        clearInterval(self.timeInterval);
      }
    }, 50);
  }

  updateHtml(hpElement, hurtElement) {
    hpElement.innerHTML = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%"
  }
}
