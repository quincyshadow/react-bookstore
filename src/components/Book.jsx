import React from "react";

const styles = {};

function Book({ id, title, author, price, img, addToCart }) {
    const handleCart = () => {
        console.log("clicked" + id);
        addToCart(id);
    };

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    });
    return (
        <div>
            <div className="list-group-item">
                <h3>
                    {title}: {formatter.format(price)}
                </h3>
                <h4>Author: {author}</h4>
                <div>
                    <button onClick={handleCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Book;
