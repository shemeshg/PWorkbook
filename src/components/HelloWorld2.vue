<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <button @click="gg" >Setup</button>
      <button @click="gg1" >BTN1</button>

    </p>
    <p>{{shalom}} {{olam}} {{theComputed}}</p>
    <p>{{ depComp }} </p>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {params} from "./Store"
import {RefreshResult} from "./PWorkbook"

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  
  shalom = params.shalom.ref  
  olam  = params.olam.ref    
  theComputed = params.theComputed.ref  
  depComp = params.depComp.ref 

  symbl = Symbol()

   mounted() {
     params.pw.setRefreshCallback(this.symbl, (ret: RefreshResult) => {
      ret.t(params.theComputed, ()=>{{ this.theComputed = params.theComputed.ref}})
      ret.t(params.shalom, ()=>{{ this.shalom = params.shalom.ref}})
      ret.t(params.olam, ()=>{{ this.olam = params.olam.ref}})
      ret.t(params.depComp, ()=>{{ this.depComp = params.depComp.ref}})
    
      return ;
    })
    
    
  }

  destroyed(){
    params.pw.unSetRefreshCallback(this.symbl)
  }

  gg(){
    params.olam.ref = "from2google"
  } 



  gg1(){
    params.olam.ref = "from2yahoo"
  }  
  


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
