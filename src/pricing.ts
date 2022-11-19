import { ItemType } from "./item";
import { PricingConfigurationType, PricingRuleType } from "./types";

/**
 * Pricing class is abstraction for the reading custom pricing rules and applying them to specific cart.
 * The pricing abstraction is independent from pricing rules and get them while instantiation.
 */
export class Pricing {
  private pricingRules: PricingRuleType[] = [];

  /**
   * constructor of the Pricing class.
   * @param pricingConfiguration the custom pricing rules should apply be used to calculate the cart price.
   */
  constructor(pricingConfiguration: PricingConfigurationType[]) {
    this.preparePricingRules(pricingConfiguration);
  }

  /**
   * This is responsible for preparing pricing rules from the provided configuration.
   * @param pricingConfiguration the pricing rule.
   */
  preparePricingRules(pricingConfiguration: PricingConfigurationType[]) {
    for (const pricingItem of pricingConfiguration) {
      this.pricingRules.push({
        itemCodes: pricingItem.Items,
        price: pricingItem.Total,
      });
    }
  }

  /**
   * The core alghorithm for price calculation happens here.
   * This is the alghorithm:
   * 1. Will run the calculate price for the cart with each pricing rule.
   * 2. Find the minimum price and return it as the cart price.
   * @param cart The checkout cart that should calculate the price for the cart.
   * @returns The price of the cart.
   */
  apply(cart: ItemType[]): number {
    let minimumPrice = this.calculatePrice(null, cart);
    for (const pricingRule of this.pricingRules) {
      const calculatedPrice = this.calculatePrice(pricingRule, cart);
      if (minimumPrice > calculatedPrice) {
        minimumPrice = calculatedPrice;
      }
    }

    return minimumPrice;
  }

  /**
   * This function should calculate cart price with the single pricing rule.
   * The alghorithm follows:
   * 1. Check if pricing rule applicable on the cart
   * 2. if so, will remove them from the cart and add the pricing rule price to the price of the rest of the cart.
   * 3. if not, will calculate the sum of the items.
   * @param pricingRule the pricing rule should be apply on the cart.
   * @param cart the checkout cart.
   * @returns the price of the cart by applying the pricing rule on the cart.
   */
  private calculatePrice(
    pricingRule: PricingRuleType | null,
    cart: ItemType[]
  ): number {
    const { updatedCart, appliedRulePrice } = this.applyPricingRuleOnCart(
      pricingRule,
      cart
    );

    return updatedCart.reduce(
      (accum, item) => accum + item.price,
      appliedRulePrice
    );
  }

  /**
   * This function is an internal function to apply pricing rule to the cart.
   * This function will check if all pricing rule item codes are presented in the cart,
   * so will remove them from the cart and returns the price of the combination and the rest of the cart.
   * If cart is not included all pricing rule items, will return the original cart and price zero to show the pricing rule
   * is not applicable to the cart.
   * @param pricingRule the pricing rule should be apply on the cart.
   * @param cart the checkout cart.
   * @returns the cart after applyin the pricing rule if it's applicable also return the price of the rule,
   * if it is not, will return zero as price.
   */
  private applyPricingRuleOnCart(
    pricingRule: PricingRuleType | null,
    cart: ItemType[]
  ) {
    if (!pricingRule) {
      return { updatedCart: cart, appliedRulePrice: 0 };
    }

    let clonedCart = [...cart];
    for (const pricingRuleItemCode of pricingRule.itemCodes) {
      const foundItemIndex = clonedCart.findIndex(
        (item) => item.code === pricingRuleItemCode
      );
      if (foundItemIndex === -1) {
        return { updatedCart: cart, appliedRulePrice: 0 };
      } else {
        clonedCart.splice(foundItemIndex, 1);
      }
    }

    return { updatedCart: clonedCart, appliedRulePrice: pricingRule.price };
  }
}

export type PricingType = Pricing;
