import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ✅ Check if token is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized. Token missing." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded has: { id: user._id, iat, exp }
    next();
    console.log(token)
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token." });
  }
};
