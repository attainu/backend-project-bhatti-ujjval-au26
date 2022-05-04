"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = exports.isAdmin = exports.Token = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Token = user => {
  return _jsonwebtoken.default.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, _config.default.JWT_SECRET, {
    expiresIn: _config.default.JWT_EXPIRES
  });
};

exports.Token = Token;

const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.status(401).send({
      message: 'Token is not supplied'
    });
  } else {
    const token = bearerToken.slice(7, bearerToken.length);

    _jsonwebtoken.default.verify(token, _config.default.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({
          message: 'Invalid Token'
        });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

exports.isAuth = isAuth;

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({
      message: 'Token is not valid for admin user'
    });
  }
};

exports.isAdmin = isAdmin;