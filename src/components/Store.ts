import {PWorkbook} from "./PWorkbook"

// Example for using localStorage, remember to myLocalStorage.signalRefresh() after setting value
class MyLocalStorage {get lc(){return localStorage.getItem("lc") ?? ""}
                      set lc(s: string){localStorage.setItem("lc", s)}}

function initWbk(){
  const pw = new PWorkbook()
  const myLocalStorage = pw.addRef(new MyLocalStorage());   
  const myLocalStorageLc = pw.addComputed( ()=> {return myLocalStorage.ref.lc + " YYY "} , [myLocalStorage])
   
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

  return  {pw, shalom,olam,theComputed, depComp, myNumber, addMynumber, myAry, myAryCount, myLocalStorage, myLocalStorageLc }
}

export const params = initWbk();