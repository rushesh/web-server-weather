const weatherselect = document.querySelector('#weatherselect')
const pmsg3 = document.querySelector('#message3')
const pmsg4 = document.querySelector('#message4')
const buttondropid = document.getElementById("buttondrop");
const select1 = document.getElementById("s1");

fetch('/getcities').then((response) => {
  buttondropid.style.display = "none"
  select1.style.display = "none"
  pmsg3.textContent = 'Loading Cities...'
  //console.log(response)
  response.json().then((data) => {
    // console.log(" ---- "+data.length)
    pmsg3.textContent = ''
    $(document).ready(function(){
    $("#s1").select2({
      data:data
    })
  })
    buttondropid.style.display = "inline-block";
    select1.style.display = "block";
  })
})

weatherselect.addEventListener('submit',
  (e) => {
    e.preventDefault()

    option_el = $('#s1 :selected')
    data = option_el.data('data')
    console.log('option_el : ',option_el)
    console.log('data : '+data)
    const location = data['text']
    pmsg3.textContent = 'Loading...'
    pmsg4.textContent = ''
    const url = '/weather?address=' + (location)
    fetch(url).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          pmsg3.textContent = data.msg
        } else {
          Notification.requestPermission(permission => {
            if (permission === 'granted') {
              const myNoti = new Notification('Weather Forecast', {
                body: data.forecast,
                icon: '\img\weather.png',
                image: '\img\weather2.jpg'
              });
            }
          });
          pmsg3.textContent = data.location
          pmsg4.textContent = data.forecast
        }
      })
    }).catch((err) => {
      pmsg3.textContent = err
    }).catch((error) => {
      pmsg4.textContent = err
    })
  })