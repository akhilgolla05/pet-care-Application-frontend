import React, { useEffect, useState } from "react";
import { getAggregatedAccountsByAccountStatus } from "../user/UserService";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const AccountChart = () => {
  const [accountData, setAccountData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getAccountsActivity = async () => {
      try {
        const response = await getAggregatedAccountsByAccountStatus();
        const accountActivity = response.data;

        //transform the backend-data into desired format
        const transformedData = Object.entries(accountActivity).flatMap(
          ([status, counts]) => [
            {
              name: "Active Patients",
              value: status === "Enabled" ? counts.PATIENT : 0,
              color: "#d26161",
            },
            {
              name: "Non-Active Patients",
              value: status === "Non-Enabled" ? 0 : counts.PATIENT,
              color: "#926161",
            },
            {
              name: "Active Veterinarians",
              value: status === "Enabled" ? counts.VET : 0,
              color: "#2f6a32",
            },
            {
              name: "Non-Active Veterinarians",
              value: status === "Non-Enabled" ? 0 : counts.VET,
              color: "#557a56",
            },
          ]
        );
        setAccountData(transformedData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getAccountsActivity();
  }, []);

  return (
    <div>
       <h5 className='mt-4 chart-title'>Account Activity Overview</h5>
       <ResponsiveContainer width='80%' height={400}>
         <PieChart>
           <Pie
             data={accountData}
             dataKey='value'
             nameKey='name'
             outerRadius={110}
             fill='#8884d8'
             label>
             {accountData.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={entry.color} />
             ))}
           </Pie>
           <Tooltip />
         </PieChart>
       </ResponsiveContainer>
     </div>
  );
};

export default AccountChart;
