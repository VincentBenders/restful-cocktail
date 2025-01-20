import mongoose from "mongoose";

const cocktialSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    ingredients: {type: String, required: true}
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {

            ret._links = {
                self: {
                    href: `${process.env.BASE_URL}/cocktials/${ret._id}`
                },
                collection: {
                    href: `${process.env.BASE_URL}/cocktials`
                }
            }

            delete ret._id
        }
    }
});
const Cocktail = mongoose.model('Cocktail', cocktialSchema);
export default Cocktail