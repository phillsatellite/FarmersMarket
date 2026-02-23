import '../styles/Home.css';

function Home() {
  return (
    <div className="home" data-testid="home-page">
      <div className="landing-section" data-testid="landing-section">
        <h1 data-testid="home-heading">Local Farmers Market</h1>
        <p data-testid="home-tagline">Great tasting fuits and veggies, grown right next door</p>
      </div>
    </div>
  );
}

export default Home;