import { NavLink } from "react-router-dom";
import "./NavLinks.css";
function NavLinks(){
     return(
        <nav>
             <NavLink to="homePage"> Home 🏠 </NavLink>
             <NavLink to="favorites"> Favorites ❤️ </NavLink>
             <NavLink to="about"> About ℹ️</NavLink>
             <NavLink to="contact"> Contact ☎️</NavLink>
        </nav>
     )
} 
export default NavLinks;