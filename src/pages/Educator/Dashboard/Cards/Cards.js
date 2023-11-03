import React from 'react'
// import Card from './Card'
// import { EduCardContent } from '../../../../data/EduCards'

import './Cards.css'
import { UilRupeeSign, UilStar, UilUsersAlt, UilBooks } from '@iconscout/react-unicons'

const Cards = ({ income, rating, studentcnt, totalcourses }) => {

    // console.log(income)
    const EduCardContent = [
        {
            icon: UilRupeeSign,
            heading: "Total Earnings",
            value: income
        },
        {
            icon: UilStar,
            heading: "Rating",
            value: `${rating}/5`
        },
        {
            icon: UilUsersAlt,
            heading: "Total Students",
            value: studentcnt
        },
        {
            icon: UilBooks,
            heading: "Total Courses",
            value: totalcourses
        },
    ]

    return (
        <div className='cards'>
            {/* <Card />
            <Card />
            <Card />
            <Card /> */}
            {
                EduCardContent.map((item, index) => {
                    return (
                        <div className="card" key={index}>

                            {item.icon({ size: 50, color: '#000000' })}
                            <div className="rightcontent">
                                <h3>{item.value}</h3>
                                <p style={{ color: "black" }}> {item.heading} </p>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}

export default Cards
