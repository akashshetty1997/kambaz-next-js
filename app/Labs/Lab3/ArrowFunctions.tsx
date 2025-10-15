// app/Labs/Lab3/ArrowFunctions.tsx
export default function ArrowFunctions() {
  const subtract = (a: number, b: number) => a - b;
  const twoMinusFive = subtract(2, 5);

  const multiply = (a: number, b: number) => a * b;
  const threeTimesFour = multiply(3, 4);

  return (
    <div id="wd-arrow-functions">
      <h4>Functions</h4>
      <h5>New ES6 arrow functions</h5>
      subtract(2, 5) = {twoMinusFive} <br />
      multiply(3, 4) = {threeTimesFour} <hr />
    </div>
  );
}
