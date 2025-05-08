"use client";
import {useEffect, useState} from "react";
import Container from "../components/Container";
import EditButton from "../components/EditButton";
import SaveCancelButtons from "../components/SaveCancelButton";
import FormInput from "../components/FormInput";
import axiosInstance from "@dashboard/utils/axiosInstance";

const fields = [
    {label: "Name", name: "name"},
    {label: "Slogan", name: "slogan"},
    {label: "About", name: "about"},
    {label: "Email", name: "email"},
    {label: "Phone", name: "phone"},
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
        void (async () => {
            const companyData = (await axiosInstance.get(
                `/company/1`
            )).data
            setCompany(companyData.data);
            setFormData(companyData.data);
        })();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        console.log("Saving data:", formData);
        try {
            const response = await axiosInstance.put(
                `/company/1`,{...formData}
            );

            alert("Data saved successfully!");

            setCompany(formData);
            setEditMode(false);
        } catch (e) {
            console.error(e);
            alert("Error saving data", e.toString());
        }
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
