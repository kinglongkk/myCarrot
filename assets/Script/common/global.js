/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-26 20:40:19
Tip : all global get;
 */

window.LL = window.LL || {};


function getObjectTarget(name) {
    if (!LL[name]) {
        LL[name] = require(name);
    }
    return LL[name];
}

//游戏管理
window.L_GAME_MGR = function () {
    return getObjectTarget("gameManager");
}
//怪物数据
window.L_MONSTER_DATA = function () {
    return getObjectTarget("levelData");
}