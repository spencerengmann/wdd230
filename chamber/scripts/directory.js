

var gridSelector = document.querySelector('#directory-grid');
var listSelector = document.querySelector('#directory-list');
var directoryData = document.querySelector('#directory-data');

gridSelector.addEventListener('click', ()=>{
    if (!gridSelector.classList.contains('active')){    
        gridSelector.classList.add('active');
        listSelector.classList.remove('active');
        directoryData.classList.add('directory-cards')
        directoryData.classList.remove('directory-list')
    }
});

listSelector.addEventListener('click', ()=>{
    if (!listSelector.classList.contains('active')){
        listSelector.classList.add('active');
        gridSelector.classList.remove('active');
        directoryData.classList.add('directory-list')
        directoryData.classList.remove('directory-cards')
    }
});



const url = "./data/members.json";


const displayMembers = (businesss) => {
  const cards = document.querySelector(".directory-cards"); 

  businesss.forEach((business) => {
    
    let card = document.createElement("section");
    card.innerHTML = `
    <img src="${business.imageURL}">
    <p>${business.name}</p>
    <p>${business.address}</p>
    <p>${business.phone}</p>
    <p>${business.membershipLevel}</p>
    <p><a class="card-button" href="${business.websiteURL}">Website</a></p>
    `;
    if (business.membershipLevel=='gold'){
      card.classList.add('gold-member');
    }
    cards.appendChild(card);
  }); 
  
}; 



async function getBusinessData() {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    displayMembers(data.members);
    
  } else {
    console.error("There was an error loading the data.");
    const cards = document.querySelector("directory-cards");
    cards.innerHTML = "<section><h1>There was an error loading the data</h1></section>";
  }
}

getBusinessData();