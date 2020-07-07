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
    data() {
      return {
        dismissSecs: 10,
        dismissCountDown: 0,
        showDismissibleAlert: false
      }
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
    b-alert {
        color:white;
    }

    .b-alert-custom {
        color: white;
        background: #117a8b;
        font-family: "OptimusPrinceps";
    }   
    
</style>