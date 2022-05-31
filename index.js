const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = 3000
const categoryController = require('./categoy/categorycontroller')
const articleController = require('./articles/articlecontroller')
const Article = require('./articles/Article')
const Category = require('./categoy/Category')
const userController = require('./user/userContoller')
const connection = require('./database/database')
const bcryptjs = require('bcryptjs')
const User = require('./user/User')



connection
    .authenticate()
    .then(()=>{
        console.log('conectado')
    }).catch(()=>{
        console.log('falha')
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.use('/', articleController)
app.use('/',categoryController)



app.get('/user',(req, res)=>{
    res.send('Boa tarde')
})

app.get('/users',(req, res)=>{
    res.render('Users/user')
})

app.post('/user/save',(req, res)=>{
    var email = req.body.email
    var password = req.body.password

    User.findOne({where:{email: email}}).then(user =>{
        
        if(user == undefined){
            var salt = bcryptjs.genSaltSync(10)
            var hash = bcryptjs.hashSync(password, salt)

            User.create({
                email: email,
                password: hash
            }).then(()=>{
                res.json('Cadastro criado com sucesso!')
            })
        }else{
            
            res.json('O email já existe no banco de dados')
            
        }

    })
    

})

//function alert(){

//}


app.listen(port, ()=> {
    console.log(`Aplicação rodando na porta ${port}`)
})