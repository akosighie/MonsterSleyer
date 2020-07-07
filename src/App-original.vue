<template>



  <div id="app" class="full-height">

     <loading :active.sync="isLoading" 
        :is-full-page="fullPage"></loading>
        

        <!--  :can-cancel="true" 
        :on-cancel="onCancel" -->
        <!-- <label><input type="checkbox" v-model="fullPage">Full page?</label>
      <button @click.prevent="doAjax">fetch Data</button> -->


    <b-container class="bg-img">
      <b-row  class="lifebar" v-show="!this.IsGameOver">
        <!-- lifebar -->
        <b-col v-for="(char, i) in Character" v-bind:key="i">
             <lifebar 
             :key="i"
             :character="char" >
             </lifebar>
        </b-col>
      </b-row>
      <b-row>
        <b-col>

          <gamemenu 
            v-show="this.IsGameOver"
            @new-game="NewGame($event)"
            @sign-up="SignUp($event)"
            @set-account-Info="setAccountInfo($event)"
            :IsGameOver="IsGameOver"
            :gameResult="GameResult"
            :areYouDead="AreYouDead"
            :playerAccount="playerAccount"
            :isSignUpPage="isSignUpPage"
            :hasplayerAccount="hasplayerAccount"
            :isLoading="isLoading">
          </gamemenu>
          <!--         @create-account="createAccount($event)" -->

          <character 
            v-show="!this.IsGameOver"
            :character="Character"
            :classType="playerAccount.classType">
          </character> 
          
        </b-col>
      </b-row>
      <hr >
     
      <!-- Moveset -->
      <b-row>
        <b-col v-show="!this.IsGameOver" >
          <moveset v-show="!IsEnemyTurn"
          :character="Character[0].Moves"
          :characterMana="Character[0].mana"
          :playerAccount="playerAccount"
          @enemyTurn-value="IsEnemyTurnValue($event)"
          @pass-value="ActionValue($event)"
          >
          </moveset>
        </b-col>

        <b-col  v-show="!this.IsGameOver">
          <gamelog 
          :gamelogData="ActionLogs"
          >
          </gamelog>    
        </b-col>
      </b-row>

    </b-container>
   
  </div>
</template>

<script>
import LifeBar from './components/lifebar-component.vue';
import MoveSet from './components/moveset-component.vue';
import GameLog from './components/gamelog-component.vue';
import CharacterCom from './components/character-component.vue';
import GameMenu from './components/gamemenu-component.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { eventBus } from './main';


import { BProgress } from 'bootstrap-vue'
import { characterClassMixin } from './mixins/characterClass';

import {required, email } from 'vuelidate/lib/validators';

