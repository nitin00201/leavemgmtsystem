import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Calender, {} from './Calender'

const CalenderLeave = () => {
  const id1 = localStorage.getItem("id1")
  const [leaveById, setLeavebyId] = useState([])

  const days = localStorage.getItem("days")
  console.log("the remaining day in calender is",days);

  const[balance,setBalance] = useState(0);


useEffect(()=>{
  const fetchBal = async ()=>{
    const response = await axios.get(`http://localhost:8081/api/leave/count/${id1}`)
    const data = response.data
    console.log("in calender leave form days are",response)
    console.log(data);
    setBalance(data)
    localStorage.setItem("remainingBalance",days-data)
  }
  fetchBal();
},[id1])

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
  <p className='font-bold text-3xl text-center mt-8 mb-5'>Your Leave Balance</p>
  <div className='flex items-center '>
    <div className='w-52 h-48 border-4 border-blue-600 rounded-xl mx-auto p-3'>
   <p className='font-semibold text-3xl'>Total taken:</p>
   <p className='font-bold text-4xl text-blue-900 text-center m-8'>{balance}</p>
    </div>
    <div className='w-52 h-48 border-4 border-blue-600 rounded-xl mx-auto p-3'>
   <p className='font-semibold text-3xl'>Remaining leave:</p>
   <p className='font-bold text-4xl text-blue-900 text-center m-8'>{(days-balance) < 0 ? 0 :days-balance}</p>
    </div>
  </div>
      {
        leaveById.map((id) => (
          <Calender leaveId={id} key={id} />
        ))
      }
    </div>
  )
}

export default CalenderLeave