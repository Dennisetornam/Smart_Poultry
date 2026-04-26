/**
 * roleGuard — Role-based access control middleware factory
 *
 * Always chain AFTER the authenticate middleware so that req.user is set.
 *
 * Usage:
 *   const authenticate = require("../middleware/auth");
 *   const roleGuard    = require("../middleware/roleGuard");
 *
 *   // Single role
 *   router.delete("/farm", authenticate, roleGuard(["ADMIN"]), deleteHandler);
 *
 *   // Multiple allowed roles
 *   router.post("/batch", authenticate, roleGuard(["ADMIN", "MANAGER"]), createHandler);
 *
 * On success  → calls next()
 * On failure  → responds 403 { error: "Forbidden" }
 *
 * @param {string[]} allowedRoles - Array of role strings that may access the route
 * @returns {Function} Express middleware
 */
function roleGuard(allowedRoles) {
  return function (req, res, next) {
    // req.user is guaranteed by authenticate; guard against misconfigured chains
    const role = req.user?.role;

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}

module.exports = roleGuard;
