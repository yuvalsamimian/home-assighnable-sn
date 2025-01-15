import "./About.css";

function About() {
    return (
        <div className="about-container">
            <h1>About TV Shows Explorer</h1>
            
            <section>
                <h2>Welcome to our Platform</h2>
                <p>
                    TV Shows Explorer is your ultimate destination for discovering and tracking your favorite television shows. Our platform provides comprehensive information about thousands of TV shows, including ratings, genres, episodes, and more.
                </p>
            </section>
 
            <section>
                <h2>Key Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Search</h3>
                        <p>Search through our extensive database of TV shows. Get detailed information about any show instantly.</p>
                    </div>
 
                    <div className="feature-card">
                        <h3>Favorites</h3>
                        <p>Save your favorite shows to your personal collection. Never lose track of the shows you love.</p>
                    </div>
 
                    <div className="feature-card">
                        <h3>Episodes Guide</h3>
                        <p>Access comprehensive episode listings for every show. Keep track of what you've watched.</p>
                    </div>
 
                    <div className="feature-card">
                        <h3>Filtering</h3>
                        <p>Filter shows by genre, rating, or language to find exactly what you're looking for.</p>
                    </div>
                </div>
            </section>
 
            <section>
                <h2>About the Developer</h2>
                <p>TV Shows Explorer was developed as a personal project to help TV enthusiasts discover and track their favorite shows. We're constantly working to improve the platform and add new features.</p>
            </section>
 
            <section>
                <h2>Data Source</h2>
                <p>All TV show data is provided by the TVMaze API, ensuring up-to-date and accurate information about your favorite shows.</p>
            </section>
 
            <section>
                <h2>Contact Us</h2>
                <p>Have suggestions or found a bug? Visit our contact page to get in touch with us. We're always looking to improve and provide the best possible experience for our users.</p>
            </section>
        </div>
    );
}
 
 export default About;
