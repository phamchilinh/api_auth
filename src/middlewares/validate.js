const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return next(error);
  }
  Object.assign(req.body, value);
  return next();
};

module.exports = validate;