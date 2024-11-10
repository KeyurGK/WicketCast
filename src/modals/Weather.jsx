

// import axios from "axios";
// import { useEffect, useState } from "react";

// const Weather = ({ handleClose, seriesId }) => {
//   const weatherApiKey = import.meta.env.VITE_VISUALCROSSING_API_KEY;
//   const [matchList, setMatchList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [clickCount, setClickCount] = useState(0); // Track the number of button clicks
//   const [rowColors, setRowColors] = useState({}); // Store color for each row based on weather

//   const convertDateToISO = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const options = {
//     method: "GET",
//     url: `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${seriesId}`,
//     headers: {
//       "x-rapidapi-key": "4d100bb424mshaaaecf4bd1066f5p1b5cb0jsn7cc8632e6b51",
//       "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
//     },
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.request(options);
//         const filteredData = response.data.matchDetails.filter(
//           (item) => item.matchDetailsMap
//         );
//         setMatchList(filteredData);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleWeatherProbability = async (location, Id) => {
//     try {
//       const matchDate = convertDateToISO(Id);
//       const weatherResponse = await axios.get(
//         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${matchDate}/?unitGroup=metric&include=days&key=${weatherApiKey}`
//       );
      
//       const precipProb = weatherResponse.data.days[0].precipprob; // Example: precipitation probability

//       // Determine color based on precipitation probability
//       let color;
//       if (precipProb > 70) {
//         color = "red"; // High chance of rain
//       } else if (precipProb > 30) {
//         color = "yellow"; // Moderate chance of rain
//       } else {
//         color = "green"; // Low chance of rain
//       }

//       // Set color for the specific row (based on Id)
//       setRowColors(prevColors => ({ ...prevColors, [Id]: color }));

     
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     }

//     setClickCount(prevCount => prevCount + 1); // Increment the click count after each click
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg lg:w-[70%] lg:h-[75vh] mt-[5vh] p-4 relative">
//         <h2 className="text-lg font-semibold text-center mb-4">Weather</h2>

//         {loading ? (
//           <table className="w-full table-auto border-collapse text-left">
//             <thead>
//               <tr className="bg-slate-200 text-gray-700">
//                 <th className="p-2 border border-gray-300">Date</th>
//                 <th className="p-2 border border-gray-300">Match</th>
//                 <th className="p-2 border border-gray-300">Ground</th>
//                 <th className="p-2 border border-gray-300">City</th>
//                 <th className="p-2 border border-gray-300">Probability</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[...Array(5)].map((_, index) => (
//                 <tr key={index} className="animate-pulse">
//                   <td className="p-3 border border-gray-300">
//                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                   </td>
//                   <td className="p-3 border border-gray-300">
//                     <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                   </td>
//                   <td className="p-3 border border-gray-300">
//                     <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                   </td>
//                   <td className="p-3 border border-gray-300">
//                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                   </td>
//                   <td className="p-3 border border-gray-300">
//                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <table className="w-full table-auto border-collapse text-left">
//             <thead>
//               <tr className="bg-slate-200 text-gray-700">
//                 <th className="p-2 border border-gray-300">Date</th>
//                 <th className="p-2 border border-gray-300">Match</th>
//                 <th className="p-2 border border-gray-300">Ground</th>
//                 <th className="p-2 border border-gray-300">City</th>
//                 <th className="p-2 border border-gray-300">Probability</th>
//               </tr>
//             </thead>
//             <tbody>
//               {matchList.map((item, index) => {
//                 const Id = item.matchDetailsMap.key;
//                 const location =
//                   item.matchDetailsMap.match[0]?.matchInfo.venueInfo.city;
//                 const rowColor = rowColors[Id] || "transparent"; // Default to no color initially

//                 return (
//                   <tr
//                     key={Id}
//                     className={`hover:bg-slate-100 transition-colors`}
//                     style={{ backgroundColor: rowColor }}
//                   >
//                     <td className="p-3 border border-gray-300">
//                       {item.matchDetailsMap.key}
//                     </td>
//                     <td className="p-3 border border-gray-300">
//                       {item.matchDetailsMap.match[0]?.matchInfo.matchDesc}
//                     </td>
//                     <td className="p-3 border border-gray-300">
//                       {
//                         item.matchDetailsMap.match[0]?.matchInfo.venueInfo
//                           .ground
//                       }
//                     </td>
//                     <td className="p-3 border border-gray-300">{location}</td>
//                     <td>
//                       <button
//                         onClick={() => handleWeatherProbability(location, Id)}
//                         disabled={clickCount >= 2 || index >= 2}
//                         className={`${
//                           clickCount >= 2 || index >= 2 ? "bg-gray-400" : "bg-blue-500"
//                         } text-white p-2 rounded w-32`}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}

//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Weather;

