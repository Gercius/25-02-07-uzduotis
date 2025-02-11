import "./app.scss";
import { Search } from "../search/search";
import { useEffect, useState } from "react";
import { Joke } from "../joke/joke";

export const App = () => {
    const [searchedCategory, setSearchedCategory] = useState("");
    const [joke, setJoke] = useState("");
    const [isRandomJoke, setIsRandomJoke] = useState(false);
    const [jokeError, setJokeError] = useState(false);

    const handleSearch = (category) => {
        setSearchedCategory(category);
    };

    // get joke
    useEffect(() => {
        const getJoke = async () => {
            setJokeError(false);
            if (searchedCategory || isRandomJoke) {
                try {
                    let response;

                    if (searchedCategory) {
                        response = await fetch(`https://api.chucknorris.io/jokes/random?category=${searchedCategory}`);
                    } else if (isRandomJoke) {
                        response = await fetch("https://api.chucknorris.io/jokes/random");
                    }

                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }

                    const data = await response.json();

                    setJoke(data.value);
                    setSearchedCategory("");
                    setIsRandomJoke(false);
                } catch (error) {
                    console.error(error);
                    setJoke("");
                    setJokeError(true);
                }
            }
        };
        getJoke();
    }, [searchedCategory, isRandomJoke]);

    return (
        <main>
            <Search onSearch={handleSearch} />
            <button className="getRandomJoke" onClick={() => setIsRandomJoke(true)}>
                Gauti atsitiktinį juokelį
            </button>
            <Joke joke={joke} />
            {jokeError && <p className="error">Juokelis nerastas!</p>}
        </main>
    );
};
