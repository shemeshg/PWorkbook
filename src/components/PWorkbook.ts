class PRefPrivate<T> {
  protected _ref: T;
  private _refreshCallback: () => void
  needsRefresh = false;

  get ref(){
    return this._ref
  }

  protected setRef(s: T){
    this._ref = s
    this.signalRefresh();
  }

  signalRefresh(){
    this.invalidates.forEach(c => {
      c.needsRefresh = true
    });
    this.needsRefresh = true;
    this._refreshCallback();
  }

  // eslint-disable-next-line 
  invalidates: PComputed<any>[] = []
  constructor (s: T, refreshCallback: () => void){
    this._ref = s
    this._refreshCallback = refreshCallback
  }
}



export class PRef<T> extends PRefPrivate<T> {
  get ref(){
    return this._ref
  }

  set ref(s: T){
    this.setRef(s);
  }
}

class PComputed<T>  extends PRefPrivate<T> {
  pcomputed: () => T 
  

  setDependsOn(cary: PRef<T>[] ){
    cary.forEach( pref=>{
      if (pref.invalidates.indexOf(this) === -1){
        pref.invalidates.push(this)
      }
    } )
        
  }


  constructor( c: () => T ){
    super("" as unknown as T, ()=>{return;});
    this.pcomputed = c    
  }

  refresh(){
    if (this.needsRefresh) {
      this.setRef( this.pcomputed());
      this.needsRefresh = false;
    }
  }
}

export class RefreshResult {
  // eslint-disable-next-line 
  ret: PRef<any>[] = []
  // eslint-disable-next-line 
  constructor(ret: PRef<any>[]){
    this.ret = ret;
  }

  // eslint-disable-next-line 
  t<T>(i: PRef<T>, func: (r: T) => void){
    if (this.ret.indexOf(i) > -1) { func(i.ref)}
  }

  // c for Vue composite api
  // eslint-disable-next-line 
  c<T>(i: PRef<T>, vueRef: any){
    if (this.ret.indexOf(i) > -1) { vueRef.value = i.ref }
  }  
}

export class PWorkbook {
  // eslint-disable-next-line 
  private _computedItems: PComputed<any>[] =[]
  // eslint-disable-next-line 
  private _refItems: PRef<any>[] =[]

  private _refreshCallback: {symbl: symbol;func: (ret: RefreshResult) => void }[]  = []

  doNotAutoRefresh = false;

  refreshCallback = () => {
    if (this.doNotAutoRefresh) {return;}

    const ret = this.refresh();
    this._refreshCallback.forEach(row=>{
    row.func(ret);
    })
  }

  private refresh(){
    // eslint-disable-next-line 
    const toUpdatyeItems: PRef<any>[] = this._computedItems.filter( (row)=>{return row.needsRefresh})
    this._refItems.filter( (row)=>{return row.needsRefresh}).forEach( (row)=>{
      toUpdatyeItems.push(row)
      row.needsRefresh = false
    })
    this._computedItems.forEach( (c)=>{
      c.refresh()
    })
    return new RefreshResult(toUpdatyeItems);
  }

  setRefreshCallback(symbl: symbol ,func: (ret: RefreshResult) => void) {
    this.unSetRefreshCallback( symbl )
    this._refreshCallback.push ({symbl:symbl,func: func})
  }

  unSetRefreshCallback(symbl: symbol){
    this._refreshCallback = this._refreshCallback.filter( (row)=>{return row.symbl !== symbl})
  }

   
  addRef<T>(s: T){
    const pref =  new PRef(s, this.refreshCallback);
    this._refItems.push( pref )
    return pref
  }

  // eslint-disable-next-line
  addComputed<T>( func: () => T,  dependsOn: PRef<any>[]){
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


}