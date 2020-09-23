

const csv = require('csv-parser');

const fs = require('fs');

arr = []



const getcities = (callback)=>{

    arr = []

    fs.createReadStream('cities_formatted.csv')

  .pipe(csv())

  .on('data', (row) => {

    

    arr.push(row)

  })

  .on('end', () => {

    console.log('CSV file successfully processed');

       

        arr2 = arr

        arr = []

        callback(JSON.stringify(arr2))

  })

}

  module.exports = {

    getcities:getcities

  }


