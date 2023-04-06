import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(process.env.CONNECTION_STRING_ATLAS, connectionOptions);

export const db = mongoose.connection;


