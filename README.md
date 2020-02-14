This is the prototype strategy & scouting database of FRC team Arctos 6135, using a MySQL database and nodejs with the Blue Alliance API for getting teams. It is still in development, but is has most of the key features of the old Arctos excel db.

**Installation**  

Install node<br>
Install mysql

In MySql workbench, run schema.sql (to create db and tables)

```npm install``` 
Then, in the client folder do another ```npm install``` 


You need a The Blue Alliance API Key. If you want to use your own, edit that line in `tba.js`

To prepare the database, run these from the command line. They are configured for the Ontario District, you will have to make some changes to use them elsewhere. 
`node load_teams.js`
`node load_events.js`
`node load_matches.js EVENT` (e.g. 2019oncmp1)
`node parse_output.js`
`node load_alliance_outcomes.js EVENT` (e.g. 2019oncmp1)

To run the webapp, run `npm start`. It will open in your default browser at ports 3000(client) and 3001(server).

## Thank you to our generous sponsors:
### Platinum
<img alt="TDSB" src="https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Toronto_District_School_Board_Logo.svg/1200px-Toronto_District_School_Board_Logo.svg.png" height="400"/>

### Gold
<img alt="Honda Canada Foundation" src="https://www.honda.ca/Content/hondanews.ca/2ea2dd1f-fec4-436e-91d5-c0831aa2af21/PressRelease/HCF_Logo_EN_CMYK.jpg" width="400">
<img alt="The Intuitive Foundation" src="https://images.squarespace-cdn.com/content/v1/575036b345bf2183563cd328/1564584203054-4XAQJMKZAM1FZKPP71ST/ke17ZwdGBToddI8pDm48kElPbZlriv4ByvPLLYTs3rRZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7XxG-9FZQiNMT_ZdcQnlMXbFYWqAe63cqij5R0iA9W7XX4KjGb09mhyQhiOJiRgdGQ/Intuitive+Foundation+Logo.png"/>
<br/>
<img alt="SNC-Lavalin" src="https://upload.wikimedia.org/wikipedia/en/thumb/5/50/SNC-Lavalin_logo.svg/470px-SNC-Lavalin_logo.svg.png"/>
<br/>
<img alt="Ryver" src="https://ryver.com/wp-content/themes/bridge-child/images/logo-dark-2017.svg" width="500"/>

### Silver
<img alt="The Maker Bean Cafe" src="https://user-images.githubusercontent.com/32781310/52224389-eaf94480-2875-11e9-82ba-78ec58cd20cd.png" width="300">

### Bronze
<img alt="Arbor Memorial" src="https://www.cbc.ca/marketplace/content/images/Arbor_Logo.jpg" height="100"/>
