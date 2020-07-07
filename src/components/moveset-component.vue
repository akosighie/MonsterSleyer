<template>

    <!-- {{character}} -->
    <!-- <p>{{character.name}}</p> -->
    <div >
        <!-- <span 
        v-for="move of character"
        v-bind:key="move">
            <b-button
                :disabled="characterMana < move.manaCost"
                variant="info"
                @click="PlayerAction(move)"
                class="button-font"
                 v-b-tooltip.hover :title="ToolTipName(move)">
                {{move.name}}
            </b-button>
           
            &nbsp;
        </span> -->
            <!-- <h5>{{CharMoveSkill(1)}}</h5> -->
            <!-- characterClass.find(c => c.id == playerAccount.classType).skill -->
          <span v-for="move of CharMoveSkill(playerAccount.classType)">
            <b-button
                :disabled="characterMana < move.manaCost"
                variant="info"
                @click="PlayerAction(move)"
                class="button-font"
                 v-b-tooltip.hover :title="ToolTipName(move)">
                {{move.name}}
            </b-button>
        </span>

    </div>
</template>

<script>
import { characterClassMixin } from '../mixins/characterClass';
import { eventBus } from '../main';

export default {
    props: {
        character: {},
        characterMana: Number,
        playerAccount: {}
    },
    mixins: [characterClassMixin],
    methods: {
        PlayerAction(move){
                this.$emit('enemyTurn-value', true);
                this.$emit('pass-value', move);
        },
        ToolTipName(move){
            return ` ${move.description} | Damage: ${move.damage} | Amount: ${move.amount} | Mana Cost: ${move.manaCost}`;
        }
    }

}
</script>
<style>

    /* b-button {
        padding-right: 150px;

    } */

    .button-font{
        color:white;
        font-family: "OptimusPrinceps";
    }

    .tooltip-inner {
        color:white;
        font-family: "OptimusPrinceps";
    }

</style>