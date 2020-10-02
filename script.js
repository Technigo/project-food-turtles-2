//Variables for API
const cityID = 291;
const cuisineID = 168;
const apiUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineID}`;

const apiKey = {
  headers: {
    "user-key": "8a19cfda8e2373ef932d19b5766f922f"
  }
};

// Connecting our js with the restaurant-section in index.html
const burgerPlace = document.getElementById('restaurant-section');

// Fetching information about burger restaurants in Miami
fetch(apiUrl, apiKey)
  .then((response) => response.json())

.then((json) => {

    const restaurantInfo = json.restaurants.map(restaurant => {
    const name = restaurant.restaurant.name;
    const location = restaurant.restaurant.location.address;
    const rating = restaurant.restaurant.user_rating.aggregate_rating;
    const ratingtext = restaurant.restaurant.user_rating.rating_text;
    const cost = restaurant.restaurant.average_cost_for_two;
    let thumb = restaurant.restaurant.thumb;

    if (thumb) {
      thumb = restaurant.restaurant.thumb
    } else {
      thumb = "./img/burgerthumb.JPG"
    }

    return { name, location, rating, ratingtext, cost, thumb };

  })

  restaurantInfo.forEach((restaurant) => {
    burgerPlace.innerHTML += generateHTML(restaurant);
  });
    
    console.log(restaurantInfo)



    // Sorts the restaurantInfo-array highest->lowest
    
    

    // Function to sort price
    const sortOnPrice = () => {
        const sortedRestaurantInfo = restaurantInfo.sort((a, b) => a.cost - b.cost); // WHY CANT THIS BE OUTSIDE OUR FUNCTION??!!! :)
        // Empty the burgerPlace HTML
         burgerPlace.innerHTML = '';
        sortedRestaurantInfo.forEach((restaurant) => { 
             // Generate new HTML content
            burgerPlace.innerHTML += generateHTML(restaurant);
        })
    }
    // Eventlistener for button sortOnPrice
    document.getElementById('sortOnPrice').addEventListener('click', sortOnPrice);
    

    // Sorts the restaurantInfo-array lowest -> highest
    
     // Function to sort on rating
    const sortOnRating = () => {
         const sortedOnRating = restaurantInfo.sort((a, b) => a.rating - b.rating); // WHY CANT THIS BE OUTSIDE OUR FUNCTION??!!! :)
         // Empty the burgerPlace HTML
          burgerPlace.innerHTML = '';
          sortedOnRating.forEach((restaurant) => { 
              // Generate new HTML content
             burgerPlace.innerHTML += generateHTML(restaurant);
         })
     }
     // Eventlistener for button sortOnRating
     document.getElementById('sortOnRating').addEventListener('click', sortOnRating);
 

    // Creating filtered array to pick price range
    const pickFilteredArray = () => {
        const budget = +document.getElementById('budget').value;
        // Empty the HTML content
        burgerPlace.innerHTML = '';
        // check choosen select value to restaurant average cost
        if (budget === 50) {
            // filters the restaurantInfo array on cost
            const filteredArray = restaurantInfo.filter(object => object.cost < 51);
            // Generates new HTML content with filtered array
            filteredArray.forEach((restaurant) => {
                burgerPlace.innerHTML += generateHTML(restaurant)
            })
        } else if (budget === 100) {
            const filteredArray = restaurantInfo.filter(object => object.cost > 50 && object.cost < 101);
            filteredArray.forEach((restaurant) => {
                burgerPlace.innerHTML += generateHTML(restaurant)
            })
        } else {
            const filteredArray = restaurantInfo.filter(object => object.cost > 100 );
            filteredArray.forEach((restaurant) => {
                burgerPlace.innerHTML += generateHTML(restaurant)
            })
        } 
    };

    // eventlistener for button filterPrice
    document.getElementById('filterPrice').addEventListener('click', pickFilteredArray);
});

//Generating html for restaurants
const generateHTML = (restaurant) => {
  let burgerHTML = '';
  burgerHTML += `<article class="burger-place">`;
  burgerHTML += `<img src="${restaurant.thumb}"/>`;
  burgerHTML += `<h3>${restaurant.name}</h3>`;
  burgerHTML += `<p>&#127828; Adress: ${restaurant.location}</p>`;
  burgerHTML += `<p>&#11088; Rating: ${restaurant.rating} | ${restaurant.ratingtext}</p>`;
  burgerHTML += `<p>&#128184; Average cost: ${restaurant.cost} $</p>`;
  burgerHTML += `</article>`;

  return burgerHTML;
}

