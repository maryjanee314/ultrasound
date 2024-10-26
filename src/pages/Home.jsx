import React from "react";
import Button from "../components/Button";

const Home = () => {
  const handleShowVideo = () => {
    fetch(`https://${'ultrasound'()}/playVideo`, { method: "POST" });
  };

  return (
    <div className="home">
      <h1>Ultrasound Menu</h1>
      <Button onClick={handleShowVideo}>Show Ultrasound</Button>
      <Button onClick={() => fetch(`https://${'ultrasound'()}/closeUI`, { method: "POST" })}>Close</Button>
    </div>
  );
};

export default Home;
