
//spessore dei muri = 0.15 m = 15 cm
//spessore delle vetrate = 0.08 m = 8 cm
//ampiezza colonnine vetrate = 0.08 m = 8 cm
//altezza muri = 3 m
//altezza basamento = 1.4 m
//altezza vasche = 1.3 m

//un gradino
var step = SIMPLEX_GRID([[0.35],[3],[0.2]]);
//le scale
var stairs = COLOR([0.8,0.8,0.8])(STRUCT([
	T([0,1,2])([36.55,1,1.2]), step,
	T([0,2])([0.35,-0.2]), step,
	T([0,2])([0.35,-0.2]), step,
	T([0,2])([0.35,-0.2]), step,
	T([0,2])([0.35,-0.2]), step,
	T([0,2])([0.35,-0.2]), step,
	T([0,2])([0.35,-0.2]), step
]));

//la base dell'edificio
//base esterna (sezioni orizzontali)
var b1 = SIMPLEX_GRID([
	[-0.85,35.7],
	[1,-9,7],
	[1.4]
]);
//base esterna (bordino sinistro)
var b2 = SIMPLEX_GRID([
	[1],
	[2],
	[1.4]
]);
//base esterna (vasca)
var b3 = SIMPLEX_GRID([
	[-0.85,21.15],
	[-1,9],
	[1.2]
]);
//base esterna (sezione centrale)
var b4 = SIMPLEX_GRID([
	[-22,14.55],
	[-1,9],
	[1.4]
]);
//base esterna (bordino scale)
var b5 = SIMPLEX_GRID([
	[-36.55,2.45],
	[1],
	[1.4]
]);
//base interna (sinistra)
var b6 = SIMPLEX_GRID([
	[-0.85,8.3],
	[-17,5.15],
	[1.4]
]);
//base interna (destra)
var b7 = SIMPLEX_GRID([
	[-36.55,11.45],
	[-4,12.15],
	[1.4]
]);
//base interna (vasca interna destra)
var b8 = SIMPLEX_GRID([
	[-48,4.15],
	[-5,11.15],
	[1.2]
]);
//base esterna (bordino destro orizzontale)
var b9 = SIMPLEX_GRID([
	[-48,4],
	[-4,1],
	[1.4]
]);
//base esterna (bordino sinistro verticale)
var b10 = SIMPLEX_GRID([
	[-52,1],
	[-4,2],
	[1.4]
]);
//base esterna (bordina destro in alto)
var b11 = SIMPLEX_GRID([
	[-36.55,3.45],
	[-16,1],
	[1.4]
]);
var bases = COLOR([0.8,0.8,0.8])(STRUCT([b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11]));

//tutti i muri dell'edificio
//muri esterni a sinistra
var w1 = SIMPLEX_GRID([
	[-0.85,7.15],
	[-0.85,0.15],
	[-1.4,3]
]);
var w2 = SIMPLEX_GRID([
	[-0.85,0.15],
	[-1,21.15],
	[-1.3,3.1]
]);
var w3 = SIMPLEX_GRID([
	[-1,8.15],
	[-22,0.15],
	[-1.4,3]
]);
var w4 = SIMPLEX_GRID([
	[-9,0.15],
	[-17,5.15],
	[-1.4,3]
]);
var wallsxex = COLOR([0.8,0.8,0.8])(STRUCT([w1,w2,w3,w4]));

//muri interni a sinistra
var w5 = SIMPLEX_GRID([
	[-4.925,0.15],
	[-19,3],
	[-1.4,3]
]);
var w6 = SIMPLEX_GRID([
	[-5.075,0.5],
	[-20,0.15],
	[-1.4,3]
]);
var w7 = SIMPLEX_GRID([
	[-6.575,2.425],
	[-20,0.15],
	[-1.4,3]
]);
var w8 = SIMPLEX_GRID([
	[-6.925,0.15],
	[-21.15,0.85],
	[-1.4,3]
]);
var w9 = SIMPLEX_GRID([
	[-4.925,0.15],
	[-17.08,1],
	[-1.4,3]
]);
var wallsxin = COLOR([0.8,0.8,0.8])(STRUCT([w5,w6,w7,w8,w9]));

//muri esterni a destra
var w10 = SIMPLEX_GRID([
  	[-42,10.15],
  	[-5,0.15],
  	[-1.3,3.1]
]);
var w11 = SIMPLEX_GRID([
  	[-52,0.15],
  	[-5.15,11],
  	[-1.3,3.1]
]);
var w12 = SIMPLEX_GRID([
  	[-38.5,13.5],
  	[-16,0.15],
  	[-1.3,3.1]
]);
var wallexdx = COLOR([0.427, 0.553, 0.435])(STRUCT([w10,w11,w12]));

//muri centrali interni
var w13 = COLOR([0.8,0.8,0.8])(SIMPLEX_GRID([
  	[-7.25,20.5],
  	[-15,0.15],
  	[-1.4,3]
]));
var w14 = COLOR([0.427, 0.553, 0.435])(SIMPLEX_GRID([
  	[-26,9],
  	[-7.25,0.15],
  	[-1.4,3]
]));
var w15 = COLOR([0.8,0.4,0.2])(SIMPLEX_GRID([
  	[-38.25,5.25],
  	[-11.5,0.15],
  	[-1.4,3]
]));
var wallin = STRUCT([w13,w14,w15]);

var walls = STRUCT([wallsxex,wallsxin,wallexdx,wallin]);

