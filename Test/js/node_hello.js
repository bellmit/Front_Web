var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('ni mei,node js')
	res.end();
}).listen(8081, "127.0.0.1");