const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// accept incoming POST req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// sets up a directory called 'public' to serve
app.use(express.static('public'));

let items = [];
let id = 0;

app.get('/api/items', (req, res) => {
  res.send(items);
});

// complete items
app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {id:id,
              text:req.body.text,
              completed:req.body.completed,
              priority:req.body.priority};
  items.push(item);
  res.send(item);
});

// Handles completion and Drag and drop
app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[index];
  item.completed = req.body.completed;
  item.text = req.body.text;
  item.priority = req.body.priority;
  // handle drag and drop re-ordering
  if (req.body.orderChange) {
    let indexTarget = itemsMap.indexOf(req.body.orderTarget);
    items.splice(index,1);
    items.splice(indexTarget,0,item);
  }
  res.send(item);
});

app.put('/api/sortPriority', (req, res) => {
  items.sort(function(a,b){
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
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
