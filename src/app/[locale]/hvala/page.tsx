export { generateMetadata, default } from '../thank-you/page';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'hr' }, { locale: 'sl' }];
}
