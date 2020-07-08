<template>
    <div>
      <b-row>
          test abc
      </b-row>
      <b-row>
          <b-col cols="5">
            <b-row>
                <b-col>
                    Skills
                </b-col>
            </b-row> 
            <b-row>
                <ul v-for="(ski, index)  in skills" v-bind:key="index">
                    <li>{{ski.name}}</li>
                </ul>
                <!-- {{skills[0].name}} -->
            </b-row>
          </b-col>
          <b-col cols="8">
              <b-row>
               
            </b-row>
          </b-col>
          
      </b-row>
    </div>
</template>
<script>
export default {
    props: {
        skills: {}
    }
}
</script>