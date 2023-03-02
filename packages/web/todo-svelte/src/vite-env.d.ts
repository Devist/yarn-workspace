/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*.svg" {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}
