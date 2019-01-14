const tabs = (function tabsComponentIIFE() {
  'use strict';

  const tabInstances = new WeakMap();

  /**
   * Instantiates the component
   * @constructor
   * @param {DOM Node} element
   */
  const TabComponent = function (element, options) {
    if (!element || !element.nodeType) {
      throw new Error('The DOM element was not found when creating the tab component');
    }
    const defaults = {
      tabList: '.tab-list',
      tabItem: '.tab-item',
      tabLink: '.tab-link',
      tabPanel: '.tab-panel'
    }
    this.options = Object.assign(defaults, options);

    this.element = element;
    this.tabList = element.querySelector(this.options.tabList);
    this.tabItems = [].slice.call(this.tabList.querySelectorAll(this.options.tabItem));
    this.tabLinks = [].slice.call(this.tabList.querySelectorAll(this.options.tabLink));
    this.tabPanels = [].slice.call(element.querySelectorAll(this.options.tabPanel));

    this.currentIndex = 0;

    this.tabList.setAttribute('role', 'tablist');

    this.tabItems.forEach((item, index) => {
      item.setAttribute('role', 'presentation');

      if (index === 0) {
        item.setAttribute('data-tab-active', '');
      }
    });

    this.tabLinks.forEach((item, index) => {
      item.setAttribute('role', 'tab');
      item.setAttribute('id', 'tab' + index);

      if (index > 0) {
        item.setAttribute('tabindex', '-1');
      } else {
        item.setAttribute('aria-selected', 'true');
      }
    });

    this.tabPanels.forEach((item, index) => {
      item.setAttribute('role', 'tabpanel');
      item.setAttribute('aria-labelledby', 'tab' + index);
      item.setAttribute('tabindex', '-1');

      if (index > 0) {
        item.setAttribute('hidden', '');
      }
    });

    this.eventCallback = handleEvents.bind(this);
    this.tabList.addEventListener('click', this.eventCallback, false);
    this.tabList.addEventListener('keydown', this.eventCallback, false);

    tabInstances.set(this.element, this);
  }


  TabComponent.prototype = {
    handleTabInteraction: function handleTabInteraction(index, direction) {
      const currentIndex = this.currentIndex;
      let newIndex = index;

      // Click handler does not pass direction
      if (direction) {
        if (direction === 37) {
          newIndex = index - 1;
        } else {
          newIndex = index + 1
        }
      }

      // Supports continuous tabbing when reaching beginning or end of tab list
      if (newIndex < 0) {
        newIndex = this.tabLinks.length - 1;
      } else if (newIndex === this.tabLinks.length) {
        newIndex = 0;
      }

      // update tabs
      this.tabLinks[currentIndex].setAttribute('tabindex', '-1');
      this.tabLinks[currentIndex].removeAttribute('aria-selected');
      this.tabItems[currentIndex].removeAttribute('data-tab-active');

      this.tabLinks[newIndex].setAttribute('aria-selected', 'true');
      this.tabItems[newIndex].setAttribute('data-tab-active', '');
      this.tabLinks[newIndex].removeAttribute('tabindex');
      this.tabLinks[newIndex].focus();

      // update tab panels
      this.tabPanels[currentIndex].setAttribute('hidden', '');
      this.tabPanels[newIndex].removeAttribute('hidden');

      this.currentIndex = newIndex;

      return this;
    },

    handleTabpanelFocus: function handleTabPanelFocus(index) {
      this.tabPanels[index].focus();

      return this;
    }
  }

  /**
   * Creates or returns existing component
   * @param {string} selector
   */
  function createTabComponent(selector, options) {
    const element = document.querySelector(selector);
    return tabInstances.get(element) || new TabComponent(element, options);
  }

  /**
   * Destroys an existing component
   * @param {DOM Node} element
   */
  function destroyTabComponent(element) {
    if (!element || !element.nodeType) {
      throw new Error('The DOM element was not found when deleting the tab component');
    }

    let component = tabInstances.get(element);
    component.tabList.removeAttribute('role', 'tablist');

    component.tabItems.forEach((item, index) => {
      item.removeAttribute('role', 'presentation');

      if (index === 0) {
        item.removeAttribute('data-tab-active');
      }
    });

    component.tabLinks.forEach((item, index) => {
      item.removeAttribute('role', 'tab');
      item.removeAttribute('id', 'tab' + index);

      if (index > 0) {
        item.removeAttribute('tabindex', '-1');
      } else {
        item.removeAttribute('aria-selected', 'true');
      }
    });

    component.tabPanels.forEach((item, index) => {
      item.removeAttribute('role', 'tabpanel');
      item.removeAttribute('aria-labelledby', 'tab' + index);
      item.removeAttribute('tabindex', '-1');

      if (index > 0) {
        item.removeAttribute('hidden');
      }
    });

    component.tabList.removeEventListener('click', component.eventCallback);
    component.tabList.removeEventListener('keydown', component.eventCallback);
    tabInstances.delete(component.element);
  }

  /**
   * Handles all event listener callbacks
   * @param {event} event
   */
  function handleEvents(event) {
    if (event.type === 'click') {
      event.preventDefault();
      TabComponent.prototype.handleTabInteraction.call(this, this.tabLinks.indexOf(event.target));
    }

    if (event.type === 'keydown') {
      const index = this.tabLinks.indexOf(event.target);

      // Left and right arrows
      if (event.which === 37 || event.which === 39) {
        event.preventDefault();
        TabComponent.prototype.handleTabInteraction.call(this, index, event.which);
      }

      // Down arrow
      if (event.which === 40) {
        event.preventDefault();
        TabComponent.prototype.handleTabpanelFocus.call(this, index);
      }
    }
  }

  function getTabComponents() {
    return tabInstances;
  }

  return {
    create: createTabComponent,
    destroy: destroyTabComponent,
    getComponents: getTabComponents
  }
})();