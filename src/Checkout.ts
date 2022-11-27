import { Item, ItemType } from "./Item";
import { Pricing, PricingType } from "./Pricing";
import defaultPricingRules from "./pricingRule/pricingRules";
import { IPricingRule } from "./pricingRule/IPricingRule";
/**
 * Checkout class is the main class for our shop.
 * For each checkout instance we have two property. cart and pricing.
 * The cart will include the items by scanning them and the pricing will represent the pricing rules should apply on this checkout.
 */
export class Checkout {
  private cart: ItemType[] = [];
  private pricing: PricingType;

  /**
   * We create our checkout instance with custom pricing configuration.
   * This design make checkout independent from the pricing configuration,
   * so each instansation of checkout class can used with different pricing rules.
   * In same time, we can have different checkouts with different pricing rules.
   * @param pricingRules the pricing rules that should apply for calculating the total price of the cart.
   */
  private constructor(pricingRules: IPricingRule[]) {
    this.pricing = new Pricing(pricingRules);
  }

  /**
   * Since we want to follow the pattern to create new instance of the checkout with Checkout.new as in the documentation.
   * We hide constructor for the external usages and all other files should use Checkout.new for create an instance of checkout.
   * @param pricingRules the custom rules that should apply on the cart.
   * @returns a checkout instance.
   */
  public static new(pricingRules: IPricingRule[] = defaultPricingRules) {
    return new Checkout(pricingRules);
  }

  /**
   * This function will use to add an item to the cart.
   * @param itemCode the code of the item will map to item instance to be added to the cart.
   */
  scan(itemCode: string) {
    this.cart.push(Item.new(itemCode));
  }

  /**
   * This function is responsible to calculate the total price of the cart by applying pricing rules.
   * @returns the total price of the cart by applying all sorts of the pricing rules.
   */
  total(): number {
    return this.pricing.apply(this.cart);
  }
}
