import axios from 'axios'

export default function ({ redirect }) {
  axios.get('https://api.valorantstore.net/stats')
    .then(function (response) {
      if (response.data.data.maintenance === 'true') {
        redirect('/maintenance')
      }
    })
    .catch(function (error) {
      console.error(error)
    })
}
