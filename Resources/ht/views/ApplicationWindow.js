// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

(function() {
  var platformWidth = Ti.App.PLATFORMWIDTH;
  var _tabBar = {};
  var win = Titanium.UI.currentTab;

  // Portfolio window & tab
  var portfolioWindow = Titanium.UI.createWindow({
    title: "Portfolio",
    url: "ht/views/PortfolioView.js",
    className: "base-window",
    HT: HT
  });

  var portfolioTab = Titanium.UI.createTab({
    window: portfolioWindow,
    touchEnabled: false
  });

  // Market window & tab
  var marketWindow = Titanium.UI.createWindow({
    title: "Market",
    url: "ht/views/MarketsView.js",
    className: "base-window",
    HT: HT
  });

  var marketTab = Titanium.UI.createTab({
    window: marketWindow,
    touchEnabled: false
  });

  // Performance window & tab
  var performanceWindow = Titanium.UI.createWindow({
    title: "Perfomance",
    url: "ht/views/PerformanceView.js",
    className: "base-window",
    HT: HT
  });

  var performanceTab = Titanium.UI.createTab({
    window: performanceWindow,
    touchEnabled: false
  });
  /**
    Set up the base tab groups here. We'll be laying our own custom tab bar on top below.
  */
  HT.View.CreateBase = function() {

    // _tabBar is the native tab bar, which we will be hiding.
    _tabBar = Titanium.UI.createTabGroup();

    _tabBar.addTab(portfolioTab);
    _tabBar.addTab(marketTab);
    _tabBar.addTab(performanceTab);
    
    return _tabBar;
  };
  
  /**
  Creates the main navigation, opens the base window before doing so.
  */
  HT.View.createApplicationWindow = function() {
    // The Main Window
    var win = Ti.UI.createWindow({
      height: 58,
      bottom: 0
    }),
    navigation = Ti.UI.createView({
      width: platformWidth,
      height: 58,
      backgroundImage: 'images/bg_nav_repeat.png',
      right: 0,
      bottom: 0,
      left: 0
    }),
    // Tabs variables
    tabWidth = Math.floor(platformWidth / 3),
    tabs = [],
    // Active tab nib
    activeNib = Ti.UI.createView({
      width: tabWidth,
      height: 10,
      top: 9,
      left: 0
      });
    
    activeNib.add(
      Ti.UI.createImageView({
        width: 24,
        height: 10,
        // left: (tabWidth / 2) - 12,
        anchor: {x: 0, y: 0},
        top: 0,
        image: 'images/nav_active.png'
      })
    );
        
    // The Tab button.
    function createTabBar(_title, _cb) {
      var tab,
      tabTitle = _title,
      tabIconTitle = tabTitle.toLowerCase(),
      tabIconOn = 'images/tab_' + tabIconTitle + '_on.png',
      tabIconOff = 'images/tab_' + tabIconTitle + '.png',
      labelOn = 'white',
      labelOff = '#8e7f6a';

      tab = Ti.UI.createView({
        width: tabWidth,
        height: 53,
        top: 4
      });
      // Icon.
      var icon = Ti.UI.createImageView({
        width: 35,
        height: 23,
        left: 0,
        right: 0,
        top: 14,
        image: tabIconOff
      });

      var label = Ti.UI.createLabel({
        width: 'auto',
        top: 36,
        center: tab,
        text: tabTitle,
        color: labelOff,
        highlightedColor: labelOn,
        shadowColor: '#2a1e11',
        font: {
          textAlign: 'center',
          fontSize: 9,
          fontWeight: 'bold'
        }
      });
      
      tab.add(label);
      tab.add(icon);
      
      tab.addEventListener('click', _cb);
      
      tab.active = false;
      
      // Toggle the tab state
      tab.toggle = function() {
        tab.active = !tab.active;
        icon.image = (tab.active) ? tabIconOn : tabIconOff;
        label.color = (tab.active) ? labelOn : labelOff;
      };
      
      return tab;
    };
    
    // Set the current section, animate the "nib" to the proper tab.
    function sectionController(_idx) {
      _tabBar.setActiveTab(_idx);
      for (var i = 0, len = tabs.length; i < len; i++) {
        if (i === _idx) {
          if (!tabs[i].active) {
            activeNib.animate({
              left: Math.floor(tabWidth * _idx)
            });
            tabs[_idx].toggle();
          }
        } else if (tabs[i].active && (_idx !== i)) {
          tabs[i].toggle();
        }
      }
      
    }
    
    // Make the tabs by pushing them into an array.
    tabs.push(createTabBar('Portfolio', function() {
      sectionController(0);
    }));
    tabs.push(createTabBar('Market', function() {
      sectionController(1);
    }));
    tabs.push(createTabBar('Performance', function() {
      sectionController(2);
    }));
    
    // Set the tab left, add a vertical rule
    for (var i = 0, len = tabs.length; i < len; i++) {
      var vr = Ti.UI.createImageView({
        width: 2,
        height: 48,
        top: 10,
        left: (tabWidth * i) + tabWidth,
        bottom: 0,
        image: 'images/bg_nav_vbar.png'
      });
      
      tabs[i].left = tabWidth * i;
      navigation.add(tabs[i]);
      
      if (i+1 < len) {
        navigation.add(vr);
      }
    }
    
    tabs[0].fireEvent('click', function(e) {
      sectionController(0);
    });
    
    var base = HT.View.CreateBase();
    base.open();
    
    navigation.add(activeNib);
    win.add(navigation);
    
    return win;
  };
})();