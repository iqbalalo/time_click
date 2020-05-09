const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = expectedScope => {

  return (req, res, next) => {

    console.log("Authorization Middleware Called");
    const token = req.headers["authorization"];

    if (!token) {

      return res.status(401).json({ message: "Access denied!" });

    } else {

      // Bearer token...
      const tokenBody = token.slice(7);
      jwt.verify(tokenBody, config.SECRET, (err, decoded) => {

        if (err) {
          return res.status(401).json({ message: "Access denied!" });
        }

        console.log("decode", decoded);

        if (!decoded.scopes.includes(expectedScope)) {
          return res.status(401).json({ message: "Access denied!" });
        }

        next();

      });
    }
  };
};
