import React, { useState } from 'react';
import './LeaveForm.css';


function LeaveForm() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    errors: {},
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const newErrors = {};

    

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required.';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required.';
    }

    if (!formData.reason) {
      newErrors.reason = 'Reason for leave is required.';
    }

    if (Object.keys(newErrors).length === 0) {
      // Submit the leave request to the API
      console.log(formData);
    } else {
      setFormData({ ...formData, errors: newErrors });
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      errors: {},
    });
  };

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date:</label>
  <input
    type="date"
    id="startDate"
    name="startDate"
    value={formData.startDate}
    onChange={handleChange}
  />
  {formData.errors.startDate && <p>{formData.errors.startDate}</p>}

  <label htmlFor="endDate">End Date:</label>
  <input
    type="date"
    id="endDate"
    name="endDate"
    value={formData.endDate}
    onChange={handleChange}
  />
  {formData.errors.endDate && <p>{formData.errors.endDate}</p>}

  <label htmlFor="reason">Reason for Leave:</label>
  <textarea
    id="reason"
    name="reason"
    value={formData.reason}
    onChange={handleChange}
  />
  {formData.errors.reason && <p>{formData.errors.reason}</p>}

  <button type="submit">Submit Leave Request</button>
</form>
  );
}

export default  LeaveForm;