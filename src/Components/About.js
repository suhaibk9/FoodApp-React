import React, { Component } from 'react';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/users/suhaibk9')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ userData: data, loading: false });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { userData, loading, error } = this.state;

    if (loading) {
      return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>
      );
    }

    if (error) {
      return (
        <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
          Error: {error.message}
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <h1 style={styles.header}>About Us</h1>
        <p style={styles.description}>
          Thank you for checking out this project! If you like what you see,
          please connect on LinkedIn:
          <a
            href="https://www.linkedin.com/in/suhaibk9/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            Suhaib Khan
          </a>
        </p>
        {userData && (
          <div style={styles.profile}>
            <img
              src={userData.avatar_url}
              alt="Profile"
              style={styles.avatar}
            />
            <div style={styles.profileDetails}>
              <h2 style={styles.name}>{userData.name}</h2>
              <p style={styles.bio}>{userData.bio}</p>
              <p style={styles.location}>
                <strong>Location:</strong> {userData.location}
              </p>
              <p style={styles.company}>
                <strong>Company:</strong> {userData.company}
              </p>
              <p style={styles.repo}>
                <strong>Public Repositories:</strong> {userData.public_repos}
              </p>
              <p style={styles.githubLink}>
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  GitHub Profile
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '36px',
    margin: '20px 0',
  },
  description: {
    fontSize: '18px',
    margin: '20px 0',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    marginLeft: '5px',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  avatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
  },
  profileDetails: {
    textAlign: 'left',
    marginTop: '20px',
  },
  name: {
    fontSize: '24px',
    margin: '10px 0',
  },
  bio: {
    fontSize: '16px',
    margin: '10px 0',
  },
  location: {
    fontSize: '16px',
    margin: '10px 0',
  },
  company: {
    fontSize: '16px',
    margin: '10px 0',
  },
  repo: {
    fontSize: '16px',
    margin: '10px 0',
  },
  githubLink: {
    marginTop: '20px',
  },
};

export default AboutUs;
