import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Episodes.css";

interface Episode {
   name: string;
   number: number;
   image: {
     medium: string;
   } | null;
}

function Episodes() {
   let { showName } = useParams();
   let [episodes, setEpisodes] = useState<Episode[]>([]);
   let [loading, setLoading] = useState(true);

   let getData = async () => {
       try {
           let response = await axios.get(`http://localhost:4000/api/shows/episodes/${showName}`);
           setEpisodes(response.data);
       } catch (err: any) {
           alert("Error fetching episodes from the server. Please try again later.");
       }
       setLoading(false);
   }

   useEffect(() => {
       getData();
   }, []);

   return (
       <div>
           {loading ? (
               <p>Loading...</p>
           ) : episodes.length === 0 ? (
               <p>No episodes available for this show</p>
           ) : (
            <div className="episodes-grid">
            {episodes.map((episode) => (
                <div key={episode.number} className="episode-card">
                    {episode.image && (
                        <img 
                            src={episode.image.medium} 
                            alt={episode.name}
                        />
                    )}
                    <div className="episode-info">
                        <h3>Episode {episode.number}</h3>
                        <p>{episode.name}</p>
                    </div>
                </div>
            ))}
        </div>
           )}
       </div>
   )
}

export default Episodes;