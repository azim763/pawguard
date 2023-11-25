import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,

} from "recharts";
import styles from "./graph.module.css";

const Graph = ({ names, values, label,startRange,endRange }) => {
  const data = names.map((name, index) => ({
    name,
    value: values[index],
  }));

  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line
            type="linear"
            dataKey="name"
            name={label}
            stroke="var(--salmon-pink)"
            fill="var(--salmon-pink)"
            dot={{ strokeWidth: 7 }}
          />
          <XAxis tickLine={false} padding={{ left: 20 }}  dataKey="value" />
          <YAxis tickLine={false} type="number" domain={[startRange, endRange]} padding={{ bottom: 20 }}/>
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
