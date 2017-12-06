/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-27 11:57:13
Tip : 全局的事件监听与派送;
 */
var target = function () {
    this._dict_listeners = {};//所有监听
    this._list_delIndex = [];//监听索引
    this._listenerIndex = 0;//可用的索引
};
target.prototype = {
    //增加监听
    registerFunc : function (eventType, callFunc) {
        if(Object.prototype.toString.call(callFunc) === "[object Function]"){
            if(!this._dict_listeners[eventType]) this._dict_listeners[eventType] = {};
            var listenerName;
            if(callFunc.name) listenerName = callFunc.name+'_'+this._getListenerIndex();
            else listenerName = "defaultName"+'_'+this._getListenerIndex();
            this._dict_listeners[eventType][listenerName] = callFunc;
            return listenerName
        }
        //registerFunc, error eventType== or error callFunc
        //debugger;
        cc.error('registerFunc, error eventType=='+eventType);
        return null
    },

    //去除监听
    delListen : function (eventType, listenerName) {
        if(!this._dict_listeners[eventType]) return;
        if(this._dict_listeners[eventType][listenerName]){
            this._whenCancelListener(listenerName);
            //有这个监听
            delete this._dict_listeners[eventType][listenerName];
            if(Object.keys(this._dict_listeners[eventType]).length < 1) this._dict_listeners[eventType] = null;
        }
    },

    //派送监听的事件
    dispatchEventEX : function (eventType, data) {
        var listenersList = this._dict_listeners[eventType];
        if(listenersList){
            //存在监听对象
            var callFunc;
            for(var name in listenersList){
                callFunc = listenersList[name];
                if(cc.isValid(callFunc) && Object.prototype.toString.call(callFunc) === "[object Function]"){
                    callFunc(name, data);
                }else {
                    cc.log('delete no valid listenerFunc=='+eventType)
                    this.delListen(eventType, name);
                }
            }
        }
    },

    _whenCancelListener : function (listenerName) {
        var indexList = listenerName.split('_');
        var listenerIndex = indexList[indexList.length - 1];
        this._list_delIndex.push(listenerIndex);
    },
    //获取可用的监听索引
    _getListenerIndex : function () {
        if(this._list_delIndex[0]){
            return this._list_delIndex.splice(0,1);
        }else{
            this._listenerIndex += 1;
            return this._listenerIndex
        }
    },

};

/*
var Instance;
target.getInstance = function () {
    if(!Instance){
        Instance = new target();
    }
    return Instance;
}
module.exports = target;
*/
module.exports = new target();