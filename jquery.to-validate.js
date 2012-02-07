function ToValidate(options) {
	// Default options
	// Could be overwritten with object options
	this.defaults = {};

	$.extend(this, this.defaults, (options) ? options : {});

	this.init();
};

ToValidate.prototype = {
	init: function () {
		this._rule_name = null;
	},

	val: function () {
		return this.$dom.val();
	},

	hasValidationRuleName: function () {
		return !!this.getValidationRuleName();
	},

	getValidationRuleName: function () {
		if (!this._rule_name) {
			this._rule_name = this.$dom.data('validation-type');
		}
		return this._rule_name;
	},

	getValidationCondName: function () {
		return this.$dom.data('validation-condition');
	},

	isRequired: function () {
		return this.$dom.hasClass('required');
	},

	isEmpty: function () {
		return ($.trim(this.val()) == '');
	},

	findLabel: function () {
		var label;
		var dom_label_data = this.$dom.data('label');

		if (!dom_label_data) {
			var $label_in_input_wrapper = this.$dom.parents('.input').find('label');
			var $label_in_item_wrapper = this.$dom.parents('.item').find('label');
			var $label_in_placeholder = this.$dom.attr('placeholder');

			if ($label_in_input_wrapper.length > 0) {
				label = $label_in_input_wrapper.text();
			}
			else if ($label_in_item_wrapper.length > 0) {
				label = $label_in_item_wrapper.text();
			}
			else if ($label_in_placeholder) {
				label = $label_in_placeholder;
			}
			else {
				throw 'Can\'t find label for ToValidate';
			}
		}
		else {
			label = dom_label_data;
		}

		return label;
	},

	findFocusTarget: function () {
		// @TODO: Short-circuit logic
			// 1 find target with specific class (i.e. .focus-target (TBD))
			// 2 first input
		// maybe we should think about initializing the focus target only once ( on init )
		var $focus_target;
		if (this.$dom.is(':input')) {
			$focus_target = this.$dom.first();
		}
		else {
			$focus_target = this.$dom.find(':input:first');
		}

		return $focus_target;
	}
};


