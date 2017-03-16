(function(){

  var contextMenu, contextMenuController, templateString;

  this.templateString = 
    '<div ng-transclude></div>' +
    '<div class="context-menu">' +
    '  <div class="context-menu-item" ng-repeat="item in items"' + 
    '    ng-class="{ \'separator-context-menu\': item.separator, \'disabled-context-menu-item\': item.disabled, submenu: item.submenu && item.submenu.length}" ng-click="callback(item)">' +
    
    '    <div ng-if="!item.separator" class="context-menu" ng-include="\'menu.html\'"></div>' +
    '      {{ item.name }}' + 
    '    </div>' +
    '  </div>' +  
    '</div>' +  
    '<script type="text/ng-template" id="menu.html">' +
    '  <div class="context-menu-item" ng-repeat="item in item.submenu"' +
    '    ng-class="{ \'separator-context-menu\': item.separator, \'disabled-context-menu-item\': item.disabled, submenu: item.submenu && item.submenu.length}" ng-click="callback(item)">' +
    '    <div ng-if="!item.separator" class="context-menu" ng-include="\'menu.html\'"></div>' +
    '      {{ item.name }}' + 
    '    </div>' +
    '  </div>' +
    '</script>';

  this.contextMenuController = function(scope, elem, attr){
    var randomId = Math.random().toString(36).substring(7);

    elem.addClass("context-menu-trigger" + randomId);
    elem.ready(function(){
      initJQuery(randomId);
    });

    scope.callback = function(item){
      if(item.separator || (item.submenu && item.submenu.length)){
        return; 
      }
      item.callback();
    };
  };

  this.contextMenu = function(){ 
    return {
      scope: {
        items: '=ngContextMenu'
      },
      link: this.contextMenuController,
      restrict: 'A',
      template: this.templateString,
      transclude: true
    };
  };

  function initJQuery(randomId){
    var direction = 0;
    var documentWidth = $(document).width();
    var documentHeight = $(document).height();

    var contextMenu = $('.context-menu-trigger' + randomId + ' > .context-menu');

    $('.context-menu-trigger' + randomId).contextmenu(function(e){
      e.preventDefault(); 

      contextMenu.css('display', 'block');
      
      var menuWidth = contextMenu.outerWidth();
      var menuXPosition = contextMenu.offset().left;
      
      if(e.pageX + menuWidth < documentWidth){
        contextMenu.css('left', e.pageX + 'px');
      } else {
        var newXPosition = documentWidth - menuWidth;
        contextMenu.css('left', newXPosition + 'px');
      }
      
      var mouseYPosition = e.pageY;
      var menuHeight = contextMenu.outerHeight();
      
      if(mouseYPosition + menuHeight < documentHeight){
        contextMenu.css('top', e.pageY + 10 + 'px');
      } else {
        var newYPosition = documentHeight - menuHeight;
        contextMenu.css('top', newYPosition + 'px');
      }
    }); 
    
    $(document).click(function(e){
      if(!$(e.target).is('.disabled')){
        direction = 0;
        contextMenu.css('display', 'none'); 
      }
    });
    
    $(window).resize(function(e){
      documentWidth = $(document).width(); 
      documentHeight = $(document).height(); 
      contextMenu.css('display', 'none'); 
    });


    $('.context-menu-item.submenu').hover(function(e){
      var currentVisibleSubmenu = $('.context-menu-item.submenu:hover > .context-menu').last();
      var hoveredMenuItem = $('.context-menu-item.submenu:hover').last();
      var hoveredMenuItemWidth = hoveredMenuItem.outerWidth();
      var subMenuWidth = $(e.target).children().width();
      var hoveredMenuItemXPosition = hoveredMenuItem.offset().left;
      
      if ($(e.target).children().html() === currentVisibleSubmenu.html()) {
        direction = 0;
        if(subMenuWidth + hoveredMenuItemWidth + hoveredMenuItemXPosition > documentWidth){
          direction = 1;
        } 
      }
      
      if(!direction){
        currentVisibleSubmenu.css('left', hoveredMenuItemWidth + 'px');
      } else {
        currentVisibleSubmenu.css('left', "-" + subMenuWidth + 'px');
      }
      
      var hoveredMenuItemYPosition = hoveredMenuItem.position().top;
      currentVisibleSubmenu.css('top', hoveredMenuItemYPosition + 'px');
    }, function(e){
    });
  }  

  angular.module('ngContextMenu', [])
  .directive('ngContextMenu', this.contextMenu);
  
})();


/* Example item array with submenu, disabled menu-item, separators
 *
 * [
 *  { 
 *    name: 'item 1',
 *    submenu: [
 *      {
 *        name: 'item 1.1',
 *        disabled: true,
 *      },
 *      {
 *        name: 'item 1.2',
 *        submenu: [
 *          {
 *            name: 'item 1.2.1',
 *          }
 *        ]
 *      }
 *    ]
 *  },
 * ]
 *
 *
 */


