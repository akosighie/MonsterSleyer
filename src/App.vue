<template>
    <div >   
        <b-container 
            fluid="lg" 
            class="main-bg" 
            :style="{ backgroundImage: `url(${dungeonImage})` }">
               
            <loading 
                :active.sync="isLoading" 
                :is-full-page="fullPage">
            </loading>

            <h1 v-show="!isGameBattle">
                Monster Slayer
            </h1>

            <router-view>
            </router-view>
                    
        </b-container>
    </div>        
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { eventBus } from './main';
export default {
    components: {
        'loading': Loading
    },
    data() {
        return {
            isLoading: false,
            fullPage: true,
            dungeonImage: 'abc',
            isGameBattle: false
        }
    },
    created() {
    
        this.dungeonImage = require('./assets/dungeons/grass-field.gif');
        
        
        // refactor code 
        // single eventbus 
        eventBus.$on('loading', isLoading => {
            this.isLoading = isLoading;
        })

        eventBus.$on('dungeonImage', dungeonImage => {
            this.dungeonImage = require(`./assets/dungeons/${dungeonImage}.gif`);
        })

        eventBus.$on('isGameBattle', isGameBattle => {
            this.isGameBattle = isGameBattle;
        })
    }
}
</script>
<style scoped>
    
    h1 {
        color:white;
        font-family: "OptimusPrinceps";
        font-size: 5.5rem;
    }

    .main-bg {
        /* background-image: url('./assets/castle_background.gif'); */
        /* background-image: url('./assets/dungeons/grassland2.gif'); */
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 100%;
        height:600px; 
    }

    @font-face {
        font-family: "OptimusPrinceps";
        src: url("./assets/fonts/OptimusPrinceps.ttf");
    }

    
</style>