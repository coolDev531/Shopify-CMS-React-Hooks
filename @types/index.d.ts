declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
