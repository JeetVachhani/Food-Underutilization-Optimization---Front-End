/**
 * This is the file to start our server.
 * It contains the main back-end logic for our server.
 *
 * Contributors: Yue Jiao, Yunning Yang
 */

var express = require('express') //set up middleware for API and allow dynamic rendering of pages
var cors = require('cors') // handle the cors domain requests
var bodyParser = require('body-parser') //allow us to extract the data sent from the FE
var app = express()
var path = require('path')
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static('./client/public'));


//app.use mounts the middleware function at a specific path
app.use(bodyParser.json())
app.use(cors())

//parse the data with json, the query string library
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
const db = require("./config/DB.js");
db.sequelize.sync();

//access bueisness route
var Users = require('./controllers/AuthController.js')

app.use('/users', Users)



//access product_upload route
var Product = require('./controllers/BusinessController.js')

app.use('/product', Product)

app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, './client/public'));
});

//access API to listen to a port
app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})

