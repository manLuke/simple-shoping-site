export type Product = {
  id: number;
  price: number;
  title: string;
  description?: string;
  img_src: string;
};

export type AdminProduct = {
  id: number;
  price: number;
  title: string;
  description: string;
  img_src: string;
  is_visible: boolean;
}

export type selectedProduct = {
  id: number;
  quantity: any;
};

export enum requestType {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update'
}