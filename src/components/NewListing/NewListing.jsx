import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as listService from '../../services/listSever';
// import './NewListing.css';

const NewListing = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [message, setMessage] = useState('');

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = await listService.create(formData);
      console.log(newItem);
      navigate('/'); // Redirect to home or another page after successful creation
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Create New Listing</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            autoComplete="off"
            id="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            autoComplete="off"
            id="description"
            value={formData.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            autoComplete="off"
            id="price"
            value={formData.price}
            name="price"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categorty">Price:</label>
          <select
            type="category"
            autoComplete="off"
            id="category"
            value={formData.category}
            name="category"
            onChange={handleChange}
          >
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Toys">Toys</option>
            <option value="Food">Food</option>
            </select>
        </div>
        <div>
          <button type="submit">Create Listing</button>
        </div>
      </form>
    </main>
  );
};

export default NewListing;