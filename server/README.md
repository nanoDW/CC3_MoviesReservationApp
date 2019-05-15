This API was designed to work with web application which is a simulation of a cinema reservation site.

By default API uses localhost on port 3000. To start using this API you should clone it and use "npm install" in command line.
Next enter "node server" to launch API.

To get list of movies in database you use GET HTTP method at /api/movies

example of response:
```json
  {
    "_id": "5cd2f32458e6681ba0294bf0",
    "title": "Pet Sematary",
    "releaseDate": "2019-05-01T00:00:00.000Z",
    "genre": "Horror",
    "durationInMinutes": 101,
    "shortDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet, turpis.",
    "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum pharetra arcu vel tristique.",
    "imageLarge": "https://m.blog.hu/de/demeterdumal/image/petsemetary_teaserposter2.jpg"
  }
  ```
  You can request compact size of this json by using /api/movies/?size=compact
  Default number of returned items is 12. 
  For different number use 
  ```
  /api/movies/?limit=n  
  where n is number of items you want.
  ```
  
 Example of request:
 ```js
 localhost:3000/api/movies/?size=compact&limit=1
 ```
 You can also request movies by its genre or age group for which you use genre and age parameters. Example:
 ```js
 /api/movies/?genre=horror
 /api/movies/?age=mature
 ```
 advanced request:
 ```js
localhost:3000/api/movies/?limit=5&size=compact&genre=horror&age=mature
```
which will return compact information of 5 horror movies for mature audience.

To get movie by id you call /api/movies/id
ex: 
```js 
localhost:3000/api/movies/5cd2f32458e6681ba0294bf0 
```

In order to add screenings you need to add screeningRoom first. To add one send post to /api/screeningrooms
Example of request body:

```js
{
	"city": "Warsaw",
	"cinema": "Cinema East",
	"screeningRoom": "S02",
	"seats": {
		"A": ["1","2","3","4","5","6"],
		"B": ["1","2","3","4","5","6"],
		"C": ["1","2","3","4","5","6"],
		"D": ["1","2","3","4","5","6"],
		"E": ["1","2","3","4","5","6"],
		"F": ["1","2","3","4","5","6"],
	}
}
```
Array seats represents rows and seats in cinema and can be used to draw screening room of the cinema.