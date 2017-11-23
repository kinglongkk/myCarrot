/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-23 15:31:56
Tip : 游戏首页按钮;
 */
cc.Class({
    extends: cc.Component,

    properties: {
        btnGroup: {
            default: null,
            type: cc.Node,
            tooltip: "首页所有的按钮"
        }
    },

    // use this for initialization
    onLoad: function () {
        this._comp_clickAgent = this.getComponent("Part_setClickEvent");
    },
    //绑定点击事件
    bindBtnClick (type, callback, target){
        let btnChildren = this.btnGroup.children;
        this._comp_clickAgent.registerButton(btnChildren[type], callback, target);
    },
    //获取按钮的数量
    getBtnNumber(){
        return this.btnGroup.children.length;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
