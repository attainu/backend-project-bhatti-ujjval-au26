"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = _express.default.Router();

userRouter.get("/createadmin", (0, _expressAsyncHandler.default)(async (req, res) => {
  try {
    const user = new _userModel.default({
      name: "admin",
      email: "bhattiujjval008@gmail.com",
      password: "12345",
      isAdmin: true
    });
    const createduser = await user.save();
    res.send(createduser);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}));
userRouter.post("/signin", (0, _expressAsyncHandler.default)(async (req, res) => {
  const signinUser = await _userModel.default.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (!signinUser) {
    return res.status(401).send({
      message: "Invalid email or password"
    });
  } else {
    res.send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: (0, _utils.Token)(signinUser)
    });
  }
}));
userRouter.post("/register", (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = new _userModel.default({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const createduser = await user.save();

  if (!createduser) {
    return res.status(401).send({
      message: "Invalid user data "
    });
  } else {
    res.send({
      _id: createduser._id,
      name: createduser.name,
      email: createduser.email,
      isAdmin: createduser.isAdmin,
      token: (0, _utils.Token)(createduser)
    });
  }
}));
userRouter.put("/:id", _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id);

  if (!user) {
    return res.status(404).send({
      message: "user not found "
    });
  } else {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updateduser = await user.save();
    res.send({
      _id: updateduser._id,
      name: updateduser.name,
      email: updateduser.email,
      isAdmin: updateduser.isAdmin,
      token: (0, _utils.Token)(updateduser)
    });
  }
}));
var _default = userRouter;
exports.default = _default;