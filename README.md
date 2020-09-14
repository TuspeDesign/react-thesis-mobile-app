# Dataline Sport - Hybrid Mobile App

The app is designed to provide an easier way to follow latest news and videos from certain sport clubs. From fans to fans. The application is a simplified version of the clubs' own websites developed by Dataline Group Oy and it is not part of any commercial deals. However, all the sport clubs which use Dataline's sport platform and want participants will be added to the feed.

The application was created by [Tero Kerkkänen](https://github.com/TeroKerkkanen), [Karelia](https://www.karelia.fi/en/), as a thesis in 2020. The result of the work is open source and can be used for studying and teaching. The code must not be made a closed version. Everyone can participate in the development in the future.

## How the feed works

The feed is protected by [Cloudflare](https://www.cloudflare.com/) and uses a security cookie for all the requests.  
Check out the [Cloudflare Cookie Policy](https://www.cloudflare.com/cookie-policy/) before using the feed.

**Base url**  
api.timoanttila.com/sport/ (https only)

**?type=sites**  
Returns all the sport sites developed and maintained by Dataline Group Oy. The visitor selects the desired sport club, after which the club id number is included in each search. Other searches cannot be made without the club number.

**?team=number&type=home**  
Returns all available home page elements.
