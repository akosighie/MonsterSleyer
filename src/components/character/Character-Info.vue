<template>
    <div>
        <b-row>
            <b-col cols="3">
                <center>
                        <img 
                class="img-size"
                :src="CharacterModelUrl(characterInfo.classType)" 
                />
                </center>
        
            </b-col>
            <b-col cols="6">
            <b-row>
                <b-col>
                    Account Id
                </b-col>
                <b-col>
                    {{characterInfo.accountId}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    Name
                </b-col>
                <b-col>
                    {{characterInfo.name}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    Class Type
                </b-col>
                <b-col>
                    {{characterInfo.classType}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    Level
                </b-col>
                <b-col>
                    {{characterInfo.level}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    Next Level
                </b-col>
                <b-col>
                    {{characterInfo.nextLevelExp}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    Total Exp
                </b-col>
                <b-col>
                    {{characterInfo.totalExp}}
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="3">
            <b-row>
                Dungeon Access
            </b-row>
            <b-row>
                 <ul v-for="(dun, index)  in characterInfo.dungeonAccess" v-bind:key="index">
                    <li>{{dun.name}}</li>
                </ul>
            </b-row>
        </b-col>



        </b-row>
       
        
    </div>    
</template>
<script>
import { characterClassMixin } from '../../mixins/characterClass';
export default {
    props: {
        characterInfo: {}
    },
    mixins: [characterClassMixin]
    
}
</script>
<style scoped>

    .img-size {
        height: 200px;
    }
</style>