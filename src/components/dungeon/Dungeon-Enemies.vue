<template>
    <div>
        <!-- {{this.dungeons[dungeonValue]}} -->
        <ul v-for="(enm, i) in enemies" v-bind:key="i">
            <li>{{enm.name}}</li>
            <b-row>
            <b-col>
            Drop
            </b-col>
            </b-row>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        enemies: []
    }
}
</script>
<style scoped>

</style>