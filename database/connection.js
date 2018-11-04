const data = require("./credentials");

module.exports = {
   connection: "mongodb://"+ data.username  +":"+ data.password +"@ds137003.mlab.com:37003/nodestripe"
}