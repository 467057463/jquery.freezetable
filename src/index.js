import _ from 'lodash';
import defaults from "./defaults.js";
import methods from './methods';

console.log(methods)


var mm = 'mmsssbbb'

/*
----------------------------------------
PLUGIN SETUP
----------------------------------------
*/
/* plugin constructor functions */
$.fn.freezetable = function(method){
  if(methods[method]){
    return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
  }else if(typeof method === "object" || !method){
    return methods.init.apply(this, arguments)
  }else{
    $.error("Method " + method + " does not exist");
  }
}

// export default defaults;