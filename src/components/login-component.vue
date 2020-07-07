<template>
    <div>
        <h3>Login</h3>
        <b-row>
            <b-col  align-self="center">
                <b-row >
                    <b-col cols="1">
                        <label for="">Username</label>
                    </b-col>

                    <b-col cols="3" >
                        <b-form-input id="username"
                            v-model.lazy="loginData.username"       
                            @blur="$v.loginData.username.$touch()">
                        </b-form-input>

                        <p 
                             v-if="!$v.loginData.username.required 
                            && $v.loginData.username.$error">
                            Username is Required!
                        </p>
                    </b-col>
                </b-row>

                <b-row>
                     <b-col cols="1">
                  <label for="">Password</label>
                </b-col>
              
                <b-col cols="3">
                <b-form-input  
                    type="password"
                    v-model.lazy="loginData.password"     
                    @blur="$v.loginData.password.$touch()">
                </b-form-input>
                <p  v-if="!$v.loginData.password.required
                  && $v.loginData.password.$error">
                  Password is Required
                </p>    
                </b-col>
                </b-row>

                <b-row >
                    <b-col  offset-md="1"  cols="4">
                        <b-button
                            variant="info"
                            size="lg"
                            :disabled="isDisabled"
                            @click="login()"
                            >Login
                        </b-button>

                        <b-button
                            variant="info"
                            size="lg"
                            @click="signUp()"
                            >Sign Up
                        </b-button>
                    </b-col>
                </b-row>

            </b-col>
        </b-row>
    </div>
</template>
<script>
import  accountService  from '../mixins/accountService';
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators';
import { eventBus } from '../main';

export default {
    data() {
        return {
            loginData: {
                username: '',
                password: ''
            },
            isDisabled: true
        }
    },
    props: {
        isLoading: Boolean
    },
    mixins: [accountService],
    methods: {
        login() {
            eventBus.$emit('loading', true);
            this.loginAccount(this.loginData).then(res => {
                this.getAccount(res.accountId);
                this.$alertify.alertWithTitle("Login", "Login Success");
                eventBus.$emit('loading',false);
            })
            .catch(error => {
                console.log(error, 'error');
                const errorObj = error.bodyText;
                this.$alertify.alertWithTitle("Login", JSON.parse(errorObj).error); 
                eventBus.$emit('loading',false);
            });
        },
        getAccount(accountId){
            this.getCharacterDetails(accountId).then(res => {
                console.log(res, 'getaccount');
                this.$emit('player-info', res);
            });
        },
        signUp() {
            this.clearLoginData();
            this.$emit('sign-up', true);
        },
        clearLoginData(){
          this.loginData.username = '';
          this.loginData.password = '';
        }
    },
    watch: {
        loginData: {
            handler: function(val){
                let isValid = !(!this.$v.loginData.username.required) &&
                              !(!this.$v.loginData.password.required);
                this.isDisabled = !isValid;
            },
            deep: true
        }
    },
    validations: {
        loginData: {
            username: {
                    required
            },
            password: {
                    required
            }
        }
    }
    
}
</script>
<style scoped>
    div {
        color: white;
        font-family: "OptimusPrinceps";
    }

    input {
        font-family:  'Arial Narrow';
    }
</style>