const User = require("../model/UserModel")


const user = new User()
class UserController {

    getUsers = (req, res) => {

        const response = user.getAllUsers(req,res)
    }
}

module.exports = UserController