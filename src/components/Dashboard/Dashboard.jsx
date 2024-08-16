import { AuthedUserContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import * as listService from '../../services/listServer';
import { useNavigate } from 'react-router-dom';
import { StarReview } from '../Stars/Stars';
import '../../styles/cardStyles.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useContext(AuthedUserContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const allListings = await listService.index();
        const userLists = allListings.filter((listing) => listing.author && listing.author.username === user.username);
        setListings(userLists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, [user.id, user.username]);

  const handleDelete = async (listingId) => {
    try {
      await listService.deleteList(listingId);
      setListings((prevListings) => prevListings.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log('Failed to delete listing:', error);
    }
  };

  return (
    <main>
      <h1 className='page_header'>{user.username.toUpperCase()}'s Product Listing</h1>
      <div className="card_grid">
        {listings.map((listing) => {
          // Calculate the average rating
          const totalReviews = listing.reviews.length;
          const averageRating =
            totalReviews > 0 ? listing.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;

          return (
            <div key={listing._id} className="card">
              <div className="card_title">{listing.name}</div>

              {/* Display the average rating and number of reviews */}
              <div className="card_rating">
                {totalReviews > 0 ? (
                  <>
                    <StarReview stars={averageRating} /> {/* Display average rating */}
                    <span>({totalReviews} reviews)</span> {/* Display number of reviews */}
                  </>
                ) : (
                  // if no reviews, display "No reviews" and 0 stars
                  <>
                    <StarReview stars={0} />
                    <span>No reviews</span>
                  </>
                )}
              </div>

              <p className="card_description">{listing.description}</p>
              <p className="card_price">${listing.price}</p>
              <p className="card_category">Category: {listing.category}</p>
              {listing.imageUrl && (
                <img src={listing.imageUrl} alt={listing.name} style={{ width: '300px', height: 'auto' }} />
              )}
              <button className="card_button update" onClick={() => navigate(`/update/${listing._id}`)}>
                Update
              </button>
              <button className="card_button delete" onClick={() => handleDelete(listing._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Dashboard;
