/*import React, { Component } from 'react';
import axios from 'axios';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      type: '',
      room: '',
      notifier: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, name, type, room, notifier } = this.state;
    axios.post('http://localhost:5000/submit-form', { id, name, type, room, notifier })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>แจ้งย้ายห้องครุภัณฑ์</h2>
        <form onSubmit={this.handleSubmit}>
          <label>ID:</label><br />
          <input type='text' name='id' value={this.state.id} onChange={this.handleInputChange} /><br />
          <label>ชื่อ:</label><br />
          <input type='text' name='name' value={this.state.name} onChange={this.handleInputChange} /><br />
          <label>ประเภท:</label><br />
          <input type='text' name='type' value={this.state.type} onChange={this.handleInputChange} /><br />
