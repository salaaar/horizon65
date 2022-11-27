import { ItemCode, ItemName, ItemPrice } from "./enums";
import { guid } from "./utils";

/**
 * This class is for our shop items.
 */
export class Item {
  private _id: string;

  /**
   * Constructor of Item class.
   * @param _code code of the item.
   * @param _name the name of the item.
   * @param _price the price of each item.
   */
  private constructor(
    private _code: string,
    private _name: string,
    private _price: number
  ) {
    this._id = guid();
  }

  /**
   * This static function is responsible to map different itemCodes to the item instances.
   * @param itemCode The code that provided.
   * @returns The item instance.
   */
  static new(itemCode: string): ItemType {
    switch (itemCode) {
      case ItemCode.Voucher:
        return new Item(ItemCode.Voucher, ItemName.Voucher, ItemPrice.Voucher);
      case ItemCode.Mug:
        return new Item(ItemCode.Mug, ItemName.Mug, ItemPrice.Mug);
      case ItemCode.Shirt:
        return new Item(ItemCode.Shirt, ItemName.Shirt, ItemPrice.Shirt);
    }
    throw Error("The item you choose is not valid.");
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
