import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import {

  reducerClassList,
  reducerScheduleList,
  reducerStudentList,
  reducerAttendanceList,
  reducerRoomList,
  reducerAdminList,
  reducerInspectorList,
  reducerTeacherList,
  reducerUserList,
} from "./../reducer/DataReducer";
import { apiUrl,clientUrl } from "../component/constant";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  // !======================================================FOR CONTEXT========================================================//
  const [UserList, dispatchUserList] = useReducer(reducerUserList, []);

  const [TransactionList, dispatchTransactionList] = useReducer(reducerAdminList, []);


  // !======================================================Function USER========================================================//

  //Admin: Get all Users.
  const getUsers = async () => {
    try {
      const process = await axios.get(`${apiUrl}/user`);
      if (process.data.success) {
        dispatchUserList({ type: "LOAD_ALL", list: process.data.users });
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  //User: Add a new User. Input: User object
  const getTransactions = async (user) => {
    try {
      const process = await axios.post(`${apiUrl}/user`, user);
      if (process.data.success) {
        dispatchUserList({
          type: "ADD_ONE",
          user:process.data.newUser
        });
        return process.data;
      }
    } catch (error) {
      console.log("Error: ", error.message);
      return false;
    }
  };


  useEffect(() => {
    getTransactions();
  }, []);




  // *======================================================// Context data, function provider//========================================================//
  const GeneralData = {
    TransactionList,
    getTransactions
   

  };

  return (
    <DataContext.Provider value={GeneralData}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
