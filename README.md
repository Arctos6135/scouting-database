This is the prototype strategy & scouting database of FRC team Arctos 6135, using a MySQL database and nodejs with the Blue Alliance API for getting teams. It is still in development, so it doesn't have many features yet.

**Installation**  

Install node
Install mysql

In MySql workbench, run schema.sql (to create db and tables)

```npm install``` 

You need a The Blue Alliance API Key. If you want to use your own, edit that line in `tba.js`

To prepare the database, run these from the command line. They are configured for the Ontario District, you will have to make some changes to use them elsewhere. 
`node load_teams.js`
`node load_events.js`
`node load_matches.js EVENT` (e.g. 2019onosh)
