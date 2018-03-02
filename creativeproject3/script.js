var app = new Vue({
  el: '#app',
  data: {
    paletteName: '',
    colors: [],
    palettes: [
     {name: "BYU Colors", colors: ['#162342','#1D2D5C','#FFFFFF',
                                   '#E4E4E4','#FFFFFF']},
     {name:'Princeton', colors: ['#262626','#D88946']}
    ],
  },
  computed: {
    month: function() {

      return "month";
    },
  },
  watch: {
    number: function(value, oldValue) {
      //Stuff
    },
  },
  created: function() {
    //Called when vue is created
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
      this.colors.push({id: this.colors.length, colorText:''});
    }
  }
});
