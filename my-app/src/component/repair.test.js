import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

export default function Repair() {
  const storageRepairType = sessionStorage.getItem('repairType');
  const displayname = sessionStorage.getItem('displayname');
  const durablearticles_Id = storageRepairType;
  const [room_Id, setRoom_Id] = useState('');
  const [material, setMaterial] = useState([]);

  useEffect(() => {
    getMaterial();
  }, []);

  const getMaterial = async () => {
    try {
      const response = await axios.get('http://localhost:3001/durablearticles');
      setMaterial(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const repair_durablearticles_Id = ''; // set a value for repair_durablearticles_Id
    const repair_img = ''; // set a value for repair_img
    const repair_detail = event.target.repair_detail.value;
    const Informer = displayname;
    const repair_status = 'wait';
  
    try {
      const response = await axios.post('http://localhost:3001/api/repairs', {
        repair_durablearticles_Id,
        repair_img,
        repair_detail,
        Informer,
        repair_status,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoomChange = (event) => {
    setRoom_Id(event.target.value);
  };

  const WebcamCapture = () => {
    const [image, setImage] = useState(null);
    const webcamRef = useRef(null);

    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      webcamRef.current.stream.getTracks().forEach((track) => track.stop());
    };

    return (
      <div>
        <h2>แจ้งซ่อมครุภัณฑ์</h2>
        <form onSubmit={handleSubmit}>
          {material.map((val, index) => {
            if (val.durablearticles_Id === storageRepairType) {
              return (
                <div key={index}>
                  <label>ID: {val.durablearticles_Id}</label>
                  <br />
                  <label>ชื่อ: {val.durablearticles_name}</label>
                  <br />
                  <label>ประเภท: {val.type_durablearticles_Id}</label>
                  <br />
                  <label>ห้อง:</label>
                  <select name="room" value={room_Id} onChange={handleRoomChange}>
                    <option value={val.room_Id}>{val.room_Id}</option>
                    <option value="78-601">78-601</option>
                  </select>
                </div>
              );
            }
            return null;
          })}

          <br />
          <label>รูปภาพ:</label>
          {image ? (
            <img src={image} alt="capture" name="repair_img" />
          ) : (
            <>
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={210} height={120} />
              <button onClick={capture}>ถ่ายรูป</button>
            </>
          )}
          <br />
          <label>รายละเอียดเพิ่มเติม:</label>
          <input type="text" name="repair_detail" />
          <br />
          <label>ผู้แจ้ง:</label>
          <input type="text" name="notifier" value={displayname} />
          <br />
          <br />
          <button name="submit" value="submit" className="submit">
            submit
          </button>
        </form>
      </div>
    );
  };

  return <WebcamCapture />;
}
