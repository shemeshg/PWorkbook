
class PRef {
  private _ref: string;
  private _refreshCallback: () => void
  needsRefresh = false;

  get ref(){
    return this._ref
  }

  set ref(s: string){
    this._ref = s
    this.invalidates.forEach(c => {
      c.needsRefresh = true
    });
    this.needsRefresh = true;
    this._refreshCallback();
  }

  invalidates: PComputed[] = []
  constructor (s: string, refreshCallback: () => void){
    this._ref = s
    this._refreshCallback = refreshCallback
  }
}

class PComputed extends PRef {
  pcomputed: () => string 
  

  setDependsOn(cary: PRef[] ){
    cary.forEach( pref=>{
      if (pref.invalidates.indexOf(this) === -1){
        pref.invalidates.push(this)
      }
    } )
        
  }


  constructor( c: () => string ){
    super("", ()=>{return;});
    this.pcomputed = c    
  }

  refresh(){
    if (this.needsRefresh) {
      this.ref = this.pcomputed();
      this.needsRefresh = false;
    }
  }
}

export class PWorkbook {
  private _computedItems: PComputed[] =[]
  private _refItems: PRef[] =[]

  private _refreshCallback: {symbl: symbol;func: () => void }[]  = []
  private refreshCallback = () => {this._refreshCallback.forEach(row=>{
    row.func();
  })}

  setRefreshCallback(symbl: symbol ,func: () => void) {
    this._refreshCallback.push ({symbl:symbl,func: func})
  }

  unSetRefreshCallback(symbl: symbol){
    this._refreshCallback = this._refreshCallback.filter( (row)=>{return row.symbl !== symbl})
  }

  addRef(s: string){
    const pref =  new PRef(s, this.refreshCallback);
    this._refItems.push( pref )
    return pref
  }

  addComputed( func: () => string,  dependsOn: PRef[]){
    const c = new PComputed(func);
    const flatDependsOn = dependsOn.filter( (row)=>{ return !(row instanceof PComputed) })

    // Flatten computed of computed 
    dependsOn.filter( (row)=>{ return (row instanceof PComputed) }).forEach( (cmpRow)=>{
        this._refItems.forEach(ref=>{
          if ( ref.invalidates.filter( (f)=>{return f===cmpRow}).length > 0){          
            flatDependsOn.push(ref);
          }
        })
    })
    c.setDependsOn(flatDependsOn)

    this._computedItems.push(c)

    c.needsRefresh = true
    c.refresh();

    return c
  }

  refresh(){
    const toUpdatyeItems: PRef [] = this._computedItems.filter( (row)=>{return row.needsRefresh})
    this._refItems.filter( (row)=>{return row.needsRefresh}).forEach( (row)=>{
      toUpdatyeItems.push(row)
      row.needsRefresh = false
    })
    this._computedItems.forEach( (c)=>{
      c.refresh()
    })
    return toUpdatyeItems;
  }
}