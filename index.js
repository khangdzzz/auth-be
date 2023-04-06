import express from 'express';
const app = express();
import {db} from './helper/database.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import {route} from './src/router/index.js';
import errorHandler from './helper/error-handler.js';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
    cors({
      origin: true,
      credentials: true,
    }),
    express.json(),
    express.urlencoded({extended: true}),
    // OpenApiValidator.middleware(openapiOptions),
);
// connect database
db.once('open', function() {
  console.log('Connected to MongoDB database!');
});

// api routes
route(app);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
