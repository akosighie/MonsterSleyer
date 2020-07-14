<template>
    <div>
        <b-alert  
         class="b-alert-custom" show>
             {{this.actionLogSummary(gamelogData)}}
         </b-alert>
    </div>
</template>
<script>
export default {
    props: {
        gamelogData: {}
    },
    methods: {
      actionLogSummary(data){
        if (data.notificationType == 0){
            return `${data.name} Attack First...`
        }
        else {
            if (data.move.target == "self") {
                if (data.move.type == "r") {
                return `${data.name} uses ${data.move.name}, added ${-data.move.damage} to mana..`
                }
                else {
                    return `${data.name} uses ${data.move.name}, added ${-data.move.damage} to health..`
                }
            }
            else {
                return `${data.name} uses ${data.move.name}, damages ${data.totalDamage}..`

            }
            
            // else {
            //     return `${data.name} uses ${data.action}, damages ${data.totalDamage}..`
            // }
            
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
    .alert-info{
        background-color: rgba(23,67,88,0.5);
        height: 100px;
    }

</style>