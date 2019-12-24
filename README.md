This is the prototype strategy & scouting database of FRC team Arctos 6135, using a MySQL database and nodejs with the Blue Alliance API for getting teams. It is still in development, but is has most of the key features of the old Arctos excel db.

**Installation**  

Install node
Install mysql

In MySql workbench, run schema.sql (to create db and tables)

```npm install``` 
Then, in the client folder do another ```npm install``` 


You need a The Blue Alliance API Key. If you want to use your own, edit that line in `tba.js`

To prepare the database, run these from the command line. They are configured for the Ontario District, you will have to make some changes to use them elsewhere. 
`node load_teams.js`
`node load_events.js`
`node load_matches.js EVENT` (e.g. 2019onosh)
`node parse_output.js`

To run the webapp, run `npm start`. It will open in your default browser at ports 3000(client) and 3001(server).