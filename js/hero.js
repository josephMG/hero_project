import BaseCharacter from './base_character.js';

export default class Hero extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);

    //取得角色html
    this.element = document.getElementsByClassName("hero-image-block")[0];
    this.hpElement = document.getElementById("hero-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");
    this.maxHpElement = document.getElementById("hero-max-hp");

    this.hpElement.textContent = this.hp
    this.maxHpElement.textContent = this.maxHp

    console.log(`你的英雄 ${name} 已經誕生了！`);
    console.log(`生命力(HP)：${hp}`);
    console.log(`攻擊力(AP)：${ap}`);
    console.log("");
  }

  attack(character, type, apValue = 0) {
    if (type == 1) {
      //攻擊1
      var val = Math.random() * (this.ap / 2.0) + (this.ap / 2.0)
      super.attack(character, type, Math.floor(val));
    } else if (type==2) {
      //攻擊2 (+hp)
      this.hp += 40;
      if (this.hp > this.maxHp)
        this.hp = this.maxHp;
      this.updateHtml(this.hpElement, this.hurtElement);
    } else if (type==3) {
      //攻擊3
      var val = Math.random() * (this.ap / 2.0) + (this.ap / 2.0) + 50;
      super.attack(character, type, Math.floor(val));
    }
  }

  getHurt(val) {
    super.getHurt(val)
    this.updateHtml(this.hpElement, this.hurtElement);
  }

}
