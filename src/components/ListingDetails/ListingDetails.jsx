import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as listService from '../../services/listServer';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { StarPrompt, StarReview } from '../Stars/Stars';
import './ListingDetails.css';


const ListingDetails = () => {
  const user = useContext(AuthedUserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const fetchedListing = await listService.show(id);
        setListing(fetchedListing);
      } catch (error) {
        console.log('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        text: newReview,
        author: user._id,
        rating: rating,
      };
      const updatedListing = await listService.createReview(id, reviewData);
      setListing(updatedListing);
      setNewReview('');
      setMessage('Review added successfully!');

      window.location.reload();
    } catch (error) {
      setMessage('Error adding review');
      console.log('Error adding review:', error);
    }
  };

  if (!listing) return <p>Loading...</p>;

  let placeHolderImg = "https://placehold.co/260x220?text=uploading+is+hard...+(:";

  return (
    <main className="review_container">
      {/* marketplace product listing */}
      <div className="card_grid">
        <div className="card-listing">
          <div className="card_header">
            <h1 className="card_title-listing">{listing.name}</h1>
            <div className="card_rating">
              {listing.reviews && listing.reviews.length > 0 ? (
                <>
                  <StarReview
                    stars={listing.reviews.reduce((sum, review) => sum + review.rating, 0) / listing.reviews.length}
                  />{' '}
                  {/* Display average rating */}
                  <span>({listing.reviews.length} reviews)</span> {/* Display number of reviews */}
                </>
              ) : (
                <>
                  <StarReview stars={0} />
                  <span>No reviews</span>
                </>
              )}
            </div>
          </div>
          <p className="card_description">{listing.description}</p>
          <p className="card_price">Price: ${listing.price}</p>
          <p className="card_category">Category: {listing.category}</p>
          {listing.author && (
            <p className="card_author">
              Posted by: {listing.author.username} on {new Date(listing.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
        <img
          src={placeHolderImg}
          alt={listing.name}
          className="card_image"
          style={{ width: '300px', height: 'auto' }}
        />
      </div>
      <div className="card-review-form">
        <h3 className="card_title">Add a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className="form_group">
            <textarea
              value={newReview}
              onChange={handleReviewChange}
              required
              className="form_input"
              style={{ width: '100%', height: '85px' }}
            />
          </div>
          <div className="form_group">
            <StarPrompt rating={rating} setRating={setRating} />
          </div>
          <div className="form_group">
            <button type="submit" className="form_button">
              Submit Review
            </button>
            <button type="button" className="form_button" onClick={() => navigate('/marketplace')}>
              Back
            </button>
          </div>
        </form>
      </div>

      {message && <p>{message}</p>}

      {/* product reviews */}
      <div className="review_section">
        <h2 className="review_section_title">Reviews</h2>
        {listing.reviews && listing.reviews.length > 0 ? (
          listing.reviews.map((review) => (
            <div key={review._id} className="review_item">
              <StarReview stars={review.rating} />
              <p className="review_text">{review.text}</p>
              {review.author && (
                <p className="review_author">
                  {review.author.username} on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              )}
              <hr className="review_separator" /> {/* Add a line separator */}
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </main>
  );
};

export default ListingDetails;
