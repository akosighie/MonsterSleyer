<template>
    <div>
      <b-container>
         <b-row style="padding-top:10px;">
              <b-col cols="2">
                      <b-avatar
                        :src="characterImage()">
                      </b-avatar>
                      
                      <b-row>
                        <label class="char-name"> {{character.name}}</label> 
                      </b-row>
              </b-col>
              <b-col>
                  <b-progress
                    :value="character.stats.health"
                    :max="character.stats.maxHealth" 
                    height="25px"
                    variant="danger"
                    class="b-progress-font"
                    show-value
                    >
                    <!--  show-value  
                      :max="character.stats.health" -->
                  </b-progress>
                  <b-progress 
                    :value="character.stats.mana" 
                    :max="character.stats.maxMana"
                    height="15px" 
                    class="b-progress-font"
                    show-value>
                </b-progress>
              </b-col>
            </b-row>
      </b-container>
    </div>  
</template>
<script>
export default {
    data() {
      return {
        enemyLifeDefualt: 0
      }
    },
    props: {
        character: {}
    },
    methods: {
        characterImage() {
            return require(`../../assets/${this.character.type}/${this.character.image}.png`)
        }
    },
    created() {
      // this.enemyLifeDefualt = character.stats.health;
    }
}
</script>
<style scoped>
   div {
        color: white;
        font-family: "OptimusPrinceps";
    }
</style>