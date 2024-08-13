import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="form_container">
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <label htmlFor="username" className="form_label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="password" className="form_label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="confirm" className="form_label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            className="form_input"
          />
        </div>
        <div className="form_group">
          <button className="form_button" disabled={isFormInvalid()}>
            Sign Up
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
