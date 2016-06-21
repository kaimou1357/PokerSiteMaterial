var path = require("path")
exports.default = function(req, res){
	res.sendFile(path.join(__dirname, "../public" , "index.html"))
}