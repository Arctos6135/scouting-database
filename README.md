This is the prototype strategy database, using MySQL database and nodejs with the Blue Alliance API for getting teams.

Currently, it only can initialize the team database and load in events.

Installation
install node
Install mysql

In MySql workbench, run schema.sql (to create db and tables)

```npm install mysql``` 
```npm install async``` 

You need a The Blue Alliance API Key

node load_teams.js
node load_events.js
node load_matches.js EVENT (e.g. 2019ononosh)
