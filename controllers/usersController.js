const User = require('../models/User');
const Note = require('../models/Question');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');


const getAllUsers = asyncHandler(async (req,res) =>{

    const Users = await User.find().select('-password').lean();
    if(!Users)
    {
        return res.status(400).json({message: 'No Users found'});
    }
    res.status(200).json(Users);
});

const createNewUser = asyncHandler(async (req,res) =>{

});

const updateUser = asyncHandler(async (req,res) =>{

});

const deleteUser = asyncHandler(async (req,res) =>{

});


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}




