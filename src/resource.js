var res = {
   bat_frames:                  "res/bat_frames.png",
   background_back_png:         "res/background_back.png",
     background_front_png:        "res/background_front.png",
     background_light_shafts_png: "res/background_light_shafts.png",
     block48X48_png:              "res/block48X48.png",
     coins_png:                   "res/coins.png",
     curtain_png:                 "res/curtain.png",
     dead_sword_png:              "res/dead_sword.png",
     glass_frames_png:            "res/glass_frames.png",
     item_health_png:             "res/item_health.png",
     leftbutton_png:              "res/leftbutton.png",
     rightbutton_png:             "res/rightbutton.png",
     particle_dot_png:            "res/particle_dot.png",
     sir_awesome_frames_png:      "res/sir_awesome_frames.png",
     slime_green_frames_png:      "res/slime_green_frames.png",
     slime_red_frames_png:        "res/slime_red_frames.png",
     sparkle_frames_png:          "res/sparkle_frames.png",
     title_png:                   "res/title.png",
     ui_gauge_fill_png:           "res/ui_gauge_fill.png",
     ui_panels_png:               "res/ui_panels.png",
     zombie_frames_png:           "res/zombie_frames.png",

     Player1: "res/Player.png", //プレイヤー画像
     Player2: "res/Player2.png", //プレイヤー画像
     Player3: "res/Player3.png", //プレイヤー画像

     PlayerJump: "res/PlayerJump.png", //プレイヤー画像
     PlayerJump: "res/PlayerJump2.png", //プレイヤー画像


     Playerframe_png: "res/Playerframe.png",//プレイヤースプライト
     StarClear_png:  "res/星_クリアスコア.png", //スコアアイテム　空っぽ画像
     StarGet_png:    "res/星_ゲットスコア.png", //スコアアイテム　画像
     KeyClear_png:   "res/鍵_Clear.png", //鍵アイテム　画像
     keyGet_png:     "res/鍵_get.png", //鍵アイテム入手画像
     background_png:    "res/background.png",//バックグラウンド

     //LineWorldChip素材
  BeltConveyer_middle: "res/BeltConveyer_middle.png",//ベルトコンベア真ん中
  BeltConveyer_left:   "res/BeltConveyer_right.png",//ベルトコンベア右

   Ladder:              "res/Ladder.png",//梯子
   Ladder_Blue:         "res//Ladder_Blue.png",//青はしご
   Ladder_Yellow:       "res/Ladder_Lemon.png",//梯子黄色
   Ladder_Red:          "res/Ladder_Red.png", //梯子赤

   Ladder_Top:          "res/Ladder_Top.png", //梯子上
   Ladder_Top_Blue:     "res/Ladder_Top_Blue.png",//梯子上青
   Ladder_Top_Red:      "res/Ladder_Top_Red.png",//梯子上赤
   Ladder_Top_Yellow:   "res/Ladder_Top_Yellow.png",//梯子上黄色

   Lineblock:           "res/Lineblock.png",

   Line:                "res/Line.png", //ライン(足場
   Line_Blue:           "res/Line_Blue.png", //ライン青
   Line_Red:            "res/Line_Red.png",　//ライン赤
   Line_Yellow:         "res/Line_Yellow.png",//ライン黄色

   Wall_Line:           "res/Wall_Line.png",//壁
   Wall_Line_Blue:      "res/Wall_Line_Blue.png",//壁青
   Wall_Line_Red:       "res/Wall_Line_Red.png",//壁赤
   Wall_Line_Yellow:    "res/Wall_Line_Yellow.png",//壁黄色


   Lower_Left:          "res/Lower_Left.png",//左下
   Lower_Left_Blue:     "res/Lower_Left_Blue.png", //左下青
   lower_left_Red:      "res/lower_left_Red.png",//左下赤
   lower_left_Yellow:   "res/lower_left_Yellow.png",//左下黄色

   lower_right:         "res/lower_right.png",//右下
   lower_right_Blue:    "res/lower_right_Blue.png",//右下青
   lower_right_Red:     "res/lower_right_Red.png",//右下赤
   lower_right_Yellow:  "res/lower_right_Yellow.png",//右下黄色

   Upper_left:          "res/Upper_left.png",//左上
   Upper_left_Blue:     "res/Upper_left_Blue.png",//左上青
   Upper_left_Red:      "res/Upper_left_Red.png",//左上赤
   Upper_left_Yellow:   "res/Upper_left_Yellow.png",//左上黄色

   Upper_right:         "res/Upper_right.png",//右上
   Upper_right_Blue:    "res/Upper_right_Blue.png",//右上青
   Upper_right_Red:     "res/Upper_right_Red.png",//右上赤
   Upper_right_Yellow:  "res/Upper_right_Yellow.png",//右上黄色

   Needle:              "res/Needle.png", //トゲ
   Needle_Blue:         "res/Needle_Blue.png",//トゲ青
   Needle_Red:          "res/Needle_Red.png",//トゲ赤
   Needle_Yellow:       "res/Needle_Yellow.png",//トゲ黄色

   Switch:              "res/Switch.png",//スイッチ
   Switch_Blue:         "res/Switch_Blue.png",//スイッチ青
   Switch_Red:          "res/Switch_Red.png",//スイッチ赤
   Switch_Yellow:       "res/Switch_Yellow.png",//スイッチ黄色

   SwitchOn:            "res/SwitchOn.png",//スイッチオン
   SwitchOn_Blue:       "res/SwitchOn_Blue.png",//スイッチオン青
   SwitchOn_Red:        "res/SwitchOn_Red.png",//スイッチオン赤
   SwitchOn_Yellow:     "res/SwitchOn_Yellow.png"//スイッチオン黄色

};

var g_resources = [];
for (var i in res) {
   g_resources.push(res[i]);
}
