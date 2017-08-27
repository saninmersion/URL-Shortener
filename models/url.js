// load mongoose
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// counters schema
var counterSchema = Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
})

//create counter model
var counter = mongoose.model('counter', counterSchema)

// url links schema
var urlSchema = new Schema({
    _id: {type: Number, index: true},
    long_url: String,
    created_at: Date
})
// pre('save', callback) middleware executes callback function
// everytime before an entry is saved to urls collection 

urlSchema.pre('save', function(next){
    var doc = this
    //find url_count and increment it by 1
    counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function(error, counter) {
        if(error)
            return next(error)
        //set the _id of urls collection to incremented value of the counter
        doc._id = counter.seq
        doc.created_at = new Date()
        next()
    })
})

//create Url model from urlSchema
var Url = mongoose.model('Url', urlSchema)

//export Url model in app.js
module.exports = Url
