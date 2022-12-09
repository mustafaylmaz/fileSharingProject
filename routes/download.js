const router = require('express').Router()

router.get('/:uuid', async (req,res)=> {
    res.send('download')
})

module.exports = router