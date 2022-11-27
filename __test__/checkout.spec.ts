import { Checkout } from "../src/Checkout";

describe("No pricing rules", () => {
  it("Empty cart", () => {
    const checkout = Checkout.new([]);
    expect(checkout.total()).toEqual(0);
  });
  it("Some random cart", () => {
    const checkout = Checkout.new([]);
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(57.5);
  });
  it("Some random cart", () => {
    const checkout = Checkout.new([]);
    checkout.scan("VOUCHER");
    checkout.scan("TSHIRT");
    checkout.scan("MUG");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(40);
  });
});

describe("Default pricing rules", () => {
  it("Empty cart", () => {
    const checkout = Checkout.new();
    expect(checkout.total()).toEqual(0);
  });
  it("Some random items", () => {
    const checkout = Checkout.new();
    checkout.scan("TSHIRT");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(32.5);
  });
  it("2-for-1 voucher", () => {
    const checkout = Checkout.new();
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    expect(checkout.total()).toEqual(5);
  });
  it("2-for-1 voucher", () => {
    const checkout = Checkout.new();
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    expect(checkout.total()).toEqual(10);
  });
  it("2-for-1 voucher + more items", () => {
    const checkout = Checkout.new();
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(30);
  });
  it("2-for-1 voucher + more items", () => {
    const checkout = Checkout.new();
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(17.5);
  });
  it("2-for-1 voucher + more items", () => {
    const checkout = Checkout.new();
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(37.5);
  });
  it("T-Shirt offer", () => {
    const checkout = Checkout.new();
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(57);
  });
  it("T-Shirt offer", () => {
    const checkout = Checkout.new();
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(76);
  });
  it("T-Shirt offer", () => {
    const checkout = Checkout.new();
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    expect(checkout.total()).toEqual(95);
  });
  it("T-Shirt offer + more items", () => {
    const checkout = Checkout.new();
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("MUG");
    checkout.scan("VOUCHER");
    expect(checkout.total()).toEqual(69.5);
  });
  it("T-Shirt offer + 2-for-1 voucher", () => {
    const checkout = Checkout.new();
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    expect(checkout.total()).toEqual(62);
  });
  it("T-Shirt offer + 2-for-1 voucher + more item", () => {
    const checkout = Checkout.new();
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("TSHIRT");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("VOUCHER");
    checkout.scan("MUG");
    expect(checkout.total()).toEqual(74.5);
  });
});
