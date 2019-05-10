// CONFIG START //////////////////////////////////////////////////////////////

let swipe_amount = 15; // Minimum percent of screen needed to swipe, 1-100.
let skip_tabs = []; // List of tabs to skip over. e.g., [1,3,5].
let wrap = true; // Wrap around first and last tabs. Set as false to disable.
let prevent_default = false; // Prevent browsers swipe action for back/forward.

// EXPERIMENTAL OPTIONS //////////////////////////////////////////////////////
// These options may not work as expected. ///////////////////////////////////

let animate = "none"; // none, swipe, fade, or flip. Must be in quotes.
// In between each transition your theme's background-color will be shown.

// CONFIG END ////////////////////////////////////////////////////////////////

swipe_amount /= Math.pow(10, 2);
const appLayout = findAppLayout();
const view = appLayout.querySelector('[id="view"]');
const tabContainer = appLayout.querySelector("paper-tabs");
let xDown, yDown, xDiff, yDiff, activeTab, firstTab, lastTab, left;
let tabs = Array.from(tabContainer.querySelectorAll("paper-tab"));

appLayout.addEventListener("touchstart", handleTouchStart, { passive: true });
appLayout.addEventListener("touchmove", handleTouchMove, { passive: false });
appLayout.addEventListener("touchend", handleTouchEnd, { passive: true });

function handleTouchStart(event) {
  if (typeof event.path == "object") {
    for (let element of event.path) {
      if (element.nodeName == "SWIPE-CARD") return;
      else if (element.nodeName == "HUI-VIEW") break;
    }
  }
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
  if (!lastTab) filterTabs();
  activeTab = tabs.indexOf(tabContainer.querySelector(".iron-selected"));
}

function handleTouchMove(event) {
  if (xDown && yDown) {
    xDiff = xDown - event.touches[0].clientX;
    yDiff = yDown - event.touches[0].clientY;
    if (Math.abs(xDiff) > Math.abs(yDiff) && prevent_default) {
      event.preventDefault();
    }
  }
}

function handleTouchEnd() {
  if (activeTab < 0 || Math.abs(xDiff) < Math.abs(yDiff)) {
    xDown = yDown = xDiff = yDiff = null;
    return;
  }
  if (xDiff > Math.abs(screen.width * swipe_amount)) {
    left = false;
    activeTab == tabs.length - 1 ? click(firstTab) : click(activeTab + 1);
  } else if (xDiff < -Math.abs(screen.width * swipe_amount)) {
    left = true;
    activeTab == 0 ? click(lastTab) : click(activeTab - 1);
  }
  xDown = yDown = xDiff = yDiff = null;
}

function findAppLayout() {
  try {
    let panelResolver = document
      .querySelector("home-assistant")
      .shadowRoot.querySelector("home-assistant-main")
      .shadowRoot.querySelector("app-drawer-layout partial-panel-resolver");
    if (panelResolver.shadowRoot) {
      return panelResolver.shadowRoot
        .querySelector("ha-panel-lovelace")
        .shadowRoot.querySelector("hui-root")
        .shadowRoot.querySelector("ha-app-layout");
    } else {
      return document
        .querySelector("home-assistant")
        .shadowRoot.querySelector("home-assistant-main")
        .shadowRoot.querySelector("ha-panel-lovelace")
        .shadowRoot.querySelector("hui-root")
        .shadowRoot.querySelector("ha-app-layout");
    }
  } catch (e) {
    console.log("Can't find 'ha-app-layout'.");
  }
}

function filterTabs() {
  tabs = tabs.filter(element => {
    return (
      !skip_tabs.includes(tabs.indexOf(element)) &&
      getComputedStyle(element, null).display != "none"
    );
  });
  firstTab = wrap ? 0 : null;
  lastTab = wrap ? tabs.length - 1 : null;
}

function click(index) {
  if (animate == "swipe") {
    let _in = left ? `${screen.width / 1.5}px` : `-${screen.width / 1.5}px`;
    let _out = left ? `-${screen.width / 1.5}px` : `${screen.width / 1.5}px`;
    view.style.transitionDuration = "200ms";
    view.style.opacity = 0;
    view.style.transform = `translate3d(${_in}, 0px, 0px)`;
    view.style.transition = "transform 0.20s, opacity 0.18s";
    setTimeout(function() {
      tabs[index].dispatchEvent(
        new MouseEvent("click", { bubbles: false, cancelable: true })
      );
      view.style.transitionDuration = "0ms";
      view.style.transform = `translate3d(${_out}, 0px, 0px)`;
      view.style.transition = "transform 0s";
    }, 210);
    setTimeout(function() {
      view.style.transitionDuration = "200ms";
      view.style.opacity = 1;
      view.style.transform = `translate3d(0px, 0px, 0px)`;
      view.style.transition = "transform 0.20s, opacity 0.18s";
    }, 250);
  } else if (animate == "fade") {
    view.style.transitionDuration = "200ms";
    view.style.transition = "opacity 0.20s";
    view.style.opacity = 0;
    setTimeout(function() {
      tabs[index].dispatchEvent(
        new MouseEvent("click", { bubbles: false, cancelable: true })
      );
      view.style.transitionDuration = "0ms";
      view.style.opacity = 0;
      view.style.transition = "opacity 0s";
    }, 210);
    setTimeout(function() {
      view.style.transitionDuration = "200ms";
      view.style.transition = "opacity 0.20s";
      view.style.opacity = 1;
    }, 250);
  } else if (animate == "flip") {
    view.style.transitionDuration = "200ms";
    view.style.transform = "rotatey(90deg)";
    view.style.transition = "transform 0.20s, opacity 0.20s";
    view.style.opacity = 0.25;
    setTimeout(function() {
      tabs[index].dispatchEvent(
        new MouseEvent("click", { bubbles: false, cancelable: true })
      );
    }, 210);
    setTimeout(function() {
      view.style.transitionDuration = "200ms";
      view.style.transform = "rotatey(0deg)";
      view.style.transition = "transform 0.20s, opacity 0.20s";
      view.style.opacity = 1;
    }, 250);
  } else {
    tabs[index].dispatchEvent(
      new MouseEvent("click", { bubbles: false, cancelable: true })
    );
  }
}
