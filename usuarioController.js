var Usuario =require('../models/usuario');

exports.save = function(nome,senha, callback){
    Usuario.findOne({'nome':nome},function(erro,usuario){
        if(erro){
            callback('Deu erro');
        }else
        if(usuario){
            callback('Usuario ja existe');
        }else{
            var novoUsuario = new Usuario();
            novoUsuario.nome= nome;
            novoUsuario.senha= novoUsuario.gerarSenha(senha);
            novoUsuario.token=novoUsuario.gerarToken(nome,senha);
            novoUsuario.save(function(erro,usuario){
                if(erro){
                    callback('deu erro');
                }else{
                    callback(usuario);
                }
            })
        }
    })
}

exports.login =function(nome,senha,callback){
    var novoUsuario= new Usuario();
    novoUsuario.nome=nome;
    novoUsuario.senha= novoUsuario.gerarSenha(senha);

    Usuario.findOne(novoUsuario, function(erro,usuario){
        if(erro){
            callback('Deu erro');
        }else
        if(usuario){
            callback(usuario.token);
        }else{
            callback('usuario nao existe');
        }
    })
}

exports.list= function(token,callback){
    Usuario.find({'token':token}, function(erro,usuario){
        if(erro){
            callback('Deu erro');
        }else if(usuario){
            callback(usuario.nome);
        }else{
            callback('Usuario n0ao encontrado ');
        }
    })
}