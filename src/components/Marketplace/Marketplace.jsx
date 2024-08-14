import React, { useEffect, useState } from 'react';
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

  return (
    <main>
      <h1>Marketplace</h1>
      <div className="listings-grid">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id} className="listing-card">
              <h2>{listing.name}</h2>
              <p>{listing.description}</p>
              <p>Price: ${listing.price}</p>
              <p>Category: {listing.category}</p>
              {listing.reviews && listing.reviews.map((review) => (
                <p key={review._id}>{review.text}</p>
              ))}
           <Link to={`/listings/${listing._id}`}>View Details</Link>
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
