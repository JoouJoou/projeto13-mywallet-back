import joi from "joi";

const transactionsSchemas = joi.object({
  id: joi.string().email(),
  type: joi.string().valid("in", "out").required(),
  value: joi.number().required(),
});

export { transactionsSchemas };
