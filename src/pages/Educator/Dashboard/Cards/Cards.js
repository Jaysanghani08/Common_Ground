import React from 'react'
import { UilRupeeSign, UilStar, UilUsersAlt, UilBooks } from '@iconscout/react-unicons'
import './Cards.css'

const Cards = ({ income, rating, studentcnt, totalcourses }) => {
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
            {EduCardContent.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        <h3>{item.heading}</h3>
                        <div className="icon-value-container">
                            <div className="icon-container">
                                {item.icon({ size: 70, color: '#0c356a' })}
                            </div>
                            <div className="value-container">
                                <h3>{item.value}</h3>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Cards
