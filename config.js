var config = {}

config.db = {}

// the url shortening host - shortened urls will be this + base58 ID
//i.e. http:// localhost:3000/3Ys
config.webhost = 'http://localhost:3000/'

//mongodb host and dbname
config.db.host = 'localhost'
config.db.name = 'url_shortner'

module.exports = config