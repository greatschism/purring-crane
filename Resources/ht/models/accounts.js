(function() {

	var joli = require('ht/models/joli').connect('hiveTrader');

	HT.Model.install = function() {
		var db = Ti.Database.install(Ti.Filesystem.getResourcesDirectory() + '/hivetrader.sqlite', 'accounts');
		db.close();
	};

	HT.Model.addAccount = function(a) {
		var now = new Date().getTime();
		var full = Ti.App.Properties.getString('newPosANick');
		var full = Ti.App.Properties.getString('newPosANick');
		var full = Ti.App.Properties.getString('newPosANick');
		var full = Ti.App.Properties.getString('newPosANick');

		var db = Ti.Database.install(Ti.Filesystem.getResourcesDirectory() + '/hivetrader.sqlite', 'accounts');

		//add the account
		db.execute("INSERT INTO accounts VALUES(NULL,'" + a.xid + "','" + a.full + "','" + a.nick + "', NULL, NULL, NULL, '" + now + "','" + now + "', NULL, '" + 1 + "', NULL)");

		db.close();
		return true;
	};

	HT.Model.getAccounts = function() {
		var results = [];

		var db = Ti.Database.install(Ti.Filesystem.getResourcesDirectory() + '/hivetrader.sqlite', 'accounts');

		//get the accounts
		var rows = db.execute('SELECT DISTINCT nick FROM accounts WHERE active = 1');

		while(rows.isValidRow()) {
			results.push({
				id : '' + rows.fieldByName('id') + '',
				full : '' + rows.fieldByName('full') + '',
				nick : '' + rows.fieldByName('nick') + '',
				posCount : '' + rows.fieldByName('positions') + ''
			});
			rows.next();
		}

		db.close();

		return results;
	};

	HT.Model.getAccountsInActive = function() {
		var results = [];

		var db = HT.Model.install();

		//get the accounts
		var rows = db.execute('SELECT DISTINCT nick FROM accounts WHERE active = 2');

		while(rows.isValidRow()) {
			results.push({
				id : '' + rows.fieldByName('id') + '',
				full : '' + rows.fieldByName('full') + '',
				nick : '' + rows.fieldByName('nick') + '',
				posCount : '' + rows.fieldByName('positions') + ''
			});
			rows.next();
		}

		db.close();

		return results;
	};
})();
