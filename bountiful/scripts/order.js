document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('firstname');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const choice1 = urlParams.get('choice1');
    const choice2 = urlParams.get('choice2');
    const choice3 = urlParams.get('choice3');
    const instructions = urlParams.get('instructions');
 
    const outputArea = document.getElementById('output-area');
    const pickupTimeElement = document.getElementById('pickup-time');
 
    outputArea.innerHTML = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>1st Fruit:</strong> ${choice1}</p>
        <p><strong>2nd Fruit:</strong> ${choice2}</p>
        <p><strong>3rd Fruit:</strong> ${choice3}</p>
        <p><strong>Special Instructions:</strong> ${instructions || 'None'}</p>
    `;
 
   
    const fruits = [choice1, choice2, choice3];
    const nutritionalInfoPromises = fruits.map(async (fruit) => {
        const response = await fetch('./data/fruityvice.json');
        const data = await response.json();
        const fruitInfo = data.find(fruitData => fruitData.name === fruit);
        return fruitInfo;
    });
 
    const nutritionalInfoArray = await Promise.all(nutritionalInfoPromises);
 
 
    const totalNutrition = nutritionalInfoArray.reduce((total, fruitInfo) => {
        if (fruitInfo) {
            total.carbohydrates += fruitInfo.nutritions.carbohydrates || 0;
            total.protein += fruitInfo.nutritions.protein || 0;
            total.fat += fruitInfo.nutritions.fat || 0;
            total.sugar += fruitInfo.nutritions.sugar || 0;
            total.calories += fruitInfo.nutritions.calories || 0;
        }
        return total;
    }, {
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        sugar: 0,
        calories: 0
    });
 
 
    outputArea.innerHTML += `
    <p><strong>Total Carbohydrates:</strong> ${Math.round(totalNutrition.carbohydrates)} g</p>
    <p><strong>Total Protein:</strong> ${Math.round(totalNutrition.protein)} g</p>
    <p><strong>Total Fat:</strong> ${Math.round(totalNutrition.fat)} g</p>
    <p><strong>Total Sugar:</strong> ${Math.round(totalNutrition.sugar)} g</p>
    <p><strong>Total Calories:</strong> ${Math.round(totalNutrition.calories)} kcal</p>
`;

 
 
    const orderDate = new Date();
    const pickupTime = new Date(orderDate.getTime() + 30 * 60 * 1000); // 30 minutes from now
    const pickupTimeString = pickupTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    pickupTimeElement.innerText = ` ${pickupTimeString}`;
 
   
    document.getElementById('leave-review').href = '#';
});