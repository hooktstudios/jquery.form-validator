function FormValidator($form, options){
	this._$form = $form;
	// Default options
	// Could be overwritten with object options
	this.defaults = {
		to_validate_class: 'to-validate',
		required_class: 'required',
		_app: {
			_: function(e){
				// localization fn to be overwritten
				return e;
			},
			showErrorsSummary: function(e){
				// showErrorSummary: to be implemented
			},
			gotoError: function(e){
				// gotoError: to be implemented
			},
			validation_rules: {
				// custom validation rules
			},
			validation_conds: {
				// custom validation conds (possibility to skip validations)
			}
		}
	};

	$.extend(this, this.defaults, (options) ? options : {});

	this.init();
};

FormValidator.prototype = {
	init: function(){
		this.errors = new Array();
	},

	getDataToValidate: function(to_validate_class){
		return this._$form.find('.' + to_validate_class);
	},

	validate: function(){
		var $fields = this.getDataToValidate(this.to_validate_class);
		var self = this;

		$fields.each(function(i, e){
			self._validateSingle($(e));
		});

		return this.errors;
	},

	_validateSingle: function($this){
		var to_validate = new ToValidate({$dom: $this});
		var is_required = to_validate.isRequired();
		var input_value = to_validate.val();
		var is_empty = to_validate.isEmpty();
		var rule_name, error, error_label, error_target;

		if(!is_required && is_empty) return;
		if(!this.shouldValidate(to_validate)) return;

		error_label = to_validate.findLabel();
		error_target = to_validate.findFocusTarget();

		if(is_empty){
			// error: required field is empty
			error = new FormError({
				msg: this._app._('FIELD_REQUIRED')
			});
		}
		else if(to_validate.hasValidationRuleName()){
			// error: must be validated with a custom rule
			// an error is being throwed if the custom validation rule name can't be found
			rule_name = to_validate.getValidationRuleName();
			error = this.execValidationFunction(rule_name, input_value);
		}

		if(error){
			// set error
			error.setLabel(error_label);
			error.setFocusTarget(error_target);

			// add error to errors stack
			this.addError(error);
		}
	},

	shouldValidate: function(to_validate){
		var cond_name = to_validate.getValidationCondName();
		// No condition => no skipping
		if(!cond_name) return true;

		// if the conditional rule returns false if we have to skip
 		return this.findValidation('condition', cond_name)
			.call(this.view, to_validate.$dom);
	},

	execValidationFunction: function(rule_name, input_value){
		var validationFn = this.findValidation('rule', rule_name);
		var validation_result = validationFn(input_value);

		// Rules return true when valid, error message otherwise
		if(validation_result === true){
			return false;
		}

		return validation_result;
	},

	findValidation: function(type, name){
		if(!name) throw 'No validation passed name';

		var app_validation = this._app['validation_' + type + 's'][name];
		if(app_validation) return app_validation;

		// Rule not found : thats an error
		throw 'No validation ' + type + ' found for ' + type + '_name: ' + name;
	},

	addError: function(error){
		this.errors.push(error);
	},

	setErrors: function(errors){
		this.errors = errors;
	},

	showErrors: function(){
		if(this.errors.length == 0) return;
		this.showHintErrors();
		this._app.showErrorsSummary(this.errors);
		this.gotoError();
	},

	gotoError: function(){
		this._app.gotoError(this._$form.find('.save_warning:first'));
	},

	showHintErrors: function(){
		var self = this;
		// hint error
		$.each(this.errors, function(i, error){
			error.getFocusTarget().hintError(error.getMessage(), 200, self.errors.length > 0);
		});
	}
}
