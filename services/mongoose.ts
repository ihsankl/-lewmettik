// const mongoose = require('mongoose');

// const config = require('../config');
import mongoose from 'mongoose';
import { generalConfig as config } from '../src/config';

const dbUrl = config.dbUrlMongoDB as string;

mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true }, // To avoid deprecated options
  (err) => {
    if (err) console.log('Error', err);
    else console.log('Mongodb connected');
  }
);

export default mongoose;