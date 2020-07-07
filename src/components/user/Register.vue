<template>
    <div>
        <h3>Registration</h3>
        <b-row>
            <b-col>
               <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Full Name</label>
                </b-col>
              
                <b-col >
                  <b-form-input id="fullName">
                      <!--  v-model.lazy="playerAccount.fullName"
                      @blur="$v.playerAccount.fullName.$touch()" -->
                  </b-form-input>

                  <p>
                      <!-- v-if="!$v.playerAccount.fullName.required 
                    && $v.playerAccount.fullName.$error" -->
                    FullName is Required!
                  </p>
                </b-col>
              </b-row>
              
              <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Email</label>
                </b-col>
              
                <b-col >
                <b-form-input id="input-Email">
                    <!-- v-model.lazy="playerAccount.email"
                  @blur="$v.playerAccount.email.$touch()" -->
                </b-form-input>
                <p>
                    <!--  v-if="!$v.playerAccount.email.required 
                  && $v.playerAccount.email.$error" -->
                  Email is Required
                </p>
                 <p  >
                    <!-- v-if="!$v.playerAccount.email.email 
                  && $v.playerAccount.email.$error" -->
                  Enter Valid Email
                </p>
           
                </b-col>
              </b-row>

              <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Username</label>
                </b-col>
              
                <b-col >
                <b-form-input id="username">
                <!--  v-model="playerAccount.username"
                  @blur="$v.playerAccount.username.$touch()" -->
                </b-form-input>
                <p >
                    <!-- v-if="!$v.playerAccount.username.required  
                  && $v.playerAccount.username.$error" -->
                  Username is Required
                </p>
           
                </b-col>
              </b-row>

              <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Password</label>
                </b-col>
              
                <b-col >
                <b-form-input id="input-password"  
                  type="password">
                  <!-- v-model.lazy="playerAccount.password"
                 @blur="$v.playerAccount.password.$touch()" -->
                </b-form-input>
                <p >
                    <!-- v-if="!$v.playerAccount.password.required
                  && $v.playerAccount.password.$error" -->
                  Password is Required
                </p>    
                </b-col>
              </b-row>

              <b-row align-h="start">
                <div>
                  
                </div>
                <b-col offset-md="3"> 
                        <b-button
                            variant="info"
                            size="lg"
                            @click="$router.push('/login')"
                        >Back
                        </b-button>

                        <b-button
                            variant="info"
                            size="lg"
                            @click="$router.push('/character')"
                           
                            >Create
                        </b-button>
                        <!--  :disabled="isDisabled" -->
                </b-col>
              </b-row>
            </b-col>
              
            <b-col>
              <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Character Name</label>
                </b-col>
              
                <b-col >
                  <b-form-input id="input-default"  >
                      <!--  v-model.lazy="playerAccount.characterName"
                      @blur="$v.playerAccount.characterName.$touch()" -->
                  </b-form-input>
                  <p >
                      <!--  v-if="!$v.playerAccount.characterName.maxLength || !$v.playerAccount.characterName.minLength || !$v.playerAccount.characterName.required && $v.playerAccount.characterName.$error" -->
                    Character Name must have a minimum length of 6 and Maximum length of 20
                  </p>
                </b-col>
              </b-row>

              <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Character Class</label>
                  <!-- {{characterClass}} -->
                </b-col>
              
                <b-col >
                    <b-form-select v-model="classType">
                      <option v-for=" (cclass, i) in characterClass.filter(c => c.id != 6)"
                        :key="i" 
                        :value="cclass.id">{{cclass.name}}
                      </option>
                    </b-form-select>  
                </b-col>
              </b-row>
              <b-row align-h="center">
                <b-col cols="4">
                      <img  
                      class="saber"
                      :src="CharacterModelUrl(classType)" 
                      />
                </b-col> 
              </b-row>
                 
            </b-col>
        </b-row>
     
    </div>
</template>
<script>
import { characterClassMixin } from '../../mixins/characterClass';
export default {
    data(){
       return {
            classType: 1
       }
    },
    mixins: [characterClassMixin],
}
</script>

<style scoped>
    div {
        color: white;
        font-family: "OptimusPrinceps";
    }

    .saber {
    height: 250px;
    }
</style>