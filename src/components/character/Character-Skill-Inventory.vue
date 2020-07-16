<template>
    <div>
        <b-row style="margin-left">
            <b-col cols="8" class="col-bordered" style="text-align:left">
                <b-row>
                    <b-col cols="6">
                         <h5>Skills Tab</h5>         
                    </b-col>                  
                </b-row>
                <b-row style="margin-left:10px">
                      <b-col>
                        <ul v-for="skill in listOfSkills" :key="skill.name" >
                           <li>
                                <b-link class="blink" @click.prevent="chosenSkill(skill)">{{skill.name}}</b-link>  
                               </li>
                               </ul>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="4" class="col-bordered">  
                <div class="marginleft20">
                 <b-row class="text-center">
                     Selected Skill             
                </b-row>
                  <b-row v-if="selectedSkill">
                   {{selectedSkill.name}}            
                </b-row>
                  <b-row>
                   <b-col cols="12" v-if="selectedSkill">
                       <b-row>Damage:       {{selectedSkill.damage}}   </b-row> 
                        <b-row>Cost:        {{selectedSkill.cost}}   </b-row>
                         <b-row>Lvl Req.:   {{selectedSkill.lvlReq}}   </b-row>
                           <b-row>Target:   {{selectedSkill.target}}   </b-row>
                            <b-row v-if="selectedSkill.type == 'P'">Type:   Pysical Atk  </b-row>
                             <b-row v-if="selectedSkill.type == 'M'">Type:   Magical Atk   </b-row>
                   </b-col>
                </b-row>
                <hr>
                <b-row>
                     Current Skills             
                </b-row>
                  <b-row>
                   <b-col cols="12">
                        <ul v-for="curSkill in currentSkills" :key="curSkill.name" >
                           <li class="curSkill">
                                <span>{{curSkill.name}}</span> <b-img class="imageBtn" src='../src/assets/logo.png' width="10px" height="10px" @click.prevent="removeSkill(curSkill)" />
                               </li>
                                   </ul>
                   </b-col>
                </b-row>
                <hr>
                <b-row >
                    <b-button size="sm" variant="light" :disabled="currentSkills.length >= 4 || skillAlreadyEquip" @click.prevent="equipSelectedSkill()">Equip</b-button>
                     <b-button size="sm" variant="light" @click.prevent="saveSkills()">Save</b-button>
                </b-row>
                 <b-row >
                   <p v-show="skillAlreadyEquip">The selected skill is already equiped!</p>
                    <p v-show="successUpdate">Skills successfully updated!</p>
                </b-row>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import CharacterService from '../../mixins/characterService';

export default {
    data(){
        return{
            selectedSkill:{},
            skillAlreadyEquip:false,
            listOfSkills:[],
            skillIdList: [],
            successUpdate:false                      
        }
    },
    props: {
        currentSkills:{},
        characterInfo:{}

    },
    mixins: [CharacterService],
    methods:{
        chosenSkill(skill){

             this.selectedSkill = skill;
              var valObj = this.currentSkills.filter(function(obj){
                  if(obj.name == skill.name) return obj.name;
                  });
                  
                  this.skillAlreadyEquip = valObj.length > 0 ? true: false;
        },
        equipSelectedSkill(){
            this.currentSkills.push(this.selectedSkill);
        },
        saveSkills(){
            for (var skill of this.currentSkills) {
                this.skillIdList.push(skill._id);
            }
                
            this.updateCharacterSkills(this.characterInfo.characterId, this.skillIdList).then(resp=>{

                 this.successUpdate = resp.status == 200 ? true:false;

                 setTimeout(() => {
                     this.successUpdate = false;
                     }, 5000);
            });
        },
        removeSkill(skill){            
            let index = this.currentSkills.findIndex(obj => obj === skill);
            this.currentSkills.splice(index, 1);
        }
    },
    created(){

        this.getCharacterListOfSkills(this.characterInfo.characterId).then(res => {
            this.listOfSkills = res;
        }).catch(error => {
                console.log(error, 'error');
                const errorObj = error.bodyText;
                this.$alertify.alertWithTitle("Login", JSON.parse(errorObj).error); 
                eventBus.$emit('loading',false);
                this.$router.push(`/unauthorized`);
            });
    }
}
</script>
<style scoped>

ul {
    padding: 0;
    list-style-type: none;
}
li {
    width: 33%;
    float: left;
    list-style: none;
    text-decoration: none;
}

.curSkill{
    width: 100%;
     list-style: none;
     text-decoration: none;
}

.blink{
     text-decoration: none;
     color:white;
}

.blink:hover {
  color:lightgray;
  text-decoration: underline;
}

.col-bordered{
    border: 2px solid white;
}

.marginleft20{
    margin-left: 10px;
}

.imageBtn:hover{
    cursor: pointer;
    border: solid 1px white;
}
</style>