//1.Dependencies
var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var config = require('./config')
var base58 = require('./base58.js')
var Url = require('./models/url')


//2. Instantiations



//3.Configurations
mongoose.connect('mongodb://' +config.db.host + '/' + config.db.name)

//4. Middleware

//handles JSON 
app.use(bodyParser.json())
//handles URL encode bodies
app.use(bodyParser.urlencoded({extended: true}))
//tell express ro serve public files
app.use(express.static(path.join(__dirname, 'public')))

//5. Routes
//route to serve up homepage
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'))
})

// route to create and return shortened url
app.post('/api/shorten', function(req, res){
    var longUrl = req.body.url
    var shortUrl = ''

    //check if the url already exists
    Url.findOne({long_url: longUrl}, function(err, doc){
        if(doc){
            //Url already Shortened
            shortUrl = config.webhost + base58.encode(doc._id)

            //send back short url
            res.send({'shortUrl': shortUrl})
        }else{
            //create new entry  in the collection
            var newUrl = Url({
                long_url: longUrl
            })
            newUrl.save(function(err){
                if(err) {
                    console.log(err)
                }
                
                shortUrl = config.webhost + base58.encode(newUrl._id)

                res.send({'shortUrl': shortUrl})
            })
        }
    })
})

// route to redirect to original url
app.get('/:encoded_id',function(req, res){
    var base58Id = req.params.encoded_id
    var id = base58.decode(base58Id)

    //check if url already exists in the database
    Url.findOne({_id: id}, function(err, doc){
        if(doc){
            //found an entry in db
            res.redirect(doc.long_url)
            next()
        } else{
            //nothing found take them home
            res.redirect(config.webhost)
            alert("No entry found.")
        }
    })
})

//Server Bootup
// run server on port 3000
var server = app.listen(3000, function(){
    console.log('server running on port 3000')
})