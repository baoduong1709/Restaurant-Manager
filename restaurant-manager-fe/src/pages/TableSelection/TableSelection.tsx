import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { host, port } from "../../config/config";
import "./TableSelection.css";

export interface Table {
  _id: string;
  no: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const TableSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  console.log(`http://${host}:${port}/table`);
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get<{ data: Table[] }>(
          `http://${host}:${port}/table`
        );
        console.log(`http://${host}:${port}/table`);
        console.log(response.data.data);
        setTables(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error);
      }
    };
    fetchTables();
  }, []);

  const handleTableSelect = (table: Table) => {
    if (table.status) {
    } else {
      setSelectedTable(table);
      localStorage.setItem("tableId", table._id);
    }
  };

  const handleNextClick = () => {
    if (selectedTable) {
      navigate(`/menu`);
    } else {
      alert("Vui lòng chọn bàn trước khi tiếp tục.");
    }
  };
  const numRows = Math.ceil(tables.length / 2);

  const renderTables = () => {
    const tableRows = [];
    for (let i = 0; i < numRows; i++) {
      const rowStart = i * 2;
      const rowEnd = rowStart + 2;
      const rowTables = tables.slice(rowStart, rowEnd);

      tableRows.push(
        <div className='table-row' key={i}>
          {rowTables.map((table) => (
            <div
              key={table._id}
              className={`table-item ${
                selectedTable?._id === table._id ? "selected" : ""
              }`}
            >
              <button
                onClick={() => handleTableSelect(table)}
                disabled={table.status}
              >
                {`Bàn số ${table.no}`}
              </button>
            </div>
          ))}
        </div>
      );
    }
    return tableRows;
  };

  return (
    <div className='table-selection'>
      <h2>Chọn bàng</h2>
      <div className='table-grid'>{renderTables()}</div>
      <div className={`button-container ${selectedTable ? "" : "hidden"}`}>
        <button onClick={handleNextClick}>Tiếp theo</button>
      </div>
    </div>
  );
};

export default TableSelection; // Sử dụng withRouter để bao bọc component
