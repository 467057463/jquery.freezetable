const defaults = {
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
}

export default defaults