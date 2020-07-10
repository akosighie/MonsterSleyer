<script>

export default {
    methods: {
        
       setCharacterId(id) {
            localStorage.setItem("characterId", id);
       },
       getCharacterId(){
           return localStorage.getItem("characterId");
       },
       setAccountId(id){
           localStorage.setItem("accountId", id);
       },
       getAccountId(){
           return localStorage.getItem("accountId");
       }
    }
}
</script>