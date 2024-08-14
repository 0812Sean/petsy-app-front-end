import { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import * as listService from '../../services/listServer';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const ListingDetails = () => {
  const user = useContext(AuthedUserContext);
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [listing, setListing] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [message, setMessage] = useState('');

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
        author: user._id 
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

  let PHI = 'https://robohash.org/set_set4/bgset_bg1/RandomParams?size=260x220'


  return (
    <main>
      <h1>{listing.name}</h1>
      <p>{listing.description}</p>
      <p>Price: ${listing.price}</p>
      <p>Category: {listing.category}</p>
      {<img src={PHI} alt={listing.name} />}
      {listing.author && (
        <p>
          Posted by: {listing.author.username} on {new Date(listing.createdAt).toLocaleDateString()}
        </p>
      )}
      
      <h2>Reviews</h2>
      {listing.reviews && listing.reviews.length > 0 ? (
        listing.reviews.map((review) => (
          <div key={review._id}>
            <p>{review.text}</p>
            {review.author && (
              <p>
                {review.author.username} on {new Date(review.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>

        ))
      ) : (
        <p>No reviews yet</p>
      )}

      <h3>Add a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <textarea value={newReview} onChange={handleReviewChange} required />
        <div className="form_button">
        <button type="submit">Submit Review</button>
        <button onClick={() => navigate('/marketplace')}>Back</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
};

export default ListingDetails;
