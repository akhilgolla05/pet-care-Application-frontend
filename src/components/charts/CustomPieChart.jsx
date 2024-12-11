import React from "react";
import useColorMapping from "../hook/ColorMapping";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CustomPieChart = ({
  data,
  datakey = "value",
  nameKey = "name",
  width = "80%",
  height = 400,
}) => {
  const colors = useColorMapping();
  return (
    <section className="mb-5 mt-5">
      <h4 className="text-center mt-4">Appointment Overview</h4>

      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie
            dataKey={datakey}
            data={data}
            label={({ [nameKey]: name }) => name}
          >
            {data &&
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.name]} />
              ))}
          </Pie>
          <Tooltip/>
          <Legend layout="vertical"/>
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
};

export default CustomPieChart;
