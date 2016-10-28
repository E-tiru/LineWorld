var size;
var walk_flg = 0;
var touching = false;
var touching_jump = false;
var Starget = 0;
var Key = false;

//スプライトフレームを作成
var chara;
var moveframe1;
var moveframe2;
var moveframe3;
var moveframe4;
//1:地面　2:ブロック　3:プレイヤ　4:ゾンビ 5:こうもり
var level = [
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  1,  1,  1,  1,  1,  1,  1, 11,  1,  1,  1,  1],
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  0,  0,  0,  0],
   [ 0,  0,  0,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  0,  0,  0,  0],
   [ 0,  0,  0,  0,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  0,  0,  0,  0],
   [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
];
var tileSize = 32;
var playerPosition; //マップ内のプレイやの位置(ｘ、ｙ)を保持する
var playerSprite; //プレイヤーのスプライト

var leftBtn; //左ボタン
var rightBtn; //右ボタン
var jumpBtn; //ジャンプ
var winSize;

var gameScene = cc.Scene.extend({
   onEnter: function() {
      this._super();
      var texture = cc.textureCache.addImage(res.Playerframe_png);
      moveframe1 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(0, 0, 32, 32));
      moveframe2 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(32, 0, 32, 32));
      moveframe3 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(64, 0, 32, 32));
      moveframe4 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(32, 0, 32, 32));
      winSize = cc.director.getWinSize();

      var background = new backgroundLayer();
      this.addChild(background);
      var level = new levelLayer();
      this.addChild(level);
      var player = new playerLayer();
      this.addChild(player);
      //var enemys = new enemyLayer();
      //this.addChild(enemys);
   }
});


var backgroundLayer = cc.Layer.extend({
   ctor: function() {
      this._super();

      var backgroundSprite = cc.Sprite.create(res.background_png);
      var size = backgroundSprite.getContentSize();
      //console.log(size);
      this.addChild(backgroundSprite);
      //console.log(winSize.width,winSize.height);
      backgroundSprite.setPosition(winSize.width / 2, winSize.height / 2);
      //背景画像を画面の大きさに合わせるためのScaling処理
      backgroundSprite.setScale(winSize.width / size.width, winSize.height / size.height);
   }

});

var levelLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      var size = cc.director.getWinSize();
      for (i = 0; i < 14; i++) {　　　　　　
         for (j = 0; j < 33; j++) {
            switch (level[i][j]) {
              //足場ライン
              case 1:
                 var LineSprite = cc.Sprite.create(res.Line);
                 LineSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(LineSprite);
                 break;
              //ブロックLine
              case 2:
                 var blockSprite = cc.Sprite.create(res.Lineblock);
                 blockSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(blockSprite);
                 break;
              //色付き足場ライン青
              case 4:
                 var Line_BlueSprite = cc.Sprite.create(res.Line_Blue);
                 Line_BlueSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Line_BlueSprite);
                 break;
            //色付き足場Line赤
             case 5:
                 var Line_RedSprite = cc.Sprite.create(res.Line_Red);
                 Line_RedSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Line_RedSprite);
                 break;
            //色付き足場ライン黄色
             case 6:
                 var Line_YellowSprite = cc.Sprite.create(res.Line_Yellow);
                 Line_YellowSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Line_YellowSprite);
                 break;
            //壁
             case 7:
                 var Wall_LineSprite = cc.Sprite.create(res.Wall_Line);
                 Wall_LineSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Wall_LineSprite);
                 break;
            //壁青
             case 8:
                 var Wall_Line_BlueSprite = cc.Sprite.create(res.Wall_Line_Blue);
                 Wall_Line_BlueSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Wall_Line_BlueSprite);
                 break;
            //壁赤
             case 9:
                 var Wall_Line_RedSprite = cc.Sprite.create(res.Wall_Line_Red);
                 Wall_Line_RedSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Wall_Line_RedSprite);
                 break;
            //壁黄色
             case 10:
                 var Wall_Line_YellowSprite = cc.Sprite.create(res.Wall_Line_Yellow);
                 Wall_Line_YellowSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Wall_Line_YellowSprite);
                 break;
                 //梯子上
             case 11:
                 var Ladder_TopSprite = cc.Sprite.create(res.Ladder_Top);
                 Ladder_TopSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Ladder_TopSprite);
                 break;
                 //梯子上青
             case 12:
                 var Ladder_Top_BlueSprite = cc.Sprite.create(res.Ladder_Top_Blue);
                 Ladder_Top_BlueSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Ladder_Top_Blue);
                 break;
                 //梯子上赤
             case 13:
                 var Ladder_Top_RedSprite = cc.Sprite.create(res.Ladder_Top_Red);
                 Ladder_Top_RedSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Ladder_Top_Red);
                 break;
                 //梯子上黄色
             case 14:
                 var Ladder_Top_YellowSprite = cc.Sprite.create(res.Ladder_Top_Yellow);
                 Ladder_Top_YellowSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Ladder_Top_YellowSprite);
                 break;
                 //梯子
             case 15:
                 var LadderSprite = cc.Sprite.create(res.Ladder);
                 LadderSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(LadderSprite);
                 break;
                 //梯子青
             case 16:
                 var Ladder_BlueSprite = cc.Sprite.create(res.Ladder_Blue);
                 Ladder_BlueSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Ladder_BlueSprite);
                 break;
                 //梯子赤
             case 17:
                 var Ladder_RedSprite = cc.Sprite.create(res.Ladder_Red);
                 Ladder_RedSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Ladder_RedSprite);
                 break;
                 //梯子黄色
             case 18:
                 var Ladder_YellowSprite = cc.Sprite.create(res.Ladder_Yellow);
                 Ladder_YellowSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
                 this.addChild(Ladder_YellowSprite);
                 break;

            }
         }
      }
   }
});


