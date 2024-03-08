const Home = () => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome Admin</h1>
            <p className="mb-5">Login to your desk and controll the world :)</p>
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
