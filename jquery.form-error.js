function FormError(options){
	// Default options
	// Could be overwritten with object options
	this.defaults = {};

	$.extend(this, this.defaults, (options) ? options : {});

	this.init();
};

FormError.prototype = {
	init: function(){

	},

	setMessage: function(msg){
		this.msg = msg;
	},

	getMessage: function(){
		return this.msg;
	},

	setLabel: function(label){
		this.label = label;
	},

	getLabel: function(){
		return this.label;
	},

	setFocusTarget: function(target){
		this.focus_target = target;
	},

	getFocusTarget: function(){
		return this.focus_target;
	}
}