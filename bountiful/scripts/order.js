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

    // Fetch nutritional information for the selected fruits
    const fruits = [choice1, choice2, choice3];
    const nutritionalInfoPromises = fruits.map(async (fruit) => {
        const response = await fetch(`https://api.apis.guru/v2/specs/fruityvice.apis.guru/1.0.0/swagger.json`);
        const data = await response.json();
        const fruitInfo = data.paths['/fruit/{name}'].get.parameters[0].enum.includes(fruit) ?
            await fetch(`https://api.apis.guru/v2/specs/fruityvice.apis.guru/1.0.0/swagger.json`)
                .then(response => response.json())
                .then(data => fetch(`https://api.apis.guru/v2/specs/fruityvice.apis.guru/1.0.0/swagger.json?fruitName=${fruit}`))
                .then(response => response.json())
            :
            null;
        return fruitInfo;
    });

    const nutritionalInfoArray = await Promise.all(nutritionalInfoPromises);

    // Calculate total nutrition
    const totalNutrition = nutritionalInfoArray.reduce((total, fruitInfo) => {
        if (fruitInfo) {
            total.carbohydrates += fruitInfo.carbohydrates || 0;
            total.protein += fruitInfo.protein || 0;
            total.fat += fruitInfo.fat || 0;
            total.sugar += fruitInfo.sugar || 0;
            total.calories += fruitInfo.calories || 0;
        }
        return total;
    }, {
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        sugar: 0,
        calories: 0
    });

    // Update the UI with the total nutrition information
    outputArea.innerHTML += `
        <p><strong>Total Carbohydrates:</strong> ${totalNutrition.carbohydrates} g</p>
        <p><strong>Total Protein:</strong> ${totalNutrition.protein} g</p>
        <p><strong>Total Fat:</strong> ${totalNutrition.fat} g</p>
        <p><strong>Total Sugar:</strong> ${totalNutrition.sugar} g</p>
        <p><strong>Total Calories:</strong> ${totalNutrition.calories} kcal</p>
    `;

    // Get order date and display pickup time
    const orderDate = new Date();
    const pickupTime = new Date(orderDate.getTime() + 30 * 60 * 1000); // 30 minutes from now
    const pickupTimeString = pickupTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    pickupTimeElement.innerText = `Pickup time: ${pickupTimeString}`;

    // Leave a review link (replace '#' with the actual link)
    document.getElementById('leave-review').href = '#';
});