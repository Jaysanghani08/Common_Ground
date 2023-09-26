import React from 'react'
import Card from './Card'
import { EduCardContent } from '../../../../data/EduCards'

import './Cards.css'

const Cards = () => {
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

                            {item.icon({ size : 50, color: '#000000' })}
                            {/* <UilUser /> */}
                            <div className="rightcontent">
                                <h3>{item.value}</h3>
                                <p style={{color : "black"}}> {item.heading} </p>
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
