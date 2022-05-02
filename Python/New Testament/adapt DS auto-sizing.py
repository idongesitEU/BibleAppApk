#try auto sizing

from json import loads,dumps;

#adapt to droid script autosizing

from templib import createF,rf

from varn import *;

jbible=rf("/storage/emulated/0/Task/NEW/task3N.txt");#bible file

bible=loads(jbible)

def addLn(bib,bk,bible=bible):

	#bib=bible	#bk=current book

	#bible=global bible

	

	ln="\n"*10;

	#print(repr(ln))

	

	for chap in range(len(bib)):

		bib[chap]=bib[chap]+ln;

		

	bible[book]=bib;

	

	

	

for book in books:

	addLn(bible[book],book)

	

jsonbible=dumps(bible,indent=4);#dump bible to json

	

createF("/storage/emulated/0/Task/NEW/task4N.txt",jsonbible)

	
