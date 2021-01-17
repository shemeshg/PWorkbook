<template>
  <div>
    <h1>Vue Composition API</h1>
    <p>{{  shalom }}</p>
    <p>{{myAry}} count {{myAryCount}}<button @click="pushMyAry" >pushMyAry</button></p>
    <p>{{olam}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted , onUnmounted} from '@vue/composition-api'

import {params} from "./Store"
import {CompositHelper} from "./CompositHelper"


export default defineComponent({
  setup () {

    
    const ch = new CompositHelper(params.pw)

      
    // All objects like lists are reactive automaticly by Vue
    // no need getComputed
    const myAry = ref(params.myAry.ref)

    

    const pushMyAry=()=>{
      params.myAry.ref.push("a")
      // The object itself reactive, but the store don't know it has been modified, 
      params.myAry.signalRefresh()
    }

    onMounted(()=>{
      ch.onMounted()
    })

    onUnmounted( ()=>{
      ch.onUnmounted()
    })
    return {shalom: ch.getComputed(params.shalom),  
            myAryCount: ch.getComputed(params.myAryCount), 
            olam: ch.getComputed(params.olam), 
            myAry: myAry, pushMyAry };
  },

})



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
