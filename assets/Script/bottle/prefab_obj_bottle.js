/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-26 20:21:19
Tip : 炮塔预制体;
 */
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },
    loadProperty(data){
        this._scope = data.scope;
        this._bulletSpeed = data.bulletSpeed;
        this._bulletMoveTime = 100 / this.bulletSpeed;
    },
    //升级炮塔
    upgradeBottle(level){
        var length = this.node.children.length;
        for (var li = 0; li < length; li++) {
            if (length == level) {
                this.node.children[level].active = true;
            } else {
                this.node.children[level].active = false;
            }
        }
    },
    //找到最近的敌人
    findNearestMonster(){
        var monsterArray = L_GAME_MGR()._currMonsterPool;
        var currMinDistant = this._scope;
        var nearestEnemy = null;
        var monster = null;
        var distance = 0;
        for (var fi = 0; fi < monsterArray.length; fi++) {

        }
    },
    //发射子弹
    //

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
