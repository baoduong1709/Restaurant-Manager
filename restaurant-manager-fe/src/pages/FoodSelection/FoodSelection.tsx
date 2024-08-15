import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./FoodSelection.css";
import { host, port } from "../../config/config";
import { useNavigate } from "react-router-dom";
import {
  calculateTotalAmount,
  calculateTotalQuantity,
} from "../../utils/count";
import { RiAddBoxFill, RiCheckboxIndeterminateLine } from "react-icons/ri";
import unidecode from "unidecode";

interface Food {
  _id: string;
  foodName: string;
  price: number;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  imageUrl: string; // Thêm trường imageUrl để chứa đường dẫn ảnh
}

interface CartItem {
  food: Food;
  quantity: number;
}

const categoryDisplayNames: Record<string, string> = {
  "hot-pot": "Lẩu",
  "fried-foods": "Đồ chiên",
  barbecue: "Đồ nướng",
  drinks: "Đồ uống",
};

const FoodSelection: React.FC = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState<Food[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("hot-pot");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get<{ data: Food[] }>(
          `http://${host}:${port}/food`
        );
        setFoods(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error);
      }
    };
    fetchFoods();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedCategory(""); // Đặt lại category khi tìm kiếm
  };

  const addToCart = (food: Food) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (item) => item.food._id === food._id
      );
      if (itemIndex > -1) {
        return prevCart.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { food, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (foodId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.food._id === foodId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      return updatedCart;
    });
  };

  const getQuantityInCart = (foodId: string) => {
    const item = cart.find((item) => item.food._id === foodId);
    return item ? item.quantity : 0;
  };

  // const removeFromCart = (foodId: string) => {
  //   setCart((prevCart) => prevCart.filter((item) => item.food._id !== foodId));
  // };

  const totalQuantity = calculateTotalQuantity(cart);
  const totalAmount = calculateTotalAmount(cart);

  const sendCartToServer = async () => {
    const tableId = localStorage.getItem("tableId");
    const billId = localStorage.getItem("billId");

    const data = {
      foods: cart.map((item) => ({
        foodId: item.food._id,
        quantity: item.quantity,
      })),
      tableId,
    };

    if (billId) {
      try {
        if (data.foods.length > 0) {
          await axios.put(`http://${host}:${port}/bill/${billId}`, data);
          navigate(`/bill/${billId}`);
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật dữ liệu giỏ hàng:", error);
      }
    } else {
      try {
        const response = await axios.post(`http://${host}:${port}/bill`, data);
        const id = response.data.data._id;
        localStorage.setItem("billId", id);
        navigate(`/bill/${id}`);
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu giỏ hàng:", error);
      }
    }
  };

  const filteredFoods = foods.filter((food) =>
    unidecode(food.foodName)
      .toLowerCase()
      .includes(unidecode(searchTerm).toLowerCase())
  );

  const groupedFoods = filteredFoods.reduce((acc, food) => {
    const category = food.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(food);
    return acc;
  }, {} as Record<string, Food[]>);

  const categories = Array.from(new Set(foods.map((food) => food.category)));

  return (
    <div className='food-selection'>
      <div className='food-list'>
        <div className='header'>
          <input
            type='text'
            placeholder='Tìm kiếm món ăn'
            value={searchTerm}
            onChange={handleSearchChange}
            className='search-input'
          />
          <div className='category-menu'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {categoryDisplayNames[category] || category}
              </button>
            ))}
          </div>
        </div>
        {Object.entries(groupedFoods).map(
          ([category, foods]) =>
            (!selectedCategory || selectedCategory === category) && (
              <div key={category} className='category-section'>
                <ul>
                  {foods.map((food) => (
                    <li key={food._id}>
                      <img
                        src={food.imageUrl}
                        alt={food.foodName}
                        className='food-image'
                      />{" "}
                      {/* Hiển thị ảnh món ăn */}
                      <div className='food-info'>
                        <div className='name'>
                          <p>{food.foodName}</p>
                        </div>
                        <div className='price'>
                          <p>{food.price}đ</p>
                        </div>
                        <button
                          onClick={() => addToCart(food)}
                          className='add-btn'
                        >
                          <RiAddBoxFill />
                        </button>
                        {getQuantityInCart(food._id) > 0 && (
                          <div className='quantity-controls'>
                            <div className='quantity'>
                              {getQuantityInCart(food._id)}
                            </div>
                            <button
                              onClick={() => decreaseQuantity(food._id)}
                              className='remove-btn'
                            >
                              <RiCheckboxIndeterminateLine />
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
      <Modal
        isOpen={isCartOpen}
        onRequestClose={() => setIsCartOpen(false)}
        contentLabel='Giỏ hàng'
        className='modal-content'
        overlayClassName='modal-overlay'
      >
        <div className='modal-header'>
          <div className='cart'>Giỏ hàng</div>
        </div>
        <ul>
          {cart.length > 0 ? (
            cart.map((item) => (
              <li key={item.food._id}>
                <img
                  src={item.food.imageUrl}
                  alt={item.food.foodName}
                  className='food-image'
                />{" "}
                {/* Hiển thị ảnh món ăn */}
                <div className='food-info'>
                  <div className='name'>
                    <p>{item.food.foodName}</p>
                  </div>
                  <div className='price'>
                    <p>{item.food.price}đ</p>
                  </div>
                  <button
                    onClick={() => addToCart(item.food)}
                    className='add-btn'
                  >
                    <RiAddBoxFill />
                  </button>
                  <div className='quantity'>{item.quantity}</div>
                  <button
                    onClick={() => decreaseQuantity(item.food._id)}
                    className='remove-btn'
                  >
                    <RiCheckboxIndeterminateLine />
                  </button>
                  {/* <button onClick={() => removeFromCart(item.food._id)}>
                    Xóa
                  </button> */}
                </div>
              </li>
            ))
          ) : (
            <p>Giỏ hàng trống</p>
          )}
        </ul>
      </Modal>
      <div className='footer'>
        <button onClick={() => setIsCartOpen(!isCartOpen)} className='cart-btn'>
          <p>{totalQuantity} Món</p>
          <p>{totalAmount}đ</p>
        </button>
        <button
          onClick={sendCartToServer}
          disabled={cart.length === 0}
          className='pay-btn'
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default FoodSelection;
