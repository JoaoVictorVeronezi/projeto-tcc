// Chart.js or within your Insights.js file
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CategorizedPhrases } from "../../types";

interface ChartProps {
  categorizedPhrases: CategorizedPhrases;
}
const Chart: React.FC<ChartProps> = ({ categorizedPhrases }) => {
  const data = [
    { name: "Menos de 3", total: categorizedPhrases.less_than_3_words },
    { name: "Entre 3 e 5", total: categorizedPhrases.between_3_and_5_words },
    { name: "Entre 5 e 10", total: categorizedPhrases.between_5_and_10_words },
    { name: "Mais de 10", total: categorizedPhrases.more_than_10_words },
    { name: "Menos de 25", total: categorizedPhrases.less_than_25_words },
    {
      name: "Entre 25 e 74",
      total: categorizedPhrases.between_25_and_74_words,
    },
    {
      name: "Entre 75 e 160",
      total: categorizedPhrases.between_75_and_160_words,
    },
    { name: "Mais de 160", total: categorizedPhrases.more_than_160_words },
    {
      name: "Marcas de Pontuação",
      total: categorizedPhrases.punctuation_marks,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 20 }}
          angle={-45}
          textAnchor="end"
          height={200}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Chart;
