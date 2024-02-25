// Import necessary React hooks and components
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Loader } from "react-feather";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
import Quotes from "./components/quotes/Quotes";
import Message from "./components/Message";
import "./App.css";

// Main App component definition
function App() {
  // State variables using useState hook
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [favoriteQuotes, setFavoriteQuotes] = useState(JSON.parse(window.localStorage.getItem("favoriteQuotes")) || []);
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
  const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];

  const maxFaves = 3;

  // Function to fetch quotes data from an external API
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(quotesUrl);
      const results = await response.json();
      setQuotes(results);
    } catch (error) {
      console.log("There was an error", error);
    }
    setLoading(false);
  };

  // useEffect hook to fetch quotes data on component mount
  useEffect(() => {
    fetchQuotes();
  }, []);

  // useEffect hook to save favoriteQuotes data to local storage when it changes
  useEffect(() => {
    window.localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
  }, [favoriteQuotes]);

  // Filter quotes based on selected category
  const filteredQuotes = category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;

  // Event handler for changing the selected category
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Function to add a quote to favorites
  const addToFavorites = (quoteId) => {
    const selectedQuote = quotes.find((quote) => quote.id === quoteId);
    const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id);

    if (alreadyFavorite) {
      removeFromFavorites(quoteId);
    } else {
      if (favoriteQuotes.length < maxFaves) {
        setMessageText("Added to Favorites!");
        setShowMessage(true);
        setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
      } else {
        setMessageText("Max number of favorite quotes reached. Remove one to add another.");
        setShowMessage(true);
      }
    }
  };

  // Function to remove a quote from favorites
  const removeFromFavorites = (quoteId) => {
    const updatedFavorites = favoriteQuotes.filter((quote) => quote.id !== quoteId);
    setFavoriteQuotes(updatedFavorites);
  };

  // Function to remove the message displayed to the user
  const removeMessage = () => {
    setShowMessage(false);
  };

  // JSX structure for rendering the App component
  return (
    <div className='App'>
      {showMessage && <Message messageText={messageText} removeMessage={removeMessage} />}
      <Header />
      <main>
        {/* Render the FavoriteQuotes component */}
        <FavoriteQuotes favoriteQuotes={favoriteQuotes} maxFaves={maxFaves} removeFromFavorites={removeFromFavorites} />

        {/* Conditionally render loader or Quotes component based on loading state */}
        {loading ? (
          <Loader />
        ) : (
          <Quotes
            filteredQuotes={filteredQuotes}
            addToFavorites={addToFavorites}
            favoriteQuotes={favoriteQuotes}
            category={category}
            categories={categories}
            handleCategoryChange={handleCategoryChange}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

// Export the App component as the default export
export default App;