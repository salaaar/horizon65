import { ItemCode } from "../enums";
import { Item, ItemType } from "../Item";
import { IPricingRule } from "./IPricingRule";

/**
 * 3 or More than 3 T-shirt pricing rule that implements IPricingRule.
 */
class Tshirt3MoreRule implements IPricingRule {
  name: string = "T-Shirt 3 or More";

  /**
   * This apply function will get a cart and apply the logic on the cart.
   * And will return the remained items in the cart after applying this rule and how much that items should add to the cart.
   * Algorithm
   *  1. remove all tshirt items(if they are >= 3)
   *  2. add SHIRT_PRICE_AFTER_DISCOUNT * count of them to the cart price.
   * @param cart the items that rule should apply on it.
   * @returns the remained cart after applying the rule and add-on price after applying the rule.
   */
  apply(cart: ItemType[]): { remainedCart: ItemType[]; price: number } {
    const SHIRT_PRICE_AFTER_DISCOUNT: number = 19;
    const shirts = cart.filter((item) => item.code === ItemCode.Shirt);

    if (shirts.length >= 3) {
      return {
        remainedCart: cart.filter((item) => item.code !== ItemCode.Shirt),
        price: shirts.length * SHIRT_PRICE_AFTER_DISCOUNT,
      };
    }

    return {
      remainedCart: cart,
      price: 0,
    };
  }
}

export const tshirt3MoreRule: IPricingRule = new Tshirt3MoreRule();
