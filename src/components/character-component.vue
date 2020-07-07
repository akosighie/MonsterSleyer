<template>
    <div class="">
        <b-row>
            <b-col v-for="(char, index) in Character">
                
                <div :class="{'img-hide': char.life == 0}">
                     <img 
                    :key="index"
                    :class="ApplyCharacterClass(char.modelType, 
                    char.isAttacked, char.isHealed)" 
                    :src="CharacterModelUrl(char.classType)" 
                    />
                </div>
               
            </b-col>

            
        </b-row>
    </div>
    
</template>
<script>
import { characterClassMixin } from '../mixins/characterClass';
export default {
    props: {
        Character: {}
    },
    mixins: [characterClassMixin],
    methods: {
        ApplyCharacterClass(modelType, IsAttacked, IsHealed){
            return `${modelType} ${(IsAttacked ? 'img-damage': '')} ${(IsHealed ? 'img-shake': '')}`;
        }
    }
}
</script>
<style scoped>
    div {
        height: 100%;
    }

    .knight {
        position: relative;
        left: 199px; 
        top: 302px;
        height: 200px;
    }

    .dragon {
        position: relative;
        left: -61px; 
        top: -100px;
        height: 450px;
    }

    .img-shake {
        animation-direction: alternate-reverse; 
        animation: shake 0.5s; 
        animation-iteration-count: initial;
    }
    
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); } 
    } 

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

   .img-damage {
        animation: blink 1s;
        animation-iteration-count: initial;
    }

    .img-hide {
        opacity: 0;
    }


</style>