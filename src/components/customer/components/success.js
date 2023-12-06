import React from "react";
import { Link } from "react-router-dom"; 
import NavbarComponent from "./navbar";
import successImage from "../../../assets/success img.png";

function Success() {
    return (
        <div>
            <NavbarComponent />
            <h3>Booking successful</h3>
            <img
                src={successImage}
                alt="Success"
                style={{
                    border: "2px ",
                    borderRadius: "8px",
                    marginTop: "10px",
                    maxWidth: "10%", // Set the maximum width to maintain responsiveness
                    height: "auto", // Allow the height to adjust proportionally
                }}
            />
            
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Link to="/customer/dashboard">
                    <button style={{ padding: "10px", fontSize: "16px" }}>
                        Back to Customer Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Success;
