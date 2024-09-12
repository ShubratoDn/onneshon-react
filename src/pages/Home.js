import React from 'react'
import Base from '../components/Base'
import NewFeed from '../components/NewFeed'
import NewFeedInfinite from '../components/NewFeedInfinite'

const Home = () => {
    return (
        <Base>
            <div className='container mt-3'>
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-7">
                        {/* <NewFeed></NewFeed> */}
                        <NewFeedInfinite></NewFeedInfinite>
                    </div>
                    <div className="col-lg-3"></div>

                </div>
            </div>

        </Base>
    )
}

export default Home