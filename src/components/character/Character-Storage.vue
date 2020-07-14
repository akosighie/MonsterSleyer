<template>
    <div>
        <b-row>
            <b-col cols="6">
                <b-row>
                    <b-col>
                        Armor                      
                    </b-col>
                    <b-col>
                       <ul v-for="equip in equipments" :key="equip.name">
                           <li v-if="equip.item.type=='AMR'">
                                {{equip.item.name}}
                               </li>
                                   </ul>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Weapon
                    </b-col>
                    <b-col>
                        <ul v-for="equip in equipments" :key="equip.name">
                           <li v-if="equip.item.type=='WPN'">
                                {{equip.item.name}}
                               </li>
                                   </ul>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="6">
                test
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    props: {
        equipments: Array
    },
    methods:{
        showTest(){
            console.log(this.equipments);
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
       width: 50%;
  float: left;
  list-style: none;
}
</style>