var player;
var player_bou;
var playerLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      player = new Player();
      this.addChild(player);
//===============スコア、鍵アイテムの追加=====================//
//================スコアアイテム３====================//
    topLayer = cc.Layer.create();
    this.addChild(topLayer);
    if (Starget >= 3)   //スコアアイテムを3つ手に入れてるか？
    {
      Star = cc.Sprite.create(res.StarGet_png);
    }
    else
    {
      Star = cc.Sprite.create(res.StarClear_png);
    }
    topLayer.addChild(Star, 0);
    Star.setPosition(winSize.width / 1.85, winSize.height / 1.05);
//==================スコアアイテム２===============//
    topLayer = cc.Layer.create();
    this.addChild(topLayer);
    if (Starget >= 2)   //スコアアイテムを2つ手に入れてるか？
    {
      Star2 = cc.Sprite.create(res.StarGet_png);
    }
    else
    {
      Star2 = cc.Sprite.create(res.StarClear_png);
    }
    topLayer.addChild(Star2, 0);
    Star2.setPosition(winSize.width / 2, winSize.height / 1.05);

//=================スコアアイテム１===============//
    topLayer = cc.Layer.create();
    this.addChild(topLayer);
    if (Starget >= 1)   //スコアアイテムを1つ手に入れてるか？
    {
      Star3 = cc.Sprite.create(res.StarGet_png);
    }
    else
    {
      Star3 = cc.Sprite.create(res.StarClear_png);
    }
    topLayer.addChild(Star3, 0);
    Star3.setPosition(winSize.width / 2.18, winSize.height / 1.05);

//===========鍵アイテムの表示設定=================//
    topLayer = cc.Layer.create();
    this.addChild(topLayer);
    if (Key)   //鍵アイテムを手に入れているか？(trueか？)
    {
      Key = cc.Sprite.create(res.keyGet_png);
    }
    else
    {
      Key = cc.Sprite.create(res.KeyClear_png);
    }
    topLayer.addChild(Key, 0);
    Key.setPosition(winSize.width / 1.7, winSize.height / 1.05);
//===================================================================//
      //ショッピングカートを操作するレイヤー

      //左ボタン
      leftBtn = cc.Sprite.create(res.leftbutton_png);
      this.addChild(leftBtn, 0);
      leftBtn.setPosition(60, 40);
      leftBtn.setOpacity(128);
      leftBtn.setTag(1);
      //右ボタン
      rightBtn = cc.Sprite.create(res.rightbutton_png);
      this.addChild(rightBtn, 0);
      rightBtn.setPosition(150, 40);
      rightBtn.setOpacity(128);
      rightBtn.setTag(2);

      //ジャンプボタン
      jumpBtn = cc.Sprite.create(res.rightbutton_png);
      jumpBtn.setRotation(-90);
      this.addChild(jumpBtn, 0);
      jumpBtn.setPosition(winSize.width - 60, 40);
      jumpBtn.setOpacity(128);
      jumpBtn.setTag(3);


      cc.eventManager.addListener(listener, leftBtn);
      cc.eventManager.addListener(listener.clone(), rightBtn);
      cc.eventManager.addListener(listener.clone(), jumpBtn);

      cc.eventManager.addListener(keylistener, this);

   }

});


