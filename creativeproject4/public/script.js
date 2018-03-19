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
    //paletteName: '',
    //colors: [],
    paletteName: 'Test Palette',
    colors:[{id:0, colorText:'red'},
            {id:1, colorText:'blue'},
            {id:2, colorText:'green'},
            {id:3, colorText:'yellow'}],
    palettes: [
      //{name:'WordColors', colors: ['red','blue','white','black']},
      //{name:'DEMO: Wedding Colors', colors: ['purple','yellow','silver','white']},
      //{name: "DEMO: BYU Colors", colors: ['#162342','#1D2D5C','#FFFFFF',
      //                              '#E4E4E4']},
      //{name:'Princeton', colors: ['#262626','#D88946']}
    ],
    drag: '',
  },
  computed: {
    //No computed values yet
  },
  watch: {
    //No watch values yet
  },
  created: function() {
    //Called when vue is created
    this.getPalettes();
  },
  methods: {
    getPalettes: function(){
      axios.get('/api/palettes').then(response => {
        this.palettes = response.data;
        return true;
      }).catch(err => {
        console.log('Error in getPalettes');
      });
    },
    addPalette: function(){
      //var colorsToAdd = this.colors.splice();
      //for (var i=0; i<this.colors.length; i++){
      //  colorsToAdd.push(this.colors[i].colorText)
      //}
      console.log(this.colors);
      axios.post('/api/palettes', {
        name: this.paletteName,
        colors: this.colors,
        editable: true,
        deletable: true,
      }).then(response => {
        this.paletteName = '';
        this.colors = [];
        this.getPalettes();
        return true;
      }).catch(err => {
        console.log('Error in addPalette');
      });
    },
    addColor: function(){
      this.colors.push({id:this.colors.length, colorText:''});
      //this.colors.push('');
    },
    editPalette: function(palette){
      this.paletteName = palette.name;
      this.colors = palette.colors;
      var editable = palette.editable;
      var deletable = palette.deletable;
      this.deletePalette(palette);
    },
    deletePalette: function(palette){
      axios.delete('/api/palettes/' + palette.id).then(response => {
        this.getPalettes();
        return true;
      }).catch(err => {
        console.log('Error in delete');
        console.log(err);
      });
    },
    dragPalette: function(palette) {
      console.log('drag');
      this.drag = palette;
    },
    dropPalette: function(palette) {
      axios.put('/api/palettes/' + this.drag.id, {
        orderTarget: palette.id
      }).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
        console.log('Error in delete');
        console.log(err);
      });
    },
  }
});
