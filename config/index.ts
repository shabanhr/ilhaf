export const siteName = 'Ilhaf';
export const siteDescription = 'An Online Diary For Reciters';
export const domain = `ilhaf.com`;
export const siteLink = `https://${domain}`;
export const siteEmail = `salam@${domain}`;
export const Emailfrom = `${siteName} <${siteEmail}>`;
export const drive = `https://d.${domain}`;
export const LYRICS_PER_PAGE = 12;

export const publisher = {
	'@type': 'Organization',
	name: siteName,
	logo: {
		'@type': 'ImageObject',
		url: `${siteLink}/logo.png`,
	},
};

export const providers = ['google'];
