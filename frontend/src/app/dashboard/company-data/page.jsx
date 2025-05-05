"use client";
import { useEffect, useState } from "react";
import { Auth } from "../lib/auth";
import Container from "../components/Container";
import EditButton from "../components/EditButton";
import SaveCancelButtons from "../components/SaveCancelButton";
import FormInput from "../components/FormInput";

const fields = [
  { label: "Name", name: "name" },
  { label: "Slogan", name: "slogan" },
  { label: "About", name: "about" },
  { label: "Email", name: "email" },
  { label: "Phone", name: "phone" },
];

export default function CompanyDataPage() {
  const [company, setCompany] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
  });

  useEffect(() => {
    // Simulate fetching company data from API
    const fetchCompany = async () => {
      const companyData = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/company/1`
      ).then((res) => res.json());
      setCompany(companyData.data);
      setFormData(companyData.data);
    };

    fetchCompany();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    console.log("Saving data:", formData);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/company/1`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      console.error("Failed to save data:", result);
      alert("Failed to save data. Please try again.");
      return;
    }
    alert("Data saved successfully!");

    setCompany(formData);
    setEditMode(false);
  };

  if (!company) return <p className="p-6">Loading...</p>;

  return (
    <Container>
      <h2 className="text-2xl font-semibold mb-4">Company Data</h2>
      {!editMode ? (
        <div className="bg-white rounded-md shadow p-6 space-y-4 border border-gray-200">
          {fields.map((field) => (
            <div key={field.name} className="grid grid-cols-4 gap-4">
              <div className="font-medium text-gray-700">{field.label}</div>
              <div className="col-span-3 text-gray-900">
                {company[field.name]}
              </div>
            </div>
          ))}

          <EditButton
            onClick={() => {
              setFormData(company); // clone current company data
              setEditMode(true);
            }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          ))}
          <div className="space-x-2">
            <SaveCancelButtons
              onSave={handleSave}
              onCancel={() => setEditMode(false)}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
