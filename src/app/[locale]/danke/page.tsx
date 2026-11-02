export { generateMetadata, default } from '../thank-you/page';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'de' }];
}
