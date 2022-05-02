import { useEffect } from "react";

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    console.log("URL: ", url);
    console.log("Script: ", script.src);
    // document.body.append(script);
    // const script = document.createElement("script");

    // script.src = url;
    // script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useScript;
