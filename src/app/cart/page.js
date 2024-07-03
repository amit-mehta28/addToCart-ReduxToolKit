"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../store/features/CartSlice';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Cart items on mount:', cartItems);
    }, []);

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart({ id }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id} className="mb-4 p-4 border rounded-lg">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-sm text-gray-600">{item.description}</p>
                                <p className="text-lg font-bold">Price: ${item.price}</p>
                                <p className="text-lg font-bold">Quantity: {item.quantity}</p>
                                <button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Remove from Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleClearCart}
                        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                        Clear Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
