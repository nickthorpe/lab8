/*
    createCartItemView()

    Creates a view for a single cart item. This exists
    so that we can attach the item to the remove button
    so that when it's clicked, we know what item to remove.
*/

function createCartItemView(config) {
    //create a new TemplateView that we can augment with afterRender function
	var view = createTemplateView(config); 
    //find the remove item button, then catch the click to remove the current item from the cart
	view.afterRender = function(clonedTemplate, model) {
    	clonedTemplate.find('.remove-item').click(function(){
        	view.cartModel.removeItem(model);
        });	
    };
    //return view so caller can get the new view instance
    return view;
} //createCartItemView()
