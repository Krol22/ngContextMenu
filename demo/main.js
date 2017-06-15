angular.module('contextMenuDemo', ['ngContextMenu'])
    .controller('demoController', function ($scope){

        var callback = function(){ };
        var item = { name: "Menu option ", icon: "fa-bolt", callback: callback },
            disabledItem = { name: "Disabled option :(", disabled: true },
            separatorItem = { separator: true },
            itemWithSubmenu = {
              name: "Submenu",
              submenu: [
                {
                  name: "Sub option 1",
                  icon: "fa-address-book"
                },{
                  name: "Sub option 2",
                },{
                  name: "Sub option 3",
                  submenu: [
                      {
                          name: "Sub option 3.1",
                      },
                      {
                          name: "Sub option 3.2"
                      }
                  ]
                },
              ]
            };

        $scope.items = [
            item, disabledItem, separatorItem, itemWithSubmenu
        ];
    });
