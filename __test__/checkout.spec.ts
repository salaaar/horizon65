import { Checkout } from "../src/checkout";
import { PricingConfigurationType } from "../src/types";
import defaultPricingConfiguration from "../src/pricing_configuration.json";

let emptyPricingConfiguration: PricingConfigurationType[];
let customPricingConfiguration: PricingConfigurationType[];

beforeAll(() => {
  emptyPricingConfiguration = [];
  customPricingConfiguration = [
    {
      Items: ["VOUCHER", "VOUCHER", "VOUCHER"],
      Total: 10,
    },
    {
      Items: ["MUG", "MUG"],
      Total: 7.5,
    },
    {
      Items: ["MUG", "MUG", "VOUCHER", "VOUCHER", "VOUCHER"],
      Total: 17.5,
    },
  ];
});

describe("No pricing rules", () => {
  it("Empty cart", () => {
    const checkout = Checkout.new(emptyPricingConfiguration);
    expect(checkout.total()).toEqual(0);
  });
  it("Some random cart", () => {
    const checkout = Checkout.new(emptyPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(57.5);
  });
  it("Some random cart", () => {
    const checkout = Checkout.new(emptyPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("TSHIRT");
    checkout.scan("MUG");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(40);
  });
});

describe("Default pricing rules", () => {
  it("Empty cart", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    expect(checkout.total()).toEqual(0);
  });
  it("Some random items", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("TSHIRT");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(32.5);
  });
  it("2-for-1 voucher", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    expect(checkout.total()).toEqual(5);
  });
  it("2-for-1 voucher + more items", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(25);
  });
  it("2-for-1 voucher + more items", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(12.5);
  });
  it("2-for-1 voucher + more items", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(32.5);
  });
  it("T-Shirt offer", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(57);
  });
  it("T-Shirt offer", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(57);
  });
  it("T-Shirt offer + more items", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("MUG");
    checkout.scan("VOUCHER");
    expect(checkout.total()).toEqual(69.5);
  });
  it("T-Shirt offer + 2-for-1 voucher", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    expect(checkout.total()).toEqual(62);
  });
  it("T-Shirt offer + 2-for-1 voucher + more item", () => {
    const checkout = Checkout.new(defaultPricingConfiguration);
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(69.5);
  });
});

describe("Custom pricing rules", () => {
  it("Empty cart", () => {
    const checkout = Checkout.new(customPricingConfiguration);
    expect(checkout.total()).toEqual(0);
  });
  it("Some random items", () => {
    const checkout = Checkout.new(customPricingConfiguration);
    checkout.scan("TSHIRT");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(32.5);
  });
  it("3-for-2 voucher", () => {
    const checkout = Checkout.new(customPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    expect(checkout.total()).toEqual(10);
  });
  it("3-for-2 voucher + more items", () => {
    const checkout = Checkout.new(customPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(30);
  });
  it("3-for-2 voucher + more items", () => {
    const checkout = Checkout.new(customPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(17.5);
  });
  it("3-for-2 voucher + more items", () => {
    const checkout = Checkout.new(customPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(37.5);
  });
  it("2-for-1 mug", () => {
    const checkout = Checkout.new(customPricingConfiguration);
    checkout.scan("MUG");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(7.5);
  });
  it("2-for-1 mug", () => {
    const checkout = Checkout.new(customPricingConfiguration);
    checkout.scan("MUG");
    checkout.scan("MUG");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(15);
  });
  it("3-for-2 voucher + 2-for-1 mug  + more item", () => {
    const checkout = Checkout.new(customPricingConfiguration);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    checkout.scan("MUG");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(37.5);
  });
});
