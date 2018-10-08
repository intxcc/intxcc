'use strict'

import { types } from 'mobx-state-tree'
import { keys } from 'mobx'

import ViewEntity from './ViewEntity'

import RootStoreModel from '../RootStoreModel'
import PopupModel from './PopupModel'

import POPUP_404 from '../../config/POPUP_404'

import persistStateBasicInfo from '../../persist/persistStateBasicInfo'

/**
 * Basic Info for the different view states. Like scrollTop and modelvariant of the view, that is currently showing this. The basic info is at first a property of the view states, but in this file, because we get an infinite import loop otherwise. So before I google 1 hour how to circumvent this is just paste it here and write this far too long comment.
 */
const BasicInfoModel = types.model({
  // Necessary to reference this in the view entity
  id: types.identifier,
  // For easier accessibility
  rootStore: types.optional(types.reference(types.late(() => RootStoreModel)), 'root-store'),
  clientWidth: types.optional(types.number, 0),
  clientHeight: types.optional(types.number, 0),
  viewEntity: types.optional(types.reference(types.late(() => ViewEntity)), ''),
  modelVariant: types.optional(types.string, 'default'),
  scrollTop: types.optional(types.number, 0),
  popups: types.optional(types.map(PopupModel), {})
}).volatile(self => ({
  lastPersist: 0
})).actions(self => {
  // Saves the state to local/session storage. Force will always safe the state, for some properties (like scroll) it is preferrable to not force, because this changes very often, and to save on every change does not make much sense in regard to performance
  function persist (force) {
    const timeDifference = (new Date()).getTime() - self.lastPersist

    // If less than 1 second past since last persist and this persist is not forced skip it
    if (!force && timeDifference < 1000) {
      return
    }

    self.lastPersist = (new Date()).getTime()
    persistStateBasicInfo(self.toJSON())
  }

  // Save the client dimensions here, so we can use them to calculate e.g. the mid to center the selected dif in the skills view
  function setClientDimensions (clientWidth, clientHeight) {
    self.clientWidth = clientWidth
    self.clientHeight = clientHeight
  }

  function setViewEntityReference (viewEntity) {
    self.viewEntity = viewEntity
  }

  function setModelVariant (modelVariant) {
    self.modelVariant = modelVariant
  }

  function setScrollTop (scrollTop) {
    self.scrollTop = scrollTop
    self.persist(false)
  }

  function show404Popup (popup) {
    self.showPopup(POPUP_404)
  }

  function showPopup (popup) {
    self.popups.set(popup.id, popup)
  }

  function closePopup (id) {
    self.popups.delete(id)
    self.persist(true)
  }

  function clearNotPersistentPopups () {
    for (let popupKey of keys(self.popups)) {
      if (!self.popups.get(popupKey).persistent) {
        self.popups.delete(popupKey)
      }
    }
  }

  return {
    persist,
    setClientDimensions,
    setViewEntityReference,
    setModelVariant,
    setScrollTop,
    show404Popup,
    showPopup,
    closePopup,
    clearNotPersistentPopups
  }
})

export default BasicInfoModel
