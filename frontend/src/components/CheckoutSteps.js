const CheckoutSteps = {
    render: (props) => {
        return`
        <div class="checkout-steps">
        <div class="${props.step1 ? "active" : ""}">signin</div>
        <div class="${props.step2 ? "active" : ""}">shipping</div>
        <div class="${props.step3 ? "active" : ""}">payment</div>
        <div class="${props.step4 ? "active" : ""}">place order</div>
        </div>  
        `;
    }   
};

export default CheckoutSteps;