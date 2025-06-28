const path = require('path');
const { access, mkdir, writeFile } = require('fs/promises');
const loadEnvConfig = require('@next/env').loadEnvConfig;

const publicPath = path.join(process.cwd(), 'public');
const adsTxtPath = path.join(publicPath, 'ads.txt');

const env = loadEnvConfig(process.cwd()).combinedEnv;
const adsTxtContent = `google.com, ${env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`;

const createAdsTxt = async () => {
	console.log(`📝 Creating "ads.txt"... for ${env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`);

	try {
		await access(publicPath);
	} catch (err) {
		console.log(`📁 Creating "public" folder...`);
		await mkdir(publicPath);
	}

	await writeFile(adsTxtPath, adsTxtContent);
	console.log(`✅ ads.txt created: ${adsTxtPath}`);
};

createAdsTxt();
