import { getUserInfo } from "../localStorage";

const Header =  { 
    render: () => {
        const { name,isAdmin } = getUserInfo();
        return`<div class="brand">
                <a href="/#/">Zometo</a>
            </div>
            <div>
            ${
                name
                  ? `<a href="/#/profile">${name}</a>`
                  : `<a href="/#/signin">Sign-In</a>`
              }    
                <a href="/#/cart">Cart</a>
                ${isAdmin ? `<a href="/#/dashbord">Dashbord</a>` : ""}
            </div>`; 

    },
    after_render: () => {}
};


export default Header;