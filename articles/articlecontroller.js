const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Article = require('./Article')



router.get('/article',(req, res)=>{
    res.render('formulario/articles')
})

router.get('/erro', (req, res)=>{
    res.send('/erro no servidor')
})

router.post('/article/save', (req, res)=>{

    var {title, body} = req.body

    Article.create({
        title: title,
        body: body
    }).then(()=>{
        res.redirect('/article/list')
    }).catch(()=>{
        res.redirect('/erro')
    })
})

router.get('/article/list',(req, res)=>{
    Article.findAll().then(articles =>{
        res.render('table',{articles: articles})
    })
})

router.post('/article/delete',(req, res)=>{
    var {id} = req.body

    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect('/article/list')
            }).catch(()=>{
                res.redirect('/erro')
            })
        }else{
            res.redirect('/erro')
        }
    }else{
        res.redirect('/erro')
    }
})

router.get('/artEdit/:id',(req, res) =>{
    var id = req.params.id

    if(isNaN(id)){
        res.redirect('/erro')
    }

    Article.findByPk(id).then(articles =>{
        if(articles != undefined){
            res.render('formulario/artedit',{articles: articles})
        }else{
            res.redirect('/erro')
        }
    }).catch((err)=>{
        res.redirect('/erro')
    })

})

router.post('/artUpdate',(req, res)=>{

    var id = req.body.id
    var title = req.body.title
    var body = req.body.body

    Article.update({title: title, body: body},{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect('/article/list')
    }).catch(()=>{
        res.redirect('/erro')
    })
})



module.exports = router