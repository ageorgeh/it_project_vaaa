const {auth} = require("./config");

const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(auth.getAuth(), email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const signUp = async (name, email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(auth.getAuth(), email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

module.exports = {
    signIn,
    signUp,
}
