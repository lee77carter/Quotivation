import React from "react";
import QuoteCard from "./QuoteCard";
import CategoryForm from "./CategoryForm";

function Quotes({ filteredQuotes, addToFavorites, category, favoriteQuotes, categories, handleCategoryChange }) {
  return (
    <section className='all-quotes'>
      <div className='quotes wrapper'>
        <div className='category-header'>
          <h2>Pick Your Favorite Quotes Below</h2>
          <p>
            You have {filteredQuotes.length > 0 && "a collection of"} {filteredQuotes.length} great{" "}
            {category !== "All" && category} {filteredQuotes.length === 1 ? "quote" : "quotes"}.
          </p>
          <CategoryForm categories={categories} category={category} handleCategoryChange={handleCategoryChange} />
        </div>

        {filteredQuotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} addToFavorites={addToFavorites} favoriteQuotes={favoriteQuotes} />
        ))}
      </div>
    </section>
  );
}

export default Quotes;