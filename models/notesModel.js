// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const MotorBikeSchema = new Schema({
    title: String,
    body: String,
    author: String
},
    {
        toJSON: {virtuals: true}
    });

// Add virtual property to each object to include links
MotorBikeSchema.virtual('_links').get(
    function () {
        return {
            self: {
                href: `${process.env.BASE_URI}motorBikes/${this._id}`
            },
            collection: {
                href: `${process.env.BASE_URI}motorBikes/`
            }
        }
    }
);

// Export function to create "SomeModel" model class
module.exports = mongoose.model("MotorBike", MotorBikeSchema);