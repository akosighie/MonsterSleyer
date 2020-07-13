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
          if (data.name != ''){
                return `${data.name} uses ${data.action}...`
          }
      }
    }
}
</script>
<style scoped>

</style>