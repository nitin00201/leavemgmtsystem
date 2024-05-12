import React, { useEffect, useState } from 'react';
import './LeaveForm.css';
import axios from 'axios';

function LeaveForm() {
  const id1 = localStorage.getItem("id1")
  console.log(id1)
  const da = localStorage.getItem("userType1")



  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    leaveCause: '',
    status:"PENDING",
    uid: parseInt(id1),
    departmentName:da,
    leaveType:"",
  });

  const [errors, setErrors] = useState({});

  const bal = localStorage.getItem("remainingBalance")




  const handleSubmit = async (event) => {
    event.preventDefault();

    const date1 = new Date(formData.startDate);
    const date2 = new Date(formData.endDate);
    const differenceInMilliseconds = date2 - date1;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);


    if (differenceInDays < bal ) {
      
      try {
        const response = await axios.post('http://localhost:8081/api/leave/',formData)
        alert(`leave has been sent.\n Your id is : ${response.data.id}`)
        console.log("leave user ",response.data.uid);
    } catch (error) {
        console.log(error)
    }
    console.log(formData);

    } else {
      alert("No holiday available")
      
    }

 

  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: '', // Clear the error when the field is changed
    });
  };

  return (
    <>
      <form className='border-2 w-[35%] mx-auto rounded-lg flex flex-col gap-2 shadow-lg shadow-gray-700 p-1 mb-14' onSubmit={handleSubmit}>
      <h1 className='text-center font-bold text-3xl bg-blue-500 w-full rounded-t-xl h-10 '>Leave Form</h1>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
        {errors.startDate && <p>{errors.startDate}</p>}

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
        {errors.endDate && <p>{errors.endDate}</p>}

        <label htmlFor="leaveType">Reason for Leave:</label>
<select
  className='p-1 w-[58%] border-2 rounded-md h-10'
  id="leaveType"
  name="leaveType"
  value={formData.leaveType}
  onChange={handleChange}
>
  <option value="">Select a reason</option>
  <option value="sick">Sick</option>
  <option value="vacation">Vacation</option>
  <option value="personal">Personal</option>
</select>


        <label htmlFor="leaveCause">Reason for Leave:</label>
        <textarea
        className='p-1'
          id="leaveCause"
          name="leaveCause"
          value={formData.leaveCause}
          onChange={handleChange}
        />
        {errors.reason && <p>{errors.reason}</p>}

        <button type="submit" className='bg-blue-400 p-1 my-5'>Submit Leave Request</button>
      </form>
    </>
  );
}

export default LeaveForm;
