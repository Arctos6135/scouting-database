csv = open('output.csv', 'r')
sql = open('table.sql', 'w+')
import pdb

output = ""

output = """ CREATE TABLE IF NOT EXISTS raw_data (
	team_number	INT NOT NULL,
	match_number	INT NOT NULL,
	start		INT NOT NULL,
	ss_cs_hatch	INT NOT NULL,
	ss_r1_hatch	INT NOT NULL,
	ss_r2_hatch	INT NOT NULL,
	ss_r3_hatch	INT NOT NULL,
	ss_cs_cargo     INT NOT NULL,
        ss_r1_cargo     INT NOT NULL,
        ss_r2_cargo     INT NOT NULL,
        ss_r3_cargo     INT NOT NULL,

	tele_cs_hatch	INT NOT NULL,
        tele_r1_hatch	INT NOT NULL,
        tele_r2_hatch	INT NOT NULL,
        tele_r3_hatch	INT NOT NULL,
        tele_cs_cargo	INT NOT NULL,
        tele_r1_cargo	INT NOT NULL,
        tele_r2_cargo	INT NOT NULL,
        tele_r3_cargo	INT NOT NULL,

	defense		INT NOT NULL,
	assist		INT NOT NULL,
	climb		INT NOT NULL,
	tipped		INT NOT NULL,
	broke		INT NOT NULL,
	floor_h		INT NOT NULL,
	dropped_h	INT NOT NULL
);

INSERT INTO raw_data VALUES
"""

rl = csv.readlines()
n = 0
length = len(rl)

for line in rl:
	print(n)
	output += "({0})".format(line.strip())
	if n != length - 1:
		output += ",\n"
	else: output += ";"
	n+= 1

sql.write(output)
print(output)

pdb.set_trace()

csv.close()
sql.close()
