const express = require('express')
const app = express()
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
port = process.argv[2] || 7000;

http.createServer(function (request, response) {

    var uri = url.parse(request.url).pathname
        , filename = path.join(process.cwd(), uri);

    var contentTypesByExtension = {
        '.html': "text/html",
        '.css': "text/css",
        '.js': "text/javascript"
    };

    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found\n");
            response.end();
            return;
        }



        if (fs.statSync(filename).isDirectory()) filename += 'public/index.html';

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.write(err + "\n");
                response.end();
                return;
            }

            var headers = {};
            var contentType = contentTypesByExtension[path.extname(filename)];
            if (contentType) headers["Content-Type"] = contentType;
            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(parseInt(port, 10));

var mandrill = require('node-mandrill')('<your API Key>');

function sendEmail(_subject, _message) {
    mandrill('/messages/send', {
        message: {
            to: [{ email: "victor.sarrazin@yahoo.fr", name: "Vortezz" }],
            from_email: "noreply@vortezz.fr",
            subject: _subject,
            text: _message
        }
    }, function (error, response) {
        if (error) console.log(error);
        else console.log(response);
    });
}

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

