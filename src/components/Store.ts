import {PWorkbook} from "./PWorkbook"

  function initWbk(){
    const pw = new PWorkbook()
    const shalom  = pw.addRef("shalom")
    const olam = pw.addRef("olam")
    const myNumber= pw.addRef(20)
    const theComputed = pw.addComputed( ()=> {return shalom.ref +  olam.ref } , [shalom, olam])
    const depComp = pw.addComputed( ()=> {return " *** " + theComputed.ref + " Also works ok "} , [theComputed])
    
    const addMynumber = (i: number)=>{
      myNumber.ref = myNumber.ref + i;
    }

    return  {pw, shalom,olam,theComputed, depComp, myNumber, addMynumber }
  }

  export const params = initWbk();