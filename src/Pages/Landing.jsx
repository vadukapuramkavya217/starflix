import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = ({ setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("DIGIT");
  const [password, setPassword] = useState("kavya@129");

  const handleLogin = (e) => {
    e.preventDefault(); // ✅ prevent page reload
    console.log("clicked login");

    if (setToken) {
      localStorage.setItem("token", "dummy-token");
      setToken("dummy-token");
    }

      // ✅ Close modal programmatically
  const modalEl = document.getElementById('loginModal');
  if (modalEl) {
    const modal = window.bootstrap?.Modal.getInstance(modalEl);
    modal?.hide();
  }

  // ✅ Clean up Bootstrap modal state
  document.body.classList.remove('modal-open');
  document.querySelector('.modal-backdrop')?.remove();

    navigate("/home");
  };

  return (
    <div>
      {/* Bootstrap Login Modal */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <div className="modal-body">
              <h3 className="text-center mb-4 text-uppercase fw-bold">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="form-label text-uppercase fw-bold"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control text-uppercase fw-bold p-3"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="form-label text-uppercase fw-bold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control text-uppercase fw-bold"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary py-3 w-100 text-uppercase fw-semibold"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Landing Page with overlay */}
      <div
        className="vh-100 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative"
        style={{
          backgroundImage: "url('Images/login-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        ></div>

        {/* Content */}
        <div className="position-relative">
          <img
            src="Images/logo2.png"
            alt="StarFlix Logo"
            style={{ width: "200px" }}
          />

          <div className="my-5">
            <h3
              className="fw-normal"
              style={{ fontSize: "54px", lineHeight: "64px" }}
            >
              Unlimited streaming of
            </h3>
            <h2
              className="fw-bold text-primary"
              style={{ fontSize: "64px", lineHeight: "70px" }}
            >
              <h1  style={{  color:"#12aee5"}}>movies, series, and more.</h1>
            </h2>
            <p className="fs-4 fw-light">
              All your favorites in one place. Start watching now.
            </p>
          </div>

          <button
            className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold "
            style={{  backgroundColor:"#12aee5"}}
            
            data-bs-toggle="modal"
            data-bs-target="#loginModal "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
