import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log(files[0]);
      setFile(files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch("http://127.0.0.1:8000/uploadfile", {
          headers: {
            // This will change
            "Access-Control-Allow-Origin": "*",
          },
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        navigate("/insights", { state: { data } });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center h-3/6 w-full gap-6">
        <h1 className="text-5xl font-thin">
          Plataforma de Suporte Acadêmico e Revisão de Textos
        </h1>
        <h2 className="text-5xl font-bold">PSART</h2>
      </div>

      <div className="flex flex-col justify-center items-center h-3/6 w-full gap-8">
        <div>
          <label
            htmlFor="fileId"
            className="w-[180px] h-10 rounded-xl border border-white border-solid flex justify-center items-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
          >
            <span className="font-regular text-lg">Escolha seu arquivo</span>
          </label>

          <input
            type="file"
            id="fileId"
            style={{ display: "none" }}
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        {file && (
          <>
            <a onClick={handleFileUpload}>
              <div className="w-[180px] h-10 rounded-xl border border-white border-solid bg-white flex justify-center items-center cursor-pointer hover:bg-transparent text-black hover:text-white transition-all duration-300 ease-in-out">
                <span className="font-regular text-lg">Enviar</span>
              </div>
            </a>
            <p>{file?.name}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default Main;
