/**
Created with CocosCreator 1.6.0.
Author : KingLong
Date : 2017-11-26 20:36:11
Tip : 游戏管理;
 */
var target = function () {
    this._group = 0;// 组别
    this._maxGroup = 0;// 组别[最大值]
    this._currMonsterDataPool = [];
};
target.prototype = {
    loadLevelData(level){
        this._level = level;
        this._levelData = L_MONSTER_DATA()[level];
        this._themeID = this._levelData.themeID;
        this._monsterGroup = this._levelData.monsterGroup;
        this._group = 0;
        this._maxGroup = this._monsterGroup.length - 1;
        this._groupIndex = 0;
        this._carrotBlood = this._levelData.blood;
        this._enemyInterval = this._levelData.enemyInterval;
        this._groupInterval = this._levelData.groupInterval;
        this._levelName = this._levelData.levelName;

        this._teamIndex = 0;
        this._teamCount = this._monsterGroup[0].team.length - 1;
        this._teamMonsterIndex = 0;
        this._teamMonsterCount = this._monsterGroup[0].team[0].count - 1;
        this._isMonsterGetFinish = false;

        this._monsterDataArray = [];

        // this._currMonsterDataPool = [];
        this._currMonsterPool = [];
        this._currBulletPool = [];
        this._isWin = false;
        this._loadMonsterData();
    },
    //加载怪物数据
    _loadMonsterData(){
        var group;
        var team;
        var unit;
        var data = {};
        for (group = 0; group < this._monsterGroup.length; group++) {
            this._monsterDataArray[group] = [];
            for (team = 0; team < this._monsterGroup[group].team.length; team++) {
                for (unit = 0; unit < this._monsterGroup[group].team[team].count; unit++) {
                    data = this._getNextMonsterData();
                    this._monsterDataArray[group].push(data);
                }
            }
        }
    },
    //获取下一个怪物数据
    _getNextMonsterData(){
        if (this._isMonsterGetFinish == true) {
            cc.warn("GameManager._getNextMonsterData() : 所有怪物数据已经获取完毕！");
            return;
        }
        var teamData = this._monsterGroup[this._groupIndex].team[this._teamIndex];
        var monsterData = {};
        monsterData.group = this._groupIndex;
        monsterData.name = teamData.name;
        monsterData.blood = teamData.blood;
        monsterData.speed = teamData.speed;
        monsterData.index = this._teamMonsterIndex;

        this._teamMonsterIndex++;
        //是否进入下一队
        if (this._teamMonsterIndex > this._teamMonsterCount) {
            this._enterNextTeam();
            cc.log("是否进入下一队")
        }
        return monsterData;
    },

    //弹出下一组怪物数据
    popNextMonsterGroupData(){
        var groupData = [];
        if (this._group <= this._maxGroup) {
            this._group++;
            groupData = this._monsterDataArray[0];
            this._monsterDataArray.splice(0, 1);

            //抛出事件 组别更新
            /*var event = new cc.Event("gp_update_group");
            event.setUserData({
                group: this._group
            });*/
            cc.log("// cc.eventManager.addListener(event)")
            // cc.eventManager.addListener(event)
        } else {
            groupData = [];
        }
        return groupData;
    },
    // 进入到下一队
    _enterNextTeam : function(){
        this._teamMonsterIndex = 0;
        this._teamIndex++;
        // 进入下一组
        if (this._teamIndex > this._teamCount) {
            this._enterNextGroup();
        }
        // 进入到下一队
        else{
            this._teamMonsterCount = this._monsterGroup[this._groupIndex].team[this._teamIndex].count - 1;
        }
    },
    // 进入到下一组
    _enterNextGroup : function(){
        this._groupIndex++;
        // 添加完毕
        if (this._groupIndex > this._maxGroup) {
            this._isMonsterGetFinish = true;
            return;
        }
        this._teamIndex = 0;
        this._teamCount = this._monsterGroup[this._groupIndex].team.length - 1;
        this._teamMonsterIndex = 0;
        this._teamMonsterCount = this._monsterGroup[this._groupIndex].team[this._teamIndex].count - 1;
    },
    //获取当前组怪物总数
    getCurrGroupMonsterSum(){
        var monsterCount = 0;
        var team = this._monsterGroup[this._group - 1].team;
        for (var ti = 0; ti < team.length; ti++) {
            monsterCount += team[ti].count;
        }
        return monsterCount;
    },

    getGroup(){
        return this._group;
    },
    getMaxGroup(){
        return this._maxGroup;
    },
    getGroupInterval(){
        return this._groupInterval;
    },
    getEnemyInterval(){
        return this._enemyInterval;
    },
};

module.exports = new target();