This is the prototype strategy & scouting database of FRC team Arctos 6135, using MySQL database and nodejs with the Blue Alliance API for getting teams.



**Installation**
install node
Install mysql

In MySql workbench, run schema.sql (to create db and tables)

```npm install mysql``` 
```npm install async``` 

You need a The Blue Alliance API Key. If you want to use your own, edit that line in `tba.js`

To prepare the database, run these from the command line
`node load_teams.js`
`node load_events.js`
`node load_matches.js EVENT` (e.g. 2019ononosh)
