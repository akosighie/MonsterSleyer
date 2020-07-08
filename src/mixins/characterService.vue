<script>
    const apiUrl = `https://monster-slayer-api-staging.herokuapp.com/`;

export default {
    methods: {
        getDungeons(characterId){
            return this.$http.get(`${apiUrl}character/${characterId}/dungeons`).then(
                res => res.json()
            );
        }
        // getCharacterDetails(accountId){
        //     return this.$http.get(`${apiUrl}accounts/${accountId}/character`).then(
        //         res => res.json()
        //     );
        // }
    }
}
</script>