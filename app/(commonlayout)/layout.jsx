import React from 'react';

import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/Footer/Footer"
const layout = ({children}) => {
    return (
        <div>
          <Navbar></Navbar>
            {children}
            <Footer></Footer>
           
        </div>
    );
};

export default layout;