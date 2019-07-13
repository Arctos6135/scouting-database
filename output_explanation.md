The output.json is hard to read. Here's what it means:

| output.json      | excel               | sql database       |
|------------------|---------------------|--------------------|
|  startlvl        | START               | start_level        |
|cargo/hatch1-4: 1 |R1 CARGO/HATCH (sand)|sand_r1_cargo/hatch |
|cargo/hatch1-4: 2 |R2 CARGO/HATCH(sand) |sand_r2_cargo/hatch |
|cargo/hatch1-4: 3 |R3 CARGO/HATCH (sand)|sand_r3_cargo/hatch |
|cargo/hatch1-4: 4 |CS CARGO/HATCH (sand)|sand_cs_cargo/hatch |
|rock1c/h          |R1 CARGO/HATCH (tele)|tele_r1_cargo/hatch |
|rock2c/h          |R2 CARGO/HATCH (tele)|tele_r2_cargo/hatch |
|rock3c/h          |R3 CARGO/HATCH (tele)|tele_r3_cargo/hatch |
|shipc/h           |CS CARGO/HATCH (tele)|tele_cs_cargo/hatch |
|assist            |ASSIST               |assist              |
|climblvlReached   |CLIMB                |climb               |
|broken            |BROKE                |broke               |
|tip               |TIPPED               |tipped              |
|depot             |N/A                  |N/A                 |
|floor             |FLOOR H              |floor_hatch         |
|opposide          |DEFENSE              |defense_time        |
|ppoints           |PENALTY *^1*         |penalties *^1*      |
|hdropped          |DROP H               |dropped_hatch       |
|matchNumber       |MATCH #              |N/A *^2*            |
|teamNumber        |TEAM                 |team_number         |

*Notes*  
When two things are slashed *(rock1c/h)*, it refers to two separated things, each with one of the items one the side of the slash.
*(rock1c/h means rock1c and rock1h)*. For the rest of the row, items on the left side of any slash pertain to the first option, and those on the right pertain to the second. *(R1 CARGO/HATCH (tele) after rock1c/h means rock1c -> R1 CARGO (tele) and rock1h -> R1 HATCH (tele))*    
*^1: In both the excel and sql databases, penalty is filled from a different source (the super scout system)*   
*^2: The sql database use the alliance_id in lieu of match number. They work similarly* 