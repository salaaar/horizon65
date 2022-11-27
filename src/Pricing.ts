import { ItemType } from "./Item";
import { IPricingRule } from "./pricingRule/IPricingRule";

/**
 * Pricing class is abstraction for applying pricing rules to specific cart.
 * The pricing abstraction is independent from pricing rules and get them while instantiation.
 */
export class Pricing {
  private pricingRules: IPricingRule[] = [];

  /**
   * constructor of the Pricing class.
   * @param pricingRules the custom pricing rules should apply be used to calculate the cart price.
   */
  constructor(pricingRules: IPricingRule[]) {
    this.preparePricingRules(pricingRules);
  }

  /**
   * This is responsible for preparing pricing rules from the provided configuration.
   * @param pricingRules the pricing rules.
   */
  preparePricingRules(pricingRules: IPricingRule[]) {
    this.pricingRules.push(...pricingRules);
  }

  /**
   * The core alghorithm for price calculation happens here.
   * Alghorithm:
   * 1. Will create multiple possible sequence of the pricing rules that should apply to the cart.
   *    In some set of rules it may differ that you apply which one the first.
   *    So we create all possible sequences of the pricing rules.
   * 2. Will run the calculate price for the cart with each sequence of the pricing rules.
   * 3. Find the minimum price and return it as the cart price.
   * @param cart The checkout cart that should calculate the price for the cart.
   * @returns The price of the cart.
   */
  apply(cart: ItemType[]): number {
    const allSortOfPricingRules: IPricingRule[][] = this.getAllSorts(
      this.pricingRules
    );
    let minimumPrice = this.calculatePrice([], cart);
    for (const singleSortOfPricingRules of allSortOfPricingRules) {
      const calculatedPrice = this.calculatePrice(
        singleSortOfPricingRules,
        cart
      );
      if (minimumPrice > calculatedPrice) {
        minimumPrice = calculatedPrice;
      }
    }

    return minimumPrice;
  }

  /**
   * A private method for crerating the all possible sorts of the pricing rules.
   * for example if you have rules A, B, C this will return
   * [
   *    [A,B,C],
   *    [A,C,B],
   *    [B,A,C],
   *    [B,C,A],
   *    [C,A,B],
   *    [C,B,A],
   * ]
   * @param pricingRules the pricing rules.
   * @returns Array of Arrays of the rules
   */
  private getAllSorts(pricingRules: IPricingRule[]): IPricingRule[][] {
    return this.calculateSorts([], pricingRules);
  }

  /**
   * This is the recursive function to create all sequence of the pricing rules.
   * Alghorithm:
   * 1. f([], [A, B, C])
   * 2. the first one will call f([A], [B,C]), f([B], [A,C]), f([C], [B,C])
   * 3. and will continue until the remained array get empty.
   * @param current the current array of the pricing rules that has processed.
   * @param remained the remained array should process.
   * @returns
   */
  private calculateSorts(
    current: IPricingRule[],
    remained: IPricingRule[]
  ): IPricingRule[][] {
    const allSorts: IPricingRule[][] = [];
    if (!remained.length) return [current];
    for (const remainedItem of remained) {
      allSorts.push(
        ...this.calculateSorts(
          [...current, remainedItem],
          remained.filter((item) => item.name !== remainedItem.name)
        )
      );
    }
    return allSorts;
  }

  /**
   * This function should calculate cart price with the single pricing rules sequence.
   * The alghorithm follows:
   * 1. Apply each pricing rules sequence on the cart.
   * 2. After applying the sequence will have the total price of the rules and remained cart.
   * 3. For remained items, will add their price to the result price of the rules.
   * @param pricingRules a sort of the pricing rules should be apply on the cart.
   * @param cart the checkout cart.
   * @returns the price of the cart by applying a sort of the pricing rules on the cart.
   */
  private calculatePrice(
    pricingRules: IPricingRule[],
    cart: ItemType[]
  ): number {
    const { updatedCart, appliedRulesPrice } = this.applyPricingRulesOnCart(
      pricingRules,
      cart
    );

    return updatedCart.reduce(
      (accum, item) => accum + item.price,
      appliedRulesPrice
    );
  }

  /**
   * This function is an internal function to apply pricing rules to the cart.
   * This function will apply pricing rules in the sort that provided.
   * It will call each pricing rule's apply function on the cart.
   * As the result of the applying each pricing rule we will have the price of that rule and the remained items in cart.
   * @param pricingRules a sort of the pricing rules should be apply on the cart.
   * @param cart the checkout cart.
   * @returns the cart after applyin the pricing rules and the price should be be added as a result of the applying rules.
   */
  private applyPricingRulesOnCart(
    pricingRules: IPricingRule[] = [],
    cart: ItemType[]
  ): { updatedCart: ItemType[]; appliedRulesPrice: number } {
    if (!pricingRules.length) {
      return { updatedCart: cart, appliedRulesPrice: 0 };
    }
    let updatedCart = [...cart];
    let appliedRulesPrice = 0;

    for (const pricingRule of pricingRules) {
      const { remainedCart, price } = pricingRule.apply(updatedCart);
      updatedCart = remainedCart;
      appliedRulesPrice += price;
    }

    return { updatedCart, appliedRulesPrice };
  }
}

export type PricingType = Pricing;
