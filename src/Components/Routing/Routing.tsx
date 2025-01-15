import { Route,Routes } from "react-router-dom";
import HomePage from "../Main/Home-Page/HomePage";
import Favorites from "../Main/Favorites/Favorites";
import About from "../Main/About/About";
import Contact from "../Main/Contact/Contact";
import Episodes from "../Main/Episodes/Episodes";

function Routing(){
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/homePage" element={<HomePage/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/episodes/:showName" element={<Episodes/>}/>
        </Routes>
    )
}
export default Routing;