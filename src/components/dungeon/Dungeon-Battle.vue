<template>
    <div>
        <b-container class="bv-example-row bv-example-row-flex-cols">
        <b-row>
            <b-col>
                <dungeon-battle-lifebar
                    :character="myPlayer">
                </dungeon-battle-lifebar>
            </b-col>
            <b-col>
                <dungeon-battle-lifebar
                    :character="enemy">
                </dungeon-battle-lifebar>
            </b-col>
        </b-row>
        <!-- character model -->
        <b-row>
            <b-col>
                  <dungeon-battle-character
                    :character="myPlayer">
                </dungeon-battle-character>
            </b-col>
            <b-col>
                <dungeon-battle-character
                    :character="enemy">
                </dungeon-battle-character>
            </b-col>
        </b-row>
        <b-row>
            <b-col >
                <dungeon-battle-moveset
                    v-show="!IsEnemyTurn"
                    :skills="playerSkills"
                    :equipments="myPlayer.equipments"
                    :playerMana="myPlayer.stats.mana"
                    @pass-value="actionValue($event)"
                    >

                </dungeon-battle-moveset>
            </b-col>
            <b-col>
                <dungeon-battle-notification
                    :gamelogData="ActionLogs"
                    >

                </dungeon-battle-notification>
            </b-col>
        </b-row>

        <!-- modal -->
        <!-- <b-button id="show-btn" @click="$bvModal.show('modal-result')">Open Modal</b-button> -->

        <b-modal
            no-close-on-backdrop 
            id="modal-result" 
            class="ms-modal" 
            hide-footer>
            <template v-slot:modal-title>
            <!-- Using <code>$bvModal</code> Methods -->
            Game Result
            </template>
            <div class="d-block text-center">
            <h3>{{gameResult}}</h3>
            <b-row v-show="battleResult.lvlUp && isPlayerWin">
                <b-col>
                    <h4>Level Up!</h4> 
                </b-col>
            </b-row>
            <!-- {{ isEmpty(battleResult.drop)}} -->
            <b-row v-show="isPlayerWin && !isEmpty(battleResult.drop) "  >
                <b-col>
                    Drop
                </b-col>
                <b-col>
                    {{battleResult.drop}}
                </b-col>
            </b-row>
            <b-row v-show="isPlayerWin">
                <b-col>
                    Experience: 
                </b-col>
                <b-col>
                    {{battleResult.exp}}
                </b-col>
            </b-row>
            <!-- {{battleResult}} -->
            <b-row v-show="isPlayerWin && !isEmpty(battleResult.newSkills)">
                <b-col>
                   New skill 
                </b-col>
                <b-col>
                    {{battleResult.newSkills}}
                </b-col>
            </b-row>
            <b-row v-show="isPlayerWin && !isEmpty(battleResult.unlockedDungeons)">
                <b-col>
                    Unlocked Dungeon
                </b-col>
                <b-col>
                    {{battleResult.unlockedDungeons}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button class="mt-3" block @click="reEnterDungeon()">Re-Enter Dungeon</b-button>
                </b-col>
                <b-col>
                    <b-button class="mt-3" block @click="dialogClose()">Close</b-button>
                </b-col>
            </b-row>
            </div>
            
         

        </b-modal>

        </b-container>
        <!-- character lifebar -->
        
    </div>
</template>
<script>
import { eventBus } from '../../main';
import localStorageHelper from '../../mixins/localStorageHelper';
import dungeonService  from '../../mixins/dungeonService';
import DungeonBattleLifebar from './Dungeon-Battle-Lifebar'; 
import DungeonBattleCharacter from './Dungeon-Battle-Character'
import DungeonBattleCharacterVue from './Dungeon-Battle-Character.vue';
import DungeonBattleMoveset from './Dungeon-Battle-Moveset';
import characterService  from '../../mixins/characterService'; 
import { characterClassMixin } from '../../mixins/characterClass';
import DungeonBattleNotification from './Dundeon-Battle-Notification';

export default {
    components: {
        'dungeon-battle-lifebar': DungeonBattleLifebar,
        'dungeon-battle-character': DungeonBattleCharacterVue,
        'dungeon-battle-moveset': DungeonBattleMoveset,
        'dungeon-battle-notification': DungeonBattleNotification
    },
     data() {
      return {
        enterDungeonRequest: {
            characterId: '',
            dungeonId: ''
        },
        battleDungeonResult: {
            dungeonId: '',
            enemyId: '',
            characterId: ''
        },
        battleResult: {},
        dungeon: {},
        enemy: {
            name: '',
            stats: {
                mana: 0,
                health: 0
            },
            image: 'giant-bee',
            type: 'enemies'
        },
        myPlayer: {
            name: '',
            stats: {},
            image: 'saber',
            type: 'players',
            equipments: {},
            equipmentBonus: {
                health: 0,
                mana: 0,
                off: 0,
                agi: 0,
                int: 0,
                luk: 0,
                def: 0
            }
        },
        playerSkills: {},
        enemySkills: {},
        isEnemyLoaded: false,
        isPlayerAttackFirst: true,
        IsEnemyTurn: false,
        gameResult: '',
        isGameOver: false,
        isPlayerWin: false,
        skillId: 0,
        skillLength: 0,
        ActionLogs: { 
          name: '',
          notificationType: 0, //0 - game notification, 1 - battle notification
          skillType: 0, // 0 - mana, 1 - heal
          totalDamage: 0,
          move: null
        },
        baseSkills: [
            {
                _id: 0,
                type: 'P',
                target: 'enemy',
                name: 'attack',
                cost: '0',
                damage: '10'
            },
            {
                _id: 1,
                type: 'r', //rest
                target: 'self',
                name: 'focus',
                cost: '0',
                damage: '-10'
            }
        ]
      }
    },
    mixins: [   localStorageHelper, 
                dungeonService, 
                characterService, 
                characterClassMixin],
    methods: {
        GetCharacterDetails(characterId){
            this.getCharacter(characterId).then(res => {
              
                this.myPlayer.stats = res.stats;
                this.myPlayer.name = res.name;
                this.myPlayer.image = this.getCharacterClassTypeImage(res.classType);
                // added equipment bonus
                
                this.myPlayer.equipments = res.equipment;
                this.playerSkills = this.baseSkills.concat(res.skills);
                // console.log(res, 'character result');
                // console.log(this.myPlayer.equipments, 'character result');

                // equipment 
                this.myPlayer.equipmentBonus.health = this.myPlayer.equipments.armor.bonus.health + this.myPlayer.equipments.weapon.bonus.health;
                this.myPlayer.equipmentBonus.mana = this.myPlayer.equipments.armor.bonus.mana + this.myPlayer.equipments.weapon.bonus.mana;
                this.myPlayer.equipmentBonus.off = this.myPlayer.equipments.armor.bonus.off + this.myPlayer.equipments.weapon.bonus.off; 
                this.myPlayer.equipmentBonus.agi = this.myPlayer.equipments.armor.bonus.agi + this.myPlayer.equipments.weapon.bonus.agi;
                this.myPlayer.equipmentBonus.int = this.myPlayer.equipments.armor.bonus.int + this.myPlayer.equipments.weapon.bonus.int;
                this.myPlayer.equipmentBonus.luk = this.myPlayer.equipments.armor.bonus.luk + this.myPlayer.equipments.weapon.bonus.luk;
                this.myPlayer.equipmentBonus.def = this.myPlayer.equipments.armor.bonus.def + this.myPlayer.equipments.weapon.bonus.def;


                // get health and mana plus equipment bonus 
                this.myPlayer.stats.health =  res.stats.health + this.myPlayer.equipmentBonus.health;
                this.myPlayer.stats.mana = res.stats.mana + this.myPlayer.equipmentBonus.health;
                this.myPlayer.stats.maxHealth = this.myPlayer.stats.health; //
                this.myPlayer.stats.maxMana = this.myPlayer.stats.mana;

                console.log(res.stats.health + this.myPlayer.equipmentBonus.health, 'test');
                console.log(`${this.myPlayer.stats.health} / ${this.myPlayer.stats.maxHealth}`);

                // dungeon Battle Result Request
                this.battleDungeonResult.characterId = characterId;
                
                eventBus.$emit('loading', false);
            })
            .catch(error => {
                console.log(error, 'error');
                const errorObj = error.bodyText;
                this.$alertify.alertWithTitle("Login", JSON.parse(errorObj).error); 
                eventBus.$emit('loading', false);
                this.$router.push(`/unauthorized`);
            });
        
        },
        getEnemyDetails(){
            this.postEnterDungeon(this.enterDungeonRequest).then(res => {
                this.dungeon = res.dungeon;
                this.enemy.stats = res.enemy.stats;
                this.enemy.name = res.enemy.name;
                this.enemy.image = res.enemy.image;
                this.enemy.stats.maxHealth = res.enemy.stats.health; 
                this.enemy.stats.maxMana = res.enemy.stats.mana;
                this.enemySkills = this.baseSkills.concat(res.enemy.skills);
                this.isEnemyLoaded = true;

                // dungeon battle result
                this.battleDungeonResult.dungeonId = res.dungeon._id;
                this.battleDungeonResult.enemyId = res.enemy._id;
                
                eventBus.$emit('loading',false);
                eventBus.$emit('isGameBattle', true);
                eventBus.$emit('dungeonImage', this.dungeon.image);
            })
            .catch(error => {
                    console.log(error, 'error 2');
                    this.$router.push(`/unauthorized`);
                    const errorObj = error.bodyText;
                    this.$alertify.alertWithTitle("Login", JSON.parse(errorObj).error); 
                    eventBus.$emit('loading',false);
                    this.$router.push(`/unauthorized`);
            });
        },
        enemyAction(){
            this.skillLength = this.enemySkills.length;
            this.IsEnemyTurn = true;
                    
            setTimeout(() => {
                if (!this.isGameOver) {
                    this.skillId =  this.getRandomValue(this.skillLength);
                    this.enemyManaChecker();
                }
            }, 4000);
        },
        enemyManaChecker() {
            if (this.enemy.stats.mana > this.enemySkills[this.skillId].cost) {
                console.log('mana okay');
                 this.actionValue(this.enemySkills[this.skillId], false);
                 this.IsEnemyTurn = false;
            }
            else {
                // console.log('recheck again');
                this.skillId =  this.getRandomValue(this.skillLength);
                this.enemyManaChecker(this.skillId);
            }
        },
        getRandomNumber(value) {
            // return random number 
            // value = count of enemy skill
            return Math.floor(Math.random() * Math.floor(value));
        },
        roundOffMinMaxValue(value, maxValue){
            return Math.min(Math.max(parseInt(value), 0), maxValue);
        },
        actionValue(move, isPlayer = true){
            let totalDamage = 0;
            
            if (move.target == "enemy") {
                
                if (isPlayer) {

                    // player move 
                    if (move.type = "P"){
                        // player physical attack
                        totalDamage = parseInt(move.damage) + parseInt(this.myPlayer.stats.off) + parseInt(this.myPlayer.equipmentBonus.off);
                        
                        // enemy def > player attack
                        if (this.enemy.stats.def > totalDamage) {
                            totalDamage = 0;
                        }
                        else {
                            this.enemy.stats.health = this.roundOffMinMaxValue((this.enemy.stats.health + this.enemy.stats.def) - totalDamage, this.enemy.stats.maxHealth );
                        }
                        
                    }
                    else {
                        // player magic attack
                        totalDamage = parseInt(move.damage) + parseInt(this.myPlayer.stats.int) + parseInt(this.myPlayer.equipmentBonus.int);
                        this.enemy.stats.health = this.roundOffMinMaxValue((this.enemy.stats.health + this.eneny.stats.int) - totalDamage, this.enemy.stats.maxHealth );
                    }

                    this.myPlayer.stats.mana = this.roundOffMinMaxValue(this.myPlayer.stats.mana - move.cost, this.myPlayer.stats.maxMana);

                    this.ActionLogs.name = this.myPlayer.name;
                    this.ActionLogs.move = move;
                    this.ActionLogs.totalDamage = totalDamage;
                    this.ActionLogs.notificationType = 1;

                }
                else {
                    // enemy move    
                    if (move.type = "P"){ 

                        // enemy physical attack
                        totalDamage = parseInt(move.damage) + parseInt(this.enemy.stats.off);
                        
                        // player defense > enemy attack
                        if (this.myPlayer.stats.def + this.myPlayer.equipmentBonus.def > totalDamage) {
                            totalDamage = 0;
                        }
                        else 
                        {   
                            this.myPlayer.stats.health = this.roundOffMinMaxValue(this.myPlayer.stats.health + this.myPlayer.stats.def + this.myPlayer.equipmentBonus.def - totalDamage, this.myPlayer.stats.maxHealth);
                        }

                    }
                    else {
                        // enemy magic attack
                        totalDamage = parseInt(move.damage) + parseInt(this.enemy.stats.int);
                        this.myPlayer.stats.health = this.roundOffMinMaxValue(this.myPlayer.stats.healst + this.myPlayer.stats.int + this.myPlayer.equipmentBonus.int - totalDamage, this.myPlayer.stats.maxHealth);
                    }
                    
                    this.enemy.stats.mana = this.roundOffMinMaxValue(this.enemy.stats.mana - move.cost, this.enemy.stats.maxMana);

                    this.ActionLogs.name = this.enemy.name;
                    this.ActionLogs.move = move;
                    this.ActionLogs.totalDamage = totalDamage;
                    this.ActionLogs.notificationType = 1;
                }
                
            }
            else if (move.target == "self"){
                
                // player move
                if (isPlayer) {

                    // rest / add mana
                    if (move.type == "r"){
                        console.log(this.myPlayer.stats.int, 'this.myplayer.stats.int');
                        this.myPlayer.stats.mana = this.roundOffMinMaxValue((this.myPlayer.stats.mana - move.damage) + this.myPlayer.stats.int, this.myPlayer.stats.maxMana);
                        this.ActionLogs.skillType = 0;
                    }
                    // player skill with heal
                    else {
                        this.myPlayer.stats.health = this.roundOffMinMaxValue(this.myPlayer.stats.health - move.damage, this.myPlayer.stats.maxHealth);
                        this.myPlayer.stats.mana = this.roundOffMinMaxValue(this.myPlayer.stats.mana - move.cost, this.myPlayer.stats.maxMana);
                        this.ActionLogs.skillType = 1;
                    }

                    this.ActionLogs.name = this.myPlayer.name;
                    this.ActionLogs.move = move;
                    this.ActionLogs.notificationType = 1;

                }
                // enemy move
                else {
                    // rest
                    if (move.type == "r"){
                        this.enemy.stats.mana = this.roundOffMinMaxValue(this.enemy.stats.mana - move.damage, this.myPlayer.stats.maxMana);
                        this.ActionLogs.skillType = 0;
                    }
                    // enemy skill with heal
                    else {
                        this.enemy.stats.health = this.roundOffMinMaxValue(this.enemy.stats.health - move.damage, this.enemy.stats.maxHealth);
                        this.enemy.stats.mana = this.roundOffMinMaxValue(this.enemy.stats.mana - move.cost, this.enemy.stats.maxMana);
                        this.ActionLogs.skillType = 1;
                    }

                    this.ActionLogs.name = this.enemy.name;
                    this.ActionLogs.move = move;
                    this.ActionLogs.notificationType = 1;
                }
            }

            if (this.myPlayer.stats.health == 0 || this.enemy.stats.health == 0) {
                this.isGameOver == true;
            }

            if(isPlayer) {
               this.enemyAction();
            }
        },
        determinefirstAttacker(){

            this.isPlayerAttackFirst = (this.myPlayer.stats.agi > this.enemy.stats.agi);
            
            // console.log(this.isPlayerAttackFirst);

            this.ActionLogs.name = (this.myPlayer.stats.agi + this.myPlayer.equipmentBonus.agi) > this.enemy.stats.agi ? this.myPlayer.name : this.enemy.name;
            this.ActionLogs.notificationType = 0;

        },
        getRandomValue(value) {
            // return random number 
            // value = count of enemy skill
            return Math.floor(Math.random() * Math.floor(value));
        },
        reEnterDungeon(){
            // this.$router.push(`/dungeon/${this.$route.params.id}`).catch(()=>{});
            this.$router.go();
        },
        dialogClose(){
            // this.isGameBattle = false;
            eventBus.$emit('isGameBattle', false);
            this.$router.push(`/dungeon`);
        },
        isEmpty(value){
            return (value == null || value.length === 0 || value == "");
        },
        dungeonBattleResult() {
             this.postDungeonBattle(this.battleDungeonResult).then(res => {
                this.battleResult = res;
                this.$bvModal.show('modal-result');
                eventBus.$emit('loading',false);
            })
            .catch(error => {
                    const errorObj = error.bodyText;
                    this.$alertify.alertWithTitle("Login", JSON.parse(errorObj).error); 
                    eventBus.$emit('loading',false);
                    this.$router.push(`/unauthorized`);
            });

        }
    },
    computed: {
        
        // firstAttack(){
        //     return this.getRandomValue(2);            
        // },
        // getRandomValue(value) {
        //     // return random number 
        //     // value = count of enemy skill
        //     return Math.floor(Math.random() * Math.floor(value));
        // }
    },
    watch: {
        isEnemyLoaded: function(){
            // this.enemyAction();
            this.determinefirstAttacker();

            // determines if enemy will attack first
            if(!this.isPlayerAttackFirst){
                this.enemyAction();
            }
        },
        enemy: {
            handler: function(val){
                if (this.enemy.stats.health == 0)
                {
                    eventBus.$emit('loading', true);
                    this.isPlayerWin = true;
                    this.isGameOver = true;
                    this.gameResult = 'You Win'
                    this.dungeonBattleResult();
               
                }
            },
            deep: true
        },
        myPlayer: {
            handler: function(val){
                // console.log(this.myPlayer.stats.health, 'my health');
                if (this.myPlayer.stats.health == 0)
                {
                    this.isPlayerWin = false;
                    this.isGameOver = true;
                    this.$bvModal.show('modal-result');
                    this.gameResult = 'You died'
                }
            },
            deep: true
        }
    },
    created() {
        eventBus.$emit('loading', true);
 
        this.enterDungeonRequest.characterId = this.getCharacterId();
        this.enterDungeonRequest.dungeonId = this.$route.params.id;

        // console.log(this.enterDungeonRequest, 'enterDungeonRequest');

        // get enemies
        this.getEnemyDetails();

        // get character
        this.GetCharacterDetails(this.getCharacterId());

        this.determinefirstAttacker();
    }

}
</script>
<style>
    div {
        color: white;
        font-family: "OptimusPrinceps";
    }


     .alertify .ajs-header {
         background-color: rgba(23,67,88,0.5);
         color: white;
    }


    .alertify .ajs-dialog {
          background-color: rgba(23,67,88,0.5);
    }
    .alertify .ajs-footer{
          background-color: rgba(23,67,88,0.5)
    }

    .alertify .ajs-footer .ajs-buttons .ajs-button {
        color: white;
    }

    .modal-content {
        background-color: rgba(23,67,88,0.5);
    }
</style>