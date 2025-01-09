// import React, { useState } from "react";
// import axios from "axios"; // Use axios to connect to back-end
// import "./login.css";

// export const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       setError("Please fill in both fields");
//       setSuccess("");
//     } else {
//       try {
//         const response = await axios.post("http://localhost:5000/users/login", {
//           email: username,
//           password: password,
//         });
//         setError("");
//         setSuccess("Login successful!");
//         // Lưu token vào localStorage
//         localStorage.setItem("token", response.data.token);
//         console.log("Login Response:", response.data);
//       } catch (err) {
//         setError("Invalid username or password");
//         setSuccess("");
//         console.error("Login Error:", err);
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2>Login</h2>
//         {/* Hiển thị thông báo lỗi */}
//         {error && <p className="error-message">{error}</p>}
//         {/* Hiển thị thông báo thành công */}
//         {success && <p className="success-message">{success}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//             />
//           </div>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         <div className="signup-link">
//           <p>
//             Don't have an account? <a href="/signup">Sign Up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import axios from "axios"; // Use axios to connect to back-end
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState(""); // Sử dụng "email" thay vì "username"
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    setError(""); // Reset lỗi
    setSuccess(""); // Reset thông báo thành công

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      // Gửi yêu cầu đến backend
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      });

      // Xử lý phản hồi thành công
      setSuccess("Login successful!");
      localStorage.setItem("token", response.data.token); // Lưu token vào localStorage
      console.log("Login Response:", response.data);

      // Điều hướng người dùng đến trang chính (Shop)
      window.location.href = "/";
    } catch (err) {
      // Xử lý lỗi từ backend
      setError("Invalid email or password");
      console.error("Login Error:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {/* Hiển thị thông báo lỗi */}
        {error && <p className="error-message">{error}</p>}
        {/* Hiển thị thông báo thành công */}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};
