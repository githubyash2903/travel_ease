import Joi from "joi";

// Register validation schema
export const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must not exceed 50 characters",
      "any.required": "Name is required",
    }),
  
  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
  phone_no: Joi.string()
    .pattern(new RegExp("^[0-9]{10}$"))
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be a valid 10-digit number",
      "any.required": "Phone number is required",
    }),
    country_code: Joi.string()
    .pattern(new RegExp("^[+][0-9]{1,3}$"))
    .required()
    .messages({
      "string.empty": "Country code is required",
      "string.pattern.base": "Country code must be a valid format starting with + followed by 1 to 3 digits",
      "any.required": "Country code is required",
    }),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must not exceed 128 characters",
      "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)",
      "any.required": "Password is required",
    }),
});

// Login validation schema
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
  
  password: Joi.string()
    .min(1)
    .required()
    .messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
});

// Validation middleware function

