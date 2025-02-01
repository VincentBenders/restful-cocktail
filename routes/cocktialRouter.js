import Cocktail from "../schema's/Cocktail.js";
import {Router} from "express";
import {faker} from "@faker-js/faker";
import cocktail from "../schema's/Cocktail.js";


const cocktailRouter = new Router();

cocktailRouter.get('/cocktails', async (req, res) => {
    const cocktails = await Cocktail.find({});
    res.status(200).json({
        items: cocktails,
        _links: {
            self: {
                href: `${process.env.BASE_URL}/cocktails/`
            },
            collection: {
                href: `${process.env.BASE_URL}/cocktails/`
            }
        }
    });
});

cocktailRouter.get('/cocktails/:id', async (req, res) => {
    const id = req.params.id;
    const cocktail = await Cocktail.findById(id);
    if (cocktail === null){
        res.status(404).send('no cocktial found');
    } else {
        res.status(200).json(cocktail);
    }
});

cocktailRouter.options('/cocktails', async (req, res) => {
    res.setHeader("Allow", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.status(204).send();
});

cocktailRouter.options('/cocktails/:id', async (req, res) => {
    res.setHeader("Allow", "GET,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,OPTIONS");

    res.status(204).send();
});

cocktailRouter.post('/cocktails', async (req,res) =>{
    let cocktial = new Cocktail({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients
    });
    if (!cocktial.name || !cocktial.description || !cocktial.ingredients){
        return res.status(400).send("name, body & ingredients can't be empty")
    } else {
        await cocktial.save()
        res.status(201).json({
            message: cocktial
        });
    }
});

cocktailRouter.post('/cocktails/seed/:count', async (req, res) =>{
    const count = req.params.count;
    for (let i = 0; i <count; i++){
        let cocktail = Cocktail({
            name: faker.lorem.slug(),
            description: faker.lorem.text(),
            ingredients: faker.person.fullName()
        })
        await cocktail.save()
    }
    res.json({
        message: "Cocktails seeded"
    })
})

cocktailRouter.put('/cocktails/:id', async (req, res) => {
    const id = req.params.id;
    const cocktail = await Cocktail.findById(id);
    cocktail.name = req.body.name;
    cocktail.description = req.body.description;
    cocktail.ingredients = req.body.ingredients;
    if (!cocktail.name || !cocktail.description || !cocktail.ingredients)
    {
        res.status(400).send('name description & ingredients cant be empty');
    } else {
        await cocktail.save();
        res.status(201).json({
            message: cocktail
        });
    }
});

cocktailRouter.delete('/cocktails/:id', async (req,res) =>{
    const id = req.params.id;
    await Cocktail.findByIdAndDelete(id);
    res.status(204).send('item deleted');
});
export default cocktailRouter;