import { AuthedUserContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import * as listService from '../../services/listSever';
import { useNavigate } from 'react-router-dom';


const Dashboard = ({}) => {
  const navigate = useNavigate()
  const user = useContext(AuthedUserContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const userLists = await listService.index();
  
        setListings(userLists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, [] )

  const handleUpdate = async (listingId) => {
    try {
      const updatedListing = await listService.update(listingId, {});
      setListings((prevListings) => 
        prevListings.map((listing) => 
          listing.id === listingId ? updatedListing : listing));

    } catch (error) {
      console.log(error)
    }
    }

  const handleDelete = async (listingId) => {
    try {
      await listService.deleteList(listingId)
      setListings((prevListings) => 
        prevListings.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log('Failed to delete listing:', error)
    }
  }

  return (
    <main>
      <h1>{user.username}'s Listings</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <h2>{listing.name}</h2>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <p>Category: {listing.category}</p>
            {/* <p>Reviews: {listing.reviews}</p> */}
            
            { listing.reviews.map((review) => (
              <p>{review.text}</p>
            ))}
            <button onClick={() => navigate(`/update/${listing._id}`)}>Update</button>
            <button onClick={() => handleDelete(listing._id)}>Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
