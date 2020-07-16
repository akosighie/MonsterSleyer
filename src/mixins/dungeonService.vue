<script>
    const apiUrl = `https://monster-slayer-api-staging.herokuapp.com/`;

export default {
    methods: {
        postEnterDungeon(enterDungeonRequest){
            return this.$http.post(`${apiUrl}dungeons/enter`, enterDungeonRequest).then(
                res => res.json()
            );
        },
        postDungeonBattle(dungeonBattleRequest){
            return this.$$http.pos(`${apiUrl}dungeons/battle`, dungeonBattleRequest).then(
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