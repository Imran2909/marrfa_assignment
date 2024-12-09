import React, { useState } from 'react';
import styles from "../styles/addBlog.module.css";

function AddBlog() {
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setLoading(true); // Set loading to true while the request is being processed

    try {
      const response = await fetch('https://marrfa-backend.onrender.com/blogs/addBlogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin: formData.username,
          title: formData.title,
          description: formData.description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Blog posted successfully!');
        setFormData({ username: '', title: '', description: '' }); // Clear form
      } else {
        setMessage(data.message || 'Failed to post blog.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while posting the blog.');
    } finally {
      setLoading(false); // Reset loading state after the request
    }
  };

  return (
    <div className={styles.box}>
      <form onSubmit={handleSubmit}>
        <p>Post a Blog</p>
        <hr className={styles.hrl} />
        <div>
          <label className={styles.label} htmlFor="username">Username:</label> <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="title">Title of Blog:</label> <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="description">Description:</label> <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}> {/* Disable button while loading */}
            {loading ? (
              <div className={styles.spinner}></div> // Spinner inside the button
            ) : (
              "Post Blog"
            )}
          </button>
        </div>
      </form>
      {message && <p>{message}</p>} {/* Display success or error message */}
    </div>
  );
}

export default AddBlog;
