(function() {
	
	HT.Model._dbname = 'ht_db';
	
	HT.Model.getAccounts = function() {
	  var results = [];
		var db = Titanium.Database.install(Titanium.Filesystem.getResourcesDirectory() + '/hivetrader.sqlite','accounts');
		Ti.API.info("the database is installed.");
		var rows = db.execute('SELECT DISTINCT name FROM accounts');
    
    while (rows.isValidRow()) {
      results.push({name: '' + rows.fieldByName('name') + ''});
      rows.next();
    }
    db.close();
    return results;
	};
	
})();