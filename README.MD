# Accessible and Responsive Tabbed Interface

This is an accessible tab solution based on guidelines documented by Heydon Pickering on the [Inclusive Components Pattern Library](https://inclusive-components.design/tabbed-interfaces/)

This is one of the many great patterns that was once shared on the [a11y project website's list of patterns](https://a11yproject.com/patterns).

## Controls

- Arrow Left: Previous Tab
- Arrow Right: Next Tab
- Arrow Down: Focus on Tab Panel

## Markup

```
<div data-tab-component>
  <ul class="tab-list">
    <li class="tab-item">
      <a class="tab-link" href="#section-0">Planning</a>
    </li>
    <li class="tab-item">
      <a class="tab-link" href="#section-1">Feedback</a>
    </li>
    <li class="tab-item">
      <a class="tab-link" href="#section-2">Retrospective</a>
    </li>
  </ul>
  <section id="section-0" class="tab-panel">
    ...
  </section>
  <section id="section-1" class="tab-panel">
    ...
  </section>
  <section id="section-2" class="tab-panel">
    ...
  </section>
</div>
```

## JavaScript

### Methods

`a11yTabs.create('selector')`

Creates a tabbed interface. Expects a string with the selector of the element that contains the `tab-list` and `tab-panels`.

`a11yTabs.destroy(element)`

Destroys the tabbed interface, removes Aria roles and attributes and event listeners.

#### Usage

```
// Create component
var tabCompponent = a11yTabs.create('[data-tab-component]);

// Destroy component
a11yTabs.destroy(tabComponent.element);
```

#### Options

Styling of the tab elments are based on `ARIA` roles. The default selector values can be overridden by passing in an options object to determine the selector values your component is using to structure the tabs.

```
{
  tabList: '.tab-list',
  tabItem: '.tab-item',
  tabLink: '.tab-link',
  tabPanel: '.tab-panel'
}
```
