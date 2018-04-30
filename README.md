
# remind(h)er
**[visit the app here](https://remindher.herokuapp.com)**

### Description:
An app empowering healthy women!

1. Learn about recommended reproductive health examinations and services, 
2. Find where the nearest OB/GYN is located, and
3. Record information about those services once scheduled or completed.

### Web Wire Frames
![screen shot 2018-04-30 at 11 32 36 am](https://user-images.githubusercontent.com/13025907/39443925-d028e68e-4c6a-11e8-913f-873472e21285.png)
![screen shot 2018-04-30 at 11 32 52 am](https://user-images.githubusercontent.com/13025907/39443926-d03cacfa-4c6a-11e8-9a42-11c3a3ded3d6.png)
![screencapture-localhost-3000-myservices-2018-04-30-11_43_34](https://user-images.githubusercontent.com/13025907/39444200-cbe42812-4c6b-11e8-9079-37b0e084ff7b.png)
![screen shot 2018-04-30 at 11 35 33 am](https://user-images.githubusercontent.com/13025907/39443930-d0848642-4c6a-11e8-96b9-fcdc29d45ed9.png)
![screen shot 2018-04-30 at 11 35 48 am](https://user-images.githubusercontent.com/13025907/39443931-d099956e-4c6a-11e8-9da4-63aa054fa770.png)
![screen shot 2018-04-30 at 11 36 21 am](https://user-images.githubusercontent.com/13025907/39443932-d0ad6576-4c6a-11e8-9f81-1c0fdc81cd92.png)

### Mobile Wire Frames
![img_1104](https://user-images.githubusercontent.com/13025907/39447592-26717b94-4c77-11e8-97b3-beea85c4f16e.PNG)![img_1105](https://user-images.githubusercontent.com/13025907/39447593-26957d64-4c77-11e8-9db0-cdf35cd27f65.PNG)
![img_1106](https://user-images.githubusercontent.com/13025907/39447594-26ae6acc-4c77-11e8-82bb-0371af917f88.PNG)![img_1107](https://user-images.githubusercontent.com/13025907/39447595-26c3228c-4c77-11e8-9a85-506a11209bb2.PNG)
![img_1108](https://user-images.githubusercontent.com/13025907/39447596-26db39da-4c77-11e8-92a8-a7b79f747e88.PNG)![img_1109](https://user-images.githubusercontent.com/13025907/39447597-26f1657a-4c77-11e8-84a3-b1f5a0199846.PNG)
![img_1110](https://user-images.githubusercontent.com/13025907/39447598-270a12f0-4c77-11e8-9188-55df01c116a1.PNG)![img_1111](https://user-images.githubusercontent.com/13025907/39447599-2722dba0-4c77-11e8-8d12-3dfad02837ec.PNG)


### User Stories
This app is designed as an informational resource/reminder checklist/medical history for women's reproductive health. The services listed range from annual exams to HPV vaccines, to mammograms, and is thus available to women of all ages.

### Technologies Used
- This is an express app built using Node and Mongoose.
- This app is deployed on Heroku and utilizes a Mongo database to store the data.
- Each web page was designed using EJS, CSS, JavaScript, JQuery, and bootstrap (it is also optimized for mobile).
- The database is structured with two models - one for the User, and another Service model embedded within the User.
- The full range of CRUD methods is used: Creating a user as well as service(s) for that user; delete a service off the user's records; and update the user's zipcode in the database.
- The app also includes two APIs (see below).

| Route        | Type           | Description  |
| ------------- |:-------------:| -----:|
| app.get('/') | GET | Renders landing page|
| router.get('/signup'   | GET      |   Renders sign up page |
| router.post('/signup'   | POST      |   Creates a new user |
| router.get('/login'   | GET      |   Renders log in page |
| router.post('/login'   | POST      |   Logs a user into their account |
| router.get('/myservices'   | GET      |   Renders Add Service page |
| router.post('/myservices'   | POST      |   Adds a service to the user's records |
| router.get('/find'   | GET      |   Renders Find Dr page |
| router.put('/find'   | PUT      |   Updates user's zip code |
| router.get('/records'   | GET      |   Renders My Records page |
| router.delete('/records'   | DELETE      |   Deletes a record from the user's account |
| router.get('/logout'   | GET      |   Logs a user out |


### APIs used + descriptions
There are two APIs being accessed within this app. The first is [ZipCodeAPI](https://www.zipcodeapi.com/), which takes the user's zipcode (provided at sign up), and access the corresponding Latitude and Longitude. The next is the [Google Place API Web Search](https://developers.google.com/places/web-service/search), which takes the Lat and Long and queries nearby gynecologists. These two APIs together create the results that you'll find at https://remindher.herokuapp.com/find.

### Modules used:

- bcrypt 
- body-parser
- connect-flash
- dotenv
- ejs
- express
- express-ejs-layouts
- express-session
- mongoose
- passport
- passport-local
- path
- request

### Code snippet
The following code finds doctors based on your zipcode provided at sign up:

``` router.get('/', isLoggedIn, function(req, res) {
    userLocation = req.user.location;

    var findLatLong =`https://www.zipcodeapi.com/rest/${SECRET_KEY_ZIP}/info.json/${userLocation}/degrees`;

    request(findLatLong, function (error, response, body) {
        let unstringifiedLat = JSON.parse(body).lat;
        let unstringifiedLng = JSON.parse(body).lng;

        var findDoctors = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${unstringifiedLat},${unstringifiedLng}&radius=40000&keyword=gynecologist&key=${SECRET_KEY_GOOGLE}`;

        request(findDoctors, function (error, response, results) {
            var doctors = JSON.parse(results);
            res.render("find", {doctors: doctors});
        });
    });
});
```


### Future fixes/features
- Birth year is a property requested from the user upon sign up, however it is not being used right now. Ideally, I would like the Add Services page to populate possible services based on the age (E.g. a 21 year old would not see the Mammogram option, etc.).
- On the Add Services page, I would like to make it so that the modal form closes once the `Save NameOfService Info` button is clicked.
- Because different exams/tests are required at different increments (E.g. annually vs. once every every 3-5 years), I would like the app to be able to send reminders (via email) once it knows that the person is overdue for a specific service based on their records of that service (or lack thereof).
- I would like to find and add another API that includes insurance coverage, so that the Find page not only lists the doctors, but also includes what insurance plans their services are covered by.
- I would like to add a map to the Find page so that the user can visibly see the locations of each doctor result.

### Credits + Sources
Sources for medical guidance for each service:
- https://www.womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests
- https://www.cdc.gov/hpv/parents/vaccine.html
- https://www.cdc.gov/std/prevention/screeningreccs.htm
- https://www.prevention.com/health/9-most-important-medical-tests-for-women/slide/3

Icons:
- Checklist by ProSymbols from the Noun Project
- Syringe by Gregor Cresnar from the Noun Project
- Vagina by Hea Poh Lin from the Noun Project
- Heart by Vicons Design from the Noun Project
- Pregnant by BomSymbols from the Noun Project
- Boobs by Gregor Cresnar from the Noun Project
- Doctor by dDara from the Noun Project

