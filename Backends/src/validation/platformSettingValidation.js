const Joi = require('joi');

/**
 * Validation schema for platform settings
 */
const platformSettingSchema = Joi.object({
  websiteName: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Website name is required',
      'string.min': 'Website name must be at least 3 characters long',
      'string.max': 'Website name cannot exceed 100 characters',
      'any.required': 'Website name is required'
    }),

  logo: Joi.string()
    .optional()
    .allow('')
    .allow(null)
    .messages({
      'string.uri': 'Logo must be a valid URL'
    }),

  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),

  contactNo: Joi.string()
    .pattern(/^[+]?[1-9]?[0-9]{7,14}$/)
    .trim()
    .required()
    .messages({
      'string.pattern.base': 'Please provide a valid contact number (7-14 digits, optionally starting with +)',
      'string.empty': 'Contact number is required',
      'any.required': 'Contact number is required'
    }),

  maintenanceMode: Joi.boolean()
    .default(false)
    .messages({
      'boolean.base': 'Maintenance mode must be a boolean value (true or false)'
    })
});

module.exports = {
  platformSettingSchema
};