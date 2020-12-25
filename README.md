# PWorkbook - Typescript reducer (like vuex)

state management pattern + library.

* short one typescript file. 

https://github.com/shemeshg/PWorkbook/blob/master/src/components/PWorkbook.ts

## Project setup

- copy PWorkbook.ts to your project

- create store file

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

- Import on every component using the store

```typescript
import {params} from "./Store"
import {RefreshResult} from "./PWorkbook"

@Component
export default class Component1 extends Vue {
  shalom = params.shalom.ref  
  textComputed = params.textComputed.ref
  symbl = Symbol()

  mounted() {
    params.pw.setRefreshCallback(this.symbl, (ret: RefreshResult) => {      
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

### Compiles and hot-reloads for development

```
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