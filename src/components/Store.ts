import {PWorkbook} from "./PWorkbook"

  function initWbk(){
    const pw = new PWorkbook()
    const shalom  = pw.addRef("shalom")
    const olam = pw.addRef("olam")
    const myNumber= pw.addRef(20)
    const theComputed = pw.addComputed( ()=> {return shalom.ref +  olam.ref } , [shalom, olam])
    const depComp = pw.addComputed( ()=> {return " *** " + theComputed.ref + " Also works ok "} , [theComputed])
    
    return  {pw, shalom,olam,theComputed, depComp, myNumber }
  }

  export const params = initWbk();