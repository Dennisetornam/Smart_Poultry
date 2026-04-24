/**
 * validate — Reusable Zod validation middleware factory
 *
 * Validates req.body against any Zod schema using safeParse (never throws).
 * On failure → 400 with { errors: { field: ["message", ...] } }
 * On success → replaces req.body with the clean parsed data and calls next()
 *
 * Usage:
 *   const validate = require("../middleware/validate");
 *   const { loginSchema } = require("../validators/authValidator");
 *
 *   router.post("/login", validate(loginSchema), loginHandler);
 *
 * @param {z.ZodTypeAny} schema - Any Zod schema
 * @returns {Function} Express middleware
 */
function validate(schema) {
  return function (req, res, next) {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.flatten().fieldErrors,
      });
    }

    // Overwrite req.body with clean, Zod-coerced data (e.g. trimmed strings)
    req.body = result.data;
    next();
  };
}

module.exports = validate;
