document.addEventListener("DOMContentLoaded", function () {
    var couponApplied = false;

    function handleRemoveItem() {
        document.querySelectorAll("#cart .far.fa-times-circle").forEach(function (icon) {
            icon.addEventListener("click", function (event) {
                event.preventDefault();
                var row = this.closest("tr");
                row.remove();
                updateCartTotal();
            });
        });
    }

    function handleQuantityChange() {
        document.querySelectorAll("#cart input[type='number']").forEach(function (input) {
            input.addEventListener("change", function () {
                var row = this.closest("tr");
                var price = parseFloat(row.querySelector("td:nth-child(4)").textContent.replace("€", ""));
                var quantity = parseInt(this.value);
                if (quantity < 0) {
                    this.value = 0;
                    quantity = 0;
                }
                var subtotal = price * quantity;
                row.querySelector("td:nth-child(6)").textContent = subtotal.toFixed(2) + "€";
                updateCartTotal();
            });
        });
    }

    function updateCartTotal() {
        var subtotal = 0;
        document.querySelectorAll("#cart tbody tr").forEach(function (row) {
            var quantity = parseInt(row.querySelector("input[type='number']").value);
            var price = parseFloat(row.querySelector("td:nth-child(4)").textContent.replace("€", ""));
            subtotal += price * quantity;
        });

        if (!couponApplied && validateCoupon()) {
            var couponCode = document.querySelector("#cuopon input").value.trim();
            if (couponCode === "#cart") {
                alert("Your coupon applied successfully.");
                var discount = subtotal * 0.7;
                subtotal -= discount;
                couponApplied = true;
            }
        }

        document.querySelectorAll("#subtotal tbody td:nth-child(2)").forEach(function (td) {
            if (!td.textContent.trim().startsWith("Free")) {
                td.textContent = subtotal.toFixed(2) + "€";
            }
        });
    }

    function validateCoupon() {
        var couponInput = document.querySelector("#cuopon input");
        var couponCode = couponInput.value.trim();
        if (!couponApplied && couponCode === "") {
            return true;
        }
        if (!couponApplied && couponCode.length < 4) {
            alert("Please write a 4 or more character coupon.");
            return false;
        }
        return true;
    }

    handleRemoveItem();
    handleQuantityChange();

    document.querySelector("#cart-add button.normal").addEventListener("click", function () {
        updateCartTotal();
    });

    document.querySelector("#subtotal button.normal").addEventListener("click", function () {
        alert("Thank you for your purchase!");
    });
});
