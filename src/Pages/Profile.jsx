import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FaAngleRight, FaSearch } from 'react-icons/fa';
import '../Styles/Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({
    username: 'DIGITIT',
    email: 'test@digitit.com',
    fname: 'DIGIT',
    lastname: 'IT',
    country: 'INDIA',
    state: 'Telangana',
    profile_image: '../Images/digitlogo.png'
  });

  const [passwordData, setPasswordData] = useState({
    old_password: '*******',
    new_password: '**********',
    confirm_password: '**********'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [category, setCategory] = useState('TV SHOW');
  const [query, setQuery] = useState('');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/profile/', {
          headers: { Authorization: `Token ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/profile');
        }
      }
    };

    if (token) {
      fetchProfile();
    } else {
      navigate('/profile');
    }
  }, [token, navigate]);

  // Save profile changes
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      setError('');

      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        if (key === 'profile_image' && !(value instanceof File)) return;
        formData.append(key, value);
      });

      const res = await axios.put(
        'http://localhost:8000/api/profile/',
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setUser(res.data);
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      setError('');

      await axios.post(
        'http://localhost:8000/api/change-password/',
        passwordData,
        {
          headers: { Authorization: `Token ${token}` }
        }
      );

      setPasswordData({
        old_password: '',
        new_password: '',
        confirm_password: ''
      });
      setMessage('Password changed successfully!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to change password');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/profile'); // redirect to login page
  };

  // Navigate to profile (if you have a separate link for account)
  // const handleAccount = () => {
  //   navigate('/profile'); // redirect to profile page
  // };

  return (
    <div>
      <Header />

      {/* 🔹 SEARCH BAR */}
      <div className="search-bar-container">
        <div className="search-bar">
          <div className="dropdown-wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-dropdown"
            >
              <option value="TV SHOW">TV SHOW</option>
              <option value="MOVIE">OTHERS</option>
            </select>
          </div>

          <input
            type="text"
            placeholder={`Search for a ${category.toUpperCase()} or celebrity that you are looking for`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />

          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* 🔹 PROFILE PAGE */}
      <section className="profilepage">
        <div className="moviesheading">
          <h1>PROFILE</h1>
          <p>
            <a href="/home">HOME</a> <span><FaAngleRight /></span> PROFILE
          </p>
        </div>

        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

        <div className="profile-text">
          <div className="img-text">
            <div className="profile-img">
              <img
                src={user.profile_image || '/images/person.png'}
                alt="Profile"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />

              <form onSubmit={handleSave}>
                <input
                  type="file"
                  id="userimg"
                  onChange={(e) =>
                    setUser({ ...user, profile_image: e.target.files[0] })
                  }
                  hidden
                  accept="image/*"
                />
                <label htmlFor="userimg" className="custom-upload-btn">
                  CHANGE AVATAR
                </label>
                
              </form>
            </div>

            <div className="acc-dtl">
              <h6>Account Details</h6>
              <Link to="/profile" className="profile-link">PROFILE</Link>
              <a href="#change-password">CHANGE PASSWORD</a>
              {/* Use handleAccount if you have a separate account link */}
            <button className="logout" onClick={handleLogout}>LOG OUT</button>
            </div>
          </div>

          <div className="form-container">
            <h4>01. PROFILE DETAILS</h4>
            <form className="userform" onSubmit={handleSave}>
              {[
                { label: 'Username', name: 'username' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'First Name', name: 'fname' },
                { label: 'Last Name', name: 'lastname' },
                { label: 'Country', name: 'country' },
                { label: 'State', name: 'state' }
              ].map(({ label, name, type = 'text' }) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input
                    type={type}
                    name={name}
                    placeholder={label}
                    value={user[name] || ''}
                    onChange={(e) => setUser({ ...user, [name]: e.target.value })}
                  />
                </div>
              ))}
              <button type="submit">SAVE</button>
            </form>

            <br />
            <hr />
            <br />

            <h4 id="change-password">02. CHANGE PASSWORD</h4>
            <form className="usr-psd" onSubmit={handlePasswordChange}>
              {[
                { label: 'Old Password', name: 'old_password' },
                { label: 'New Password', name: 'new_password' },
                { label: 'Confirm New Password', name: 'confirm_password' }
              ].map(({ label, name }) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input
                    type="password"
                    placeholder={label}
                    value={passwordData[name]}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, [name]: e.target.value })
                    }
                  />
                </div>
              ))}
              <button type="submit">CHANGE</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Profile;