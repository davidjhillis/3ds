/**
 * Radix Themes Database - Organized like Relume
 * Complete color scales categorized by purpose and usage
 * Source: https://www.radix-ui.com/colors
 * Inspired by: https://www.relume.io/color-palettes
 */

export const radixThemes = {
  
  // ========================================
  // COLOR CATEGORIES
  // ========================================
  
  categories: {
    neutrals: {
      title: 'Neutrals',
      description: 'Foundation of the color system. Almost everything in UI design — text, form fields, backgrounds, dividers — use Neutral colors.',
      colors: ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand']
    },
    
    chromatic: {
      title: 'Primary, Secondary & Accent',
      description: 'Main colors that make up the majority of the design system. Use sparingly in components such as pills, alerts and labels.',
      colors: [
        'tomato', 'red', 'ruby', 'crimson',
        'pink', 'plum', 'purple', 'violet',
        'iris', 'indigo', 'blue', 'sky', 'cyan',
        'teal', 'jade', 'green', 'grass',
        'lime', 'mint', 'yellow', 'amber', 'orange',
        'brown', 'bronze', 'gold'
      ]
    },
    
    semantic: {
      title: 'Semantic Colors',
      description: 'Communicate standard value states (such as error, success, or warning).',
      mappings: {
        success: 'green',
        warning: 'yellow',
        error: 'red',
        info: 'blue'
      }
    }
  },

  // ========================================
  // THEME PRESETS
  // ========================================
  
  presets: {
    indigo: {
      name: 'Indigo',
      primary: 'indigo',
      accent: 'purple',
      neutral: 'slate',
      semantic: { success: 'green', warning: 'amber', error: 'red', info: 'blue' },
      description: 'Professional and modern'
    },
    blue: {
      name: 'Blue Ocean',
      primary: 'blue',
      accent: 'cyan',
      neutral: 'slate',
      semantic: { success: 'teal', warning: 'amber', error: 'red', info: 'sky' },
      description: 'Trust and reliability'
    },
    emerald: {
      name: 'Emerald',
      primary: 'green',
      accent: 'teal',
      neutral: 'sage',
      semantic: { success: 'jade', warning: 'lime', error: 'ruby', info: 'cyan' },
      description: 'Fresh and natural'
    },
    ruby: {
      name: 'Ruby',
      primary: 'red',
      accent: 'crimson',
      neutral: 'mauve',
      semantic: { success: 'green', warning: 'amber', error: 'tomato', info: 'plum' },
      description: 'Bold and energetic'
    },
    amber: {
      name: 'Amber Sunset',
      primary: 'amber',
      accent: 'orange',
      neutral: 'sand',
      semantic: { success: 'lime', warning: 'yellow', error: 'red', info: 'gold' },
      description: 'Warm and inviting'
    },
    violet: {
      name: 'Violet Dream',
      primary: 'violet',
      accent: 'iris',
      neutral: 'slate',
      semantic: { success: 'green', warning: 'amber', error: 'pink', info: 'blue' },
      description: 'Creative and elegant'
    },
    mint: {
      name: 'Mint Fresh',
      primary: 'mint',
      accent: 'jade',
      neutral: 'sage',
      semantic: { success: 'grass', warning: 'yellow', error: 'tomato', info: 'sky' },
      description: 'Clean and refreshing'
    },
    sunset: {
      name: 'Sunset',
      primary: 'orange',
      accent: 'tomato',
      neutral: 'bronze',
      semantic: { success: 'green', warning: 'yellow', error: 'red', info: 'amber' },
      description: 'Vibrant and warm'
    }
  },

  // ========================================
  // DARK MODE COLOR SCALES
  // ========================================
  
  dark: {
    // Grays (Neutrals)
    gray: {1:"#111111",2:"#191919",3:"#222222",4:"#2a2a2a",5:"#313131",6:"#3a3a3a",7:"#484848",8:"#606060",9:"#6e6e6e",10:"#7c7c7c",11:"#b5b5b5",12:"#eeeeee"},
    mauve: {1:"#121113",2:"#1a181b",3:"#232225",4:"#2b292e",5:"#323035",6:"#3c393f",7:"#49474e",8:"#625f69",9:"#6f6d78",10:"#7d7b86",11:"#b2b0bc",12:"#eeeef0"},
    slate: {1:"#111113",2:"#18181b",3:"#212225",4:"#272a2e",5:"#2e3135",6:"#363a3f",7:"#43484e",8:"#5a6169",9:"#696e77",10:"#777b84",11:"#b0b4ba",12:"#edeef0"},
    sage: {1:"#101211",2:"#171918",3:"#202221",4:"#272a29",5:"#2e3130",6:"#373b39",7:"#444947",8:"#5b625f",9:"#68766e",10:"#7a867c",11:"#afbcb6",12:"#e5edeb"},
    olive: {1:"#111210",2:"#181917",3:"#212220",4:"#282a28",5:"#2f312e",6:"#383a36",7:"#454843",8:"#5c625b",9:"#6a746a",10:"#788278",11:"#b2bcb1",12:"#e6ebe5"},
    sand: {1:"#111110",2:"#191918",3:"#222221",4:"#2a2a28",5:"#31312e",6:"#3b3a37",7:"#494844",8:"#62605b",9:"#71706b",10:"#7f7e79",11:"#b0afa9",12:"#ecebe9"},
    
    // Reds
    tomato: {1:"#181111",2:"#1f1513",3:"#391714",4:"#4e1511",5:"#5e1c16",6:"#6e2920",7:"#853a2d",8:"#ac4d39",9:"#e54d2e",10:"#ec6142",11:"#ff977d",12:"#fbd3cb"},
    red: {1:"#191111",2:"#201314",3:"#3b1219",4:"#500f1c",5:"#611623",6:"#72232d",7:"#8c333a",8:"#b54548",9:"#e5484d",10:"#ec5d5e",11:"#ff6369",12:"#ffd1d9"},
    ruby: {1:"#191113",2:"#1e1317",3:"#3a141e",4:"#4e1325",5:"#5e1a2e",6:"#6f2539",7:"#883447",8:"#b3445a",9:"#e54666",10:"#ed5571",11:"#ff6a7d",12:"#fed2e1"},
    crimson: {1:"#191114",2:"#201318",3:"#381525",4:"#4d122f",5:"#5c1839",6:"#6d2045",7:"#873356",8:"#b0436e",9:"#e5484d",10:"#ec5d5e",11:"#ff6369",12:"#fdd3e8"},
    
    // Pinks & Purples
    pink: {1:"#1f121b",2:"#271421",3:"#3a182f",4:"#4a1939",5:"#581d42",6:"#69224e",7:"#7e2b5f",8:"#a23776",9:"#d6409f",10:"#de51ab",11:"#ec6cb9",12:"#faddf4"},
    plum: {1:"#181118",2:"#21131e",3:"#351631",4:"#451841",5:"#53214e",6:"#642b5f",7:"#7e3973",8:"#a84d90",9:"#ab4aba",10:"#b658c4",11:"#e796f3",12:"#f4d4f4"},
    purple: {1:"#1b141d",2:"#221527",3:"#301a3a",4:"#3a1e48",5:"#432155",6:"#4e2667",7:"#5f2d84",8:"#7938b2",9:"#8e4ec6",10:"#9d5bd2",11:"#d19dff",12:"#ecd9fa"},
    violet: {1:"#14121f",2:"#1b1525",3:"#291f43",4:"#33255b",5:"#3c2e69",6:"#473876",7:"#56468b",8:"#6958ad",9:"#6e56cf",10:"#7c66dc",11:"#9e8cfc",12:"#dcd1ff"},
    
    // Blues
    iris: {1:"#13131e",2:"#171625",3:"#202248",4:"#262a65",5:"#303374",6:"#3d3e82",7:"#4a4a95",8:"#5958b1",9:"#5b5bd6",10:"#6e6ade",11:"#b1a9ff",12:"#e0dffe"},
    indigo: {1:"#11131f",2:"#141726",3:"#182449",4:"#1d2e62",5:"#253974",6:"#304384",7:"#3a4f97",8:"#435db1",9:"#3e63dd",10:"#5472e4",11:"#9eb1ff",12:"#d6e1ff"},
    blue: {1:"#0d1520",2:"#111927",3:"#0d2847",4:"#003362",5:"#004074",6:"#104d87",7:"#205d9e",8:"#2870bd",9:"#0090ff",10:"#3b9eff",11:"#70b8ff",12:"#c2e6ff"},
    sky: {1:"#0d141f",2:"#111a27",3:"#112840",4:"#113555",5:"#154467",6:"#1b537b",7:"#1f6692",8:"#197cae",9:"#7ce2fe",10:"#a8eeff",11:"#75c7f0",12:"#c2f3ff"},
    cyan: {1:"#0b161a",2:"#101b20",3:"#082c36",4:"#003848",5:"#004558",6:"#045468",7:"#12677e",8:"#11809c",9:"#00a2c7",10:"#23afd0",11:"#4ccce6",12:"#b6ecf7"},
    
    // Greens
    teal: {1:"#0d1514",2:"#111c1b",3:"#0d2d2a",4:"#023b37",5:"#084843",6:"#145750",7:"#1c6961",8:"#207e73",9:"#12a594",10:"#19b5a4",11:"#0ac5b3",12:"#adf0dd"},
    jade: {1:"#0d1512",2:"#121c18",3:"#0f2e22",4:"#0b3b2c",5:"#114837",6:"#1b5745",7:"#246854",8:"#2a7e68",9:"#29a383",10:"#27b08b",11:"#1fd8a4",12:"#adf0d4"},
    green: {1:"#0e1512",2:"#121b17",3:"#132d21",4:"#113b29",5:"#174933",6:"#20573e",7:"#28684a",8:"#2f7c57",9:"#30a46c",10:"#3cb179",11:"#4cc38a",12:"#b4f1c9"},
    grass: {1:"#0e1511",2:"#141a15",3:"#1b2a1e",4:"#1d3a24",5:"#25482d",6:"#2d5736",7:"#366740",8:"#3e7949",9:"#46a758",10:"#53b365",11:"#71d083",12:"#c2f0c2"},
    
    // Yellows & Oranges
    lime: {1:"#141807",2:"#1a1d0f",3:"#1f2917",4:"#29371d",5:"#334423",6:"#3d522a",7:"#496231",8:"#577538",9:"#99d52a",10:"#a5df35",11:"#b0eb4a",12:"#d7fc76"},
    mint: {1:"#0e1515",2:"#0f1b1b",3:"#092c2b",4:"#003a38",5:"#004744",6:"#105650",7:"#1e685f",8:"#277f70",9:"#86ead4",10:"#a8f5e5",11:"#58d5ba",12:"#c4f5e1"},
    yellow: {1:"#14120b",2:"#1b180f",3:"#2d2305",4:"#362b00",5:"#433500",6:"#524202",7:"#665417",8:"#836a21",9:"#ffe629",10:"#ffff57",11:"#f5e147",12:"#f6eeb4"},
    amber: {1:"#16120c",2:"#1d180f",3:"#302008",4:"#3f2700",5:"#4d3000",6:"#5c3d05",7:"#714f19",8:"#8f6424",9:"#ffb224",10:"#ffb83d",11:"#ffc453",12:"#ffefd6"},
    orange: {1:"#17120e",2:"#1e160f",3:"#331e0b",4:"#462100",5:"#562800",6:"#66350c",7:"#7e451d",8:"#a35829",9:"#f76b15",10:"#ff7d33",11:"#ff8b3f",12:"#ffe0c2"},
    
    // Browns
    brown: {1:"#12110f",2:"#1c1816",3:"#28211d",4:"#322922",5:"#3e3128",6:"#4d3c2f",7:"#614a39",8:"#7c5f46",9:"#ad7f58",10:"#b88c67",11:"#dbb594",12:"#f2e1ca"},
    bronze: {1:"#141110",2:"#1c1917",3:"#262220",4:"#302a27",5:"#3b3330",6:"#493e3a",7:"#5a4c47",8:"#6f5f58",9:"#a18072",10:"#ae8c7e",11:"#d4b3a5",12:"#ede0d9"},
    gold: {1:"#121211",2:"#1b1a17",3:"#24231f",4:"#2d2b26",5:"#38352e",6:"#444039",7:"#544f46",8:"#696256",9:"#978365",10:"#a39073",11:"#cbb99f",12:"#e8e2d9"},
    
    // Overlays
    black: {1:"#000000",2:"#111111",3:"#191919",4:"#222222",5:"#2a2a2a",6:"#313131",7:"#3a3a3a",8:"#484848",9:"#606060",10:"#6e6e6e",11:"#7c7c7c",12:"#b5b5b5"},
    white: {1:"#ffffff",2:"#fcfcfc",3:"#f9f9f9",4:"#f0f0f0",5:"#e8e8e8",6:"#e0e0e0",7:"#d9d9d9",8:"#cecece",9:"#bbbbbb",10:"#6e6e6e",11:"#646464",12:"#202020"}
  },

  // ========================================
  // LIGHT MODE COLOR SCALES
  // ========================================
  
  light: {
    // Grays (Neutrals)
    gray: {1:"#fcfcfc",2:"#f9f9f9",3:"#f0f0f0",4:"#e8e8e8",5:"#e0e0e0",6:"#d9d9d9",7:"#cecece",8:"#bbbbbb",9:"#6e6e6e",10:"#646464",11:"#202020",12:"#1c1c1c"},
    mauve: {1:"#fdfcfd",2:"#f9f8fa",3:"#f0eff3",4:"#e7e6eb",5:"#dfdee4",6:"#d7d6dd",7:"#cbcad3",8:"#b8b7c4",9:"#6f6d78",10:"#65636e",11:"#514f5a",12:"#1f1e23"},
    slate: {1:"#fcfcfd",2:"#f9f9fb",3:"#eff0f3",4:"#e7e8ec",5:"#dfe1e5",6:"#d7d9de",7:"#cbced6",8:"#b8bcc8",9:"#696e77",10:"#5f646e",11:"#4b515d",12:"#1c2024"},
    sage: {1:"#fbfcfc",2:"#f8f9f8",3:"#eff1ef",4:"#e6e9e6",5:"#dfe2df",6:"#d7dad7",7:"#cbcfcb",8:"#b8bcb8",9:"#68766e",10:"#5e6c64",11:"#4a5851",12:"#1f2520"},
    olive: {1:"#fcfcfc",2:"#f8f9f8",3:"#eff1ef",4:"#e7e9e7",5:"#dfe2df",6:"#d7dad7",7:"#cccfcc",8:"#b9bcb8",9:"#6a746a",10:"#606a60",11:"#4c5649",12:"#1f211f"},
    sand: {1:"#fdfdfc",2:"#f9f9f8",3:"#f1f0ef",4:"#e9e8e6",5:"#e2e1de",6:"#dad9d6",7:"#cfceca",8:"#bcbbb5",9:"#71706b",10:"#676662",11:"#52514e",12:"#21201d"},
    
    // Reds
    tomato: {1:"#fffcfc",2:"#fff8f7",3:"#feebe7",4:"#ffdcd3",5:"#ffcdc2",6:"#fdbdaf",7:"#f5a898",8:"#ec8e7b",9:"#e54d2e",10:"#dd4425",11:"#d13415",12:"#5c271f"},
    red: {1:"#fffcfc",2:"#fff7f7",3:"#feebec",4:"#ffdbdc",5:"#ffcdce",6:"#fdbdbe",7:"#f4a9aa",8:"#eb8e90",9:"#e5484d",10:"#dc3e42",11:"#ce2c31",12:"#641723"},
    ruby: {1:"#fffcfd",2:"#fff7f8",3:"#feeaed",4:"#ffdce1",5:"#ffced6",6:"#f8bfc8",7:"#efacb8",8:"#e592a3",9:"#e54666",10:"#dc3b5d",11:"#ca244d",12:"#64172b"},
    crimson: {1:"#fffcfd",2:"#fef7f9",3:"#ffe0e9",4:"#fdd3e8",5:"#f9c6db",6:"#f3b8d0",7:"#eca5bf",8:"#e38daa",9:"#e5484d",10:"#dc3e42",11:"#ce2c31",12:"#632531"},
    
    // Pinks & Purples
    pink: {1:"#fffcfe",2:"#fef7fb",3:"#fee9f5",4:"#fbdcef",5:"#f6cee7",6:"#efbfdd",7:"#e7acd0",8:"#dd93c2",9:"#d6409f",10:"#cf3897",11:"#c2298a",12:"#651249"},
    plum: {1:"#fefdff",2:"#fff8ff",3:"#fceffc",4:"#f9e5f9",5:"#f3d9f4",6:"#ebc8ed",7:"#dfb1e6",8:"#cf91d8",9:"#ab4aba",10:"#a144af",11:"#953ea3",12:"#53195d"},
    purple: {1:"#fefcfe",2:"#fdfaff",3:"#f9f1fe",4:"#f3e7fc",5:"#eedcfe",6:"#e4d4f4",7:"#d9c8ec",8:"#c9b5e3",9:"#8e4ec6",10:"#8347b9",11:"#8145b5",12:"#402060"},
    violet: {1:"#fdfcfe",2:"#faf8ff",3:"#f4f0fe",4:"#ebe4ff",5:"#e1d9ff",6:"#d4cafe",7:"#c2b5f5",8:"#aa99ec",9:"#6e56cf",10:"#654dc4",11:"#6550b9",12:"#2f265f"},
    
    // Blues
    iris: {1:"#fdfdff",2:"#f8f8ff",3:"#f0f1fe",4:"#e6e7ff",5:"#dadcff",6:"#cbcdff",7:"#b8baf8",8:"#9b9ef0",9:"#5b5bd6",10:"#5151cd",11:"#5753c6",12:"#272962"},
    indigo: {1:"#fdfdfe",2:"#f7f9ff",3:"#edf2fe",4:"#e1e9ff",5:"#d2deff",6:"#c1d0ff",7:"#abbdf9",8:"#8da4ef",9:"#3e63dd",10:"#3358d4",11:"#3a5bc7",12:"#1f2d5c"},
    blue: {1:"#fbfdff",2:"#f4faff",3:"#e6f4fe",4:"#d5efff",5:"#c2e5ff",6:"#acd8fc",7:"#8ec8f6",8:"#5eb1ef",9:"#0090ff",10:"#0588f0",11:"#0d74ce",12:"#113264"},
    sky: {1:"#f9feff",2:"#f1faff",3:"#e1f6ff",4:"#d1f0fa",5:"#bee7f5",6:"#a9daed",7:"#8dcae3",8:"#60b3d7",9:"#7ce2fe",10:"#74daf8",11:"#00749e",12:"#1d3e56"},
    cyan: {1:"#fafdfe",2:"#f2fcfd",3:"#e7f9fb",4:"#d8f3f6",5:"#c4eaef",6:"#aadee6",7:"#84cdda",8:"#3db9cf",9:"#00a2c7",10:"#0797b9",11:"#107d98",12:"#0d3c48"},
    
    // Greens
    teal: {1:"#fafefd",2:"#f3fbf9",3:"#e0f8f3",4:"#ccf3ea",5:"#b8eae0",6:"#a1ded2",7:"#83cdc1",8:"#53b9ab",9:"#12a594",10:"#0d9b8a",11:"#008573",12:"#0d3d38"},
    jade: {1:"#fbfefb",2:"#f4fbf6",3:"#e6f7ed",4:"#d6f1e3",5:"#c3e9d7",6:"#acdec8",7:"#8bceb6",8:"#56ba9f",9:"#29a383",10:"#26997b",11:"#208368",12:"#1d3b31"},
    green: {1:"#fbfefc",2:"#f4fbf6",3:"#e6f6eb",4:"#d6f1df",5:"#c4e8ca",6:"#addcb8",7:"#8ecea2",8:"#5bb98b",9:"#30a46c",10:"#2b9a66",11:"#218358",12:"#193b2d"},
    grass: {1:"#fbfefb",2:"#f5fbf5",3:"#e9f6e9",4:"#daf1db",5:"#c9e8ca",6:"#b2ddb5",7:"#94ce9a",8:"#65ba74",9:"#46a758",10:"#3d9a50",11:"#297c3b",12:"#1b311e"},
    
    // Yellows & Oranges
    lime: {1:"#fcfdfa",2:"#f8faf3",3:"#eef6d6",4:"#e2f0bd",5:"#d3e7a6",6:"#c2da91",7:"#abc978",8:"#8db654",9:"#99d52a",10:"#8cc51e",11:"#71a012",12:"#35460c"},
    mint: {1:"#f9fefd",2:"#f2fbf9",3:"#ddf9f2",4:"#c8f4e9",5:"#b3ecde",6:"#9ce0d0",7:"#7ecfbd",8:"#4cbba5",9:"#86ead4",10:"#7de0cb",11:"#027864",12:"#16433c"},
    yellow: {1:"#fdfdf9",2:"#fefce9",3:"#fffab8",4:"#fff394",5:"#ffe770",6:"#f3d768",7:"#e4c767",8:"#d5ae39",9:"#ffe629",10:"#ffdc00",11:"#9e6c00",12:"#473b1f"},
    amber: {1:"#fefdfb",2:"#fefbe9",3:"#fff7c2",4:"#ffee9c",5:"#fbe27f",6:"#f3d768",7:"#e9c748",8:"#e2b72f",9:"#ffb224",10:"#ffa01c",11:"#ad5700",12:"#4e2009"},
    orange: {1:"#fefcfb",2:"#fff7ed",3:"#ffefd6",4:"#ffdfb5",5:"#ffd19a",6:"#ffc182",7:"#f5ae73",8:"#ec9455",9:"#f76b15",10:"#ef5f00",11:"#cc4e00",12:"#582d1d"},
    
    // Browns
    brown: {1:"#fefdfc",2:"#fcf9f6",3:"#f6eee7",4:"#f0e4d9",5:"#ebdaca",6:"#e4cdb7",7:"#dcbc9f",8:"#cea37e",9:"#ad7f58",10:"#a07553",11:"#815e46",12:"#3e332e"},
    bronze: {1:"#fdfcfc",2:"#fdf7f5",3:"#f6edea",4:"#efe4df",5:"#e7d9d3",6:"#dfcdc5",7:"#d3bcb3",8:"#c2a499",9:"#a18072",10:"#957468",11:"#7d5e54",12:"#43302b"},
    gold: {1:"#fdfdfc",2:"#faf9f2",3:"#f2f0e7",4:"#eae6db",5:"#e1dccf",6:"#d8d0bf",7:"#cbc0aa",8:"#b9a88d",9:"#978365",10:"#8c795d",11:"#71624b",12:"#3b352b"},
    
    // Overlays
    black: {1:"#000000",2:"#111111",3:"#191919",4:"#222222",5:"#2a2a2a",6:"#313131",7:"#3a3a3a",8:"#484848",9:"#606060",10:"#6e6e6e",11:"#7c7c7c",12:"#b5b5b5"},
    white: {1:"#ffffff",2:"#fcfcfc",3:"#f9f9f9",4:"#f0f0f0",5:"#e8e8e8",6:"#e0e0e0",7:"#d9d9d9",8:"#cecece",9:"#bbbbbb",10:"#6e6e6e",11:"#646464",12:"#202020"}
  },

  // ========================================
  // USAGE GUIDELINES (Radix Scale Purpose)
  // ========================================
  
  usage: {
    backgrounds: {
      title: 'Background Colors',
      description: 'Optimized for use as backgrounds',
      steps: {
        1: 'App background',
        2: 'Subtle background',
        3: 'UI element background',
        4: 'Hovered UI element background',
        5: 'Active / Selected UI element background'
      }
    },
    interactive: {
      title: 'Interactive Components',
      description: 'For buttons, links, and interactive elements',
      steps: {
        6: 'Subtle borders and separators',
        7: 'UI element border and focus ring',
        8: 'Hovered UI element border',
        9: 'Solid backgrounds',
        10: 'Hovered solid backgrounds'
      }
    },
    text: {
      title: 'Text Colors',
      description: 'Accessible text with guaranteed contrast',
      steps: {
        11: 'Low-contrast text',
        12: 'High-contrast text'
      }
    }
  }
};

