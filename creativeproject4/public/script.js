//For checking hex colors
var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#ac3');

//For checking color names
var CSS_COLOR_NAMES =
  ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure",
   "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue",
   "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse",
   "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson",
   "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray",
   "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen",
   "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen",
   "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet",
   "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue",
   "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro",
   "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey",
   "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed",
   "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush",
   "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan",
   "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink",
   "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray",
      "LightSlateGrey",
   "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen",
   "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid",
   "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen",
      "MediumTurquoise",
   "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin",
   "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab",
   "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen",
   "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru",
   "Pink", "Plum", "PowderBlue", "Purple", "Red",
   "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown",
   "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue",
   "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen",
   "SteelBlue", "Tan", "Teal", "Thistle", "Tomato",
   "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke",
   "Yellow", "YellowGreen"];

var app = new Vue({
  el: '#app',
  data: {
    paletteName: '',
    colors: [],
    palettes: [
      //{name:'WordColors', colors: ['red','blue','white','black']},
      {name:'DEMO: Wedding Colors', colors: ['purple','yellow','silver','white']},
      {name: "DEMO: BYU Colors", colors: ['#162342','#1D2D5C','#FFFFFF',
                                    '#E4E4E4']},
      //{name:'Princeton', colors: ['#262626','#D88946']}
    ],
  },
  computed: {
    //No computed values yet
  },
  watch: {
    number: function(value, oldValue) {
      //Stuff
    },
  },
  created: function() {
    //Called when vue is created
    //TODO call the server for each of the default colors
  },
  methods: {
    addPalette: function(){
      var colorsToAdd = []
      for (var i=0; i<this.colors.length; i++){
        colorsToAdd.push(this.colors[i].colorText)
      }
      this.palettes.push({name: this.paletteName, colors: colorsToAdd.slice()});
      this.paletteName = "";
      this.colors = [];
    },
    addColor: function(){
      this.colors.push({id:this.colors.length, colorText:''});
    }
  }
});
