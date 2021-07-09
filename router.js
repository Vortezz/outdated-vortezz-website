var express = require('express');
var app = express.Router();
const nodemailer = require('nodemailer');
const config = require('./config.json');
const geoip = require('fast-geoip');
var clientIp = require('client-ip');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/' || '/index.html', async function (request, response) {

    ip = clientIp(request).split('::ffff:');

    const geo = await geoip.lookup(ip[1])
    switch (geo.country) {
        case "FR" || "BE" || "SW":
            fs.readFile('./public/fr.html', function (error, data) {
                response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                let data_string = data.toString()
                response.write(data_string)
                response.end()
            });
            break;
        default:
            response.redirect('/en/')
    }
})

app.get('/en/' || '/en/index.html', async function (request, response) {
    fs.readFile('./public/en.html', function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        let data_string = data.toString()
        response.write(data_string)
        response.end()
    });
})

app.get('/fr/' || '/fr/index.html', async function (request, response) {
    fs.readFile('./public/fr.html', function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        let data_string = data.toString()
        response.write(data_string)
        response.end()
    });
})

app.post('/' || '/index.html', urlencodedParser, function (request, response) {
    console.log(request.body)
    sendMail(request.body.email, request.body.subject, request.body.message)
    console.log(request.originalUrl)
    response.redirect(request.originalUrl);
})

app.post('/fr/' || '/fr/index.html', urlencodedParser, function (request, response) {
    console.log(request.body)
    sendMail(request.body.email, request.body.subject, request.body.message)
    console.log(request.originalUrl)
    response.redirect(request.originalUrl);
})


app.post('/en/' || '/en/index.html', urlencodedParser, function (request, response) {
    console.log(request.body)
    sendMail(request.body.email, request.body.subject, request.body.message)
    console.log(request.originalUrl)
    response.redirect(request.originalUrl);
})

function sendMail(mail, subject, message) {
    fs.readFile('./utils/mail.html', function (error, data) {
        let data_string = data.toString()
        data_string = data_string.replace(new RegExp("{{message}}"), message)
        data_string = data_string.replace(new RegExp("{{name}}"), mail)
        let transport = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            auth: {
                user: config.mail.mail,
                pass: config.mail.psw
            }
        });
        message = {
            from: config.mail.mail,
            to: config.mail.mail,
            subject: '[Formulaire de Contact] ' + subject,
            text: `Mail de confirmation du formulaire de contact sur vortezz.fr, si vous ne voyez pas de couleurs, veuillez mettre à jour votre client de messagerie ou essayer sur un autre !`,
            html: data_string
        };
        transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                message.to = mail;
                message.subject = subject;
                transport.sendMail(message, function (err, info) {
                    if (err) {
                        console.log(err)
                    }
                });
            }
        });
    })
}

app.get('/public/assets*', function (request, response) {
    response.status(200);
    response.sendFile(path.join(__dirname, request.url));
})

app.get('/discord/', function (request, response) {
    response.status(200);
    response.redirect('https://discord.gg/8MFgZG97XD')
})

app.get('/github/', function (request, response) {
    response.status(200);
    response.redirect('https://github.com/Vortezz')
})

app.get('/twitter/', function (request, response) {
    response.status(200);
    response.redirect('https://twitter.com/TheVortezz')
})

app.post('/public/assets*', function (request, response) {
    response.status(200);
    response.sendFile(path.join(__dirname, request.url));
})

app.use(function (request, response) {
    console.log(request.originalUrl)
    response.redirect('/')
});

module.exports = app;