// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

(function() {
  
  var platformWidth = Ti.App.PLATFORMWIDTH;
  var win = Titanium.UI.currentWindow;
  var _styles = win.HT.View.properties;
  var backButton = win.HT.View.customBackButton({});
  
  /**
  Bootstrap data
  */
  // Latest activity Table data.
  var data = [
    {
      username: "ormeski",
      overall: -2.54,
      type: "following",
      hasChild: false
    },
    {
      username: "scottowens",
      overall: 14.13,
      type: "update",
      hasChild: true,
      updateText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      username: "alfred",
      overall: 4.27,
      type: "following",
      hasChild: false
    },
    {
      username: "Jonesy",
      overall: 34.27,
      type: "following",
      hasChild: false
    },
    {
      username: "scottowens",
      overall: 34.27,
      type: "following",
      hasChild: false
    },
    {
      username: "alfred",
      overall: 34.27,
      type: "following",
      hasChild: false
    }
  ];
  
  // Homepage Quick Stats
  var quickStatData = [{
    name: "Quick Trades",
    value: 24
  },{
    name: "Accounts",
    value: 8
  }, {
    name: "Followers",
    value: 237
  }, {
    name: "Following",
    value: 128
  }];
  
  /**
  The Home View
  */
  var homeView = Titanium.UI.createView({
    width: platformWidth,
    height: 375,
    top: 0,
    left: 0,
    right: 0
  });
  
  var HomeRibbons = win.HT.View.createHeaderRibbons({
    leftLabel: "Overall",
    leftValue: "271.56%",
    rightLabel: "Today",
    rightValue: -1.47
  });
  
  /**
  Portfolio Overview
  @description Blue center box, lists recent numbers.
  */
  var portfolioOverview = Titanium.UI.createView({
    width: platformWidth,
    height: 51,
    top: 52,
    left: 0,
    right: 0,
    backgroundGradient: {
  		type:'linear',
  		colors:[{
  		  color:'#c5e0ea',
  		  position:0.0
  		},{
  		  color:'#a1ccd9',
  		  position:1.0
  		}]
  	},
    borderColor: "#88b8c7"
  });
  
  // To populate the stats, we'll loop over an array of objects to save some trouble.
  // Default amount of stats we can fit is 4
  //
  quickStats = [];
  for (var i=0, len = quickStatData.length; i < len; i++) {
    var blockView = Titanium.UI.createView({
      width: (platformWidth / len),
      height: 51,
      top: 0,
      left: ((platformWidth / len) * i)
    });
    
    var valueLabelView = Titanium.UI.createLabel({
      text: quickStatData[i].value,
      height: 20,
      top: 10,
      left: 10,
      font: {
        fontSize: 20,
        fontWeight: "bold"
      },
      color: "#235a6b",
      shadowColor: "#d9ebf1",
      shadowOffset:{x:0,y:0.5}
    });
    
    var typeLabelView = Titanium.UI.createLabel({
      text: quickStatData[i].name,
      height: 10,
      bottom: 10,
      left: 10,
      font: {
        fontSize: 10
      },
      color: "#235a6b",
      shadowColor: "#d9ebf1",
      shadowOffset:{x:0,y:0.5}
    });
    
    var pipe = Titanium.UI.createView({
      width: 1,
      height: 31,
      anchorPoint: {y: 0.5},
      right: 0,
      backgroundColor: "#86b7c6"
    });
    
    blockView.add(valueLabelView);
    blockView.add(typeLabelView);
    if (i < len-1) {blockView.add(pipe);}
    quickStats.push(blockView);
    
  }
  
  portfolioOverview.add(quickStats);
  
  // @end Portfolio Overview
  
  /**
  Latest activity
  @description Table view of all the latest activity in the timeline.
  */
  
  var tableHeader = Titanium.UI.createView({
    width: platformWidth,
    height: 25,
    top: 103,
    left: 0,
    right: 0,
    backgroundGradient: {
  		type:'linear',
  		colors:[{
  		  color:'#493a24',
  		  position:0.0
  		},{
  		  color:'#291e11',
  		  position:1.0
  		}]
  	}
  });
  
  tableHeader.add(Titanium.UI.createLabel({
    text: "Latest Activity",
    color: "white",
    center: tableHeader,
    left: 10,
    font: {
      fontSize: 9,
      fontWeight: 'bold'
    }
  }));
  
  var activityScrollView = Titanium.UI.createScrollView({
    width: platformWidth,
    height: 235,
    top: 128,
    left: 0,
    right: 0,
    backgroundColor: "#ece8e2"
  });
  
  var activityTableView = Titanium.UI.createTableView(_styles.TableView);
  
  var rowData = [];
  // Loop through the activity data feed and spit out a table row.
  for (var i = 0, len = data.length; i < len; i++) {
    var type = data[i].type;
    
    var row = Titanium.UI.createTableViewRow(_styles.TableViewRow);
    
    // Avatar View
    var activityFeedAvatarView = win.HT.View.createAvatarView();
    
    // @end Avatar View
    
    // Activity User Title Details Labels
    var activityFeedDetailView = Titanium.UI.createView({
      width: 243,
      height: "auto",
      top: 10,
      left: 69,
      anchorPoint: {y:0}
    });
    
    var userNameLabel = Titanium.UI.createLabel({
      text: data[i].username,
      width: "auto",
      height: 15,
      top: 0,
      left: 0,
      color: "black",
      shadowColor: "white",
      shadowOffset:{x:0,y:0.5},
      anchorPoint: {y:0, x:0},
      font: {
        fontSize: 15,
        fontWeight: "bold"
      }
    });
    
    var userPercentageLabel = Titanium.UI.createLabel({
      text: data[i].overall + "%",
      width: "auto",
      height: 15,
      top: 0,
      left: (userNameLabel.left + userNameLabel.width + 5),
      anchorPoint: {y:0, x:0},
      font: {
        fontSize: 15,
        fontWeight: "bold"
      },
      shadowColor: "white",
      shadowOffset:{x:0,y:0.5},
      className: (data[i].overall > 0) ? 'gain' : 'loss'
    });
    
    var userSaidLabel = Titanium.UI.createLabel({
      width: "auto",
      height: 15,
      top: 0,
      left: (userNameLabel.left + userNameLabel.width + 5),
      text: "said",
      color: "#959085",
      font: {
        fontSize: 15
      }
    });
    
    // @end Activity User Title Details Labels
    
    // New Follower Template
    var newFollowerLabel = Titanium.UI.createLabel({
      text: "followed",
      width: "auto",
      height: "auto",
      top: 16,
      left: 0,
      font: {
        fontSize: 12
      },
      color: "#959085",
      shadowColor: "white",
      shadowOffset:{x:0,y:0.5}
    });
    
    var newFollowerUserNameLabel = Titanium.UI.createLabel({
      text: "matthamm",
      width: "auto",
      height: "auto",
      top: 16,
      left: (newFollowerLabel.size.width + 2),
      font: {
        fontSize: 12
      },
      shadowColor: "white",
      shadowOffset:{x:0,y:0.5}
    });
    
    var newFollowerOverallLabel = Titanium.UI.createLabel({
      text: "35.22%",
      width: "auto",
      height: "auto",
      top: 16,
      left: (newFollowerUserNameLabel.size.width + newFollowerUserNameLabel.left + 2),
      font: {
        fontSize: 12
      },
      shadowColor: "white",
      shadowOffset:{x:0,y:0.5},
      className: "gain"
    });
    
    // @end status update layout.
    
    var statusUpdateLabel = Titanium.UI.createLabel({
      text: '“' + data[i].updateText + '”',
      width: 234,
      height: 40,
      anchor: {y:0},
      // minimumFontSize: 11,
      top: 16,
      left: 0,
      font: {
        fontSize: 11
      }
    });
    
    // Timestamp Label
    // Set the top value after determining the type of info being rendered
    var activityFeedItemTimestampLabel = Titanium.UI.createLabel({
      text: "28",
      width: "auto",
      height: 9,
      left: 0,
      bottom: 5,
      color: "#959085",
      font: {
        fontSize: 9,
        fontWeight: "bold"
      },
      shadowColor: "white",
      shadowOffset:{x:0,y:0.5}
    });
    
      activityFeedItemTimestampLabel.add(Titanium.UI.createLabel({
        text: "mins",
        width: "auto",
        height: 9,
        bottom: 0,
        left: (activityFeedItemTimestampLabel.width),
        color: "#959085",
        font: {
          fontSize: 9
        }
      }));
    // @end Timestamp label
    
    activityFeedDetailView.add(userNameLabel);    
    
    /*
    Before inserting the activity feed items, we need to determine which template
    is needed.  
    */
    
    // If the status is a "userX followed userY"
    if (type === "following") {
      activityFeedDetailView.add(userPercentageLabel);
      activityFeedDetailView.add(newFollowerUserNameLabel);
      activityFeedDetailView.add(newFollowerOverallLabel);
      activityFeedDetailView.add(newFollowerLabel);
      
      activityFeedItemTimestampLabel.top = (newFollowerLabel.top + newFollowerLabel.size.height + 3);
    }
    
    // If the status is a text update
    if (type === "update") {
      activityFeedDetailView.add(userSaidLabel);
      activityFeedDetailView.add(statusUpdateLabel);
      activityFeedItemTimestampLabel.top = (statusUpdateLabel.top + statusUpdateLabel.size.height + 3);
    }
    
    // Add the timestamp after determining the height of the preceding label
    activityFeedDetailView.add(activityFeedItemTimestampLabel);
    
    var borderBottom = Titanium.UI.createView({
      width: platformWidth,
      height: 1,
      backgroundColor: "#c0baae",
      bottom: -1,
      left: 0,
      right: 0
    });
    
    // Add the table row child views
    row.add(activityFeedAvatarView);
    row.add(activityFeedDetailView);
    row.add(borderBottom);
    row.height = "auto";
    row.className = 'followed-row';
    row.clickMe = data[i].hasChild;
    /// Push to the row Array
    rowData.push(row);
  }
    
  activityTableView.data = rowData;
  activityScrollView.add(activityTableView);
  
  activityTableView.addEventListener('click', function(e) {
    var idx = e.index;
    if (e.rowData.clickMe) {
      var StatusDetailWindow = Titanium.UI.createWindow({
  			title: data[idx].username,
  			url: "/ht/views/HomeStatusDetailView.js",
  			HT: win.HT,
  			statusData: data[idx],
  			className: "base-window",
  			barImage: Ti.App.ABS_PATH + "images/bg_topbar.png",
  			backButtonTitleImage: Ti.App.ABS_PATH + "images/back_button.png",
  			leftNavButton: backButton
  		});
  		
  		Titanium.UI.currentTab.open(StatusDetailWindow,{animated:true});
  		
  		backButton.addEventListener("click", function(e) {
  		  StatusDetailWindow.close({animated: true});
      });
    }
  });
  
  homeView.add(HomeRibbons);
  homeView.add(portfolioOverview);
  homeView.add(tableHeader);
  homeView.add(activityScrollView);
  
  // Add the view
  Titanium.UI.currentWindow.add(homeView);
})();