/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import InsightsView from "../../components/insightsView/InsightsView";
import Arrow from "../../components/arrow";
import SectionsData from "../../components/sectionData/SectionData";
import { CompleteTextType, SectionsDataType } from "../../types";

const Insights = () => {
  const [format, setFormat] = React.useState("Formatos");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [sectionsData, setSectionsData] = React.useState<SectionsDataType[]>();
  const [completeTextData, setCompleteTextData] =
    React.useState<CompleteTextType>({} as CompleteTextType);
  const { state } = useLocation();

  useEffect(() => {
    if (!state) return;
    setSectionsData(
      state.data.sections_data.map((data: any) => {
        return {
          categorizedPhrases: data.categorized_phrases,
          name: data.name,
          percentage: data.percentage,
          readingTime: data.reading_time,
          text: data.text,
          wordsCount: data.words_count,
        };
      })
    );
    setCompleteTextData({
      categorizedPhrases: state.data.categorized_phrases,
      readingTime: state.data.reading_time,
      language: state.data.language,
      wordsCount: state.data.words_count,
    });
  }, [state]);

  const formats = ["BNT", "APA", "Chicago", "Harvard", "MLA", "Vancouver"];

  return (
    <section className="flex h-screen">
      <aside className="w-2/6 overflow-y-auto border-r border-white flex-shrink-0 flex flex-col p-7 text-2xl font-extralight gap-8 text-white">
        <div>
          <h3>Qual formato você está usando?</h3>
          <div className="text-lg mt-2 font-normal">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-[160px] h-10 rounded-xl border border-white border-solid bg-white flex justify-evenly items-center cursor-pointer hover:bg-transparent text-black hover:text-white transition-all duration-300 ease-in-out"
            >
              {format}
              <Arrow />
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white border border-gray-200 rounded-xl text-black">
                {formats.map((f) => (
                  <div
                    key={f}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setFormat(f);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {f}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <h3>Lingua utilizada</h3>
          <p className="font-bold">Ingles</p>
        </div>

        <div>
          <h2 className="text-3xl mb-8">Texto Completo</h2>
          <InsightsView
            wordsCount={completeTextData.wordsCount}
            readingTime={completeTextData.readingTime}
            categorizedPhrases={completeTextData.categorizedPhrases}
          />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto flex items-start justify-start flex-col p-7 gap-8">
        <h3 className="text-3xl font-extralight">Seções</h3>
        {sectionsData &&
          sectionsData?.map((sectionData) => (
            <SectionsData sectionData={sectionData} />
          ))}
      </main>
    </section>
  );
};

export default Insights;
