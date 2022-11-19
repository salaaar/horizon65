import { guid } from "./utils";

/**
 * This class is for our shop items.
 * Item is parent class and we will have 3 inherited classes for each item type in our shop.
 */
export class Item {
  private _id: string;

  /**
   * Constructor of Item class.
   * @param _code code of the item.
   * @param _name the name of the item.
   * @param _price the price of each item.
   */
  constructor(
    private _code: string,
    private _name: string,
    private _price: number
  ) {
    this._id = guid();
  }

  public get id(): string {
    return this._id;
  }

  public get code(): string {
    return this._code;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }
}

export type ItemType = Item;
