(function() {
  var win = Titanium.UI.currentWindow;
  var StatusDetailView = Titanium.UI.createView({
    backgroundGradient: {
  		type:'radial',
  		colors:[{
  		  color:'#ded9d0',
  		  position:0.0
  		},{
  		  color:'#f3f0eb',
  		  position:1.0
  		}]
  	}
  });
  
  var data = win.statusData;
  var avatar = win.HT.View.createAvatarView();
  
  avatar.left = 10;
  avatar.top = 10;
  
  var usernameLabel = Titanium.UI.createLabel({
    text: data.username,
    width: 200,
    height: 45,
    anchor: {x: 0, y: 0},
    top: 10,
    left: (20 + avatar.width),
    font: {
      fontSize: 15,
      fontWeight: "bold"
    }
  });
  
  var statusTextLabel = Titanium.UI.createLabel({
    width: (Ti.App.PLATFORMWIDTH - 20),
    height: "auto",
    text: "“" + data.updateText + "”",
    top: 75,
    left: 10,
    anchor: {x: 0, y: 0},
    font: {
      fontSize: 15
    }
  });
  
  StatusDetailView.add(usernameLabel);
  StatusDetailView.add(statusTextLabel);
  StatusDetailView.add(avatar);
  
  win.add(StatusDetailView);
})();