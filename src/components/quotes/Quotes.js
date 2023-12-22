import React from "react";
import QuoteCard from "./QuoteCard";
import CategoryForm from "./CategoryForm";

function Quotes({ filteredQuotes, addToFavorites, category, categories, handleCategoryChange, favoriteQuotes }) {
  return (
    <section className='all-quotes'>
      <div className='quotes wrapper'>
        <div className='category-header'>
          <h2>Pick Your Favorite Quotes Below</h2>
          <p>Browse through your collection of quotes.</p>
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