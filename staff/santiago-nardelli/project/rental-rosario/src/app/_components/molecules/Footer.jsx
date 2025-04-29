const Footer = () => {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div>
          <h4>About Us</h4>
          <p>Learn more about our company and mission.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 789</p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <p>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </p>
          <p>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
