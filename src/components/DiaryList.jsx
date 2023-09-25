import { AiFillDelete } from "react-icons/ai";
import moment from "moment";

const DiaryList = ({ diary, deleteDiary, editDiary, filter, startDate }) => {
  if (filter === "ascending") {
    diary.sort((a, b) => {
      return new Date(a.createdDate) - new Date(b.createdDate);
    });
  } else if (filter === "descending") {
    diary.sort((a, b) => {
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
  }
  const formatDate = moment(startDate).format();

  const filtered = diary.filter((item) => {
    // split only day month and year
    const start = item.createdDate.split("T")[0];
    const end = formatDate.split("T")[0];

    return start === end;
  });


  return (
    <div className="container mt-4">
      <table className="table table-dark fs-5 table-striped">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Created Date</th>
            <th scope="col" className="text-center text-nowrap">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered?.map((item) => {
            const { diaryID, title, text, createdDate } = item;
            const date = moment(createdDate).format("MMMM Do YYYY, h:mm:ss a");
            return (
              <tr key={diaryID}>
                <th>{diaryID}</th>
                <td>{title}</td>
                <td>{text}</td>
                <td>{date}</td>
                <td className="text-center">
                  {/* <FaEdit 
                  size={20} 
                  className="me-3 text-info cursor " 
                  data-bs-toggle="modal" 
                  data-bs-target="#edit-modal"
                  onClick={()=> 
                    setItem(item)
                 } /> */}
                  <AiFillDelete
                    size={22}
                    className="text-danger cursor"
                    onClick={() => {
                      deleteDiary(item.diaryID);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <EditItem editTutorial={editDiary} item={item} /> */}
    </div>
  );
};

export default DiaryList;
