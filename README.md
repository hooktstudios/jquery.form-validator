**Basic usage**

Add a `to-validate` class to all inputs you wish to validate,
a `required` class if an empty input is not valid,
a `data-validation-type` attribute specifying which validation rule to use (optionnal if
the field is also required, more on rules later),
and a `data-validation-condition` specifying a handler that specifies if the rule should run or not.

You can also specify which label to use in the error summary with the `data-label`.
Unless specified, the validation class will try to find the label and use it's text.