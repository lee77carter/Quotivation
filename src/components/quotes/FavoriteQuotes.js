import React from "react";
import FavoriteQuoteCard from "./FavoriteQuoteCard";

function FavoriteQuotes({ favoriteQuotes, maxFaves, removeFromFavorites }) {
  const remainingFavoriteAmount = maxFaves - favoriteQuotes.length;
  return (
    <section className='favorite-quotes'>
      <div className='wrapper quotes'>
        <h3>Top 3 favorite quotes</h3>
        {favoriteQuotes.length > 0 && (
          <ul>
            {favoriteQuotes.map((quote, index) => (
              <FavoriteQuoteCard
                key={quote.id}
                listPosition={index + 1}
                quote={quote}
                removeFromFavorites={removeFromFavorites}
              />
            ))}
          </ul>
        )}
        {favoriteQuotes.length < maxFaves && (
          <div className='favorite-quotes-description'>
            <p>
              You can add {remainingFavoriteAmount} more {remainingFavoriteAmount === 1 ? "quote" : "quotes"} to your top three
              favorites by selecting from the options below.
              <br />
              Once you choose, they will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FavoriteQuotes;