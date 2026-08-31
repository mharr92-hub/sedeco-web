import Script from "next/script";
import {
  getDirectGa4MeasurementId,
  getGtmContainerId,
} from "@/lib/analytics";

export function DataLayerInit() {
  const gtmId = getGtmContainerId();
  const ga4Id = getDirectGa4MeasurementId();

  return (
    <>
      <Script id="sedeco-datalayer" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:"dl_init"});`}
      </Script>
      {gtmId ? (
        <Script id="sedeco-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':Date.now(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}
      {ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="sedeco-ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}',{send_page_view:true});`}
          </Script>
        </>
      ) : null}
    </>
  );
}

export function GtmNoscript() {
  const gtmId = getGtmContainerId();
  if (!gtmId) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        className="hidden"
        title="Google Tag Manager"
      />
    </noscript>
  );
}
