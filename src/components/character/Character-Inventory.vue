<template>
    <div>
        <b-row>
            <b-col cols="4">
                <b-row>
                    <b-col>
                        Equipments
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Armor
                    </b-col>
                    <b-col v-if="equipment.armor">
                        {{equipment.armor.name}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Weapon
                    </b-col>
                    <b-col v-if="equipment.armor">
                        {{equipment.weapon.name}}
                    </b-col>
                </b-row>
                <b-row>
                   <b-button id="show-btn" @click="showmodal">Open Inventory</b-button>
                </b-row>
            </b-col>
            <b-col cols="8">
                
            </b-col>
        </b-row>

        <b-modal
        title="Choose Equipments" 
        ref="my-modal" 
        hide-footer  
        size="lg" 
        no-close-on-backdrop
        :header-bg-variant="headerBgVariant"
        :body-bg-variant="bodyBgVariant">
      <div class="d-block text-center">
        <character-storage
            :equipments="storageItems"
            :currentEquipment="equipment"
            :characterInfo="characterInfo">
          </character-storage>
      </div>
    </b-modal>
    </div>
</template>
<script>
import CharacterStorage from './Character-Storage';

export default {
      components: {
        'character-storage':CharacterStorage
    },
    data(){
        return{
             bodyBgVariant: 'secondary',
             headerBgVariant: 'dark',
        }
    },
    props: {
        equipment: {},
        storageItems: Array,
        characterInfo:{}
    },
    methods:{
        showmodal(){
            this.$refs['my-modal'].show();
        }
    }
}
</script>
<style scoped>


</style>