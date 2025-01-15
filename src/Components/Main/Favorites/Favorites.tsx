import { useState, useEffect } from "react";
import "./Favorites.css";

interface Show {
    id: number;
    name: string;
    genres: string[];
    rating: {
      average: number;
    };
    image: {
      medium: string;
    };
    language: string;
}

function Favorites() {
    const [favorites, setFavorites] = useState<Show[]>([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const removeFromFavorites = (showId: number) => {
        const updatedFavorites = favorites.filter(show => show.id !== showId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites-container">
            <h2>My Favorite Shows</h2>
            
            {favorites.length === 0 ? (
                <p className="no-favorites">You don't have any favorite shows yet.</p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map(show => (
                        <div key={show.id} className="favorite-card">
                            {show.image?.medium && (
                                <img src={show.image.medium} alt={show.name} />
                            )}
                            <div className="favorite-info">
                                <div className="favorite-title">
                                    <h3>{show.name}</h3>
                                    <span 
                                        className="remove-button"
                                        onClick={() => removeFromFavorites(show.id)}
                                    >
                                        ❌
                                    </span>
                                </div>
                                <p>Genres: {show.genres.join(", ")}</p>
                                <p>Language: {show.language}</p>
                                {show.rating?.average && (
                                    <p>Rating: {show.rating.average}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;