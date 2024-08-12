import { AuthedUserContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import * as listService from '../../services/listSever';

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
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing.id} className="listing-card">
            <h2>{listing.name}</h2>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <p>Category: {listing.category}</p>
            <p>Reviews: {listing.reviews}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
