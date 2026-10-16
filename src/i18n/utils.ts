import { ui, defaultLang, type Locale } from './ui';

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Locale;
  return defaultLang;
}

export function useTranslations(lang: Locale) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang]?.[key] ?? ui[defaultLang][key] ?? key;
  };
}

export function getLocalizedPath(path: string, lang: Locale): string {
  // Normalize path
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (lang === 'ar') {
    if (cleanPath === '/' || cleanPath === '') return '/ar';
    if (cleanPath.startsWith('/ar/')) return cleanPath;
    if (cleanPath === '/ar') return '/ar';
    return `/ar${cleanPath}`;
  }

  // lang === 'en'
  if (cleanPath === '/ar' || cleanPath === '/ar/') return '/';
  if (cleanPath.startsWith('/ar/')) return cleanPath.replace(/^\/ar/, '') || '/';
  return cleanPath;
}

export function getSwitchLanguageUrl(currentUrl: URL, targetLang: Locale): string {
  return getLocalizedPath(currentUrl.pathname, targetLang);
}
