const express = require('express')
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')

const app = express()


app.use(cors())
app.use(bodyparser.json())


// photo upload
app.use('/uploads', express.static('uploads'))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})


const upload = multer({ storage: storage })




app.listen(5000, () => {
    mongoose.connect('mongodb://localhost:27017/db_backend')
        .then(() => {
            console.log('Database Connected Successfully');

        }).catch((err) => {
            console.log(err);
        })
    console.log("Server Running Successfully");

})




// District

const districtSchema = mongoose.Schema({
    districtName: {
        type: String,
        required: true
    }

})
const District = mongoose.model("District", districtSchema)


app.post('/district', async (req, res) => {
    try {

        const districtName = req.body.district
        const district = await District.create({ districtName })
        res.send(`Successfully inserted`)
    } catch (err) {
        console.log(err);

    }
})

app.get('/districts', async (req, res) => {
    try {
        const districts = await District.find()
        res.json(districts)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

app.get('/district/:id', async (req, res) => {
    try {
        const district = await District.findById(req.params.id)
        res.json(district)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

app.put('/district/:id', async (req, res) => {
    try {
        const districtName = req.body.district
        const districtUpdated = await District.findByIdAndUpdate(req.params.id, { districtName })
        res.json({ message: "District Updated..." })

    }
    catch (err) {
        res.status(500).json(err)
    }
})

app.delete('/district/:id', async (req, res) => {
    try {
        await District.findByIdAndDelete(req.params.id)
        res.json({
            message: 'District Deleted'
        })

    }
    catch (err) {
        res.status(500).json(err)
    }
})



// Place



const PlaceSchema = new mongoose.Schema({

    place: {
        type: String,
        required: true
    },

    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "District",
        required: true
    }
})

const Place = mongoose.model("Place", PlaceSchema)



app.post('/place', async (req, res) => {
    try {
        console.log(req.body);
        const place = await Place.create(req.body)
        res.status(200).json({ "msg": "Place Inserted Successfully..." })
    }

    catch (err) {
        res.status(500).json(err)
    }
})

app.get('/place', async (req, res) => {
    try {
        const placeData = await Place.find().populate('districtId')
        res.json({ "placeData": placeData })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

app.get('/place/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id)
            .populate('districtId')
        res.json(place)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.put('/place/:id', async (req, res) => {
    try {
        const place = await Place.findByIdAndUpdate(req.params.id, req.body)
        res.json({ "msg": "Place Updated Successfully..." })
    } catch (err) {
        res.status(500).json(err)
    }
})



app.delete('/place/:id', async (req, res) => {
    try {
        await Place.findByIdAndDelete(req.params.id)
        res.json({
            'message': 'Place Deleted'
        })
    }
    catch (err) {
        res.status(500).json(err)

    }
})



// User


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    contact: {
        type: Number,
    },
    address: {
        type: String,
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
    },
    photo: {
        type: String,
    }

})

const User = mongoose.model('User', UserSchema)







//User

app.post('/user', upload.single('photo'), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            contact: req.body.contact,
            placeId: req.body.placeId,
            photo: req.file.path
        });

        res.status(201).json({ "msg": "User Registration Successfull...", "userData": user });
    }
    catch (err) {
        res.status(500).json(err)
    }
}

)

app.get('/users', async (req, res) => {
    try {
        const users = await User.find().populate({ path: 'placeId', populate: { path: 'districtId' } })
        res.json({ "usersData": users })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

app.get('/user/:id', async (req, res) => {

    try {

        const user =
            await User.findById(req.params.id)
                .populate({
                    path: 'placeId',
                    populate: {
                        path: 'districtId'
                    }
                })

        res.json({ "userData": user })

    }

    catch (err) {

        res.status(500).json(err)

    }

})


app.put('/user/:id', upload.single('photo'), async (req, res) => {

    try {

        const updateData = {

            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            address: req.body.address,
            placeId: req.body.placeId

        }

        // if new photo uploaded
        if (req.file) {
            updateData.photo = req.file.path
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData)
        res.json({ "msg": "Updated Successfully...", "userData": updatedUser })

    }
    catch (err) {
        res.status(500).json(err)
    }
}
)




app.put('/user/changepassword/:id', async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.params.id);
        console.log(user);

        if (user.password !== oldPassword) {
            res.json({ "msg": "Old password is incorrect" })
            return
        }
        user.password = newPassword;
        await user.save();


        res.json({ "msg": "Password Changed Successfully..." })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "An error occurred while changing the password" });
    }
})






app.delete('/user/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({ "msg": 'User Deleted' })

    }
    catch (err) {
        res.status(500).json(err)
    }
})





// login

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            return res.json({
                "userData": { role: "user", id: user._id, name: user.name, message: "Login successful" }
            });
        }
        return res.status(401).json({ message: "Invalid email or password" });
    } catch (error) {
        console.log(error);
        res.json(error)

    }
})