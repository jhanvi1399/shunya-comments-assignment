/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const EXAMPLE_EDITOR_BLOCKS = {
  blocks: [
    {
      text: (
        'The most outstanding monument built by Emperor Shahjahan is the Taj Mahal at Agra. It is on the bank of River Yamuna. This grand mausoleum was built in memory of his beloved Queen Mumtaj Mahal. It has been described as “a dream in marble designed by fairies and completed by jewelers.” It is made of pure white marble. As a monument of love, “it is unsurpassed in the world.” It stands on a platform of 8.5 meters in height. The mausoleum rises to a height of 32.4 meters. It is surmounted by cupolas at each corner. The bulbous dome in the center of the cupolas has the appearance of an inverted lotus. There are four smaller domes at the four corners of the building. Four minarets stand at each corner of the terrace. The outer walls and the interior walls are richly decorated with exquisite inlay work and calligraphy.'
      ),
      type: 'unstyled',
      
      entityRanges: [{ offset: 31, length: 8, key: 'first' }],
      
    },
  ],

  entityMap: {
  }  
};
