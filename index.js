const express = require('express');
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser')
const ObjectId=require('mongodb').ObjectId;

app.use(bodyParser.json())
app.use(cors());

const port = process.env.PORT||  8000;
// require('dotenv').config();


const  movieData= require('./data')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cinema:cinema91221@cluster0.hvnq5.mongodb.net/cinema-hall?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true } );
client.connect(err => {
  
  
  
  const movieCollection = client.db("cinema-hall").collection("movieList");

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/movies',(req, res) => {
    movieCollection.find({})
     .toArray((err,documents)=>{
       res.send(documents)
  })
  })
  
app.post('/booking',(req, res) => {
  const {id, bookedSeats}=req.body;
  
  // replace the whole array
       movieCollection.updateOne(
    {
        _id: ObjectId(`${id}`)
      }, 
      {
        $set: 
         {
          'bookedSeats':bookedSeats
         }
      });
     res.send({status:"ok"})
      res.end();
})

  
  // perform actions on the collection object

  console.log("connection successful")

  // const options = { ordered: true };
  // movieCollection.insertMany(movieData,options)

  
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})