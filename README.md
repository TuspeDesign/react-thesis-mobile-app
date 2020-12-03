# Dataline Sport - Hybrid Mobile App

The app is designed to provide an easier way to follow latest news and videos from certain sport clubs. From fans to fans. The application is a simplified version of the clubs' own websites developed by Dataline Group Oy and it is not part of any commercial deals. However, all the sport clubs which use Dataline's sport platform and want participants will be added to the feed.

The application was created by [Tero Kerkkänen](https://github.com/TeroKerkkanen), [Karelia](https://www.karelia.fi/en/), as a thesis in 2020. The result of the work is open source and can be used for studying and teaching. The code must not be made a closed version. Everyone can participate in the development in the future. Please, read the [license](https://github.com/TuspeDesign/Sport-Hybrid/blob/master/LICENSE).

The visitor selects the desired sport club, after which the club id number is included in each search. Other searches cannot be made without the club number. The app stores that number in the phone's memory so that visitors do not have to select a sport club each time they use the app.

## How the feed works

The feed is maintained by [Timo Anttila](https://github.com/timoanttila) and is protected by [Cloudflare](https://www.cloudflare.com/), which uses a security cookie for each query. Check out the [Cloudflare Cookie Policy](https://www.cloudflare.com/cookie-policy/) before using the feed. All requests are sent in POST format and the query must include an Auth code in the header.

### Base url
api.sportti.org/sites (https only)

Official sport team ID and search query are required values if not fetching all the teams (only /sites).

### How to use API
api.sportti.org/sites/[teamId]/[query]  

#### All the players
api.sportti.org/sites/928640177/players

#### Fetch one page from the website
api.sportti.org/sites/928640177/8664

### type
The type tells the feed what kind of content is needed.

| query | info |
| :--- | :---|
| none | List of all available sports clubs with their logos. |
| menu | Navigation of a specific sports club. |
| home | Elements needed for the front page. |
| games | All the upcoming games and the next local game. |
| players | All the players and their helpers. |
| partners | Partners with logos and links. |
| number | All the content of the certain page or player. |
