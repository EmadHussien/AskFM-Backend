const User = require('../models/User');
const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) 
    {
       return res.sendStatus(401);
    }
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser)
    {
        return res.sendStatus(403);
    }

    const userID = foundUser._id.toString();

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=> {
            if(err || decoded.username !== foundUser.username) return res.sendStatus(403);

            const accessToken = jwt.sign(
                {
                    "UserInfo":{
                        "username":decoded.username ,
                        "id": userID
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'40s'}
            );
            res.json({ accessToken});
        }
    );
   
}

module.exports = {handleRefreshToken};