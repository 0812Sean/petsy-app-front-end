import { useEffect, useState } from 'react';
import * as listService from '../../services/listServer';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const allLists = await listService.index();
        setListings(allLists);
      } catch (error) {
        console.log('Error fetching lists:', error);
      }
    };

    fetchListings();
  }, []);
  let PHI = 'https://robohash.org/set_set4/bgset_bg1/RandomParams?size=260x220'
  return (
    <main>
      <h1>Marketplace</h1>
      <div className="listings-grid">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id} className="listing-card">
               <Link to={`/listings/${listing._id}`}>
                <img src={listing.imageUrl || PHI} alt={listing.name} />
                <h2>{listing.name}</h2>
              </Link>               
            </div>
          ))
        ) : (
          <p>No listings available</p> 
        )}
        
      </div>
    </main>
  );
};

export default Marketplace;
