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
  console.log(json)

  const restaurantInfo = json.restaurants.map(restaurant => {
    const name = restaurant.restaurant.name;
    const location = restaurant.restaurant.location.address;
    const rating = restaurant.restaurant.user_rating.aggregate_rating;
    const ratingtext = restaurant.restaurant.user_rating.rating_text;
    const cost = restaurant.restaurant.average_cost_for_two;
    const thumb = restaurant.restaurant.thumb;
    const delivery  = restaurant.restaurant.has_online_delivery; // value 0?
    const bookTable = restaurant.restaurant.has_table_booking; //value 0?
    

    return { name, location, rating, ratingtext, cost, thumb, bookTable, delivery};
    // burgerPlace.innerHTML += `<article>`;
    // burgerPlace.innerHTML += `<h3>${name}</h3>`;
    // burgerPlace.innerHTML += `</article>`;

  })

  console.log(restaurantInfo)


  restaurantInfo.forEach((restaurant) => {
    burgerPlace.innerHTML += `<div><h3>${restaurant.name}<h3>`;
    burgerPlace.innerHTML += `<img src="${restaurant.thumb}"/>`;
    burgerPlace.innerHTML += `<p>${restaurant.location}</p>`;
    burgerPlace.innerHTML += `<p>${restaurant.rating}</p>`;
    burgerPlace.innerHTML += `<p>${restaurant.ratingtext}</p>`;
    burgerPlace.innerHTML += `<p>${restaurant.cost}</p>`;
    burgerPlace.innerHTML += `<p>${restaurant.bookTable}</p>`; //value 0?
    burgerPlace.innerHTML += `<p>${restaurant.delivery}</p></div>`; //value 0?
  });
  });


 // Emma: ListReviews, latest three reviews from Charm City Burger Company

 const restID = 16927784; //Name: Charm City Burger Company
 const restUrl = `https://developers.zomato.com/api/v2.1/reviews?res_id=${restID}`;
 
 const reviewsSection = document.getElementById('reviews-section');
 
 // Fetching information about 
 fetch(restUrl, apiKey)
   .then((response) => response.json())
 
 .then((json) => {
   console.log(json)
 
   const specificReview = json.user_reviews.map(review => {
     const rating = review.review.rating;
     const reviewText = review.review.review_text;
     const ratingText = review.review.rating_text;
     const reviewTime = review.review.review_time_friendly;
     const reviewerName = review.review.user.name;

 
     return { rating, reviewText, ratingText, reviewTime, reviewerName };
   })
   

   specificReview.splice(3);
   console.log(specificReview);
   
   specificReview.forEach((review) => {
     burgerPlace.innerHTML += `<p>${review.rating}<p>`;
     burgerPlace.innerHTML += `<p>${review.reviewText}</p>`;
     burgerPlace.innerHTML += `<p>${review.ratingText}</p>`;
     burgerPlace.innerHTML += `<p>${review.reviewTime}</p>`;
     burgerPlace.innerHTML += `<p>${review.reviewerName}</p>`;
   });
   });

/*
// Anna

// Mats


// Gammal foreach:
//  console.log(json);
//json.restaurants.forEach((burger) => {
//console.log(burger.restaurant.name);
// console.log(burger.restaurant.location.address);
// console.log(burger.restaurant.user_rating.aggregate_rating);
//  console.log(burger.restaurant.user_rating.rating_text);
// console.log(burger.restaurant.average_cost_for_two);


//NYTT =
// const books = document.getElementsByClassName('book');
// const button = document.getElementById('click-button');
// const input = document.getElementById('input');

// button.addEventListener('click', () => {
//   const API_KEY = 'YOUR_KEY';
//   const API_URL = `https://www.googleapis.com/books/v1/volumes?q="${inputValue}"&langRestrict=us&key=${API_KEY}`;

//   const inputValue = input.value;



//     fetchBooks(API_URL);
//     input.value = "";
// });

// const fetchBooks = (url) => {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {

//             // map approach
//             const newBooks = data.items.map(book => {
//                 const author = book.volumeInfo.authors;
//                 const title = book.volumeInfo.title;
//                 const description = book.volumeInfo.description;

//                 return { author, title, description };
//             });


//             // Putting values from newBooks array into HTML
//             newBooks.forEach((item, index) => {
//                 books[index].querySelector('.title').innerText = item.title;
//                 books[index].querySelector('.author').innerText = item.author;
//                 books[index].querySelector('.description').innerText = item.description;
//             });
//         });
}}
*/