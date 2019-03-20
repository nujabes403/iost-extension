import axios from 'axios'

const API = false? 'https://endless.game/api/': 'http://18.223.43.49:8081/api/'

const api = {
  login: `${API}users/login`,
  logout: `${API}users/logout`,
  info: `${API}users/info`,
  refreshToken: `${API}users/refreshToken`,
}
const formData = data => Object.keys(data).reduce((prev, next) => (prev.append(next, data[next]), prev), new FormData())

const theseus = {
  login: async (phone ,password) => {
    try {
      const sdata = formData({
        phone,
        password
      })
      const { data } = await axios.post(api.login, sdata)
      if(data.code == 0){
        
      }else {

      }
    } catch (err) {
      console.log(err)
    }
  },
  info: async (token) => {
    try {
      const { data } = await axios.get(api.info, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(data.code == 0){

      }else {

      }
    } catch (err) {
      console.log(err)
    }
  },
  refreshToken: async (refreshToken) => {
    const sdata = formData({
      refreshToken,
    })
    try {
      const { data } = await axios.post(api.refreshToken,sdata)
      if(data.code == 0){

      }else {

      }
    } catch (err) {
      console.log(err)
    }
  },
  logout: async (token) => {
    try {
      const { data } = await axios.get(api.logout, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(data.code == 0){

      }else {

      }
    } catch (err) {
      console.log(err)
    }
  }
}



export default theseus