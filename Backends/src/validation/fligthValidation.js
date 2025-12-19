const Joi = require('joi');

/**
 * Validation schema for adding a new flight
 */
const addFlightSchema = Joi.object({
  airline: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .required()
    .messages({
      'string.empty': 'Airline name is required',
      'string.min': 'Airline name must be at least 2 characters long',
      'string.max': 'Airline name cannot exceed 150 characters',
      'any.required': 'Airline name is required'
    }),

  source: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Source airport is required',
      'string.min': 'Source airport must be at least 3 characters long',
      'string.max': 'Source airport cannot exceed 50 characters',
      'any.required': 'Source airport is required'
    }),

  destination: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Destination airport is required',
      'string.min': 'Destination airport must be at least 3 characters long',
      'string.max': 'Destination airport cannot exceed 50 characters',
      'any.required': 'Destination airport is required'
    }),

  departure: Joi.date()
    .iso()
    .min('now')
    .required()
    .messages({
      'date.base': 'Departure must be a valid date',
      'date.format': 'Departure must be in ISO format (YYYY-MM-DDTHH:mm:ss)',
      'date.min': 'Departure date cannot be in the past',
      'any.required': 'Departure date and time is required'
    }),

  arrival: Joi.date()
    .iso()
    .min(Joi.ref('departure'))
    .required()
    .messages({
      'date.base': 'Arrival must be a valid date',
      'date.format': 'Arrival must be in ISO format (YYYY-MM-DDTHH:mm:ss)',
      'date.min': 'Arrival time must be after departure time',
      'any.required': 'Arrival date and time is required'
    }),

  totalSeats: Joi.number()
    .integer()
    .min(1)
    .max(1000)
    .required()
    .messages({
      'number.base': 'Total seats must be a number',
      'number.integer': 'Total seats must be a whole number',
      'number.min': 'Total seats must be at least 1',
      'number.max': 'Total seats cannot exceed 1000',
      'any.required': 'Total seats is required'
    }),

  price: Joi.number()
    .positive()
    .precision(2)
    .min(0.01)
    .max(999999.99)
    .default(0)
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number',
      'number.precision': 'Price cannot have more than 2 decimal places',
      'number.min': 'Price must be at least 0.01',
      'number.max': 'Price cannot exceed 999,999.99'
    }),

  stops: Joi.number()
    .integer()
    .min(0)
    .max(10)
    .default(0)
    .messages({
      'number.base': 'Stops must be a number',
      'number.integer': 'Stops must be a whole number',
      'number.min': 'Stops cannot be negative',
      'number.max': 'Stops cannot exceed 10'
    })
});

/**
 * Validation schema for updating flight details
 */
const updateFlightSchema = Joi.object({
  airline: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .optional()
    .messages({
      'string.min': 'Airline name must be at least 2 characters long',
      'string.max': 'Airline name cannot exceed 150 characters'
    }),

  source: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Source airport must be at least 3 characters long',
      'string.max': 'Source airport cannot exceed 50 characters'
    }),

  destination: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Destination airport must be at least 3 characters long',
      'string.max': 'Destination airport cannot exceed 50 characters'
    }),

  departure: Joi.date()
    .iso()
    .min('now')
    .optional()
    .messages({
      'date.base': 'Departure must be a valid date',
      'date.format': 'Departure must be in ISO format (YYYY-MM-DDTHH:mm:ss)',
      'date.min': 'Departure date cannot be in the past'
    }),

  arrival: Joi.date()
    .iso()
    .when('departure', {
      is: Joi.exist(),
      then: Joi.date().min(Joi.ref('departure')),
      otherwise: Joi.date()
    })
    .optional()
    .messages({
      'date.base': 'Arrival must be a valid date',
      'date.format': 'Arrival must be in ISO format (YYYY-MM-DDTHH:mm:ss)',
      'date.min': 'Arrival time must be after departure time'
    }),

  totalSeats: Joi.number()
    .integer()
    .min(1)
    .max(1000)
    .optional()
    .messages({
      'number.base': 'Total seats must be a number',
      'number.integer': 'Total seats must be a whole number',
      'number.min': 'Total seats must be at least 1',
      'number.max': 'Total seats cannot exceed 1000'
    }),

  price: Joi.number()
    .positive()
    .precision(2)
    .min(0.01)
    .max(999999.99)
    .optional()
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number',
      'number.precision': 'Price cannot have more than 2 decimal places',
      'number.min': 'Price must be at least 0.01',
      'number.max': 'Price cannot exceed 999,999.99'
    }),

  stops: Joi.number()
    .integer()
    .min(0)
    .max(10)
    .optional()
    .messages({
      'number.base': 'Stops must be a number',
      'number.integer': 'Stops must be a whole number',
      'number.min': 'Stops cannot be negative',
      'number.max': 'Stops cannot exceed 10'
    })
}).min(1).messages({
  'object.min': 'At least one field is required for update'
});

/**
 * Validation schema for flight search/filter parameters
 */
const flightSearchSchema = Joi.object({
  source: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Source airport must be at least 3 characters long',
      'string.max': 'Source airport cannot exceed 50 characters'
    }),

  destination: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Destination airport must be at least 3 characters long',
      'string.max': 'Destination airport cannot exceed 50 characters'
    }),

  departureDate: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'Departure date must be a valid date',
      'date.format': 'Departure date must be in ISO format'
    }),

  airline: Joi.string()
    .trim()
    .max(150)
    .optional()
    .messages({
      'string.max': 'Airline name cannot exceed 150 characters'
    }),

  maxPrice: Joi.number()
    .positive()
    .precision(2)
    .min(0.01)
    .max(999999.99)
    .optional()
    .messages({
      'number.base': 'Max price must be a number',
      'number.positive': 'Max price must be a positive number',
      'number.precision': 'Max price cannot have more than 2 decimal places',
      'number.min': 'Max price must be at least 0.01',
      'number.max': 'Max price cannot exceed 999,999.99'
    }),

  maxStops: Joi.number()
    .integer()
    .min(0)
    .max(10)
    .optional()
    .messages({
      'number.base': 'Max stops must be a number',
      'number.integer': 'Max stops must be a whole number',
      'number.min': 'Max stops cannot be negative',
      'number.max': 'Max stops cannot exceed 10'
    }),

  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .optional()
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be a whole number',
      'number.min': 'Page must be at least 1'
    }),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .optional()
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be a whole number',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 100'
    })
});

module.exports = {
  addFlightSchema,
  updateFlightSchema,
  flightSearchSchema
};