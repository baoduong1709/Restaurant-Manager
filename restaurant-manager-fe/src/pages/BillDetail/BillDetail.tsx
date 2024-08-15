import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./BillDetail.css";
import { host, port } from "../../config/config";
import { calculateTotalAmount, calculateTotalQuantity } from "../../utils/count";

export interface Food {
  food: {
    _id: string;
    foodName: string;
    price: number;
    category: string;
    status: string;
  };
  quantity: number;
}

interface Table {
  _id: string;
  no: number;
  status: boolean;
}

interface BillDetailResponse {
  data: {
    _id: string;
    foods: Food[];
    table: Table;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

const BillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [billDetail, setBillDetail] = useState<
    BillDetailResponse["data"] | null
  >(null);

  useEffect(() => {
    const fetchBillDetail = async () => {
      try {
        const response = await axios.get<BillDetailResponse>(
          `http://${host}:${port}/bill/${id}`
        );
        setBillDetail(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết hóa đơn:", error);
      }
    };

    fetchBillDetail();
  }, [id]);

  const handlePayment = async () => {
    try {
      const response = await axios.post(`http://${host}:${port}/bill/${id}/pay`);
      if (response.data.success) {
        localStorage.removeItem("tableId");
        localStorage.removeItem("billId");
        alert("Thanh toán thành công");
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
    }
  };

  const handleOrderMore = () => {
    // Điều hướng người dùng trở lại trang chọn món ăn
    navigate("/menu");
  };

  if (!billDetail) return <p>Đang tải dữ liệu...</p>;

  const totalQuantity = calculateTotalQuantity(billDetail.foods);
  const totalAmount = calculateTotalAmount(billDetail.foods);

  return (
    <div className='container'>
      <h2>Chi tiết hóa đơn</h2>
      <div className='bill-detail'>
        <h3>Thông tin hóa đơn</h3>
        <p>
          <strong>Bàn số:</strong> {billDetail.table.no}
        </p>
        <p>
          <strong>Tình trạng:</strong> {billDetail.status}
        </p>
        <p>
          <strong>Tổng số lượng:</strong> {totalQuantity} món
        </p>
        <p>
          <strong>Tổng số tiền:</strong> {totalAmount} VND
        </p>
        <h4>Danh sách món ăn</h4>
        <table>
          <thead>
            <tr>
              <th>Tên món ăn</th>
              <th>Đơn giá</th>
              <th>SL</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {billDetail.foods.map((food) => (
              <tr key={food.food._id}>
                <td>{food.food.foodName}</td>
                <td>{food.food.price}</td>
                <td>{food.quantity}</td>
                <td>{food.quantity * food.food.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='actions'>
          <button onClick={handleOrderMore} className='order-more-btn'>
            Gọi thêm món
          </button>
          <button onClick={handlePayment} className='pay-btn'>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillDetail;
