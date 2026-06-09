declare module 'react-map-gl';
declare module 'mapbox-gl';

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}