import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Reportrepair() {

  const [material, setMaterial] = useState([]);

  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (data) => {
    setCart([...cart, { ...data, quantity: 1 }])
  }

  const handleShow = (value) => {
    setShowCart(value)
  }

  useEffect(() => {
    getMaterial();
  }, []);

  const getMaterial = async () => {
    const response = await Axios.get('http://localhost:3001/report');
    setMaterial(response.data);
  };

  return (

    <div>
      <h2>รายการ การแจ้งซ่อม</h2>
      <div className="column is-half">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">เลขวัสดุ</th>
              <th scope="col">ชื่อ</th>
              <th scope="col">วันที่แจ้ง</th>
              <th scope="col">ผู้แจ้ง</th>
              <th scope="col">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {material.map((val, index) => (
              <tr key={val.durablearticles_Id}>
                <td scope="row">{val.durablearticles_Id}</td>
                <td>{val.repair_durablearticles_date}</td>
                <td>{val.Informer}</td>
                <td>{val.repair_status}</td>
                <td><button className="btn btn-success" onClick={() => addToCart(val)}></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reportrepair