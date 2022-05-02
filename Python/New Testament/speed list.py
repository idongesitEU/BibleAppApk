#predefined array for list view
from json import dumps;
from templib import createF,rf;

chapMap = {
	'MATTHEW': ' 28',
	'MARK': ' 16',
	'LUKE': ' 24',
	'JOHN': ' 21',
	'ACTS': ' 28',
	'ROMANS': ' 16',
	'I CORINTHIANS': ' 16',
	'II CORINTHIANS': ' 13',
	'GALATIANS': ' 6',
	'EPHESIANS': ' 6',
	'PHILIPPIANS': '4',
	'COLOSSIANS': ' 4',
	'I THESSALONIANS': ' 5',
	'II THESSALONIANS': ' 3',
	'I TIMOTHY': ' 6',
	'II TIMOTHY': ' 4',
	'TITUS': ' 3',
	'PHILEMON': ' 1',
	'HEBREWS': ' 13',
	'JAMES': ' 5',
	'I PETER': ' 5',
	'II PETER': ' 3',
	'I JOHN': ' 5',
	'II JOHN': ' 1',
	'III JOHN': ' 1',
	'JUDE': ' 1',
	'REVELATION': ' 22'
};

books = ['MATTHEW', 'MARK', 'LUKE', 'JOHN', 'ACTS', 'ROMANS',
	'I CORINTHIANS', 'II CORINTHIANS', 'GALATIANS', 'EPHESIANS',
	'PHILIPPIANS', 'COLOSSIANS', 'I THESSALONIANS',
	'II THESSALONIANS', 'I TIMOTHY', 'II TIMOTHY', 'TITUS',
	'PHILEMON', 'HEBREWS', 'JAMES', 'I PETER', 'II PETER', 'I JOHN',
	'II JOHN', 'III JOHN', 'JUDE', 'REVELATION'
];

for book in books:
ar = [];
n = int(chapMap[book])
for i in range (n):
ar.append(f"CHAPTER {
	i+1
}");
chapMap[book] = ar;
print(chapMap)




#js=rf("/storage/emulated/0/Task/chapterMap.json");
djs = dumps(chapMap,indent = 4);

createF("/storage/emulated/0/Task/chapterMapN.json",djs)
