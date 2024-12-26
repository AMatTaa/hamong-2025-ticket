import React from 'react';
import Footer from './footer';
import Header from './header';

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className={`hamong-background
        [background-image:linear-gradient(to_right,#A5A696_1px,transparent_1px),linear-gradient(to_bottom,#A5A696_1px,transparent_1px)]
        sm:[background-size:5vw_5vw]
        md:[background-size:4vw_4vw]
        lg:[background-size:3vw_3vw]
        [background-size:6vw_6vw]`}>
        <Header />
        {children}
        <Footer />
    </div>
  );
};

export default Background;
