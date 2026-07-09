import i18next from 'i18next';
import zh from './zh.js'
import en from './en.js'
import tw from './tw.js'
import app from '../hono/hono';

app.use('*', async (c, next) => {
	let lang = c.req.header('accept-language');
	if (lang) {
		const primaryLang = lang.split(',')[0].split(';')[0].trim().toLowerCase();
		if (primaryLang === 'zh-tw' || primaryLang === 'zh-hk') {
			lang = 'tw';
		} else {
			lang = primaryLang.split('-')[0];
		}
	}
	i18next.init({
		lng: lang || 'zh',
	});
	return await next()
})

const resources = {
	en: {
		translation: en
	},
	zh: {
		translation: zh,
	},
	tw: {
		translation: tw,
	}
};

i18next.init({
	fallbackLng: 'zh',
	resources,
});

export const t = (key, values) => i18next.t(key, values)

export default i18next;
