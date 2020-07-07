<template>
    <div>
      
            <b-row>
              <b-col cols="2">
                <div>
                      <b-avatar
                        :src="CharacterModelUrl(character.classType)">
                      </b-avatar>
                      <label class="char-name"> {{character.name}}</label> 
                </div>
              
              </b-col>
              <b-col>
                  <b-progress 
                    :value="character.life" 
                    :max="max" 
                    height="25px"
                    variant="danger"
                    class="b-progress-font"
                    show-progress>
                    </b-progress>
                  
                  <b-progress 
                    :value="character.mana" 
                    :max="max"
                    height="15px" 
                    class="b-progress-font"
                    show-progress>
                    </b-progress>
              </b-col>
            </b-row>
           
    </div>
   

</template>
<script>
import { characterClassMixin } from '../mixins/characterClass';
export default {
    props: {
        character: {}
    },
    mixins: [characterClassMixin],
    data() {
      return {
        value: 45,
        max: 100
      }
    },
     methods: {
      randomValue() {
        this.value = Math.random() * this.max
      },
      lifeTextDisplay(value){
        return `${value} / 100`;
      }
    }
}
</script>

<style scoped>
  /* .blood-color{
    background-color: #8A0303 !important;
  } */

  .b-progress-font {
    font-family: "OptimusPrinceps";
  }
  .center {
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
  }

  .char-name{
    color:white;
    font-family: "OptimusPrinceps";
  }

 

</style>