import { ItemCode, ItemName, ItemPrice } from "../enums";
import { Item } from "../item";

/**
 * This class is for Shirt item.
 * Here we call just parent constructor with shirt item information.
 */
export class TShirt extends Item {
  constructor() {
    super(ItemCode.Shirt, ItemName.Shirt, ItemPrice.Shirt);
  }
}
