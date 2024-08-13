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
    image: '',
  });
  const [message, setMessage] = useState('');

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const formDataToSubmit = new FormData();
      // if (selectedFile) {
      //   formDataToSubmit.append('image', selectedFile);
      // }
      const newItem = await listService.create(formData)
      console.log(newItem)
      navigate('/')
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Create New Listing</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className="form_container">
        <div className="form_group">
          <label htmlFor="title" className="form_label">
            Title:
          </label>
          <input
            type="text"
            autoComplete="off"
            id="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
			required
			placeholder='Enter a title'
      className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="description" className="form_label">
            Description:
          </label>
          <textarea
            autoComplete="off"
            id="description"
            value={formData.description}
            name="description"
            onChange={handleChange}
			required
			placeholder='Enter a description'
      className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="price" className="form_label">
            Price:
          </label>
          <input
            type="number"
            autoComplete="off"
            id="price"
            value={formData.price}
            name="price"
            onChange={handleChange}
			required
			placeholder='Enter a price'
      className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="category" className="form_label">
            Category:
          </label>
          <select
            autoComplete="off"
            id="category"
            value={formData.category}
            name="category"
            placeholder='Select a category'
            onChange={handleChange}
            className="form_select"
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
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange} 
          />
        </div>
        <div>
          <button type="submit">Create Listing</button>
        </div>
      </form>
    </main>
  );
};

export default NewListing;