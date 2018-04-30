# remind(h)er

### Description:
An app empowering healthy women!

1. Learn about recommended reproductive health examinations and services, 
2. Find where the nearest OB/GYN is located, and
3. Record information about those services once scheduled or completed.

### User Stories
This app is desined as an educational resource/reminder checklist/medical history for women's reproductive health. The services listed range from annual exams to HPV vaccines, to mammograms, and is thus available to women of all ages.

### Technologies Used + descriptions
- This is an express app built using Node and Mongoose.
- Each web page was designed using EJS, CSS, and JavaScript.
- The database is structured with two models - one embedded within the other.


### APIs used + descriptions
There are two APIs being accessed within this app. The first is [ZipCodeAPI](https://www.zipcodeapi.com/), which takes the user's zipcode (provided at sign up), and access the corresponding Latitude and Longitude. The next is the [Google Place API Web Search](https://developers.google.com/places/web-service/search), which takes the Lat and Long and queries nearby gynecologists. These two APIs together create the results that you'll find at https://remindher.herokuapp.com/find.

### Modules used + descriptions

### Rockstar code snippet

### Future fixes/features

### Instructions for downloading the code and running it on localhost

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
