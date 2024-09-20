import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import ProductItem from './ProductItem';
import { ShopContext } from '../Context/ShopContext';


const BestSelleer = () => {
    const { products, category } = useContext(ShopContext);
    const [bestsellers, setBestSellers] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => item.bestseller);
            setBestSellers(bestProduct.slice(0, 5));
        }
    }, [products]);

    return (
        <>
            <div className="py-10">
                <div className="text-center py-8 text-3xl">
                    <Title text1="BEST" text2="SELLERS" />
                    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                        Lorem ipsum dolor sit amet {category}, adipisicing elit. Best seller
                    </p>
                </div>

                {/* Rendering Bestsellers Products */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {bestsellers.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default BestSelleer
