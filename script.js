const cityID = 291;
const cuisineID = 168;

const apiUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineID}`;

const apiKey = {
  headers: {
    "user-key": "8a19cfda8e2373ef932d19b5766f922f"
  }
};

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



// Sorts the restaurantInfo-array highest->lowest
    const sortedRestaurantInfo = restaurantInfo.sort((a, b) => a.cost - b.cost);
    console.log(sortedRestaurantInfo)
    // Reverse the sortedRestaurantInfo price lowest-> highest
    // const reversedSorting = sortedRestaurantInfo.reverse();
    // console.log('reversed:', reversedSorting);

    const sortOnPrice = (sortedRestaurantInfo) => {
        alert('hej')
    sortedRestaurantInfo.forEach((restaurant) => {
        burgerPlace.innerHTML += generateHTML(restaurant);
    })
}

    

    });

const generateHTML = (restaurant) => {
  let burgerHTML = '';
  burgerHTML += `<article class="burger-place">`;

  burgerHTML += `<img src="${restaurant.thumb}"/>`;
  burgerHTML += `<h3>${restaurant.name}</h3>`;
  burgerHTML += `<p>Adress: ${restaurant.location}</p>`;
  burgerHTML += `<p>&#11088; Rating: ${restaurant.rating}</p>`;
  burgerHTML += `<p>${restaurant.ratingtext} </p>`;
  burgerHTML += `<p>Average cost: ${restaurant.cost} $</p>`;
  burgerHTML += `</article>`;

  return burgerHTML;
}


document.getElementById('sortOnPrice').onclick = sortOnPrice;




