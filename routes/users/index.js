const router = require('express').Router()
const userController = require('../../controller/userController.js')

router.get('/', async (req,res)=> {
    res.send(JSON.stringify(await userController.getAll()))
})

module.exports = router