class BaseCharacter {
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
    if (character.hp <= 0) {
      character.die();
    }
  }

  die() {
    this.alive = false;
  }

  getHurt(val){
    this.hp -= val;
    if (this.hp < 0) this.hp = 0;
    var _this = this;
    var i = 1;
    _this.timeInterval = setInterval(function() {
      //設定P4 受攻擊動畫
      _this.element.getElementsByClassName("effect-image")[0].style.display = "block";
      _this.element.getElementsByClassName("effect-image")[0].src = `images/sprite/fire/images/Resource_10_1${i}.png`;
      _this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
      _this.element.getElementsByClassName("hurt-text")[0].innerHTML = val;
      i++;
      if (i>7) {
        //移除P4 受攻擊動畫
        _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
        _this.element.getElementsByClassName("hurt-text")[0].classList.remove("attacked");
        _this.element.getElementsByClassName("hurt-text")[0].innerHTML = "";
        clearInterval(_this.timeInterval);
      }
    }, 50);
  }

  updateHtml(hpElement, hurtElement) {
    //更新血量文字與血條
    hpElement.innerHTML = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%"
  }
}

class Monster extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);

    //取得角色html
    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");

    this.hpElement.textContent = this.hp
    this.maxHpElement.textContent = this.maxHp

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

    this.updateHtml(this.hpElement, this.hurtElement)
  }
}

class Hero extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);

    //取得角色html
    this.element = document.getElementById("hero-image-block");
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
  heal(i) {
    this.element.getElementsByClassName("effect-image")[0].style.display = "block";
    this.element.getElementsByClassName("effect-image")[0].src = `images/sprite/circle2/images/Resource_0${i}.png`;
    this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
    this.element.getElementsByClassName("hurt-text")[0].innerHTML = "40";
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
      var _this = this, i=0;
      var timeInterval = setInterval(function() {
        _this.heal(i++);
      }, 100);
      setTimeout(function() {
        clearInterval(timeInterval)
        _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
      }, 400);
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


var hero = new Hero("Ironman", 100, 30);
var monster = new Monster("Ghost", 60, 10);
var rounds = 10;

function isGameOver() {
  //更新回合數，並檢查是否回合結束
  rounds--;
  var roundElement = document.getElementById("round-num");
  roundElement.innerHTML = rounds;

  return (rounds == 0 || !hero.isAlive() || !monster.isAlive());
}

function finish() {
  //P5 顯示dialog
  var dialog = document.getElementById("dialog")
  dialog.style.display = "block";
  if (monster.isAlive() == false) {
    dialog.classList.add("win")
  } else if (hero.isAlive() == false) {
    dialog.classList.add("lose")
  }
}

function heroAttack(i) {
  // Hero 選技能時觸發回合開始
  document.getElementsByClassName("skill-block")[0].style.display = "none";

  setTimeout(function() {
    // Hero 攻擊
    // Hero 移動動畫 css class
    if (i!=2) {
      hero.element.classList.add("attacking");
    }
    setTimeout(function() {
      hero.attack(monster, i);
      hero.element.classList.remove("attacking");
    }, 500);
  }, 100)

  setTimeout(function() {
    // Monster 攻擊
    // Monster 移動動畫 css class
    if (monster.isAlive()){
      monster.element.classList.add("attacking")
      setTimeout(function() {
        monster.attack(hero, 1);
        monster.element.classList.remove("attacking");
        //monster 攻擊完檢查是否回合結束
        if (isGameOver() == true) {
          finish();
        } else {
          //新回合打開Hero skill
          document.getElementsByClassName("skill-block")[0].style.display = "block";
        }
      }, 500);
    } else {
      //Monster 陣亡
      finish();
    }
  }, 1000)

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function addSkillEvent() {
  //加入skill click listener
  var skill1 = document.getElementById("skill1");
  skill1.addEventListener("click", function() { heroAttack(1); })

  var skill2 = document.getElementById("skill2");
  skill2.addEventListener("click", function() { heroAttack(2); })

  var skill3 = document.getElementById("skill3");
  skill3.addEventListener("click", function() { heroAttack(3); })
}

addSkillEvent();