/**
 * Get color scale for a specific color and mode
 */
export function getColorScale(colorName, mode = 'dark') {
  return radixThemes[mode][colorName] || radixThemes.dark.slate;
}

/**
 * Get theme preset
 */
export function getThemePreset(presetName) {
  return radixThemes.presets[presetName] || radixThemes.presets.indigo;
}

/**
 * Get semantic color for a purpose
 */
export function getSemanticColor(purpose, mode = 'dark') {
  const mapping = {
    success: 'green',
    error: 'red',
    warning: 'amber',
    info: 'blue'
  };
  return getColorScale(mapping[purpose] || 'gray', mode);
}

/**
 * Get color for specific usage context
 */
export function getColorByUsage(colorName, usage, mode = 'dark') {
  const scale = getColorScale(colorName, mode);
  
  const usageMap = {
    'bg-app': scale[1],
    'bg-subtle': scale[2],
    'bg-ui': scale[3],
    'bg-hover': scale[4],
    'bg-active': scale[5],
    'border-subtle': scale[6],
    'border': scale[7],
    'border-hover': scale[8],
    'solid': scale[9],
    'solid-hover': scale[10],
    'text-low': scale[11],
    'text-high': scale[12]
  };
  
  return usageMap[usage] || scale[9];
}

/**
 * Apply theme to CSS variables
 */
export function applyThemeToElement(element, theme, mode = 'dark') {
  const primary = getColorScale(theme.primary, mode);
  const accent = getColorScale(theme.accent, mode);
  const neutral = getColorScale(theme.neutral, mode);
  const semantic = theme.semantic || {};

  // Apply primary colors
  Object.entries(primary).forEach(([step, color]) => {
    element.style.setProperty(`--color-primary-${step}`, color);
  });
  
  // Apply accent colors
  Object.entries(accent).forEach(([step, color]) => {
    element.style.setProperty(`--color-accent-${step}`, color);
  });
  
  // Apply neutral colors
  Object.entries(neutral).forEach(([step, color]) => {
    element.style.setProperty(`--color-neutral-${step}`, color);
  });
  
  // Apply semantic colors
  Object.entries(semantic).forEach(([purpose, colorName]) => {
    const scale = getColorScale(colorName, mode);
    Object.entries(scale).forEach(([step, color]) => {
      element.style.setProperty(`--color-${purpose}-${step}`, color);
    });
  });
}

/**
 * Get colors by category
 */
export function getColorsByCategory(category) {
  return radixThemes.categories[category]?.colors || [];
}

