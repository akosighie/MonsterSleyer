<script>
    const apiUrl = `https://monster-slayer-api-staging.herokuapp.com/`;
    const service = 'character'

export default {
    methods: {
        getCharacterDungeons(characterId){
            return this.$http.get(`${apiUrl}character/${characterId}/dungeons`).then(
                res => res.json()
            );
        },
        getCharacter(characterId){
            console.log(characterId, 'getCharacter service');
             return this.$http.get(`${apiUrl}${service}/${characterId}`).then(
                res => res.json()
            );
        },
         getCharacterInventory(characterId){
            return this.$http.get(`${apiUrl}${service}/${characterId}/inventory`).then(
                res => res.json()
            );
        },
        // getCharacterDetails(accountId){
        //     return this.$http.get(`${apiUrl}accounts/${accountId}/character`).then(
        //         res => res.json()
        //     );
        // }
    }
}
</script>