var Player = cc.Sprite.extend({
   ctor: function() {
      this._super();
      chara = this.initWithFile(res.Player1);
      this.workingFlag = false;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.jumpFlag = false;
      for (i = 0; i < 14; i++) {　　　　　　
         for (j = 0; j < 33; j++) {
            if (level[i][j] == 3) {
               this.setPosition(tileSize / 2 + tileSize * j, 32 * (14 - i) - tileSize / 2);
               playerPosition = {
                  x: j,
                  y: i
               };
            }
         }
      }
      this.scheduleUpdate();
   },


   //移動のため
   update: function(dt) {
      console.log(this.jumpFlag, this.ySpeed,this.workingFlag);

      if (this.xSpeed > 0) { //スピードが正の値（右方向移動）
         //　向きを判定させる
         this.setFlippedX(false);
      }
      if (this.xSpeed < 0) { //スピードが負の値（左方向移動）
         this.setFlippedX(true);
      }
      //プレイヤーを降下させる処理　ジャンプボタンが押されてないときで、プレイヤが空中にある場合
      if (this.jumpFlag == false) {
         if (this.getPosition().y < tileSize * 1.6) this.ySpeed = 0;
         else this.ySpeed = this.ySpeed - 0.5;

      }
      //位置を更新する
      this.setPosition(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed);
      if (touching == true){
        walk_flg++;
        if (walk_flg == 10) chara = this.initWithFile(res.Player2);
        if (walk_flg == 20) chara = this.initWithFile(res.Player3);
        if (walk_flg == 30) chara = this.initWithFile(res.Player2);
        if (walk_flg == 40) {chara = this.initWithFile(res.Player1);　walk_flg = 0;}
      }
      else {
        chara = this.initWithFile(res.Player1);
      }
      /*if(touching_jump == true){
        walk_flg++;
        if(walk_flg == 5) chara = this.initWithFile(res.PlayerJump);
      }
      else{
        chara = this.initWithFile(res.Player1);
      }*/
    }
});


//タッチリスナーの実装
var listener = cc.EventListener.create({
   event: cc.EventListener.TOUCH_ONE_BY_ONE,
   // swallowTouches: true,
   //タッチされた
   onTouchBegan: function(touch, event) {
      var target = event.getCurrentTarget();
      var location = target.convertToNodeSpace(touch.getLocation());
      var spriteSize = target.getContentSize();
      var spriteRect = cc.rect(0, 0, spriteSize.width, spriteSize.height);

      //タッチした場所が、スプライトの内部に収まっていたら
      if (cc.rectContainsPoint(spriteRect, location)) {
         console.log(target.getTag() + "Btnがタッチされました");


         //タッチしたスプライトが左ボタンだったら
         if (target.getTag()　 == 1) {
            player.xSpeed = -2.5;
            player.workingFlag = true;
            leftBtn.setOpacity(255);
            rightBtn.setOpacity(128);
            //タッチしているというフラグオン
            touching = true;
         } else {
            //タッチしたスプライトが右ボタンだったら
            if (target.getTag()　 == 2) {
               player.xSpeed = 2.5;
               player.workingFlag = true;
               rightBtn.setOpacity(255);
               leftBtn.setOpacity(128);
               //タッチしているというフラグオン
               touching = true;
            }
         }
         //タッチしたスプライトがジャンプボタンだったら
         if (target.getTag()　 == 3) {
            if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
            player.jumpFlag = true;
            jumpBtn.setOpacity(255);
            touching = true;
            //ジャンプボタンタッチフラグオン
            //touching_jump = true;
         }
      }
      return true;
   },
   //タッチを止めたときは、移動スピードを0にする
   onTouchEnded: function(touch, event) {
     //タッチ終了時タッチフラグをオフ
     touching = false;
     //touching_jump = false;
      player.jumpFlag = false;
      player.workingFlag = false;
      player.xSpeed = 0;
      //player.ySpeed = 0;
      leftBtn.setOpacity(128);
      rightBtn.setOpacity(128);
      jumpBtn.setOpacity(128);
   }

});

//キーボードリスナーの実装
var keylistener = cc.EventListener.create({
   event: cc.EventListener.KEYBOARD,
   // swallowTouches: true,

   onKeyPressed: function(keyCode, event) {
      if (keyCode == 37) { // a-Keyで左に移動
         player.xSpeed = -2.5;
         touching = true;
         leftBtn.setOpacity(255);
         rightBtn.setOpacity(128);
      }
      if (keyCode == 39) { // d-Keyで左に移動
         player.xSpeed = 2.5;
         touching = true;
         rightBtn.setOpacity(255);
         leftBtn.setOpacity(128);
      }
      if (keyCode == 32 || keyCode == 38) { // スペースキーか上矢印キーでジャンプ
         if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
         player.jumpFlag = true;
         touching = true;
         jumpBtn.setOpacity(255);
      }
      return true;
   },
   onKeyReleased: function(keyCode, event) {
      player.jumpFlag = false;
      touching = false;
      player.xSpeed = 0;
      //player.ySpeed = 0;
      leftBtn.setOpacity(128);
      rightBtn.setOpacity(128);
      jumpBtn.setOpacity(128);
   },

});
