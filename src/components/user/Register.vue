<template>
    <div>
        <h3>Registration</h3>
        <b-row>
            <b-col>
               <b-row align-h="start" class="marginBottom10">
                <b-col cols="3">
                  <label for="">Full Name</label>
                </b-col>
              
                <b-col >
                  <b-form-input id="fullName" 
                  v-model="PlayerAccount.fullName"
                  :class="{hasErrors: $v.PlayerAccount.fullName.$error}"
                  @blur="$v.PlayerAccount.fullName.$touch()">
                  </b-form-input>
                 <p class="error-message" v-if="!$v.PlayerAccount.fullName.required && $v.PlayerAccount.fullName.$error">Full Name is required</p>
                </b-col>
              </b-row>
              
              <b-row align-h="start" class="marginBottom10">
                <b-col cols="3">
                  <label for="">Email</label>
                </b-col>              
                <b-col >
                <b-form-input id="input-Email" 
                v-model="PlayerAccount.email"
                :class="{hasErrors: $v.PlayerAccount.email.$error}"
                @blur="$v.PlayerAccount.email.$touch()">
                </b-form-input>
                <p class="error-message" v-if="!$v.PlayerAccount.email.required && $v.PlayerAccount.email.$error">Email is required</p>
                <p class="error-message" v-if="!$v.PlayerAccount.email.email">Invalid email</p>           
                </b-col>
              </b-row>

              <b-row align-h="start" class="marginBottom10">
                <b-col cols="3">
                  <label for="">Username</label>
                </b-col>              
                <b-col >
                <b-form-input id="username"
                v-model="PlayerAccount.username"
                :class="{hasErrors: $v.PlayerAccount.username.$error}"
                @blur="$v.PlayerAccount.username.$touch()">
                </b-form-input>
                <p class="error-message" v-if="!$v.PlayerAccount.username.required && $v.PlayerAccount.username.$error">Username is required</p>
                <p class="error-message" v-if="!$v.PlayerAccount.username.minLength">Minumum length is 6</p>           
                </b-col>
              </b-row>

              <b-row align-h="start" class="marginBottom10">
                <b-col cols="3">
                  <label for="">Password</label>
                </b-col>
              
                <b-col >
                <b-form-input id="input-password"  
                  type="password"
                  v-model="PlayerAccount.password"
                  :class="{hasErrors: $v.PlayerAccount.password.$error}"
                  @blur="$v.PlayerAccount.password.$touch()">
                </b-form-input>
                <p class="error-message" v-if="!$v.PlayerAccount.password.required && $v.PlayerAccount.password.$error">Password is required</p>
                <p class="error-message" v-if="!$v.PlayerAccount.password.minLength">Minumum length is 6</p> 
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
                            @click.prevent="saveAccount()">Create</b-button>
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
                  <b-form-input id="input-default" 
                  v-model="PlayerAccount.characterName"
                  :class="{hasErrors: $v.PlayerAccount.characterName.$error}"
                  @blur="$v.PlayerAccount.characterName.$touch()">
                  </b-form-input>
                   <p class="error-message" v-if="!$v.PlayerAccount.characterName.required && $v.PlayerAccount.characterName.$error">Character Name is required</p>
                   <p class="error-message" v-if="!$v.PlayerAccount.characterName.minLength">Minumum length is 6</p>
                   <p class="error-message" v-if="!$v.PlayerAccount.characterName.maxLength">Maximum length is 20</p>
                </b-col>
              </b-row>

              <b-row align-h="start">
                <b-col cols="3">
                  <label for="">Character Class</label>
                </b-col>
              
                <b-col >
                    <b-form-select v-model="PlayerAccount.classType"
                    :class="{hasErrors: $v.PlayerAccount.classType.$error}">
                       <option selected value="" >Select a Class</option>
                      <option v-for=" (cclass, i) in characterClass.filter(c => c.id != 6)"
                        :key="i" 
                        :value="cclass.id">{{cclass.name}}
                      </option>
                    </b-form-select>
                       <p class="error-message" v-if="!$v.PlayerAccount.classType.required && $v.PlayerAccount.classType.$error">Class is required</p>  
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
const apiUrlSaveAccount = 'https://monster-slayer-api-staging.herokuapp.com/accounts';

export default {
    data(){
       return {
          PlayerAccount:{
                  fullName:'',
                  email:'',
                  username:'',
                  password:'',
                  characterName:'',
                  classType:''
                },
            classType: 1
       }
    },
          methods:{
                saveAccount:function()
                {
                    this.$v.$touch()
                    if(!this.$v.$error)
                    {
                          this.$http.post(apiUrlSaveAccount, this.PlayerAccount).then(res => {
                              this.$router.push('/login');
                              
                              }).catch(error => {
                                  });
                    }

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
     .marginBottom10{
       margin-bottom: 10px;
}
.error-message {
    color: red;
}
</style>
