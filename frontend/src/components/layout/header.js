export default function Navbar(props) {
  return (
    <nav className="navbar fixed-top navbar-light bg-dark">
      <div className="container-fluid">
        <div className="lead">
          <a href="/">
            <img
              alt="logo"
              className="company-logo"
              src="https://daytonasystems.in/wp-content/themes/daytona/images/logo/logo.svg"
            />
          </a>
          <span className="nav-title ms-2 ">WELCOME TO BLOGS</span>
        </div>

        <button
          type="button"
          className="btn btn-outline-light"
          onClick={() => props.showCreateForm(true)}
        >
          ADD NEW BLOG
        </button>
      </div>
    </nav>
  );
}
