/* controller.js
    Controller for Shopping Cart page
*/

$(function(){
	//translate format codes of movies to nicer looking labels
	var formatLabels = {
    	dvd: 'DVD',
    	bluray: 'Blu-Ray'
	};

	//create cart model
	var cartModel = createCartModel();

	//create cart view,	configuration object required with the following properties
	var cartView = createCartView({
    	model: cartModel,
    	template: $('.cart-item-template'),
    	container: $('.cart-items-container'),
    	totalPrice: $('.total-price')
	});

	//get the cart out of local storage, parse&pass results to cart models set items method
	var cartJSON = localStorage.getItem('cart');
	if (cartJSON && cartJSON.length > 0) {
    	cartModel.setItems(JSON.parse(cartJSON));
	}

	//create movie model
	var moviesModel = createMoviesModel({
    	url: 'https://courses.washington.edu/info343/ajax/movies/'
	});

	//create movie view, configuration object required with the following properties
	var moviesView = createMoviesView({
    	model: moviesModel,
    	template: $('.movie-template'),
    	container: $('.movies-container')
	});

	//refresh to get movies from server
	moviesModel.refresh();

	//when the movies view triggers 'addToCart'
	//add a new item to the cart, using the supplied
	//movieID and format
	moviesView.on('addToCart', function(data){
	    var movie = moviesModel.getItem(data.movieID);
	    if (!movie)
	        throw 'Invalid movie ID "' + movieID + '"!'; 

	    cartModel.addItem({
	        id: movie.id,
	        title: movie.title,
	        format: data.format,
	        formatLabel: formatLabels[data.format],
	        price: movie.prices[data.format]
	    });
	}); //addToCart event
	
	//when place order button is clicked, JSON of cart is posted to a web server
	$(".place-order").click(function() {
		$.ajax({
		    url: 'https://courses.washington.edu/info343/ajax/movies/orders/',
		    type: 'POST',
		    data: cartModel.toJSON(),
		    contentType: 'application/json',
		    //notify user of response when JSON is successfully posted to web server
		    success: function(responseData) {
		    	alert(responseData.message);
		    },
		    error: function(jqXHR, status, errorThrown) {
		        //error with post--alert user
		        alert(errorThrown || status);
		    }
		}); //ajax() 
		cartModel.setItems([]);               
	});

	//save the current cart JSON to local storage whenever it changes under the key 'cart'
	cartModel.on('change', function(){
    	localStorage.setItem('cart', cartModel.toJSON());
	});



}); //doc ready()

