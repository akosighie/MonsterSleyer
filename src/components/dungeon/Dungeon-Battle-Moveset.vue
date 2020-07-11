<template>
    <div class="moveset-height">
        <b-container>
           
            <b-row align-v="center">
                 <!-- :disabled="characterMana < move.manaCost"
                
                @click="PlayerAction(move)"
                class="button-font"
                 v-b-tooltip.hover :title="ToolTipName(move)" -->

            
                <b-button 
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
                        variant="danger">
                        Run
                </b-button>
              
                

            </b-row>
        </b-container>
        
    </div>    
</template>
<script>
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