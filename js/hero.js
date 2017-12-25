import BaseCharacter from './base_character.js';

export default class Hero extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);

    console.log(`你的英雄 ${name} 已經誕生了！`);
    console.log(`生命力(HP)：${hp}`);
    console.log(`攻擊力(AP)：${ap}`);
    console.log("");
  }
}
