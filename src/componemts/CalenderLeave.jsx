import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Calender from './Calender'

const CalenderLeave = () => {
  const id1 = localStorage.getItem("id1")
  const [leaveById, setLeavebyId] = useState([])
  const days = localStorage.getItem("days")
  const [balance, setBalance] = useState(0)
  const [sickLeave, setSickLeave] = useState(0)
  const [vacationLeave, setVacationLeave] = useState(0)

  useEffect(() => {
    const fetchBal = async () => {
      const response = await axios.get(`http://localhost:8081/api/leave/count/${id1}`)
      const data = response.data
      setBalance(data)
      localStorage.setItem("remainingBalance", days - data)
    }
    fetchBal()
  }, [id1])

  useEffect(() => {
    const fetchLeave = async () => {
      const res = await axios.get("http://localhost:8081/api/leave/")
      const data = res.data
      const leave1 = data.filter(el => el.uid == id1 && el.status !== "PENDING")
      const ids = leave1.map(obj => obj.id)
      setLeavebyId(ids)
    }
    fetchLeave()
  }, [id1])

  useEffect(() => {
    const fetchSickLeave = async () => {
      const res = await axios.get(`http://localhost:8081/api/leave/count/sick/${id1}`)
      const data = res.data
      setSickLeave(data)
    }
    fetchSickLeave()
  }, [id1])

  useEffect(() => {
    const fetchVacationLeave = async () => {
      const res = await axios.get(`http://localhost:8081/api/leave/count/vacation/${id1}`)
      const data = res.data
      setVacationLeave(data)
    }
    fetchVacationLeave()
  }, [id1])

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
      <div className="max-w-3xl mx-auto p-8 bg-white bg-opacity-20 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Your Leave Balance</h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
          {/* Remaining leave */}
          <div className="p-6 bg-white bg-opacity-25 rounded-xl shadow-md">
            <p className="text-lg font-semibold">Remaining Leave</p>
            <p className="text-2xl font-bold mt-2">
              {(days - balance) < 0 ? 0 : days - balance}
            </p>
          </div>

          {/* Other Leave */}
          <div className="p-6 bg-white bg-opacity-25 rounded-xl shadow-md">
            <p className="text-lg font-semibold">Other Leave</p>
            <p className="text-2xl font-bold mt-2">
              {balance - sickLeave - vacationLeave}
            </p>
          </div>

          {/* Sick Leave */}
          <div className="p-6 bg-white bg-opacity-25 rounded-xl shadow-md">
            <p className="text-lg font-semibold">Sick Leave</p>
            <p className="text-2xl font-bold mt-2">
              {sickLeave}
            </p>
          </div>

          {/* Vacation Leave */}
          <div className="p-6 bg-white bg-opacity-25 rounded-xl shadow-md">
            <p className="text-lg font-semibold">Vacation Leave</p>
            <p className="text-2xl font-bold mt-2">
              {vacationLeave}
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4">Leave History</h3>
        <ul className="space-y-4">
          {leaveById.map((id) => (
            <li key={id} className="p-4 bg-white bg-opacity-25 rounded-xl shadow-md">
              <p>Leave ID: {id}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CalenderLeave
