class BeeKeepar {
  hasMask: boolean = false
}
class ZooKeepar {
  nametag: string = 'Melike'
}
class Animals {
  numLegs: 4
}

class Bee extends Animals {
  keeper: BeeKeepar = new BeeKeepar()
}
class Lion extends Animals {
  keeper: ZooKeepar = new ZooKeepar()
}

// new Bee().keeper.hasMask
// new Lion().keeper.nametag

function createInstance<A extends Animals>(c: new () => A): A {
  return new c()
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

//creating factories classes
function create<Type>(c: { new(): Type }): Type {
  return new c()
}

// To get started, we need a type which we'll use to extend
// other classes from. The main responsibility is to declare
// that the type being passed in is a class

type Constructor = new (...args: any[]) => {};
// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:

function Scale<TBase extends Constructor>(Base: TBase) {
  return class Scaling extends Base {
    // Mixins may not declare private/protected properties
    // however, you can use ES2020 private fields
    _scale: number = 1;
    setScale(scale: number) {
      this._scale = scale
    }
    get scale(): number {
      return this._scale;
    }
  }
}

class Sprite {
  name = "";
  x = 0;
  y = 0;

  constructor(name: string) {
    this.name = name;
  }
}

//  Compose a new class from the Sprite class,
// with the Mixin Scale applier:
const EightBitSprite = Scale(Sprite);
const flappySprite = new EightBitSprite("Bird");
flappySprite.setScale(0.8);
console.log(flappySprite.scale);


// This was our previous constructor:
// type Constructor = new (...args: any[]) => {};
// Now we use a generic version which can apply a constraint on
// the class which this mixin is applied to
type GConstructor<T = {}> = new (...args: any[]) => T;

type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;
type Spritable = GConstructor<Sprite>;
type Loggable = GConstructor<{ print: () => void }>;


function Jumpable<TBase extends Positionable>(Base: TBase) {
  return class Jumpable extends Base {
    jump() {
      // This mixin will only work if it is passed a base
      // class which has setPos defined because of the
      // Positionable constraint.
      this.setPos(0, 20);
    }
  };
}

// Alternative Pattern
// Each mixin is a traditional ES class
class Jumpable {
  jump() { }
}

class Duckable {
  duck() { }
}

// Including the base
class Sprite {
  x = 0;
  y = 0;
}
// Then you create an interface which merges
// the expected mixins with the same name as your base
interface Sprite extends Jumpable, Duckable { }
// Apply the mixins into the base class via
// the JS at runtime
applyMixins(Sprite, [Jumpable, Duckable]);
let player = new Sprite();
player.jump();
console.log(player.x, player.y);
// This can live anywhere in your codebase:
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
        Object.create(null)
      );
    });
  });
}


function base<T>() {
  class Base {
    static prop: T;
  }
  return Base;
}

function derived<T>() {
  class Derived extends base<T>() {
    static anotherProp: T;
  }
  return Derived;
}

class Spec extends derived<string>() { }

Spec.prop; // string
Spec.anotherProp; // string