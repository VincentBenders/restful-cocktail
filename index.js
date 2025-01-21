import express from 'express';
import mongoose from "mongoose";
import cocktailRouter from "./routes/cocktialRouter.js";

const app = express();
console.log(`Connecting to MongoDB at ${process.env.MONGODB_URL}`);
await mongoose.connect(process.env.MONGODB_URL);

// // Middleware voor JSON-gegevens
app.use(express.json());

// // Middleware voor www-urlencoded-gegevens
app.use(express.urlencoded({extended: true}));
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next()
})
app.use('/', (req, res, next) => {
    const acceptHeader = req.headers['accept'];

    if (acceptHeader.includes('application/json')) {
        next();
    } else {
        res.status(400).send('Illegal format');
    }

})

app.use('/', cocktailRouter);

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});