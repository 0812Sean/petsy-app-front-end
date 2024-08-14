import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as listService from '../../services/listServer';


const ListingForm = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
    });

    const { listingId } = useParams();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (listingId) {
            try {
                const updatedListing = await listService.update(listingId, formData);
                navigate(`/`);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const newListing = await listService.create(formData);
                navigate(`/`);
            } catch (err) {
                console.log(err);
            }
        }
    }
        useEffect(() => {
            const fetchListing = async () => {
                const listing = await listService.show(listingId);
                setFormData(listing);
            };
            if (listingId) {
                fetchListing();
            }
        }, [listingId]);

    return (
        <>
            <h1>{listingId ? 'Edit Listing' : 'Create new listing'}</h1>
            <form autoComplete="off" onSubmit={handleSubmit} className='form_containter'>
                <div className='form_group'>
                    <label htmlFor="title" className='form_label'>Title:</label>
                    <input
                        type="text"
                        autoComplete='off'
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder='Enter a title'
                        className='form_input'
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="description" className='form_label'>Description:</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder='Enter a description'
                        className='form_input'
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="price" className='form_label'>Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder='Enter a price'
                        className='form_input'
                    />
                </div>
                <div className='form_group'> 
                    <label htmlFor="category" className='form_label'>Category:</label>
                    <select
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className='form_input'
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
                        // value={formData.image}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{listingId ? 'Update' : 'Create'}</button>
            </form>
        </>
    );
};


export default ListingForm;