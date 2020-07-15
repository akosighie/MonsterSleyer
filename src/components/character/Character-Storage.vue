<template>
    <div>
        <b-row style="margin-left">
            <b-col cols="8" class="col-bordered" style="text-align:left">
                <b-row>
                    <b-col cols="2"> 
                     <h5>Armor</h5>                  
                    </b-col>                  
                </b-row>
                <b-row style="margin-left:10px">
                      <b-col style="text-align:left"> 
                       <ul v-for="equip in equipments" :key="equip.name">
                           <li v-if="equip.item.type=='AMR'">
                             <b-link class="blink" @click.prevent="chosenEquipment(equip.item)"> {{equip.item.name}}</b-link>  
                               </li>
                                   </ul>
                    </b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col cols="2">
                         <h5>Weapon</h5>         
                    </b-col>                  
                </b-row>
                <b-row style="margin-left:10px">
                      <b-col>
                        <ul v-for="equip in equipments" :key="equip.name" >
                           <li v-if="equip.item.type=='WPN'">
                                <b-link class="blink" @click.prevent="chosenEquipment(equip.item)">{{equip.item.name}}</b-link>  
                               </li>
                                   </ul>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="4" class="col-bordered">  
                <div class="marginleft20">
                 <b-row class="text-center">
                     Selected Equipment             
                </b-row>
                  <b-row v-if="selectedEquipment.bonus">
                   {{selectedEquipment.name}}            
                </b-row>
                  <b-row>
                   <b-col cols="6" v-if="selectedEquipment.bonus">
                       <b-row>HP:  {{selectedEquipment.bonus.health}}   </b-row> 
                        <b-row>agi: {{selectedEquipment.bonus.agi}}   </b-row>
                         <b-row>int: {{selectedEquipment.bonus.int}}   </b-row>
                          <b-row>def: {{selectedEquipment.bonus.def}}   </b-row>

                   </b-col>
                     <b-col cols="6" v-if="selectedEquipment.bonus">
                          <b-row>mana: {{selectedEquipment.bonus.mana}}   </b-row> 
                        <b-row>luk: {{selectedEquipment.bonus.luk}}   </b-row>
                         <b-row>off: {{selectedEquipment.bonus.off}}   </b-row>
                     </b-col>
                </b-row>
                <hr>
                <b-row>
                     Current Equipment             
                </b-row>
                  <b-row v-if="currentEquip">
                   {{currentEquip.name}}     
                </b-row>
                  <b-row>
                   <b-col cols="6" v-if="currentEquip.bonus">
                       <b-row>HP:  {{currentEquip.bonus.health}}   </b-row> 
                        <b-row>agi: {{currentEquip.bonus.agi}}   </b-row>
                         <b-row>int: {{currentEquip.bonus.int}}   </b-row>
                          <b-row>def: {{currentEquip.bonus.def}}   </b-row>

                   </b-col>
                     <b-col cols="6" v-if="currentEquip.bonus">
                          <b-row>mana: {{currentEquip.bonus.mana}}   </b-row> 
                        <b-row>luk: {{currentEquip.bonus.luk}}   </b-row>
                         <b-row>off: {{currentEquip.bonus.off}}   </b-row>
                     </b-col>
                </b-row>
                <hr>
                <b-row v-if="selectedEquipment.bonus">
                    <b-button size="sm" variant="light" :disabled="notSuitableClass" @click.prevent="equipSelectedEquipment()">Equip</b-button>
                     <b-button size="sm" variant="light" :disabled="notSuitableClass" @click.prevent="saveEquipments()">Save</b-button>
                </b-row>
                 <b-row >
                   <p v-show="notSuitableClass">The selected equipment is not suitable for class</p>
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
                        selectedEquipment:{},
                        currentEquip:{},
                        notSuitableClass:false                       

            }
    },
    props: {
        equipments: Array,
        currentEquipment:{},
        characterInfo:{}

    },
    mixins: [CharacterService],
    methods:{
        chosenEquipment(equipment){
            console.log(this.characterInfo);

            this.selectedEquipment = equipment;
           if(this.selectedEquipment.type == 'AMR')
           {
               this.currentEquip = this.currentEquipment.armor
           }
           else if(this.selectedEquipment.type == 'WPN')
           {
               this.currentEquip = this.currentEquipment.weapon
           }
           else
           {
               this.currentEquip = {};
           }

           
            this.notSuitableClass = this.characterInfo.classType == this.selectedEquipment.classId ? false : true
        },
        equipSelectedEquipment(){


            this.currentEquip = this.selectedEquipment;

            console.log(this.currentEquip);

        },
        saveEquipments(){

            let equipmentRequest = {}

              if(this.currentEquip.type == 'AMR'){
                  equipmentRequest.armorId = this.currentEquip._id
                  }
                else{
                    equipmentRequest.weaponId = this.currentEquip._id
                    }
                this.updateCharacterEquipment(this.characterInfo.characterId, equipmentRequest).then(resp=>{
                    console.log(resp);
                });
        }
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
</style>