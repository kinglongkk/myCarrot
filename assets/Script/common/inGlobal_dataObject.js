/**
Created with CocosCreator 1.6.0.
Author : YOYO
Date : 2017-08-21 16:30:04
Tip : ;
 */

var target = function () {};
target.prototype = {
    tipInit (){
        return {
            content : null,
            left_callFunc : null,
            right_callFunc : null,
            tipType : null,
            fontSize: null,
        }
    },
    scrollInitData (){
        return {
            itemPrefab : null,
            lineNum : null,
            scrollType : null,
        }
    },
    data_flyCard (){
        return {
            targetNode : null,
            startPos : null,
            targetPos : null,
            flyTime : null,
            callFunc : null,
        }
    },
    data_openCard (){
        return {
            targetNode : null,
            actTime1 : null,
            actTime2 : null,
            callFunc1 : null,
            callFunc2 : null,
        }
    },
    data_changeScene (){
        return {
            sceneName : null,
            thirteenRoomData : null,                        //进入十三水房间需要的数据
            tbRoomData : null,                              //进入牛牛房间需要的数据
        }
    },
    data_playerInit() {
        return {
            playerID: null ,                        //玩家ID
            isMaster: null ,                        //是否房主
            nickname: null,                         //昵称
            headImgName: null,                      //头像图标名称
            score: null,                            //当前拥有积分数量
            seatIndex: null,                        //当前在房间中的座位
            serviceSeatIndex: null,                 //服务器中的座位信息
            faceID: null,                           //头像索引
            gender: null,                           //用户性别
            tableID: null,                          //桌子索引
        }
    },
    data_thirteenRoomInit (){
        return {
            roomID : null,                              //房间ID
            maxPeopleNum : null,                        //最大玩家数量
            gameModel : null,                           //房间模式
            maxBattleTimes : null,                      //房间最大局数
            myselfID : null,                            //玩家自己的ID
            playerInfoList : null,                      //玩家信息列表
            costJewel : null,                           //创建房间花费的钻石
            isAA : null,                                //创建房间的花费方式，是否aa制
            createColor : null,                         //创建房间使用的花色
        }
    },
    data_createRoomChess() {
        return {
            maxBattleTimes: null,                         //游戏局数
            isAA: null,                                 //创建房间支付方式
            gameModel: null,                              //游戏模式
            maxPeopleNum: null,                           //游戏人数
            gameCard: null,                             //游戏使用的卡牌
            costJewel: null,                            //创建房间消耗的钻石
            //请求信息
            roomID: null,                               //创建房间的id
            myselfID: null,                             //玩家自己的ID
            playerInfoList: null,                       //玩家列表
        }
    },
    //牛牛房间的创建
    data_createBullRoom() {
        return {
            maxBattleTimes: null,                         //游戏局数
            isAA: null,                                   //创建房间支付方式
            roomType : null,                              //房间玩法
            gameModel: null,                              //游戏模式
            maxPeopleNum: null,                           //游戏人数
            grabChipTime: null,                           //下注等待时长
            costJewel: null,                              //创建房间消耗的钻石
            //请求信息
            roomID: null,                                 //创建房间的id
            myselfID: null,                               //玩家自己的ID
            playerInfoList: null,                         //玩家列表
        }
    },
    data_initRoomLabel (){//初始化，房间左上角的房间信息显示
        return {
            roomID : null,                              //房间ID
            roomModelName : null,                       //房间模式
            curBattleTimes : null,                      //最大玩家数量
            maxBattleTimes : null,                      //房间最大局数
            maxPeopleNum : null,                        //房间最大人数
        }
    },
    roomLabInitData(){
        return {
            model: null,
            games: null,
            allGames: null,
            houseNum: null
        }
    },
    data_settlePlayerInit(){
        return {
            nickname: null,                            //玩家昵称
            headImgName: null,                         //玩家头像
            isMaster: null,                            //是否为房主
            score:null                                 //玩家积分
        }
    },
    //墩列上灰色层的相关信息
    data_grayInfo(){
        return {
            grayIndex: null,                                //灰色层的索引
            cardStartPos: null,                             //卡牌的初始放置坐标
            haveCardNum: null,                              //已经放置了多少张牌
            grayHeight:null                                 //灰色层的高度
        }
    },
    //卡牌类型的增加需要的数据对象
    data_cardTypeInit (){
        return {
            playerID : null,                               //玩家的ID
            grayIndex : null,                              //层级
            cardType : null,                               //卡牌类型
            score : null,                                  //分数值
            targetPos : null,                              //需要放置的位置坐标
        }
    },
    //结算界面需要的信息
    data_settleInit (){
        return {
            playersDict : null,                             //玩家对象信息
            myselfID : null,                                //玩家的ID
            isAA : null,                                    //是否AA制
            isHide : null,                                  //是否先隐藏，而后再控制显示
            callFunc : null,                                //点击继续后的回调
        }
    },
    //监听凭证
    tag_listener (patchType, listenerName){
        return {
            patchType : patchType,                                      //监听需要的类型
            listenerName : listenerName                                 //监听返回的类型
        }
    },
    //请求解散房间
    data_Dissolution () {
        return {
            userID: null,//用户ID
            tableID: null,//桌子ID
            chairID: null//椅子ID
        }
    },
    //请求答复（解散房间）
    data_ReplyDissolution () {
        return {
            userID: null,//用户ID
            tableID: null,//桌子ID
            isAgree: null//椅子ID
        }
    }
    //十三水牌局玩家的结果信息
    //data_thirteenPlayerResult (){
    //    return {
    //
    //    }
    //},

};

/*
var Instance;
target.getInstance = function () {
    if(!Instance){
        Instance = new target();
    }
    return Instance;
}
module.exports = target;*/
module.exports = new target();