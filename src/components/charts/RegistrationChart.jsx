import React, { useEffect, useState } from 'react'
import { getAggregateUsersByMonthAndType } from '../user/UserService';
import {Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const RegistrationChart = () => {
    const [userData, setUserData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(()=>{

        const getUsers = async ()=>{
            try{
                const response = await getAggregateUsersByMonthAndType();
                const userData = response.data
                console.log(userData)
                //transform the backend data into desired format
                const transformedData = Object.entries(userData)
                    .map(([month, counts])=>{
                        return {
                            name:month,
                            veterinarians:counts.VET || 0,
                            patients:counts.PATIENT || 0 

                        };
                });
                setUserData(transformedData);
            }catch(error){
                setErrorMessage(error.message);
            }
        }
        getUsers();
    },[])

  return (
    <ResponsiveContainer width={"60%"} height={400}>
            <h5 className='chart-title mb-5'>Users Registration</h5>
            <BarChart data={userData}>
                <XAxis dataKey='name' angle={-50} textAnchor='end' height={70}/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey={"veterinarians"} fill="#2f6a32"/>
                <Bar dataKey={"patients"} fill="#d26161"/>
            </BarChart>

    </ResponsiveContainer>
  )
}

export default RegistrationChart
