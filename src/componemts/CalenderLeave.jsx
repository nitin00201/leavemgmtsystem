import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Calender, {} from './Calender'

const CalenderLeave = () => {
  const id1 = localStorage.getItem("id1")
  const [leaveById, setLeavebyId] = useState([])

  useEffect(() => {
    const fetchLeave = async () => {
      const res = await axios.get("http://localhost:8081/api/leave/")
      const data = res.data
      const leave1 = data.filter(el => el.uid == id1 && el.status !== "PENDING");
      console.log(leave1)
      const ids = leave1.map(obj => obj.id);

      setLeavebyId(ids)
    }
    fetchLeave();
  }, [id1])

  return (
    <div>
      {
        leaveById.map((id) => (
          <Calender leaveId={id} key={id} />
        ))
      }
    </div>
  )
}

export default CalenderLeave