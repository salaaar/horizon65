import { Checkout } from "./src/Checkout";

/**
 * This is just proof of work.
 */

const co = Checkout.new();
co.scan("VOUCHER");
co.scan("VOUCHER");
co.scan("VOUCHER");
co.scan("TSHIRT");
co.scan("TSHIRT");
co.scan("TSHIRT");
co.scan("MUG");

const price = co.total();
console.log(price);
