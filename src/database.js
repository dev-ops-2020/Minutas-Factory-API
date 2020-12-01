const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('Connection complete'))
  .catch((err) => console.log(err));
mongoose.set('useFindAndModify', false);