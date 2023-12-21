import React from "react";
import { Heart } from "react-feather";

function QuoteCard({ quote, addToFavorites }) {
  return (
    <article className={"quote-card"}>
      <div>
        <p className='categories'>
          {quote.categories.map((category) => (
            <span className='category' key={category}>
              {category}
            </span>
          ))}
        </p>
        <h3>{quote.text}</h3>
      </div>
      <footer>
        <p className='author'>{quote.author}</p>
        <p className='add-favorite' onClick={() => addToFavorites(quote.id)}>
          <Heart />
        </p>
      </footer>
    </article>
  );
}

export default QuoteCard;