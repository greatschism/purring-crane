// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

(function() {
// The avatar frame used in table views and cards
HT.View.createAvatarView = function() {
  var path = Ti.App.ABS_PATH;
  var view = Titanium.UI.createView({
    width: 50,
    height: 52,
    top: 5,
    left: 10,
    anchorPoint: {y: 0},
    backgroundImage: path + "images/bg_activity_feed_avatar.png"
  });

  view.add(Titanium.UI.createImageView({
    width: 44,
    height: 43,
    top: 3,
    anchorPoint: {y: 0, x: 0.5},
    image: path + "images/no_avatar.png"
  }));
  
  return view;
};
})();