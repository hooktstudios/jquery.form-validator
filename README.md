## Basic usage

Add a `to-validate` class to all inputs you wish to validate,
a `required` class if an empty input is not valid,
a `data-validation-type` attribute specifying which validation rule to use (optionnal if
the field is also required, more on rules later),
and a `data-validation-condition` specifying a handler that specifies if the rule should run or not.

You can also specify which label to use in the error summary with the `data-label`.
Unless specified, the validation class will try to find the label and use it's text.

## Contributing to code

### Whitespaces and empty lines

Unless you want whitespaces climbin' in your repos, snatchin' yo commits up, please use a text editor that removes trailing whitespaces and clears empty lines on file save. Or, at least, use one that shows them so you can remove them by hand. You decide.

### Semicolons

Always use semicolons. In certain cases, relying on implicit insertion can cause problems that will be quite hard to debug. Do yourself a favor, don't do it.

### Naming convention

EvenIfCamelCaseIsHardToReadAndThatWeHateItMostOfTheTime, JavaScript being what it is, we'll be using CamelCase and mixedCase notations. The goal here is to follow what's now globally accepted as the de facto standard. Here are some examples, take notes:

### Block declaration

Always put a block's opening bracket on the same line as the statement.

### Special notes about functions

* There should be **no space** between the **name** of a function and the **opening parenthesis** of its parameter list.
* There should be **a space** between the **closing parenthesis** of its parameter list and the **opening bracket**.

### Anything else?

You can always refer to http://jslint.com/ for other questions.