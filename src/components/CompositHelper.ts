
import {PRef, PWorkbook} from "./PWorkbook"
import {Ref, computed, ref} from '@vue/composition-api'

export class CompositHelper {
  // eslint-disable-next-line 
    ary: {s: PRef<any>, r: Ref}[] = [];

    pw: PWorkbook;
    readonly symbl = Symbol();

    constructor(pw: PWorkbook){
      this.pw = pw
    }

    getComputed<T>(storeVar: PRef<T>){
      const tmpRef = ref(storeVar.ref) as unknown as Ref<T>
      const comp =  computed({
          get: ()=>{ return tmpRef.value},
          set: (s) =>{storeVar.ref = s}
        })
      this.ary.push({s: storeVar, r: tmpRef})
      return comp
    }

    onMounted(){
      this.pw.setRefreshCallback(this.symbl, (ret) => {    
        this.ary.forEach( (row)=>{
          ret.c(row.s, row.r)
        })          
      })
    }


    onUnmounted() {
      this.pw.unSetRefreshCallback(this.symbl)
    }
}