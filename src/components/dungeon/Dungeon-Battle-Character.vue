<template>
    <div>
        <!-- <div :class="{'img-hide': char.life == 0}"> -->
        <img 
            :src="characterClassImage()"
            :class="applyCharacterClass()" 
        />
        <!-- :class="ApplyCharacterClass(char.modelType, char.isAttacked, char.isHealed)" -->
        <!-- </div> -->
    </div>    
</template>
<script>
export default {
    props: {
        character: {}
    },
    methods: {
        characterClassImage() {
            return require(`../../assets/${this.character.type}/${this.character.image}.png`)
        },
        applyCharacterClass() {
            return `${this.character.image}`;
        }
    }
}
</script>
<style scoped>
    div {
        height: 360px;
    }

    .monster-bunny{
        position: relative;
        left: 120px;
        top: 165px;
    }

    .giant-bee{
        position: relative;
        height: 272px;
        left: 153px;
    }

    .killer-bunny{
        position: relative;
        height: 217px;
        left: 281px;
        top: 225px;
    }

    .mutant-frog {
        position: relative;
        height: 238px;
        top: 222px;
        left: 139px;
    }

    /* dungeon 2 */

    .direwolf {
        position: relative;
        height: 210px;
        top: 249px;
        left: 276px;
    }

    .fengalon {
        position: relative;
        height: 279px;
        top: 195px;
        left: 174px;
    }

    .minotaur {
        position: relative;
        top: 161px;
        left: 187px;
    }

    .fenrir {
        position: relative;
        top: 111px;
        left: 135px;
    }

    .tower-guard {
        position: relative;
        left: 119px;
        height: 483px;
    }

    .wandering-hero {
        position: relative;
        height: 312px;
        top: 167px;
        left: 251px;
    }

    .vengeful-spirit {
        position: relative;
        height: 257px;
        top: 200px;
        left: 249px;
    }

    .arch-mage {
        left: 196px;
        position: relative;
        height: 309px;
        top: 181px;
    }

    .ogrim {
        position: relative;
        height: 473px;
        top: 40px;
        left: 58px;
    }

    .hobgoblin {
        position: relative;
        height: 331px;
        top: 154px;
        left: 181px;
    }

    .goblin-shaman {
        position: relative;
        height: 200px;
        top: 244px;
        left: 205px;
    }

    .goblin-warlord {
        position: relative;
        height: 331px;
        top: 120px;
        left: 83px;
    }

    .goblin {
        position: relative;
        height: 385px;
        top: 82px;
        left: 163px;
    }



    .archer {
        position: relative;
        height: 274px;
        top: 182px;
        left: 100px;
    }

    .caster {
        position: relative;
        height: 226px;
        top: 196px;
        left: 118px;
    }

    .lancer {
        position: relative;
        height: 240px;
        top: 192px;
        left: 110px;
    }

    .berserker {
        position: relative;
        height: 240px;
        top: 201px;
        left: 93px;
    }

    .saber {
        position: relative;
        height: 240px;
        top: 205px;
        left: 98px;
    }
    

    
</style>