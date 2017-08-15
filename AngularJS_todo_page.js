var AngularJS_todo_page = function() {
	this.toDoForm = element(by.model('newTodo'));	
	this.allCheckedButton = element(by.model('allChecked'));	
	this.completedButton  = element(by.linkText('Completed'));	
	this.clearCompletedButton  = element(by.id('clear-completed'));
	
};
module.exports = new AngularJS_todo_page();