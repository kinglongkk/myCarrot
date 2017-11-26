/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-25 14:19:31
Tip : 怪物;
 */
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.roadIndex = 0;// 当前移动路径的前缀
        this.speed = 0;
        //加载属性配置
        cc.Sprite
    },
    loadProperty(obj){
        //实例化怪物
        cc.log(obj);
        this.road = obj.road;
        this.speed = obj.speed;
    },
    run(){
        this._runNextRoad();
        // 跑到下一个标记点上
        // this._playRunAnimation();
    },
    _runNextRoad(){
        //转方向
        cc.log("//转方向", this.road[this.roadIndex]);
        var isFlipX;
        cc.log("转转方向条件", this.road[this.roadIndex + 1]);
        cc.log(this.node, this.node.getPosition());
        if (this.road[this.roadIndex].x <= this.road[this.roadIndex + 1].x) {
            isFlipX = cc.flipX(false);
            this.node.runAction(cc.flipX(false));
        } else {
            isFlipX = cc.flipX(true);
            this.node.runAction(cc.flipX(true));
        }
        var distance = cc.pDistance(this.road[this.roadIndex], this.road[this.roadIndex + 1]);
        cc.log(distance)
        var time = distance / this.speed;
        var moveTo = cc.moveTo(time, this.road[this.roadIndex + 1]);
        var callback = cc.callFunc(function () {
            if (this.roadIndex < this.road.length - 1) {
                this._runNextRoad();

            } else {
                cc.log("吃到萝卜")
            }
        }.bind(this));
        var seq = cc.sequence(moveTo, callback);
        this.node.runAction(seq);
        this.roadIndex++;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
