'use client'
import React, { useState } from "react";

export default function CompanyDataForm() {
  const [companyName, setCompanyName] = useState("");
  const [companySlogan, setCompanySlogan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Data:", companyName, companySlogan);
    // Simpan atau kirim data ke API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Company Name</label>
        <input
          type="text"
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div>
        <label className="block">Company Slogan</label>
        <input
          type="text"
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          value={companySlogan}
          onChange={(e) => setCompanySlogan(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
        Save
      </button>
    </form>
  );
}
