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
                  <b-form-input id="fullName" 
                  v-model="PlayerAccount.fullName"
                  :class="{hasErrors: $v.PlayerAccount.fullName.$error}"
                  @blur="$v.PlayerAccount.fullName.$touch()">
                  </b-form-input>
                 <p class="error-message" v-if="!$v.PlayerDetails.fullName.required && $v.PlayerDetails.fullName.$error">Full Name is required</p>
                </b-col>
              </b-row>
              
              <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Email</label>
                </b-col>              
                <b-col >
                <b-form-input id="input-Email" 
                v-model="PlayerDetails.email"
                :class="{hasErrors: $v.PlayerDetails.email.$error}"
                @blur="$v.PlayerDetails.email.$touch()">
                </b-form-input>
                <p class="error-message" v-if="!$v.PlayerDetails.email.required && $v.PlayerDetails.email.$error">Email is required</p>
                <p class="error-message" v-if="!$v.PlayerDetails.email.email">Invalid email</p>           
                </b-col>
              </b-row>

              <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Username</label>
                </b-col>              
                <b-col >
                <b-form-input id="username"
                v-model="PlayerDetails.username"
                :class="{hasErrors: $v.PlayerDetails.username.$error}"
                @blur="$v.PlayerDetails.username.$touch()">
                </b-form-input>
                <p class="error-message" v-if="!$v.PlayerDetails.username.required && $v.PlayerDetails.username.$error">Username is required</p>
                <p class="error-message" v-if="!$v.PlayerDetails.username.minLength">Minumum length is 6</p>           
                </b-col>
              </b-row>

              <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Password</label>
                </b-col>
              
                <b-col >
                <b-form-input id="input-password"  
                  type="password"
                  v-model="PlayerDetails.password"
                  :class="{hasErrors: $v.PlayerDetails.password.$error}"
                  @blur="$v.PlayerDetails.password.$touch()">
                </b-form-input>
                <p class="error-message" v-if="!$v.PlayerDetails.password.required && $v.PlayerDetails.password.$error">Password is required</p>
                <p class="error-message" v-if="!$v.PlayerDetails.password.minLength">Minumum length is 6</p> 
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
import {required, email, minLength, maxLength} from 'vuelidate/lib/validators';
export default {
    data(){
       return {
            classType: 1
       }
    },
     validations:{

          PlayerAccount:{
                fullName:{required},
                email:{required, email},
                username:{required, minLength: minLength(6)},
                password:{required, minLength: minLength(6)},
                characterName:{required, minLength: minLength(6), maxLength:maxLength(20)},
                classType: {required}
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
    .hasErrors {
    border-color: red;
}
.error-message {
    color: red;
}
</style>
