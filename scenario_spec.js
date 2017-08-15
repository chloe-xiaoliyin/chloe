describe('test todomvc landing website - ', function() {
    //Import the page objects    	
	var AngularJS_todo_page = require('./AngularJS_todo_page');

    it('Jump from First landing page to AngularJS todos page', function() {
        browser.driver.get('http://todomvc.com');
        browser.driver.findElement(by.linkText('AngularJS')).click();
		
		//Check next page displayed
		expect(AngularJS_todo_page.toDoForm.isPresent()).toBeTruthy();
		
    });
    it ("Testcase 001 - Add the new todo item", function() {
		//Type todo name in the newToDO box
        //element(by.model('newTodo')).sendKeys('First todo');
		AngularJS_todo_page.toDoForm.sendKeys('First todo');
		//Press Enter to add
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
		//Verify new toDo added
		expect(element(by.cssContainingText('.ng-binding','First todo')).isPresent()).toBeTruthy();
	});
	it ("Testcase 002 - Edit the todo item", function() {
		//Select the New added todo
        browser.actions().doubleClick(element(by.cssContainingText('.ng-binding','First todo'))).perform();
        browser.waitForAngular()
		//Update the todo
        browser.actions().sendKeys(' update').perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
		//Verify new toDo updated
		expect(element(by.cssContainingText('.ng-binding','First todo update')).isPresent()).toBeTruthy();
	});
	it ("Testcase 003 - Complete a todo item", function() {
        element(by.xpath('//label[@class=\'ng-binding\' and contains(text(), \'First todo\')]//preceding::input[@type=\'checkbox\' and @ng-model=\'todo.completed\']')).click();
        browser.waitForAngular();
		//Verify the status changed to completed
		//Add code here
	});
	it ("Testcase 004 - Re-activate a completed To-do item", function() {
        element(by.xpath('//label[@class=\'ng-binding\' and contains(text(), \'First todo\')]//preceding::input[@type=\'checkbox\' and @ng-model=\'todo.completed\']')).click();
        browser.waitForAngular();
		//Verify the status changed to re-activated
		//Add code here
	});
	it ("Testcase 005 - Add sedond To-do item", function() {
		//Add the second todo
		AngularJS_todo_page.toDoForm.sendKeys('Second Todo');
        //element(by.model('newTodo')).sendKeys('Second Todo');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
		//Verify the senond todo added
		expect(element(by.cssContainingText('.ng-binding','Second Todo')).isPresent()).toBeTruthy();
	});
	it ("Testcase 006 - Complete all active To-do item", function() {
        //element(by.model('allChecked')).click();
		AngularJS_todo_page.allCheckedButton.click();
        browser.waitForAngular();
		
        //Verify all the status changed to Completed
        element.all(by.repeater('todo in todos | filter:statusFilter track by $index')).each(function (item){
            expect(item.getAttribute('class')).toEqual('ng-scope completed');
        });
	});
	it ("Testcase 007 - Filter the visible To-dos by Completed state", function() {
        //element(by.linkText('Completed')).click();		
		AngularJS_todo_page.completedButton.click();
        browser.waitForAngular();
		//Verify all the status changed to Completed
        element.all(by.repeater('todo in todos | filter:statusFilter track by $index')).each(function (item){
            expect(item.getAttribute('class')).toEqual('ng-scope completed');
        });
	});
	it ("Testcase 008 - Clear a single completed To-do item from the list", function() {
        element(by.cssContainingText('.ng-binding','Second Todo')).click();
        browser.waitForAngular();
        element(by.xpath('//label[@class=\'ng-binding\' and contains(text(), \'Second Todo\')]//following-sibling::button[@class=\'destroy\' and @ng-click=\'removeTodo(todo)\']')).click();
        browser.waitForAngular();
		//Verify the single todo removed
		expect(element(by.xpath('//label[@class=\'ng-binding\' and contains(text(), \'Second Todo\')]//following-sibling::button[@class=\'destroy\' and @ng-click=\'removeTodo(todo)\']')).isPresent()).toBe(false);
	});
		
	it ("Testcase 009 - Clear all completed To-do items", function() {
        //element(by.id('clear-completed')).click();		
		AngularJS_todo_page.clearCompletedButton.click();
        browser.waitForAngular();
        //Verify all completed to do are removed
        //Verify to do list size is 0
        expect(element.all(by.repeater('todo in todos | filter:statusFilter track by $index')).count()).toEqual(0)

    });

});
