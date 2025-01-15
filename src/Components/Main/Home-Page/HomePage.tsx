import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

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

interface SearchResult {
  score: number;
  show: Show;
}

interface SearchHistory {
  query: string;
  timestamp: number;
}

function HomePage() {
  let navigate = useNavigate();
  let [items, setItems] = useState<SearchResult[]>([]);
  let [loading, setLoading] = useState(false);
  let [hasSearched, setHasSearched] = useState(false);
  let [filterType, setFilterType] = useState("");
  let [filterValue, setFilterValue] = useState("");
  let [favorites, setFavorites] = useState<Show[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(10);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function search(theSearchWord: any) {
    setHasSearched(true);
    setLoading(true);
    let theItem = theSearchWord.searchWord;

    const newHistory = [
      { query: theItem, timestamp: Date.now() },
      ...searchHistory
    ].slice(0, 5);
    
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    try {
      let response = await axios.get(
        `http://localhost:4000/api/shows/search?q=${theItem}&page=${currentPage}&limit=${itemsPerPage}`
      );
      setItems(response.data.results);
      setTotalPages(response.data.pagination.totalPages);
      setLoading(false);
    } catch (err: any) {
      alert("Error fetching data from the server. Please try again later.");
      setLoading(false);
    }
  }

  function searchEpisodes(showName: string) {
    navigate(`/episodes/${showName}`);
  }

  const handleFilter = async () => {
    if (!filterType || !filterValue) return;

    const filteredItems = await Promise.resolve(
      items.filter((item) => {
        switch (filterType) {
          case "genre":
            const searchGenres = filterValue
              .toLowerCase()
              .split(/[,\s]+/)
              .filter((g) => g);
            return searchGenres.some((searchGenre) =>
              item.show.genres.some((genre) =>
                genre.toLowerCase().includes(searchGenre)
              )
            );
          case "rating":
            const minRating = parseFloat(filterValue);
            return item.show.rating?.average >= minRating;
          case "language":
            return item.show.language
              ?.toLowerCase()
              .includes(filterValue.toLowerCase());
          default:
            return true;
        }
      })
    );
    setItems(filteredItems);
  };

  const handleHistoryItemClick = (query: string) => {
    search({ searchWord: query });
  };

  async function addToFavorites(result: SearchResult) {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.id === result.show.id
    );

    let updatedFavorites = isAlreadyFavorite
      ? favorites.filter((fav) => fav.id !== result.show.id)
      : [...favorites, result.show];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    search({ searchWord: items[0]?.show.name || "" });
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedHistory = localStorage.getItem('searchHistory');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
  }, []);

  return (
    <div className="search-container">
      <div className="search-form-container">
        <h2>Type T.V show you would like to search: </h2>
        <form onSubmit={handleSubmit(search)}>
          <input
            className="search-input"
            {...register("searchWord", {
              required: true,
            })}
            placeholder="T.V-show"
          />
          {errors.searchWord?.type === "required" && (
            <span className="error-message">This field is required!</span>
          )}
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <div className="main-content">
        <div className="shows-container">
          {loading && <p className="loading">Loading...</p>}

          {!loading && hasSearched && items.length === 0 && (
            <p className="no-results">No matching shows or movies found for your search.</p>
          )}

          {!loading && items.length > 0 && (
            <div>
              <div className="shows-grid">
                {items.map((result: SearchResult) => (
                  <div key={result.show.id} className="show-card">
                    {result.show.image?.medium && (
                      <img src={result.show.image.medium} alt={result.show.name} />
                    )}
                    <div className="show-info">
                      <div className="show-title">
                        <h3>{result.show.name}</h3>
                        <span 
                          onClick={() => addToFavorites(result)}
                          className="favorite-button"
                        >
                          {favorites.some((fav) => fav.id === result.show.id)
                            ? "❤️"
                            : "🤍"}
                        </span>
                      </div>
                      <div className="show-details">
                        <p>Genres: {result.show.genres.join(", ")}</p>
                        <p>Language: {result.show.language}</p>
                        {result.show.rating?.average && (
                          <p>Rating: {result.show.rating.average}</p>
                        )}
                      </div>
                      <button 
                        className="show-episodes"
                        onClick={() => searchEpisodes(result.show.name)}
                      >
                        Show Episodes
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={currentPage === pageNum ? 'active' : ''}
                  >
                    {pageNum}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="sidebar">
          <div className="filter-section">
            <h3>Filter By:</h3>
            <select
              onChange={(e) => setFilterType(e.target.value)}
              value={filterType}
            >
              <option value="">Select Filter</option>
              <option value="genre">Genre</option>
              <option value="rating">Rating</option>
              <option value="language">Language</option>
            </select>

            {filterType && (
              <div className="filter-input">
                <input
                  type="text"
                  placeholder={`Enter ${filterType}...`}
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
                <button onClick={handleFilter}>Search</button>
              </div>
            )}
          </div>

          {searchHistory.length > 0 && (
            <div className="search-history">
              <h4>Recent Searches:</h4>
              <div className="history-items">
                {searchHistory.map((item) => (
                  <p 
                    key={item.timestamp}
                    onClick={() => handleHistoryItemClick(item.query)}
                  >
                    {item.query}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;