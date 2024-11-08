// ************************************************
// Wishlist API
// ************************************************

var wishlistAPI = (function() {
    // =============================
    // Private methods and properties
    // =============================
    var wishlist = [];
    
    // Constructor
    function Item(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image; // New property for image URL
    }
    
    // Save wishlist
    function saveWishlist() {
        sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    
    // Load wishlist
    function loadWishlist() {
        wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
    }
    
    // Load wishlist on initialization
    loadWishlist();

    // =============================
    // Public methods and properties
    // =============================
    var obj = {};
    
    // Add to wishlist
    obj.addItemToWishlist = function(name, price, image) {
        // Check if item already exists
        for (var item of wishlist) {
            if (item.name === name) {
                return; // Item already in wishlist, do nothing
            }
        }
        var item = new Item(name, price, image);
        wishlist.push(item);
        saveWishlist();
    };
    
    // Remove item from wishlist
    obj.removeItemFromWishlist = function(name) {
        wishlist = wishlist.filter(item => item.name !== name);
        saveWishlist();
    };
    
    // Clear wishlist
    obj.clearWishlist = function() {
        wishlist = [];
        saveWishlist();
    };
    
    // List wishlist
    obj.listWishlist = function() {
        return wishlist;
    };
    
    // Total wishlist count
    obj.totalCount = function() {
        return wishlist.length;
    };
    
    return obj;
})();

// *****************************************
// Triggers / Events
// ***************************************** 
// Add item to wishlist
$('.add-to-wishlist').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var image = $(this).data('image'); // Get image URL from data attribute
    wishlistAPI.addItemToWishlist(name, price, image);
    displayWishlist();
    updateWishlistCount();
});

// Move items from wishlist to cart
$('.move-to-cart').click(function() {
    var wishlistArray = wishlistAPI.listWishlist();

    // Check if there are items in the wishlist
    if (wishlistAPI.totalCount() > 0) {
        wishlistArray.forEach(function(item) {
            shoppingCart.addItemToCart(item.name, item.price, 1, item.image); // Ensure count is set to 1
        });
        wishlistAPI.clearWishlist(); // Clear wishlist after moving items
        displayWishlist(); // Refresh wishlist display
        updateWishlistCount(); // Update wishlist count

        // Close the wishlist modal (assuming it's a modal)
        $('#wishlist').modal('hide'); // Replace with your modal ID
        // Display success message
        var successMessage = $('<div class="wishlist-message" style="background-color: green; color: white; padding: 10px; margin-top: 10px; display: none;">Items added to cart successfully!</div>');
        $('.wishlist-message-container').append(successMessage); // Append message to a container
        successMessage.slideDown().delay(3000).slideUp(function() {
            $(this).remove(); // Remove the message after hiding
        });

    } else {
        // Close the wishlist modal (assuming it's a modal)
        $('#wishlist').modal('hide'); // Replace with your modal ID
        // Display message that no items were found in the wishlist
        var emptyMessage = $('<div class="wishlist-message" style="background-color: red; color: white; padding: 10px; margin-top: 10px; display: none;">No items found in wishlist!</div>');
        $('.wishlist-message-container').append(emptyMessage); // Append message to a container
        emptyMessage.slideDown().delay(3000).slideUp(function() {
            $(this).remove(); // Remove the message after hiding
        });
    }
});

// Clear wishlist items
$('.clear-wishlist').click(function() {
    wishlistAPI.clearWishlist();
    displayWishlist();
    updateWishlistCount();
});

// Display wishlist in modal
function displayWishlist() {
    var wishlistArray = wishlistAPI.listWishlist();
    var output = "";
    for (var i in wishlistArray) {
        output += "<tr>"
            + "<td><img src='" + wishlistArray[i].image + "' alt='" + wishlistArray[i].name + "' style='width: 100px; height: 70px;'></td>" // Image column
            + "<td>" + "<span style='margin-right: 5px;'>" + wishlistArray[i].name + "</span>" 
            + "<span style='margin-right: 5px;'>(" + wishlistArray[i].price + ")</span>"
            + "<button class='delete-item btn btn-danger' data-name='" + wishlistArray[i].name + "'>Remove</button>"
            + "</td>" 
            + "</tr>";
    }
    $('.show-wishlist').html(output);
}

// Update total count of wishlist items
function updateWishlistCount() {
    $('.wishlist-total-count').html(wishlistAPI.totalCount());
}

// Delete item button
$('.show-wishlist').on("click", ".delete-item", function(event) {
    var name = $(this).data('name');
    wishlistAPI.removeItemFromWishlist(name);
    displayWishlist();
    updateWishlistCount();
});

// Initial display of wishlist
displayWishlist();
updateWishlistCount();