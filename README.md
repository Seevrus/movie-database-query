# Query The Movie database (TMDB)

This is a simple application that allows you to search for movies in **The Movie Database (TMDB)**. In order to use it, please create a `.env` file in order to add the following custom environment variable to your project:

`REACT_APP_API_TOKEN=insert_your_token_here`

For the sake of demonstration, API calls for configuration and movies are delayed by 2000 milliseconds. You can change this value directly in the function `jsonFetch` in `src/model/utils.ts`.
