import { AuthedUserContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import * as listService from '../../services/listSever';
import './Dashboard.css'

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const userLists = await listService.index()
        setListings(userLists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  })

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
            <p className="listing_reviews">Reviews: {listing.reviews}</p>
            <button className="listing_button update">Update</button>
            <button className="listing_button delete">Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
