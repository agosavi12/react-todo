const Day = () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = weekday[new Date().getDay()];

  return <span>{day}</span>;
};

export default Day;
