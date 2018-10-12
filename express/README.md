# Writing your own Web App

## Express.js

express ([https://expressjs.com](https://expressjs.com/)) is one of the oldest and most mature web frameworks in node.js. For this tutorial, we will be using express to create a quick and dirty API server. To install:

- Initialize your project:

  ```bash
  npm init
  ```

- Install express4

  ```bash
  npm install --save express
  ```

## Creating a Quick Website

### Hello, world

Create a new file called **hello.js** with this following contents:

```javascript
let express = require('express')
let app = express()

app.get('/', function (req, res) {
    res.send("<html><head></head><body>Hello, world!</body></html>")
});

app.listen(3000, function () { console.log("Web App listening on port 3000") });
```

Save then run: 

```bash
node hello.js
```

Your server should be accessible from http://localhost:3000/

### Rendering HTML

The previous code snippet