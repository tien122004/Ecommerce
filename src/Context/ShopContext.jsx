import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [product, setProdct] = useState([])
    const logged = JSON.parse(localStorage.getItem('login'))

    // Hàm lưu giỏ hàng vào localStorage theo userId
    const saveCartToLocalStorage = (cartData) => {
        if (userId) {
            localStorage.setItem(`cart_${userId}`, JSON.stringify(cartData));
        }
    };

    // Tải dữ liệu giỏ hàng từ localStorage
    useEffect(() => {
        if (userId) {
            const savedCart = localStorage.getItem(`cart_${userId}`);
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        }
    }, [userId]);

    const addToCart = async (itemId, size) => {
        if (logged === false) {
            toast('Please Login')
        } else {
            if (!size) {
                toast.error('Select Product Size');
                return;
            }

            let newCartItems = { ...cartItems };

            if (!newCartItems[itemId]) {
                newCartItems[itemId] = {};
            }

            if (newCartItems[itemId][size]) {
                newCartItems[itemId][size] += 1;
            } else {
                newCartItems[itemId][size] = 1;
            }

            setCartItems(newCartItems);
            saveCartToLocalStorage(newCartItems);
            toast.success('Added to cart!');
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        if (quantity === 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }

        setCartItems(cartData);
        saveCartToLocalStorage(cartData); // Lưu vào localStorage khi cập nhật số lượng
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
