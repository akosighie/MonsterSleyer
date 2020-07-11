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
                <!-- notification -->
            </b-col>
        </b-row>
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

export default {
    components: {
        'dungeon-battle-lifebar': DungeonBattleLifebar,
        'dungeon-battle-character': DungeonBattleCharacterVue,
        'dungeon-battle-moveset': DungeonBattleMoveset
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
        playerSkills: {}
      }
    },
    mixins: [   localStorageHelper, 
                dungeonService, 
                characterService, 
                characterClassMixin],
    methods: {
        GetCharacterDetails(characterId){
            console.log(characterId, 'acctid db');
            this.getCharacter(characterId).then(res => {
                console.log(res, 'getCharacter response');
                this.myPlayer.stats = res.stats;
                this.myPlayer.name = res.name;
                this.myPlayer.image = this.getCharacterClassTypeImage(res.classType);
                this.myPlayer.stats.maxHealth = res.stats.health;
                console.log(res.stats.health, 'skills'); 
                this.myPlayer.stats.maxMana = res.stats.mana;
                this.playerSkills = res.skills;
                
                console.log(this.myPlayer, 'myPlayer');
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
        lifeMinMax(value, maxValue){
            return Math.min(Math.max(parseInt(value), 0), maxValue);
        },
        actionValue(move, isPlayer = true){
            console.log(move, 'actionValue');
            //charId = 0

            // let charReverseId = (charId == 0) ? 1 : 0;
            // this.Character[charId].isAttacked = false;
            // this.Character[charId].isHealed = false;
            
            if (move.target == "enemy"){
                console.log('inside enemy');
                // this.Character[charReverseId].isAttacked =  true;
                // this.Character[charReverseId].life = this.LifeMinMax(this.Character[charReverseId].life - move.damage);
                // this.Character[charId].mana =  this.LifeMinMax(this.Character[charId].mana - move.manaCost);
                this.enemy.stats.health = this.lifeMinMax(this.enemy.stats.health - move.damage, this.enemy.stats.maxHealth );
                this.myPlayer.stats.mana = this.lifeMinMax(this.myPlayer.stats.mana - move.cost, this.myPlayer.stats.maxMana);
                
                console.log(this.enemy.stats.health, 'this.enemy.health');

                // this.ActionLogs.name = this.Character[charId].name;
                // this.ActionLogs.action = move.name;
            }

            // if (move.MoveType == 2) {
            //     this.Character[charId].isHealed =  true;
            //     if(move.manaCost > 0){
            //     // focus
            //     this.Character[charId].mana = this.LifeMinMax(this.Character[charId].mana - move.manaCost);
            //     this.Character[charId].life = this.LifeMinMax(this.Character[charId].life + move.amount);
            //     }
            //     else {
            //     // Cure
            //     this.Character[charId].mana = this.LifeMinMax(this.Character[charId].mana + move.amount);
            //     }  
                
            //     this.ActionLogs.name = this.Character[charId].name;
            //     this.ActionLogs.action = move.name;
            // } 

        //     if(this.Character[charId].life == 0){
        //         this.IsGameOver = true;
        //         this.GameResult = `${this.Character[charReverseId].name} wins`; 
        //         this.AreYouDead = (charId == 0) ? true : false; 
        //     }
        //     else {
        //         if(charId == 0){
        //         setTimeout(() => {
        //             this.EnemyMove();
        //             if(this.Character[0].life == 0){
        //             this.LifeChecker(charId, charReverseId);
        //             }
                    
        //         }, 3000); 
        //         }

        //     }
        }
    },
    created() {
        eventBus.$emit('loading', true);
 
        this.enterDungeonRequest.characterId = this.getCharacterId();
        this.enterDungeonRequest.dungeonId = this.$route.params.id;

        console.log(this.enterDungeonRequest, 'enterDungeonRequest');

        // get enemies
        this.postEnterDungeon(this.enterDungeonRequest).then(res => {
            console.log(res, 'getEnterDungeon');
            this.dungeon = res.dungeon;
            this.enemy.stats = res.enemy.stats;
            this.enemy.name = res.enemy.name;
            this.enemy.image = res.enemy.image;
            this.enemy.stats.maxHealth = res.enemy.stats.health; 
            this.enemy.stats.maxMana = res.enemy.stats.mana;
            console.log(this.dungeon , 'dungeon');
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

        // get character
        this.GetCharacterDetails(this.getCharacterId());

    }
}
</script>
<style>
    div {
        color: white;
        font-family: "OptimusPrinceps";
    }

</style>