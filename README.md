# Demo

The demo is available [here](https://carduelis.github.io/miro-test/dist/)

[![Demo gif](https://carduelis.github.io/miro-test/dist/assets/miro-demo.gif)](https://carduelis.github.io/miro-test/dist/)

# Usage

Basic usage:

```html
<body>
	<div id="myContainer"></div>
	<script src="faker.js" type="text/javascript"></script>
	<script>
		var container = document.getElementById('myContainer');
		var emailInstance = new EmailEditor(container);
	</script>
</body>
```

With options

```html
<body>
	<div id="myContainer"></div>
	<script src="faker.js" type="text/javascript"></script>
	<script>
		var container = document.getElementById('myContainer');
		var myOptions = {
			// default fontSize: '14px'
			fontSize: '1rem', // inherit, 14px, any valid css value for font-size
			// default emailsList: []
			emailsList: ['my@domain.name'], // prefills emailEditor with entries
			// default placeholder: 'add more people...'
			placeholder: 'type in an email', // placeholder of the input
		};
		var emailInstance = new EmailEditor(container, myOptions);
	</script>
</body>
```

# API

## EmailEditor

```javascript
new EmailEditor(element: HTMLElement, options?: object)
```

## options

You may pass some options during initialization. Example:

```javascript
new EmailEditor(myDiv, {
	fontSize: '14px', // font-size of the wrapper tag
	placeholder: 'add more people...', // input placeholder
	emailsList: ['email@domain.name', 'just-a-string'], // default list of emails
});
```

## Events

You may listen to events and trigger something in your code

Available events are: `['add', 'remove']`

```javascript
const emailEditorInstance = new EmailEditor(myDiv);
emailEditorInstance.on('add', function(array: Array<string>) {});
emailEditorInstance.on('remove', function(array: Array<string>) {});
```

_Note:_ callback function of `add` and `remove` events is always take an array of strings even if it's the only string.

## Methods

### setEmails(payload)

This method replaces all existed emails and adds new ones.
Returns the count of added entries.

_Note:_ First it triggers `remove` event, then `add` one

```javascript
const emails = [
	'Lowell41@gmails.com',
	'Billie74@yahoo.com',
	'Mckenna_Morar@gmail.com',
	'Eloise.Weber7@gmail.com',
];
const addedEntriesCount = emailEditorInstance.setEmails(emails);
console.log(addedEntriesCount); // 4
```

### addEmails(payload)

This method adds new emails.
Returns the count of added entries.

```javascript
const emailsList = [
	'Lowell41@gmails.com',
	'Billie74@yahoo.com',
	'Mckenna_Morar@gmail.com',
	'Eloise.Weber7@gmail.com',
];
const emailEditorInstance = new EmailEditor(myDiv, { emailsList });

const emailsToAdd = ['Billie74@yahoo.com', 'Beulah17@gmail.com'];
const addedEntriesCount = EditorInstance.add(emailsToAdd);
console.log(addedEntriesCount); // 1, because "Beulah17@gmail.com" is already there
```

### getEmails()

This method returns existed **valid** emails.

```javascript
const emailsList = [
	'Lowell41@gmails.com',
	'not-email',
	'not-email2',
	'Eloise.Weber7@gmail.com',
];
const emailEditorInstance = new EmailEditor(myDiv, { emailsList });
const emails = emailEditorInstance.getEmails();
console.log(emails); // 1, ['Lowell41@gmails.com', 'Eloise.Weber7@gmail.com']
```

### clearEmails()

Clears the form. Returns `undefined`

```javascript
const emailEditorInstance = new EmailEditor(myDiv, { emailsList });
emailEditorInstance.clearEmails();
console.log(emailEditorInstance.getEmails()); // []
```

# Basic Features

-   [x] Multiple instances per page
-   [x] Pure javascript, no library dependencies
-   [x] IE11 support
-   [x] Minified bundle
-   [x] 17.6Kb gzip
-   [ ] ~~Possibility to use as npm package~~
-   [ ] ~~Cover by unit-tests~~

# Road map and Features

-   [x] Commit an entry to block by: loosing focus, pressing enter or entering a comma
-   [x] Bulk insert via pasting (comma separated)
-   [x] Auto space trimming
-   [x] Invalid email highlight
-   [x] Smooth auto scrolling to the bottom of container
-   [x] Put titles attributes on buttons and invalid emails
-   [x] Add appear animation for valid emails
-   [ ] Enable `destroy()` method to remove all native listenters and clean up
-   [ ] Hide private methods via `Symbol`
-   [ ] Enhance with extra events (`"clean"`, `"animationStart"`, `"animationEnd"`)
-   [ ] Add some cool animations (when an item dissapears)
-   [ ] Make it `FormData` compatible (`"submit"` event)
-   [ ] Enable input auto-width

# Building and running on localhost

First install dependencies:

```sh
npm install
```

Run production build:

```sh
npm run build-prod
serve dist
```

Run dev-server

```sh
npm run start:dev
```

# Credits

The project is a test exercise and not meant to be a production-ready tool

Webpack boilerlate was started using [createapp.dev](https://createapp.dev/) tool.

Copyright (c) 2019 Pavel Shchegolev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
