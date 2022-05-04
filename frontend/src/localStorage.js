export const  getcartItem = () => {
    const cartItem = localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [];
    return cartItem;
};
export const setcartItem = (cartItem) => {
     localStorage.setItem('cartItem', JSON.stringify(cartItem)); 
};

export const setUserInfo = ({
    _id = "",
    name = "",
    email = "",
    password = "",
    token = "",
    isAdmin = false,


}) => {
    localStorage.setItem('userInfo', JSON.stringify({
        _id,
        name,
        email,
        password,
        token,
        isAdmin,
    }));
};
export const clearUser = () => {
    localStorage.removeItem('userInfo');
};

export const getUserInfo = () => {
    return localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : {name: '',email: '', password: ''};
}

export const getShipping = () => {
    const shipping = localStorage.getItem("shipping")?
    JSON.parse(localStorage.getItem("shipping")):
    {
        address: "",
        city: "",
        postalcode: "",
        country: "",

        };
    return shipping;
}

export const setShipping = ({
    address = "",
    city = "",
    postalcode = "",
    country = "",
}) => {
    localStorage.setItem('shipping', JSON.stringify({address, city, postalcode, country}));
}

export const getPayment = () => {
    const payment = localStorage.getItem("payment")?
    JSON.parse(localStorage.getItem("payment")):
    {
        paymentMethod : "paypal", 

        };
    return payment;
}

export const setPayment = ({
    paymentMethod = "paypal",
}) => {
    localStorage.setItem('payment', JSON.stringify({paymentMethod}));
}

export const cleanCart = () => {
    localStorage.removeItem('cartItems');
  };
  