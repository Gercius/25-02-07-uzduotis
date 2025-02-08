import { useEffect, useState } from "react";
import { CategoryOption } from "./category-option";

export const Search = ({ onSearch }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleForm = (e) => {
        e.preventDefault();
        onSearch(selectedCategory);
        setSelectedCategory("");
    };

    // get categories
    useEffect(() => {
        if (!categories.length) {
            fetch("https://api.chucknorris.io/jokes/categories")
                .then((response) => response.json())
                .then((data) => setCategories(data));
        }
    }, [categories]);

    return (
        <div className="searchBar">
            <form onSubmit={handleForm}>
                <label>Pasirinkite kategoriją</label>
                <input
                    list="categories"
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <datalist id="categories">
                    {categories?.map((category, index) => (
                        <CategoryOption key={index} value={category} />
                    ))}
                </datalist>
                <button type="submit">Gauti juokelį</button>
            </form>
        </div>
    );
};
