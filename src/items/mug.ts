import { ItemCode, ItemName, ItemPrice } from "../enums";
import { Item } from "../item";

/**
 * This class is for Mug item.
 * Here we call just parent constructor with mug item information.
 */
export class Mug extends Item {
  constructor() {
    super(ItemCode.Mug, ItemName.Mug, ItemPrice.Mug);
  }
}
