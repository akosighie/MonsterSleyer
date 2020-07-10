<template>
    <div>
        <!-- character lifebar -->
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
    </div>
</template>
<script>
import { eventBus } from '../../main';
import localStorageHelper from '../../mixins/localStorageHelper';
import dungeonService  from '../../mixins/dungeonService';
import DungeonBattleLifebar from './Dungeon-Battle-Lifebar'; 
import DungeonBattleCharacter from './Dungeon-Battle-Character'
import DungeonBattleCharacterVue from './Dungeon-Battle-Character.vue';
import characterService  from '../../mixins/characterService'; 
import { characterClassMixin } from '../../mixins/characterClass';

export default {
    components: {
        'dungeon-battle-lifebar': DungeonBattleLifebar,
        'dungeon-battle-character': DungeonBattleCharacterVue
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
        }
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
<style scoped>

</style>