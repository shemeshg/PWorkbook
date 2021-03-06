# PWorkbook - Typescript reducer (like vuex)

state management pattern + library.

* Download one short typescript file.

<https://github.com/shemeshg/PWorkbook/blob/master/src/components/PWorkbook.ts>

## Project setup

* Create store file and import PWorkbook.ts

<https://github.com/shemeshg/PWorkbook/blob/master/src/components/Store.ts>

```typescript
import {PWorkbook} from "./PWorkbook"

function initWbk(){
  const pw = new PWorkbook()
  const shalom  = pw.addRef("shalom")
  // array is all dependent fields
  const textComputed = pw.addComputed( ()=> {return shalom.ref +  "dummy text" } , [shalom])

  return  {pw, shalom, textComputed}
}

export const params = initWbk();
```

* Import store to component

```typescript
import {params} from "./Store"

@Component
export default class Component1 extends Vue {
  shalom = params.shalom.ref  
  textComputed = params.textComputed.ref
  symbl = Symbol()

  mounted() {
    params.pw.setRefreshCallback(this.symbl, (ret) => {      
      ret.t(params.shalom, ()=>{{ this.shalom = params.shalom.ref}})
      ret.t(params.textComputed, ()=>{{ this.textComputed = params.textComputed.ref}})
      return;
    })
  }

  destroyed(){
    params.pw.unSetRefreshCallback(this.symbl)
  }

  whenClicked(){
    params.shalom.ref = "text2"
  }

}
```

### Use getter and setter on typescript components

```typescript
  pShalom = params.shalom.ref  
  get shalom(){ return this.pShalom}
  set shalom(s){params.shalom.ref = s}

  mounted() {
    params.pw.setRefreshCallback(this.symbl, (ret) => {      
      ret.t(params.shalom, ()=>{{ this.pShalom = params.shalom.ref}})
    })
  }  
```

### Or in Vue Composition API with simple helper file (CompositHelper.ts)

See (also for lists and dictionaries):
<https://github.com/shemeshg/PWorkbook/blob/master/src/components/HellowWorldComposition.vue>

```typescript
  setup () {
    const ch = new CompositHelper(params.pw)
    
    onMounted(()=>{
      ch.onMounted()
    })

    onUnmounted( ()=>{
      ch.onUnmounted()
    })
    
    return {shalom: ch.getRef(params.shalom) };
  },

```

### Compiles and hot-reloads for development

```bash
npm run serve
```

## Built With

See [Vue cli](https://cli.vuejs.org/config/).

## Authors

* **shemeshg**

## License

Copyright 2020 shemeshg

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
