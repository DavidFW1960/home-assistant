class BarCard extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }
  setConfig (config) {
    // Default Card variables
    if (!config.height) config.height = '40px'
    if (!config.direction) config.direction = 'right'
    if (!config.rounding) config.rounding = '3px'
    if (!config.title_position) config.title_position = 'left'
    if (!config.indicator) config.indicator = 'auto'
    if (!config.saturation) config.saturation = '50%'
    if (!config.animation) config.animation = 'auto'
    if (!config.speed) config.speed = 1000
    if (!config.delay) config.delay = 5000
    if (!config.min) config.min = 0
    if (!config.max) config.max = 100
    if (!config.padding) config.padding = '4px'
    if (!config.align) config.align = 'center'
    if (!config.show_icon) config.show_icon = false

    // Check entity types
    let updateArray
    let updateEntity
    if (config.entities) {
        let newArray = []
        config.entities.forEach(section => {
          let type = typeof(section);
          if (type == 'string'){
            let constructObject = {"entity":section};
            newArray.push(constructObject)
            updateArray = true
          } else {
            updateEntity = true
          }
        })
        if(updateArray == true){
          config.entities = newArray;
        }
    } else if (config.entity) {
      config.entities = [{"entity":config.entity}]
    }

    // Check if title position is inside
    if (!config.width) {
      if (config.title_position != 'inside') {
        config.width = '70%'
      } else {
        config.width = '100%'
      }
      if (config.title_position == 'top' || config.title_position == 'bottom' || config.title_position == 'off'){
        config.width = '100%'
      }
    }

    // Define card container
    let cardContainer = document.createElement('card-container')
    let cardContainerStyle = document.createElement('style')
    cardContainerStyle.textContent = `
      card-container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }  
    `
    // For each entity in entities list create cardElements
    for (var i = 0; i <= config.entities.length-1; i++){
      let entityName = config.entities[i].entity.split('.')
      cardContainer.appendChild(this._cardElements(config, entityName[0]+'_'+entityName[1]+i, config.entities[i].entity))
    }

    this.shadowRoot.appendChild(cardContainer)
    this.shadowRoot.appendChild(cardContainerStyle)
    
    // For each entity in entities list update entity. Initial update.
    if (updateEntity == true) {
      for(var i=0; i <= config.entities.length-1; i++){
        let entityName = config.entities[i].entity.split('.')
        this._updateEntity(config.entities[i].entity, entityName[0]+'_'+entityName[1]+i)
      }
    }

    // Set config for this card.
    this._config = config
  }

  // On hass update
  set hass (hass) {
    this._hass = hass
    const config = this._config
    for(var i=0; i <= config.entities.length-1; i++){
      let entityName = config.entities[i].entity.split('.')
      this._updateEntity(config.entities[i].entity, entityName[0]+'_'+entityName[1]+i)
    }
  }

  // Create card elements
  _cardElements(config, id, entity) {
    const card = document.createElement('ha-card')
    const container = document.createElement('div')
    container.id = 'container_'+id
    const background = document.createElement('div')
    background.id = 'background_'+id
    const backgroundBar = document.createElement('div')
    backgroundBar.id = 'backgroundBar_'+id
    const bar = document.createElement('div')
    bar.id = 'bar_'+id

    // Check if icon is enabled
    if (config.show_icon == true) {
      var icon = document.createElement('ha-icon')
      icon.id = 'icon_'+id
    }     
    
    // Check if title is not inside
    if (config.title !== "inside"){
      var title = document.createElement('div')
      title.id = 'title_'+id
      var titleBar = document.createElement('div')
      titleBar.id = 'titleBar_'+id
    }

    const value = document.createElement('div')
    value.id = 'value_'+id

    // Check if animation is enabled
    if (config.animation !== "off") {
      var chargeBar = document.createElement('div')
      chargeBar.id = 'chargeBar_'+id
    }

    // Check if target is defined
    if (config.target) {
      var targetBar = document.createElement('div')
      targetBar.id = 'targetBar_'+id
      var targetBarColor = document.createElement('div')
      targetBarColor.id = 'targetBarColor_'+id
      var targetMarker = document.createElement('div')
      targetMarker.id = 'targetMarker_'+id
      var targetMarkerColor = document.createElement('div')
      targetMarkerColor.id = 'targetMarkerColor_'+id
    }

    // Check if indicator is enabled
    if (config.indicator !== "off"){
      var indicatorContainer = document.createElement('div')
      indicatorContainer.id = 'indicatorContainer_'+id
      var indicatorBar = document.createElement('div')
      indicatorBar.id = 'indicatorBar_'+id
      var indicator = document.createElement('div')
      indicator.id = 'indicator_'+id
      var indicatorColor = document.createElement('div')
      indicatorColor.id = 'indicatorColor_'+id
    }
        
    // Start building card
    background.appendChild(backgroundBar)
    background.appendChild(bar)

    // Check if animation is not disabled
    if (config.animation !== "off") {
      background.appendChild(chargeBar)
    }

    // Check if target is configured
    if (config.target) {
      targetBar.appendChild(targetMarker)
      targetBarColor.appendChild(targetMarkerColor)
      background.appendChild(targetBar)
      background.appendChild(targetBarColor)
    }

    // Check if indicator is not disabled
    if (config.indicator != 'off') {
      indicatorContainer.appendChild(indicator)
      indicatorContainer.appendChild(indicatorColor)
      indicatorBar.appendChild(indicatorContainer)
      background.appendChild(indicatorBar)
    }

    if (config.show_icon == true) {
      background.appendChild(icon) 
    }

    // Select title position
    switch (config.title_position) {
      case 'left':
      case 'right':
      case 'top':
      case 'bottom':
        if (config.title_position != 'inside') {
          titleBar.appendChild(title)
          container.appendChild(titleBar)
        }
        container.appendChild(background)
        break
      case 'inside':
        background.appendChild(title)
        container.appendChild(background)
        break
      case 'off':
        container.appendChild(background)      
    }

    background.appendChild(value)
    card.appendChild(container)
    card.appendChild(this._styleElements(config, id))
    card.addEventListener('click', event => {
      this._showAttributes('hass-more-info', { entityId: entity })
    })

    return card
  }
  
  // Create style elements
  _styleElements(config, id) {
    const style = document.createElement('style');
    if (config.value_style) var valueStyle = this._customStyle(config.value_style)
    if (config.title_style) var titleStyle = this._customStyle(config.title_style)
    if (config.icon_style) var iconStyle = this._customStyle(config.icon_style)
    if (config.card_style) var cardStyle = this._customStyle(config.card_style)

    // Sets position of the titleBar
    let titleAlign
    let titleWidth
    let titleflexDirection
    switch (config.title_position) {
      case 'left':
        titleWidth = 'width: calc(100% - ' + config.width + ');'
        titleAlign = 'justify-content: flex-start;'
        titleflexDirection = 'flex-direction: row;'
        break
      case 'right':
        titleWidth = 'width: calc(100% - ' + config.width + ');'
        titleAlign = 'justify-content: flex-start;'
        titleflexDirection = 'flex-direction: row-reverse;'
        break
      case 'top':
        titleWidth = 'width: 100%;'
        titleAlign = 'justify-content: center;'
        titleflexDirection = 'flex-direction: column;'
        break
      case 'bottom':
        titleWidth = 'width: 100%;'
        titleAlign = 'justify-content: center;'
        titleflexDirection = 'flex-direction: column-reverse;'
        break
    }

    // Set marker direction based on card direction
    let markerDirection
    let barFrom
    let insideWhitespace
    switch (config.direction) {
      case 'left':
        barFrom = 'left'
        markerDirection = 'right'
        insideWhitespace = 'nowrap'
        break
      case 'right':
        barFrom = 'right'
        markerDirection = 'left'
        insideWhitespace = 'nowrap'
        break
      case 'up':
        barFrom = 'top'
        markerDirection = 'bottom'
        break
      case 'down':
        barFrom = 'bottom'
        markerDirection = 'top'
        break
    }

    // Set marker style based on bar direction
    let markerStyle
    if (barFrom == 'left' || barFrom == 'right') {
      markerStyle = `
      #targetMarker_${id}, #targetMarkerColor_${id} {
        position: absolute;
        background: #FFF0;
        ${markerDirection}: var(--targetMarker-percent);
        height: ${config.height};
        border-left: 2px dashed var(--targetMarker-color);
      }
      #targetMarkerColor_${id} {
        border-left: 2px dashed var(--bar-fill-color);
      }
      `
    } else {
      markerStyle = `
      #targetMarker_${id}, #targetMarkerColor_${id} {
        position: absolute;
        background: #FFF0;
        ${markerDirection}: var(--targetMarker-percent);
        width: 100%;
        border-top: 2px dashed var(--targetMarker-color);
      }
      #targetMarkerColor_${id} {
        border-top: 2px dashed var(--bar-fill-color);
      }
      `
    }

    // Set title style based on title position
    let positionTitleStyle
    let paddingStyle
    if (config.direction == 'up' || config.direction == 'down'){
      paddingStyle = '4px'
    }
    if (config.title_position == 'inside') {
      positionTitleStyle = `
      width: calc(100% - 8px);
      font-weight: bold;
      color: #FFF;
      text-shadow: 1px 1px #000;
      padding-top: ${paddingStyle};
      padding-bottom: ${paddingStyle};
      --padding-left: 4px;
      --padding-right: 4px;
      padding-left: var(--padding-left);
      padding-right: var(--padding-right);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: ${insideWhitespace};
      `
    } else {
      positionTitleStyle = `
      color: var(--primary-text-color);
      padding-left: 10px;
      padding-right: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      `      
    }

    let justifyContent
    let alignItems
    let textAlign
    let flexDirection
    switch (config.align) {
      case 'right':
        flexDirection = 'column'
        textAlign = 'right'
        alignItems = 'flex-end'
        justifyContent = 'center'
        break
      case 'left':
        flexDirection = 'column'
        justifyContent = 'center'
        alignItems = 'flex-start'
        textAlign = 'left'
        break
      case 'top':
        flexDirection = 'column'
        justifyContent = 'flex-start'
        alignItems = 'center'
        textAlign = 'center'
        break
      case 'top-split':
        flexDirection = 'row'
        justifyContent = 'space-between'
        alignItems = 'flex-start'
        if (config.show_icon == true) textAlign = 'center'
        else textAlign = 'left'
        break
      case 'bottom':
        flexDirection = 'column'
        justifyContent = 'flex-end'
        alignItems = 'center'
        textAlign = 'center'
        break
      case 'bottom-split':
        flexDirection = 'row'
        justifyContent = 'space-between'
        alignItems = 'flex-end'
        if (config.show_icon == true) textAlign = 'center'
        else textAlign = 'left'
        break
      case 'split':
        alignItems = 'center'
        flexDirection = 'row'
        justifyContent = 'space-between'
        if (config.show_icon == true) textAlign = 'center'
        else textAlign = 'left'
        break
      case 'left-split':
        flexDirection = 'column'
        justifyContent = 'space-between'
        alignItems = 'flex-start'
        break
      case 'right-split':
        flexDirection = 'column'
        justifyContent = 'space-between'
        alignItems = 'flex-end'
        textAlign = 'right'
        break
      case 'center':
        flexDirection = 'column'
        if (config.title_position != 'inside') textAlign = 'left'
        else textAlign = 'center'
        justifyContent = 'center'
        alignItems = 'center'
        break
      case 'center-split':
        flexDirection = 'column'
        textAlign = 'center'
        justifyContent = 'space-between'
        alignItems = 'center'
    }

    // Set CSS styles
    let haCardWidth
    if (config.columns) {
      haCardWidth = Math.trunc(100 / Number(config.columns))
    } else {
      haCardWidth = 100;
    }
    style.textContent = `
      ha-card {
        background-color: var(--paper-card-background-color);
        padding: ${config.padding};
        width: calc(${haCardWidth}% - (${config.padding} * 2));
        ${cardStyle}
      }
      #container_${id} {
        display: flex;
        align-items: center;
        justify-content: center;
        ${titleflexDirection}
      }
      #background_${id} {
        position: relative;
        display: flex;
        flex-direction: ${flexDirection};
        align-items: ${alignItems};
        justify-content: ${justifyContent};
        width: ${config.width};
        height: ${config.height};
      }
      #bar_${id}, #backgroundBar_${id}, #targetBar_${id}, #targetBarColor_${id}, #valueBar_${id}, #chargeBar_${id}, #chargeBarColor_${id}, #valueBar_${id}, #indicatorBar_${id} {
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: ${config.rounding};
      }
      #backgroundBar_${id} {
        background: var(--bar-background-color);
      }
      #bar_${id} {
        background: linear-gradient(to ${barFrom}, var(--bar-fill-color) var(--bar-percent), #0000 var(--bar-percent), #0000 var(--bar-percent));
      }
      #chargeBar_${id} {
        background: linear-gradient(to ${barFrom}, #FFF0 var(--bar-percent), var(--bar-charge-color) var(--bar-percent), var(--bar-charge-color) var(--bar-charge-percent), #FFF0 var(--bar-charge-percent));
      }
      #targetBar_${id} {
        background: linear-gradient(to ${barFrom}, #FFF0 var(--targetBar-left-percent), var(--targetBar-color) var(--targetBar-left-percent), var(--targetBar-color) var(--targetBar-right-percent), #FFF0 var(--targetBar-right-percent));
        mix-blend-mode: difference;
      }
      #targetBarColor_${id} {
        background: linear-gradient(to ${barFrom}, #FFF0 var(--targetBar-left-percent), var(--bar-fill-color) var(--targetBar-left-percent), var(--bar-fill-color) var(--targetBar-right-percent), #FFF0 var(--targetBar-right-percent));
        mix-blend-mode: color;
      }
      #icon_${id} {
        position: relative;
        --padding-left: 2px;
        --padding-right: 2px;
        padding-left: var(--padding-left);
        padding-right: var(--padding-right);
        padding-top: ${paddingStyle};
        padding-bottom: ${paddingStyle};
        font-weight: bold;
        color: #FFF;
        text-shadow: 1px 1px #000;
        ${iconStyle}
      }
      #title_${id} {
        position: relative;
        ${positionTitleStyle}
        ${titleStyle};
        text-align: ${textAlign};
      }
      #value_${id} {
        position: relative;
        padding-bottom: ${paddingStyle};
        --padding-right: 4px;
        --padding-left: 4px;
        padding-left: var(--padding-left);
        padding-right: var(--padding-right);
        font-weight: bold;
        color: #FFF;
        text-shadow: 1px 1px #000;
        white-space: nowrap;
        ${valueStyle}
      }
      #titleBar_${id} {
        position: relative;
        display: flex;
        align-items: center;
        height: 40px;
        ${titleAlign}
        ${titleWidth}
        ${titleStyle}
      }
      #indicatorBar_${id} {
        display: flex;
        align-items: var(--flex-align);
        justify-content: var(--flex-justify);
      }
      #indicator_${id}, #indicatorColor_${id} {
        width: 25px;
        text-align: center;
        position: static;
        mix-blend-mode: difference;
        color: #7F7F7F;
        opacity: 0.75;
        text-shadow: 0px 0px;
      }
      #indicatorColor_${id} {
        margin-left: -25px;
        color: var(--bar-fill-color);
        mix-blend-mode: color;
        opacity: 1;
      }
      #indicatorContainer_${id} {
        display: flex;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      ${markerStyle}
    `
    return style
  }

  // Create style string from CSS options
  _customStyle (style) {
    let styleString = ''
    Object.keys(style).forEach(section => {
      styleString = styleString + section + ':' + style[section] + '; '
    })
    return styleString
  }

  // Translates entity percentage to bar percentage
  _translatePercent (value, min, max) {
    return 100 * (value - min) / (max - min)
  }

  // Map range function
  _scale (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
  }

  // Returns hue value based on severity array
  _computeSeverity (stateValue, sections) {
    let numberValue = Number(stateValue)
    let hue
    sections.forEach(section => {
      if (numberValue <= section.value && !hue) {
        hue = section.hue
      }
    })
    return hue
  }

  // Check if value is NaN, otherwise assume it's an entity
  _valueEntityCheck (value, hass) {
    if (isNaN(value)) {
      if (hass.states[value] == undefined) throw new Error('Invalid target, min or max entity')
      else return hass.states[value].state
    } else {
      return value
    }
  }

  // Press action
  _showAttributes (type, detail, options) {
    const node = this.shadowRoot
    options = options || {}
    detail = (detail === null || detail === undefined) ? {} : detail
    const event = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed
    })
    event.detail = detail
    node.dispatchEvent(event)
    return event
  }

  // Update bar percentages
  _updateBar (entityState, hass, id) {
    const config = this._config
    const root = this.shadowRoot
    if (this._valueEntityCheck(config.min, hass) !== undefined && this._valueEntityCheck(config.max, hass) !== undefined) {
      root.getElementById('bar_'+id).style.setProperty('--bar-percent', `${this._translatePercent(entityState, this._valueEntityCheck(config.min, hass), this._valueEntityCheck(config.max, hass))}%`)
      root.getElementById('bar_'+id).style.setProperty('--bar-charge-percent', `${this._translatePercent(entityState, this._valueEntityCheck(config.min, hass), this._valueEntityCheck(config.max, hass))}%`)
    }
  }

  // Create animation
  _updateAnimation (entityState, configDirection, configDuration, hue, configStop, id) {
    const config = this._config
    const root = this.shadowRoot
    const element = root.getElementById('chargeBar_'+id)

    let currentPercent = this._translatePercent(entityState, this._valueEntityCheck(config.min, this._hass), this._valueEntityCheck(config.max, this._hass))
    let totalFrames = ((currentPercent) * 10) + (config.delay / (config.speed / 250))
    let scaledPercent = (currentPercent) * 10

    if (configStop == true) {
      configDuration = 0
    }

    let options = {
      iterations: Infinity,
      iterationStart: 0,
      delay: 0,
      endDelay: 0,
      direction: 'normal',
      duration: configDuration,
      fill: 'both'
    }

    let keyframes = []
    let i = scaledPercent
    if (configDirection == 'normal') {
      for (; i <= totalFrames;) {
        let opacity = this._scale(i / 10, currentPercent, currentPercent + 25, 1, 0)
        let keyframe = {'--bar-charge-percent': i / 10 + '%', '--bar-percent': currentPercent + '%', '--bar-charge-color': 'hsla(' + hue + ', 75%, 25%, ' + opacity + ')'}
        keyframes.push(keyframe)
        i++
      }
    }
    if (configDirection == 'reverse') {
      for (; i <= totalFrames;) {
        const reversePercent = currentPercent - ((i - scaledPercent) / 10)
        let opacity = this._scale(i / 10, currentPercent, currentPercent + 25, 1, 0)
        let keyframe = {'--bar-charge-percent': currentPercent + '%', '--bar-percent': reversePercent + '%', '--bar-charge-color': 'hsla(' + hue + ', 75%, 25%, ' + opacity + ')'}
        keyframes.push(keyframe)
        i++
      }
    }
    return element.animate(keyframes, options)
  }

  // Sets position and direction of the indicator
  _updateIndicator (position, direction, id) {
    const config = this._config
    const root = this.shadowRoot
    const element = root.getElementById('indicatorBar_'+id)
    switch (position) {
      case 'right':
        element.style.setProperty('--flex-align', 'center')
        element.style.setProperty('--flex-justify', 'flex-end')
        break
      case 'left':
        element.style.setProperty('--flex-align', 'center')
        element.style.setProperty('--flex-justify', 'flex-start')
        break
      case 'top':
        element.style.setProperty('--flex-align', 'flex-start')
        element.style.setProperty('--flex-justify', 'center')
        break
      case 'bottom':
        element.style.setProperty('--flex-align', 'flex-end')
        element.style.setProperty('--flex-justify', 'center')
        break
      case 'auto':
        switch (direction) {
          case 'up':
            element.style.setProperty('--flex-align', 'center')
            element.style.setProperty('--flex-justify', 'flex-end')
            break
          case 'down':
            element.style.setProperty('--flex-align', 'center')
            element.style.setProperty('--flex-justify', 'flex-start')
            break
        }
        break
      case 'auto-vertical':
        switch (direction) {
          case 'up':
            element.style.setProperty('--flex-align', 'flex-start')
            element.style.setProperty('--flex-justify', 'center')
            break
          case 'down':
            element.style.setProperty('--flex-align', 'flex-end')
            element.style.setProperty('--flex-justify', 'center')
            break
        }
    }
    if (config.indicator != 'off') {
      const iconElement = root.getElementById('icon_'+id)
      const valueElement = root.getElementById('value_'+id)
      const titleElement = root.getElementById('title_'+id)
      switch (direction) {
        case 'up':
          if (config.indicator == 'auto' && config.align == 'split'){
            if (config.title_position != 'inside' && config.title_position != 'off') {
              if (config.show_icon == true) iconElement.style.removeProperty('--padding-left')
              else valueElement.style.removeProperty('--padding-left')
            } else {
              if (config.show_icon == true) iconElement.style.removeProperty('--padding-left')
              if (config.title_position == 'inside' && config.show_icon == false) titleElement.style.removeProperty('--padding-left')
            }
            valueElement.style.setProperty('--padding-right','25px')
          }
          if (config.indicator == 'left' && config.align == 'split' || config.align == 'left') {
            if (config.title_position == 'inside') {
              if (config.show_icon !== true && config.title_position !== 'off' && config.indicator != 'right') titleElement.style.setProperty('--padding-left','25px')
            } else {
              if (config.indicator != 'right' && config.indicator != 'auto-vertical') valueElement.style.setProperty('--padding-left','25px')
            }
            if (config.align == 'left' && config.indicator == 'auto') {
              titleElement.style.removeProperty('--padding-left')
              valueElement.style.removeProperty('--padding-left')
              if (config.show_icon == true) iconElement.style.removeProperty('--padding-left')
            }
            if (config.indicator == 'left') {
              titleElement.style.setProperty('--padding-left','25px')
              valueElement.style.setProperty('--padding-left','25px')
              if (config.show_icon == true) iconElement.style.setProperty('--padding-left','25px')
            }
            if (config.show_icon == true && config.align == 'split') iconElement.style.setProperty('--padding-left', '21px')
          }
          if (config.indicator == 'right' && config.align == 'split' || config.align == 'right') {
            if (config.show_icon == true) iconElement.style.removeProperty('--padding-left')
            if (config.align == 'right' && config.title_position == 'inside' || config.indicator != 'left' && config.indicator != 'auto-vertical') {
              if (config.indicator != 'left') {
              titleElement.style.setProperty('--padding-right','25px')
              valueElement.style.setProperty('--padding-right','25px')
              if (config.show_icon == true) iconElement.style.setProperty('--padding-right','21px')
              }
            } 
          }
          root.getElementById('indicator_'+id).textContent = '▲'
          root.getElementById('indicatorColor_'+id).textContent = '▲'
          break
        case 'down':
          if (config.indicator == 'auto' && config.align == 'split') {
            if (config.title_position != 'inside' && config.title_position != 'off') {
              valueElement.style.setProperty('--padding-left','25px')
            } else {
              valueElement.style.removeProperty('--padding-right')
              if (config.title_position == 'inside' && config.show_icon == false) titleElement.style.setProperty('--padding-left', '25px')
            }
            valueElement.style.removeProperty('--padding-right')
            if (config.show_icon == true) iconElement.style.setProperty('--padding-left', '21px')
          }
          if (config.indicator == 'left' && config.align == 'split' || config.align == 'left') {
            if (config.title_position == 'inside' && config.indicator != 'right') {
              if (config.show_icon !== true && config.title_position !== 'off') titleElement.style.setProperty('--padding-left','25px')
            }
            if (config.align == 'left' && config.indicator != 'right' && config.indicator != 'auto-vertical') {
              titleElement.style.setProperty('--padding-left','25px')
              valueElement.style.setProperty('--padding-left','25px')
              if (config.show_icon == true) iconElement.style.setProperty('--padding-left','21px')
            } 
          }
          if (config.indicator == 'right' && config.align == 'split' || config.align == 'right') {
            if (config.align == 'split') valueElement.style.setProperty('--padding-right','25px')
            if (config.show_icon == true) iconElement.style.removeProperty('--padding-left')
            if (config.align == 'right' && config.indicator != 'right') {
              titleElement.style.removeProperty('--padding-right')
              valueElement.style.removeProperty('--padding-right')
              if (config.show_icon == true) iconElement.style.removeProperty('--padding-right')
            }
            if (config.indicator == 'right') {
              titleElement.style.setProperty('--padding-right','25px')
              valueElement.style.setProperty('--padding-right','25px')
              if (config.show_icon == true) iconElement.style.setProperty('--padding-right','21px')
            } 
          }
          root.getElementById('indicator_'+id).textContent = '▼'
          root.getElementById('indicatorColor_'+id).textContent = '▼'
          break
        case 'off':
          if (config.title_position == 'inside') titleElement.style.removeProperty('--padding-left')
          valueElement.style.removeProperty('--padding-left')
          if (config.show_icon == true) iconElement.style.removeProperty('--padding-left')
          if (config.title_position == 'inside') titleElement.style.removeProperty('--padding-right')
          valueElement.style.removeProperty('--padding-right')
          if (config.show_icon == true) iconElement.style.removeProperty('--padding-right')
          root.getElementById('indicator_'+id).textContent = ''
          root.getElementById('indicatorColor_'+id).textContent = ''
      }
    }
  }

  // Scale the target bar size
  _updateTargetBar (entityState, target, color, markerColor, id) {
    const config = this._config
    const root = this.shadowRoot

    let currentPercent = this._translatePercent(entityState, this._valueEntityCheck(config.min, this._hass), this._valueEntityCheck(config.max, this._hass))
    let targetPercent = this._translatePercent(target, this._valueEntityCheck(config.min, this._hass), this._valueEntityCheck(config.max, this._hass))

    let initialPercent
    let diffPercent
    if (currentPercent > targetPercent) {
      initialPercent = targetPercent
      diffPercent = currentPercent
    } else {
      initialPercent = currentPercent
      diffPercent = targetPercent
    }
    root.getElementById('targetBar_'+id).style.setProperty('--targetBar-left-percent', initialPercent + '%')
    root.getElementById('targetBarColor_'+id).style.setProperty('--targetBar-left-percent', initialPercent + '%')
    root.getElementById('targetBar_'+id).style.setProperty('--targetBar-right-percent', diffPercent + '%')
    root.getElementById('targetBarColor_'+id).style.setProperty('--targetBar-right-percent', diffPercent + '%')
    root.getElementById('targetBar_'+id).style.setProperty('--targetBar-color', color)

    root.getElementById('targetMarker_'+id).style.setProperty('--targetMarker-percent', targetPercent + '%')
    root.getElementById('targetMarkerColor_'+id).style.setProperty('--targetMarker-percent', targetPercent + '%')
    root.getElementById('targetMarker_'+id).style.setProperty('--targetMarker-color', markerColor)
  }

  // On entity update
  _updateEntity (entity, id) {
    const config = this._config
    const root = this.shadowRoot
    const hass = this._hass
    if (!config.entity || !config.title) {
      config.title = hass.states[entity].attributes.friendly_name
    }

    if (config.show_icon == true) {
      if (!config.icon){
        root.getElementById('icon_'+id).icon = hass.states[entity].attributes.icon
      } else {
        root.getElementById('icon_'+id).icon = config.icon
      }
    }
    if (config.title_position != 'off') root.getElementById('title_'+id).textContent = config.title

    if (!this._entityState) this._entityState = []

    // Define variables that have possible entities
    let configTarget
    if (config.target) configTarget = this._valueEntityCheck(config.target, hass)
    const configMin = this._valueEntityCheck(config.min, hass)
    const configMax = this._valueEntityCheck(config.max, hass)

    // Check for unknown state
    let entityState
    if (hass.states[entity] == undefined || hass.states[entity].state == 'unknown') {
      entityState = 'N/A'
    } else {
      if (config.attribute) {
        entityState = hass.states[entity].attributes[config.attribute]
      } else {
        entityState = hass.states[entity].state
      }
      if (!isNaN(entityState)) {
      entityState = Math.min(entityState, configMax)
      entityState = Math.max(entityState, configMin)
      }
    }
    let measurement
    if (hass.states[entity] == undefined || hass.states[entity].state == 'unknown') measurement = ''
    else if (config.unit_of_measurement) measurement = config.unit_of_measurement
    else measurement = hass.states[entity].attributes.unit_of_measurement || ''

    // Set color hue
    let hue
    if (!config.severity) {
      hue = 220
      if (config.hue) {
        hue = config.hue
      }
    } else {
      hue = this._computeSeverity(entityState, config.severity)
    }

    // Set style variables
    const barColor = 'hsl(' + hue + ',' + config.saturation + ',50%)'
    const targetColor = 'hsla(' + hue + ',' + config.saturation + ',50%,0.25)'
    const targetMarkerColor = 'hsla(' + hue + ',' + config.saturation + ',50%,0.5)'
    const backgroundColor = 'hsla(' + hue + ',' + config.saturation + ',15%,0.5)'

    // Define target, min and max if not defined
    if (!this._entityTarget) this._entityTarget = {}
    if (!this._currentMin) this._currentMin = {}
    if (!this._currentMax) this._currentMax = {}

    // On entity update
    if (entityState !== this._entityState[id]) {
      this._updateBar(entityState, hass, id)
      if (config.target) {
        this._updateTargetBar(entityState, configTarget, targetColor, targetMarkerColor, id)
        this._entityTarget[id] = configTarget
      }
      root.getElementById('bar_'+id).style.setProperty('--bar-fill-color', barColor)
      root.getElementById('backgroundBar_'+id).style.setProperty('--bar-background-color', backgroundColor)
      if (config.indicator != 'off') root.getElementById('indicatorColor_'+id).style.setProperty('--bar-fill-color', barColor)
      if (config.target) {
        root.getElementById('targetBarColor_'+id).style.setProperty('--bar-fill-color', barColor)
        root.getElementById('targetMarkerColor_'+id).style.setProperty('--bar-fill-color', barColor)
      }
      root.getElementById('value_'+id).textContent = `${entityState} ${measurement}`
    }

    if (!this._currentAnimation) this._currentAnimation = {}

    // Select 'auto' animation
    if (config.animation == 'auto') {
      if (entityState > this._entityState[id]) {
        this._updateIndicator(config.indicator, 'up', id)
        this._currentAnimation[id] = this._updateAnimation(entityState, 'normal', config.delay, hue, false, id)
      }
      if (entityState < this._entityState[id]) {
        this._updateIndicator(config.indicator, 'down', id)
        this._currentAnimation[id] = this._updateAnimation(entityState, 'reverse', config.delay, hue, false, id)
      }
      if (entityState == configMax || entityState == configMin) {
        if (entityState == configMax) {
          root.getElementById('bar_'+id).style.setProperty('--bar-percent', '100%')
          root.getElementById('bar_'+id).style.setProperty('--bar-fill-color', barColor)
          root.getElementById('bar_'+id).style.setProperty('--bar-charge-percent', '100%')
          this._updateIndicator(config.indicator, 'off', id)
          if (this._currentAnimation[id]) {
            this._currentAnimation[id].pause()
          }
        }
        if (entityState == configMin) {
          root.getElementById('bar_'+id).style.setProperty('--bar-percent', '0%')
          root.getElementById('bar_'+id).style.setProperty('--bar-charge-percent', '0%')
          this._updateIndicator(config.indicator, 'off', id)
          if (this._currentAnimation[id]) {
            this._currentAnimation[id].pause()
          }
        }
      }
    }

    // Select 'charge' animation
    if (config.animation == 'charge') {
      let chargeEntityState
      if (!config.charge_entity) {
        entityState = "define 'charge_entity'"
        measurement = ''
        root.getElementById('value').style.setProperty('color', '#FF0000')
      } else {
        chargeEntityState = hass.states[config.charge_entity].state
      }
      switch (chargeEntityState) {
        case "charging":
        case "on":
        case "true":
          this._updateIndicator(config.indicator, 'up', id)
          if (!this._currentAnimation || chargeEntityState != this._currentChargeState || entityState > this._entityState[id]) {
            this._currentChargeState = chargeEntityState
            this._currentAnimation = this._updateAnimation(entityState, 'normal', config.delay, hue, false, id)
          }
          break
        case "discharging":
        case "off":
        case "false":
          if (chargeEntityState == 'discharging' || chargeEntityState == 'off' || chargeEntityState == 'false') {
            this._updateIndicator(config.indicator, 'down', id)   
            if (!this._currentAnimation || chargeEntityState != this._currentChargeState || entityState < this._entityState[id]) {
              this._currentChargeState = chargeEntityState
              this._currentAnimation = this._updateAnimation(entityState, 'reverse', config.delay, hue, false, id)
            }
          }
          break
      }
    }

    // Select 'off' animation
    if (config.animation == "off") {
      if (entityState > this._entityState[id]) {
        this._updateIndicator(config.indicator, 'up', id)
      }
      if (entityState < this._entityState[id]) {
        this._updateIndicator(config.indicator, 'down', id)
      } 
    }
    
    // On target update
    if (config.target) {
      if (configTarget != this._entityTarget[id]) {
        this._updateTargetBar(entityState, configTarget, targetColor, targetMarkerColor, id)
        this._entityTarget[id] = configTarget
      }
    }

    // On min update
    if (configMin !== this._currentMin) {
      this._updateBar(entityState, hass, id)
      this._currentMin[id] = configMin
      if (config.target) {
        this._updateTargetBar(entityState, configTarget, targetColor, targetMarkerColor, id)
        this._currentMin[id] = configMin
      }
    }

    // On max update
    if (configMax !== this._currentMax) {
      this._updateBar(entityState, hass, id)
      this._currentMax[id] = configMax
      if (config.target) {
        this._updateTargetBar(entityState, configTarget, targetColor, targetMarkerColor, id)
        this._currentMax[id] = configMax
      }
    }
    this._entityState[id] = entityState
  }

  getCardSize () {
    return 1
  }
}

customElements.define('bar-card', BarCard)
