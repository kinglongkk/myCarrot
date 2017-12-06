/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-23 15:50:20
Tip : 首页管理;
 */
cc.Class({
    extends: cc.Component,

    properties: {
        node_script: {
            default: null,
            type: cc.Node,
            tooltip: "挂载公共的脚本"
        }
    },

    // use this for initialization
    onLoad: function () {
        this._comp_uiBinding = this.node_script.getComponent("Part_uiBinding");
        this._comp_btnContainer = this._comp_uiBinding.getUIPrefabComp("prefab_home_buttonContainer");
    },
    start(){
        this._registerHomeBtn();
    },
    //注册首页按钮点击事件
    _registerHomeBtn() {
        if (this._comp_btnContainer) {
            let btnNumber = this._comp_btnContainer.getBtnNumber();
            for (var bi = 0; bi < btnNumber; bi ++) {
                this._comp_btnContainer.bindBtnClick(bi, this._onClick.bind(this), this);
            }
        }
    },

    _onClick(event){
        let clickBtnName = event.currentTarget.name;
        switch (clickBtnName) {
            case "weiboicon04_normal":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "weiboicon05_normal":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "weiboicon06_normal":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "weiboicon02_normal":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "weiboicon01_normal":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "chaozhi_normal":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "news_normal":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "btn_setting_normal":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "btn_help_normal":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "btn_adventure_normal_CN":
                cc.log("点击了", clickBtnName, "这个按钮");
                cc.director.loadScene("gamePlay");
                break;
            case "btn_boss_normal_CN":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            case "btn_nest_normal_CN":
                cc.log("点击了", clickBtnName, "这个按钮");
                break;
            default:
                cc.error("未检测到的按钮");
                break;
        };
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
