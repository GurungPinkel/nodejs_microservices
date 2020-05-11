import express from 'express';
import currentUser from '../middlewares/current-user';

const router = express.Router();

const currentUserRouter = router.get(
  '/api/users/currentuser',
  currentUser,
  (req, res) => {
    return res.send({ currentUser: req.currentUser || null });
  }
);

export { currentUserRouter };
