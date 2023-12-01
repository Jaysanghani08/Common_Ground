import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './Graph.css';
import Cookies from 'js-cookie';


export default function SimpleBarChart({ yData, xLabels }) {

    const [error, setError] = useState(null);

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
