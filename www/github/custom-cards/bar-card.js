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
    if (!config.padding) config.padding = '4px'
    if (!config.align) config.align = 'center'
    if (!config.color) config.color = 'var(--primary-color)'
    if (!config.show_icon) config.show_icon = false
    if (!config.title) config.title = false
    if (!config.severity) config.severity = false
    if (!config.target) config.target = false
    if (!config.attribute) config.attribute = false
    if (!config.icon) config.icon = false
    if (!config.charge_entity) config.charge_entity = false
    if (!config.unit_of_measurement) config.unit_of_measurement = false
    if (!config.card_style) config.card_style = false
    if (!config.icon_style) config.icon_style = false
    if (!config.title_style) config.title_style = false
    if (!config.value_style) config.value_style = false
    if (!config.background_style) config.background_style = false

    // Check entity types
    let updateArray
    if (config.entities) {
        let newArray = []
        config.entities.forEach(section => {
          let type = typeof(section)
          if (type == 'string'){
            let constructObject = {"entity":section}
            newArray.push(constructObject)
            updateArray = true
          } else if (type == 'object') {
            newArray.push(section)
            updateArray = true
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

    if (config.card_style !== false) var cardStyle = this._customStyle(config.card_style)

    // Define card container
    let cardContainer = document.createElement('ha-card')
    let cardContainerStyle = document.createElement('style')
    cardContainerStyle.textContent = `
      ha-card {
        padding: calc(${config.padding} / 2);
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        ${cardStyle}
      }  
    `
    // For each entity in entities list create cardElements
    this._configArray = []
    for (let i = 0; i <= config.entities.length-1; i++){
      const entityName = config.entities[i].entity.split('.')
      this._configArray[i] = Object.assign({},config)
      Object.keys(config).forEach(section => {
        const config = this._configArray[i]
        const entities = config.entities[i]
        if (entities[section] !== undefined) config[section] = entities[section]
      })
      cardContainer.appendChild(this._cardElements(this._configArray[i], entityName[0]+'_'+entityName[1]+'_'+i, config.entities[i].entity))
    }

    // Add card container to root
    this.shadowRoot.appendChild(cardContainer)
    this.shadowRoot.appendChild(cardContainerStyle)
    
    // For each entity in entities list update entity.
    if (this._hass) {
      for(let i=0; i <= config.entities.length-1; i++){
        let entityName = config.entities[i].entity.split('.')
        this._updateEntity(config.entities[i].entity, entityName[0]+'_'+entityName[1]+'_'+i, i)
      }
    }

    // Set config for this card.
    this._config = config
  }

  // On hass update
  set hass (hass) {
    this._hass = hass
    const config = this._config
    for(let i=0; i <= config.entities.length-1; i++){
      let entityName = config.entities[i].entity.split('.')
      this._updateEntity(config.entities[i].entity, entityName[0]+'_'+entityName[1]+'_'+i, i)
    }
  }

  // Create card elements
  _cardElements(config, id, entity) {
    const card = document.createElement('div')
    card.id = 'card_'+id
    const container = document.createElement('div')
    container.id = 'container_'+id
    const background = document.createElement('div')
    background.id = 'background_'+id
    const backgroundBar = document.createElement('div')
    backgroundBar.id = 'backgroundBar_'+id
    const bar = document.createElement('div')
    bar.id = 'bar_'+id
    const contentBar = document.createElement('div')
    contentBar.id = 'contentBar_'+id

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
    if (config.target != false) {
      var targetBar = document.createElement('div')
      targetBar.id = 'targetBar_'+id
      var targetMarker = document.createElement('div')
      targetMarker.id = 'targetMarker_'+id
    }

    // Check if indicator is enabled
    if (config.indicator !== "off"){
      var indicatorContainer = document.createElement('div')
      indicatorContainer.id = 'indicatorContainer_'+id
      var indicatorBar = document.createElement('div')
      indicatorBar.id = 'indicatorBar_'+id
      var indicator = document.createElement('div')
      indicator.id = 'indicator_'+id
    }
        
    // Start building card
    background.appendChild(backgroundBar)
    background.appendChild(bar)

    // Check if target is configured
    if (config.target != false) {
      bar.appendChild(targetMarker)
      background.appendChild(targetBar)
    }

    // Check if animation is not disabled
    if (config.animation !== "off") {
      background.appendChild(chargeBar)
    }

    // Check if indicator is not disabled
    if (config.indicator != 'off') {
      indicatorContainer.appendChild(indicator)
      switch (config.align) {
        case 'center':
        case 'center-split':
        case 'left-split':
        case 'right-split':
          indicatorBar.appendChild(indicatorContainer)
          background.appendChild(indicatorBar)
          break
        default:
          background.appendChild(indicatorContainer)
      }
    }

    if (config.show_icon == true) {
      contentBar.appendChild(icon) 
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
        contentBar.appendChild(title)
        container.appendChild(contentBar)
        container.appendChild(background)
        break
      case 'off':
        container.appendChild(background)      
    }

    contentBar.appendChild(value)
    background.appendChild(contentBar)
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
    if (config.value_style !== false) var valueStyle = this._customStyle(config.value_style)
    if (config.title_style !== false) var titleStyle = this._customStyle(config.title_style)
    if (config.icon_style !== false) var iconStyle = this._customStyle(config.icon_style)
    if (config.background_style !== false) var backgroundStyle = this._customStyle(config.background_style)

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
      case 'left-reverse':
        barFrom = 'left'
        markerDirection = 'right'
        insideWhitespace = 'nowrap'
        break
      case 'right':
      case 'right-reverse':
        barFrom = 'right'
        markerDirection = 'left'
        insideWhitespace = 'nowrap'
        break
      case 'up':
      case 'up-reverse':
        barFrom = 'top'
        markerDirection = 'bottom'
        break
      case 'down':
      case 'down-reverse':
        barFrom = 'bottom'
        markerDirection = 'top'
        break
    }

    // Set marker style based on bar direction
    let markerStyle
    if (barFrom == 'left' || barFrom == 'right') {
      markerStyle = `
      #targetMarker_${id} {
        position: absolute;
        background: #FFF0;
        ${markerDirection}: var(--targetMarker-percent);
        height: ${config.height};
        border-left: 2px dashed var(--bar-color);
        filter: brightness(0.75);
      }
      `
    } else {
      markerStyle = `
      #targetMarker_${id} {
        position: absolute;
        background: #FFF0;
        ${markerDirection}: var(--targetMarker-percent);
        width: 100%;
        border-top: 2px dashed var(--bar-color);
        filter: brightness(0.75);
      }
      `
    }

    // Set title style based on title position
    let titlePositionStyle
    if (config.title_position == 'inside') {
      titlePositionStyle = `
      width: calc(100% - 8px);
      font-weight: bold;
      color: #FFF;
      text-shadow: 1px 1px #0007;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: ${insideWhitespace};
      `
    } else {
      titlePositionStyle = `
      color: var(--primary-text-color);
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 4px;
      padding-bottom: 4px;
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
    if (config.columns) haCardWidth = Math.trunc(100 / Number(config.columns))
    else haCardWidth = 100;

    style.textContent = `
      #card_${id} {
        padding: ${config.padding};
        width: calc(${haCardWidth}% - (${config.padding} * 2));
      }
      #container_${id} {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        ${titleflexDirection}
      }
      #background_${id} {
        position: relative;
        display: flex;
        flex-direction: var(--flex-direction);
        width: ${config.width};
        height: ${config.height};
      }
      #contentBar_${id} {
        position: relative;
        display: flex;
        flex-direction: ${flexDirection};
        align-items: ${alignItems};
        justify-content: ${justifyContent};
        --padding: 4px;
        height: calc(${config.height} - (var(--padding)*2));
        width: calc(100% - (var(--padding)*2));
        padding: var(--padding);
      }
      #bar_${id}, #backgroundBar_${id}, #targetBar_${id}, #valueBar_${id}, #chargeBar_${id}, #chargeBarColor_${id}, #valueBar_${id}, #indicatorBar_${id} {
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: ${config.rounding};
      }
      #backgroundBar_${id} {
        background: var(--bar-color);
        filter: brightness(0.5);
        opacity: 0.25;
        ${backgroundStyle}
      }
      #bar_${id} {
        background: linear-gradient(to ${barFrom}, var(--bar-color) var(--bar-percent), #0000 var(--bar-percent), #0000 var(--bar-percent));
      }
      #chargeBar_${id} {
        background: linear-gradient(to ${barFrom}, #FFF0 var(--bar-percent), var(--bar-color) var(--bar-percent), var(--bar-color) var(--bar-charge-percent), #FFF0 var(--bar-charge-percent));
        filter: brightness(0.75);
        opacity: var(--bar-charge-opacity);
      }
      #targetBar_${id} {
        filter: brightness(0.66);
        opacity: 0.33;
        background: linear-gradient(to ${barFrom}, #FFF0 var(--targetBar-left-percent), var(--bar-color) var(--targetBar-left-percent), var(--bar-color) var(--targetBar-right-percent), #FFF0 var(--targetBar-right-percent));
      }
      #icon_${id} {
        position: relative;
        font-weight: bold;
        color: #FFF;
        filter: drop-shadow(1px 1px #0005);
        ${iconStyle}
      }
      #title_${id} {
        position: relative;
        text-align: ${textAlign};
        ${titlePositionStyle}
        ${titleStyle};
      }
      #value_${id} {
        position: relative;
        font-weight: bold;
        font-size: 13px;
        color: #FFF;
        text-shadow: 1px 1px #0007;
        white-space: nowrap;
        ${valueStyle}
      }
      #titleBar_${id} {
        position: relative;
        display: flex;
        align-items: center;
        height: 32px;
        ${titleAlign}
        ${titleWidth}
        ${titleStyle}
      }
      #indicatorBar_${id} {
        display: flex;
        --flex-direction: row;
        flex-direction: var(--flex-direction);
        align-items: var(--flex-align);
        justify-content: var(--justify-content);
      }
      #indicator_${id} {
        position: relative;
        filter: brightness(0.75);
        color: var(--bar-color);
        --padding-left: 0px;
        padding-left: var(--padding-left);
        --padding-right: 0px;
        padding-right: var(--padding-right);
      }
      #indicatorContainer_${id} {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
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
  _translatePercent (value, min, max, index) {
    const config = Object.assign({}, this._configArray[index])
    switch (config.direction) {
      case 'right-reverse':
      case 'left-reverse':
      case 'up-reverse':
      case 'down-reverse':
        return 100 - (100 * (value - min) / (max - min))
      default:
        return 100 * (value - min) / (max - min)
    }
  }

  // Map range function
  _mapRange (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
  }

  // Returns hue value based on severity array
  _computeSeverity (stateValue, sections) {
    let numberValue = Number(stateValue)
    let color
    sections.forEach(section => {
      if (numberValue <= section.value && !color) {
        const keys = Object.keys(section)
        if (keys[0] == 'color' || keys[1] == 'color') color = section.color
        else color = 'hsl(' + section.hue + ',50%,50%)'
      }
    })
    return color
  }

  // Check if value is NaN, otherwise assume it's an entity
  _valueEntityCheck (value, hass) {
    if (isNaN(value)) {
      const valueArray = value.split('.')
      if (valueArray[2] == 'attributes') {
        if (this._hass.states[valueArray[0]+'.'+valueArray[1]] == undefined) {
          throw new Error('Invalid target, min or max entity')
        } else {
          const hassObject = hass.states[valueArray[0]+'.'+valueArray[1]]
          const attributes = hassObject[valueArray[2]]
          const attribute = attributes[valueArray[3]]
          return attribute
        }
      } else {
        if (this._hass.states[value] == undefined) throw new Error('Invalid target, min or max entity')
        else return hass.states[value].state
      }
    } else {
      return value
    }
  }

  // Check if min is defined otherwise check for min attribute
  _minCheck (entity, hass, index) {
    const config = Object.assign({}, this._configArray[index])
    if (config.min == undefined) {
      if (hass.states[entity] != undefined) {
        if (hass.states[entity].attributes.min) return hass.states[entity].attributes.min
        else return 0
      } else {
        return 0
      }
    } else {
      return config.min
    }
  }

  // Check if max is defined otherwise check for max attribute
  _maxCheck (entity, hass, index) {
    const config = Object.assign({}, this._configArray[index])
    if (config.max == undefined) {
      if (hass.states[entity] != undefined) {
        if (hass.states[entity].attributes.max) return hass.states[entity].attributes.max
        else return 100
      } else {
        return 100
      }
    } else {
      return config.max
    }
  }

  // Press action
  _showAttributes (type, detail, options) {
    const root = this.shadowRoot
    options = options || {}
    detail = (detail === null || detail === undefined) ? {} : detail
    const event = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed
    })
    event.detail = detail
    root.dispatchEvent(event)
    return event
  }

  // Update bar percentages
  _updateBar (entityState, hass, id, entity, index) {
    const minValue = this._valueEntityCheck(this._minCheck(entity, hass, index), hass)
    const maxValue = this._valueEntityCheck(this._maxCheck(entity, hass, index), hass)
    const barElement = this.shadowRoot.getElementById('bar_'+id)

    barElement.style.setProperty('--bar-percent', `${this._translatePercent(entityState, minValue, maxValue, index)}%`)
    barElement.style.setProperty('--bar-charge-percent', `${this._translatePercent(entityState, minValue, maxValue, index)}%`)
  }

  // Create animation
  _updateAnimation (entityState, configDuration, configStop, id, entity, index) {
    const config = Object.assign({}, this._configArray[index])
    const root = this.shadowRoot
    const hass = this._hass
    const element = root.getElementById('chargeBar_'+id)
    let configDirection = this._animationDirection[id]

    const minValue = this._valueEntityCheck(this._minCheck(entity, hass, index), hass)
    const maxValue = this._valueEntityCheck(this._maxCheck(entity, hass, index), hass)

    let currentPercent = this._translatePercent(entityState, minValue, maxValue, index)
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

    switch (config.direction) {
      case 'left-reverse':
      case 'right-reverse':
      case 'up-reverse':
      case 'down-reverse':
        if (configDirection == 'normal') configDirection = 'reverse'
        else configDirection = 'normal'
    }
    let keyframes = []
    let i = scaledPercent
    if (configDirection == 'normal') {
      for (; i <= totalFrames;) {
        let opacity = this._mapRange(i / 10, currentPercent, currentPercent + 25, 1, 0)
        let keyframe = {'--bar-charge-percent': i / 10 + '%', '--bar-percent': currentPercent + '%', '--bar-charge-opacity': opacity}
        keyframes.push(keyframe)
        i++
      }
    }
    if (configDirection == 'reverse') {
      for (; i <= totalFrames;) {
        const reversePercent = currentPercent - ((i - scaledPercent) / 10)
        let opacity = this._mapRange(i / 10, currentPercent, currentPercent + 25, 1, 0)
        let keyframe = {'--bar-charge-percent': currentPercent + '%', '--bar-percent': reversePercent + '%', '--bar-charge-opacity': opacity}
        keyframes.push(keyframe)
        i++
      }
    }
    const animation = element.animate(keyframes, options)
    animation.id = id
    return animation
  }

  // Sets position and direction of the indicator
  _updateIndicator (config, position, direction, id, color) {
    const root = this.shadowRoot
    const indicatorElement = root.getElementById('indicator_'+id)
    const indicatorBarElement = root.getElementById('indicatorBar_'+id)

    indicatorElement.style.setProperty('--bar-color', color)

    switch (direction) {
      case 'up':
        indicatorElement.textContent = '▲'
        switch (position) {
          case 'left':
            indicatorElement.style.setProperty('--padding-left','4px')
            break
          case 'right':
          case 'auto':
            root.getElementById('background_'+id).style.setProperty('--flex-direction','row-reverse')
            switch (config.align) {
              case 'center':
              case 'center-split':
              case 'left-split':
              case 'right-split':
                indicatorBarElement.style.setProperty('--justify-content','flex-end')
            }
            indicatorElement.style.setProperty('--padding-right','4px')
            indicatorElement.style.setProperty('--padding-left','0px')
            break
          case 'top':
          case 'auto-vertical':
            indicatorBarElement.style.setProperty('--justify-content','flex-start')
            indicatorBarElement.style.setProperty('--flex-direction','column')
            break
          case 'bottom':
            indicatorBarElement.style.setProperty('--justify-content','flex-end')
            indicatorBarElement.style.setProperty('--flex-direction','column')
        }
        break
      case 'down':
        indicatorElement.textContent = '▼'
        switch (position) {
          case 'right':
            break
          case 'left':
          case 'auto':
            root.getElementById('background_'+id).style.setProperty('--flex-direction','row')
            switch (config.align) {
              case 'center':
              case 'center-split':
              case 'left-split':
              case 'right-split':
                indicatorBarElement.style.setProperty('--justify-content','flex-start')
            }
            indicatorElement.style.setProperty('--padding-left','4px')
            indicatorElement.style.setProperty('--padding-right','0px')
            break
          case 'bottom':
          case 'auto-vertical':
            indicatorBarElement.style.setProperty('--justify-content','flex-end')
            indicatorBarElement.style.setProperty('--flex-direction','column')
          case 'top':
            indicatorBarElement.style.setProperty('--justify-content','flex-start')
            indicatorBarElement.style.setProperty('--flex-direction','column')  
        }
        break
      case 'off':
        indicatorElement.textContent = ''
        indicatorElement.style.setProperty('--padding-left','0px')
        indicatorElement.style.setProperty('--padding-right','0px')
    }
  }

  // Scale the target bar size
  _updateTargetBar (entityState, target, color, id, entity, index) {
    const root = this.shadowRoot
    const targetBarElement = root.getElementById('targetBar_'+id)
    const targetMarkerElement = root.getElementById('targetMarker_'+id)
    const hass = this._hass

    const minValue = this._valueEntityCheck(this._minCheck(entity, hass, index), hass, index)
    const maxValue = this._valueEntityCheck(this._maxCheck(entity, hass, index), hass, index)

    let currentPercent = this._translatePercent(entityState, minValue, maxValue, index)
    let targetPercent = this._translatePercent(target, minValue, maxValue, index)

    let initialPercent
    let diffPercent
    if (currentPercent > targetPercent) {
      initialPercent = targetPercent
      diffPercent = currentPercent
    } else {
      initialPercent = currentPercent
      diffPercent = targetPercent
    }
    targetBarElement.style.setProperty('--targetBar-left-percent', initialPercent + '%')
    targetBarElement.style.setProperty('--targetBar-right-percent', diffPercent + '%')
    targetBarElement.style.setProperty('--bar-color', color)
    targetMarkerElement.style.setProperty('--targetMarker-percent', targetPercent + '%')
    targetMarkerElement.style.setProperty('--bar-color', color)
  }

  _calculateBarColor (config, entityState) {
    let barColor
    if (config.severity == false) {
      if (config.hue) {
          let hue
          hue = 220
          if (config.hue !== undefined) {
            hue = config.hue
          }
          barColor = 'hsl(' + hue + ',' + config.saturation + ',50%)'
      } else if (config.color) {
        barColor = config.color
      }   
    } else {
      barColor = this._computeSeverity(entityState, config.severity)
    }
    return barColor
  }

  // On entity update
  _updateEntity (entity, id, index) {
    const config = Object.assign({}, this._configArray[index])
    const root = this.shadowRoot
    const hass = this._hass
    if (config.title == false) config.title = hass.states[entity].attributes.friendly_name

    if (config.show_icon == true) {
      if (config.icon == false) root.getElementById('icon_'+id).icon = hass.states[entity].attributes.icon
      else root.getElementById('icon_'+id).icon = config.icon
    }
    if (config.title_position != 'off') root.getElementById('title_'+id).textContent = config.title
    if (!this._entityState) this._entityState = []

    // Define variables that have possible entities
    let configTarget
    if (config.target != false) configTarget = this._valueEntityCheck(config.target, hass)
    const configMin = this._valueEntityCheck(this._minCheck(entity, hass, index), hass)
    const configMax = this._valueEntityCheck(this._maxCheck(entity, hass, index), hass)

    // Check for unknown state
    let entityState
    if (hass.states[entity] == undefined || hass.states[entity].state == 'unknown') {
      entityState = 'N/A'
    } else {
      if (config.attribute != false) {
        entityState = hass.states[entity].attributes[config.attribute]
      } else {
        entityState = hass.states[entity].state
      }
      if (!isNaN(entityState)) {
      entityState = Math.min(entityState, configMax)
      entityState = Math.max(entityState, configMin)
      }
    }

    // Set measurement
    let measurement
    if (hass.states[entity] == undefined || hass.states[entity].state == 'unknown') measurement = ''
    else if (config.unit_of_measurement !== false) measurement = config.unit_of_measurement
    else measurement = hass.states[entity].attributes.unit_of_measurement || ''

    // Define target, min and max if not defined
    if (!this._entityTarget) this._entityTarget = {}
    if (!this._currentMin) this._currentMin = {}
    if (!this._currentMax) this._currentMax = {}

    // Defined elements
    const barElement = root.getElementById('bar_'+id)

    // Define global currentAnimation
    if (!this._currentAnimation) this._currentAnimation = {}
    if (!this._animationDirection) this._animationDirection = {}

    // Define chargeEntityState
    let chargeEntityState
    if (config.charge_entity !== false) chargeEntityState = hass.states[config.charge_entity].state

    // On entity update
    if (entityState !== this._entityState[id]) {
      const barColor = this._calculateBarColor(config, entityState)
      this._updateBar(entityState, hass, id, entity, index)
      if (config.target != false) {
        this._updateTargetBar(entityState, configTarget, barColor, id, entity, index)
        this._entityTarget[id] = configTarget
      }
      barElement.style.setProperty('--bar-color', barColor)
      if (config.animation !== 'off') root.getElementById('chargeBar_'+id).style.setProperty('--bar-color', barColor)
      if (entityState == 'N/A') root.getElementById('backgroundBar_'+id).style.setProperty('--bar-color', '#666')
      else root.getElementById('backgroundBar_'+id).style.setProperty('--bar-color', barColor)
      root.getElementById('value_'+id).textContent = `${entityState} ${measurement}`

      if (config.indicator !== 'off') {
        if (entityState > this._entityState[id]) this._updateIndicator(config, config.indicator, 'up', id, barColor)
        if (entityState < this._entityState[id]) this._updateIndicator(config, config.indicator, 'down', id, barColor)
      }

      // Animation is auto
      if (config.animation == 'auto') {
        const barColor = this._calculateBarColor(config, entityState)
        if (entityState > this._entityState[id]) {
          this._animationDirection[id] = 'normal'
          if (this._currentAnimation[id]) {
            this._currentAnimation[id].pause()
          }
          this._currentAnimation[id] = this._updateAnimation(entityState, config.delay, false, id, entity, index)
        }
        if (entityState < this._entityState[id]) {
          this._animationDirection[id] = 'reverse'
          if (this._currentAnimation[id]) {
            this._currentAnimation[id].pause()
          }
          this._currentAnimation[id] = this._updateAnimation(entityState, config.delay, false, id, entity, index)
        }
        if (entityState == configMax || entityState == configMin) {
          if (entityState == configMax) {
            barElement.style.setProperty('--bar-color', barColor)
            if (config.indicator !== 'off') this._updateIndicator(config, config.indicator, 'off', id, barColor)
            if (this._currentAnimation[id]) {
              this._currentAnimation[id].pause()
            }
          }
          if (entityState == configMin) {
            if (config.indicator !== 'off') this._updateIndicator(config, config.indicator, 'off', id, barColor)
            if (this._currentAnimation[id]) {
              this._currentAnimation[id].pause()
            }
          }
        }
      }
    } 

    // Animation is charge
    if (config.charge_entity !== false) {
      if (!this._currentChargeState) this._currentChargeState = {}
      if (this._currentChargeState[id] !== chargeEntityState || entityState !== this._entityState[id]) {
        const barColor = this._calculateBarColor(config, entityState)
        switch (chargeEntityState) {
          case "charging":
          case "on":
          case "true":
            if (config.indicator !== 'off') this._updateIndicator(config, config.indicator, 'up', id, barColor)
            if (!this._currentAnimation[id] || chargeEntityState != this._currentChargeState || entityState > this._entityState[id]) {
              this._currentChargeState[id] = chargeEntityState
              this._animationDirection[id] = 'normal'
              this._currentAnimation[id] = this._updateAnimation(entityState, config.delay, false, id, entity, index)
            }
            break
          case "discharging":
          case "off":
          case "false":
            if (config.indicator !== 'off') this._updateIndicator(config, config.indicator, 'down', id, barColor)   
            if (!this._currentAnimation[id] || chargeEntityState != this._currentChargeState || entityState < this._entityState[id]) {
              this._currentChargeState[id] = chargeEntityState
              this._animationDirection[id] = 'reverse'
              this._currentAnimation[id] = this._updateAnimation(entityState, config.delay, false, id, entity, index)
            }
            break
        }
      }
    }
    
    // On target update
    if (config.target != false) {
      if (configTarget != this._entityTarget[id]) {
        const barColor = this._calculateBarColor(config, entityState)
        this._updateTargetBar(entityState, configTarget, barColor, id, entity, index)
        this._entityTarget[id] = configTarget
        if (this._currentAnimation[id] && config.animation !== 'off') this._currentAnimation[id] = this._updateAnimation(entityState, config.delay, false, id, entity, index)
      }
    }
    
    // On min update
    if (configMin !== this._currentMin[id]) {
      this._updateBar(entityState, hass, id, entity, index)
      this._currentMin[id] = configMin
      if (config.target != false) {
        const barColor = this._calculateBarColor(config, entityState)
        this._updateTargetBar(entityState, configTarget, barColor, id, entity, index)
        this._currentMin[id] = configMin
      }
      if (this._currentAnimation[id] && config.animation !== 'off') this._currentAnimation[id] = this._updateAnimation(entityState, config.delay, false, id, entity, index)
    }

    // On max update
    if (configMax !== this._currentMax[id]) {
      this._updateBar(entityState, hass, id, entity, index)
      this._currentMax[id] = configMax
      if (config.target != false) {
        const barColor = this._calculateBarColor(config, entityState)
        this._updateTargetBar(entityState, configTarget, barColor, id, entity, index)
        this._currentMax[id] = configMax
      }
      if (this._currentAnimation[id] && config.animation !== 'off') this._currentAnimation[id] = this._updateAnimation(entityState, config.delay, false, id, entity, index)
    }
    this._entityState[id] = entityState
  }

  getCardSize () {
    return 1
  }
}

customElements.define('bar-card', BarCard)
