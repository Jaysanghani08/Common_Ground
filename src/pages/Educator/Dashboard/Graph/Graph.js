import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './Graph.css';
import Cookies from 'js-cookie';


export default function SimpleBarChart() {
    const [yData, setYdata] = useState([0]);
    const [xLabels, setXlabels] = useState(["No Courses"]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/query/generateGraph', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${Cookies.get('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if(data.courseTitle.length === 0) {
                    setXlabels(["No Courses"]);
                    setYdata([0]);
                }
                else{
                    setXlabels(data.courseTitle)
                    setYdata(data.enrolled)
                }
            })
            .catch(err => {
                setError(err);
            })
    }, []);



    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 600px), (min-width: 601px) and (max-width: 1200px)');

        function handleMediaQueryChange(event) {
            const chartContainer = document.querySelector('.css-q3wnbe-MuiResponsiveChart-container');
            chartContainer.style.width = event.matches ? 'auto' : '800px';
        }

        handleMediaQueryChange(mediaQuery);

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    if (!yData || !xLabels) return (<div>Loading...</div>)

    if (error) return (<div>error : {error}</div>)

    return (
        <>
            {
                yData && xLabels &&
                < BarChart
                    className="chart-container"
                    width={800}
                    height={300}
                    series={
                        [
                            { data: yData, label: 'courseTitle', color: "rgb(12, 53, 106)" },
                            // { data: uData, label: 'uv', color: "#cf6624" },
                        ]}
                    xAxis={[{ scaleType: 'band', data: xLabels }]}
                />
            }
        </>
    );
}
