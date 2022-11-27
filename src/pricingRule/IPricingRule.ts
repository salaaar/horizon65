import { ItemType } from "../Item";

/**
 * This is the interface for the pricing rules.
 * @propety name is the unique identifier of the each pricing rule.
 * @property apply is the logic that pricing rule will bring to the shopping cart.
 * All pricing rules should implement this interface.
 */
export interface IPricingRule {
  name: string;
  /**
   * This apply function will get a cart and apply the logic on the cart.
   * And will return the remained items in the cart after applying this rule and how much that items should add to the cart.
   * @param cart the items that rule should apply on it.
   * @returns the remained cart after applying the rule and add-on price after applying the rule.
   */
  apply(cart: ItemType[]): { remainedCart: ItemType[]; price: number };
}
