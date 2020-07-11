<template>
    <div class="moveset-height">
        <b-container>
           
            <b-row align-v="center">
                 <!-- :disabled="characterMana < move.manaCost"
                
                @click="PlayerAction(move)"
                class="button-font"
                 v-b-tooltip.hover :title="ToolTipName(move)" -->

            
                <b-button
                        v-b-tooltip.hover title="toolTipName(skill)" 
                        variant="info">
                        Attack
                        
                </b-button>

                 <b-button 
                        variant="info">
                        Focus
                </b-button>


                <span v-for="(skill, i) in skills" v-bind:key="i" >
                    <b-button 
                        class="button-space"  
                        variant="info"
                        :disabled="playerMana < skill.cost"
                        @click="playerAction(skill)"
                        v-b-tooltip.hover :title="toolTipName(skill)">
                        {{skill.name}}
                    </b-button>
                </span>

                <b-button 
                        variant="info"
                        @click="confirm"
                        >
                        Give Up
                </b-button>
              
                

            </b-row>
        </b-container>
        
    </div>    
</template>
<script>
import { eventBus } from '../../main';
export default {
    props: {
        skills: {},
        playerMana: 0
    },
    methods: {
        toolTipName(skill){
            return ` target: ${skill.target} | Damage: ${skill.damage} | Mana Cost: ${skill.cost}`;
        },
        playerAction(skill){
                console.log(skill, 'skill');
                // this.$emit('enemyTurn-value', true);
                this.$emit('pass-value', skill);
        },
        confirm() {
            this.$alertify.confirmWithTitle("Monster Slayer", 
                "Are you sure you want to give up?", () => 
                this.giveUp()
                ,() => 
                console.log("test"))
        },
        giveUp() {
            this.$router.push(`/dungeon`)
            eventBus.$emit('isGameBattle', false)
        }
    },
    created() {
      
    }
    
}
</script>
<style scoped>
    .moveset-height {    
        height: 130px;
    }

    
    button {
        margin: 0px 5px 10px 5px;

    } 

    

</style>