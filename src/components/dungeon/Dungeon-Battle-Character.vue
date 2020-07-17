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

    .crixalis {
        position: relative;
        height: 328px;
        top: 191px;
        left: 64px;
    }

    .giant-cactuar {
        position: relative;
        height: 498px;
        left: 119px;
        top: -25PX;
    }

    .mummy {
        position: relative;
        height: 251px;
        top: 239px;
        left: 199px;
    }

    .cactuar {
        position: relative;
        height: 174px;
        top: 275px;
        left: 236px;
    }

    .sand-wyrm {
        position: relative;
        height: 339px;
        top: 156px;
        left: 15px;
    }


    /* wind shrine */

    .avian {
        position: relative;
        height: 291px;
        top: 195px;
        left: 49px;
    }

    .gargoyle {
        position: relative;
        height: 364px;
        top: 103px;
        left: 175px;
    }

    .garuda {
        position: relative;
        height: 456px;
    }

    .hippogriff {
        position: relative;
        height: 449px;
        top: 25px;
        left: 115px;
    }

    .treasure-hunter {
        position: relative;
        height: 265px;
        top: 211px;
        left: 193px;
    }

    /* sunken ruins */

    .slime {
        position: relative;
        height: 240px;
        top: 263px;
    }

    .megadolon {
        position: relative;
        height: 364px;
        top: 84px;
        left: 100px;
    }

    .kraken {
        position: relative;
        height: 368px;
        top: 143px;
    }

    .godzilla {
        position: relative;
        height: 481px;
        left: 126px;
    }

    .leviathan {
        position: relative;
        height: 515px;
        bottom: 32px;
        left: 70px;
    }

    /* snow cave */

    .jack-frost {
        position: relative;
        height: 194px;
        top: 245px;
        left: 263px;
    }

    .polar-bear {
        position: relative;
        height: 400px;
        top: 116px;
        left: 69px;
    }

    .yeti {
        position: relative;
        height: 390px;
        top: 81px;
    }

    .werewolf {
        position: relative;
        height: 389px;
        top: 101px;
        left: 126px;
    }

    .winter-wyvern {
        position: relative;
        height: 400px;
        top: 91px;
        left: 23px;
    }

    .snow-queen {
        position: relative;
        height: 240px;
        top: 201px;
        left: 264px;
    }

    /* hell */
    .satyr {
        position: relative;
        height: 240px;
        top: 222px;
        left: 247px;
    }

    .barbatos {
        position: relative;
        height: 360px;
        top: 81px;
        left: 136px;
    }

    .efreet {
        top: 79px;
        position: relative;
        height: 369px;
        left: 168px;
    }


    .cerberus {
        position: relative;
        height: 299px;
        top: 176px;
    }

    .thanatos {
        position: absolute;
        top: 130px;
        left: 91px;
    }

    .Hades {
        position: relative;
        height: 380px;
        top: 100px;
        left: 172px;
    }

    /* Dragon King's Lair */
    
    .black-dragon {
        position: relative;
        height: 443px;
        right: 81px;    
    }

    .sky-dragon {
        position: relative;
        height: 533px;
        right: 59px;
        bottom: 50px;
    }

    .fire-dragon {
        position: relative;
        height: 491px;
        bottom: 39px;
        right: 49px;
    }

    .bahamut {
        position: relative;
        height: 485px;
        bottom: 38px;
        left: 41px;
    }

    /* labyrinth */
    .baal {
        position: relative;
        height: 445px;
        top: 62px;
        left: 152px;
    }

    .Asmodeus {
        position: relative;
        height: 414px;
        top: 55px;
        left: 101px;
    }

    .astaroth {
        position: relative;
        height: 421px;
        left: 137px;
        top: 18px;
    }

    .amon {
        position: relative;
        height: 412px;
        top: 56px;
        left: 52px;
    }

    .beelzebub {
        position: relative;
        height: 486px;
        bottom: 51px;
        left: 14px;
    }

    
    /* sanctuary */
    
    .surtur {
        position: relative;
        height: 396px;
        top: 100px;
        left: 157px;
    }

    .Artemis {
        position: relative;
        height: 256px;
        top: 221px;
        left: 159px;
    }

    .Poseidon {       
        position: relative;
        height: 326px;
        top: 159px;
        left: 19px;
    }

    .ares {
        position: relative;
        height: 323px;
        top: 163px;
        left: 178px;
    }

    .zues {
        position: relative;
        height: 280px;
        top: 190px;
        left: 238px;
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