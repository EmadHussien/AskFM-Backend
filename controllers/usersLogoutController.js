const User = require('../models/User');

const handleLogout = async (req,res) =>{
    const cookies = req.cookies;
    if(!cookies?.jwt)
    {
        res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser)
    {
        res.clearCookie('jwt',{httpOnly:true, maxAge: 24 * 60 * 60 * 1000})
        return res.sendStatus(204);
    }
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('jwt',{httpOnly:true, maxAge: 24 * 60 * 60 * 1000})
    return res.sendStatus(204);

}


module.exports = {handleLogout};