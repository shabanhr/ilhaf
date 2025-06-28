import React from 'react';
import Script from 'next/script';

export function CustomScripts() {
	return (
		<>
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
			/>

			<Script id="ga-script" strategy="lazyOnload">
				{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
				  page_path: window.location.pathname,
				});
				`}
			</Script>
			<Script
				async={true}
				id="google-adsense"
				src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
				strategy="afterInteractive"
				crossOrigin="anonymous"
			/>
		</>
	);
}
