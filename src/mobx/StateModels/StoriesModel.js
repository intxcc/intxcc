'use strict'

import { types, resolveIdentifier } from 'mobx-state-tree'
import { keys } from 'mobx'

import Style from '../../../style/variables/global.scss'

import Defaults from '../../config/defaults'
import STORIES_EXPLANATION from '../../config/POPUP_STORIES_EXPLANATION'

import ViewEntity from '../model/ViewEntity'
import BasicInfoModel from '../model/BasicInfoModel'

const StoryModel = types.model({
  id: types.identifier,
  div: types.maybeNull(types.frozen()),
  top: types.optional(types.number, 0),
  bottom: types.optional(types.number, 0),
  textName: types.string,
  name: types.string,
  year: types.number,
  time: types.optional(types.string, ''),
  type: types.string,
  subType: types.optional(types.string, ''),
  skills: types.optional(types.array(types.string), []),
  summary: types.string
})

const YearListItem = types.model({
  year: types.number,
  stories: types.array(types.reference(StoryModel))
})

const StoriesModel = types.model({
  id: types.identifier,
  basicInfo: BasicInfoModel,
  routerParams: types.optional(types.map(types.string), {}),
  years: types.array(YearListItem),
  selectedStory: types.reference(StoryModel),
  storiesIndex: types.optional(types.map(types.string), {}),
  stories: types.array(StoryModel),
  ignoreScroll: types.optional(types.boolean, false),
  fallbackShowTimeline: types.optional(types.boolean, true),
  fallbackTimelineTransition: types.optional(types.boolean, false),
  scrollTopInPercent: types.optional(types.number, 0)
}).volatile(self => ({
  ignoreScrollTimeout: false,
  resizeScrollToStoryTimeout: false,
  lastClientWidth: false
})).actions(self => {
  function resetFallbackTimelineTransition () {
    self.fallbackTimelineTransition = false
    setTimeout(() => self.onResize(true), 200)
  }

  function setFallbackShowTimeline (showTimeline) {
    if (self.fallbackShowTimeline !== showTimeline) {
      self.fallbackTimelineTransition = true
      setTimeout(self.resetFallbackTimelineTransition, Style.variantMorphDuration)
    }
    self.fallbackShowTimeline = showTimeline
  }

  function onRouterParamChange (paramName, paramValue) {
    self.routerParams.set(paramName, paramValue)

    // Ignore the unselection on the stories page, but still update the routerParams
    if (paramValue === '') {
      return
    }

    switch (paramName) {
      case 'story_name':
        const storyIdentifier = 'story-' + paramValue

        // Only selectStoryByIdentifier if the selected story is not already selected
        if (storyIdentifier !== self.selectedStory.id) {
          self.selectStoryByIdentifier(storyIdentifier)
        }

        break
    }
  }

  function resizeScrollToStoryCallback (story) {
    self.resizeScrollToStoryTimeout = false
    self.ignoreScrollForMs(2000)

    if (!self.basicInfo.rootStore.global.useFallback || self.scrollTopInPercent === -1) {
      self.scrollToStory(story)
      return
    }

    self.updateStoriesTop()
    const firstStoryTop = self.stories.get(0).top
    const lastStoryBottom = self.stories.get(self.stories.length - 1).bottom
    const storiesHeight = lastStoryBottom - firstStoryTop
    const newScrollTop = self.scrollTopInPercent * storiesHeight

    setTimeout(() => window.scroll({
      top: newScrollTop,
      left: 0,
      behavior: 'smooth'
    }), 200)
  }

  function onResize (force = false) {
    // Ignore vertical resizing, as it might happen when scrolling on a mobile device
    if (!force &&
      (!self.lastClientWidth || self.lastClientWidth === self.basicInfo.rootStore.global.clientWidth)) {
      self.lastClientWidth = self.basicInfo.rootStore.global.clientWidth
      return
    }
    self.lastClientWidth = self.basicInfo.rootStore.global.clientWidth

    const storyId = self.routerParams.get('story_name')
    if (storyId && storyId !== '') {
      const storyIdentifier = 'story-' + storyId
      const story = resolveIdentifier(StoryModel, self.stories, storyIdentifier)
      if (story) {
        if (self.resizeScrollToStoryTimeout) {
          clearTimeout(self.resizeScrollToStoryTimeout)
        }

        self.resizeScrollToStoryTimeout = setTimeout(() => {
          self.resizeScrollToStoryCallback(story)
        }, 200)
      }
    }
  }

  function showExplanation () {
    self.basicInfo.showPopup(STORIES_EXPLANATION)
  }

  function selectStoryByIdentifier (storyIdentifier, isCallback = false, doScroll = true, ignoreNextScroll = true) {
    // Show 404 if the skill does not exist and go to the skill with the id 0
    if (typeof storyIdentifier === 'undefined' || typeof resolveIdentifier(StoryModel, self.stories, storyIdentifier) === 'undefined') {
      self.selectStoryByIndex(0)

      // If there are no skills the skill identifier will be undefined, don't show 404 in this case
      if (typeof storyIdentifier !== 'undefined') {
        self.basicInfo.show404Popup()
      }

      return
    }

    if (ignoreNextScroll) {
      // Ignore scroll right away, because otherwise, if the story changed outside of the state, the state will revert the change
      self.ignoreScrollForMs(2000)
    }

    // Always wait 100ms before selecting a story, so the app has time to tell us if the viewEntity, the stories are shown in is the buffer or not
    if (!isCallback) {
      setTimeout(() => self.selectStoryByIdentifier(storyIdentifier, true, doScroll, ignoreNextScroll), 100)
      return
    }

    const storyIndex = self.storiesIndex.get(storyIdentifier)
    const story = self.stories.get(storyIndex)

    if (self.selectedStory.id === story.id) {
      return
    }

    // Change document title
    const newTitle = story.name + ' | stories | ' + Defaults.BasicTitle
    setTimeout(() => { document.title = newTitle }, 100)

    // Track page view
    /* eslint-disable */
    _paq.push(['setCustomUrl', '/' + window.location.hash.substr(1)])
    _paq.push(['setDocumentTitle', newTitle])
    _paq.push(['trackPageView'])
    /* eslint-enable */

    // If the divs were not initialized yes, wait at the end of the js event queue
    if (typeof story.div === 'undefined') {
      // Try again to get div at end of the js event loop
      setTimeout(() => self.selectStoryByIdentifier(storyIdentifier, true, doScroll, ignoreNextScroll), 0)
      return
    }

    // Only scroll, if the viewEntity, this state is shown in, is not the buffer, because the buffer is the only viewEntity with only a temporary use case
    if (!self.basicInfo || self.basicInfo.viewEntityId === 'buffer') {
      setTimeout(() => self.selectStoryByIdentifier(storyIdentifier, true, doScroll, ignoreNextScroll), 500)
      return
    }

    // Scroll to selected story and set it as selected
    self.selectedStory = story
    if (doScroll) {
      if (ignoreNextScroll) {
        self.ignoreScrollForMs(2000)
      }
      self.scrollToStory(story)
    }

    // Check if the URL does represent the selected story. If not, we change the URL
    if ('story-' + self.routerParams.get('story_name') !== self.selectedStory.id) {
      window.history.pushState(null, null, '/#/stories/' + self.selectedStory.id)

      // Propagate hash change to router, which does normally not happened when the changes comes from within the application
      if (self.basicInfo) {
        setTimeout(self.basicInfo.rootStore.router.onHashChange, 0)
      }
    }

    const isIeOrEdge = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g) || !!/Edge\/\d./i.test(navigator.userAgent)
    if (!isIeOrEdge) {
      setTimeout(() => {
        const elem = document.getElementById('selected-story-year-id')
        if (elem) {
          elem.scrollIntoView({behavior: 'smooth'})
        }
      }, 0)
    }
  }

  function selectStoryByIndex (index) {
    self.selectStoryByIdentifier(self.stories.get(index).id)
  }

  function setDiv (storyId, div) {
    if (div === null) {
      return
    }

    const story = resolveIdentifier(StoryModel, self.stories, storyId)
    if (typeof story === 'undefined') {
      return
    }

    story.div = div
  }

  function updateStoriesTop () {
    for (let key of keys(self.stories)) {
      const story = self.stories.get(key)
      const rect = story.div.getBoundingClientRect()
      story.top = rect.top
      story.bottom = rect.bottom
    }
  }

  function ignoreScrollForMs (timeoutMs, isCallback = false) {
    if (!isCallback) {
      self.ignoreScroll = true
      if (self.ignoreScrollTimeout) {
        clearTimeout(self.ignoreScrollTimeout)
      }
      self.ignoreScrollTimeout = setTimeout(() => self.ignoreScrollForMs(0, true), timeoutMs)
    } else {
      self.ignoreScrollTimeout = false
      self.ignoreScroll = false
    }
  }

  function onScroll (scrollTop) {
    if (self.basicInfo.rootStore.global.useFallback) {
      // Calculate the scrollTop in percent
      const firstStoryTop = self.stories.get(0).top
      const lastStoryBottom = self.stories.get(self.stories.length - 1).bottom
      const storiesHeight = lastStoryBottom - firstStoryTop
      self.scrollTopInPercent = scrollTop / storiesHeight
    } else {
      self.scrollTopInPercent = -1
    }

    const isBuffer = self.basicInfo && self.basicInfo.viewEntityId === 'buffer'
    // Ignore scroll if this the stories page is in the buffer
    if (self.ignoreScroll || isBuffer) {
      return
    }

    // Only safe scrolltop in basic info if not in fallback. FallbackApp handles that itself
    if (!self.basicInfo.rootStore.global.useFallback) {
      self.basicInfo.setScrollTop(scrollTop)
    }

    self.updateStoriesTop()

    const marginTopValue = self.basicInfo.rootStore.global.clientHeight / 1.5

    let biggestNegativeTopKey = false
    let biggestNegativeTopValue = false
    // To select a story we get the one, from which the top is the smallest amount above position top 0
    for (let key of keys(self.stories)) {
      const story = self.stories.get(key)
      const storyTopWithMargin = story.top - marginTopValue
      if (storyTopWithMargin < 0) {
        if (biggestNegativeTopKey === false) {
          biggestNegativeTopKey = key
          biggestNegativeTopValue = storyTopWithMargin
        } else if (storyTopWithMargin > biggestNegativeTopValue) {
          biggestNegativeTopKey = key
          biggestNegativeTopValue = storyTopWithMargin
        }
      }
    }
    // If no top is negative we just select the first story
    let newSelection = null
    if (biggestNegativeTopKey === false) {
      newSelection = self.stories.get(keys(self.stories)[0])
    } else {
      newSelection = self.stories.get(biggestNegativeTopKey)
    }

    // Fallback doesn't have modelVariants, so we can skip this if fallback is active
    if (!self.basicInfo.rootStore.global.useFallback) {
      if (Math.abs(biggestNegativeTopValue) < marginTopValue * 0.75) {
        self.basicInfo.viewEntity.changeModelVariant('default')
      } else {
        self.basicInfo.viewEntity.changeModelVariant('ArticleFocusModel')
      }
    }

    const urlStoryName = 'story-' + self.routerParams.get('story_name')
    if (newSelection.id !== self.selectedStory.id || newSelection.id !== urlStoryName) {
      // Last property decides, if we scroll or not. newSelection.top > 0 is true, when we need to scroll down. If we would need to scroll up, don't scroll.
      // Never force scroll, while the user is scrolling, because this will result in a better UX
      self.selectStoryByIdentifier(newSelection.id, false, false, false)
    }
  }

  function scrollToStory (story) {
    // Fallback doesn't have modelVariants, so we can skip this if fallback is active
    if (!self.basicInfo.rootStore.global.useFallback) {
      // Check if the viewEntity is valid, otherwise skip the model change
      if (typeof resolveIdentifier(ViewEntity, self.basicInfo.rootStore.views, self.basicInfo.toJSON().viewEntity) !== 'undefined') {
        // If we scroll to the story top, always show the details view (that is the default)
        self.basicInfo.viewEntity.changeModelVariant('default')
      }
    }

    self.updateStoriesTop()

    // In fallback we scroll to start of black and in not-fallback the start of the block shall be more centered in the mid, bause of the headline polygon
    if (self.basicInfo.rootStore.global.useFallback) {
      // -50 because of the burger menu handle
      self.basicInfo.scrollBy(story.top - 50)
    } else {
      const marginTopValue = self.basicInfo.rootStore.global.clientHeight / 1.5
      self.basicInfo.scrollBy(story.top - (marginTopValue / 1.5))
    }
  }

  return {
    resetFallbackTimelineTransition,
    setFallbackShowTimeline,
    onRouterParamChange,
    resizeScrollToStoryCallback,
    onResize,
    showExplanation,
    selectStoryByIdentifier,
    selectStoryByIndex,
    setDiv,
    updateStoriesTop,
    ignoreScrollForMs,
    onScroll,
    scrollToStory
  }
})

export default StoriesModel
