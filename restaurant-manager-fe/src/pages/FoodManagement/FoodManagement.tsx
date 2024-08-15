import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { host, port } from "../../config/config";
import "./FoodManagement.css";
import FoodModal from "../../components/FoodModal/FoodModal";
import Navbar from "../../components/Navbar/Navbar";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

interface Food {
  _id: string;
  foodName: string;
  price: number;
  category: string;
  imageUrl: string;
}

const FoodManagement: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleSaveFood = async (
    id: string | undefined,
    food: Partial<Food>,
    imageFile?: File
  ) => {
    const formData = new FormData();
    formData.append("foodName", food.foodName || "");
    formData.append("price", String(food.price || ""));
    formData.append("category", food.category || "");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      let response: AxiosResponse<any, any>;
      if (id) {
        response = await axios.put(
          `http://${host}:${port}/food/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFoods(foods.map((f) => (f._id === id ? response.data.data : f)));
      } else {
        response = await axios.post(`http://${host}:${port}/food`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFoods([...foods, response.data.data]);
      }
    } catch (error) {
      console.error("Lỗi khi lưu món ăn:", error);
    }
    setIsModalOpen(false);
  };

  const handleDeleteFood = async (id: string) => {
    try {
      await axios.delete(`http://${host}:${port}/foods/${id}`);
      setFoods(foods.filter((food) => food._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa món ăn:", error);
    }
  };

  return (
    <div className='food-management'>
      <Navbar />
      <h1>Quản lý Món ăn</h1>
      <button
        onClick={() => {
          setSelectedFood(null);
          setIsModalOpen(true);
        }}
      >
        Thêm món ăn
      </button>
      <div className='food-list'>
        <table>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              {/* <th>Tên món ăn</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Trạng thái</th>
              <th>Hành động</th> */}
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td>
                  <img src={food.imageUrl} alt={food.foodName} className="food-image"/>{" "}
                </td>
                <td>{food.foodName}</td>
                <td>{food.price}</td>
                <td>{food.category}</td>
                <td></td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedFood(food);
                      setIsModalOpen(true);
                    }}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button onClick={() => handleDeleteFood(food._id)}>
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <FoodModal
          food={selectedFood}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFood}
        />
      )}
    </div>
  );
};

export default FoodManagement;
