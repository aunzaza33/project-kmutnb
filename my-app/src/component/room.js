import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Signin from './Signin'
export default function Room() {
  const [material, setMaterial] = useState([]);
  const storageRepairType = sessionStorage.getItem('repairType');
  const durablearticles_Id=storageRepairType
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [room_Id, setRoom_Id] = useState('');
  const [notifier, setNotifier] = useState('');

  useEffect(() => {
    const getMaterial = async () => {
      const response = await axios.get('http://localhost:3001/durablearticles');
      setMaterial(response.data);
    };
    getMaterial();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'type') {
      setType(value);
    } else if (name === 'room_Id') {
      setRoom_Id(value);
    } else if (name === 'notifier') {
      setNotifier(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/moveroom/${durablearticles_Id}`, { durablearticles_Id, name, type, room_Id})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const displayname = sessionStorage.getItem('displayname');
 
  if(!displayname){
    return <Signin />

  }
  else{
  return (
    <div>
      <h2> แจ้งย้ายห้องครุภัณฑ์</h2>
      <form onSubmit={handleSubmit}>
        {material.map((val, index) => (
            
          val.durablearticles_Id === storageRepairType && (
            <div key={index}>
              <label>ID:</label><br />
              <label>{durablearticles_Id}</label><br/>

              <label>ชื่อ:</label><br />
              <input type='text' name='name' value={val.durablearticles_name} onChange={() => setName(val.durablearticles_name)} /><br />

              <label>ประเภท:</label><br />
              <input type='text' name='type' value={val.type_durablearticles_Id} onChange={() => setType(val.type_durablearticles_Id)} /><br />

              <label>ห้อง:</label>
              <select name='room_Id' value={room_Id} onChange={handleInputChange}>
                <option value=''>โปรดเลือก</option>
                <option value="78-601">78-601</option>
                <option value="78-602">78-602</option>
                <option value="78-603">78-603</option>
                <option value="78-604">78-604</option>
                <option value="78-605">78-605</option>
                <option value="78-606">78-606</option>
                <option value="78-607">78-607</option>
                <option value="78-608">78-608</option>
                <option value="78-609">78-609</option>
                <option value="78-610">78-610</option>
                <option value="78-611">78-611</option>
                <option value="78-612">78-612</option>
                <option value="78-613">78-613</option>
                <option value="78-614">78-614</option>
                <option value="78-615">78-615</option>
                <option value="78-616">78-616</option>
                <option value="78-617">78-617</option>
                <option value="78-618">78-618</option>
                <option value="78-619">78-619</option>
                <option value="78-620">78-620</option>
              </select><br />

              <label>ผู้แจ้ง:</label>
              <input type='text' name='notifier' value={displayname} onChange={() => setNotifier(displayname)} /><br />
            </div>
          )
        ))}
        <button type='submit' className='submit'>submit</button>
      </form>
    </div>
  );
}
}
