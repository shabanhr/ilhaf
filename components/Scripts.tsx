import Script from 'next/script';
import React from 'react';

const Scripts = () => {
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
		</>
	);
};

export default Scripts;
