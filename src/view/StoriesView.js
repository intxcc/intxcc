'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'
import YearSelection from './Stories/YearSelection'

const StoriesView = observer((props) => (
  <div className='content-wrapper-inner'>
    <ViewObject object={props.view.objects.get('stories-top-left-white-area')}></ViewObject>
    <ViewObject object={props.view.objects.get('stories-top-right-white-area')}></ViewObject>
    <ViewObject object={props.view.objects.get('stories-top-middle-white-area')}></ViewObject>
    <ViewObject object={props.view.objects.get('articles-container')}>
      <article>
        <h2>
          <div className='h2-filler h2-filler-left'></div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          <div className='h2-filler h2-filler-right'></div>
        </h2>
        <div className='clear-both'></div>
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. <br />
        <br />
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. <br />
        <br />
        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. <br />
        <br />
        Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. <br />
        <br />
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. <br />
        <br />
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
      </article>
    </ViewObject>
  </div>
))

StoriesView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const StoriesOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
    <ViewObject object={props.view.objects.get('story-name-display')}>
      Mobile App<br />
      <div className='story-name-caption'>
        Android
      </div>
    </ViewObject>
    <ViewObject object={props.view.objects.get('selected-year-display')}>
      {props.state.years[props.state.selectedYear]}
      <span className='selected-year-caption'>
        May Till August
      </span>
    </ViewObject>
    <ViewObject object={props.view.objects.get('story-info-display')}>
      <span className='story-info-display-name'>OwnTrack</span>
      <div className='story-info-secondary-display'>
        <b>Skills</b> java | android studio | mysql | python | php
      </div>
    </ViewObject>
    <YearSelection
      object={props.view.objects.get('year-selection')}
      className={'stories-year-selection'}
      years={props.state.years}
      selectedYear={props.state.selectedYear}
      selectYear={props.state.selectYear} />
    <ViewObject object={props.view.objects.get('story-page-name-display')}>
      stories
      <div className='story-page-name-display-caption'>
        portfolio
      </div>
    </ViewObject>
  </div>
))

StoriesOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { StoriesView, StoriesOverlayView }
