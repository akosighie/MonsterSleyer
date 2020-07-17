<template>
    <div>
      <b-row>
          test abc
      </b-row>
      <b-row>
          <b-col cols="5">
            <b-row>
                <b-col>
                    Skills
                </b-col>
            </b-row> 
            <b-row>
                <ul v-for="(ski, index)  in skills" v-bind:key="index">
                    <li>{{ski.name}}</li>
                </ul>
                <!-- {{skills[0].name}} -->
            </b-row>
              <b-row>
                   <b-button id="show-btn" @click="showmodal">Open Skill Inventory</b-button>
                </b-row>
          </b-col>
          <b-col cols="8">
              <b-row>
               
            </b-row>
          </b-col>
          
      </b-row>
      <b-modal
        title="Choose Skills" 
        ref="skill-modal" 
        hide-footer  
        size="lg" 
        no-close-on-backdrop
        :header-bg-variant="headerBgVariant"
        :body-bg-variant="bodyBgVariant">
      <div class="d-block text-center">
        <character-skill-inventory
            :currentSkills="skills"
            :characterInfo="characterInfo">
          </character-skill-inventory>
      </div>
    </b-modal>
    </div>
</template>
<script>
import CharacterSkillInventory from './Character-Skill-Inventory';

export default {
    data(){
        return{
             bodyBgVariant: 'secondary',
             headerBgVariant: 'dark',
        }
    },
    components: {
      'character-skill-inventory':CharacterSkillInventory
    },
    props: {
      skills: {},
      characterInfo:{}
    },
    methods:{
         showmodal(){
            this.$refs['skill-modal'].show();
        }
    }
}
</script>
<style scoped>
  .modal-content {
        background-color: rgba(23,67,88,0.5);
  }
</style>