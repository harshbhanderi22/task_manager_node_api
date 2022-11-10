const router = require('express').Router();
const user_model = require('../Models/user_model');
const { registerValidation, loginvalid, loginvalidation } =  require('../Validations/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/register', (req, res) => {
    res.send("You are on register page");
})

router.post('/register',async (req, res) => {

    //Validating Entered data format
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Encrypting Password
    const salt =await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    //Email Exists checking
    const emailExits = await user_model.findOne({ email: req.body.email })
    if (emailExits) return res.send("Email Already Exists");

    //Creating New User
    const user =await new user_model({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
    })
    try {
        const saveuser = user.save();
        res.send(saveuser);
        console.log("User saved Successfully");
    }
    catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login',async (req, res) => {
    
    //Validating Data
    const { error } =await loginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking Mail
    const UserEx =await user_model.findOne({ email: req.body.email })
    if (!UserEx) return res.status(400).send("User does not exists");

    //validating Password
    const passsword = await bcrypt.compare(req.body.password, UserEx.password);
    if (!passsword) return res.send("Invalid Password");

    const token =await jwt.sign({ _id: UserEx._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    res.send(token);

    res.send("Login successfull");
})

module.exports = router;