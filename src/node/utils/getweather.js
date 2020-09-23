// const req = require('postman-request')

// const getweather = (locname,callback)=>{
// url = "http://api.weatherstack.com/current?access_key=6d799ec1fb32c41c88909b311119f5a4&query="+encodeURIComponent(locname)
// url = url.trim()
//   req({method:'GET',uri:url,json:true},(err,res,body)=>{
//     if(err){
//         callback({errmsg:err,errcode:undefined},undefined)
//     }else if(body.error){
//         if(body.error.code===601){
//             callback({errmsg:'Sorry it seems you have not the entered location. Pleasde enter the location.',errcode:body.error.code},undefined)    
//         }
//         else if(body.error.code===615){
//             callback({errmsg:'Sorry it seems the entered location is invalid. Pleasde check the location again.',errcode:body.error.code},undefined)
//         }else{
//             callback({errmsg:'Sorry some error occured while fetching the weather. Please try after some time.',errcode:body.error.code},undefined)
//         }
        
//     }else{
//         data = {
//             name:body.location.name,
//             country:body.location.country,
//             region:body.location.region,
//             observation_time:body.current.observation_time,
//             temperature:body.current.temperature,
//             weather_descriptions:body.current.weather_descriptions[0],
//             feelslike:body.current.feelslike,   
//         }
//         callback(undefined,data)
//     }
// })
// } 

// module.exports = {
//     getweather : getweather
// }




const postmanrequest = require('postman-request')
const getweather = (data,callback)=>{

    req_url = 'http://api.weatherstack.com/current?access_key=6d799ec1fb32c41c88909b311119f5a4&query='+encodeURIComponent(data.location)



    postmanrequest({url:req_url,json:true},(error,response,body)=>{

    //error just returns the basic

    if(error)

    {

        callback('You are not connected to the internet. Please try again after connecting to the internet.',undefined)

    }else if(body.error) {

        if(body.error.code==101){

                    callback('Invalid API Key ! Please contact the admin.',undefined)

        }else if(body.success==false){

                    callback('Invalid Location! Please try with a valid location',undefined)

    }

    }else{



        callback(undefined,{



            location : body.location.name,

            region : body.location.region,

            country : body.location.country,

            observation_time : body.current.observation_time,

            currenttemperature:body.current.temperature,

            currentfeelslike:body.current.feelslike,

            weather_descriptions:body.current.weather_descriptions[0],

            precipitation:body.current.precip

        })

}

})

}



module.exports = {

    getweather:getweather

}


