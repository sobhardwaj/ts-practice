// you cannot use decorators to provide mixins via code flow analysis:

const Pausable = (target: typeof Player) => {
  return class Pausable extends target {
    shouldFreeze = false;
  };
};

@Pausable
class Player {
  x = 0;
  y = 0;
}

// The Player class does not have the decorator's type merged:
const player = new Player();
player.shouldFreeze;

// [what is type composition ...]

// The runtime aspect could be manually replicated via
// type composition or interface merging.
type FreezablePlayer = Player & { shouldFreeze: boolean }

const playerTwo = (new Player() as unknown) as FreezablePlayer
playerTwo.shouldFreeze;