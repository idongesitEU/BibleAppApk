#split to chapters

from json import dumps,loads

from templib import rf, createF,indexx;

from varn import *

jbible=rf("/storage/emulated/0/Task/NEW/task2.txt")

bible=loads(jbible)

b=bible[books[9]]

a=bible[books[17]]

fst=":1 "

af=":1 "

#print(a.count(af))

#print(b.count(fst))

#split to chapters

def split_chap(bib,bk,bdic=bdic,bible=bible):

	rar=[]#returnlist	n=bdic[bk]

	n=int(n)

	k=0;#catalyst

	

	for chap in range(n):

		c=chap+1;

		fs1=f"{c}:1"

		x=indexx(bib,fs1,k);

		k=x+1;

		c+=1;

		fs2=f"{c}:1"

		y=indexx(bib,fs2,k);

		if y==-1:

			rar.append(bib[x:])

		else:

			rar.append(bib[x:y])

	bible[bk]=rar;

												

for book in books:

	split_chap(bible[book],book);

	

#nst=bible[books[9]]

#m=nst.index("24:1")

#print(nst[m:])

#print(len(bible[books[2]]))

jsonbible=dumps(bible);

createF("/storage/emulated/0/Task/NEW/task3N.txt", jsonbible)
