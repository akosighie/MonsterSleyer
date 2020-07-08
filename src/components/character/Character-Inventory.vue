<template>
    <div>
        <b-row>
            <b-col cols="4">
                <b-row>
                    <b-col>
                        Equipments
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Armor
                    </b-col>
                    <b-col>
                        {{equipment.armor}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Weapon
                    </b-col>
                    <b-col>
                        {{equipment.weapon}}
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="8">
                
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    props: {
        equipment: {}
    }
}
</script>
<style scoped>


</style>