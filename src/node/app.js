const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

const geoloc = require('./utils/geolocation')
const getweather = require('./utils/getweather')
const getcities = require('./utils/getcities')
const port = process.env.PORT || 3000

const staticPath = path.join(__dirname,'../../public')
const hbsViewsPath = path.join(__dirname,'../../templates/views')
const hbsPartialPath = path.join(__dirname,'../../templates/partials')


app.use(express.static(staticPath))
app.set('view engine','hbs')
app.set('views',hbsViewsPath)
hbs.registerPartials(hbsPartialPath)


app.get('',(req,res)=>{
    res.render('index',{
    title:'Weather App',
    txt:'Welcome to our weather app.',
      name:'Rushesh Sharma',
    pageTitle:'Weather App'
    })
})
app.get('/cities',(req,res)=>{
    res.render('index2',{
        title:'Weather App',
        txt:'Please select a location from dropdown to search weather for.',
        name:'Rushesh Sharma',
        pageTitle:'Weather App'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
        txt:'We help you get the weather forecast for the location. Please enter complete location so that we can find easily location which is present in multiple countries.',
        name:'Rushesh Sharma',
        pageTitle:'Weather App'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        txt:'Mail us to get further help',
        name:'Rushesh Sharma',
        pageTitle:'Weather App'
    })
})
app.get('/cityweather',(req,res)=>{
    if(!req.query.address){
        console.log('No location provided. User forgot to mention loc!')
        return res.send({
            address:'address not mentioned in query.',
            error:404,
            msg:'You forgot to mention the location. Please provide the location you wish to see weather for.'
        })
    }
    const data = {
        location:req.query.address,
        error:undefined
    } 
getweather.getweather(data,(err,wetdata)=>{
                if(err){
                    return res.send({error:err,msg:err})
                }else{
                    const { location,region,country,currenttemperature,currentfeelslike,weather_descriptions,precipitation} = wetdata
                    const forecast = `The weather for ${location}, ${region}, ${country} is ${weather_descriptions}. The chances of rain are ${precipitation}%. The current temperature is ${currenttemperature}\u00B0C  and it feels like ${currentfeelslike}\u00B0C.`
                    return res.send({
                        forecast:forecast,
                        location:`${location}, ${region}, ${country}`
                    })
                }
            })
            })
app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        console.log('No location provided. User forgot to mention loc!')
        return res.send({
           address:'address not mentioned in query.',
            error:404,
            msg:'You forgot to mention the location. Please provide the location you wish to see weather for.'
        })
    }
    geoloc.getloclatlong(req.query.address,(error,data)=>{
        if(error){
            return res.send({error:error,msg:error})
        }else{
            getweather.getweather(data,(err,wetdata)=>{
                if(err){
                    return res.send({error:err,msg:err})
                }else{
                    const { location,region,country,currenttemperature,currentfeelslike,weather_descriptions,precipitation} = wetdata
                    const forecast = `The weather for ${location}, ${region}, ${country} is ${weather_descriptions}. The chances of rain are ${precipitation}%. The current temperature is ${currenttemperature}\u00B0C  and it feels like ${currentfeelslike}\u00B0C.`
                    return res.send({
                        forecast:forecast,
                        location:`${location}, ${region}, ${country}`
                    })
                }
            })
            }
    })
})


app.get('/getweather',(req,res)=>{
    
        if(!req.query.address){
            console.log('No location provided. User forgot to mention loc!')
            return res.send({
               address:'address not mentioned in query.',
                error:404,
                msg:'You forgot to mention the location. Please provide the location you wish to see weather for.'
            })
        }
        geoloc.getloclatlong(req.query.address,(error,data)=>{
            if(error){
                return res.send({error:error,msg:error})
            }else{
                getweather.getweather(data,(err,wetdata)=>{
                    if(err){
                        return res.send({error:err,msg:err})
                    }else{
                        const { location,region,country,currenttemperature,currentfeelslike,weather_descriptions,precipitation} = wetdata
                        const forecast = `Weather is ${weather_descriptions}. The chances of rain are ${precipitation}%.`
                        return res.send({
                            forecast:forecast,
                            location:`${location}, ${region}`
                        })
                    }
                })
                }
        })
    })
    
    

app.get('/getcities',(req,res)=>{
    getcities.getcities((data)=>{
        console.log(data.length)
        res.send(JSON.parse(data))
    })
})
 


app.get('*',(req,res)=>{
    res.render('notfound',{
        title:'Sorry. 404 Error occurred.',
        txt:'Please check the link. This web link could not be found.',
        name:'Rushesh Sharma',
        pageTitle:'Weather App'
    })
})
app.listen(port,()=>{
    console.log('Server Started at port : '+port)
})