import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    return (
        <div className='border-t pt-14'>
            <div className="text-2xl mb-3">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div>
                {
                    cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);

                        return (

                            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col 
                                            md:flex-row md:items-center md:justify-between gap-4'>
                                <div className='flex items-start gap-6 text-sm'>
                                    <img src={productData.image[0]} className="w-16 sm:w-20" />
                                    <div className='sm:text-base font-medium'>
                                        <p>{productData.name}</p>
                                        <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                                            <p>{currency}{item.price}</p>
                                            <p>Quantity: 1</p>
                                            <p>Size: M</p>
                                        </div>
                                        <p>Date:
                                            <span className='text-gray-400'> Thu Aug 29 2024</span>
                                        </p>
                                        <p>Payment:
                                            <span className='text-gray-400'> COD</span>
                                        </p>
                                    </div>
                                </div>

                                <div className='md:w-1/2 flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                        <p className="text-sm md:text-base">Order Placed</p>
                                    </div>
                                    <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>


        </div>
    );
};

export default Cart;
