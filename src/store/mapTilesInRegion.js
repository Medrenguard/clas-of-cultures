// Общий справочник регионов
const mapTilesInRegion = () => {
  return {
    0: [// регион под туманом
      { type: 'fog', translate: 'top' },
      { type: 'fog', translate: 'left' },
      { type: 'fog', translate: 'right' },
      { type: 'fog', translate: 'bottom' }
    ],
    1: [// стандартный стартовый регион
      { type: 'wasteland', translate: 'top' },
      { type: 'forest', translate: 'left' },
      { type: 'mountains', translate: 'right' },
      { type: 'field', translate: 'bottom' }
    ], // далее идут регионы с присвоением реального номера из игры(кроме специальных стартовых: для них резерв 2,3,4)
    5: [
      { type: 'sea', translate: 'top' },
      { type: 'mountains', translate: 'left' },
      { type: 'sea', translate: 'right' },
      { type: 'mountains', translate: 'bottom' }
    ],
    6: [
      { type: 'sea', translate: 'top' },
      { type: 'sea', translate: 'left' },
      { type: 'mountains', translate: 'right' },
      { type: 'field', translate: 'bottom' }
    ],
    7: [
      { type: 'forest', translate: 'top' },
      { type: 'forest', translate: 'left' },
      { type: 'sea', translate: 'right' },
      { type: 'sea', translate: 'bottom' }
    ],
    8: [
      { type: 'field', translate: 'top' },
      { type: 'sea', translate: 'left' },
      { type: 'forest', translate: 'right' },
      { type: 'sea', translate: 'bottom' }
    ],
    9: [
      { type: 'forest', translate: 'top' },
      { type: 'mountains', translate: 'left' },
      { type: 'mountains', translate: 'right' },
      { type: 'sea', translate: 'bottom' }
    ],
    10: [
      { type: 'mountains', translate: 'top' },
      { type: 'sea', translate: 'left' },
      { type: 'field', translate: 'right' },
      { type: 'mountains', translate: 'bottom' }
    ],
    11: [
      { type: 'sea', translate: 'top' },
      { type: 'field', translate: 'left' },
      { type: 'forest', translate: 'right' },
      { type: 'mountains', translate: 'bottom' }
    ],
    12: [
      { type: 'forest', translate: 'top' },
      { type: 'sea', translate: 'left' },
      { type: 'field', translate: 'right' },
      { type: 'forest', translate: 'bottom' }
    ],
    13: [
      { type: 'field', translate: 'top' },
      { type: 'sea', translate: 'left' },
      { type: 'wasteland', translate: 'right' },
      { type: 'mountains', translate: 'bottom' }
    ],
    14: [
      { type: 'sea', translate: 'top' },
      { type: 'wasteland', translate: 'left' },
      { type: 'forest', translate: 'right' },
      { type: 'field', translate: 'bottom' }
    ],
    15: [
      { type: 'sea', translate: 'top' },
      { type: 'field', translate: 'left' },
      { type: 'field', translate: 'right' },
      { type: 'wasteland', translate: 'bottom' }
    ],
    16: [
      { type: 'field', translate: 'top' },
      { type: 'sea', translate: 'left' },
      { type: 'field', translate: 'right' },
      { type: 'wasteland', translate: 'bottom' }
    ],
    17: [
      { type: 'mountains', translate: 'top' },
      { type: 'forest', translate: 'left' },
      { type: 'mountains', translate: 'right' },
      { type: 'wasteland', translate: 'bottom' }
    ],
    18: [
      { type: 'forest', translate: 'top' },
      { type: 'mountains', translate: 'left' },
      { type: 'field', translate: 'right' },
      { type: 'mountains', translate: 'bottom' }
    ],
    19: [
      { type: 'field', translate: 'top' },
      { type: 'forest', translate: 'left' },
      { type: 'mountains', translate: 'right' },
      { type: 'field', translate: 'bottom' }
    ],
    20: [
      { type: 'forest', translate: 'top' },
      { type: 'field', translate: 'left' },
      { type: 'field', translate: 'right' },
      { type: 'field', translate: 'bottom' }
    ]
  }
}

export default {
  namespaced: true,
  state: mapTilesInRegion
}
