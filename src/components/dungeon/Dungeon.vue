<template>
  <div>
      <b-row>
          <b-col cols="8">
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
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                :img-src="GetDungeonImageUrl(dungeonValue)"
              >
              </b-carousel-slide>

            </b-carousel>
          </b-col>
          <b-col cols="4">
           
               <b-button 
                block 
                variant="info"
                size="lg"
                @click="$router.push('/')"
                >Enter
              </b-button>

              <br>

              <b-row>
                <b-col>
                  Recommended Level
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  Encounters/Boss
                </b-col>
              </b-row>

              <b-row>
                <!-- {{this.dungeons[dungeonValue]}} -->
                <!-- <ul v-for="(enm, i) in this.dungeons[dungeonValue].enemies" v-bind:key="i">
                  <li>{{enm.name}}</li>
                  <b-row>
                    <b-col>
                      Drop
                    </b-col>
                  </b-row>
                </ul> -->
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
export default {
    components: {
        'dungeon-enemies': DungeonEnemies
    },
    data() {
      return {
        dungeons: [],
        intervalValue: 0,
        dungeonValue: 0
      }
    },
    mixins: [characterService, dungeonHelperMixin],
    methods: {
        onSlideStart(dungeonValue) {
            this.sliding = true
        },
        onSlideEnd(dungeonValue) {
            this.sliding = false
        },
        CheckCharacterId(id){
            this.getDungeons(id).then(res => {
                console.log(res, 'getDungeons');
                this.dungeons = res;
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
        this.CheckCharacterId(this.$route.params.id);
    }
  }
</script>
<style scoped>
    div {
        color: white;
        font-family: "OptimusPrinceps";
    }
</style>