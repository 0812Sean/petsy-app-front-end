import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as listService from '../../services/listServer';
// import './NewListing.css';

const NewListing = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [message, setMessage] = useState('');

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newItem = await listService.create(formData)
      console.log(newItem)
      navigate('/')
    } catch (err) {
      updateMessage(err.message)
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
			required
			placeholder='Enter a title'
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
			required
			placeholder='Enter a description'
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
			required
			placeholder='Enter a price'
          />
        </div>
        <div>
          <label htmlFor="categorty">Category:</label>
          <select
            type="category"
            autoComplete="off"
            id="category"
            name="category"
            placeholder='Select a category'
            value={formData.category}
            onChange={handleChange}
            required
          >
			<option value="" disabled >Select a category</option>
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