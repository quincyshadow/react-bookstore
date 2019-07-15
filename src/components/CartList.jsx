import React from "react";
import CartItem from "./CartItem";

function CartList({ cart, removeFromFavorites, total}) {
    let cartList = cart.map(el => {
        return (
            <CartItem
                key={el.id}
                title={el.title}
            />
        );
    });
    return (
        <>
            <div className="col-sm">
                <div className="list-group">
                    <h2>Cart</h2>
                    {cartList}
                </div>
                    <div className="list-group">
                    <h2>Total</h2>
                    {total}
                </div>

            </div>
        </>
    );
}

export default CartList;
