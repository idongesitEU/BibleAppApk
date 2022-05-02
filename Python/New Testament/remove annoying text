#remve annoying text

from json import dumps,loads;

from templib import createF,rf,indexx;

from varn import *;

jbible=rf("/storage/emulated/0/Task/NEW/task1N.txt");

bible=loads(jbible);

ln="\n"*5;

for book in books:

	ind=bible[book].index(ln)	outcast=bible[book][ind:];

	#print(outcast)

	bible[book]=bible[book].replace(outcast,"");

	

jsonbible=dumps(bible,indent=5);

createF("/storage/emulated/0/Task/NEW/task2.txt", jsonbible)
