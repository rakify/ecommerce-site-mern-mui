const Joi = require("joi");

module.exports.addUserValidation = registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).trim().required(),
    email: Joi.string().email().max(300).trim().required(),
    password: Joi.string().min(4).max(300).trim().required(),
    repeat_password: Joi.string()
      .equal(Joi.ref("password"))
      .options({
        messages: {
          "any.only": "Passwords do not match",
        },
      })
      .required(),
    img: Joi.string().allow(""),
  });
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(4).max(300).required(),
  });
  return schema.validate(data);
};

module.exports.updateUserValidation = userValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    __v: Joi.required(),
    isAdmin: Joi.bool().required(),
    username: Joi.string().min(3).max(100).trim().required(),
    email: Joi.string().email().max(300).trim().required(),
    password: Joi.string().min(4).max(300).trim().allow(""),
    repeat_password: Joi.string()
      .equal(Joi.ref("password"))
      .options({
        messages: {
          "any.only": "Passwords do not match",
        },
      })
      .allow(""),
    firstName: Joi.string().min(3).max(100).trim().allow(""),
    lastName: Joi.string().min(3).max(100).trim().allow(""),
    phoneNumber: Joi.string()
      .trim()
      .length(11)
      .pattern(/^\d+$/) //d for only digits
      .allow("")
      .messages({
        "string.length": "Phone number must contain 11 digits",
        "string.pattern.base": "Phone number must contain only digits",
      }),
    gender: Joi.string().allow(""),
    img: Joi.string().allow(""),
    shippingInfo: {
      fullName: Joi.string().min(3).max(300).allow(""),
      phoneNumber: Joi.string()
        .trim()
        .length(11)
        .pattern(/^\d+$/) //d for only digits
        .allow("")
        .messages({
          "string.length": "Phone number must contain 11 digits",
          "string.pattern.base": "Phone number must contain only digits",
        }),
      email: Joi.string().email().max(300).trim().allow(""),
      gender: Joi.string().allow(""),
      division: Joi.string().max(100).min(3).trim().allow(""),
      distrcit: Joi.string().max(100).min(3).trim().allow(""),
      upazila: Joi.string().max(100).min(3).trim().allow(""),
      street: Joi.string().max(300).min(3).allow(""),
    },
    billingInfo: {
      fullName: Joi.string().min(3).max(300).allow(""),
      phoneNumber: Joi.string()
        .trim()
        .length(11)
        .pattern(/^\d+$/) //d for only digits
        .allow("")
        .messages({
          "string.length": "Phone number must contain 11 digits",
          "string.pattern.base": "Phone number must contain only digits",
        }),
      email: Joi.string().email().max(300).trim().allow(""),
      gender: Joi.string().allow(""),
      division: Joi.string().max(100).min(3).trim().allow(""),
      distrcit: Joi.string().max(100).min(3).trim().allow(""),
      upazila: Joi.string().max(100).min(3).trim().allow(""),
      street: Joi.string().max(300).min(3).allow(""),
    },
  });
  return schema.validate(data);
};

module.exports.updateUserValidation = userValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    __v: Joi.required(),
    isAdmin: Joi.bool().required(),
    username: Joi.string().min(3).max(100).trim().required(),
    email: Joi.string().email().max(300).trim().required(),
    password: Joi.string().min(4).max(300).trim().allow(""),
    repeat_password: Joi.string()
      .equal(Joi.ref("password"))
      .options({
        messages: {
          "any.only": "Passwords do not match",
        },
      })
      .allow(""),
    firstName: Joi.string().min(3).max(100).trim().allow(""),
    lastName: Joi.string().min(3).max(100).trim().allow(""),
    phoneNumber: Joi.string()
      .trim()
      .length(11)
      .pattern(/^\d+$/) //d for only digits
      .allow("")
      .messages({
        "string.length": "Phone number must contain 11 digits",
        "string.pattern.base": "Phone number must contain only digits",
      }),
    gender: Joi.string().allow(""),
    img: Joi.string().allow(""),
    shippingInfo: {
      fullName: Joi.string().min(3).max(300).allow(""),
      phoneNumber: Joi.string()
        .trim()
        .length(11)
        .pattern(/^\d+$/) //d for only digits
        .allow("")
        .messages({
          "string.length": "Phone number must contain 11 digits",
          "string.pattern.base": "Phone number must contain only digits",
        }),
      email: Joi.string().email().max(300).trim().allow(""),
      gender: Joi.string().allow(""),
      division: Joi.string().max(100).min(3).trim().allow(""),
      distrcit: Joi.string().max(100).min(3).trim().allow(""),
      upazila: Joi.string().max(100).min(3).trim().allow(""),
      street: Joi.string().max(300).min(3).allow(""),
    },
    billingInfo: {
      fullName: Joi.string().min(3).max(300).allow(""),
      phoneNumber: Joi.string()
        .trim()
        .length(11)
        .pattern(/^\d+$/) //d for only digits
        .allow("")
        .messages({
          "string.length": "Phone number must contain 11 digits",
          "string.pattern.base": "Phone number must contain only digits",
        }),
      email: Joi.string().email().max(300).trim().allow(""),
      gender: Joi.string().allow(""),
      division: Joi.string().max(100).min(3).trim().allow(""),
      distrcit: Joi.string().max(100).min(3).trim().allow(""),
      upazila: Joi.string().max(100).min(3).trim().allow(""),
      street: Joi.string().max(300).min(3).allow(""),
    },
  });
  return schema.validate(data);
};

module.exports.productValidation = productValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    createdAt: Joi.allow(""),
    updatedAt: Joi.allow(""),
    __v: Joi.allow(""),
    title: Joi.string().min(3).max(300).trim().required(),
    slug: Joi.string().trim().required(""),
    desc: Joi.string().max(1000).required(),
    cat: Joi.array().required(),
    price: Joi.number().integer().min(1).required(),
    img: Joi.string().allow(""),
    tags: Joi.array().allow(""),
    unit: Joi.string().required(),
    inStock: Joi.bool().required(),
  });
  return schema.validate(data);
};
