const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");




app.set("view engine", 'ejs');


app.get("/", (req, res) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use TLS
        auth: {
            user: "paulosoujava",
            pass: "Pojeoa2*"
        }
    });

    transporter.sendMail({
        from: "Paulo <paulosoujava@gmail.com>",
        to: "paulosoujava@gmail.com",
        subject: "Oi teste",
        text: "oi teste",
        html: "<h1>Oi Paulo</h1>  "
    }).then(msg => {
        console.log(msg);

    }).catch(err => {
        console.log(err);

    });
    res.render("index");
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/")
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname + path.extname(file.originalname))
//     }
// });
// const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    try {
        res.send("enviado");
    } catch (err) {
        res.send("Ops" + err);
    }

});

app.listen(3000, () => {
    console.log("Server run");

})