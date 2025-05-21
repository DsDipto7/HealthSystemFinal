import React, { useEffect, useState, useCallback } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState(""); // For toast

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profile_image: null,
    old_email: "",
    old_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const token = localStorage.getItem("accessToken");

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
      setFormData((prev) => ({
        ...prev,
        username: data.username,
        email: data.email,
      }));
    } catch (err) {
      setError("Error fetching profile");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchPayments = useCallback(async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/payments/user-payments/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      setError("Error fetching payments");
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
    fetchPayments();
  }, [fetchProfile, fetchPayments]);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    if (files?.length) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  // Toast logic
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleInputFocus = (field) => {
    if (field === "email") {
      showToast("You can keep your email or update it. Please use a valid email address.");
    }
    if (field === "password") {
      showToast("You can keep your password or update it. Use a strong password for better security.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    if (!formData.old_email || !formData.old_password) {
      return alert(
        "Please enter your old email and password for verification."
      );
    }

    const updateData = new FormData();
    if (formData.username) updateData.append("username", formData.username);
    if (formData.email) updateData.append("email", formData.email);
    if (formData.password) updateData.append("password", formData.password);
    updateData.append("old_email", formData.old_email);
    updateData.append("old_password", formData.old_password);
    if (formData.profile_image && typeof formData.profile_image !== "string") {
      updateData.append("profile_image", formData.profile_image);
    }

    try {
      setSubmitLoading(true);
      const res = await fetch(
        "http://127.0.0.1:8000/api/accounts/profile/update/",
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: updateData,
        }
      );

      if (res.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        return;
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || JSON.stringify(errData));
      }

      const updatedProfile = await res.json();
      setProfile(updatedProfile);
      setSuccess("Profile updated successfully.");
      setTimeout(() => setSuccess(""), 3000);

      setFormData((prev) => ({
        ...prev,
        password: "",
        profile_image: null,
        old_email: "",
        old_password: "",
      }));
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading profile...</div>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="profile-title">User Profile</h2>

      <div className="profile-image-box">
        <img
          src={
            formData.profile_image && typeof formData.profile_image === "string"
              ? formData.profile_image
              : profile?.profile_image || "/default_profile.png"
          }
          alt="Profile"
          className="profile-img-rect"
        />
      </div>

      {formData.profile_image && typeof formData.profile_image !== "string" && (
        <div className="flex justify-center mb-4">
          <img
            src={URL.createObjectURL(formData.profile_image)}
            alt="Preview"
            className="profile-img-rect"
            style={{ width: 120, height: 80 }}
          />
        </div>
      )}

      {toast && (
        <div className="custom-toast">
          {toast}
        </div>
      )}

      {success && (
        <div className="text-success text-center mb-2">{success}</div>
      )}
      {error && <div className="text-error text-center mb-2">{error}</div>}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="profile-form bg-white p-6 rounded shadow-md"
      >
        <div className="profile-form-grid">
          <label htmlFor="username">New Username:</label>
          <div>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter new username"
              className="input-field"
            />
            <div className="input-note">
              * you can keep it or can update it with proper validation
            </div>
          </div>

          <label htmlFor="email">New Email:</label>
          <div>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter new email"
              className="input-field"
              onFocus={() => handleInputFocus("email")}
            />
            <div className="input-note">
              * you can keep it or can update it with proper validation
            </div>
          </div>

          <label htmlFor="password">New Password:</label>
          <div className="input-with-btn">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep unchanged"
              className="input-field"
              onFocus={() => handleInputFocus("password")}
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label htmlFor="profile_image">Profile Image:</label>
          <input
            id="profile_image"
            type="file"
            name="profile_image"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
          />

          {/* Green Validation label in left column, empty right column */}
          <label className="validation-label">Validation :</label>
          <div></div>

          <label htmlFor="old_email">Old Email:</label>
          <input
            id="old_email"
            type="email"
            name="old_email"
            value={formData.old_email}
            onChange={handleChange}
            required
            className="input-field"
          />

          <label htmlFor="old_password">Old Password:</label>
          <div className="input-with-btn">
            <input
              id="old_password"
              type={showOldPassword ? "text" : "password"}
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
              required
              className="input-field"
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitLoading}
          className="btn-primary mt-4 w-full"
          style={{ marginTop: "24px" }}
        >
          {submitLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <hr className="my-6" />

      <h3 className="payments-title">Your Completed Payments</h3>
      {payments.length === 0 ? (
        <p className="text-gray-600">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="payments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.amount}</td>
                  <td>{new Date(p.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserProfile;