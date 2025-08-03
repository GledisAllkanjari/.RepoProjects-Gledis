document.addEventListener("DOMContentLoaded", function () {
    // Variable to keep track of whether the coupon has been applied
    var couponApplied = false;

    // Function to handle removing items from the cart
    function handleRemoveItem() {
        document.querySelectorAll("#addToCart .far.fa-times-circle").forEach(function (icon) {
            icon.addEventListener("click", function (event) {
                event.preventDefault();
                var row = this.closest("tr");
                row.remove();
                updateCartTotal(); // Update subtotal after removing item
            });
        });
    }

    


    // Call the functions to set up event listeners
    handleRemoveItem();
    handleQuantityChange();

    // Apply coupon
    document.querySelector("#cart-add button.normal").addEventListener("click", function () {
        updateCartTotal(); // Update subtotal after applying coupon
    });

    // Proceed to checkout
    document.querySelector("#subtotal button.normal").addEventListener("click", function () {
        // Redirect to checkout page
        alert("Thank you for your purchase!");
    });
});
