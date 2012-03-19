(function() {
	
	HT.Model.install = function(){
		var db = Ti.Database.install(Ti.Filesystem.getResourcesDirectory() + '/hivetrader.sqlite', 'accounts');
		db.close();
	};
	
	HT.Model.getAccounts = function(){
		var results = [];
		
		var db = HT.Model.install();
		
		//get the accounts
		var rows = db.execute('SELECT DISTINCT name FROM accounts');
    
    	while (rows.isValidRow()){
    		results.push({name: '' + rows.fieldByName('name') + ''});
    		rows.next();
    	}
    	
    	db.close();
    	
    	return results;
	};
	
})();