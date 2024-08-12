import { Link } from 'react-router-dom';
import './Landing.css'
const Landing = () => {
  return (
  <div className="slideshow-container">
    <main className='card_main'>
      <h1 className='card_title'>Welcome to Petsy</h1>
      <button className='card_button'><Link to="/signin">Sign In</Link></button>
      <button className='card_button'><Link to="/signup">Sign Up</Link></button>
    </main>
  </div>
  );
};

export default Landing;
