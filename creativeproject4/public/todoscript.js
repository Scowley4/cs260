// var SERVER = '35.185.253.205';
var SERVER = 'localhost';
var PORT = '3000';

var app = new Vue({
  el: '#app',
  data: {
    baseURL: 'http://' + SERVER + ':' + PORT,
    items: [],
    text: '',
    priority: 'medium',
    show: 'all',
    drag: {},
  },
  created: function() {
      this.getItems();
  },
  computed: {
    activeItems: function() {
      return this.items.filter(function(item) {
  return !item.completed;
      });
    },
    filteredItems: function() {
      if (this.show === 'active')
  return this.items.filter(function(item) {
    return !item.completed;
  });
      if (this.show === 'completed')
  return this.items.filter(function(item) {
    return item.completed;
  });
      return this.items;
    },
  },
  methods: {
    getItems: function() {
      axios.get('/api/items').then(response => {

        this.items = response.data;
        return true;
      }).catch(err => {
      });
    },
    addItem: function() {
      console.log('Added item');
      axios.post('/api/items', {
        text: this.text,
        priority: this.priority,
        completed: false
      }).then(response => {
        this.text = '';
        this.priority = 'medium';
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    completeItem: function(item) {
      axios.put("/api/items/" + item.id, {
        text: item.text,
        completed: !item.completed,
        priority: item.priority,
        orderChange: false,
      }).then(response => {
        return true;
      }).catch(err => {
      });
    },
    deleteItem: function(item) {
      axios.delete('/api/items/' + item.id).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    changePriority: function(item){
      console.log(item);
      axios.put("/api/items/" + item.id, {
        text: item.text,
        completed: item.completed,
        orderChange: false,
        priority: item.priority,
      }).then(response => {
        return true;
      }).catch(err => {
      });
    },
    Completed: function() {
      this.show = 'completed';
    },
    deleteCompleted: function() {
      this.items.forEach(item => {
        if (item.completed)
          this.deleteItem(item);
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      this.sort = false;
      axios.put("/api/items/" + this.drag.id, {
        text: this.drag.text,
        completed: this.drag.completed,
        priority: this.drag.priority,
        orderChange: true,
        orderTarget: item.id
      }).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    sortPriority: function(){
      if (this.sort === 'descending')
        this.sort = 'ascending';
      else
        this.sort = 'descending';


      axios.put('/api/sortPriority',{
      //not sure here
        sort: this.sort,
      }).then(reponse => {
          this.getItems();
          return true;
      }).catch(err => {
      });

      this.items.sort(function(a,b){
        if (a.priority=='high')
          return 1;
        if (b.priority=='high')
          return -1;
        if (a.priority=='medium')
          return 1;
        if (b.priority=='medium')
          return -1;
        return 1;
      }).reverse();
      //if (this.sort === 'descending')
       // this.items.Reverse();
    },
  }
});
