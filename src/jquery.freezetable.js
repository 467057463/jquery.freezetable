import defaults from "./defaults.js";

+function(factory){
  if(typeof module!=="undefined" && module.exports){
    module.exports = factory;
  }else{
    factory(jQuery,window,document);
  }
}(
function($){

  
  console.log(defaults)
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

  $.freezetable = {
    defaults: defaults,

    setDefaults : function(settings){
      $.extend($.freezetable.defaults, settings)
    }
  }

  // /* data-api invoke */
  if(window.Turbolinks && window.Turbolinks.supported){
    $(document)
    .on("turbolinks:load",function(){
      $(defaultSelector).freezetable();
    })
    .on("turbolinks:request-end", function () {
      $(defaultSelector).freezetable("destroy");
    })
  }else{
    $(function(){
      $(defaultSelector).freezetable();
    })
  }



})