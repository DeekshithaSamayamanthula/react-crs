import React, { Component } from 'react';
import Faq from 'react-faq-component';
import './dashboard.css'; // Import your CSS file


function Help() {
    const data = {
      
      rows: [
        {
          title: "How to book a car",
          content: "Visit customer Dashboard > enter details > search cars"
        },
        {
          title: "How to update profile",
          content: "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam."
        },
        {
          title: "How to view my bookings",
          content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc"
        },
      ]
    };

    const data1 = {
        
        rows: [
          {
            title: "Contact Us",
          content: "987654321"
             }
        ]
      };
  
    return (
      <div>
        <h3>Frequently Asked Questions(FAQs)</h3>
        <Faq data={data} />
        <br />
        <h3>Contact Us</h3>
        <Faq data={data1} />
      </div>
    );
  }
  
  export default Help;
  
