<template>
    <div>
        <h1>Monster Slayer</h1>

        <login 
            v-show="!isSignUpPage"
            class="login-font"
            @sign-up="signUp($event)"
            @player-info="setPlayerInfo($event)"
            :isLoading="isLoading" 
        >
        </login>

        <user v-show="isSignUpPage"
            :playerAccount="playerAccount"
            :isLoading="isLoading" 
            @back-button="back()"
            >    
            <!-- @validPlayerInfo="checkValidPlayerInfo($event)" "NewGame(true)  @create-account="creatAccount()" -->
        </user>
     
        <center><span class="resultText">{{gameResult}}</span></center>
        <center><span v-show="areYouDead" class="resultText">YOU DIED!</span></center>
    </div>
    
</template>
<script>
import { eventBus } from '../main';
import User from '../components/user-component.vue';
import Login from '../components/login-component.vue';
export default {
    components: {
         'user': User,
         'login': Login
    },
    props: {
        IsGameOver: Boolean,
        gameResult: String,
        areYouDead: Boolean,
        playerAccount: {},
        isSignUpPage: Boolean,
        hasPlayerInfo: Boolean,
        isLoading: Boolean
    },
   data(){
       return {
            text: '',
            validPlayerInfo: false
       }
   },
   methods: {
        NewGame(move){
            this.$emit('new-game', true);
            this.signUp(false);
        },
        // checkValidPlayerInfo(value){
        //     console.log(value, 'checkValidPlayerInfo');
        //     this.validPlayerInfo = value;
        // },
        signUp(value){
            // this.isSignUpPage = value;
            this.$emit('sign-up', value);
        },
        back(){
            this.$emit('sign-up', false);
        },
        setPlayerInfo(value){
            this.$emit('set-account-Info', value);
        },
        creatAccount(){
            // this.$emit('create-account');
            this.signUp(false);
        }

    },
    computed: {
      nameState() {
        return this.text.length > 2 ? true : false
      }
    }
}
</script>
<style>
    h1 {
        color:white;
        font-family: "OptimusPrinceps";
        font-size: 5.5rem;
    }

    @font-face {
        font-family: "Augusta";
        src: url("../assets/fonts/Augusta.ttf");
    }

    @font-face {
        font-family: "OptimusPrinceps";
        src: url("../assets/fonts/OptimusPrinceps.ttf");
    }

     @font-face {
        font-family: "OptimusPrincepsSemiBold";
        src: url("../assets/fonts/OptimusPrincepsSemiBold.ttf");
    }
    
    .menu-font {
         font-family: "OptimusPrinceps";
         /* color:white; */
    }
    .invalid-feedback {
         font-family: "OptimusPrinceps";
         color:white !important;
    }

    .form-control.is-invalid{
        border-color:teal;
    }

    .resultText {
        font-size: 100px;
        color: white ;
        font-family: "OptimusPrincepsSemiBold";
    }

    .login-font {
        font-family: "OptimusPrincepsSemiBold";
    }
</style>