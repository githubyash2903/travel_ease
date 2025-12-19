export const validateRequest = (schema:any) => {
  return (req: any, res: any, next: any) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all validation errors
      stripUnknown: true, // Remove unknown fields
    });

    if (error) {
      const errorMessages = error.details.map((detail: any) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return res.status(400).json({
        message: "Validation failed",
        errors: errorMessages,
      });
    }

    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};