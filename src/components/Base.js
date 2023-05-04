import React from 'react'
import CustomNavbar from './CustomNavbar'
import Footer from './Footer'


function Base({ title,children }) {
    return (
        <>
            <CustomNavbar></CustomNavbar>

            <section style={{minHeight: "40vh"}}>
                {children}
            </section>


            <Footer></Footer>

        </>
    )
}

export default Base