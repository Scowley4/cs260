const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// accept incoming POST req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// sets up a directory called 'public' to serve
app.use(express.static('public'));

let palettes = [
                {
                  name:'DEMO: Wedding Colors',
                  colors:[{id:0, colorText:'purple'},
                          {id:1, colorText:'yellow'},
                          {id:2, colorText:'silver'},
                          {id:3, colorText:'white'}],
                  editable: false,
                  deletable: false,
                  id: 1,
                },
                {
                  name:"DEMO: BYU Colors",
                  colors:[{id:0, colorText:'#162342'},
                          {id:1, colorText:'#1D2D5C'},
                          {id:2, colorText:'#FFFFFF'},
                          {id:3, colorText:'#E4E4E4'}],
                  editable: false,
                  deletable: false,
                  id: 2,
                },
               ]
let id = palettes.length;

app.get('/api/palettes', (req, res) => {
  res.send(palettes);
});

app.post('/api/palettes', (req, res) => {
  id = id + 1;
  let palette = {
                  id:id,
                  name:req.body.name,
                  colors:req.body.colors,
                  editable:req.body.editable,
                  deletable:req.body.deletable,
                };
  palettes.push(palette);
  res.send(palette);
});

app.delete('/api/palettes/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = palettes.map(palette => { return palette.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  palettes.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.put('/api/palettes/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = palettes.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let palettes = palettes[index];

  if (req.body.orderChange) {
    let indexTarget = itemsMap.indexOf(req.body.orderTarget);
    palettes.splice(index,1);
    palettes.splice(indexTarget,0, palette);
  }
  res.send(palette);
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

app.listen(3000, () => console.log('Server listening on port 3000!'));
