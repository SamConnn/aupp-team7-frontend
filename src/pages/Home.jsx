import axios from "axios";
import { useEffect, useState } from "react";
import AddDiary from "../components/AddDiary";
import DiaryList from "../components/DiaryList";
import Loading from "../components/Loading";
import Filter from "../components/Filter";
import DatePick from "../components/DatePicker";

const Home = () => {
  const [diary, setDiary] = useState();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const url = process.env.API_URL || "http://localhost:8090/v1/diaries";

  const getData = async () => {
    try {
      const { data } = await axios.get(url);
      setDiary(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addDiary = async (tutorial) => {
    try {
      await axios.post(url, tutorial);
    } catch (error) {
      console.log(error);
    }
    getData();
  };

  const deleteDiary = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.log(error);
    }
    getData();
  };

  //Update
  const editDiary = async (id, title, desc) => {
    const filtered = diary
      .filter((tutor) => tutor.diaryID === id)
      .map((tutor) => ({ title: title, text: desc }));

    try {
      await axios.put(`${url}/${id}`, filtered[0]);
    } catch (error) {
      console.log(error);
    }
    getData();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <AddDiary addTutorial={addDiary} />
          <Filter setFilter={setFilter} />
          <DatePick startDate={startDate} setStartDate={setStartDate} />
          <DiaryList
            startDate={startDate}
            filter={filter}
            diary={diary}
            deleteDiary={deleteDiary}
            // editTutorial={editTutorial}
          />
        </>
      )}
    </>
  );
};

export default Home;
