# A Avenue Code Challenge - Host Locate

```
**Important**

* "This API endpoint is deprecated and will stop working
  please visit: https://github.com/apilayer/freegeoip#readme"

* "The freegeoip API was move to https://ipstack.com/ and used on this project"
```

---

### How to Install

* `git clone https://github.com/lipeprado/ac-challenge.git`
* `npm install`
* `npm run start`
* `if need change somenthing just Open file inside app.js ./src/components`

### Features

* React
* Sass || Scss || Css
* Axios ( for HTTP Requests )
* Webpack
* Eslint ( Airbnb )
* Toastr.js ( better notifications )
* Modular styles
* React FontAwesome
* Emojis

### Acceptance Criteria

* `DONE` The new form input field should only accept website domains starting with "www." or with the host name, e.g., "www.nytimes.com", "nytimes.com" or "g1.com.br" or "www.g1.com.br".

* `DONE` When the user hits the Locate button, an asynchronous call should be made to http://freegeoip.net/json/:host, where :host corresponds to the user input.

* `NOT YET` When the user hits the existing My location button, their current position must also be displayed, alone or besides a website location if the user used that feature before.

* `NOT YET` When the user hits the Reset location button, the user location must be cleared off from the table (but the website's location should still be displayed, if any).

* `DONE` You should handle user input (validate host) and server response validations.``

* `NOT YET` You should create 2 tables, my location search and host search, to present the result of the user search ( IP, HostName, City, Country, Long, Lat )
