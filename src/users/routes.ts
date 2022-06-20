// // const express = require('express');

// // const controller = require('./controller/index');
// // const validateSchemas = require('../../middlewares/validateSchemas');
// // const schemas = require('./utils/schemasValidation');

// const router = express.Router();

// router.post(
//   '/api/v1/signup',
//   validateSchemas.inputs(schemas.signUp, 'body'),
//   (req:any, res:any) => {
//     controller.signUp(res, req.body);
//   }
// );

// export default router;