//tutte le vetrate dell'edificio
//il pilastro generico di una vetrata
var glasspillar = SIMPLEX_GRID([
	[0.08],
	[0.08],
	[-1.48,2.84]
]);
//trave orizzontale (di lunghezza 'l') di una vetrata
var GlassBeams = function(l) {
	return SIMPLEX_GRID([
		[l],
		[0.08],
		[-1.4,0.08,-2.84,0.08]
	]);
};
//trave verticale (di lunghezza 'l') di una vetrata
var VerticalGlassBeams = function(l) {
	return T([0])([0.08])(
		R([2])([PI/2])(
			GlassBeams(l)
		)
	);
};
//vetrata sinistra
var g1 = STRUCT([
	T([0,1])([1,17]), glasspillar, GlassBeams(8),
	T([0])([1.98]), glasspillar,
	T([0])([1.98]), glasspillar,
	T([0])([1.98]), glasspillar,
	T([0])([1.98]), glasspillar
]);
//vetrata destra
var g2 = STRUCT([
	T([0,1])([30.92,5.07]), glasspillar, GlassBeams(11.08),
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar
]);
//vetrate centrali
var g3 = STRUCT([
	T([0,1])([30.92,13.67]), glasspillar, GlassBeams(10.08),
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar,
	T([0])([1]), glasspillar
]);
var g4 = STRUCT([	
	T([0,1])([31.92,7.4]), glasspillar, VerticalGlassBeams(6.27),
	T([1])([3.095]), glasspillar,
	T([1])([3.095]), glasspillar
]);
var g5 = T([0])([1])(g4);
var g6 = STRUCT([
	T([0,1])([45.5,6.75]), glasspillar, VerticalGlassBeams(7.5),
	T([1])([0.9275]), glasspillar,
	T([1])([0.9275]), glasspillar,
	T([1])([0.9275]), glasspillar,
	T([1])([0.9275]), glasspillar,
	T([1])([0.9275]), glasspillar,
	T([1])([0.9275]), glasspillar,
	T([1])([0.9275]), glasspillar,
	T([1])([0.9275]), glasspillar
]);
var glasswalls = COLOR([0.5,0.5,0.5])(STRUCT([g1,g2,g3,g4,g5,g6]));

//le colonne
var pillars = COLOR([0.5,0.5,0.5])(T([0,1])([26.925,6.925])(
	SIMPLEX_GRID([
		REPLICA(4)([0.15,-6.133]),
		[0.15,-6.85,0.15],
		[-1.4,3]
	])
));

//la panchina
var be1 = SIMPLEX_GRID([
	[-7.75,15.5],
	[-14.25,0.5],
	[-1.7,0.1]
]);
var be2 = T([0,1])([7.825,14.25])(
	SIMPLEX_GRID([
		REPLICA(8)([0.3,-1.85]),
		[-0.05,0.4,-0.05],
		[-1.4,0.3]
	])
);
var bench = COLOR([0.8,0.8,0.8])(STRUCT([be1,be2]));

//i tetti
//tetto a sinistra
var r11 = COLOR([1,1,1])(SIMPLEX_GRID([
	[10],
	[-14,9],
	[-4.4,0.2]
]));
var r12 = COLOR([0.435, 0.541, 0.549])(T([0])([-0.05])(SIMPLEX_GRID([
	[10.1],
	[-13.95,9.1],
	[-4.6,0.05]
])));
var r1 = STRUCT([r11,r12]);
//tetto a destra
var r21 = COLOR([1,1,1])(SIMPLEX_GRID([
	[-25,23],
	[-4,13],
	[-4.4,0.2]
]));
var r22 = COLOR([0.435, 0.541, 0.549])(SIMPLEX_GRID([
	[-24.95,23.1],
	[-3.95,13.1],
	[-4.6,0.05]
]));
var r2 = STRUCT([r21,r22]);
var roofs = STRUCT([r1,r2]);

//l'acqua nelle due vasche
var w1 = SIMPLEX_GRID([
	[-0.85,21.15],
	[-1,9],
	[-1.25,0.05]
]);
var w2 = SIMPLEX_GRID([
	[-48,4.15],
	[-5,11.15],
	[-1.25,0.05]
]);
var water = COLOR([0.682, 0.984, 0.862])(STRUCT([w1,w2]));

//una libreria con le seguenti caratteristiche:
//h : altezza
//a : ampiezza (sull'asse y)
//l : lunghezza (sull'asse x)
//s : spessore del legno che la compone
//n : numero di scaffali
var Library = function(h,a,l,s,n) {
	var pillars = SIMPLEX_GRID([
		[s,-(l-2*s),s],
		[a],
		[h]
	]);
	var shelf = SIMPLEX_GRID([
		[-s,l-2*s],
		[a],
		REPLICA(n+2)([s,-((h-s*(n+2))/(n+1))])
	]);
	return STRUCT([pillars,shelf]);
};
//una libreria nell'interno a sinistra
var l1 = COLOR(0.917, 0.627, 0.392)(T([0,1,2])([1.5,19,1.4])(R([2])(PI/2)(Library(3,0.4,3,0.05,10))));
//tre librerie nel'interno a destra
var l2 = COLOR(0.917, 0.627, 0.392)(STRUCT([
	T([0,1,2])([39,11.2,1.4]), Library(2.4,0.3,1,0.04,8),
	T([0])([1]), Library(1,0.3,2,0.04,4),
	T([0])([2]), Library(2.4,0.3,1,0.04,8)
]));
var library = STRUCT([l1,l2]);

var model = STRUCT([stairs,bases,walls,glasswalls,pillars,bench,roofs,water,library]);
DRAW(model);