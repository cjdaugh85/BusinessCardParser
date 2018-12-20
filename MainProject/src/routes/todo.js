const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

router.get('/', (req, res) => {

    // use mongoose to get all todos in the database
    Todo.find((err, todos) => {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(todos); // return all todos in JSON format
    });
});

router.post('/', (req, res) => {
    Todo.create({
        text : req.body.text,
        done : false
    }, (err, todo) => {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find((err, todos) => {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

router.delete('/:todo_id', (req, res) => {
    Todo.remove({
        _id : req.params.todo_id
    }, (err, todo) => {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find((err, todos) => {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

module.exports = router;