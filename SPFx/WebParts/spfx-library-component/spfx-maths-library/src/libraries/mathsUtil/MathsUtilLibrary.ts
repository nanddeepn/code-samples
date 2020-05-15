export class MathsUtilLibrary {
  public name(): string {
    return 'MathsUtilLibrary';
  }

  public getRandomNumber(): number {
    // Generate and return random number between 1 to 100  
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber;
  }

  public addNumbers(a: number, b: number): number {
    // Returns addition of given two numbers
    return a + b;
  }

  public getSquareRoot(a: number) {
    // Returns the square root of given number
    return Math.sqrt(a);      
  }
}
