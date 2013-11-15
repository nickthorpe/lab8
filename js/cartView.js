/*
    createCartView()

    Creates a view for the whole shopping cart, using TemplateListView
    as the prototype. It overrides the render() function to update the
    total price, and register click event handlers for the remove item
    buttons.
*/

function createCartView(config) {
	//add cartModel property to config object
    config.cartModel = config.model;
    //add templateView property to config object, set to instance of a cart item view
	config.templateView = createCartItemView(config);
	//creating Template List View, assigning it to view
	var view = createTemplateListView(config);
	//update total price within cart view
	view.afterRender = function() {
		this.totalPrice.html(this.model.getTotalPrice());
	}; //afterRender()
	//return view so caller gets reference to new view
	return view;
} //createCartView()
