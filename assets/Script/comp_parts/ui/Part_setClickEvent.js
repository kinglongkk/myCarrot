/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-23 15:35:47
Tip : 所有按钮点击事件和效果;
 */
cc.Class({
    extends: cc.Component,
    properties: {},

    // use this for initialization
    onLoad: function () {},

    //注册按钮点击效果
    registerButton : function (node, callBack, target, userData, isNoScale) {
        if(!node) return;
        // node._isTouchEnabledEx = true;
        node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // if(event.target._isTouchEnabledEx) {
                // if(event.target._isTouchDelayLimit) return;
                // G_AUDIO().playSound(G_ENUM().audioInfo.btn_click);//播放点击音效
                if(!isNoScale){
                    if(!event.target.lastScale) event.target.lastScale = event.target.scale;
                    event.target.scale = event.target.lastScale * 1.1;
                }
            // }
        }, target);
        node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if(event.target.lastScale) event.target.scale = event.target.lastScale;
            // if(event.target._isTouchEnabledEx && !event.target._isTouchDelayLimit) {
                callBack.call(target, event, userData);
                // event.target._isTouchDelayLimit = true;
                /*G_TOOLS().timeout(()=>{
                    event.target._isTouchDelayLimit = false;
            }, 500);*/
            // }
        }, target);
        node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            if(event.target.lastScale) event.target.scale = event.target.lastScale
        }, target);
    },
    //设置按钮是否可用
    setBtnEnable : function (node, isEnable, isNoGray) {
        if(isEnable){
            node.color = cc.Color.WHITE;
        }else{
            if(!isNoGray) node.color = cc.Color.GRAY;
        }
        var btn = node.getComponent(cc.Button);
        if(btn)btn.enabled = isEnable;
        node._isTouchEnabledEx = isEnable;
    },

    //获取是否可用
    getIsBtnEnable : function (node) {
        return node._isTouchEnabledEx
    },

    onDestroy : function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
