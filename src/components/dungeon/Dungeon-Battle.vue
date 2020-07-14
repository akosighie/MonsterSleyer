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
            <b-col>
                <!-- {{playerSkills}} -->
                <dungeon-battle-moveset
                    :skills="playerSkills"
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
            </div>
            <b-button class="mt-3" block @click="dialogClose()">Close Me</b-button>
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
            type: 'players'
        },
        playerSkills: {},
        enemySkills: {},
        isEnemyLoaded: false,
        isPlayerAttackFirst: true,
        gameResult: '',
        isGameOver: false,
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
                this.myPlayer.stats.maxHealth = res.stats.health;
                this.myPlayer.stats.maxMana = res.stats.mana;
                this.playerSkills = this.baseSkills.concat(res.skills);
                
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
                 //this.enemyAction();
                // console.log(this.enemySkills, 'res.enemy.skills');
                
                // console.log(this.dungeon , 'dungeon');
                eventBus.$emit('loading',false);
                eventBus.$emit('isGameBattle', true);
                eventBus.$emit('dungeonImage', this.dungeon.image);
            })
            .catch(error => {
                    console.log(error, 'error');
                    const errorObj = error.bodyText;
                    this.$alertify.alertWithTitle("Login", JSON.parse(errorObj).error); 
                    eventBus.$emit('loading',false);
                    this.$router.push(`/unauthorized`);
            });
        },
        enemyAction(){
            const skillLength = this.enemySkills.length;
            // eventBus.$emit('loading',true);
           
            setTimeout(() => {
                if (!this.isGameOver) {
                    const skillId =  this.getRandomValue(skillLength);
                    console.log(this.enemySkills[skillId], 'enemy attack');
                    this.actionValue(this.enemySkills[skillId], false);
                }
            }, 3000);

            
            
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
                    // physical attack
                    if (move.type = "P"){
                        
                        totalDamage = parseInt(move.damage) + parseInt(this.myPlayer.stats.off);
                        console.log(totalDamage, 'totalDamage');
                        this.enemy.stats.health = this.roundOffMinMaxValue((this.enemy.stats.health + this.enemy.stats.def) - totalDamage, this.enemy.stats.maxHealth );
                        
                    }

                    // magic attack
                    else {
                        totalDamage = parseInt(move.damage) + parseInt(this.myPlayer.stats.int);
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
                        totalDamage = parseInt(move.damage) + parseInt(this.enemy.stats.off);
                        this.myPlayer.stats.health = this.roundOffMinMaxValue(this.myPlayer.stats.health + this.myPlayer.stats.def - totalDamage, this.myPlayer.stats.maxHealth);
                    }
                    else {
                        totalDamage = parseInt(move.damage) + parseInt(this.enemy.stats.int);
                        this.myPlayer.stats.health = this.roundOffMinMaxValue(this.myPlayer.stats.healst + this.myPlayer.stats.int - totalDamage, this.myPlayer.stats.maxHealth);
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

                    // rest
                    if (move.type == "r"){
                        this.myPlayer.stats.mana = this.roundOffMinMaxValue(this.myPlayer.stats.mana - move.damage, this.myPlayer.stats.maxMana);
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

            // this.isPlayerAttackFirst = Boolean(Number(this.getRandomValue(2)));

            this.isPlayerAttackFirst = (this.myPlayer.stats.agi > this.enemy.stats.agi);
            
            console.log(this.isPlayerAttackFirst);

            this.ActionLogs.name = this.myPlayer.stats.agi > this.enemy.stats.agi ? this.myPlayer.name : this.enemy.name;
            this.ActionLogs.notificationType = 0;

        },
        getRandomValue(value) {
            // return random number 
            // value = count of enemy skill
            return Math.floor(Math.random() * Math.floor(value));
        },
        dialogClose(){
            // this.isGameBattle = false;
            eventBus.$emit('isGameBattle', false);
            this.$router.push(`/dungeon`);
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
                    this.isGameOver = true;
                    this.$bvModal.show('modal-result');
                    this.gameResult = 'You Win'
                }
            },
            deep: true
        },
        myPlayer: {
            handler: function(val){
                // console.log(this.myPlayer.stats.health, 'my health');
                if (this.myPlayer.stats.health == 0)
                {
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