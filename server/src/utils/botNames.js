/**
 * Massive list of realistic GAMER TAG bot names for instant bot detection
 * Format: Epic gamer handles that blend in perfectly with real players
 * Usage: botNames.includes(username) returns true for bots
 */

const gamerPrefixes = [
  'Shadow', 'Dark', 'Silent', 'Toxic', 'Deadly', 'Epic', 'Pro', 'Master', 'Elite', 'Legendary',
  'Phantom', 'Ghost', 'Ninja', 'Sniper', 'Viper', 'Dragon', 'Phoenix', 'Thunder', 'Lightning', 'Storm',
  'Fire', 'Ice', 'Blood', 'Steel', 'Iron', 'Golden', 'Silver', 'Diamond', 'Platinum', 'Crystal',
  'Cyber', 'Digital', 'Virtual', 'Quantum', 'Atomic', 'Nuclear', 'Laser', 'Plasma', 'Turbo', 'Hyper',
  'Ultra', 'Mega', 'Super', 'Alpha', 'Beta', 'Omega', 'Prime', 'Neo', 'Zero', 'Infinity',
  'Mad', 'Wild', 'Savage', 'Brutal', 'Fierce', 'Rage', 'Fury', 'Chaos', 'Void', 'Abyss',
  'Crimson', 'Scarlet', 'Azure', 'Emerald', 'Violet', 'Neon', 'Cosmic', 'Galactic', 'Solar', 'Lunar',
  'Arctic', 'Desert', 'Ocean', 'Mountain', 'Forest', 'Urban', 'Tech', 'Mech', 'Bio', 'Nano',
  'Quick', 'Swift', 'Rapid', 'Flash', 'Sonic', 'Bullet', 'Rocket', 'Jet', 'Turbo', 'Speed',
  'Night', 'Dawn', 'Dusk', 'Twilight', 'Eclipse', 'Nova', 'Star', 'Comet', 'Meteor', 'Galaxy'
];

const gamerSuffixes = [
  'Slayer', 'Hunter', 'Killer', 'Destroyer', 'Annihilator', 'Terminator', 'Eliminator', 'Dominator', 'Conqueror', 'Warrior',
  'Fighter', 'Soldier', 'Guardian', 'Defender', 'Protector', 'Champion', 'Hero', 'Legend', 'Master', 'Lord',
  'King', 'Emperor', 'God', 'Demon', 'Beast', 'Monster', 'Predator', 'Assassin', 'Reaper', 'Phantom',
  'Striker', 'Blaster', 'Shooter', 'Sniper', 'Gunner', 'Bomber', 'Raider', 'Invader', 'Crusher', 'Smasher',
  'Breaker', 'Wrecker', 'Ripper', 'Shredder', 'Cutter', 'Slasher', 'Piercer', 'Stabber', 'Punisher', 'Executioner',
  'Wolf', 'Tiger', 'Lion', 'Eagle', 'Hawk', 'Falcon', 'Shark', 'Viper', 'Cobra', 'Scorpion',
  'X', 'Z', 'Prime', 'Zero', 'One', 'Max', 'Pro', 'Elite', 'Ace', 'Boss',
  'Blade', 'Sword', 'Axe', 'Hammer', 'Spear', 'Arrow', 'Bullet', 'Missile', 'Bomb', 'Nuke',
  '2000', '3000', '9000', '404', '69', '420', '666', '777', '1337', '2024',
  'Gaming', 'Player', 'Gamer', 'Noob', 'Pwner', 'Owned', 'Rekt', 'MLG', 'GG', 'EZ'
];

const leetSpeakMap = {
  'a': ['4', '@'],
  'e': ['3'],
  'i': ['1', '!'],
  'o': ['0'],
  's': ['5', '$'],
  't': ['7'],
  'l': ['1'],
  'g': ['9']
};

const memePrefixes = [
  'xX', 'Xx', 'xXx', '420', '69x', 'MLG', 'Pro', 'Noob', 'Epic', 'Dank',
  'Savage', 'Lit', 'Fam', 'Bro', 'Chad', 'Kyle', 'Tyler', 'Hunter', 'Braden', 'Connor'
];

const memeSuffixes = [
  'Xx', 'xX', 'xXx', '420', 'x69', 'MLG', 'Pro', 'Noob', 'Epic', 'Dank',
  '2024', '1337', 'Gaming', 'YT', 'TTV', 'Streamer', 'Live', 'GG', 'EZ', 'Rekt'
];

const randomWords = [
  'Pizza', 'Taco', 'Burrito', 'Cookie', 'Pickle', 'Banana', 'Potato', 'Waffle', 'Nugget', 'Cheese',
  'Bacon', 'Sandwich', 'Pancake', 'Donut', 'Muffin', 'Pretzel', 'Noodle', 'Spaghetti', 'Lasagna', 'Soup',
  'Gamer', 'Player', 'Streamer', 'Viewer', 'Subscriber', 'Follower', 'Mod', 'Admin', 'VIP', 'Donor',
  'Keyboard', 'Mouse', 'Monitor', 'Headset', 'Microphone', 'Camera', 'Controller', 'Console', 'PC', 'RGB',
  'Cat', 'Dog', 'Hamster', 'Turtle', 'Fish', 'Bird', 'Lizard', 'Snake', 'Rabbit', 'Ferret'
];

