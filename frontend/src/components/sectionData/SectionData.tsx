/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Arrow from "../arrow";
import InsightsView from "../insightsView";
import { SectionsDataType } from "../../types";

interface SectionDataProps {
  sectionData: SectionsDataType;
}

const SectionsData: React.FC<SectionDataProps> = ({ sectionData }) => {
  const [isDataShowing, setIsDataShowing] = React.useState({
    isDataShowing: false,
    sectionName: "",
  });

  const {
    categorizedPhrases,
    name,
    percentage,
    readingTime,
    text,
    wordsCount,
  } = sectionData;

  return (
    <div className="flex items-start justify-start flex-col gap-8">
      <div
        className="flex items-center justify-center gap-2 underline cursor-pointer text-xl"
        onClick={() =>
          setIsDataShowing({
            isDataShowing: !isDataShowing.isDataShowing,
            sectionName: name,
          })
        }
      >
        <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        <Arrow />
      </div>

      {isDataShowing.isDataShowing && isDataShowing.sectionName === name && (
        <>
          <div>
            <textarea
              readOnly
              id={`${name}Text`}
              name={`${name}Text`}
              rows={6}
              cols={500}
              className="w-full text-lg mt-2 font-normal rounded-xl border border-white border-solid bg-transparent p-2"
              value={text}
            />
          </div>

          <div className="font-extralight text-white text-2xl">
            <h3>Tamanho com relação ao documento</h3>
            <p className="font-bold">{percentage}%</p>
          </div>

          <InsightsView
            wordsCount={wordsCount}
            readingTime={readingTime}
            categorizedPhrases={categorizedPhrases}
          />
        </>
      )}
    </div>
  );
};

export default SectionsData;
