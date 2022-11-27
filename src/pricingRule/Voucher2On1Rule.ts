import { ItemCode } from "../enums";
import { ItemType } from "../Item";
import { IPricingRule } from "./IPricingRule";

class Voucher2On1Rule implements IPricingRule {
  name: string = "Voucher 2 On 1";

  /**
   * This apply function will get a cart and apply the logic on the cart.
   * And will return the remained items in the cart after applying this rule and how much that items should add to the cart.
   * Algorithm
   *  1. remove all even indexed vouchers
   *  2. add no price to the cart.
   * @param cart the items that rule should apply on it.
   * @returns the remained cart after applying the rule and add-on price after applying the rule.
   */
  apply(cart: ItemType[]): { remainedCart: ItemType[]; price: number } {
    const vouchers = cart.filter((item) => item.code === ItemCode.Voucher);

    return {
      remainedCart: [
        ...cart.filter((item) => item.code !== ItemCode.Voucher),
        ...vouchers.filter((_, index) => index % 2 === 0),
      ],
      price: 0,
    };
  }
}

export const voucher2On1Rule: IPricingRule = new Voucher2On1Rule();
