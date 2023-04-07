import React,{ useState, useEffect, useRef } from "react";
import axios from 'axios';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default function Repair(){
  const [material, setMaterial] = useState([]);
  const storageRepairType = sessionStorage.getItem('repairType');
  const durablearticles_Id = storageRepairType;
  const [room, setRoom] = useState('');
  const [description, setDescription] = useState('');
  const [Informer, setInformer] = useState('');
  const [du_name, setDurablearticlesName] = useState('');
  const [typeId, setTypeDurablearticlesId] = useState('');
  const repair_durablearticles_Id=" ";
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const [dataUri, setDataUri] = useState(null);

  function handleTakePhoto(uri) {
    setDataUri(uri);
  }
  
  useEffect(() => {
    const getMaterial = async () => {
      const response = await axios.get('http://localhost:3001/durablearticles');
      const jsonData = response.data;
      setMaterial(jsonData);
      const foundData = jsonData.find(data => data.durablearticles_Id === durablearticles_Id);
      if (foundData) {
        setDurablearticlesName(foundData.durablearticles_name);
        setTypeDurablearticlesId(foundData.type_durablearticles_Id);
      }
    };
    getMaterial();
  }, [durablearticles_Id]);

  
  
  const submitRepair = async () => {
    if (!Informer) {
      alert('Please fill in the informer field.');
      return;
    }

    const data = {
      repair_durablearticles_Id,
      du_name,
      durablearticles_Id,
      room,
      description,
      Informer,
      repair_detail: description, 
      Informer: Informer, 
    }
    console.log(description)
    try {
      const response = await axios.post('http://localhost:3001/repairs', data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    submitRepair();
  }
  
  const handleInputChange =(event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === 'room') {
      setRoom(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'Informer') {
      setInformer(value);
    }
  }

  return(
    <div>
      <h2>แจ้งซ่อมครุภัณฑ์</h2>
      <form onSubmit={handleSubmit}>
          <label>ID:{durablearticles_Id}  </label><br /><br />
          <label>ชื่อ:{du_name} </label><br /><br />
          <label>ประเภท:{typeId} </label><br /><br />
          <label>ห้อง:</label>
          <select name="room" value={room} onChange={handleInputChange}>
            <option value="select">select</option>
            <option value="78-601">78-601</option>
          </select><br /><br />
          <div>
      {dataUri ? (
        <img src={dataUri} alt="captured" />
      ) : (
        <Camera
          onTakePhoto={handleTakePhoto}
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 200, height: 200}}
          imageType = {IMAGE_TYPES.JPG}

        
        />
      )}
    </div>
          <label>รายละเอียดเพิ่มเติม:</label>
          <input type="text" onChange={handleInputChange} value={description} name="description" />
          <br /><br />
          <label>ผู้แจ้ง:</label>
          <input type="text" onChange={handleInputChange} value={Informer} name="Informer" /><br />
          <br /><br />
          <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}