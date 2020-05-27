const Note = require('../models/note.model.js');


exports.create = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "O conteúdo da nota não pode estar vazio"
        });
    }


    const note = new Note({
        title: req.body.title || "Nota sem título", 
        content: req.body.content
    });


    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao criar a nota."
        });
    });
};


exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao recuperar notas."
        });
    });
};

exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Nota não encontrada com o ID " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Nota não encontrada com o ID " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Erro ao recuperar a nota com o ID" + req.params.noteId
        });
    });
};


exports.update = (req, res) => {
 
    if(!req.body.content) {
        return res.status(400).send({
            message: "O conteúdo da nota não pode estar vazio"
        });
    }

    
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Nota sem título",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Nota não encontrada com o ID " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Nota não encontrada com o ID " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: " Erro ao atualizar a nota com o ID " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Nota não encontrada com o ID " + req.params.noteId
            });
        }
        res.send({message: "Note deletada com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Nota não encontrada com o ID " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Não foi possível excluir a nota com o ID " + req.params.noteId
        });
    });
};
