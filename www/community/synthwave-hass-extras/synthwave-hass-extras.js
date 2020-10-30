console.info(
  `%c synthwave-hass-extras \n%c     Version 0.2.2     `,
  "color: #f4eee4; font-weight: bold; background: #241b2f",
  "color: #f4eee4; font-weight: bold; background: #f92aad"
);

const primaryColor = '#f4eee4';
const secondaryColor = '#f92aad';
const synthwaveGradient = 'linear-gradient(to right, #fc28a8, #03edf9)';

let hacsInterval = null;

// Method to pierce all shadowroots
function queryShadow(root2 = document, filter = el => true, elements = []) {
  root2.querySelectorAll('*').forEach(element => {
    if (filter(element)) elements.push(element)
    if (element.shadowRoot) queryShadow(element.shadowRoot, filter, elements)
  })
  return elements
}

setTimeout(function () {
  try {
    // Main
    const root = document.querySelector('home-assistant').shadowRoot
      const main = root.querySelector('home-assistant-main').shadowRoot
        // Lovelace
        // const lovelace = main.querySelector('ha-panel-lovelace').shadowRoot
          // Sidebar
          const sidebar = main.querySelector('ha-sidebar').shadowRoot
            // Title
            const title = sidebar.querySelector('div.menu')
            title.style.textShadow = '0 0 2px #393a33, 0 0 35px #ffffff44, 0 0 8px #f39f0575, 0 0 2px #f39f0575'
            title.style.color = primaryColor
          // const hui_root = lovelace.querySelector('hui-root').shadowRoot
          //   // Paper Tabs
          //   const tabs = hui_root.querySelector('paper-tab.iron-selected')
          //   tabs.style.textShadow = '0 0 2px #393a33, 0 0 35px #ffffff44, 0 0 8px #f39f0575, 0 0 2px #f39f0575'
          //   tabs.style.color = primaryColor
          // const hui_view = hui_root.querySelector('hui-view').shadowRoot
          //   // Custom Cards - Vertical
          //   const hui_vertical_stack_card = hui_view.querySelector('hui-vertical-stack-card').shadowRoot
          //     // Custom Cards - Horizontal
          //     const hui_horizontal_stack_card = hui_vertical_stack_card.querySelector('hui-horizontal-stack-card').shadowRoot
          //       // Custom Button Card
          //       const button_card = hui_horizontal_stack_card.querySelector('button-card').shadowRoot
          //       const icon = button_card.querySelector('#icon')
          //       icon.style.filter = 'drop-shadow( 0 0 8px #f39f0575)'

          applyStyles();
  }
  catch (e) {
    console.log(e)
  }
}, 200);

// Poll for changes to window.location, so that we can apply styles to new elements when the page changes
let lastWindowLocation = window.location.href;
setInterval(function() {
  // If the url has changes, apply styles
  if(window.location.href !== lastWindowLocation) {
    // Stop checking for changes to the hacs iframe location.href
    clearInterval(hacsInterval);

    // Try and wait for the new DOM elements to render
    setTimeout(function() {
      detectHacs();
      applyStyles();
    }, 100);

    // Update the window location so that we can detect the next change
    lastWindowLocation = window.location.href
  }
}, 250);

// Apply custom styles
function applyStyles() {
  // Anchors
  queryShadow(document, el => el.tagName === 'A')
    .forEach(el => (el.style.color = primaryColor));
  
  // Label classes eg. https://www.home-assistant.io/lovelace/entities/#label
  queryShadow(document, el => el.className === 'label')
    .forEach(el => (el.style.color = primaryColor));

  // Navigation Menu Icon
  queryShadow(document, el => el.className === 'menu')
    .forEach(el => {
      el.style.background = synthwaveGradient;
      el.style.backgroundSize = '100% 3px';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundPositionY = '100%';
      el.style.marginBottom = '5px';
    });
}

function detectHacs() {
  const rootEl = document.querySelector('home-assistant');
  if(rootEl && rootEl.shadowRoot) {
    const homeAssistantMainEl = rootEl.shadowRoot.querySelector('home-assistant-main');

    if(homeAssistantMainEl && homeAssistantMainEl.shadowRoot) {
      const appDrawerLayoutEl = homeAssistantMainEl.shadowRoot.querySelector('app-drawer-layout');

      if(appDrawerLayoutEl) {
        const haPanelIframeEl = appDrawerLayoutEl.querySelector('ha-panel-iframe');

        if(haPanelIframeEl && haPanelIframeEl.shadowRoot) {
          const hacsIframe = haPanelIframeEl.shadowRoot.querySelector('iframe');

          if(hacsIframe) {
            let lastHacsSrc = hacsIframe.contentWindow.location.href;

            applyHacsStyles(hacsIframe);

            // Poll for changes to the hacs iframe src
            hacsInterval = setInterval(function() {
              // If the url has changed, apply styles
              if(hacsIframe.contentWindow.location.href !== lastHacsSrc) {
                applyHacsStyles(hacsIframe);

                // Update the window location so that we can detect the next change
                lastHacsSrc = hacsIframe.contentWindow.location.href;
              }
            }, 250);
          }
        }
      }
    }
  }
}

function applyHacsStyles(hacsIframe) {
  let styles = `
    a.actionlink {
      color: ${secondaryColor} !important;
    }
    
    a.hacsbutton {
      background-color: ${secondaryColor} !important;
    }
    
    .pending-upgrade {
      color: ${secondaryColor} !important;
    }
  `;

  let styleEl = document.createElement("style"); 
  styleEl.type = "text/css";  
  styleEl.innerHTML = styles;

  function waitForIframeAndApply(hacsIframe) {
    // Get a handle to the iframe element
    var iframeDoc = hacsIframe.contentDocument || hacsIframe.contentWindow.document;

    // Check if loading is complete
    if (iframeDoc.readyState == 'complete') {
      hacsIframe.contentDocument.head.appendChild(styleEl); 
      return;
    } 

    // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    window.setTimeout(checkIframeLoaded, 100);
  };

  waitForIframeAndApply(hacsIframe);
}