// Helper function to apply leetspeak randomly
const applyLeetSpeak = (word) => {
  let result = word.toLowerCase();
  for (const [letter, replacements] of Object.entries(leetSpeakMap)) {
    if (Math.random() < 0.3) { // 30% chance to apply leetspeak
      const replacement = replacements[Math.floor(Math.random() * replacements.length)];
      result = result.replaceAll(letter, replacement);
    }
  }
  return result;
};

// Generate the massive bot names list with EPIC GAMER ENERGY
const generateBotNames = () => {
  const names = [];
  
  // 1. Classic Prefix + Suffix combinations
  for (const prefix of gamerPrefixes) {
    for (const suffix of gamerSuffixes) {
      names.push(`${prefix}${suffix}`);
      names.push(`${prefix}_${suffix}`);
      names.push(`${prefix}${suffix}${Math.floor(Math.random() * 100)}`);
      
      // Apply leetspeak occasionally
      if (Math.random() < 0.2) {
        names.push(applyLeetSpeak(`${prefix}${suffix}`));
      }
    }
  }
  
  // 2. Meme format names (xXxMLGProxXx style)
  for (let i = 0; i < 1000; i++) {
    const prefix = gamerPrefixes[Math.floor(Math.random() * gamerPrefixes.length)];
    const suffix = gamerSuffixes[Math.floor(Math.random() * gamerSuffixes.length)];
    const memePrefix = memePrefixes[Math.floor(Math.random() * memePrefixes.length)];
    const memeSuffix = memeSuffixes[Math.floor(Math.random() * memeSuffixes.length)];
    
    names.push(`${memePrefix}${prefix}${suffix}${memeSuffix}`);
    names.push(`${memePrefix}_${prefix}_${memeSuffix}`);
  }
  
  // 3. Random word combinations (for the lols)
  for (let i = 0; i < 800; i++) {
    const word1 = randomWords[Math.floor(Math.random() * randomWords.length)];
    const word2 = randomWords[Math.floor(Math.random() * randomWords.length)];
    const number = Math.floor(Math.random() * 9999);
    
    names.push(`${word1}${word2}${number}`);
    names.push(`${word1}_${word2}`);
    names.push(`${word1}${number}`);
    names.push(applyLeetSpeak(`${word1}${word2}`));
  }
  
  // 4. Single word + numbers (classic gamer style)
  for (const prefix of gamerPrefixes) {
    for (let i = 0; i < 20; i++) {
      const number = Math.floor(Math.random() * 9999);
      names.push(`${prefix}${number}`);
      names.push(`${prefix}_${number}`);
      names.push(applyLeetSpeak(`${prefix}${number}`));
    }
  }
  
  // 5. Some absolutely cursed combinations for maximum realism
  const cursedCombos = [
    'NoobMaster69', 'xXx_Sniper_xXx', 'MLGProGamer', '420BlazeIt', 'PussyDestroyer',
    'MomSlayer69', 'UnicornKiller', 'TacoBeast', 'PotatoLord', 'CheeseGod',
    'SavageNinja420', 'ToxicPhantom', 'LegendaryNoob', 'EpicFailure', 'DankMemer',
    'xxPROxx', 'l33th4x0r', 'N00bPwn3r', 'MLG_Doritos', 'MountainDewGamer',
    'YourMom69', 'GetRekt420', 'EZClap', 'Poggers', 'MonkaS',
    'KEKW', 'BigChungus', 'Stonks', 'DiamondHands', 'ToTheMoon'
  ];
  
  for (const combo of cursedCombos) {
    names.push(combo);
    names.push(`${combo}${Math.floor(Math.random() * 100)}`);
    names.push(`${combo}_TTV`);
    names.push(`${combo}_YT`);
  }
  
  // 6. Add some variations with underscores and numbers
  for (let i = 0; i < 2000; i++) {
    const prefix = gamerPrefixes[Math.floor(Math.random() * gamerPrefixes.length)];
    const suffix = gamerSuffixes[Math.floor(Math.random() * gamerSuffixes.length)];
    const word = randomWords[Math.floor(Math.random() * randomWords.length)];
    
    names.push(`${prefix}_${word}_${Math.floor(Math.random() * 100)}`);
    names.push(`${word}${suffix}${Math.floor(Math.random() * 1000)}`);
    names.push(`${Math.floor(Math.random() * 100)}${prefix}${suffix}`);
  }
  
  // Remove duplicates and return the legendary list
  return [...new Set(names)];
};

// Generate the massive list
const botNames = generateBotNames();

// Export for use throughout the application
module.exports = {
  botNames,
  
  /**
   * Check if a username belongs to a bot
   * @param {string} username - Username to check
   * @returns {boolean} True if username is a bot
   */
  isBot: (username) => {
    return botNames.includes(username);
  },
  
  /**
   * Get a random unused bot name
   * @param {string[]} usedNames - Array of already used names
   * @returns {string} Random available bot name
   */
  getRandomBotName: (usedNames = []) => {
    const availableNames = botNames.filter(name => !usedNames.includes(name));
    if (availableNames.length === 0) {
      // Fallback if somehow all names are used
      return `Bot_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
    return availableNames[Math.floor(Math.random() * availableNames.length)];
  },
  
  /**
   * Get total number of bot names available
   * @returns {number} Total bot names count
   */
  getBotNamesCount: () => botNames.length
};

console.log(`Generated ${botNames.length} bot names for realistic gameplay`);