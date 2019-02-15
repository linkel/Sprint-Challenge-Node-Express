const express = require('express');

const db = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
    .then(proj => {
        res.status(200).json(proj);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json("error: failed to get proj")
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
    .then(item => {
        console.log(item)
        if (item.length < 1) {
            res.status(404).json("error: there is no item with such an id") //due to the db mapping function, it dies before it can get here and will go straight to the catch
        } else {
            res.status(200).json(item)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json("error: The item doesn't exist, or the request failed.")
    })
})

router.post('/', (req, res) => {
    const project = req.body;
    if (!req.body.description || !req.body.name) {
        res.status(500).json({error: "Please include a name and description."})
    } else {
        db.insert(project)
            .then(response => {
                console.log(response);
                res.status(200).json(response)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: "Problem encountered while adding to database!"})
            })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(item => {
        if (item === 0) {
            res.status(404).json({error: "No such item id."})
        } else{
            res.status(200).json({message: "Successfully deleted item."})
        }    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json("error: The request failed.")
    })
})

module.exports = router;