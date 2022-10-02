const {firebase, auth} = require("../models/config")

const signIn = async function(req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            email: "email is required",
            password: "password is required"
        });
    }
    auth
    .signInWithEmailAndPassword(auth.getAuth(), req.body.email, req.body.password)
    .then((user) => {
        return res.status(200).json("Sign In Successful");
    })
    .catch(function (error) {
        let errorCode = error.code;
        let errorMsg = error.message;
        if (errorCode == "auth/wrong-password"){
            return res.status(500).json({ error: errorMsg});
        } else {
            return res.status(500).json({ error: errorMsg});
        }
    });
};

const signUp = async function(req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            email: "email is required",
            password: "password is required"
        });
    }
    auth
    .createUserWithEmailAndPassword(auth.getAuth(), req.body.email, req.body.password)
    .then((data) => {
        return res.status(201).json("Sign Up Successful");
    })
    .catch(function (error) {
        let errorCode = error.code;
        let errorMsg = error.message;
        if (errorCode == "auth/weak-password"){
            return res.status(500).json({ error: errorMsg});
        } else {
            return res.status(500).json({ error: errorMsg});
        }
    });
}

module.exports = {
    signIn,
    signUp,
}
