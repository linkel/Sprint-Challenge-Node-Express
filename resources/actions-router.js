const express = require('express');

const db = require('../data/helpers/actionModel.js');
const projDb = require('../data/helpers/projectModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    db.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json("error: failed to get actions")
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
    .then(item => {
        console.log(item)
        if (!item) {
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
    const action = req.body;
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(500).json({error: "Please include a project_id, description, and notes."})
    } else {
        projDb.get(action.project_id)
        .then(valid_project => {
            console.log(valid_project)
            db.insert(action)
            .then(response => {
                console.log(response);
                res.status(200).json(response)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: "Problem encountered while adding to database!"})
            })
        })
        .catch(err => {
            res.status(500).json({error: "Hey, you need to specify an existing project id!"})
        })
    }
})


module.exports = router;