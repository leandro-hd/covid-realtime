let country = new XMLHttpRequest();
let confirmed = new XMLHttpRequest();
let recovered = new XMLHttpRequest();
let deaths = new XMLHttpRequest();

country.open('GET', 'https://api.covid19api.com/countries');

const countriesSelect = document.getElementById('country');

country.onreadystatechange = () => {
  if(country.readyState == 4) {
    if(country.status == 200) {
      const countryName = JSON.parse(country.responseText);
      countryName.sort(function (a, b) {	
        return (a.Country > b.Country) ? 1 : ((b.Country > a.Country) ? -1 : 0);         
      });
      for (let Country in countryName) {
        countryName.hasOwnProperty(Country);
        countryList = countryName[Country].Country;
        option = new Option(countryList);
        countriesSelect.options[countriesSelect.options.length] = option;
      }
    } 
  }
}; 
country.send();

const btn = document.getElementById('btn');

btn.addEventListener('click', function() {
  let selectCountry = document.getElementById('country');
  let valueCountry = selectCountry.options[selectCountry.selectedIndex].value;

  let selectPeriod = document.getElementById('period');
  let valuePeriod = selectPeriod.options[selectPeriod.selectedIndex].value;

  confirmed.open('GET', 'https://api.covid19api.com/summary');

  confirmed.onreadystatechange = () => {
    if(confirmed.readyState == 4) {
      if(confirmed.status == 200) {
        confirmedRequest = document.getElementById('confirmedRequest');
      } 
    }
  }; 

  recovered.open('GET', 'https://api.covid19api.com/dayone/country/south-africa/status/recovered');

  recovered.onreadystatechange = () => {
    if(recovered.readyState == 4) {
      if(recovered.status == 200) {
        recoveredRequest = document.getElementById('recoveredRequest');
      } 
    }
  };  

  deaths.open('GET', 'https://api.covid19api.com/dayone/country/south-africa/status/deaths');

  deaths.onreadystatechange = () => {
    if(deaths.readyState == 4) {
      if(deaths.status == 200) {
        deathsRequest = document.getElementById('deathsRequest');
        const countrySelected = JSON.parse(confirmed.responseText);      
        for(let i = 0; i < countrySelected.Countries.length; i++) {  
          if (countrySelected.Countries[i].Country === valueCountry) {
            let countryPosition = i;
            if (valuePeriod === "day") {
              confirmedRequest.innerHTML = '<p>' + countrySelected.Countries[countryPosition].NewConfirmed.toLocaleString('pt-BR') + '</p>';
              recoveredRequest.innerHTML = '<p>' + countrySelected.Countries[countryPosition].NewRecovered.toLocaleString('pt-BR') + '</p>';
              deathsRequest.innerHTML = '<p>' + countrySelected.Countries[countryPosition].NewDeaths.toLocaleString('pt-BR') + '</p>';
            } else if (valuePeriod === "all") {
              confirmedRequest.innerHTML = '<p>' + countrySelected.Countries[countryPosition].TotalConfirmed.toLocaleString('pt-BR') + '</p>';
              recoveredRequest.innerHTML = '<p>' + countrySelected.Countries[countryPosition].TotalRecovered.toLocaleString('pt-BR') + '</p>';
              deathsRequest.innerHTML = '<p>' + countrySelected.Countries[countryPosition].TotalDeaths.toLocaleString('pt-BR') + '</p>';
            }
            break;
          } else {
            confirmedRequest.innerHTML = 'Nenhum registro de casos nesse país!';
          }
        }
      } 
    }
  };  

  confirmed.send();   
  recovered.send();
  deaths.send();
});