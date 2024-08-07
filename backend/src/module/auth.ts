import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

// Hash Password
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
// Compare Password
export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Create JWT (Json Web Token)
export const createJWT = (user) => {
  const token = JWT.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );
  return token;
};

// Protect Middleware to check if the user is authenticated
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  console.log("req.headers", req.headers);
  console.log("bearer:", bearer);

  if (!bearer) {
    return res.status(401).json({ message: "Not Authorized :(" });
  }

  const token = bearer.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No Token Found :(" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    return;
  } catch (error) {
    console.log("error:", error);
    return res.status(401).json({ message: "Not Valid Token  :(" });
  }
};
