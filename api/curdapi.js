const express = require('express');

const fs = require('fs');
const { promisify } = require('util')

const app = express();

const router = express.Router();

const schemadata = require('../model/curd')

const multer = require("multer");
const unlinkAsync = promisify(fs.unlink)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


const filefilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    filefilter: filefilter,
});

app.use(express.json());

//data post

router.post('/Blogs', upload.single("image"), async (req, res) => {
    try {
        const adddata = JSON.parse(req.body.adddata);

        const addData = schemadata.create({
            fname: adddata.fname,
            lname: adddata.lname,
            type: adddata.type,
            description: adddata.description,
            Filepath: req.file.originalname,
        })
        if (addData != undefined) {
            res.send({ responce: "Done" });
        } else {
            res.send({ responce: 0 });
        }
    } catch (error) {
        res.send({ err: error })
        console.log('error::: ', error);
    }
})


//get Data
router.get('/getallblog', async (req, res) => {
    try {
        const addData = await schemadata.find({});
        return res.send({ addData });
    } catch (error) {
        console.log('error::: ', error);
        return res.send({ err: error })
    }
})


//delete data
router.delete('/deletData/:id', async (req, res) => {
    try {
        // const addData = await schemadata.find({});
        // return res.send({ addData });
        const getBlogData = await schemadata.findById(req.params.id)

        const path = `./public/${getBlogData.Filepath}`

        const sneha = await unlinkAsync(path)


        const dete = await schemadata.findByIdAndRemove(req.params.id)
        return res.send({ message: "the data was remove" })



    } catch (error) {
        console.log('error::: ', error);
        return res.send({ err: error })
    }
})


//data edit
router.post('/GetEditdata', async (req, res) => {
    try {
        const xyz = await req.body.my_id
        const getBlogData = await schemadata.findById(xyz)
        return res.send({ datas: getBlogData });
    } catch (error) {
        console.log('error::: ', error);
        return res.send({ err: error })
    }
})

//update data
router.put('/update/:id', async (req, res) => {
    try {
        const updated = await schemadata.findByIdAndUpdate(
            req.params.id,
            req.body

        );

    } catch (error) {
        console.log('error:::', error);
        return res.send({ err: error })

    }
})




module.exports = router;
