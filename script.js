let country = new XMLHttpRequest();
let confirmed = new XMLHttpRequest();
// let recovered = new XMLHttpRequest();
// let deaths = new XMLHttpRequest();

const countriesSelect = document.getElementById("country");

country.open('GET', 'https://api.covid19api.com/countries');
// recovered.open('GET', 'https://api.covid19api.com/dayone/country/south-africa/status/recovered');
// deaths.open('GET', 'https://api.covid19api.com/dayone/country/south-africa/status/deaths');

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

const confirmedRequest = document.getElementById('confirmedRequest')

btn.addEventListener("click", function() {
  let selectCountry = document.getElementById('country')
  let valueCountry = selectCountry.options[selectCountry.selectedIndex].value

  let selectPeriod = document.getElementById('period')
  let valuePeriod = selectPeriod.options[selectPeriod.selectedIndex].value

  if (valuePeriod === "day") {
    confirmed.open('GET', 'https://api.covid19api.com/summary');
  }
  confirmed.onreadystatechange = () => {
    if(confirmed.readyState == 4) {
      if(confirmed.status == 200) {
        const confirmedConfirmed = JSON.parse(confirmed.responseText);       
        for(let i = 0; i < confirmedConfirmed.Countries.length; i++) {          
            if(confirmedConfirmed.Countries[i].Country === valueCountry) {
              break;
            } else {
              var indexCountry = i
            }
        }
        console.log(indexCountry)
        console.log(confirmedConfirmed.Countries[0].Country)
      } 
    }
  };
  confirmed.send();
});

btn.addEventListener("click", function() {
  confirmed.onreadystatechange = () => {

    if(confirmed.readyState == 4) {
      if(confirmed.status == 200) {
        const json = JSON.parse(confirmed.responseText); 
        confirmed.innerHTML = "Confirmados: " + json[246].Cases;
      } 
    }
  };  
  confirmed.send();
})

recovered.onreadystatechange = () => {

  if(recovered.readyState == 4) {
    if(recovered.status == 200) {
      const json = JSON.parse(recovered.responseText); 
      console.log("Recuperados: " + json[246].Cases);
    } 
  }
  recovered.send();
};


deaths.onreadystatechange = () => {

  if(deaths.readyState == 4) {
    if(deaths.status == 200) {
      const json = JSON.parse(deaths.responseText); 
      console.log("Mortos: " + json[246].Cases);
    } 
  }
  deaths.send();
};
