import React from 'react';
import './Calendar.css'

const Calendar = () => {
  // Sample data for tasks (you can replace this with your data)
  const tasks = [
    { date: '2023-09-05', title: 'Task 1' },
    { date: '2023-09-10', title: 'Task 2' },
    // Add more tasks here
  ];

  // Function to render badges based on tasks
  const renderBadges = () => {
    const badgeMap = {};

    tasks.forEach((task) => {
      const date = task.date.split('T')[0]; // Extract the date part
      badgeMap[date] = (badgeMap[date] || 0) + 1;
    });

    return badgeMap;
  };

  const badgeMap = renderBadges();

  // Function to generate the days of the month
  const generateDays = () => {
    const daysInMonth = new Date(2023, 8, 0).getDate(); // 8 represents September
    const days = [];

    // Weekday names
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Create weekday header
    const weekdayHeader = weekdays.map((day, index) => (
      <div key={index} className="weekday">
        {day}
      </div>
    ));

    days.push(weekdayHeader);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `2023-09-${day.toString().padStart(2, '0')}`;
      days.push(
        <div key={date} className="day">
          <span className="day-number">{day}</span>
          {badgeMap[date] && <div className="badge">{badgeMap[date]}</div>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="scheduler">
      <div className="header">September 2023</div>
      <div className="weekdays">{generateDays()}</div>
    </div>
  );
};

export default Calendar;
