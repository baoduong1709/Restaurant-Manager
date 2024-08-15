import React, { useState } from "react";
import "./FoodModal.css";

interface Food {
  _id?: string;
  foodName: string;
  price: number;
  category: string;
  imageUrl?: string;
}

interface FoodModalProps {
  food: Food | null;
  onClose: () => void;
  onSave: (
    id: string | undefined,
    food: Partial<Food>,
    imageFile?: File
  ) => void;
}

const FoodModal: React.FC<FoodModalProps> = ({ food, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Food>>(food || {});
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSave(food?._id, formData, imageFile || undefined);
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>{food ? "Chỉnh sửa món ăn" : "Thêm món ăn mới"}</h2>
        <input
          type='text'
          name='foodName'
          placeholder='Tên món ăn'
          value={formData.foodName || ""}
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          placeholder='Giá'
          value={formData.price || ""}
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          placeholder='Danh mục'
          value={formData.category || ""}
          onChange={handleChange}
        />
        <input
          type='file'
          name='image'
          placeholder='Chọn hình ảnh'
          onChange={handleFileChange}
        />
        <button onClick={handleSubmit}>
          {food ? "Lưu thay đổi" : "Thêm món ăn"}
        </button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};

export default FoodModal;