import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ handleClose, seriesId }) => {
  const weatherApiKey = import.meta.env.VITE_VISUALCROSSING_API_KEY;
  const [matchList, setMatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCounts, setViewCounts] = useState(0); // To track clicks across rows
  const [rowColors, setRowColors] = useState({}); // Store color for each row
  const [clickedRows, setClickedRows] = useState(new Set()); // Track clicked rows to disable buttons

  const convertDateToISO = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const options = {
    method: "GET",
    url: `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${seriesId}`,
    headers: {
      "x-rapidapi-key": "4d100bb424mshaaaecf4bd1066f5p1b5cb0jsn7cc8632e6b51",
      "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        const filteredData = response.data.matchDetails.filter(
          (item) => item.matchDetailsMap
        );
        setMatchList(filteredData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleWeatherProbability = async (location, Id) => {
    // If 2 views have already been used, show alert for further clicks
    if (viewCounts >= 2 && !rowColors[Id]) {
      alert("Subscription required to view more matches.");
      return;
    }

    try {
      const matchDate = convertDateToISO(Id);
      const weatherResponse = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${matchDate}/?unitGroup=metric&include=days&key=${weatherApiKey}`
      );

      // const weatherData = weatherResponse.data.days[0];
      // const { precipprob, windgust, cloudcover } = weatherData;

      // // Determine color
      // let color = "green";
      // if (precipprob >= 50 || windgust >= 20 || cloudcover >= 70) {
      //   color = "red";
      // } else if (precipprob >= 20 || windgust >= 10 || cloudcover >= 40) {
      //   color = "yellow";
      // }

      const precipProb = weatherResponse.data.days[0].precipprob; // Example: precipitation probability

       // Determine color based on precipitation probability
       let color;
       if (precipProb > 70) {
         color = "red"; // High chance of rain
       } else if (precipProb > 30) {
         color = "yellow"; // Moderate chance of rain
       } else {
         color = "green"; // Low chance of rain
       }


      // Update color, click count, and disable button for this row
      setRowColors((prev) => ({ ...prev, [Id]: color }));
      setViewCounts((count) => count + 1);
      setClickedRows((prev) => new Set(prev).add(Id));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg lg:w-[70%] lg:h-[75vh] mt-[5vh] p-4 relative">
        <h2 className="text-lg font-semibold text-center mb-4">Weather Prediction</h2>

        {loading ? (
          <table className="w-full table-auto border-collapse text-left">
             <thead>
               <tr className="bg-slate-200 text-gray-700">
                 <th className="p-2 border border-gray-300">Date</th>
                 <th className="p-2 border border-gray-300">Match</th>
                 <th className="p-2 border border-gray-300">Ground</th>
                 <th className="p-2 border border-gray-300">City</th>
                 <th className="p-2 border border-gray-300">Probability</th>
               </tr>
             </thead>
             <tbody>
               {[...Array(5)].map((_, index) => (
                 <tr key={index} className="animate-pulse">
                   <td className="p-3 border border-gray-300">
                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                   </td>
                   <td className="p-3 border border-gray-300">
                     <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                   </td>
                   <td className="p-3 border border-gray-300">
                     <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                   </td>
                   <td className="p-3 border border-gray-300">
                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                   </td>
                   <td className="p-3 border border-gray-300">
                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        ) : (
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-slate-200 text-gray-700">
                <th className="p-2 border border-gray-300">Date</th>
                <th className="p-2 border border-gray-300">Match</th>
                <th className="p-2 border border-gray-300">Ground</th>
                <th className="p-2 border border-gray-300">City</th>
                <th className="p-2 border border-gray-300">Probability</th>
              </tr>
            </thead>
            <tbody>
              {matchList.map((item) => {
                const Id = item.matchDetailsMap.key;
                const location = item.matchDetailsMap.match[0]?.matchInfo.venueInfo.city;
                const rowColor = rowColors[Id] || "transparent"; 
                // Determine button style based on click limit, row color, and if it’s been clicked
                const isGray = viewCounts >= 2 && !rowColors[Id];
                const buttonStyle = isGray ? "bg-gray-500 text-white" : "bg-blue-500 text-white";
                const isDisabled = clickedRows.has(Id); // Disable if already clicked

                return (
                  <tr key={Id}  className={`hover:bg-slate-100 transition-colors`}
                     style={{ backgroundColor: rowColor }}>
                    <td className="p-3 border border-gray-300">
                      {item.matchDetailsMap.key}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {item.matchDetailsMap.match[0]?.matchInfo.matchDesc}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {item.matchDetailsMap.match[0]?.matchInfo.venueInfo.ground}
                    </td>
                    <td className="p-3 border border-gray-300">{location}</td>
                    <td>
                      <button
                        onClick={() => handleWeatherProbability(location, Id)}
                        className={`p-2 rounded ${buttonStyle}`}
                        disabled={isDisabled}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default Weather;

