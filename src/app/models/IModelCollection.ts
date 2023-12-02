import { IBrand } from "./IBrand"
import { IModel } from "./IModel";

export interface IModelCollection{
    id: string;
    brand: IBrand;
    models: Array<IModel>
}