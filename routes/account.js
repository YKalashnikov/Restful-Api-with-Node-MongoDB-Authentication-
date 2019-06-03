const router = require('express').Router();
const verify = require('../routes/verifyToken.js');
const User = require('../models/User.js');


router.get('/',verify, async (req, res) => {
    //res.send(req.user);
    const user = await User.findOne({_id: req.user});
    res.send(user);

})

module.exports = router;