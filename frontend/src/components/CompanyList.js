import React, { useEffect, useState } from "react";
import axios from "axios";

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get("/api/companies")
      .then(response => setCompanies(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Companies</h2>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            {company.name} - {company.industry} ({company.location})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
