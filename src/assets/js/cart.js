// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and properties
  // =============================
  var cart = [];
  
  // Constructor
  function Item(name, price, count, image) {
      this.name = name;
      this.price = price;
      this.count = count;
      this.image = image; // New property for image URL
  }
  
  // Save cart
  function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
  // Load cart
  function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
  }
  
  if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
  }

  // =============================
  // Public methods and properties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count, image) {
      for (var item in cart) {
          if (cart[item].name === name) {
              cart[item].count += count;
              saveCart();
              return;
          }
      }
      var item = new Item(name, price, count, image);
      cart.push(item);
      saveCart();
  }
  
  // Set count from item
  obj.setCountForItem = function(name, count) {
      for (var i in cart) {
          if (cart[i].name === name) {
              cart[i].count = count;
              break;
          }
      }
  };
  
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for (var item in cart) {
          if (cart[item].name === name) {
              if (cart[item].count > 1) {
                  cart[item].count--; // Decrement count
              } else {
                  cart.splice(item, 1); // Remove item if count is 0
              }
              break;
          }
      }
      saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
      for (var item in cart) {
          if (cart[item].name === name) {
              cart.splice(item, 1);
              break;
          }
      }
      saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
      cart = [];
      saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
      var totalCount = 0;
      for (var item in cart) {
          totalCount += cart[item].count;
      }
      return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
      var totalCart = 0;
      for (var item in cart) {
          totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
      var cartCopy = [];
      for (var i in cart) {
          var item = cart[i];
          var itemCopy = {};
          for (var p in item) {
              itemCopy[p] = item[p];
          }
          itemCopy.total = Number(item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy);
      }
      return cartCopy;
  }

  return obj;
})();

// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  var image = $(this).data('image'); // Get image URL from data attribute
  shoppingCart.addItemToCart(name, price, 1, image);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
      output += "<tr>"
          + "<td><img src='" + cartArray[i].image + "' alt='" + cartArray[i].name + "' style='width: 100px; height: 70px;'></td>" // Image column
          + "<td>" + cartArray[i].name + "</td>" 
          + "<td>(" + cartArray[i].price + ")</td>"
          + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].name + "'>-</button>"
          + "<span class='item-count' data-name='" + cartArray[i].name + "'>" + cartArray[i].count + "</span>"
          + "<button class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].name + "'>+</button></div></td>"
          + "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>"
          + " = " 
          + "<td>" + cartArray[i].total + "</td>" 
          + "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button
$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name');
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name');
  shoppingCart.removeItemFromCart(name);
  displayCart();
});

// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name');
  shoppingCart.addItemToCart(name, shoppingCart.listCart().find(item => item.name === name).price, 1); // Add 1 to the item
  displayCart();
});

// Order Now button functionality
$('.order-now').click(function(event) {
  event.preventDefault();
  
  // Check if there are items in the cart
  if (shoppingCart.totalCount() > 0) {
      // Clear the cart
      shoppingCart.clearCart();
      displayCart(); // Refresh the cart display

      // Close the modal
      $('#cart').modal('hide');

      // Display success message
      var orderMessage = $('<div class="order-message" style="background-color: green; color: white; padding: 10px; margin-top: 10px; display: none;">Order submitted successfully!</div>');
      $('.order-message-container').append(orderMessage); // Append message to modal footer

      // Slide in animation
      orderMessage.slideDown();

      // Hide the message after 3 seconds
      setTimeout(function() {
          orderMessage.slideUp(function() {
              $(this).remove(); // Remove the message after hiding
          });
      }, 3000);
  } else {
      // Close the modal if no items in cart
      $('#cart').modal('hide');
      var emptyMessage = $('<div class="order-message" style="background-color: red; color: white; padding: 10px; margin-top: 10px; display: none;">No items found in cart!</div>');
      $('.order-message-container').append(emptyMessage); // Append message to a container
      emptyMessage.slideDown().delay(3000).slideUp(function() {
          $(this).remove(); // Remove the message after hiding
      });
  }
});
// Initial display of cart
displayCart();