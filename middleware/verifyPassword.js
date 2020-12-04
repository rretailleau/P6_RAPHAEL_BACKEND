const passwordValidator = require("password-validator");
const { response } = require("../app");

module.exports = (req, res, next) => {
    const passwordSchema = new passwordValidator();
    passwordSchema
    .is().min(6)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .is().not().oneOf([]);  
    if (!passwordSchema.validate(req.body.password)){
        res.status(400).json({error:"mot de pass trop simple"});
    } else {
        next();
    }
};
