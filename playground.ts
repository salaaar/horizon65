import { Checkout } from "./src/checkout";
import pricingConfiguration from "./src/pricing_configuration.json";

/**
 * This is just proof of work.
 */

const co = Checkout.new(pricingConfiguration);
co.scan("VOUCHER");
co.scan("VOUCHER");
co.scan("TSHIRT");

const price = co.total();
console.log(price);
