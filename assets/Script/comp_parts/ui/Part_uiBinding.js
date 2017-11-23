/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-23 15:52:44
Tip : 将对应的prefab创建到对应的容器中, 依照列表顺序，放前面的界面先创建;;
 */
cc.Class({
    extends: cc.Component,

    properties: {
        list_parents : {
            default : [],
            type : cc.Node,
            displayName : "uiParent"
        },
        list_uiPrefabs : {
            default : [],
            type : cc.Prefab,
            displayName : "uiPrefabs"
        },

        _dict_comps : null,
        _isOnLoad : null,                               //是否正在加载预制体
    },
    onLoad: function () {
        this._dict_comps = {};

        this._doBinding();
    },
    //将对应的uiprefab绑定在对应的父节点上
    _doBinding (){
        let parent, uiNode;
        for(let i = 0; i < this.list_parents.length; i ++){
            parent = this.list_parents[i];
            if(this.list_uiPrefabs[i]){
                uiNode = cc.instantiate(this.list_uiPrefabs[i]);
                this._dict_comps[uiNode.name] = uiNode.getComponent(uiNode.name);
                this._bindOne(parent, uiNode);
            }
        }
    },
    _bindOne (parent, uiNode){
        uiNode.parent = parent;
    },

    //获取某个ui对象的操作脚本
    getUIPrefabComp (compName){
        return this._dict_comps[compName];
    },

    //============================动态添加UI元素

    addUI (uiName, parent, callBack){
        if (this._isOnLoad) return;
        if (!uiName) {
            //错误的ui名称
            if (callBack) {
                callBack(null);
                callBack = null;
            }
            return
        }
        let uiComp = this._dict_comps[uiName];
        if (!uiComp) {
            //创建窗口
            let prefabName = uiName;
            this._isOnLoad = true;
            //显示网络请求动画
            // G_TOP().showNetRequest();
            cc.loader.loadRes("prefab_uiPage/" + prefabName, (err, prefab)=> {
                //加载完成隐藏网络请求动画
                // G_TOP().hideNetRequest();
                if (err) {
                    cc.error(err);
                    return;
                }
                this._isOnLoad = false;
                let uiNode = cc.instantiate(prefab);
                uiNode.parent = parent;
                uiNode.position = cc.p(0,0);
                uiComp = uiNode.getComponent(uiName);
                if (uiComp.bindContainer) uiComp.bindContainer(parent);
                this._dict_comps[uiName] = uiComp;
                uiNode.active = false;
                if (callBack) {
                    callBack(uiComp);
                    callBack = null;
                }
            });
        } else {
            //已经创建过该ui
            if (callBack) {
                callBack(uiComp);
                callBack = null;
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});