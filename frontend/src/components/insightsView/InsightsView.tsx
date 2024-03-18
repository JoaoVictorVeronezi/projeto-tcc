import React, { useState } from "react";
import Chart from "../chart/Chart";
import { CategorizedPhrases } from "../../types";

interface InsightsViewProps {
  wordsCount: number;
  readingTime: number;
  categorizedPhrases: CategorizedPhrases;
}

const InsightsView: React.FC<InsightsViewProps> = ({
  wordsCount,
  readingTime,
  categorizedPhrases,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex gap-6 flex-col text-2xl font-extralight gap-8 text-white">
      <div>
        <h3>Quantidade de Palavras</h3>
        <p className="font-bold">{wordsCount} Palavras</p>
      </div>

      <div>
        <h3>Tempo de leitura</h3>
        <p className="font-bold">{readingTime} min</p>
      </div>

      <div>
        <h3>Categorizacao das Frases</h3>
        <button
          className="text-lg mt-2 font-normal w-[160px] h-10 rounded-xl border border-white border-solid bg-white flex justify-evenly items-center cursor-pointer hover:bg-transparent text-black hover:text-white transition-all duration-300 ease-in-out"
          onClick={() => setIsModalOpen(true)}
        >
          Mostrar Gráfico
        </button>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative top-20 mx-auto p-5 border w-3/4  shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center h-3/4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Quantidade de Palavras por Frase
                </h3>
                <Chart categorizedPhrases={categorizedPhrases} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsView;
