function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">

        <p className="footer-brand">
          Travel List
        </p>

        <p className="footer-text">
          Keep track of the places you've
          visited and the places you want
          to explore.
        </p>

        <p className="footer-copyright">
          © {new Date().getFullYear()} Travel List
        </p>

      </div>
    </footer>
  )
}

export default Footer