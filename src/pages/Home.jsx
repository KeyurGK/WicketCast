import { useEffect, useState } from "react";
import AuthNavbar from "../components/AuthNavbar";
import axios from "axios";
import Weather from "../modals/Weather";

const Home = () => {
  const [matchSchedule, setMatchSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weatherCast, setWeatherCast] = useState(false);
  const [seriesId, setSeriesId] = useState(null);

  const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;
  const options = {
    method: "GET",
    url: "https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international",
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(rapidApiKey)
        const response = await axios.request(options);
        const filteredData = response.data.matchScheduleMap.filter(
          (item) => item.scheduleAdWrapper
        );
        setMatchSchedule(filteredData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleView = (id) => {
    setSeriesId(id);
    setWeatherCast(true);
  };

  const handleClose = () => {
    setWeatherCast(false);
  };

  return (
    <div className="h-screen">
      <AuthNavbar />

      <div className="border border-gray-300 m-2 lg:h-[75vh] rounded-lg shadow-lg p-4 overflow-y-auto">
        {loading ? (
          <div className="animate-pulse">
            <div className="bg-slate-200 h-8 w-1/3 mb-4 rounded"></div>
            <div className="bg-slate-200 h-10 w-full mb-2 rounded"></div>
            <div className="bg-slate-200 h-10 w-full mb-2 rounded"></div>
            <div className="bg-slate-200 h-10 w-full mb-2 rounded"></div>
            <div className="bg-slate-200 h-10 w-full mb-2 rounded"></div>
          </div>
        ) : (
          <table className="w-full table-auto border-collapse text-left bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-slate-200 text-gray-700">
                <th className="p-3 border border-gray-300">Date</th>
                <th className="p-3 border border-gray-300">Series Name</th>
                <th className="p-3 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {matchSchedule.map((item, index) => {
                const Id =
                  item.scheduleAdWrapper?.matchScheduleList[0].matchInfo[0].seriesId;

                return (
                  <tr key={Id} className="hover:bg-slate-100 transition-colors">
                    <td className="p-3 border border-gray-300">
                      {item.scheduleAdWrapper?.date}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {item.scheduleAdWrapper?.matchScheduleList[0].seriesName}
                    </td>
                    <td
                      className="p-3 border border-gray-300 text-blue-500 cursor-pointer hover:underline"
                      onClick={() => handleView(Id)}
                    >
                      View Schedule
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      
      {weatherCast && <Weather handleClose={handleClose} seriesId={seriesId} />}
    </div>
  );
};

export default Home;
