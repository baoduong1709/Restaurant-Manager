import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { host, port } from "../../config/config";
import { useNavigate } from "react-router-dom";
import "./TableManagement.css";
import {
  calculateTotalAmount,
  calculateTotalQuantity,
} from "../../utils/count";
import Navbar from "../../components/Navbar/Navbar";

interface Table {
  _id: string;
  no: string;
  status: string;
  billId: string | null;
}

interface Bill {
  _id: string;
  foods: CartItem[];
  table: Table;
  status: string;
}

interface CartItem {
  food: Food;
  quantity: number;
}

interface Food {
  _id: string;
  foodName: string;
  price: number;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

const TableManagement: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [bill, setBill] = useState<Bill | null>(null);
  const [isBillModalOpen, setIsBillModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get<{ data: Table[] }>(
          `http://${host}:${port}/table`
        );
        setTables(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error);
      }
    };
    fetchTables();
  }, []);

  const handleTableClick = async (table: Table) => {
    setSelectedTable(table);
    setBill(null);
    if (table.billId) {
      try {
        const response = await axios.get<{ data: Bill }>(
          `http://${host}:${port}/bill/${table.billId}`
        );
        setBill(response.data.data);
        setIsBillModalOpen(true); // Mở modal khi có hóa đơn
      } catch (error) {
        console.error("Lỗi khi lấy hóa đơn từ server:", error);
        setBill(null);
      }
    } else {
      setIsBillModalOpen(true); // Mở modal ngay cả khi không có hóa đơn
    }
  };

  const closeModal = () => {
    setIsBillModalOpen(false);
    setSelectedTable(null);
    setBill(null);
  };

  const totalQuantity = bill ? calculateTotalQuantity(bill.foods) : 0;
  const totalAmount = bill ? calculateTotalAmount(bill.foods) : 0;

  return (
    <div className='table-management'>
      <Navbar />
      <h1>Quản lý Bàn</h1>
      <div className='tables'>
        {tables.map((table) => (
          <div
            key={table._id}
            className={`table ${table.status}`}
            onClick={() => handleTableClick(table)}
          >
            <p>{table.no}</p>
            <p>{table.status}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isBillModalOpen}
        onRequestClose={closeModal}
        contentLabel='Chi tiết hóa đơn'
        className='modal-content'
        overlayClassName='modal-overlay'
      >
        {bill ? (
          <div className='bill-detail'>
            <h3>Thông tin hóa đơn</h3>
            <p>
              <strong>Tình trạng:</strong> {bill.status}
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
                  <th>SL</th>
                </tr>
              </thead>
              <tbody>
                {bill.foods.map((item) => (
                  <tr key={item.food._id}>
                    <td>{item.food.foodName}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Không có hóa đơn cho bàn này.</p>
        )}
        <button onClick={closeModal}>Đóng</button>
      </Modal>
    </div>
  );
};

export default TableManagement;
