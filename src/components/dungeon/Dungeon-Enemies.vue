<template>
    <div>
        <!-- {{this.dungeon}} -->
        <ul v-for="(enm, i) in this.dungeon" v-bind:key="i">
            <li>{{enm.name}}</li>
            <b-row>
     
            Drop
            <b-row>
                <ul
                v-for="(itm, iitem) in enm.drops"
                v-bind:key="iitem">

                <li>{{itm.name}}</li>

            </ul>
            </b-row>
            
          
            </b-row>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        dungeon: {}
    }
}
</script>
<style scoped>

</style>