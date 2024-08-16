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

  let placeHolderImg = 'https://placehold.co/260x220?text=uploading+is+hard...+(:';
  return (
    <main>
      <h1 className="page_header">Marketplace</h1>
      <div className="card_grid">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id} className="card">
              <Link to={`/listings/${listing._id}`}>
                <img
                  src={listing.imageUrl || placeHolderImg}
                  alt={listing.name}
                  style={{ width: '300px', height: 'auto' }}
                />
                <h2 className="card_title">{listing.name}</h2>
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
