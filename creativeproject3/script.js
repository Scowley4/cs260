var app = new Vue({
  el: '#app',
  data: {
      number: 5,
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
