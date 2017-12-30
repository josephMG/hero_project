import BaseCharacter from './base_character.js';

export default class Monster extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);
    var hpElement = document.getElementById("monster-hp");
    var maxHpElement = document.getElementById("monster-max-hp");
    hpElement.textContent = this.hp
    maxHpElement.textContent = this.maxHp

    console.log(`遇到怪獸 ${name} 了！`);
    console.log(`生命力(HP)：${hp}`);
    console.log(`攻擊力(AP)：${ap}`);
    console.log("");
  }

  attack(character, type, apValue = 0) {
    if (type == 1) {
      var val = Math.random() * (this.ap / 2.0) + (this.ap / 2.0)
      super.attack(character, type, Math.floor(val));
    }
  }

  getHurt(val) {
    super.getHurt(val)
    var hpElement = document.getElementById("monster-hp");
    var hurtElement = document.getElementById("monster-hp-hurt");

    this.updateHtml(hpElement, hurtElement)
  }
}
