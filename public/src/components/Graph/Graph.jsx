import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const Graph = () => {
    const data = [
        { name: 'Jan', value: 10 },
        { name: 'Feb', value: 15 },
        { name: 'Mar', value: 12 },
        { name: 'Apr', value: 20 },
        { name: 'May', value: 18 },
        { name: 'Jun', value: 25 },
      ];
    return (
        <div>
            <LineChart width={400} height={300} data={data}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </div>
    )
}

export default Graph
