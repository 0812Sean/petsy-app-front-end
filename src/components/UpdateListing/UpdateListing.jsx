import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as listService from '../../services/listSever';

const UpdateListing = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listing = await listService.show(listingId);
        setFormData({
          name: listing.name,
          description: listing.description,
          price: listing.price,
          category: listing.category,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await listService.update(listingId, formData);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Update Listing</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
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
            id="price"
            value={formData.price}
            name="price"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
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
          <button type="submit">Update Listing</button>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;