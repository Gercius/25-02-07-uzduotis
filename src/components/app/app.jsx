import "./app.scss";
import { Search } from "../search/search";
import { useEffect, useState } from "react";
import { Joke } from "../joke/joke";

export const App = () => {
    const [searchedCategory, setSearchedCategory] = useState("");
    const [joke, setJoke] = useState("");
    const [randomJoke, setRandomJoke] = useState(false);

    const handleSearch = (category) => {
        setSearchedCategory(category);
    };

    // get joke
    useEffect(() => {
        if (searchedCategory) {
            fetch(`https://api.chucknorris.io/jokes/random?category=${searchedCategory}`)
                .then((response) => response.json())
                .then((data) => setJoke(data.value))
                .then(setSearchedCategory(""));
        } else if (randomJoke) {
            fetch("https://api.chucknorris.io/jokes/random")
                .then((response) => response.json())
                .then((data) => setJoke(data.value))
                .then(setRandomJoke(false));
        }
    }, [searchedCategory, randomJoke]);

    return (
        <main>
            <Search onSearch={handleSearch} />
            <button onClick={() => setRandomJoke(true)}>Gauti atsitiktinį juokelį</button>
            <Joke joke={joke} />
        </main>
    );
};
