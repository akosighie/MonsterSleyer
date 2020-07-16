<template>
  <div>
      <b-row>
          <b-col cols="7">

            <b-carousel
              id="carousel-1"
                v-model="dungeonValue"
                controls
                indicators
                background="#ababab"
                img-width="1024"
                img-height="400"
                style="text-shadow: 1px 1px 2px #333 height: 500px !important;"
                :interval="intervalValue"
              >
              
              <b-carousel-slide
                v-for="(dng, i) in this.dungeons"
                v-bind:key="i" 
                :caption="dng.name"
                
                :img-src="GetDungeonImageUrl(dungeonValue)"
              >
              <!-- :text="setText(dng)"-->
              </b-carousel-slide>
              <!-- {{this.dungeons}} -->
            </b-carousel>
            <!-- {{this.dungeons[0].locked}} -->
           
    
      <b-button
        variant="info"
        size="sm"
        @click="$router.push('/')"
        style="float:right"
      >Logout
      </b-button>
      
      <b-button
        variant="info"
        size="sm"
        @click="gotoCharacter()"
        style="float:right"
        >Character
      </b-button>
      

          </b-col>
          <b-col cols="5">
           
               <b-button 
                block 
                variant="info"
                size="lg"
                :disabled="this.dungeons[dungeonValue].locked"
                @click="$router.push(`/dungeon/${dugeonId}`)"
                >{{buttonTextDesc(this.dungeons[dungeonValue].locked)}}
              </b-button>

              <br>

              <b-row>
                <!-- {{this.dungeons[dungeonValue]}} -->
                <b-col>
                  Recommended Level
                </b-col>
                <b-col>
                  {{this.dungeons[dungeonValue].recommendedLevel}}
                </b-col>
              </b-row>

              <b-row v-if="dungeonValue > 0">
                <b-col>
                  Requirements:
                </b-col>
                 <b-col>
                  Defeat {{this.dungeons[dungeonValue].bossReq.name}} 
                </b-col>
              </b-row>

              <b-row v-show="!this.dungeons[dungeonValue].locked">
                <b-col>
                  Encounters/Boss
                </b-col>
              </b-row>

              <b-row v-show="!this.dungeons[dungeonValue].locked">
                <dungeon-enemies
                    :dungeon="this.dungeons[dungeonValue].enemies"
                > 

                </dungeon-enemies>
              </b-row>

              
           
           
          </b-col>
      </b-row>
    
  </div>
</template>

<script>
import characterService  from '../../mixins/characterService'; 
import { eventBus } from '../../main';
// import DungeonCarousel from './Dungeon-Carousel';
import DungeonEnemies from './Dungeon-Enemies';
import { dungeonHelperMixin } from '../../mixins/dungeonHelper';
import localStorageHelper from '../../mixins/localStorageHelper';
export default {
    components: {
        'dungeon-enemies': DungeonEnemies
    },
    data() {
      return {
        dungeons: [
          {
            enemies: []
          }
        ],
        intervalValue: 0,
        dungeonValue: 0,
        isDungeonLocked: true

      }
    },
    mixins: [characterService, dungeonHelperMixin, localStorageHelper],
    methods: {
        onSlideStart(dungeonValue) {
            this.sliding = true
        },
        onSlideEnd(dungeonValue) {
            this.sliding = false
        },
        CheckCharacterId(id){
            this.getCharacterDungeons(id).then(res => {
                this.dungeons = res;
                console.log(this.dungeons, 'dungeons');
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
        gotoCharacter(){
          this.$router.push(`/character/${this.getAccountId()}`);
        },
        buttonTextDesc(isLocked) {
          return (isLocked ? 'Unavailable' : 'Enter');
        }
    },
    computed: {
      dugeonId(){
        console.log('test');
        return this.dungeons[this.dungeonValue]._id;
      }
    },
    created() {
        eventBus.$emit('loading', true);
        // get values from localStorage
        this.CheckCharacterId(this.getCharacterId());
    },
  }
</script>
<style scoped>
    div {
        color: white;
        font-family: "OptimusPrinceps";
    }

    button {
      margin: 1px 1px 1px 1px;
    }
</style>