const express = require("express");
const cors = require("cors");
const axios = require("axios");

const server = express();
server.use(cors());
server.use(express.json());

// Shows search endpoint with pagination
server.get("/api/shows/search", async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const response = await axios.get(
            `https://api.tvmaze.com/search/shows?q=${searchTerm}`
        );
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalResults = response.data.length;
        
        const paginatedResponse = {
            results: response.data.slice(startIndex, endIndex),
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalResults / limit),
                totalItems: totalResults,
                itemsPerPage: limit,
                hasNextPage: endIndex < totalResults,
                hasPrevPage: page > 1
            }
        };
        
        res.json(paginatedResponse);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching shows from TVMaze API",
            error: error.message 
        });
    }
});

server.get("/api/shows/episodes/:showName", async (req, res) => {
    try {
        const { showName } = req.params;
        const response = await axios.get(
            `https://api.tvmaze.com/singlesearch/shows?q=${showName}&embed=episodes`
        );
        res.json(response.data._embedded.episodes);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching episodes from TVMaze API",
            error: error.message
        });
    }
});

server.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});

server.listen(4000, () => {
    console.log("Listening on 4000");
}).on("error", (err) => {
    console.log(err);
    if (err.code === "EADDRINUSE")
        console.log("Error: Address in use");
    else 
        console.log("Error: Unknown error");
});