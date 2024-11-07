import axios from "axios";
import { useEffect, useState } from "react";
const Weather = ({ handleClose, seriesId }) => {
    const [matchList, setMatchList] = useState([]);
    const [loading, setLoading] = useState(true);
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
    const filteredData = response.data.matchDetails.filter((item)=>item.matchDetailsMap);
    setMatchList(filteredData);
    setLoading(false);
        console.log(matchList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex  justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg lg:w-[70%] lg:h-[75vh] mt-[5vh] p-4 relative">
        <h2 className="text-lg font-semibold text-center mb-4">Weather</h2>

        {/* Table content can go here */}
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-slate-200 text-gray-700">
              <th className="p-2 border border-gray-300">Date</th>
              <th className="p-2 border border-gray-300">Match</th>
                          <th className="p-2 border border-gray-300">Ground</th>
                          <th className="p-2 border border-gray-300">City</th>
            </tr>
          </thead>
          <tbody>
          {matchList.map((item, index) => {
                const Id = item.matchDetailsMap.key

                return (
                  <tr key={Id} className="hover:bg-slate-100 transition-colors">
                    <td className="p-3 border border-gray-300">
                      {item.matchDetailsMap.key}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {item.matchDetailsMap.match[0]?.matchInfo.matchDesc}
                        </td>
                        <td className="p-3 border border-gray-300">
                      {item.matchDetailsMap.match[0]?.matchInfo.venueInfo.ground}
                        </td>
                        <td className="p-3 border border-gray-300">
                      {item.matchDetailsMap.match[0]?.matchInfo.venueInfo.city}
                    </td>
                    
                  </tr>
                );
              })}
          </tbody>
        </table>

        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Weather;
