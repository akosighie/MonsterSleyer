<script>
    const apiUrl = `https://monster-slayer-api-staging.herokuapp.com/`;

export default {
    methods: {
        saveAccount(playerAccount){
            console.log(playerAccount, 'Save Account Service');
            return this.$http.post(`${apiUrl}accounts`, playerAccount).then(res => res.json());
        },
        loginAccount(loginData){
            const userData = {
                "username": loginData.username,
                "password": loginData.password
            }
            //console.log(loginData, 'service');
            console.log(userData, 'service');
            return this.$http.post(`${apiUrl}accounts/login`, userData).then(res => res.json());
        },
        getCharacterDetails(accountId){
            return this.$http.get(`${apiUrl}accounts/${accountId}/character`).then(
                res => res.json()
            );
        }
    }
}
</script>