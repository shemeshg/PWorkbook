<template>
  <div>
    <h1>Composite APi</h1>
    <p>{{  shalom }}</p>
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

    onMounted(()=>{
      params.pw.setRefreshCallback(symbl, (ret) => {      
        ret.c(params.shalom, pShalom)
      })
    })

    onUnmounted( ()=>{
      params.pw.unSetRefreshCallback(symbl)
    })
    return {shalom};
  },

})



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
