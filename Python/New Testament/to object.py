#split bible to json object.

import json;

from templib import rf, createF,indexx;

from varn import *;

bible=rf("/storage/emulated/0/Task/bible.txt");

start="\n1:1 "

ind=bible.index(start)

k=0;#catalyst

for i in range(40):

	ind=bible.index(start,k)	k=ind+1;

#print(bible[ind:])

l=bible.index("\n\n\n\nEnd of the Project Gute")

	

bible=bible[ind:l]#new bible

jsonbible={};

n=0;#catalyst

#print(bible.count(start))

for num in range (len(books)):

	x=bible.index(start,n)

	if num==len(books)-1:

		jsonbible[books[num]]=bible[x:];

	else:

		n=x+1;

		y=bible.index(start,n);

		jsonbible[books[num]]=bible[x:y];

jbible=json.dumps(jsonbible)

#createF("/storage/emulated/0/Task/NEW/task1N.txt",jbible)

	
