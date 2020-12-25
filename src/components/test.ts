
class PRef {
  private _ref: string;
  private _refreshCallback: () => void

  get ref(){
    return this._ref
  }

  set ref(s: string){
    this._ref = s
    this.invalidates.forEach(c => {
      c.needsRefresh = true
    });
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
  needsRefresh = false;

  set dependsOn(cary: PRef[] ){
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
  private _refreshCallback = () => {return ;}
  private refreshCallback = () => {this._refreshCallback()}

  set setRefreshCallback(func: () => void) {
    this._refreshCallback = func
  }

  addRef(s: string){
    const pref =  new PRef(s, this.refreshCallback);
    return pref
  }

  addComputed( func: () => string,  dependsOn: PRef[]){
    const c = new PComputed(func);
    c.dependsOn = dependsOn
    this._computedItems.push(c)

    c.needsRefresh = true
    c.refresh();

    return c
  }

  refresh(){
    const toUpdatyeItems = this._computedItems.filter( (row)=>{return row.needsRefresh})
    this._computedItems.forEach( (c)=>{
      c.refresh()
    })
    return toUpdatyeItems;
  }
}