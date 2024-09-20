import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../Components/Title';
import ProductItem from '../Components/ProductItem';

const Collection = () => {
    // Accessing the products from the shopContext
    const { products, search, showSearch } = useContext(ShopContext);

    // State to toggle the filter dropdown visibility
    const [showFilter, setShowFilter] = useState(false);

    // State to hold filtered products
    const [filterProduct, setFilterProduct] = useState([]);

    // State to hold selected categories and subcategories
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    //State to hold sorting the categories according to prices low and high
    const [sortType, setSortType] = useState("relavent");

    // Toggle category checkboxes - add or remove categories from state
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    // Toggle subcategory checkboxes - add or remove subcategories from state
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {

        let productCopy = products.slice();

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category));
        }
        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
        }
        setFilterProduct(productCopy)
    }

    //executing the applyFilter function whenever changes
    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch])

    //sorting the products according to the prices of the categories
    const sortProducts = () => {

        let filteredProductsCopy = filterProduct.slice();

        switch (sortType) {
            case "low-high":
                setFilterProduct(filteredProductsCopy.sort((a, b) => (a.price - b.price)))
                break;

            case "high-low":
                setFilterProduct(filteredProductsCopy.sort((a, b) => (b.price - a.price)))
                break;

            default:
                applyFilter();
                break;
        }

    }
    //executing the sorting of categories function whenever changes
    useEffect(() => {
        sortProducts();
    }, [sortType])

    return (
        <div className="pt-10 border-t">
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Filter Options */}
                <div className="w-full sm:w-1/4">
                    {/* Filter Header with toggle functionality for smaller screens */}
                    <p
                        className="my-2 text-xl font-semibold flex items-center cursor-pointer"
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        FILTERS
                        <img
                            src={assets.dropdown_icon}
                            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
                            alt=""
                        />
                    </p>

                    {/* Filter Content: Display categories and subcategories */}
                    <div className={`transition-all ${showFilter ? 'block' : 'hidden'} sm:block`}>
                        {/* Category Filter */}
                        <div className="border border-gray-300 rounded-lg p-4 my-4">
                            <p className="mb-3 text-sm font-medium px-1">CATEGORY</p>
                            <div className="flex flex-col gap-2 text-md font-light text-gray-700">
                                {/* Map through predefined categories */}
                                <p className="flex items-center gap-2">
                                    <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
                                </p>
                                <p className="flex items-center gap-2">
                                    <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
                                </p>
                                <p className="flex items-center gap-2">
                                    <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
                                </p>
                            </div>
                        </div>

                        {/* Subcategory Filter */}
                        <div className="border border-gray-300 rounded-lg p-4">
                            <p className="mb-3 text-sm font-medium px-1">TYPE</p>
                            <div className="flex flex-col gap-2 text-md font-light text-gray-700">
                                {/* Map through predefined subcategories */}
                                <p className="flex items-center gap-2">
                                    <input className="w-3" type="checkbox" value={'Topwear'}
                                        onChange={toggleSubCategory} /> Shortsleeve
                                </p>
                                <p className="flex items-center gap-2">
                                    <input className="w-3" type="checkbox" value={'Bottomwear'}
                                        onChange={toggleSubCategory} /> Tanktop
                                </p>
                                <p className="flex items-center gap-2">
                                    <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="flex-1">
                    {/* Title and Sorting Dropdown */}
                    <div className="flex justify-between text-base sm:text-2xl mb-4">
                        <Title text1="ALL" text2="COLLECTIONS" />
                        {/* Sort Dropdown */}
                        <select onChange={(e) => setSortType(e.target.value)} className="border border-gray-300 text-sm px-2">
                            <option value="relevant">Sort by: Relevant</option>
                            <option value="high-low">Sort by: High to Low</option>
                            <option value="low-high">Sort by: Low to High</option>
                        </select>
                    </div>

                    {/* Display Products - Mapped from filteredProduct */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                        {filterProduct.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collection;
