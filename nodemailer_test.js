var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: "gmail.user@gmail.com",
        pass: "userpass"
    }
});



// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'sandesh.magdum<extentia.com>', // sender address
    to: 'nilesh.dethe@extentia.com, harpreet.singh@extentia.com', // list of receivers
    subject: 'Hello Test NodeMailer', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

// send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);

// });