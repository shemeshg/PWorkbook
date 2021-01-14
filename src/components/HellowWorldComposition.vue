<template>
  <div>
    <h1>Composite APi</h1>
    <p>{{  shalom }}</p>
    <p>{{myAry}} count {{myAryCount}}<button @click="pushMyAry" >pushMyAry</button></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed , onUnmounted, Ref} from '@vue/composition-api'
import {PRef} from "./PWorkbook"
import {params} from "./Store"


function getComputed<T>(storeVar: PRef<T>, compositVar: Ref<T>){
  return computed({
      get: ()=>{ return compositVar.value},
      set: (s) =>{storeVar.ref = s}
    })
}

export default defineComponent({
  setup () {
    const symbl = Symbol();
    
    const pShalom = ref( params.shalom.ref)
    const shalom = getComputed(params.shalom, pShalom) 
    
    // All objects like lists are reactive automaticly by Vue
    // no need getComputed
    const myAry = ref(params.myAry.ref)

    const pMyAryCount = ref( params.myAryCount.ref)
    const myAryCount = getComputed(params.myAryCount, pMyAryCount)

    const pushMyAry=()=>{
      params.myAry.ref.push("a")
      // The object itself reactive, but the store don't know it has been modified, 
      params.myAry.signalRefresh()
    }

    onMounted(()=>{
      params.pw.setRefreshCallback(symbl, (ret) => {      
        ret.c(params.shalom, pShalom)
        ret.c(params.myAryCount, pMyAryCount)
        // Notice no need to place, nothing for lists and dictionaries
      })
    })

    onUnmounted( ()=>{
      params.pw.unSetRefreshCallback(symbl)
    })
    return {shalom, myAry, pushMyAry, myAryCount};
  },

})



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