export default {
  components: {
    'lifebar': LifeBar,
    'moveset': MoveSet,
    'gamelog' : GameLog,
    'character' : CharacterCom,
    'gamemenu': GameMenu,
    'loading': Loading
  },
  mixins: [characterClassMixin],
  name: 'app',
  data () {
    return {
      isLoading: false,
      fullPage: true,
      title: 'Monster Slayer',
      playerAccount: {
        fullName: '',
        username: '',
        password: '',
        email: '',
        characterName: '',
        classType: 1 
      },
      Character: [{
        name: '',
        type: 'Player',
        life: 100,
        mana: 100,
        classType: 1,
        modelType: 'knight',
        isAttacked: false,
        isHealed: false         
        },
        {
        name: 'Yharnam',
        type: 'Enemy',
        life: 100,
        mana: 100,
        classType: 6,
        modelType: 'dragon',
        isAttacked: false,
        isHealed: false     
        }],
        ActionLogs: { 
          name: '',
          action: ''
        },
        IsGameOver: true,
        IsEnemyTurn: false,
        GameResult: '',
        AreYouDead: false,
        hasplayerAccount: false,
        isSignUpPage: false 
    }
  }, 
  methods: {
    ActionValue(move, charId = 0){

      let charReverseId = (charId == 0) ? 1 : 0;
      this.Character[charId].isAttacked = false;
      this.Character[charId].isHealed = false;
      
      if (move.MoveType == 1){
        this.Character[charReverseId].isAttacked =  true;
        this.Character[charReverseId].life = this.LifeMinMax(this.Character[charReverseId].life - move.damage);
        this.Character[charId].mana =  this.LifeMinMax(this.Character[charId].mana - move.manaCost);
        
        this.ActionLogs.name = this.Character[charId].name;
        this.ActionLogs.action = move.name;
      }

      if (move.MoveType == 2) {
         this.Character[charId].isHealed =  true;
        if(move.manaCost > 0){
          // focus
          this.Character[charId].mana = this.LifeMinMax(this.Character[charId].mana - move.manaCost);
          this.Character[charId].life = this.LifeMinMax(this.Character[charId].life + move.amount);
        }
        else {
          // Cure
          this.Character[charId].mana = this.LifeMinMax(this.Character[charId].mana + move.amount);
        }  
        
        this.ActionLogs.name = this.Character[charId].name;
        this.ActionLogs.action = move.name;
      } 

      if(this.Character[charId].life == 0){
        this.IsGameOver = true;
        this.GameResult = `${this.Character[charReverseId].name} wins`; 
        this.AreYouDead = (charId == 0) ? true : false; 
      }
      else {
        if(charId == 0){
          setTimeout(() => {
            this.EnemyMove();
            if(this.Character[0].life == 0){
              this.LifeChecker(charId, charReverseId);
            }
            
          }, 3000); 
        }

      }

      
    },
    EnemyMove(){
      var enemyMove = this.getRandomMove();
      if( this.Character[1].mana > this.CharMoveSkill(6)[enemyMove].manaCost){
        this.ActionValue(this.CharMoveSkill(6)[enemyMove], 1);
        this.IsEnemyTurn = false;
      }
      else {
        this.EnemyMove();
      }
      
    },
    getRandomMove: function() {
            return Math.floor(Math.random() * Math.floor(5));
    },
    NewGame(value){
        this.IsGameOver = !value;
        this.Character.forEach(char => {
          char.life = 100;
          char.mana = 100;
          char.isAttacked = false,
          char.isHealed = false
        });
        this.IsEnemyTurn = false,
        this.GameResult = '',
        this.AreYouDead = false
        
        //delete
        this.removeLocalStorageValue();

        //refactor
        this.setLocalStorage();
        
    },
    LifeMinMax(value){
      return Math.min(Math.max(parseInt(value), 0), 100);
    },
    IsEnemyTurnValue(value){
      this.IsEnemyTurn = value;
    },
    LifeChecker(charId, charReverseId){
        this.IsGameOver = true;
        this.GameResult = `${this.Character[charReverseId].name} wins`; 
        this.AreYouDead = (charId == 0) ? true : false; 
    },
    setLocalStorage(){
      
      if(this.isplayerAccountHasValue()){
        console.log('getItem');
        let _player = JSON.parse(localStorage.getItem("playerAccount"));
        console.log(_player);
        this.playerAccount.characterName = _player.characterName;
        this.playerAccount.classType = _player.classType;
        
      }
      else {
        console.log('setItem');
        localStorage.setItem("playerAccount", JSON.stringify(this.playerAccount));
        this.hasplayerAccount = true;
      }

      this.Character[0].name = this.playerAccount.characterName;
      this.Character[0].classType = this.playerAccount.classType
   
    },
    removeLocalStorageValue(){
      localStorage.removeItem("playerAccount");
    },
    isplayerAccountHasValue(){
      return localStorage.getItem("playerAccount") != null ? true : false;
    },
    SignUp(value){
      this.isSignUpPage = value;
      this.playerAccount.fullName = '';
      this.playerAccount.email = '';
      this.playerAccount.characterName = '';
      this.playerAccount.classType = 1;
      this.playerAccount.password = '';
      this.playerAccount.username = '';
      this.GameResult = '';
    },
    setAccountInfo(accountInfo){
      console.log(accountInfo, 'accountInfo');
      this.playerAccount.characterName = accountInfo.name;
      this.playerAccount.classType = accountInfo.classType;

      this.NewGame(true);
    },
    // createAccount(){
    //   alert(JSON.stringify(this.playerAccount), 'createAccount Info');
      
    // }
  },
  created() {
      this.hasplayerAccount = this.isplayerAccountHasValue(); //JSON.stringify(localStorage.getItem("playerAccount")) != 'null' ? true : false;
      this.Character[0].name =  this.hasplayerAccount.username;
      eventBus.$on('loading', isLoading => {
            this.isLoading = isLoading;
      })
  }
}
</script>
<style>

  html, body {
    height: 100%;
  }

  .full-height {
    height: 650px;
    display: flex;
  }


  .bg-img {
    background-image: url('./assets/castle_background.gif');
    /* //height: 545px; */
    height: 100%;
    background-position: initial; 
    background-repeat: no-repeat; 
    background-size: cover;
  }

  .lifebar{
    padding-top: 12px;
  }

      @font-face {
        font-family: "OptimusPrinceps";
        src: url("./assets/fonts/OptimusPrinceps.ttf");
    }
    


</style>
