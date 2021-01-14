<template>
  <div>
    <h1>Composite APi</h1>
    <p>{{  shalom }}</p>
    <p>{{myAry}} count {{myAryCount}}<button @click="pushMyAry" >pushMyAry</button></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted , onUnmounted} from '@vue/composition-api'

import {params} from "./Store"
import {CompositHelper} from "./CompositHelper"


export default defineComponent({
  setup () {

    const symbl = Symbol();
    const ch = new CompositHelper(params.pw, symbl)

    const shalom = ch.getComputed(params.shalom) 
    const myAryCount = ch.getComputed(params.myAryCount) 
    
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
      // Notice no need to place, nothing for lists and dictionaries
    })

    onUnmounted( ()=>{
      ch.onUnmounted()
    })
    return {shalom, myAry, pushMyAry, myAryCount};
  },

})



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
