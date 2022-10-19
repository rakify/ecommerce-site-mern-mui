//This route checks all post requests if the data received from frontend is correct using the help of joi

const Joi = require("joi");

module.exports.loginValidation = loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(4).max(300).required(),
  });
  return schema.validate(data);
};

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
    accountType: Joi.number().allow(""),
    img: Joi.string().allow(""),
    phoneNumber: Joi.string()
      .trim()
      .length(11)
      .pattern(/^\d+$/) //d for only digits
      .allow("")
      .messages({
        "string.length": "Phone number must contain 11 digits",
        "string.pattern.base": "Phone number must contain only digits",
      }),
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
    accountType: Joi.number().required(),
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
    secondaryPhoneNumber: Joi.string()
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
    coverImg: Joi.string().allow(""),
    currentCity: Joi.string().min(3).max(300).allow(""),
    hometown: Joi.string().min(3).max(300).allow(""),
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
      district: Joi.string().max(100).min(3).trim().allow(""),
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
      district: Joi.string().max(100).min(3).trim().allow(""),
      upazila: Joi.string().max(100).min(3).trim().allow(""),
      street: Joi.string().max(300).min(3).allow(""),
    },
    followedStores: Joi.array().min(0),
  });
  return schema.validate(data);
};

module.exports.productValidation = productValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    createdAt: Joi.allow(""),
    updatedAt: Joi.allow(""),
    __v: Joi.allow(""),
    seller: Joi.string().required(),
    title: Joi.string().min(3).max(300).trim().required(),
    slug: Joi.string().trim().required(),
    desc: Joi.string().max(5000).required(),
    marketPrice: Joi.number().integer().min(1).required(),
    price: Joi.number().integer().max(Joi.ref("marketPrice")).required(),
    unit: Joi.string().allow(""),
    inStock: Joi.number().min(0).allow(""),
    cat: Joi.array().min(1).required(),
    img: Joi.string().allow(""),
    tags: Joi.array().allow(""),
    size: Joi.string().allow(""),
    color: Joi.string().allow(""),
    brand: Joi.string().allow(""),
    weight: Joi.string().allow(""),
    hasMerchantReturnPolicy: Joi.boolean().required(),
    model: Joi.string().allow(""),
  });

  return schema.validate(data);
};
