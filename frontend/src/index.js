import HomeScreen from "./srceen/HomeScreen.js";
import ProductScreen from "./srceen/ProductScreen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";
import Error404Screen from "./srceen/Error404Screen.js";
import CartScreen from "./srceen/CartScreen.js";
import SinginScreen from "./srceen/SinginScreen.js";
import Header from "./components/Header.js";
import RegisterScreen from "./srceen/RegisterScreen.js";
import ProfileScreen from "./srceen/ProfileScreen.js";
import ShippingScreen from "./srceen/ShippingScreen.js";
import PaymentScreen from "./srceen/PaymentScreen.js";
import PlaceOrderScreen from "./srceen/PlaceOrderScreen.js";
import OrderScreen from "./srceen/OrderScreen.js";
import DashboardScreen from "./srceen/DashboardScreen.js";

const routes = {
    "/": HomeScreen,
    "/product/:id": ProductScreen,
    "/order/:id": OrderScreen,
    "/cart/:id": CartScreen,
    "/cart": CartScreen,
    "/signin": SinginScreen,
    "/register": RegisterScreen,
    "/profile" : ProfileScreen,
    "/shipping": ShippingScreen,
    "/payment": PaymentScreen,
    "/placeorder": PlaceOrderScreen,
    "/dashboard": DashboardScreen,
};

    

const router = async () => {
    showLoading();
    const request = parseRequestUrl();
    const parseUrl = 
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? '/:id' : '') + 
    (request.verb ? `/${request.verb}` : '');
    const srceen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById("header-container");
    header.innerHTML = await Header.render();
    await Header.after_render(); 
    const main = document.getElementById('main-container');
    main.innerHTML = await srceen.render();
    if (srceen.after_render) await srceen.after_render();
    hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router); 