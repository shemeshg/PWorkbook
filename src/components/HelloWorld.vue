<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <button @click="gg" >Click1</button>
      <button @click="gg1" >Click2</button>
    </p>
    <p>{{shalom}} {{olam}} {{theComputed}}</p>
    <p>{{ depComp }} </p>
    <p>{{myNumber}}</p>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {params} from "./Store"

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  
  shalom = params.shalom.ref  
  olam  = params.olam.ref    
  theComputed = params.theComputed.ref  
  depComp = params.depComp.ref 
  myNumber = params.myNumber.ref 
  symbl = Symbol()

   mounted() {
    params.pw.setRefreshCallback(this.symbl, (ret) => {
      ret.t(params.theComputed, (r)=>{{ this.theComputed = r}})
      ret.t(params.shalom, (r)=>{{ this.shalom = r}})
      ret.t(params.olam, (r)=>{{ this.olam = r}})
      ret.t(params.depComp, (r)=>{{ this.depComp = r}})
      ret.t(params.myNumber, (r)=>{{ this.myNumber = r}})
      return ;
    })
  }

  destroyed(){
    params.pw.unSetRefreshCallback(this.symbl)
  }

  gg(){
    params.addMynumber(11) 
    params.myNumber.ref = params.myNumber.ref + 1
    for (let i=0;i<10000;i++){
      setTimeout( ()=>{
        params.olam.ref = "google" + i
      },0)            
    }
  } 



  gg1(){
    params.olam.ref = "yahoo"
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
