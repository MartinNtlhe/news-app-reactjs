import axios from "axios";

export default function request() {
  return new Promise((resolve, reject) => {
    axios.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=rOBWnkHZ6E8tEc21vxJkJVJPlPnrb0Y7').then( (res) => {
      resolve(res)
    }).catch(function (error) {
      reject(error);
    });
  });
}