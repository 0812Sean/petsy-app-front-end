import { AuthedUserContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import * as listService from '../../services/listServer';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'


const Dashboard = () => {
  const navigate = useNavigate()
  const user = useContext(AuthedUserContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const userLists = await listService.index();
        console.log("userLists: ", userLists);
  
        setListings(userLists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  // const handleUpdate = async (listingId) => {
  //   try {
  //     const updatedListing = await listService.update(listingId, {});
  //     setListings((prevListings) =>
  //       prevListings.map((listing) => (listing.id === listingId ? updatedListing : listing))
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDelete = async (listingId) => {
    try {
      await listService.deleteList(listingId);
      setListings((prevListings) => prevListings.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log('Failed to delete listing:', error);
    }
  }

  return (
    <main>
      <h1>{user.username}'s Listings</h1>
      <div className="listings_grid">
        {listings.map((listing) => (
          <div key={listing.id} className="listing_card">
            <h2 className="listing_title">{listing.name}</h2>
            <p className="listing_description">{listing.description}</p>
            <p className="listing_price">Price: ${listing.price}</p>
            <p className="listing_category">Category: {listing.category}</p>
            {<img src={listing.imageUrl} alt={listing.name} />}
            { listing.reviews.map((review) => (
              <p className="listing_reviews">{review.text}</p>
            ))}
            <button className="listing_button update" onClick={() => navigate(`/update/${listing._id}`)}>
              Update
            </button>
            <button className="listing_button delete" onClick={() => handleDelete(listing._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
