# ngContextMenu

To use this component you can download it directly from repository (repository probably will have newest version of this component) or using node package manager :

```bash

npm install angular-context-menu

```

And then you can use it with adding script and css file to your html page.

## Basic configuration

First you need to add module with component to angular module that will use angular-context-menu component:

```javascript

angular.module('application', ['ngContextMenu']);

```

And then you can use it in your html file like this:

```html

<button ng-context-menu="arrayOfItems">Right click on me!</button>

```

Example arrayOfItems (contains every type of menu item)

``` javascript

var callback = function(){ }; // function launched only when clicked on normal item (not with submenu or disabled)

var item = { name: "Menu option!", callback: callback },
    disabledItem = { name: "Disabled option :(", disabled: true },
    separatorItem = { separator: true },
    itemWithSubmenu = {
      name: "Submenu",
      submenu: [
        // those items can have nested submenus also!
        {
          name: "Sub option 1",
        },{
          name: "Sub option 2",
        },{
          name: "Sub option 3",
        },
      ]
    };

$scope.arrayOfItems = [ item, disabledItem, sseparatorItem, itemWithSubmenu ];
```
