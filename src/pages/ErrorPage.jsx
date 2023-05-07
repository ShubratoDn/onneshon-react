import React from 'react'
import pageImage from "../assets/images/NotFoundPage.png"
import { Link } from 'react-router-dom'

export default function ErrorPage() {

    const style = {
        minHeight: "auto",
        width: "100vw",
        objectFit : "",
        transform: "scale(1)"
    }

    return (
        <>
            <Link>
                <img style={style} src={pageImage} alt="Error" />
            </Link>
            
        </>
    )
}
