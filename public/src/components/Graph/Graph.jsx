import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const Graph = ({ names, values }) => {

    const data = names.map((name, index) => ({
        name,
        value: values[index],
      }));
    return (
        <div>
           <LineChart width={400} height={300} data={data}>
    <Line type="monotone" dataKey="name" stroke="#8884d8" />
    <XAxis dataKey="value" />
    <YAxis />
    <Tooltip />
    <Legend />
</LineChart>

        </div>
    )
}

export default Graph
