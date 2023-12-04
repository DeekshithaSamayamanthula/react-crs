
import backgroundImage from "../assets/pexels-alexgtacar-1592384.jpg";
import NavbarComponent from "./customer/components/navbar";

function Home() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={divStyle}>
      <div>
        <NavbarComponent />
      </div>
      
    </div>
  );
}

export default Home;
