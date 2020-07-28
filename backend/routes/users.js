var express = require('express');
var router = express.Router();

const { multipartUpload } = require("../middlewares/multer");
const userService = require("../contorllers/user");
const userValidators = require("../validators/user");


router.get('/', userService.getAllusers);
router.get('/:id', userService.getUserById);

router.post('/',  
  multipartUpload,
  userValidators.createUserValidators,
  userService.addNewUser);

router.put("/:id", 
  multipartUpload,
  userValidators.updateUserValidators,
  userService.updateUser);
  
router.delete("/:id", userService.deleteUser);
router.post("/login",userService.login);

module.exports = router;
