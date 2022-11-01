export default function Navbar(props) {
  return (
    <div className="nav">
      <div className="nav-header">
        <a href="/">
          <img
            alt="logo"
            className="company-logo"
            src="https://daytonasystems.in/wp-content/themes/daytona/images/logo/logo.svg"
          />
        </a>
        <div className="nav-title">WELCOME TO BLOGS</div>
      </div>
      <button
        className="btn-dark bg-transparent border-0 text-white"
        onClick={() => props.showCreateForm(true)}
      >
        ADD NEW BLOG
      </button>
    </div>
  );
}
