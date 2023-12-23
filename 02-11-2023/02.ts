class DynamicPropertyClass {
  private dynamicProperties: { [key: string]: any } = {};

  setProperty(propertyName: string, value: any) {
    this.dynamicProperties[propertyName] = value;
  }

  getProperty(propertyName: string) {
    return this.dynamicProperties[propertyName];
  }
}

const myObject = new DynamicPropertyClass();

myObject.setProperty("property1", "Value 1");
myObject.setProperty("property2", "Value 2");

console.log(myObject.getProperty("property1")); // Output: Value 1
console.log(myObject.getProperty("property2"));

console.log('testt...')