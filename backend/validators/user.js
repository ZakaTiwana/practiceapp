const {body,check} = require('express-validator');
createUserValidators = [
        body("name").notEmpty().withMessage("name should not be empty")
            .isAlphanumeric().withMessage("name should be Alphanumeric")
            .isLength({min:3,max:25}).withMessage("name should of lenght between 5 to 25"),
        body("password").notEmpty().withMessage("password should not be empty")
            .matches(/\d/).withMessage("password should contains atleast one number")
            .isLength({min:8,max:50}).withMessage("password sholud be of lenght between 8 to 50"), // also contains a number
        body('email').notEmpty().withMessage("email should not be empty")
            .isEmail().withMessage("invalid mail format"),
        body("age").isNumeric().withMessage("age should be a number"),
        body("dob").notEmpty().withMessage("dob should not be empty")
    ];


updateUserValidators = [
    body("name").isAlphanumeric().withMessage("name should be Alphanumeric").optional(undefined)
        .isLength({min:3,max:25}).withMessage("name should of lenght between 3 to 25"),
    body("password").matches(/\d/).withMessage("password should contains atleast one number")
        .isLength({min:8,max:50}).withMessage("password sholud be of lenght between 8 to 50").optional(undefined), // also contains a number
    body('email').isEmail().withMessage("invalid mail format").optional(undefined),
    body("age").isNumeric().withMessage("age should be a number").optional(undefined)
];

module.exports = {
    createUserValidators,
    updateUserValidators
};