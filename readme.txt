URL - Shortener
design a url shortener service , takes a valid URL and returns a shortened URL
redirecting the user to the previously provided URL

Keep track of total visits/clicks on URL

Routes:

POST /URL - generates a new short URL and returns the shortened URL 
format: example.com/random-id

GET /:id - Redirects user to original URL

GET /URL/analytics/:id - Returns clicks for provided short id

