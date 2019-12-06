+function(factory){
  if(typeof module!=="undefined" && module.exports){
    module.exports = factory;
  }else{
    factory(jQuery,window,document);
  }
}(
  function($){

    /*
    ----------------------------------------
    PLUGIN NAMESPACE, DEFAULT SELECTOR(S)
    ----------------------------------------
    */

    var defaultSelector = '[data-toggle="freezetable"]',
        pluginPfx       = 'freezetable',
        pluginOpts      = 'plugin-opts',
        eventProxyIds   = 0,
        requsetId       = 0,
        debug           = location.search.indexOf("debug") > 0,

    /*
    ----------------------------------------
    DEFAULT OPTIONS
    ----------------------------------------
    */

      defaults={
        /**
         * set freeze option
         * values: obj
        */
        freeze:{
          top   : 0,
          bottom: 0,
          left  : 1,
          right : 1
        },
        /**
         * hover line color
         * values: color(e.g. "red", "#ccc" ...)
        */
        lineHoverColor: false,
        /**
         * row hover color
         * value: color(same as line hover color)
        */
        rowHoverColor: false,
        /**
        * line separate color
        * values: Array first value is dark color last color is light scolor
        * (e.g. ["#f9f9f9", "transparent"] )
        */
        separateColor: [false, false],

        durationTime: 300,

        scrollDistance: 300,

        setWidth: false,

        setHeight: false,

        callback: {
          trClick: function(element){}
        },

        treeLevelRow: null
      },


    /*
    ----------------------------------------
    VARS, CONSTANTS
    ----------------------------------------
    */
      //使用webkit内核的浏览器
      WEBKIT_BROWSER    = "Chrome, Opera",
      SIDE              = ["left", "center", "right"],
      ITEM              = ["top", "middle", "bottom"],
      BORDER_ORDER      = ["top", "right", "bottom", "left"],
      BORDER_STYLE_TYPE = ["width", "style", "color"],
      SCROLLBARMINSIZE  = 30,
      SCROLLTOOL        = "<div class='scrolltool'><div class='scrollbar'></div></div>",
      TWEEN             = {
        Linear: function(t, b, c, d) {
          return c * t / d + b;
        },
        Quad: {
          easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
          },
          easeOut: function(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
          },
          easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t-2) - 1) + b;
          }
        },
        Cubic: {
          easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
          },
          easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
          },
          easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
            return c / 2*((t -= 2) * t * t + 2) + b;
          }
        },
        Quart: {
          easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t*t + b;
          },
          easeOut: function(t, b, c, d) {
            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
          },
          easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
          }
        },
        Quint: {
          easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
          },
          easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
          },
          easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
          }
        },
        Sine: {
          easeIn: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
          },
          easeOut: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
          },
          easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
          }
        },
        Expo: {
          easeIn: function(t, b, c, d) {
            return (t==0) ? b: c * Math.pow(2, 10 * (t/d - 1)) + b;
          },
          easeOut: function(t, b, c, d) {
            return (t==d) ? b + c: c * (-Math.pow(2, -10 * t/d) + 1) + b;
          },
          easeInOut: function(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
          }
        },
        Circ: {
          easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
          },
          easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
          },
          easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
          }
        },
        Elastic: {
          easeIn: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
              s = p / 4;
              a = c;
            } else {
              s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
          },
          easeOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
              a = c;
              s = p / 4;
            } else {
              s = p/(2*Math.PI) * Math.asin(c/a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
          },
          easeInOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d / 2) == 2) return b+c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
              a = c;
              s = p / 4;
            } else {
              s = p / (2  *Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
          }
        },
        Back: {
          easeIn: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
          },
          easeOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
          },
          easeInOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
          }
        },
        Bounce: {
          easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
          },
          easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
              return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
              return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
              return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
              return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
          },
          easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
              return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
              return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
          }
        }
      },


    /*
    ----------------------------------------
    METHODS
    ----------------------------------------
    */

      methods = {

        /*
        plugin initialization method
        ----------------------------------------
        */

        init: function(options){
          /* options normalization */
          _listener.call(this);
          return $(this).each(function(){
            if($(this).closest(".freezetable-container").length > 0){return} // 避免在生成的元素里执行
            if($(this).data(pluginPfx)){return}    // 避免多次初始化
            var opt   = $.extend(true, {}, defaults, $(this).data(pluginOpts), options),
                $this = $(this);

            _initTable.call(this, $this); // 初始化table 在原table里添加一些必要信息，以便后面步骤使用

            // 把所有data先在这里预定义，虽然不是必须，但方便以后管理
            $this.data(pluginPfx, {
              opt             : opt,
              lineNumer       : 0,
              horScroll       : null,
              verScroll       : null,
              tableBorderSize : null,
              tableBorderStyle: null,
              tdBorderSize    : null,
              tdBorderStyle   : null,
              stylesData      : null,
              mo              : null
            })
            // 初始化某些data数据
            var data                  = $this.data(pluginPfx),
                opt                   = data.opt,
                $notSideValidTd       = $("td:not(:hidden,:first-of-type, :last-of-type)", this).not("tr:first td, tr:last td");
                $notSideValidTd       = $notSideValidTd.length > 0 ? $notSideValidTd : $("th, td", this);
                opt.freeze            = _reComputeFreeze.call(this, opt.freeze);
                data.lineNumer        = $("tr", $this).length;
                data.tableBorderSize  = _getBorderSize.call(this, this);
                data.tableBorderStyle = _getBorderStyle.call(this, this);
                data.tdBorderSize     = _getBorderSize.call(this, $notSideValidTd[0]);
                data.tdBorderStyle    = _getBorderStyle.call(this,  $notSideValidTd[0]);
                data.stylesData       = _generateStylesData.call(this, opt.freeze);

            _generateHtml.call(this);
            _borderStyle.call(this);
            _generateSeparateColor.call(this);
            _generateScroll.call(this);
            _drop.call(this);
            _bindEvent.call(this);
            _eventProxy.call(this);
            _updateStyle.call(this);

            /**
             ----------------------------------------
            暂时不要了
            ----------------------------------------
            */
            // 监听DOM tree变化
            // var mo = new MutationObserver($.proxy(_DOMchange, this));
            // mo.observe(this, {
            //   attributes     : true,
            //   childList      : true,
            //   subtree        : true,
            //   attributeFilter: ["class"]
            // })
            // data.mo = mo
          })
        },
        /* ---------------------------------------- */

        // set default options
        setDefaults: function(options){
          return $(this).each(function(){
            if($(this).closest(".freezetable-container").length > 0){return} // 避免在生成的元素里执行
            var data = $(this).data(pluginPfx);
            if(!$.isEmptyObject(data)){return}
            var opt = $.extend(true, {}, $(this).data(pluginOpts), options)
            $(this).data(pluginOpts, opt)
          })
        },

        destroy: function(){
          var $element       = $(this),
              $freezeElement = $element.next();

          $($freezeElement).off(pluginPfx)
          $freezeElement.remove();
          $element.removeData(pluginPfx);
          _clearListerer();
        }

      },

    /*
    ----------------------------------------
    UTILS FUNCTIONS
    ----------------------------------------
    */
      _browserType = function(){
        var userAgent = navigator.userAgent;              //取得浏览器的userAgent字符串
        var isOpera   = userAgent.indexOf("Opera") > -1;  //判断是否Opera浏览器
        // var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isIE = window.ActiveXObject || "ActiveXObject" in window
        // var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1&&!isEdge; //判断Chrome浏览器

        if(isIE){
          var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
          reIE.test(userAgent);
          var fIEVersion = parseFloat(RegExp["$1"]);
          if(userAgent.indexOf('MSIE 6.0')!=-1){
            return "IE6";
          }else if(fIEVersion == 7)
            { return "IE7";}
          else if(fIEVersion == 8)
            { return "IE8";}
          else if(fIEVersion == 9)
            { return "IE9";}
          else if(fIEVersion == 10)
            { return "IE10";}
          else if(userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)){
                return "IE11";
            }
          else
            { return "0"}//IE版本过低
        }//isIE end

        if (isFF) { return "FF";}
        if (isOpera) { return "Opera";}
        if (isSafari) { return "Safari";}
        if (isChrome) { return "Chrome";}
        if (isEdge) { return "Edge";}
      },

      _getSum = function(total, num){
        return total + num
      },

      _pluginClassName = function(className){
        return pluginPfx + "-" + className;
      },

      _getReverseDir = function(direction){
        var index = BORDER_ORDER.indexOf(direction);
            index = index > 1 ? index - 2 : index + 2;
        return BORDER_ORDER[index];
      },

      _getBorderSize = function(element){
        var _that = this,
            obj   = {},
            //TODO 最好是有方法直接拿浏览器内核
            IsWebkit = WEBKIT_BROWSER.indexOf(_browserType()) > -1;

        //console.log(_browserType())
        BORDER_ORDER.forEach(function(item, index){
          var style = getComputedStyle(element, false)["border-" + item + "-style"],
              size  = parseFloat(getComputedStyle(element, false)["border-" + item + "-width"]),
              color = getComputedStyle(element, false)["border-" + item + "-color"];
          //console.log(item + "___" + style + "___" + color + "___" + size)

          if(IsWebkit){
            obj[item] = _webkitGetBorderSize(element, item, size)
          }else if( _browserType() == "Edge"){
            obj[item] = style === "none" ? 0 : size * 2
          }else if(_browserType() == "FF"){
            obj[item] = _ffGetBorderSize(element, item, style, size, color)
          }else{
            obj[item] = size;
          }
        })
        return obj;
      },

      _webkitGetBorderSize = function(element, direction, size){
        if(element.nodeName === "TABLE"){
          var $element     = $(element),
              $firstLine   = $("tr:first > td,th", $element).not(":hidden"),
              $firstColumn = $("th:first-child,td:first-child", $element).not(":hidden");

          if(size === 0){
            return size
          }
          if(direction === "top"){
            var td     = $firstColumn.first()[0];
            var tdsize = parseFloat(getComputedStyle(td, false)["border-top-width"]);
            return Math.max(size, tdsize);
          }
          if(direction === "right"){
            var td     = $firstLine.last()[0];
            var tdsize = parseFloat(getComputedStyle(td, false)["border-right-width"]);
            return Math.max(size, tdsize);
          }
          if(direction === "bottom"){
            var td     = $firstColumn.last()[0];
            var tdsize = parseFloat(getComputedStyle(td, false)["border-bottom-width"]);
            return Math.max(size, tdsize);
          }
          if(direction === "left"){
            var td     = $firstLine.first()[0];
            var tdsize = parseFloat(getComputedStyle(td, false)["border-left-width"]);
            return Math.max(size, tdsize);
          }
        }else{
          return size;
        }
      },

      _ffGetBorderSize = function(element, item, style, size, color){

        if(element.nodeName == "TABLE"){
          var $element     = $(element),
              $firstLine   = $("tr:first > td,th", $element).not(":hidden"),
              $firstColumn = $("th:first-child,td:first-child", $element).not(":hidden");

          if(style === "none"){
            return 0
          }
          if(item === "top"){
            var td     = $firstColumn.first()[0];
            var tdsize = parseFloat(getComputedStyle(td, false)["border-top-width"]);
            return tdsize + size;
          }
          if(item === "right"){
            var td     = $firstLine.last()[0];
            var tdsize = parseFloat(getComputedStyle(td, false)["border-right-width"]);
            return tdsize + size;
          }
          if(item === "bottom"){
            var td     = $firstColumn.last()[0];
            var tdsize = parseFloat(getComputedStyle(td, false)["border-bottom-width"]);
            return tdsize + size;
          }
          if(item === "left"){
            var td     = $firstLine.first()[0];
            var tdsize = parseFloat(getComputedStyle(td, false)["border-left-width"]);
            return tdsize + size;
          }
        }else{
          if(style === "none"){
            return 0;
          }
          var reverseSize = parseFloat(getComputedStyle(element, false)["border-" + _getReverseDir(item) + "-width"])
          return reverseSize + size;
        }
      },

      _getBorderStyle = function(element){
        var obj      = {};
        var IsWebkit = "Chrome, Opera".indexOf(_browserType()) > -1;
        var IsMSIE = _browserType().indexOf("IE") > -1 || _browserType() == "Edge";

        BORDER_ORDER.forEach(function(item, index){
          var size  = parseFloat(getComputedStyle(element, false)["border-" + item + "-width"]);
          var style = getComputedStyle(element, false)["border-" + item + "-style"];
          var color = getComputedStyle(element, false)["border-" + item + "-color"];
          if(IsWebkit){
            size = _webkitGetBorderSize(element, item, size) + "px"
          }else if( _browserType() == "Edge"){
            size = style === "none" ? "0px" : size * 2 + "px";
          }else if(_browserType() == "FF"){
            size = _ffGetBorderSize(element, item, style, size, color) + "px"
          }else{
            size = size + "px"
          }
          if(size !== 0 && style === "none" && _browserType() === "FF"){
            style = getComputedStyle(element, false)["border-" + _getReverseDir(item) + "-style"]
            color = getComputedStyle(element, false)["border-" + _getReverseDir(item) + "-color"]
          }
          obj[item] = size + " " + style + " " + color;
        })
        //console.log(obj)
        return obj;
      },

      lastTime = 0,

      requestAnimationFrame = window.requestAnimationFrame || function(callback, element){
        var currTime   = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id         = window.setTimeout(
          function() { callback(currTime + timeToCall);
        } ,timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      },

      cancelAnimationFrame = window.cancelAnimationFrame || function(id){
        clearTimeout(id);
      },

      /*
      ----------------------------------------
      INTERIOR FUNCTIONS
      ----------------------------------------
      */

      _listener = function(){
        var _that = this;
        $(this).each(function(){
          $(this).parent().data({
            width : $(this).parent().width(),
            height: $(this).parent().height()
          })
        })

        function loop(){
          $(_that).each(function(){
            if($(this).parent().data("width") !== $(this).parent().width()){
              $(this).parent().data("width", $(this).parent().width())
              _updateStyle.call(this)
            }
          })
          setTimeout(function(){
            requsetId = requestAnimationFrame(loop)
          },100)
        }
        loop();
      },

      _clearListerer = function(){
        cancelAnimationFrame(requsetId)
      },

      _initTable = function(element){

        // 生成事件代理属性
        $("[data-proxy]:not([data-proxytarget])", $(element)).each(function(index){
          var target    = eventProxyIds++ + "_proxy",
              eventType = $(this).data("proxy");
          $(this).attr("data-proxytarget", target);
          //$(this).attr("data-proxy", target + "__" +  eventType);
        })

        //为tr 生成line属性为隔行和hover做准备
        $(element).find("tr").each(function(index){
          $(this).attr("line", index + 1)
        })

        // 补上colspan 单元格
        // oldcolspan 记录原单元格colspan值
        // colindex 生成的序号
        $(element).find("[colspan]:not(.freezetable-inited)").each(function(){
          $(this).addClass(_pluginClassName("inited"));
          var colspan = parseInt($(this).attr("colspan")),
              $tr     = $(this).closest("tr"),
              index   = $(this).index();

          for(var i = 1; i < colspan; i++){
            $tr.children().eq(index + i - 1)
            .after("<td class=" + _pluginClassName("hide") + " oldcolspan="+ colspan +" colindex="+ (colspan - i) + "></td>")
          }
        })

        // 补上rowspan 单元格
        $(element).find("[rowspan]:not(.freezetable-inited)").each(function(){
          $(this).addClass(_pluginClassName("inited"));
          var rowspan = parseInt($(this).attr("rowspan"));
          var trIndex = $(this).closest("tr").index();
          var tdIndex = $(this).index();
          var $parent = $(this).parent().parent();
          for(var i = 1; i < rowspan; i++){
            var $tr = $parent.find("tr").eq(trIndex + i),
                $td = $("<td class=" + _pluginClassName("hide") + " oldrowspan="+ rowspan +" rowindex="+ (rowspan - i) +"></td>");
            if($(this).is("tr :last-child")){
              $tr.append($td)
            }else{
              $tr.children().eq(tdIndex).before($td)
            }
          }
        })

        // 生成tree level
        $("[data-tree-level]", element).each(function(){
          var treeLevel = $(this).data("tree-level") + "",
              selector  = "[data-tree-level^='"+ treeLevel +"']",
              $children = $(selector , element).not(this),
              level     = treeLevel.split("-").length;
          if($children.length){
            $(this).prepend("<span class='caret'></span>")
          }
          if(treeLevel !== "header"){
            $(this).wrapInner("<span class='tree-level-wrapper'></span>")
          }
          if(level > 1){
            $(".tree-level-wrapper", this).css("padding-left", (level - 1) * 15)
          }
        })

      },

      _reComputeFreeze = function(options){
        var $element   = $(this),
            $firstRow  = $element.find("th:first-child,td:first-child"),
            $firstLine = $element.find("tr:first").children(),
            obj        = {};

        for(var i in options){
          if(i === "left"){
            var num       = options[i],
                num       = num - 1,
                $children = $firstLine.eq(num);
            if($children.attr("colspan")){
              obj.left = num + parseInt($children.attr("colspan"));
            }else if($children.is(":hidden")){
              obj.left = num + parseInt($children.attr("colindex"));
            }else{
              obj.left = num + 1;
            }
          }

          if(i === "right"){
            var num       = options[i],
                $children = $firstLine.eq(-num);
            if($children.is(":hidden")){
              obj.right = num + parseInt($children.attr("oldcolspan")) - parseInt($children.attr("colindex"));
            }else{
              obj.right = num;
            }
          }

          if(i==="top"){
            var num       = options[i],
                num       = num - 1,
                $children = $firstRow.eq(num);

            if($children.attr("rowspan")){
              obj[i] = num + parseInt($children.attr("rowspan"));
            }else if($children.is(":hidden")){
              obj[i] = num + parseInt($children.attr("rowindex"));
            }else{
              obj[i] = num + 1;
            }
          }

          if(i==="bottom"){
            var num       = options[i],
                $children = $firstRow.eq(-num);

            if($children.is(":hidden")){
              obj[i] = num + parseInt($children.attr("oldrowspan")) - parseInt($children.attr("rowindex"));
            }else{
              obj[i] = num;
            }
          }
        }
        return obj;
      },

      _generateStylesData = function(options){
        var $element        = $(this),
            $parent         = $element.parent(),
            data            = $(this).data(pluginPfx),
            opt             = data.opt,
            freeze          = opt.freeze,
            tableBorderSize = data.tableBorderSize,
            tdBorderSize    = data.tdBorderSize,
            $firstLine      = $("tr:first > td,th", $element),
            $firstColumn    = $("th:first-child,td:first-child", $element),

            tdWidths      = [],
            trHeights     = [],
            leftWidth     = null,
            rightWidth    = null,
            topHeight     = null,
            bottomHeight  = null,
            elementWidth  = null,
            elementHeight = null,

            obj = {
              elementWidth : null,
              elementHeight: null,
              side         : [],
              item         : []
            };

        // 生成列宽度
        tdWidths = $firstLine.map(function(index){
          var index = index + 1,
              $td   = $("td:nth-child("+ index + "), th:nth-child("+ index + ")", $element).not(":hidden, [colspan]");
          //console.log(this, $td)
          if($td.length === 0){return 0}
          // return parseFloat(getComputedStyle($td[0], false).width)
          return $td.outerWidth()
        }).get()
        // 生成行高度
        trHeights = $element.find("tr:visible").map(function(){
          return $(this).outerHeight()
          //console.log(this)
          //console.log(parseFloat(getComputedStyle(this, 0).height))
          //return parseFloat(getComputedStyle(this, 0).height)
        }).get()

        obj.elementWidth  = tdWidths.reduce(_getSum, 0);
        obj.elementHeight = trHeights.reduce(_getSum, 0);
        leftWidth         = options.left ? tdWidths.slice(0, options.left).reduce(_getSum) : 0;
        rightWidth        = options.right ? tdWidths.slice(-options.right).reduce(_getSum) : 0
        topHeight         = options.top ? trHeights.slice(0, options.top).reduce(_getSum) : 0;
        bottomHeight      = options.bottom ? trHeights.slice(-options.bottom).reduce(_getSum) : 0;

        // FF tableBorderSize.right 奇数有问题
        // 左冻结并有左边框
        if(freeze.left && tableBorderSize.left){
          var size       = tableBorderSize.left;
              size       = size % 2 == 0 ? size / 2 : (size + 1) / 2;
              leftWidth += size;

          tdWidths[0]           -= size;
          tdWidths[freeze.left] -= size;
        }

        if(freeze.left && !tableBorderSize.left){
          var size = tdBorderSize.right || tdBorderSize.left;

          tdWidths[freeze.left] -= size;

          leftWidth += size
        }

        if(!freeze.left && tableBorderSize.left){
          var size = tableBorderSize.left;
              size = size % 2 == 0 ? size / 2 : (size + 1) / 2;

          tdWidths[0] -= size;
        }

        if(!freeze.left && !tableBorderSize.left ){
          var size = tdBorderSize.left || tdBorderSize.right;

          tdWidths[0] -= size;

          leftWidth = tdBorderSize.left || tdBorderSize.right;
        }


        // right
        if(freeze.right && tableBorderSize.right){
          var size        = tableBorderSize.right;
              size        = size % 2 == 0 ? size / 2 : (size + 1) / 2;
              rightWidth += size-1;

              tdWidths[tdWidths.length - 1]                -= size
              tdWidths[tdWidths.length - freeze.right - 1] -= size
        }

        if(freeze.right && !tableBorderSize.right){
          var size        = tdBorderSize.right || tdBorderSize.left;
              rightWidth += size

          tdWidths[tdWidths.length - freeze.right - 1] -= size
        }

        if(!freeze.right && tableBorderSize.right){

          var size = tableBorderSize.right;
              size = size % 2 == 0 ? size / 2 : (size + 1) / 2;

          tdWidths[tdWidths.length - 1] -= size;
        }

        if(!freeze.right && !tableBorderSize.right){

          var size = tdBorderSize.right || tdBorderSize.left;
              size = size % 2 == 0 ? size / 2 : (size + 1) / 2;

          tdWidths[tdWidths.length - 1] -= size;

          rightWidth = tdBorderSize.right || tdBorderSize.left;
        }

        // top
        // TODO
        // webkit 下好像 table height:100%没起作用
        if(freeze.top && tableBorderSize.top){
          var size       = tableBorderSize.top;
              size       = size % 2 == 0 ? size / 2 : (size + 1) / 2;
              topHeight += size - (_browserType() === "Chrome" ? size : 0);

          trHeights[0]          -= size
          trHeights[freeze.top] -= size;
        }

        if(freeze.top && !tableBorderSize.top){
          var size       = tdBorderSize.bottom || tdBorderSize.top;
              size       = size % 2 == 0 ? size / 2 : (size + 1) / 2;
              topHeight += size;

          trHeights[0]          -= size;
          trHeights[freeze.top] -= size;
        }

        if(!freeze.top && tableBorderSize.top){
          var size = tableBorderSize.top;
              size = size % 2 == 0 ? size / 2 : (size + 1) / 2;

          trHeights[0] -= size;
        }

        if(!freeze.top && !tableBorderSize.top){
          var size = tdBorderSize.top || tdBorderSize.bottom;

          trHeights[0] -= size;

          topHeight = tdBorderSize.top || tdBorderSize.bottom;

        }

        // bottom
        if(freeze.bottom && tableBorderSize.bottom){
          var size = tdBorderSize.top || tdBorderSize.bottom;        //TODO
              size = size % 2 == 0 ? size / 2 + 1 : (size + 1) / 2;

          bottomHeight += size;

          trHeights[trHeights.length - freeze.bottom - 1] -= size;
        }

        if(freeze.bottom && !tableBorderSize.bottom){
          var size          = tdBorderSize.bottom || tdBorderSize.top;
              bottomHeight += size;

          trHeights[trHeights.length - freeze.bottom - 1] -= size;
        }

        if(!freeze.bottom && tableBorderSize.bottom){
          var size = tableBorderSize.bottom;
              size = size % 2 == 0 ? size / 2 : (size + 1) / 2;

          trHeights[trHeights.length - 1] -= size;
        }

        if(!freeze.bottom && !tableBorderSize.bottom){
          var size         = tdBorderSize.bottom || tdBorderSize.top;
              bottomHeight = tdBorderSize.bottom|| tdBorderSize.top;

          trHeights[trHeights.length - 1] -= size;

        }


        if(options.left){
          obj.side.push({
            name      : "left",
            range     : [0, options.left],
            cellStyles: Array.prototype.slice.apply(tdWidths, [0, options.left]),
            style     : {
              width: leftWidth
            },
            offset: 0
          })
        }else{
          if(!tableBorderSize.left){
            obj.side.push({
              name      : "left",
              range     : [0, 1],
              cellStyles: Array.prototype.slice.apply(tdWidths, [0, 1]),
              style     : {
                width: leftWidth
              },
              emptyTd: true
            })
          }
        }

        obj.side.push({
          name      : "center",
          range     : [options.left, options.right ? -options.right : undefined],
          cellStyles: Array.prototype.slice.apply(tdWidths, [options.left, options.right ? -options.right : undefined]),
          style     : {
            left : leftWidth,
            right: rightWidth  // TODO 貌似parent 宽度带小数会有一像素误差
          }
        })

        if(options.right){
          obj.side.push({
            name      : "right",
            range     : [-options.right],
            cellStyles: Array.prototype.slice.apply(tdWidths, [-options.right]),
            style     : {
              width: rightWidth + 1
            },
            offset: 0
          })
        }else{
          if(!tableBorderSize.right){
            obj.side.push({
              name      : "right",
              range     : [-1],
              cellStyles: tdWidths.slice(-1),
              style     : {
                width: rightWidth
              },
              emptyTd: true
            })
          }
        }

        obj.side.push({
          name      : "scroll-vertical",
          range     : [-1],
          cellStyles: tdWidths.slice(-1),
          style     : {
            width: null
          },
          emptyTd: true
        })

        if(options.top){
          obj.item.push({
            name      : "top",
            range     : [ 0, options.top ],
            cellStyles: Array.prototype.slice.apply(trHeights, [0, options.top]),
            style     : {
              height: topHeight
            },
            offset: 0
          })
        }else{
          if(!tableBorderSize.top){
            obj.item.push({
              name      : "top",
              range     : [0, 1],
              cellStyles: tdWidths.slice(0,1),
              style     : {
                height: topHeight
              },
              emptyTd: true
            })
          }
        }


        obj.item.push({
          name      : "middle",
          range     : [options.top, options.bottom ? - options.bottom : undefined],
          cellStyles: Array.prototype.slice.apply(trHeights, [options.top, options.bottom ? - options.bottom : undefined]),
          style     : {
            top   : topHeight,
            bottom: bottomHeight
          }
        })

        if(options.bottom){
          obj.item.push({
            name      : "bottom",
            range     : [-options.bottom],
            cellStyles: Array.prototype.slice.apply(trHeights, [-options.bottom]),
            style     : {
              height: bottomHeight
            },
            offset: 0
          })
        }else{
          if(!tableBorderSize.bottom){
            obj.item.push({
              name      : "bottom",
              range     : [-1],
              cellStyles: tdWidths.slice(-1),
              style     : {
                height: bottomHeight
              },
              emptyTd: true
            })
          }
        }

        obj.item.push({
          name      : "scroll-horizontal",
          range     : [-1],
          cellStyles: trHeights.slice(-1),
          style     : {
            width: null
          },
          emptyTd: true
        })

        return obj
      },

      _generateHtml = function(){
        var $element   = $(this),
            data       = $element.data(pluginPfx),
            opt        = data.opt,
            stylesData = data.stylesData,
            $wrapper   = $("<div class='freezetable-wrapper'></div>"),
            $hmtl      = $("<div class='" + pluginPfx + "-container'></div>");

        $.each(stylesData.side, function(index, side){
          var $side = $("<div>").addClass(pluginPfx + "-" + side.name);
          if(side.emptyTd){
            $side.addClass("emptytd")
          }
          $.each(stylesData.item, function(index, item){
            var $item = $("<div>").addClass( pluginPfx + "-" + item.name);
            if(item.emptyTd){
              $item.addClass("emptytd")
            }
            $item.append(_caeateTable($element, side, item));
            $side.append($item);
          })
          $hmtl.append($side);
        })

        // remove scroll element
        $hmtl.find(".freezetable-scroll-horizontal")
          .find("tr").removeAttr("line")
        .end()
          .find("td,th").removeAttr("row").empty()
        .end()
        .not(".freezetable-center>.freezetable-scroll-horizontal").remove();
        
        $hmtl.find(".freezetable-scroll-vertical > div")
          .find("colgroup").remove()
        // .end()
        //   .find("tr").removeAttr("line")
        //   .find("td,th").empty()
        .end()
        .not(".freezetable-middle").remove();

        // remove hide colspan
        // TODO 删横向（colspan），保留纵向
        $hmtl.find(".freezetable-hide[oldcolspan]").remove();
        
        // TODO
        $(".emptytd", $hmtl)
          .find("td, th").empty()
        // .end()
        //   .find("tr").removeAttr("line")

        //$("[data-proxytarget]", $hmtl).removeAttr("data-proxytarget");

        $element
          .addClass(debug ? null : "freezetable-opacity-hide")
          //.wrap($wrapper)
          .after($hmtl);

        // TODO
        // 作为底部边框线的td 要显示出来
        $(".freezetable-bottom.emptytd td", $hmtl).removeClass("freezetable-hide")
      },

      _caeateTable = function($element, sideOpts, itemOpts){
        var $table    = $("<table>").addClass($element.attr("class")),
            $colgroup = $("<colgroup>"),
            trAry     = Array.prototype.slice.apply($element.find("tr"), itemOpts.range);
        // colgroup
        $.map(sideOpts.cellStyles, function(style, index){
          $colgroup.append($("<col>"))
        })
        $table.append($colgroup);
        // tr
        $.each(trAry, function(index, tr){
          var $tr            = $(this).clone().empty(),
              tdAry          = Array.prototype.slice.apply($(this).children(), sideOpts.range),
              parentNodeName = $(this).parent()[0].nodeName;

          if("THEADTBODYTFOOT".indexOf(parentNodeName) > -1){
            if($table.find(parentNodeName).length){
              $table.find(parentNodeName).append($tr)
            }else{
              var $parent = $(this).parent().clone().empty();
              $table.append($parent.append($tr))
            }
          }
          $.each(tdAry, function(index, td){
            var $td = $(td);
            $table.find("tr:last")
            .append(
              $td.clone(true, true)
              .attr("row", $(this).index() + 1)
            )
          })
        })
        return $table;
      },

      _borderStyle = function(){
        var _that            = this,
            $element         = $(this),
            data             = $element.data(pluginPfx),
            opt              = data.opt,
            freeze           = opt.freeze,
            tableBorderSize  = data.tableBorderSize,
            tdBorderSize     = data.tableBorderSize,
            tableBorderStyle = data.tableBorderStyle,
            tdBorderStyle    = data.tdBorderStyle,
            $freezeElement   = $element.next();

        for(var name in tdBorderSize){
          var item        = tdBorderSize[name],
              reverseItem = tdBorderSize[_getReverseDir(name)];

          if(item === 0 &&  reverseItem !== 0){
            var $wrapper = $(".freezetable-" + name, $freezeElement);
            if(name === "top"){
              $wrapper.find("tr:last > td,th").each(function(){
                $(this).css("border-bottom", tdBorderStyle.top);
              })
            }

            if(name === "right"){
              $("td:first-of-type, th:first-of-type", $wrapper).each(function(){
                $(this).css("border-left", tdBorderStyle.right)
              })
            }

            if(name === "bottom"){
              $wrapper.find("tr:first > td,th").each(function(){
                $(this).css("border-top", tdBorderStyle.bottom)
              })
            }

            if(name === "left"){
              $("td:last-of-type, th:last-of-type", $wrapper).each(function(){
                $(this).css("border-right", tdBorderStyle.left)
              })
            }

          }
        }


        for(var name in tableBorderSize){
          var item = tableBorderSize[name];
          if(item !==0 && !freeze[name]){
            var clearClass = "clear-border-" + name;

            $freezeElement.css("border-" + name, tableBorderStyle[name]).addClass(clearClass);
          }
        }

      },

      _generateSeparateColor = function(){
        var $element       = $(this),
            $freezeElement = $(this).next(),
            $trs           = $("tbody tr", $freezeElement),
            data           = $element.data(pluginPfx),
            separateColor  = data.opt.separateColor,
            firstLine      = parseInt($("tbody tr:first", $element).attr("line")) - 1;

        if($("tbody tr, tfoot tr", $element).length % 2 === 1){
          $("tbody tr, tfoot tr", $freezeElement).each(function(){
            if((parseInt($(this).attr("line") - firstLine)) % 2 === 1){
              $(this).css("background", separateColor[0])
            }else{
              $(this).css("background", separateColor[1])
            }
          })
        }else{
          $("tbody tr, tfoot tr", $freezeElement).each(function(){
            if((parseInt($(this).attr("line") - firstLine)) % 2 === 1){
              $(this).css("background", separateColor[1])
            }else{
              $(this).css("background", separateColor[0])
            }
          })
        }
      },

      _generateScroll = function(){
        var $element          = $(this),
            $freezeElement    = $(this).next(),
            $horizontalScroll = $(".freezetable-scroll-horizontal", $freezeElement),
            $verticalScroll   = $(".freezetable-scroll-vertical .freezetable-middle", $freezeElement);

        $horizontalScroll.addClass("horizontal");
        $verticalScroll.addClass("vertical");
        $horizontalScroll.add($verticalScroll)
        .addClass("custom-scroll")
        .wrapInner("<div class='scrollbox'></div>")
        .append(SCROLLTOOL)

        _updateScroll.call(this);
      },

      _updateScroll = function(){
        var $element       = $(this),
            data           = $element.data(pluginPfx),
            $freezeElement = $element.next(),

            horScroll = function(){
              var $wrapper    = $(".custom-scroll.horizontal", $freezeElement),
                  wrapperSize = $wrapper.width(),
                  contentSize = $("table", $wrapper).outerWidth(),
                  ratio       = wrapperSize / contentSize,
                  hiddenPart  = (hiddenPart = contentSize - wrapperSize) < 0 ? 0 : hiddenPart,
                  scrollToolSize = $(".scrolltool", $wrapper).width(),
                  scrollBarSize  = (scrollBarSize = scrollToolSize * ratio) < SCROLLBARMINSIZE ? SCROLLBARMINSIZE : scrollBarSize;
              return {
                $wrapper             : $wrapper,
                wrapperSize          : wrapperSize,
                contentSize          : contentSize,
                ratio                : ratio,
                hiddenPart           : hiddenPart,
                scrollToolSize       : scrollToolSize,
                scrollBarSize        : scrollBarSize,
                _getContentPosition  : _getContentPosition,
                _getScrollBarPosition: _getScrollBarPosition
              }
            }(),

            verScroll = function(){
              var $wrapper    = $(".custom-scroll.vertical", $freezeElement),
                  wrapperSize = $wrapper.height(),
                  contentSize = $("table", $wrapper).outerHeight(),
                  ratio       = wrapperSize / contentSize,
                  hiddenPart  = (hiddenPart = contentSize - wrapperSize) < 0 ? 0 : hiddenPart,
                  scrollToolSize = $(".scrolltool", $wrapper).height(),
                  scrollBarSize  = (scrollBarSize = scrollToolSize * ratio) < SCROLLBARMINSIZE ? SCROLLBARMINSIZE : scrollBarSize;
              return{
                $wrapper             : $wrapper,
                wrapperSize          : wrapperSize,
                contentSize          : contentSize,
                ratio                : ratio,
                hiddenPart           : hiddenPart,
                scrollToolSize       : scrollToolSize,
                scrollBarSize        : scrollBarSize,
                _getContentPosition  : _getContentPosition,
                _getScrollBarPosition: _getScrollBarPosition
              }
            }();

        data.horScroll = horScroll;
        data.verScroll = verScroll;

        // setting scrollbar size
        $(".scrollbar", horScroll.$wrapper).width(horScroll.scrollBarSize)
        $(".scrollbar", verScroll.$wrapper).height(verScroll.scrollBarSize)

        // Determine whether show scrolltool
        $(".scrolltool", horScroll.$wrapper)
          .css("display", horScroll.ratio >= 1 ? "none" : "")

        $(".scrolltool", verScroll.$wrapper)
          .css("display", verScroll.ratio >= 1 ? "none" : "")

        // 根据表格位置计算得到scrollbar位置
        var left = $("table", horScroll.$wrapper).position().left;
        var top  = $("table", verScroll.$wrapper).position().top;

        if(Math.abs(left) > horScroll.hiddenPart){
          $(".freezetable-center table", $freezeElement).css("left", -horScroll.hiddenPart)
          $(".scrollbar", horScroll.$wrapper).css("left", horScroll.scrollToolSize - horScroll.scrollBarSize)
        }else{
          $(".scrollbar", horScroll.$wrapper).css("left", horScroll._getScrollBarPosition(left))
        }

        if(Math.abs(top) > verScroll.hiddenPart){
          $(".freezetable-middle table", $freezeElement).css("top", -verScroll.hiddenPart)
          $(".scrollbar", verScroll.$wrapper).css("top", verScroll.scrollToolSize - verScroll.scrollBarSize)
        }else{
          $(".scrollbar", verScroll.$wrapper).css("top", verScroll._getScrollBarPosition(top))
        }
      },

      _getContentPosition = function(position){
        return -position / (this.scrollToolSize - this.scrollBarSize) * this.hiddenPart;
      },

      _getScrollBarPosition = function(position){
        return Math.abs((this.scrollToolSize - this.scrollBarSize) * (position / this.hiddenPart))
      },

      _drop = function(){
        var $element    = null,
            diffX       = 0,
            diffY       = 0,
            wrapperLeft = 0,
            wrapperTop  = 0,
            direction   = "horizontal",
            maxLeft     = 0,
            maxTop      = 0;

        function handleEvent(event){
          var type = event.type;

          switch(type){
            case "mousedown": 
              if(!$(event.target).hasClass("scrollbar")){return};
              $element    = $(event.target);
              wrapperLeft = $element.closest(".scrolltool").offset().left;
              wrapperTop  = $element.closest(".scrolltool").offset().top;
              diffX       = event.clientX - $element.offset().left
              diffY       = event.clientY - $element.offset().top;
              direction   = $element.closest(".custom-scroll").hasClass("horizontal") ? "horizontal" : "vertical";
              maxLeft     = $element.parent().width() - $element.width();
              maxTop      = $element.parent().height() - $element.height();
              $("body").addClass("noselect")
              var e = $.Event("dorpstart.freezetable",{
                $element: $element
              })
              $element.trigger(e);
              break;
            case "mousemove": 
              if($element == null || !$element.hasClass("scrollbar")){return}
              var left = event.clientX - diffX - wrapperLeft,
                  top  = event.clientY - diffY - wrapperTop;
                  left = left < 0 ? 0 : left > maxLeft ? maxLeft : left;
                  top  = top < 0 ? 0 : top > maxTop ? maxTop : top;

              var e    = $.Event("dorping.freezetable", {
                left     : left,
                top      : top,
                direction: direction
              })

              $element.trigger(e);
              break;
            case "mouseup": 
              if($element){
                $("body").removeClass("noselect");

                var e = $.Event("dorpend.freezetable",{
                  $element: $element
                })
                $element.trigger(e);
              }
              $element = null;
              break;
          }
        }

        $(document).on("mousedown.freezetable mousemove.freezetable mouseup.freezetable", handleEvent)
      },

      _bindEvent = function(){
        var _that          = this,
            $element       = $(this),
            data           = $element.data(pluginPfx),
            opt            = data.opt,
            $freezeElement = $element.next(),

            $hor = $(".freezetable-center", $freezeElement),
            $ver = $(".freezetable-middle:not('.freezetable-center .freezetable-middle')", $freezeElement);
        
        $freezeElement
        .on("dorpstart.freezetable", ".scrollbar", function(event){
          event.$element.closest(".custom-scroll").addClass("scrolling")
        })
        .on("dorping.freezetable", ".scrollbar", function(event){
          var left              = event.left,
              top               = event.top,
              direction         = event.direction,
              $target           = $(event.target),
              $horizontalTables = $freezeElement.find(".freezetable-center table"),
              $verticalTables   = $freezeElement.find(".freezetable-middle table");

          if(direction == "horizontal"){
            $target.css("left", left)
            $horizontalTables.css("left" , data.horScroll._getContentPosition(left))
          }else{
            $target.css("top", top)
            $verticalTables.css("top" , data.verScroll._getContentPosition(top))
          }
        })
        .on("dorpend.freezetable", ".scrollbar", function(event){
          event.$element.closest(".custom-scroll").removeClass("scrolling")
        })
        //
        .on("mouseenter.freezetable", "table", function(event){
          var $horScroll = $(".freezetable-scroll-horizontal", $freezeElement),
              $verScroll = $(".freezetable-scroll-vertical .custom-scroll", $freezeElement),
              isHor      = $(event.target).closest(".freezetable-center").length > 0,
              isVer = $(event.target).closest(".freezetable-middle:not('.freezetable-center .freezetable-middle')").length > 0;

          // 2019-04-26 添加注释

          // 如果横向滚动条不显示，侧中middle可以触发竖向
          // if(data.horScroll.hiddenPart === 0){
          //   isHor = false;
          //   isVer = $(event.target).closest(".freezetable-middle").length > 0
          // }
          // if(isHor){
          //   $horScroll.addClass("hover")
          // }
          // if(isVer){
          //   $verScroll.addClass("hover")
          // }

          // 2019-04-26
          // 只纵不横
          $verScroll.addClass("hover")
        })
        .on("mouseleave.freezetable", "table", function(event){
          var $horScroll = $(".freezetable-scroll-horizontal", $freezeElement),
              $verScroll = $(".freezetable-scroll-vertical .custom-scroll", $freezeElement),
              isHor      = $(event.target).closest(".freezetable-center").length > 0,
              isVer = $(event.target).closest(".freezetable-middle:not('.freezetable-center .freezetable-middle')").length > 0;

          // 2019-04-26 添加注释
          // 如果横向滚动条不显示，侧中middle可以触发竖向
          // if(data.horScroll.hiddenPart === 0){
          //   isHor = false;
          //   isVer = $(event.target).closest(".freezetable-middle").length > 0
          // }
          // if(isHor){
          //   $horScroll.removeClass("hover")
          // }
          // if(isVer){
          //   $verScroll.removeClass("hover")
          // }

          // 2019-04-26
          // 只纵不横
          $verScroll.removeClass("hover")
        })
        // mousewheel
        .on("mousewheel.freezetable", $.proxy(_mouseWheel, this))
        // hover tr
        .on("mouseenter.freezetable", "tbody td, tfoot, td", function(){
          var $line = $("tr[line="+ $(this).parent().attr("line") +"] td", $freezeElement)
          var $row  = $("td[row="+ $(this).attr("row") +"]", $freezeElement)
          $line.css("background", opt.lineHoverColor)
          $row.css("background", opt.rowHoverColor)
        })
        .on("mouseleave.freezetable", "tbody td, tfoot td", function(){
          var $line = $("tr[line="+ $(this).parent().attr("line") +"] td", $freezeElement)
          var $row  = $("td[row="+ $(this).attr("row") +"]", $freezeElement)
          $line.css("background", "")
          $row.css("background", "")
        })
        // click tr
        .on("click.freezetable", "tbody td, tfoot td", function(event){
          var className = $(this).closest("div").attr("class");
          var tr = $(this).closest("tr");
          var $tr = $("." + className + " tr[line="+ tr.attr("line") +"]:not('.custom-scroll tr')", $freezeElement);
          opt.callback.trClick($tr)

          // 事件委托
          // use $(document).on("tdClick.freezetable", function(){})
          var e = $.Event("tdClick.freezetable", {
            oldEvent: event,
            $tr: $tr,
            $td: $(this)
          })
          $element.trigger(e);

        })
        .on("click.freezetable", "[data-tree-level] .tree-level-wrapper", function(){
          var $td       = $(this).closest("td"),
              treeLevel = $td.data("tree-level") + "",
              selector  = "[data-tree-level^='"+ treeLevel +"']",
              isShow    = $(this).hasClass("collapse"),
              mo        = data.mo;

          $(this).toggleClass("collapse");
          $(selector, $freezeElement).not($td).each(function(){
            var $tr  = $(this).closest("tr"),
                line = $tr.attr("line");


            if(isShow){
              $("[line=" + line + "]", $element).removeClass("freezetable-hide").find(".tree-level-wrapper").removeClass("collapse")
              $("[line=" + line + "]", $freezeElement).removeClass("freezetable-hide").find(".tree-level-wrapper").removeClass("collapse")
            }else{
              $("[line=" + line + "]", $element).addClass("freezetable-hide").find(".tree-level-wrapper").addClass("collapse")
              $("[line=" + line + "]", $freezeElement).addClass("freezetable-hide").find(".tree-level-wrapper").addClass("collapse")
            }
          })
          _updateStyle.call(_that);
        })
        // .on("click.freezetable", "[data-proxy]", function(){
        //   var target = $(this).data("proxytarget"),
        //       event  = $(this).data("proxy");
        //   console.log(target, event)
        //   //console.log($("[data-proxytarget='" + target + "']", $element))
        //   $("[data-proxytarget='" + target + "']", $element).trigger(event)

        // })
      },

      _mouseWheel = function(event){
        var _that          = this,
            $element       = $(this),
            data           = $element.data(pluginPfx),
            freeze         = data.opt.freeze,
            scrollDistance = data.opt.scrollDistance,
            $freezeElement = $element.next(),
            data           = $freezeElement.prev().data(pluginPfx),

            $horScroll = $(".freezetable-scroll-horizontal", $freezeElement),
            $verScroll = $(".freezetable-scroll-vertical", $freezeElement),
            isHor      = $(event.target).closest(".freezetable-center").length > 0 && (freeze.left || freeze.right),
            // isVer = $(event.target).closest(".freezetable-middle:not('.freezetable-center .freezetable-middle')").length > 0  && (freeze.top || freeze.bottom),
            isVer = freeze.top || freeze.bottom,
            distance = event.deltaY * scrollDistance,
            left     = $("table", $horScroll).position().left,
            top      = $("table", $verScroll).position().top;

        // 如果横向滚动条不显示，侧中middle可以触发竖向
        // if(data.horScroll.hiddenPart === 0){
        //   isVer = $(event.target).closest(".freezetable-middle").length > 0
        // }

        // 2019-04-26 添加注释
        // // hor
        // if(isHor){
        //   var scrollTo = left + distance;
        //       scrollTo = scrollTo <= -data.horScroll.hiddenPart ? -data.horScroll.hiddenPart : scrollTo > 0 ? 0 : scrollTo;
        //   if(scrollTo - left !== 0 ){
        //     _tween.call(_that, "hor", left, scrollTo- left);
        //   }

        //   event.preventDefault();
        // }
        // // ver
        // if(isVer){
        //   var scrollTo = top + distance;
        //       scrollTo = scrollTo <= -data.verScroll.hiddenPart ? -data.verScroll.hiddenPart : scrollTo > 0 ? 0 : scrollTo;
        //   if(scrollTo - top !== 0 ){
        //     _tween.call(_that, "ver", top, scrollTo - top);
        //   }

        //   event.preventDefault();
        // }

        // 2019-04-26
        // 只纵不横
        if(isVer){
          var scrollTo = top + distance;
          scrollTo = scrollTo <= -data.verScroll.hiddenPart ? -data.verScroll.hiddenPart : scrollTo > 0 ? 0 : scrollTo;
          if(scrollTo - top !== 0 ){
            _tween.call(_that, "ver", top, scrollTo - top);
          }
          event.preventDefault()
        }
      },

      _tween = function(direction, form ,distance){
        var $element       = $(this);
        var $freezeElement = $(this).next();
        var data           = $element.data(pluginPfx);
        var now            = Date.now();
        var animateId      = $element[0].animateId;
        var durationTime   = data.opt.durationTime;

        var $verticalTables  = $(".freezetable-middle table", $freezeElement);
        var $horizontalTable = $(".freezetable-center table", $freezeElement);

        if(animateId){
          cancelAnimationFrame(animateId)
        }
        function step(){
          var n = (n = Date.now() - now) < durationTime ? n : durationTime;
          var value = TWEEN.Linear(n, form, distance, durationTime);
          if(direction == "hor"){
            $horizontalTable.css("left", value)
            $(".freezetable-scroll-horizontal .scrollbar", $freezeElement).css("left", data.horScroll._getScrollBarPosition(-value))
            $(".freezetable-scroll-horizontal", $freezeElement).addClass("scrolling")
          }else{
            $verticalTables.css("top", value)
            $(".freezetable-scroll-vertical .scrollbar", $freezeElement).css("top", data.verScroll._getScrollBarPosition(-value))
            $(".freezetable-scroll-vertical .custom-scroll", $freezeElement).addClass("scrolling")
          }
          if(n < durationTime){
            $element[0].animateId = requestAnimationFrame(step)
          }else{
            cancelAnimationFrame($element[0].animateId)
            $(".custom-scroll", $freezeElement).removeClass("scrolling")
          }
        }
        step()
      },

      _eventProxy = function(){
        var $element       = $(this),
            $freezeElement = $element.next();

        $("[data-proxy]", $freezeElement).each(function(){
          var $proxy = $(this),
              event = $(this).data("proxy"),
              target = $(this).data("proxytarget");          

          $proxy.off('.freezetable-proxy').on(event + '.freezetable-proxy', function(){
            $("[data-proxytarget='" + target + "']", $element).trigger(event);
          })
        })

      },

      _updateStyle = function(){
        // TODO turbolinks:request-end 没有清除 cancelAnimationFrame
        if(!$(this).data(pluginPfx)){ return}
        var $element        = $(this),
            $freezeElement  = $element.next(),
            data            = $element.data(pluginPfx),
            tableBorderSize = data.tableBorderSize,
            opt             = data.opt,
            freeze          = opt.freeze,
            stylesData      = data.stylesData,
            stylesData      = _generateStylesData.call(this, opt.freeze),
            parentWidth     = $element.parent().width();
        //console.log(stylesData)
        $element.parent()
        //.height(opt.setHeight ? opt.setHeight : $element.height() + tableBorderSize.top + tableBorderSize.bottom)
        .height(opt.setHeight ? opt.setHeight : stylesData.elementHeight + 1)
        //.width(opt.setWidth ? opt.setWidth : $element.outerWidth())
        .css({
          "width": opt.setWidth ? opt.setWidth: "100%"
        });

        // warpper可能出现小数
        //if(String(parentWidth).indexOf(".") >= 0){
          //$freezeElement.width(parentWidth)
        //}

        $.each(stylesData.side, function(index, side){
          var $side = $(".freezetable-" + side.name, $freezeElement);
          $side.css(side.style)
          .find("colgroup>col").each(function(){
            $(this).css("width", side.cellStyles[$(this).index()])
          })
        })

        $.each(stylesData.item, function(index, item){
          var $item         = $(".freezetable-" + item.name, $freezeElement),
              firstLineAttr = parseInt($("tr:first", $item).attr("line"));
          $item.css(item.style)
          .find("tr").each(function(){
            var index = parseInt($(this).attr("line")) -firstLineAttr;
            var style = item.cellStyles[index];
            if(style){
              $(this).css("height", style)
            }
          })
        })

        // stylesData.side.forEach(function(side){
        //   var $side        = $(".freezetable-" + side.name, $freezeElement);
        //   var warpperWidth = $side.outerWidth();
        //   var tableWidth   = $("table", $side).outerWidth();
        //   var size         = warpperWidth < tableWidth ? tableWidth : warpperWidth;
        //   if(side.name === "left" && freeze.left){
        //     $side.css("width", size)
        //     $side.next().css("left", size - side.offset)
        //   }
        //   if(side.name === "right" && freeze.right){
        //     $side.css("width", size)
        //     $side.prev().css("right", size)
        //   }
        // })

        // stylesData.item.forEach(function(item){
        //   var $item        = $(".freezetable-" + item.name, $freezeElement);
        //   var warpperWidth = $item.outerHeight();
        //   var tableWidth   = $("table", $item).outerHeight();
        //   var size         = warpperWidth < tableWidth ? tableWidth : warpperWidth;

        //   if(item.name === "top" && freeze.top){
        //     $item.css("height", size)
        //     $item.next().css("top",  size - item.offset)
        //   }
        //   if(item.name === "bottom" && freeze.bottom){
        //     $item.css("height", size)
        //     $item.prev().css("bottom",  size - item.offset)
        //   }
        // })

        _updateScroll.call(this);
      },

      /**
       ----------------------------------------
       暂时不要了
       ----------------------------------------
       */
      _DOMchange = function(records, observer){
        console.log(records, observer)
        var _that = this;
        records.forEach(function(item, index){
          // change attribute
          if(item.type === "attributes"){
            var attributeName = item.attributeName;
            var igrone        = "data-proxy, data-proxytarget, line, id";

            // igrone some plugin attribute
            if(igrone.indexOf(attributeName) >= 0) return
            if(attributeName === "class"){
              if($(item.target).is("td.freezetable-inited")) return
            }
            _changeAttribute.call(_that)
          }

          if(item.type === "childList"){
            // add element
            if(item.addedNodes.length>0){
              if($(item.addedNodes).is("td.hide")){
                return false;
              }
              // var $prev = item.previousSibling ? $(item.previousSibling) : $("tr:last", item.target);
              // console.log($prev)
              // _addElement.call(_that, $prev, item.addedNodes)

              item.addedNodes.forEach(function(element){
                _addElement.call(_that, element)
              })
            }

            // remove element
            if(item.removedNodes.length>0){
              _removeElement.call(_that, item.removedNodes)
            }

          }
          //console.log(item)
        })
      },     

      _addElement = function(elements){
        _initTable.call(this, $(this));
        var $element = $(this),
            $freezeElement = $element.next(),
            data = $element.data(pluginPfx),
            freeze         = data.opt.freeze,
            stylesData     = data.stylesData,

            $tr = $(elements),
            $parent = $tr.parent(),
            $prev = $tr.prev();


          
        stylesData.side.forEach(function(side, index){
          var $wrapper = $freezeElement.find(".freezetable-" + side.name);
          var $referencePosition;
          
          var $newTr = $tr.clone().empty()
          var tds = Array.prototype.slice.apply($tr.children(), side.range);
          $(tds).each(function(index, td){
            var $td = $(td);
            $newTr.append(
              $td.clone()
              .attr("row", $(this).index() + 1)
            )
          })

          if($prev.length > 0){
            $referencePosition = $("[line=" + $prev.attr("line") +"]", $wrapper);
            $referencePosition.after($newTr)
          }else{
            var $middle = $(".freezetable-middle table", $wrapper)
            if($($parent[0].nodeName, $middle).length <= 0){
              //var $e = $("<" + $parent[0] + ">");
              $middle.append($("<tbody>"))
            }
            $referencePosition = $("tbody", $middle)
            $referencePosition.prepend($newTr)
          }

          console.log($newTr.children())

        })    
        
        _eventProxy.call(this);
        _borderStyle.call(this);
        _generateSeparateColor.call(this);
        _updateStyle.call(this);
      },

      _removeElement = function(elements){
        var $element       = $(this),
            data           = $element.data(pluginPfx),
            freeze         = data.opt.freeze,
            lineNumer      = data.lineNumer,
            $freezeElement = $element.next();

            console.log(lineNumer, freeze.bottom)
        $(elements).each(function(){
          var line = parseInt($(this).attr("line"));
          console.log(line, lineNumer, freeze.bottom)
          // if(line > lineNumer - freeze.bottom){
          //   $.error("sorry，you can't delete freeze line")
          // }
          $("tr[line="+ line +"]", $freezeElement).remove()
        })

        _borderStyle.call(this);
        _generateSeparateColor.call(this);
        _updateStyle.call(this);
      },

      _changeAttribute = function(){
        _updateStyle.call(this);
      },

      _test = function(){
        console.log(this)
      }


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




  }
)
