import ExternalServices from "./ExternalServices.mjs";
import { alertMessage, convertToJson, getLocalStorage, removeAllAlerts, setLocalStorage } from "./utils.mjs";

const services = new ExternalServices;

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {

    function template(item) {
        return {
            "id": item.Id,
            "name": item.Name,
            "price": item.FinalPrice,
            "quantity": 1
        }
    };

    const simplifiedItems = items.map(template);
    return simplifiedItems;
}


function formDataToJSON(form) {
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    })
    return jsonData;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.output = document.querySelector(outputSelector);
        this.cart = [];
        this.subtotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.numberOfItems = 0;
    }

    init() {
        this.cart = getLocalStorage(this.key);
        this.calculateItemSummary()

    }

    calculateItemSummary() {
        this.cart.forEach(item => {
            this.subtotal += item.FinalPrice * item.numberInCart
            // console.log(this.subtotal);
        })

        this.numberOfItems = 0;
        this.cart.forEach(item => {
            this.numberOfItems += item.numberInCart
        });

        

        this.output.insertAdjacentHTML("afterbegin", 
            `<p>You have ${this.numberOfItems} item(s) in your cart.</p>
            <p>Subtotal: $${this.subtotal.toFixed(2)}</p>
            <p id="shipping">Shipping:</p>
            <p id="tax">Tax:</p>
            <p id="total">Total:</p>`
    );
    }

    calculateOrderTotal() {
        if (this.cart.length) {
            this.shipping = this.numberOfItems*2 + 8;
        } else {
            this.displayOrderTotals()
            return
        }

        
        this.tax = Math.round(this.subtotal * 0.06 * 100) / 100

        this.orderTotal = this.subtotal + this.shipping + this.tax

        this.displayOrderTotals()
    }

    displayOrderTotals() {
        const shipping = document.querySelector("#shipping");
        const tax = document.querySelector("#tax");
        const total = document.querySelector("#total");

        shipping.textContent = `Shipping: $${this.shipping.toFixed(2)}`;
        tax.textContent = `Tax: $${this.tax.toFixed(2)}`;
        total.textContent = `Total: $${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        try {
            // build the data object from the calculated fields, the items in the cart, and the information entered into the form
            const form = document.forms.checkout;

            const jsonData = formDataToJSON(form);
            jsonData.orderDate = new Date();
            jsonData.items = packageItems(this.cart);
            jsonData.orderTotal = this.orderTotal;
            jsonData.shipping = this.shipping;
            jsonData.tax = this.tax;

            console.log(jsonData);
        
            // call the checkout method in our ExternalServices module and send it our data object.
            const response = await services.checkout(jsonData).then(convertToJson);

            console.log(response);
            

            // if the response is successful, clear the cart and redirect to success 
            if (response.message === "Order Placed") {
                setLocalStorage([], this.key);
                window.location.href = "success.html";

                // console.log("working order");
            } else {
                removeAllAlerts();
                alertMessage("There was an error processing your order. Please try again later.");
            }

        } catch (err) {
            console.log("Help, something's broken!");
            console.error(err);
            removeAllAlerts();
            alertMessage("There was an error processing your order. Please try again later.");
        }
    }
}