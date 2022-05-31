const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Carro = require('./Category')

router.get('/category',(req, res)=>{
    res.redirect('/list')
})

router.get('/form',(req, res)=>{
    res.render('formulario/formulario')
})

router.get('/falha',(req, res)=>{
    res.send('Falha no servidor')
})

router.post('/save', (req, res)=>{
    var {marca, modelo, valor} = req.body

    Carro.create({
        marca: marca,
        modelo: modelo,
        valor: valor
    }).then(()=>{
        res.redirect('/category')
    })
})

router.get('/list', (req, res)=>{

    Carro.findAll().then(carros =>{
        res.render('index', {carros: carros})
    })
})

router.post('/delete',(req, res)=>{
    var {id} = req.body

    if(id != undefined){
        if(!isNaN(id)){
            Carro.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect('/list')
            }).catch(()=>{
                res.redirect('/falha')
            })
        }else{
            res.redirect('/falha')
        }
    }else{
        res.redirect('/falha')
    }
})

router.get('/edit/:id', (req, res)=>{
    var id = req.params.id

    if(isNaN(id)){
        res.redirect('/falha')
    }

    Carro.findByPk(id).then(carros =>{
        if(carros != undefined){
            res.render('edit',{carros: carros})
        }else{
            res.redirect('/falha')
        }
    }).catch((err)=>{
        res.redirect('/falha')
    })

})

router.post('/update',(req, res)=>{

    var id = req.body.id
    var marca = req.body.marca
    var modelo = req.body.modelo
    var valor = req.body.valor

    Carro.update({marca: marca, modelo: modelo, valor: valor},{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect('/list')
    }).catch(()=>{
        res.redirect('/falha')
    })
})







module.exports = router