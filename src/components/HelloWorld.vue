<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      {{shalom.s}} {{olam.s}}
      <button @click="gg" >Setup</button>
      <button @click="gg1" >BTN1</button>
       <button @click="doRefresh" >NextTickRefresh</button>
    </p>
    <p>{{shalom}} {{olam}} {{theComputed}}</p>
    <p>{{ depComp }} </p>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {PWorkbook} from "./test"

  function initWbk(){
    const pw = new PWorkbook()
    const shalom = pw.addRef("shalom")
    const olam = pw.addRef("olam")
    const theComputed = pw.addComputed( ()=> {return shalom.ref +  olam.ref} , [shalom, olam])
    const depComp = pw.addComputed( ()=> {return " *** " + theComputed.ref + " Also works ok "} , [theComputed])
    
    return  {pw, shalom,olam,theComputed, depComp }
  }

  const params = initWbk();
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  
  shalom = params.shalom.ref  
  olam  = params.olam.ref    
  theComputed = params.theComputed.ref  
  depComp = params.depComp.ref 

  symbl = Symbol()

   mounted() {
    params.pw.setRefreshCallback(this.symbl, () => {
      const ret = params.pw.refresh(); 
      if (ret.indexOf(params.theComputed) > -1) { this.theComputed = params.theComputed.ref}
      if (ret.indexOf(params.shalom) > -1) { this.shalom = params.shalom.ref}
      if (ret.indexOf(params.olam) > -1) { this.olam = params.olam.ref}
      if (ret.indexOf(params.depComp) > -1) { this.depComp = params.depComp.ref}

      return ;
    })
  }

  destroyed(){
    params.pw.unSetRefreshCallback(this.symbl)
  }

  gg(){
    params.olam.ref = "google"
  } 



  gg1(){
    params.olam.ref = "yahoo"
  }  
  
  doRefresh(){
    params.pw.refresh()
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
