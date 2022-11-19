import { ItemCode, ItemName, ItemPrice } from "../enums";
import { Item } from "../item";

/**
 * This class is for voucher item.
 * Here we call just parent constructor with voucher item information.
 */
export class Voucher extends Item {
  constructor() {
    super(ItemCode.Voucher, ItemName.Voucher, ItemPrice.Voucher);
  }
}
