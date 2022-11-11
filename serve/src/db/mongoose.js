const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_HOST}`,
                    { 
                        autoIndex: false, //make this also true
                    }
                );