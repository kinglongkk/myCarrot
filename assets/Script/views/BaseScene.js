/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-27 12:04:50
Tip : 场景管理器的基础类;
 */
cc.Class({
    extends: cc.Component,

    properties: {
        _list_funcDiy : null,                                                   //功能定制的列表
        _list_global_listener : null,                                           //场景中的全局监听
        _b_sceneName : null,                                                    //当前场景名字
    },

    // use this for initialization
    onLoad: function (sceneName) {
        this._b_sceneName = sceneName;
        /*G_DATA().setCurSceneName(sceneName);
        G_WEB().initSceneSize();*/
    },

    setFuncList (list){
        this._list_funcDiy = list;
    },

    addSceneListener (patchType, callBack){
        if(!this._list_global_listener) this._list_global_listener = [];
        let listenerName = L_LISTENER().registerFunc(patchType, callBack);
        let listenerData = L_OBJ().tag_listener(patchType, listenerName);
        this._list_global_listener.push(listenerData);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onDestroy (){
        /*G_TOOLS().clearNodeTimeout();
        G_TOOLS().clearNodeInterval();
        G_TOP().clearTop();*/
        //清理所有对场景的监听
        if(this._list_global_listener){
            for(let i = 0; i < this._list_global_listener.length; i ++){
                L_LISTENER().delListen(this._list_global_listener[i].patchType, this._list_global_listener[i].listenerName);
            }
            this._list_global_listener = null;
        }
    },
});
