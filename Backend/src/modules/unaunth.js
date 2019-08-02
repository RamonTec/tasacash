import axios from 'axios'

export class LocalBitcoin{

     constructor(apiEndpoint){

        this.apiEndpoint = apiEndpoint

      }

    request(endpoint){

      const options = {

      method: 'GET',
      url: "https://localbitcoins.com" + endpoint

    }

      return axios(options)
       .then(res => {

           return res

       })
      .catch(err=> {
          console.log('error: ', err.res)
         return err.res
       })
  }
}