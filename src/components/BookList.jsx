import React from "react";
import Book from "./Book";
import SearchTitle from './SearchTitle'
// import SearchStocks from './SearchStocks'

function BookList({ books, addToCart, changeSearch }) {
    return (
        <>
                    {/* <SearchBooks changeSearch={changeSearch} /> */}
                    <div className="col-sm">
                        <SearchTitle changeSearch={changeSearch}/>
                        <div className="list-group">
                        {books.map(book => {
                            return (
                                <Book
                                    key={book.id}
                                    {...book}
                                    addToCart={addToCart}
                                />
                            );
                        })}
                    </div>
                    </div>
        </>
    );
}

export default BookList;
