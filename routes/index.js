var express = require('express');
var router = express.Router();
var product = require('../modals/productSchema')
var user = require('../modals/userSchema')


/* GET home page. */

const isAuth = function (req, res, next) {
  if (req.session.loggedIn) {
    next();
  }
  else {
    res.redirect('/')
  }
}
// *************************************************login get*******************************************

router.get('/', (req, res, next) => {
  res.render('login')
})


// **************************************************user signup****************************************

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/register', async (req, res) => {
  console.log(req.body);
  // const email=req.body.email
  // const name=req.body.name
  // const password=req.body.password
  await user.insertMany(req.body)

  res.redirect('/')
/////
})


// ***************************************************user login****************************************

var session;
router.post('/loggedin', async function (req, res, next) {
  const email = req.body.email
  const password = req.body.password
  console.log(req.body.email);
  console.log(req.body.password);

  const valid = await user.findOne({ email: email })
  console.log(valid);

  if (!valid) {

    res.render('login', { invalid: "invalid email" })
  }
  else {
    

    if (valid.password == password) {
      req.session.user = req.body
      req.session.loggedIn = true
      if (valid.role == 'admin') {
        res.redirect('/admin')
      }
      else {
        res.redirect('/home')
      }

    }
    else {
      res.render('login', { invalid: "invalid password" })
    }
  }
})
// ***********************************************ADMIN PAGE*****************************************

router.get('/admin', isAuth, async (req, res) => {

  const users = await user.find({role:'user'})
  res.render('admin', { users })
})
// **********************************************search**********************************************

router.post('/search',async (req,res)=>{
  const word=req.body.search

  const saved= await user.find({name:{$regex:`^${word}`,$options:'i'}})
  console.log(saved);

  res.render('admin',{users:saved})
})
// **********************************************DELETE**********************************************
router.post('/delete', async (req, res) => {
  const deleted = await user.findOneAndDelete({ _id: req.body.delete })
  // console.log(`delete success${req.body.delete}`);
  // const users=await user.find()
  // res.render('admin',{users})
  res.redirect('/admin')

})
// **********************************************EDIT************************************************
router.get('/edit/:id',async (req,res)=>{
  console.log(req.params.id);
  const foredit=await user.findOne({_id:req.params.id})
  console.log(foredit);
  

  res.render('edit',{foredit})})

  //for editing

 router.post('/update/:id',async (req, res) => {
  const id=req.params.id
   await user.updateOne({_id:id},req.body)
    res.redirect('/admin')
 })

// ************************************************HOME PAGE*****************************************
router.get('/home', isAuth, async function (req, res) {
  if (req.session.loggedIn) {
    const prodata = await product.find()
    res.render('index', { prodata })
  }

  else {
    res.redirect('/')
  }
})

// ***********************************************LOGOUT PAGE****************************************
router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});





module.exports = router;