<script>
    const apiUrl = `https://monster-slayer-api-staging.herokuapp.com/`;

export default {
    methods: {
        saveAccount(playerAccount){
            return this.$http.post(`${apiUrl}accounts`, playerAccount).then(res => res.json());
        },
        loginAccount(loginData){
            const userData = {
                "username": loginData.username,
                "password": loginData.password
            }
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