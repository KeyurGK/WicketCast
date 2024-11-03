import { useEffect, useState } from "react";
import AuthNavbar from "../components/AuthNavbar";
import axios from "axios";

const Home = () => {
  const [matchSchedule, setMatchSchedule] = useState([]);
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
        const response = await axios.request(options);
        const filteredData = response.data.matchScheduleMap.filter(
          (item) => item.scheduleAdWrapper
        );
        setMatchSchedule(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function
  }, []);
  // console.log(matchSchedule[0].scheduleAdWrapper?.matchScheduleList[0].matchInfo[0].seriesId)
  const handleView = (id) => {
    console.log(id);
  };
  return (
    <div>
      {/* <AuthNavbar /> */}
      Home
      {matchSchedule.map((item, index) => (
        <table
          key={
            item.scheduleAdWrapper?.matchScheduleList[0].matchInfo[0].seriesId
          }
        >
          <tbody>
            <tr>
              <td>{item.scheduleAdWrapper?.date}</td>
              <td>{item.scheduleAdWrapper?.matchScheduleList[0].seriesName}</td>

              <td onClick={handleView(key)}>View</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Home;
