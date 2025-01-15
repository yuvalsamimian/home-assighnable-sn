import { useState, useEffect } from "react";
import NavLinks from "../Header/NavLinks/NavLinks";
import Routing from "../Routing/Routing";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); 
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);
    
    return (
        <div>
            <header>
                <NavLinks/>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </header>
            <main>
                <Routing/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default Layout;