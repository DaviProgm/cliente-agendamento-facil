import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    try {
      // Isso inicializa o anúncio
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5906417652861339" // <-- seu código de cliente
      data-ad-slot="XXXXXXXXXX"               // <-- insira o ID do bloco de anúncio aqui
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdBanner;
