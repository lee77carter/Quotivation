import React from "react";

function QuoteCard({ quote }) {
  return (
    <article className='quote-card'>
      <div>
        {/* category text above each card */}
        <p className="categories">
          {quote.categories.map(category => (
            <span className="category" key={category}>{category}</span>
          ))}
        </p>
        <h3>{quote.text}</h3>
      </div>
      <footer>
        <p className='author'>{quote.author}</p>
      </footer>
    </article>
  );
}

export default QuoteCard;