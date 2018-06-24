
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: { type: String, unique: true },//unique name
    user_email: String,
    country: String,
    password: String
    //image: Number //with multer -> https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d

    //reviwes: [{type: Schema.Types.ObjectId, ref:'review'}]
});

module.exports = mongoose.model('user', userSchema);



