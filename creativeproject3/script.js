var app = new Vue({
  el: '#app',
  data: {
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
  }
});
