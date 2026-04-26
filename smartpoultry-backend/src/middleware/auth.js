const jwt = require("jsonwebtoken");

/**
 * authenticate — JWT Bearer token middleware
 *
 * Usage:
 *   const authenticate = require("../middleware/auth");
 *   router.get("/protected", authenticate, handler);
 *
 * On success  → attaches req.user = { id, role } and calls next()
 * On failure  → responds 401 { error: "Unauthorized" }
 */
function authenticate(req, res, next) {
  // 1. Extract token from "Authorization: Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. Verify signature + expiry
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach only what routes need — never forward the raw payload
    req.user = {
      id:   payload.id,
      role: payload.role,
    };

    next();
  } catch {
    // Covers: JsonWebTokenError, TokenExpiredError, NotBeforeError
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authenticate;
