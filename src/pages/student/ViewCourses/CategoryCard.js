import React from 'react'

const CategoryCard = ({ category }) => {
    return (
        <div className='stu-viewcourses-categorycard-body'>
            <div className="stu-viewcourses-categorycard-image">
                <img src={category.image} alt={category.categoryName} />
            </div>
            <div className="stu-viewcourses-categorycard-name">
                {category.categoryName}
            </div>
        </div>
    )
}

export default CategoryCard
