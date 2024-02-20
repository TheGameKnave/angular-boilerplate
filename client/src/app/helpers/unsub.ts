export function AutoUnsubscribe( blackList: string[] = [] ) {
  return function ( constructor: any ) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      window.setTimeout(() => {
        for ( let prop in this ) {
          const property = this[ prop ];
          if ( !blackList.includes(prop) ) {
            if ( property && ( typeof property.unsubscribe === "function" ) ) {
              property.unsubscribe();
            }
            if(typeof property === 'object') this[prop] = null; // TODO remove this band-aid when components are properly released
          }
        }
      },1000);// TODO remove this band-aid when components are properly released
      original && typeof original === 'function' && original.apply(this, arguments);
    };
  }
}
