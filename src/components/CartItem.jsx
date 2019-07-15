import React from 'react'

function CartItem({ id, title }) {
    return (
        <>
            <h5>{title}</h5>
            <div>
            	{/* onClick=removeFromFavorites */}
                {/* <button>Remove</button> */}
                <hr></hr>
            </div>
        </>
    )
}

export default CartItem