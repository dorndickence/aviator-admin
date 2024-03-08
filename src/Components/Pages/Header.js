import Cookies from "js-cookie";

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {Cookies.get("token") ? (
            <>
              <div className="dropdown sm:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a href="./account" className="link link-hover">
                      Account
                    </a>
                  </li>

                  <li>
                    <a href="./players" className="link link-hover">
                      Players
                    </a>
                  </li>
                  <li>
                    <a href="./withdraw" className="link link-hover">
                      Withdraw
                    </a>
                  </li>
                  <li>
                    <a href="./logout" className="link link-hover">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}

          <a href="./" className="btn btn-ghost text-xl">
            CC Admin
          </a>
        </div>

        <div className="navbar-end ">
          <div className="flex gap-5">
            {Cookies.get("token") ? (
              <>
                <div className="gap-5  hidden sm:flex">
                  <a href="./account" className="link link-hover">
                    Account
                  </a>
                  <a href="./players" className="link link-hover">
                    Players
                  </a>
                  <a href="./withdraw" className="link link-hover">
                    Withdraw
                  </a>
                  <a href="./logout" className="link link-hover">
                    Logout
                  </a>
                </div>
              </>
            ) : (
              <>
                <a href="./login" className="btn glass">
                  Login
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
