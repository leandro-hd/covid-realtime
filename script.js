let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.covid19api.com/countries');

xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
xhr.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

xhr.setRequestHeader('Content-Type', 'application/json'); //Obrigatorio API
// xhr.setRequestHeader('access_token', '5cf9dfd5-3449-485e-b5ae-70a60e997864'); //Obrigatorio API


xhr.onreadystatechange = () => {

  if(xhr.readyState == 4) {
      if(xhr.status == 200) {
          console.log(JSON.parse(xhr.responseText));
      } 
  }

};

xhr.send();

