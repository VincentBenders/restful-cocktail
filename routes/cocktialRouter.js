import Cocktail from "../schema's/Cocktail.js";
import {Router} from "express";
import {faker} from "@faker-js/faker";
import cocktail from "../schema's/Cocktail.js";


const cocktailRouter = new Router();

cocktailRouter.get('/cocktials', async (req, res) => {
    const cocktials = await Cocktail.find({})
    res.status(200).json({
        items: cocktials,
        _links: {
            self: {
                href: `${process.env.BASE_URL}/cocktials/`
            },
            collection: {
                href: `${process.env.BASE_URL}/cocktials/`
            }
        }
    });
})

cocktailRouter.get('/cocktials/:id', async (req, res) => {
    const id = req.params.id;
    const cocktail = await Cocktail.findById(id);
    if (cocktail === null){
        res.status(404).send('no cocktial found')
    } else {
        res.status(200).json(cocktail)
    }
})

cocktailRouter.post('/cocktials', async (req,res) =>{
    let cocktial = new Cocktail({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients
    })
    if (!cocktial.name || !cocktial.description || !cocktial.ingredients){
        return res.status(400).send("name, body & ingredients can't be empty")
    } else {
        await cocktial.save()
        res.status(201).json({
            message: cocktial
        })
    }
})
export default cocktailRouter;