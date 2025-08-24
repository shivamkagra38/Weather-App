import React from "react";
import ReactDOM from "react-dom/client";
import SearchBar from "./Components/SearchBar";

const rootElement = ReactDOM.createRoot(document.getElementById("root"));

const Body = () => {

    return (
        <div className="body-container">
            <SearchBar />
        </div>
    );
}

rootElement.render(<Body />);