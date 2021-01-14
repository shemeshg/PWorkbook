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

    const myAry = pw.addRef(["a"])
    const myAryCount = pw.addComputed( ()=> {return myAry.ref.length} , [myAry])

    return  {pw, shalom,olam,theComputed, depComp, myNumber, addMynumber, myAry, myAryCount }
  }

  export const params = initWbk();