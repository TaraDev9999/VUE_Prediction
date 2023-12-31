const { Joi } = require('express-validation');

module.exports = {
  login: {
    body: Joi.object({
      user: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};
