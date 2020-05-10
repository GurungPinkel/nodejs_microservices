import express from 'express';
const router = express.Router();

const signOutRouter = router.post("/api/users/signout", (req, res) => {
  req.session = null;
  res.send({})
});

export {
  signOutRouter
};