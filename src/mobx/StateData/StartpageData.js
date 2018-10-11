'use strict'

import Defaults from '../../config/defaults'

const StartpageData = {
  basicInfo: {
    id: 'startpageBasicInfo',
    popups: (Defaults.disableDefaultPopups
      ? [] : [{
        id: 'start-popup',
        customComponent: 'StartPopup',
        persistent: false
      }])
  }
}

export default StartpageData
