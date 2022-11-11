const userRouter = require('./user');
const authRouter = require('./auth');
const postRouter = require('./post');
const auth = require('../middlewares/auth')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../../swagger.json')


const Router = (app) =>{
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/post', postRouter);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = Router;



