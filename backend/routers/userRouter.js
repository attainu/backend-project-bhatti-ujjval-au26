import express from "express";
import User from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import { isAuth, Token } from "../utils";


const userRouter = express.Router();

userRouter.get("/createadmin",expressAsyncHandler( async (req, res) => {
  try {
    const user = new User({
      name: "admin",
      email: "bhattiujjval008@gmail.com",
      password: "12345",
      isAdmin: true,
    });
    const createduser = await user.save();
    res.send(createduser);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}));
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!signinUser) {
      return res.status(401).send({ message: "Invalid email or password" });
    } else {
      res.send(  {
        _id: signinUser._id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: Token(signinUser),
    }
    );
    }
    })
);



userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const createduser = await user.save(); 
    if (!createduser) {
      return res.status(401).send({ message: "Invalid user data " });
    } else {
      res.send(  {
        _id: createduser._id,
        name: createduser.name,
        email: createduser.email,
        isAdmin: createduser.isAdmin,
        token: Token(createduser),
    }
    );
    }
    })
);

userRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id); 
    if (!user) {
      return res.status(404).send({ message: "user not found " });
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updateduser = await user.save();
      res.send(  {
        _id: updateduser._id,
        name: updateduser.name,
        email: updateduser.email,
        isAdmin: updateduser.isAdmin,
        token: Token(updateduser),
    }
    );
    }
    })
);


export default userRouter;
