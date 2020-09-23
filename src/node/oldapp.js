// const path = require('path')
// const express = require('express')
// const app = express()
// const hbs = require('hbs')

// const staticPath = path.join(__dirname,'../../public')
// const hbsViewsPath = path.join(__dirname,'../../templates/views')
// const hbsPartialPath = path.join(__dirname,'../../templates/partials')


// app.use(express.static(staticPath))
// app.set('view engine','hbs')
// app.set('views',hbsViewsPath)
// hbs.registerPartials(hbsPartialPath)


// app.get('',(req,res)=>{
//     res.render('index',{
//         pagetitle:'Weather App',
//         txt:'Welcome to weather app',
//         title:'Weather App',
//         name:'Rushesh Sharma'
//     })
// })
// app.get('/help',(req,res)=>{
//    res.render('help',{
//     pagetitle:'Weather App',
//     txt:'Hey ! How can we help you.',
//     title:'Help',
//     name:'Rushesh Sharma'
// })
// })

// app.get('/about',(req,res)=>{
//     res.render('about',{
//         pagetitle:'Weather App',
//         txt:'All about me..',
//         title:'About',
//         name:'Rushesh Sharma'
//     })
// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         temp:37,
//         loc : 'Shamli'
//     })
// })

// app.get('/weather/*',(req,res)=>{
//     res.render('about',{
//         pagetitle:'Weather App',
//         txt:'404 Error',
//         title:'Sorry.. This link cannot be found!',
//         name:'Rushesh Sharma'
//     })
// })


// app.get('*',(req,res)=>{
//     res.render('about',{
//         pagetitle:'Weather App',
//         txt:'404 Error',
//         title:'Sorry.. This link cannot be found!',
//         name:'Rushesh Sharma'
//     })
// })





// app.listen(3000,()=>{
//     console.log('Server Started at 3000')
// })