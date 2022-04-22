let express = require('express');
let app = express();

let data = {};

app.use(express.json());

app.get('/api/todos', function(req, res) {
    res.send(data)
});

app.get('/api/todos/:id', function(req, res) {
    const id = req.params.id;
    res.send(data[id])
});

app.post('/api/todos', function(req, res) {
    const text = req.body.text;
    if (text == "") {
        res.status(400).send("Error: Text is empty")
        return
    }

    const id = Math.floor((Math.random() * 100) + 1);
    data[id] = {
        text : text,
        done : false
    }
    res.send("Success: todolist added")
});

app.put('/api/todos/:id', function(req, res) {
    const id = req.params.id;

    if ( id in data) {
        const text = req.body.text;
        // if ( text == undefined || text == "") {
        //     data[id] = {
        //         text : text
        //     }
        // }
        
        if ( text == undefined || text == "") {
            res.status(400).send("Failed Updated. Text is empty")
            return
        }
        
        const done = req.body.done;
        data[id] = {
            text : text,
            done : done   
        }
        res.send("todos updated");
        return
    }
    res.status(400).send("Error : id not found")
});

app.delete('/api/todos/:id', function(req, res) {
    const id = req.params.id;
    if (id in data) {
        delete data[id]
        res.send("Success: todos deleted")
    }
    res.status(400).send("Error: id not found")
})

app.listen(3000, () => {
    console.log("Server is running...");
})