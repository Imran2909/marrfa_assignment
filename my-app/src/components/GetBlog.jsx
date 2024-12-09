import React, { useState, useEffect } from "react";
import styles from "../styles/getBlog.module.css";
import Spinner from './Spinner'; // Import the Spinner component

function GetBlog() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const filterOptions = [
    { label: "150+ Likes", value: "150+" },
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
  ];

  // Fetch blogs from backend
  useEffect(() => {
    setLoading(true); // Set loading to true before starting fetch
    fetch("https://marrfa-backend.onrender.com/blogs/allBlogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false); // Ensure loading is false even if there is an error
      });
  }, []);


  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Search in the admin (username)
      blog.timestamp.includes(searchTerm) ||  // Search in the date (timestamp)
      blog.likes.toString().includes(searchTerm); // Search in the likes (convert number to string)

    const likesFilterActive = selectedFilters.includes("150+");
    const yearFilters = selectedFilters.filter((filter) => filter.match(/^\d{4}$/)); // Extract year filters

    // Check if blog satisfies the likes condition
    const matchesLikes = !likesFilterActive || blog.likes >= 150;

    // Check if blog satisfies any of the year filters
    const matchesYears =
      yearFilters.length === 0 ||
      yearFilters.some((year) => blog.timestamp && blog.timestamp.startsWith(year));

    // Combine filters: matchesSearch, matchesLikes AND matchesYears
    return matchesSearch && matchesLikes && matchesYears;
  });


  // Handle dropdown toggle
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Handle filter selection
  const handleFilterChange = (value) => {
    setSelectedFilters((prev) =>
      prev.includes(value)
        ? prev.filter((filter) => filter !== value)
        : [...prev, value]
    );
  };

  return (
    <div className={styles.container}>
      {/* Show the Spinner while loading */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.input}
              />

            <div className={styles.dropdown}>
              <button onClick={toggleDropdown} className={styles.dropdownButton}>
                Filters
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {filterOptions.map((option) => (
                    <label key={option.value} className={styles.dropdownItem}>
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(option.value)}
                        onChange={() => handleFilterChange(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.grid}>
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className={styles.card}>
                <p className={styles.admin}>Posted By: {blog.admin}</p>
                <h2>{blog.title}</h2>
                <p className={styles.description}>{blog.description}</p>
                <p className={styles.likes}>Likes: {blog.likes}</p>

                <div className={styles.timestamp}>
                  {blog.timestamp
                    ? `Posted on: ${blog.timestamp.slice(0, 4)}-${blog.timestamp.slice(
                      5,
                      7
                    )}-${blog.timestamp.slice(8, 10)} at ${blog.timestamp.slice(
                      11,
                      19
                    )}`
                    : "Date not available"}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default GetBlog;
