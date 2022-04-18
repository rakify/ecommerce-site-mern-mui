const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //parsing cookies from header {credit: https://alligator.io/nodejs/express-cookies/}
  const rawCookies = req.headers?.cookie.split("; ");
  const parsedCookies = {};
  rawCookies.forEach((rawCookie) => {
    const parsedCookie = rawCookie.split("=");
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });

  if (parsedCookies.jwt) {
    jwt.verify(parsedCookies.jwt, process.env.jwt_secret, (err, user) => {
      if (err) {
        return res.status(401).json("Invalid token!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You do not have access to this page!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
