cc.Class({
    extends: cc.Component,

    properties: {
        prefab_monster: {
            default: null,
            type: cc.Prefab,
            tooltip: "怪物预制体"
        }


        /*tiledMap            : null, // 瓦片地图
        tileSize            : null, // 瓦片大小
        roadPointArray      : [],   // 怪物路径

        ZOrderEnum          : {},   // 对象层级枚举

        carrot              : {},   // 萝卜对象
        carrotHpBg          : {},   // 萝卜[血量背景]
        carrotHpText        : {},   // 萝卜[血量]

        tiledMapRectArray   : [],   // 瓦片地图区域[二维区域]
        tiledMapRectArrayMap: [],   // 瓦片地图区域映射
        tiledMapRectMapEnemu: {},   // 瓦片地图区域映射枚举
        touchWarningNode    : null, // 触摸警告节点
        towerPanel          : null, // 构建塔的面板

        currGroupCreatedMonsterCount : 0,
        currGroupCreatedMonsterSum : 0,*/
    },

    // use this for initialization
    onLoad: function () {
        L_GAME_MGR().loadLevelData(0);
        this.ZOrderEnum = {};
        this._tiledMapRectArrayMap = [];
        this.tiledMapRectMapEnemu = {};
        this._currGroupCreatedMonsterCount = 0;
        this.currGroupCreatedMonsterSum = 0;
        this._currGroupCreatedMonsterSum = 0;
            this._loadProperty();
        //加载瓦片地图
        this._loadTiledMap();
        this._loadStartAndEnd();
        this._loadRoadPointArray();
        // 加载[下一组怪物]
        this._loadNextGroupMonster();
    },
    // 加载[属性]
    _loadProperty : function(){
        this.ZOrderEnum.START        = 10;   // 起点标识
        this.ZOrderEnum.CARROT       = 0;    // 萝卜
        this.ZOrderEnum.MONSTER      = 20;   // 怪物
        this.ZOrderEnum.WAMING       = 30;   // 警告提示
        this.ZOrderEnum.TOWER_PANEL  = 50;   // 创建塔面板

        this.tiledMapRectMapEnemu.NONE      = 0;    // 空地
        this.tiledMapRectMapEnemu.ROAD      = 1;    // 道路
        this.tiledMapRectMapEnemu.SMALL     = 2;    // 小障碍物[占1格]
        this.tiledMapRectMapEnemu.LITTLE    = 3;    // 中障碍物[占2格]
        this.tiledMapRectMapEnemu.BIG       = 4;    // 大障碍物[占4格]
        this.tiledMapRectMapEnemu.INVALID   = 5;    // 无效区域
        this.tiledMapRectMapEnemu.TOWER     = 6;    // 塔

    },
    // 加载[瓦片地图][主要是一些关卡信息配置]
    _loadTiledMap(){
        // this.tiledMap = this.node_tiledMap;
        this.tiledMap = this.node.getComponent(cc.TiledMap);
        cc.log(this.tiledMap);
        this.mapNode = this.tiledMap.node;
        this._mapSize = this.tiledMap.getMapSize();

        //设置【所有对象组】坐标偏移量
        var groups = this.tiledMap.getObjectGroups();
        var group = null;
        var offsetX = (cc.winSize.width - this.mapNode.width) / 2;
        var offsetY = (cc.winSize.height - this.mapNode.height) / 2;

        var finalOffsetX = 0;
        var finalOffsetY = 0;
        var groupName = "";
        for (var gi = 0; gi < groups.length; gi ++) {
            group = groups[gi];
            groupName = group.getGroupName();

            if (groupName == "big") {
                finalOffsetX = offsetX;
                finalOffsetY = offsetY;
            } else if (groupName == "little") {
                finalOffsetY = offsetX;
                finalOffsetY = offsetY + this.mapNode.height / 2;
            } else if (groupName == "small"
                    || groupName == "road"
                    || groupName == "start_end"
                    || groupName == "invalid") {
                finalOffsetX = offsetX + this.mapNode.width / 2;
                finalOffsetY = offsetY + this.mapNode.height / 2;
            } else {
                cc.warn(groupName, "对象组的坐标未调整");
            }

            group.setPositionOffset(cc.p(finalOffsetX, finalOffsetY));
        }
    },

    // 加载[起点和萝卜]
    _loadStartAndEnd : function(){
        this._loadStartFlag();
        this._loadEndFlag();
    },
    _loadStartFlag(){

    },
    _loadEndFlag(){

    },
    // 加载[路径坐标]
    _loadRoadPointArray(){
        this._roadPointArray = [];
        var roadGroup = this.tiledMap.getObjectGroup("road");
        var roads = roadGroup.getObjects();
        for (var ri = 0; ri < roads.length; ri ++) {
            this._roadPointArray.push(cc.p(roads[ri].offset.x + roadGroup.getPositionOffset().x / 10, -roads[ri].offset.y + roadGroup.getPositionOffset().y * 1.8));
        }
        cc.log("加载[路径坐标]", this._roadPointArray, roads);
    },
    // 加载[瓦片地图区域映射]
    _loadTiledMapRectArrayMap(){
        var mi;
        // var mapSize = this.mapNode.getMapSize();
        for (mi = 0; mi < this._mapSize.height; mi++) {
            this._tiledMapRectArrayMap[mi] = [];
            for (var mj = 0; mj < this._mapSize.width; mj ++) {
                this._tiledMapRectArrayMap[mi][mj] = this.tiledMapRectMapEnemu.NONE;
            }
        }
    },
    //加载怪物
    _loadNextGroupMonster(){
        if (L_GAME_MGR().getGroup() > L_GAME_MGR().getMaxGroup()) {
            cc.log("GPMainLayer.loadNextGroupMonster() : 怪物添加完毕");
        }
        L_GAME_MGR()._currMonsterDataPool = L_GAME_MGR().popNextMonsterGroupData();
        L_GAME_MGR()._currMonsterPool[L_GAME_MGR().getGroup() - 1] = [];

        this._currGroupCreatedMonsterCount = 0;
        //怪物总数统计
        this._currGroupCreatedMonsterSum = L_GAME_MGR().getCurrGroupMonsterSum();

        var groupDelay = cc.delayTime(L_GAME_MGR().getGroupInterval());
        //延迟事件
        var enemyDelay = cc.delayTime(L_GAME_MGR().getEnemyInterval());
        var callback = cc.callFunc(this._createMonster.bind(this));
        this.node.runAction(cc.sequence(enemyDelay, callback).repeat(this._currGroupCreatedMonsterSum));
        /*var createMonsterAction = cc.sequence(enemyDelay, callback).repeat(this._currGroupCreatedMonsterSum)
        var finalAction = cc.sequence(groupDelay, createMonsterAction);
        this.node.runAction(finalAction);*/
        // this._createMonster();
    },
    _createMonster(){

        var data = L_GAME_MGR()._currMonsterDataPool[0];
        cc.log("monster is onLoad", data);
        //创建怪物数量+1
        this._currGroupCreatedMonsterCount++;
        var monsterData = {
            road : this._roadPointArray,
            speed : data.speed,
            index : data.index
        };
        var monsterNode = cc.instantiate(this.prefab_monster);
        var comp_monster = monsterNode.getComponent("prefab_obj_monster");
        comp_monster.loadMonster(data.name);
        monsterNode.parent = this.node;
        L_GAME_MGR()._currMonsterPool[L_GAME_MGR().getGroup() - 1].push(monsterNode);
        monsterNode.setPosition(this._roadPointArray[0]);
        var monsterAni = monsterNode.getComponent(cc.Animation);
        cc.log("monsterAni", monsterAni);
        // monsterAni.play();

        comp_monster.loadProperty(monsterData);
        comp_monster.run();

        //删除掉第一个数据
        L_GAME_MGR()._currMonsterDataPool.splice(0, 1);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
