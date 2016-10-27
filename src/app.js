var size;
var walk_flg = 0;
var touching = false;
//スプライトフレームを作成
var chara;
var moveframe1;
var moveframe2;
var moveframe3;
var moveframe4;
//1:地面　2:ブロック　3:プレイヤ　4:ゾンビ 5:こうもり
var level = [
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
   [0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
      var enemys = new enemyLayer();
      this.addChild(enemys);
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
      for (i = 0; i < 12; i++) {　　　　　　
         for (j = 0; j < 33; j++) {
            switch (level[i][j]) {
               case 1:
                  var LineSprite = cc.Sprite.create(res.Line);
                  LineSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (12 - i) - tileSize / 2);
                  this.addChild(LineSprite);
                  break;
               case 2:
                  var blockSprite = cc.Sprite.create(res.Lineblock);
                  blockSprite.setPosition(tileSize / 2 + tileSize * j, 32 * (12 - i) - tileSize / 2);
                  this.addChild(blockSprite);
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
      for (i = 0; i < 12; i++) {　　　　　　
         for (j = 0; j < 33; j++) {
            if (level[i][j] == 3) {
               this.setPosition(tileSize / 2 + tileSize * j, 32 * (12 - i) - tileSize / 2);
               playerPosition = {
                  x: j,
                  y: i
               };
            }
         }
      }
      //this.schedule(this.working,0.08);
      /*
        // 2.　SpriteFrame　を利用しての歩行アニメーション
          //スプライトフレームを格納する配列
          var animationframe = [];
          //スプライトフレームを作成
          var frame1 = new cc.SpriteFrame(res.player01_png, cc.rect(0, 0, 96, 96));
          var frame2 = new cc.SpriteFrame(res.player02_png, cc.rect(0, 0, 96, 96));
          //スプライトフレームを配列に登録
          animationframe.push(frame1);
          animationframe.push(frame2);
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.08);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          this.runAction(action);
      */

        //３．テクスチャーからスプライトフレームを切り出す方法
        //スプライトフレームを格納する配列
        //if(Player.workingFlag == false) {
        /*var texture = cc.textureCache.addImage(res.Playerframe_png);
        //スプライトフレームを作成
        var frame1 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(0, 0, 32, 32));
        var frame2 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(32, 0, 32, 32));
        var frame3 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(64, 0, 32, 32));
        var frame4 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(32, 0, 32, 32));
        //スプライトフレームを配列に登録
        var animationframe = [];
        animationframe.push(frame1);
        animationframe.push(frame2);
        animationframe.push(frame3);
        animationframe.push(frame4);
        //スプライトフレームの配列を連続再生するアニメーションの定義
        var animation = new cc.Animation(animationframe, 0.15);
        //永久ループのアクションを定義
        var action = new cc.RepeatForever(new cc.animate(animation));
        this.runAction(action);*/
        //}



/*
      // スプライトシートをキャッシュに登録
      cc.spriteFrameCache.addSpriteFrames(res.player_plist, res.player_sheet);

      // スプライトフレームを取得 player01,player02はplistの中で定義されいいる
      var frame1 = cc.spriteFrameCache.getSpriteFrame("player01");
      var frame2 = cc.spriteFrameCache.getSpriteFrame("player02");

      //スプライトフレームを配列に登録
      var animationframe = [];
      animationframe.push(frame1);
      animationframe.push(frame2);
      //スプライトフレームの配列を連続再生するアニメーションの定義
      var animation = new cc.Animation(animationframe, 0.08);
      //永久ループのアクションを定義
      var action = new cc.RepeatForever(new cc.animate(animation));
      //実行
      this.initWithFile(res.player_sheet);
      this.runAction(action);
      */

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

        walk_flg++;
        if (walk_flg == 10) chara.setTexture(res.Player2);
        if (walk_flg == 20) chara.setTexture(res.Player3);
        if (walk_flg == 30) chara.setTexture(res.Player2);
        if (walk_flg == 40) {chara.setTexture(res.Player1);　walk_flg = 0;}
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
      //タッチしているというフラグオン
      touching = true;
      //タッチした場所が、スプライトの内部に収まっていたら
      if (cc.rectContainsPoint(spriteRect, location)) {
         console.log(target.getTag() + "Btnがタッチされました");


         //タッチしたスプライトが左ボタンだったら
         if (target.getTag()　 == 1) {
            player.xSpeed = -2.5;
            player.workingFlag = true;
            leftBtn.setOpacity(255);
            rightBtn.setOpacity(128);
         } else {
            //タッチしたスプライトが右ボタンだったら
            if (target.getTag()　 == 2) {
               player.xSpeed = 2.5;
               player.workingFlag = true;
               rightBtn.setOpacity(255);
               leftBtn.setOpacity(128);
            }
         }
         //タッチしたスプライトがジャンプボタンだったら
         if (target.getTag()　 == 3) {
            if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
            player.jumpFlag = true;
            jumpBtn.setOpacity(255);
         }
      }
      return true;
   },
   //タッチを止めたときは、移動スピードを0にする
   onTouchEnded: function(touch, event) {
     //タッチ終了時タッチフラグをオフ
     touching = false;
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
      if (keyCode == 65) { // a-Keyで左に移動
         player.xSpeed = -2.5;
         leftBtn.setOpacity(255);
         rightBtn.setOpacity(128);
      }
      if (keyCode == 68) { // d-Keyで左に移動
         player.xSpeed = 2.5;
         rightBtn.setOpacity(255);
         leftBtn.setOpacity(128);
      }
      if (keyCode == 32 || keycode == 38) { // スペースキーか上矢印キーでジャンプ
         if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
         player.jumpFlag = true;
         jumpBtn.setOpacity(255);
      }
      return true;
   },
   onKeyReleased: function(keyCode, event) {
      player.jumpFlag = false;
      player.xSpeed = 0;
      //player.ySpeed = 0;
      leftBtn.setOpacity(128);
      rightBtn.setOpacity(128);
      jumpBtn.setOpacity(128);
   },

});
