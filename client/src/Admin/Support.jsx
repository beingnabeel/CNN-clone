import React, { useState, useEffect } from "react";
import axios from "axios";

const SupportForm = ({ userRole }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [supportDetails, setSupportDetails] = useState([]); // State to store support details from the database
  const [submitting, setSubmitting] = useState(false);
  const [role, setRole] = useState(userRole);

  useEffect(() => {
    // Fetch support details from the database
    const fetchSupportDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/support");
        setSupportDetails(response.data);
      } catch (error) {
        console.error("Error fetching support details:", error.response.data);
      }
    };

    fetchSupportDetails();
  }, []); // Run this effect only once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log("formData is: ", formData);
      const response = await axios.post(
        "http://localhost:8080/api/support",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      setSubmittedData(formData);
      // Fetch the latest support details after successful submission
      const updatedSupportDetails = await axios.get(
        "http://localhost:8080/api/support"
      );
      setSupportDetails(updatedSupportDetails.data);
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-18" style={{ marginTop: "100px" }}>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Support Form</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-600"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-600"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border rounded-md"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {/* Display submitted data */}
      {submittedData && (
        <div className="mt-8 p-5">
          <h2 className="text-xl font-bold mb-4">Submitted Details</h2>
          <ul>
            <li>
              <strong>Name:</strong> {submittedData.name}
            </li>
            <li>
              <strong>Email:</strong> {submittedData.email}
            </li>
            <li>
              <strong>Subject:</strong> {submittedData.subject}
            </li>
            <li>
              <strong>Message:</strong> {submittedData.message}
            </li>
          </ul>
        </div>
      )}

      {/* Display support details in a table */}
      {supportDetails.length > 0 && userRole && userRole === "Admin" && (
        <div className="mt-8 p-5">
          <h2 className="text-xl font-bold mb-4">Latest Support Details</h2>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Serial No</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Subject</th>
                <th className="py-2 px-4 border-b">Message</th>
              </tr>
            </thead>
            <tbody>
              {supportDetails.map((detail, index) => (
                <tr key={detail._id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{detail.name}</td>
                  <td className="py-2 px-4 border-b">{detail.email}</td>
                  <td className="py-2 px-4 border-b">{detail.subject}</td>
                  <td className="py-2 px-4 border-b">{detail.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SupportForm;
