const countryBox = document.querySelector('.countryBox');
const fragment = document.createDocumentFragment();
let countries = [];
fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,area,languages,currencies,timezones'

).then((response) =>
    response.json().then((data) =>{
        countries = data;
        displayCountries(countries);
    })
);
function displayCountries(countries) {
    countries.forEach(element  => {
            const countryDiv = document.createElement('div');
            countryDiv.classList.add('country');

            const name = document.createElement('h2');
            const capital = document.createElement('p');
            const flag = document.createElement('img');
            flag.classList.add('flag');
            const p = document.createElement('p');
            flag.src = element.flags.png;
            name.textContent = `Country: ${element.name.common}`;
            capital.textContent = `Capital: ${element.capital}`;
            p.textContent = `Region: ${element.region} | Population: ${element.population} | Area: ${element.area} km² `;
            countryDiv.appendChild(flag);
            countryDiv.appendChild(name);
            countryDiv.appendChild(capital);
            countryDiv.appendChild(p);
            fragment.appendChild(countryDiv);
            countryBox.appendChild(fragment);

        });
    };

const body = document.querySelector('body');
body.classList.add('body');

const dark = document.querySelector('#moon');
const light = document.querySelector('#sun');

dark.addEventListener('click', () => {
    dark.style.display = 'none';
    light.style.display = 'block';
    body.classList.add('body');
});

light.addEventListener('click', () => {
    dark.style.display = 'block';
    light.style.display = 'none';
    body.classList.remove('body');
});


const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => {
    countryBox.innerHTML = ''; 
    const value = searchInput.value.toLowerCase().trim();
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(value)
    );
    displayCountries(filteredCountries);
});

//sort

const sort = document.querySelector('#sortAZ');

sort.addEventListener('click', () => {
    countryBox.innerHTML = '';
    const sortedCountries = [...countries].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );
    displayCountries(sortedCountries);
});


//filter

const filter = document.querySelector('#region')

filter.addEventListener('change', () => {
    const filterValue = filter.value;
    countryBox.innerHTML = '';

    if(filterValue == ''){
        displayCountries (countries)
    }
    else {
        const filterCountry = filterValue 
        ? countries.filter((a)=> a.region === filterValue ): displayCountries()
        displayCountries(filterCountry)
    }
})