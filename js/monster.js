import BaseCharacter from './base_character.js';

export default class Monster extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);

    console.log(`遇到怪獸 ${name} 了！`);
    console.log(`生命力(HP)：${hp}`);
    console.log(`攻擊力(AP)：${ap}`);
    console.log("");
  }
}
