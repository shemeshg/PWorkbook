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
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
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
