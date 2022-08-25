import express from 'express';

const router = express.Router();

router.get('/', function(req,res, next) {
  res.send('v1.0 is working');
})

export {
  router,
}