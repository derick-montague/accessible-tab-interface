# Accessible and Responsive Tabbed Interface
This is an accessible tab solution based on guidelines documented by Heydon Pickering on the Inclusive Components Pattern Library - https://inclusive-components.design/tabbed-interfaces/

## Controls
* Arrow Left: Previous Tab
* Arrow Right: Next Tab
* Arrow Down: Focus on Tab Panel

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
`tabs.create('selector')`

Creates a tabbed interface. Expects a string with the selector of the element that contains the `tab-list` and `tab-panels`.

`tabs.destroy(element)`

Destroys the tabbed interface, removes Aria roles and attributes and event listeners.

#### Usage
```
// Create component
var tabCompponent = tabs.create('[data-tab-component]);

// Destroy component
tabs.destroy(tabComponent.element);
```

#### Options
All styles are based on Aria roles. The default options listed below can be overridden by passing in an options object to determine the selectors of the tabbed interface children.

```
{
  tabList: '.tab-list',
  tabItem: '.tab-item',
  tabLink: '.tab-link',
  tabPanel: '.tab-panel'
}
```


This is one of a few other great patterns that can be found on the patterns list on the a11y project website, https://a11yproject.com/patterns