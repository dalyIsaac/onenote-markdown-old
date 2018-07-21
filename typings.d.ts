declare module "*.svg";
declare module "*.png";
declare module "*.jpg";

declare module "*.json" {
  const value: any;
  export default value;
}
