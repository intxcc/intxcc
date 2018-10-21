'use strict'

import { types } from 'mobx-state-tree'
import { keys } from 'mobx'

import { isEmpty } from '../../miscFunctions'

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
  fallbackScrollTop: types.optional(types.number, 0),
  // To animate scrolling set animate scroll to to true and set the scrollTo variable
  animateScrollBy: types.optional(types.boolean, false),
  scrollByValue: types.optional(types.number, 0),
  // To add functionality that the startpage can appear after beeing disabled beforehand
  disabled: types.optional(types.boolean, false),
  popups: types.optional(types.map(PopupModel), {}),
  viewEntityId: types.optional(types.string, '')
}).volatile(self => ({
  lastPersist: 0
})).views(self => ({
  get isDisabled () {
    return self.disabled || !isEmpty(self.popups.toJSON())
  }
})).actions(self => {
  // Saves the state to local/session storage. Force will always safe the state, for some properties (like scroll) it is preferrable to not force, because this changes very often, and to save on every change does not make much sense in regard to performance
  function persist (force) {
    const timeDifference = (new Date()).getTime() - self.lastPersist

    // If less than 1 second past since last persist and this persist is not forced skip it
    if (!force && timeDifference < 2000) {
      return
    }

    self.lastPersist = (new Date()).getTime()
    persistStateBasicInfo(self.toJSON())
  }

  // Save viewEntity id, to know e.g. if the main view is responsible for the state of this basic info
  function setViewEntityId (entityId) {
    self.viewEntityId = entityId
  }

  // Attention: This only does set the self.disabled variable. If there are popups isDisabled will still return true
  function setDisabled (disabled) {
    self.disabled = disabled
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

  function saveFallbackScrollTop (scrollTop) {
    self.fallbackScrollTop = scrollTop
    self.persist(false)
  }

  function setScrollTop (scrollTop) {
    self.scrollTop = scrollTop
    self.persist(false)
  }

  // Animate scroll top to scrollTo
  function scrollBy (scrollByValue) {
    self.setScrollTop(self.scrollTop + scrollByValue)

    self.animateScrollBy = true
    self.scrollByValue = scrollByValue
  }

  function stopScrollBy () {
    self.animateScrollBy = false
  }

  function show404Popup () {
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
    setViewEntityId,
    setDisabled,
    setClientDimensions,
    setViewEntityReference,
    setModelVariant,
    saveFallbackScrollTop,
    setScrollTop,
    scrollBy,
    stopScrollBy,
    show404Popup,
    showPopup,
    closePopup,
    clearNotPersistentPopups
  }
})

export default BasicInfoModel
