const weatherForm = document.querySelector('#weatherForm')
const pmsg1 = document.querySelector('#message1')
const pmsg2 = document.querySelector('#message2')
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = document.querySelector('#loc').value
  pmsg1.textContent = 'Loading...'
  pmsg2.textContent = ''
  const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        pmsg1.textContent = data.msg
      } else {
        pmsg1.textContent = data.location
        pmsg2.textContent = data.forecast
      }
    })
  }).catch((err) => {
    pmsg1.textContent = err
  }).catch((error) => {
    pmsg1.textContent = err
  })
})