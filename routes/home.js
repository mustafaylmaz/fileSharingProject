const router = require('express').Router()
const sessionChecker = require('../middleware/sessionChecker.js')

router.get('/',  async (req,res,next)=> {
  
  res.render('home/index', {session: req.session, sessionCheck: sessionChecker(req)})
  next()  
})

router.get('/login', async (req,res)=> {
    res.render('home/login')  
  })

router.get('/register', async (req,res)=> {
    res.render('home/register')  
})
  


module.exports = router