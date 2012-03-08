(function() {
var platformWidth = Ti.App.PLATFORMWIDTH;
var path = Ti.App.ABS_PATH;

var cardWidth = 302;

HT.View.properties = {
  
  BoxGradient_gain: {
    backgroundGradient: {
  		type:'linear',
  		colors: ["#9ac053", "#6ba11d"]
  	},
    borderColor: "#769b32"
  },
  
  BoxGradient_loss: {
    backgroundGradient: {
  		type:'linear',
  		colors: ["#ea7648", "#d05f2c"]
  	},
    borderColor: "#bd521e"
  },
  
  BoxGradient_default: {
    backgroundGradient: {
  		type:'linear',
  		colors:['#34afe9', '#1393cf']
  	},
    borderColor: "#087eb6"
  },
  
  BaseWindow: {
    barImage: path + "images/bg_topbar.png",
		className: "base-window"
  },
  
  BaseButton: {
    width: 70,
    height: 33,
    backgroundImage: path + "images/square_button.png",
    font: {
      fontSize: 14,
      fontWeight: "bold"
    }
  },
  
  LargeBlueButton: {
    width: 240,
    height: 33,
    anchorPoint: {x: 0.5},
    color: "white",
    font: {
      fontSize: 14,
      fontWeight: "bold"
    },
    backgroundImage: path + "images/btn_blue_flat.png"
  },
  
  CardsWindow: {
    backgroundImage: path + "images/bg_wallpaper.png"
  },
  
  CardHeaderView: {
    width: cardWidth,
    height: 96,
    top: 0,
    left: 0,
    right: 0
  },
  
  CardScroller: {
    width: platformWidth,
    height: 344,
    top: 10,
    left: 0,
    showPagingControl: true,
    touchEnabled: true,
    zIndex: 1
  },
  
  CardButtons: {
    width: cardWidth,
    height: 46,
    top: 0,
    left: 0,
    backgroundImage: path + "images/btn_card_link.png",
    color: "#6b6559",
    font: {fontSize: 12},
    textAlign: "left",
    zIndex: 99
  },
  
  // Default Ribbon [GOLD]
  CardRibbonBG_default: {
    backgroundColor: "#ca9625",
    backgroundGradient: {
      type: "linear",
      colors: ["#e0ac3d", "#b08913"],
      startPoint:{x:0,y:2},
      backFillStart:true
    }
  },
  
  CardRibbonBottomBorder_default: {
    backgroundColor: "#937008"
  },
  
  CardRibbonWhiteText_default: {
    color: "white",
    shadowColor: "#ae862c",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonAccentText_default: {
    color: "#fee89b",
    shadowColor: "#ae862c",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonDarkText_default: {
    color: "#654d05",
    shadowColor: "#dfc98f",
    shadowOffset: {x: 0, y: 0.5}
  },
  
  // Gain Ribbon [BLUE]
  CardRibbonBG_Performance_gain: {
    backgroundColor: "#418eae",
    backgroundGradient: {
      type: "linear",
      colors: ["#53a5c0", "#418eae"],
      startPoint:{x:0,y:2},
      backFillStart:true
    }  ,
      shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonBottomBorder_Performance_gain: {
    backgroundColor: "#2b7797",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonAccentText_Performance_gain: {
    color: "#86ddfd",
    shadowColor: "#387489",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonWhiteText_Performance_gain: {
    color: "white",
    shadowColor: "#387489",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonDarkText_Performance_gain: {
    color: "#134e5f",
    shadowColor: "#65c3ee",
    shadowOffset: {x: 0, y: 0.5}
  },
  
  // Gain Ribbon [GREEN]
  CardRibbonBG_gain: {
    backgroundColor: "#8db248",
    backgroundImage: path + "images/bg_card_market_gain.png",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonBottomBorder_gain: {
    backgroundColor: "#789d34",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonAccentText_gain: {
    color: "#d5fd86",
    shadowColor: "#6e8a38",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonWhiteText_gain: {
    color: "white",
    shadowColor: "#6e8a38",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonDarkText_gain: {
    color: "#455f13",
    shadowColor: "#c5da9d",
    shadowOffset: {x: 0, y: 0.5}
  },
  
  // Loss Ribbon [ORANGE]
  CardRibbonBG_loss: {
    backgroundColor: "#d05f2c",
    backgroundImage: path + "images/bg_card_market_loss.png",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonBottomBorder_loss: {
    backgroundColor: "#bd521e"
  },
  
  CardRibbonWhiteText_loss: {
    color: "white",
    shadowColor: "#9f4a25",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonAccentText_loss: {
    color: "#fecdac",
    shadowColor: "#9f4a25",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonDarkText_loss: {
    color: "#5f3713",
    shadowColor: "#eea98d",
    shadowOffset: {x: 0, y: 0.5}
  },
  
  // Loss Ribbon [PINK]
  CardRibbonBG_Performance_loss: {
    backgroundColor: "#c7365b",
    backgroundGradient: {
      type: "linear",
      colors: ["#e15579", "#c7365c"],
      startPoint:{x:0,y:2},
      backFillStart:true
    },
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonBottomBorder_Performance_loss: {
    backgroundColor: "#b32349"
  },
  
  CardRibbonWhiteText_Performance_loss: {
    color: "white",
    shadowColor: "#9a2e49",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonAccentText_Performance_loss: {
    color: "#ffbbcc",
    shadowColor: "#9a2e49",
    shadowOffset: {x: 0, y: 1}
  },
  
  CardRibbonDarkText_Performance_loss: {
    color: "#6c1229",
    shadowColor: "#ffbbcc",
    shadowOffset: {x: 0, y: 0.5}
  },
  
  // Yellow Gradient Window
  YellowGradientWindow: {
    backgroundColor: "#fbf4d9",
    backgroundGradient: {
      type:'radial',
  		colors:[{
  		  color:'#fbf4d9',
  		  position:0.25
  		},{
  		  color:'#eee3a7',
  		  position:1.0
  		}]
    }
  },
  
  TableView: {
    rowHeight: 62,
    minRowHeight: 62,
    maxRowHeight: 100,
    separatorColor: "transparent",
    backgroundColor: "transparent",
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
  },
  
  TableViewRow: {
    backgroundColor: "#ffffff",
    backgroundGradient: {
      type:'linear',
      colors:['#ece8e3','#d5d0c6'],
  		startPoint:{x:0,y:1},
      backFillStart:true
    },
    selectedBackgroundColor: "#d5d0c5"
  },
  
  FormView: {
    borderRadius: 10,
    borderColor: "#c0baae",
    backgroundColor: "white",
  },
  
  SearchBar: {
    width: platformWidth + 2,
    left: -1,
    barColor:'#d5d0c6',
    borderColor: "#ada799",
    height: 43
  },
  SearchResultsScrollView: {
    width: platformWidth,
    height: 290,
    top: 44,
    left: 0,
    anchor: {x:0,y:0},
    contentHeight: "auto",
    showVerticalScrollIndicator: true
  }
};

})();