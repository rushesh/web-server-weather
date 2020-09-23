// const req = require('postman-request')

// const getloc = (locationname,callback)=>{
// url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(locationname)+".json?access_token=pk.eyJ1IjoiZGV2b3BzZGV2IiwiYSI6ImNrZjd5emppbjAzejEydHBrOWE3djZ1MHQifQ.eUrQIPtWjUMUVrafvrnggg&limit=1"
// url = url.trim()
//   req({method:'GET',uri:url,json:true},(err,res,body)=>{
//     if(err){
//         callback({errmsg:err,errcode:undefined},undefined)
//     }else if(!body.features){
//             callback({errmsg:'Sorry no location could be found. Please try with another location',errcode:body.error.code},undefined)
//     }else if(body.features){
//         data = {
//             place_name:body.features[0].place_name,
//             country:body.features[0].center[0],
//             region:body.features[0].center[1]
//         }
//         callback(undefined,data)
//     }
// })
// } 

// module.exports = {
//     getloc : getloc
// }



const postmanreq = require('postman-request')



const getlatlog = (address,callback)=>{



    geoloc_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGV2b3BzZGV2IiwiYSI6ImNrZjd5emppbjAzejEydHBrOWE3djZ1MHQifQ.eUrQIPtWjUMUVrafvrnggg&limit=1"



    postmanreq({url:geoloc_url,json:true},(error,response,body)=>{

        if(error){

            callback("Some error occurred.. Probably you are not connected to the internet.",undefined)

        }

        else if(body.features){

        if(body.features && body.features.length===0){

            

            callback("You entered an invalid location. Please try again with a valid location.",undefined)

        }else{

            callback(undefined,

                {

            location: body.features[0].place_name,

            longitude : body.features[0].center[0],

            latitude : body.features[0].center[1]

                })

        }

    }else {

        callback("The location you entered could not be found. Please try again with a valid location.",undefined)

    }

    })

}



module.exports = {

    getloclatlong: getlatlog

}


