const countrieselement = document.querySelector(".countries");
let toggleDropdown = document.getElementById("toggle__dropdown");
let ul__dropdown = document.getElementById("ul__dropdown");
let regionFilter = ul__dropdown.querySelectorAll("li");
const searchel = document.getElementById("search");
let modal = document.getElementById("modal");
let back = document.getElementById("back");

async function getcountry (){
    const url = await fetch("https://restcountries.com/v2/all");
    const res = await url.json();
    console.log(res);
    res.forEach(element => {
        showcountry(element)
    });
}
getcountry()
function showcountry(data){
    const country = document.createElement("div");
    country.classList.add("country");
    country.innerHTML = 
    ` <div class="counrty__img">
    <img src=${data.flag} alt=${data.name}/>
</div>
<div class="details">
    <h3 class="country__name">${data.name}</h3>
    <p><strong>Population:</strong> ${data.population}</p>
    <p class="country__region"><strong>Region:</strong> ${data.region}</p>
    <p><strong>Capital:</strong> ${data.capital}</p>
</div> `;

countrieselement.appendChild(country);
country.addEventListener("click" ,()=>{
    modal.style.display= "flex";
    showCountryDetails(data);
});
}

function showCountryDetails(data){
    const countryInfo =  modal.querySelector(".country__info");
    const modalImg = modal.querySelector("img");

    modalImg.src = data.flag;
    modalImg.alt = data.name;

    countryInfo.innerHTML = `
    <h3 class="country__name">${data.name}</h3>
    <div class="details">
        <div class="detials__onleft">  
            <p><strong>Native Name:</strong> ${data.nativeName}</p>
            <p><strong>Population:</strong> ${data.population}</p>
            <p><strong>Region:</strong> ${data.region}</p>
            <p><strong>Sub Region:</strong> ${data.subregion}</p>
            <p><strong>Capital:</strong> ${data.capital}</p>
        </div>
        <div class="details__onright">
            <p><strong>Top Level Domain:</strong> ${data.topLevelDomain[0]}</p>
            <p><strong>Currences:</strong> ${data.currencies.map(currency => currency.code)}</p>
            <p><strong>Languages:</strong> ${data.languages.map(language => language.name)}</p>
        </div>
    </div>
    <div class="borders">
        Border Countries : 
        <a>France</a>
        <a>Germany</a>
        <a>Nethland</a>
    </div>
    `
}


toggleDropdown.addEventListener("click" , ()=>{
    ul__dropdown.classList.toggle("open");
})

searchel.addEventListener("input" , e=>{
    const value = e.target.value;
    const countryname = document.querySelectorAll(".country__name");

    countryname.forEach(name =>{
        if(name.innerText.toLowerCase().includes(value.toLowerCase())){
            name.parentElement.parentElement.style.display= "block";
        }else{
            name.parentElement.parentElement.style.display="none";
        }
    });
});


regionFilter.forEach(filter =>{
    filter.addEventListener('click' , ()=>{
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll(".country__region");

        countryRegion.forEach(region =>{
            if(region.innerText.includes(value) || value==="All"){
                region.parentElement.parentElement.style.display= "block";
            }else{
                region.parentElement.parentElement.style.display="none";
            }
        });

    })
});

back.addEventListener("click" , ()=>{
    modal.style.display= "none"
})
