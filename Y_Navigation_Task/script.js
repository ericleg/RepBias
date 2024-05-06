// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "study",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Sequence",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
// set number of blocks, number of trials per block and deadline per trial
nBlocks = 16;
nTrials = 20; // trials per block

// define color coding (from -60 to 60)
colorM = ['#BF1E2D', '#C84B43', '#D26D5D', '#DC8C7B', '#E6AFA0', '#EAD6CB', 'white', '#C1EEB2', '#77DD53', '#47A526', '#36811C', '#265C11', '#194108']

// set block structure
// conditions: [3 2 1 4 2 3 4 3 1 2 1 4]
// 1 - bonus easy, 2 no bonus easy, 3 bonus hard, 4 no bonus hard
blockGoals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // defined by points for the DS
blockDS = new Array(nBlocks); 
blockDS.fill(0) // which DS is active at which block (always the same)

// SET THE GRID LAYOUTS (one for every block)
// matrix with grids -> one per block
pointsM = new Array(nBlocks);

// grid 11 
pointsM[0] = [ 40, -60, -60,  50, -50, 
 -10, -50,  30, -20,  30,
  40,  -50,  0, -40,  20, 
 -60,  60, -50,  60, -60,  
  60,  40, -40,  30, -30];

 // grid 10
pointsM[1] = [-20,  30,  40,  20,  30,
  20,  30, -30,  20,  10,
  10,  -50,  0, -10, -40,
 -50,  10,  10,  40,  30,
 -10,  30, -30, -50, -30];

// grid 4
pointsM[2] = [-10,  20, -10,  50, -50,
  20, -40,  20, -20, -50,
  50, -20,   0, -40,  30, 
  60,  10, -30, -10, -50, 
  50,  50,  10,  40, -30];

// grid 14
pointsM[3] = [ 10,  10,  20, -10, -10,
 -10, -10, -30,  30,  10,
 -50,  10,   0, -10, -30, 
  30,  50,  40, -10,  40, 
   10, -60,  40, -10, -60];

// grid 2 
pointsM[4] = [ 40, -20, -10, -10, -30, 
 -40,  40, -20,  40,  20,
 -30,  10,   0, -30,  30,
 -60, -20,  60,  10, -50,
  10, -50, -40, -60, -50];

// grid 1 
pointsM[5] = [ 10,  10,  10, -20, -20,
 -30, -10,  10, -60,  60, 
  40,  10,   0, -30,  10,
 -40, -40, -20,  50, -20,
 -20,  40,  30, -50,  40];

// grid 5 
pointsM[6] = [ 30, -60,  50, -50,  30, 
 -30,  50, -30,  30,  50,
 -40,  20,   0, -10, -10,
 -60, -30,  50,  10,  60,
 -40, -20,  20, -20,  20];

// grid 15 
pointsM[7] = [ 40, -10,  30, -30, -30,
  10,  30, -50, -10, -50, 
  10,  -30,  0,  60, -10,
 -40, -10,  10, -30,  10,
 -20,  10, 10, -30, -50];

// grid 3 
pointsM[8] = [-20, -20,  20, -40,  60, 
 -30,  50, -30, -10, -40,
 -10,  10,   0,  60, -40, 
  30, -50,  40,  30,  60,
  60, -30,  40,  60, -50];

// grid 8 
pointsM[9] = [ 10, -50, -60, -60, -40,
 -10,  40, -20,  50, -60,
 -40,  20,   0,  20,  10,
  10, -20,  40, -30,  40,
 -50, -10,  10, -50, -60];

// grid 13 
pointsM[10] = [ 30, -60,  40, -30,  30,
  40, -30, -20,  50, -20,
 -40,  50,   0,  20, -40,
  40,  20,  20, -10, -30,
 -50,  10,  40, -50, -20];

// grid 6 
pointsM[11] = [ 10,  30,  30,  30,  50,
 -30, -30, -10, -50, -20,
  30,  20,   0,  60, -10,
  50, -20, -30,  60, -50,
 -30,  30, -40, -30, -60];

// grid 12
pointsM[12] = [ 10, -30,  30, -20,  30,
 -50, -20,  30, -30,  20,
 -20,  50,   0,  20, -40,
  40, -10, -10,  30, -10,
 -50, -10, -40, -50, -60];

// grid 7 
pointsM[13] = [-60,  20, -40,  50, -40,
  10,  40, -30,  10, -20,
 -10, -50,   0, -40, -50,
 -60,  20,  30, -40,  50, 
  50, -10,  30, -10, -30];

// grid 9 
pointsM[14] = [-60, -40, -10, -10, -50,
 -50,  50, -20,  60, -10,
  20,  -50,  0, -60,  10,
  50, -20,  60,  10, -10, 
  10,  10, -40, -20, -30];

// grid 0 
pointsM[15] = [-10, -40, -50, -10,  50, 
  30,  30,  40, -60,  60,
 -30, -40,   0, -30, -60,
  60,  40,  30,  50, -50,
 -60, -30, -50, -20,  30];

// define indexes of the grid
gridIdx = [[1,2,3,4,5],
  [6,7,8,9,10],
  [11,12,13,14,15],
  [16,17,18,19,20],
  [21,22,23,24,25]];

// SET BONUS FOR EVERY TRIAL
// set bonus trials (block x trial)
bonusBlocks = [1,0,0,1,1,0,1,0,1,1,0,0,1,1,0,0];
bonusVec = [[0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
 [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
 [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
 [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

// define colors for the bonus indicator and the bonus bar
bonusColors = ['#aaaaaa', '#0070d9']
bonusBarColors = ['#ffffff', '#000000']

// SET GOAL DRIFTS

// coding of drift for the blocks
driftRate = [4,6,7,1,6,0,3,5,4,2,3,1,7,5,0,2]; 

// define the drifts
driftVec = new Array(8);
driftVec[0] = [ 1, 0, -1, -1,  2,  2,  2,  3,  1,  4,  9, 12, 14,15, 17, 15, 11, 8, 6, 5];
driftVec[1] = [-1,  2, -1,  2,  9,  8, 12, 17, 20, 20, 22, 18, 18,20, 21, 23, 20, 17, 18, 15];
driftVec[2] = [ 2, -2, -4, -4, 0, 0,  6,  6,  5,  4,  7, 11, 13,12, 16, 12, 16, 20, 21, 24];
driftVec[3] = [ 3,  2,  7, 11, 12,  7,  5,  4,  2,  5,  8,  6,  2,  2,  1, -2, -6, -8, -5, -3];

// define the drifts[3:] also in negative direction
for(let d=0; d<4; d++) {
  dvec = [];
  for(let t=0; t<nTrials; t++) {
    // drift
    dvec[t] = driftVec[d][t]*(-1);
  }
  driftVec[d+4] = Array.from(dvec);
}


// define the goals for every block
trialGoals = []; // preallocation

poiV = []; // point vector
// loop through the blocks
for(let b=0; b<nBlocks; b++) {
    // loop through the trials
    for(let t=0; t<nTrials; t++) {
      poiV.push(blockGoals[b]+driftVec[driftRate[b]][t]);
    }
  // save vector
  trialGoals[b] = Array.from(poiV);
  poiV.length = 0; // reset poiV
}


// DEFINE THE NOISE ON THE POINTS 

// 1) create the noise for 20 trials (i.e. one block)
pointsNoiseM = new Array(nTrials);

pointsNoiseM[0] = [ 3,  1,  1,  0, -3,  2, -2, -0,  0, -3, -0,  1,  1, -1,  1,  1,  1, -1, -0, -0, -1, -1, -1, -0,  2]
pointsNoiseM[1] = [-0, -1, -1, -1,  1, -0, -1, -1,  1, -2, -1,  2, -2,  0,  0, -0, -1,  2, -3,  2, -0, -2,  2,  2, -1]
pointsNoiseM[2] = [-0, -1, -1, -1, -1, -4,  1, -0, -0, -1,  0, -0, -1,  2, -2,  1,  0,  1, -1, -1,  0,  3, -1, -1,  1]
pointsNoiseM[3] = [ 3,  1, -1,  0, -0,  2, -0, -1,  1, -2,  1, -3, -1,  1, -1,  1,  1,  2,  0, -2,  3, -0, -2,  1, -1]
pointsNoiseM[4] = [-2,  0, -1,  0,  2,  1,  0,  2,  0, -0, -0, -1, -1,  0, -0, -0, -1, -1, -0,  0, -1,  2, -3,  2,  1]
pointsNoiseM[5] = [-0,  1, -1,  0, -0, -1, -1,  0, -0, -1,  0, -2, -2,  3, -0,  3,  2,  1,  2, -1,  1, -2,  1, -0, -2]
pointsNoiseM[6] = [-2, -1, -1,  1, -2, -1,  1,  2, -1, -1, -3,  1, -1,  0,  1, -1,  1,  0,  0, -0, -1,  0, -2, -2, -1]
pointsNoiseM[7] = [-1,  0,  1, -0,  0,  1,  2,  2,  1, -3,  1,  2, -1, -3,  1, -0, -0,  1,  0,  2, -2,  1,  2,  0, -1]
pointsNoiseM[8] = [ 3, -1, -4,  0, -2,  0,  2, -1, -0, -0,  1,  2,  0, -1,  0, -1,  1,  1, -0, -1,  0, -1, -1, -1, -1]
pointsNoiseM[9] = [ 0, -3, -2, -1, -1, -3,  2, -1,  2,  1,  1,  3, -1,  1,  1, -0, -1,  1,  1,  1, -0, -0, -2, -1, -1]
pointsNoiseM[10] = [-0, -2,  1,  3,  1, -1,  0, -0, -1,  1, -0,  1, -0, -2, -2,  0, -2,  0, -2,  1, -0,  0, -0,  3, -2]
pointsNoiseM[11] = [-1, -0, -1, -3, -1,  2, -0, -2,  1,  1,  3, -0,  1, -1,  1, -1, -1,  1,  0,  1, -2, -3,  3,  0,  2]
pointsNoiseM[12] = [-1,  1, -1, -0,  1, -1, -2, -0,  0, -1,  1,  0, -1,  1, -0, -2,  0, -0, -4, -1, -2,  0, -1, -0,  1]
pointsNoiseM[13] = [-2, -0, -0, -1, -1,  2,  1,  1, -1, -0,  1,  0, -2,  1,  0, -3, -0, -0,  0, -1, -2,  2,  0, -0, -3]
pointsNoiseM[14] = [-1,  0, -2,  4, -2,  1,  1, -1, -1, -0, -0, -2,  1, -1,  1, -1, -0, -3,  0, -0,  1,  1,  1, -0, -1]
pointsNoiseM[15] = [ 1,  1, -2,  2, -1, -4,  0,  1,  2,  1, -1, -2,  1,  1,  2,  2,  2, -3, -0, -1,  2, -1,  0,  0, -1]
pointsNoiseM[16] = [ 1,  2,  2,  1,  1, -1,  1, -1,  0,  1, -1,  0, -1, -1,  1,  0,  1,  1,  0, -2,  1,  1,  0,  2, -0]
pointsNoiseM[17] = [ 0, -3, -0,  1, -0, -2,  1,  0,  2,  1, -1, -0, -3, -0, -3,  2,  0, -0, -1, -0,  1, -2,  1, -0, -1]
pointsNoiseM[18] = [-1,  0, -1,  3, -1, -0, -1,  1, -2, -1,  2,  1,  2,  1, -1, -1,  0, -1,  0, -1, -1, -1,  3,  0,  3]
pointsNoiseM[19] = [ 0,  0, -1, -1,  1, -0,  1,  0, -1, -1,  0,  0,  1, -1, -0,  3, -1, -0,  3, -1, -1, -1,  3, -2, -1]


// 2) define noise trial order for all blocks
blockNoise = new Array(nBlocks);

blockNoise[0] = [12,  6, 15, 13,  7,  4, 17,  5,  0,  3, 19, 11,  2, 14, 10, 18,  9,  1, 16,  8]
blockNoise[1] = [ 1,  5, 12, 15,  8, 19,  3, 16,  7, 18, 10, 14, 13, 17,  6,  9,  2,  0, 11,  4]
blockNoise[2] = [18, 17, 10,  0,  2, 19,  5,  1,  7, 15,  6,  4, 13, 14,  8, 12, 11,  3,  9, 16]
blockNoise[3] = [15,  2,  9,  7, 11,  8,  1,  3, 10,  4,  0,  6, 14, 17, 13, 12,  5, 18, 19, 16]
blockNoise[4] = [ 9, 11,  5,  6, 13, 19, 16,  0,  3, 10, 12,  1,  8,  2, 17, 14, 18, 15,  7,  4]
blockNoise[5] = [13,  6,  5,  2,  3,  1, 19, 17, 12, 16,  9, 10,  8, 14, 18,  0, 15, 11,  4,  7]
blockNoise[6] = [12,  7, 19,  9, 18, 11,  6,  5,  2,  3, 13,  1, 16,  0,  4, 10, 15, 17, 14,  8]
blockNoise[7] = [19, 11, 12,  8,  9, 13,  5,  6, 18, 10,  0,  7,  1, 16, 14,  2,  4,  3, 17, 15]
blockNoise[8] = [17,  0, 10,  8, 16, 14, 19,  9, 13,  7,  3, 15,  5, 11,  2,  4,  1,  6, 18, 12]
blockNoise[9] = [ 0, 14,  2,  6,  9, 10, 17,  7, 12, 11,  3, 15,  4,  8, 19, 18, 16,  5,  1, 13]
blockNoise[10] = [ 1, 16, 13,  0,  6,  3,  7, 10, 12,  8, 17,  9, 19, 15, 14,  4, 18,  5,  2, 11]
blockNoise[11] = [19,  8, 18, 13,  6,  4, 17,  3,  5, 15,  7, 14,  0, 11,  9,  2, 12, 16, 10,  1]
blockNoise[12] = [15,  1, 10,  5,  6, 19,  9,  0, 11, 17,  7,  8, 18, 14, 13,  2,  4,  3, 12, 16]
blockNoise[13] = [14, 19,  1, 10, 11, 13,  5,  6,  9, 12, 18, 15,  7, 16,  3,  0,  4,  2, 17,  8]
blockNoise[14] = [17,  8, 14,  9, 18, 13, 10,  3, 15, 12,  0,  1, 16,  7,  6,  2,  4,  5, 11, 19]
blockNoise[15] = [ 4, 12,  2, 11, 18, 16, 17,  1, 14,  6,  8,  0, 10,  3, 15, 13, 19,  7,  5,  9]

// parameters for instruction navigation
instrEnd = [false];
instrSite = [1];
}
      },
      "title": "Pacmantask",
      "content": [
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "instrCount": 1
            },
            {
              "instrCount": 2
            },
            {
              "instrCount": 3
            },
            {
              "instrCount": 4
            },
            {
              "instrCount": 5
            },
            {
              "instrCount": 6
            },
            {
              "instrCount": 7
            },
            {
              "instrCount": 8
            },
            {
              "instrCount": 9
            },
            {
              "instrCount": 10
            },
            {
              "instrCount": 11
            },
            {
              "instrCount": 12
            },
            {
              "instrCount": 13
            },
            {
              "instrCount": 14
            },
            {
              "instrCount": 15
            },
            {
              "instrCount": 16
            },
            {
              "instrCount": 17
            },
            {
              "instrCount": 18
            },
            {
              "instrCount": 19
            },
            {
              "instrCount": 20
            }
          ],
          "sample": {
            "mode": "sequential"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Instructions_I",
          "tardy": true,
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Sequence",
            "tardy": true,
            "skip": "${ (instrEnd[0]) }",
            "content": [
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 452.52,
                    "height": 342.07,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Liebe\u002Fr Teilnehmer\u002Fin,\n\ndas folgende Experiment besteht \naus mehreren voneinander unabhängigen\nBlöcken, in denen Sie jeweils vier \nEntscheidungen treffen müssen.\n\nIhre Aufgabe ist es durch Ihre Entscheidungen\neinen möglichst hohen Gewinn zu erzielen.\n\nAbhängig von Ihrer Leistung wird\nIhnen ein Eurobetrag als Bonus ausgezahlt.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"01_grid.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 117.81,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "01_grid.png": "embedded\u002Fcf05bf8271b02e524d1b4eeebe3cf6e1ccd74b0475f5c5e654f411d7cb041bef.png",
                  "vor.png": "embedded\u002F03a3b8a36438276e323a0a083908138f21b60122346c17f29d832b5f6979187b.png"
                },
                "responses": {
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

// console.log(this.parameters.instrSite);
}
                },
                "title": "Screen_1",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===1)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 465.83,
                    "height": 169.05,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "In den folgendenden Instruktionen werden Sie\nalles lernen, was Sie dafür wissen müssen.\n\nFür eine optimale und fehlerfreie Darstellung \nbitten wir Sie ihr Browserfenster zu maximieren.\n(Bei Windows über F11)",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"01_grid.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "01_grid.png": "embedded\u002Fcf05bf8271b02e524d1b4eeebe3cf6e1ccd74b0475f5c5e654f411d7cb041bef.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_2",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===2)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 473.33,
                    "height": 226.72,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Sie können die Spielfigur bei jeder Entscheidung\nin drei verschiedenen Richtungen bewegen:\n\n- Taste C: ein Feld schräg links nach oben\n\n- Taste B: ein Feld schräg rechts nach oben\n\n- Taste V: ein Feld gerade nach unten",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": "-200",
                    "top": 0,
                    "angle": 0,
                    "width": "350",
                    "height": "250",
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"02_bewegungen.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "02_bewegungen.png": "embedded\u002F1ea3576ff6557d164e6509ea97939ac1712ffe32647caa258de72fff83ab69b3.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_3",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===3)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 436.59,
                    "height": 169.05,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Sie können sich zunächst mit der Steuerung \nvertraut machen und sich frei über das Feld\nbewegen.\n\nDabei können Sie sich jedoch nicht über die \nRänder des Spielfeldes bewegen.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": "-200",
                    "top": 0,
                    "angle": 0,
                    "width": "350",
                    "height": "250",
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"02_bewegungen.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "02_bewegungen.png": "embedded\u002F1ea3576ff6557d164e6509ea97939ac1712ffe32647caa258de72fff83ab69b3.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_4",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===4)) }"
              }
            ]
          }
        },
        {
          "type": "lab.flow.Sequence",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
// reset counter instruction screen
instrSite[0] = 1;

// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25];
pacPosIdx =  [2, 2];
invalidMoveTxt = [''];
}
          },
          "title": "Training_I",
          "tardy": true,
          "content": [
            {
              "type": "lab.flow.Loop",
              "templateParameters": [
                {
                  "move": 1
                },
                {
                  "move": 2
                },
                {
                  "move": 3
                },
                {
                  "move": 4
                },
                {
                  "move": 5
                },
                {
                  "move": 6
                },
                {
                  "move": 7
                },
                {
                  "move": 8
                },
                {
                  "move": 9
                },
                {
                  "move": 10
                },
                {
                  "move": 11
                },
                {
                  "move": 12
                },
                {
                  "move": 13
                },
                {
                  "move": 14
                },
                {
                  "move": 15
                },
                {
                  "move": 16
                },
                {
                  "move": 17
                },
                {
                  "move": 18
                },
                {
                  "move": 19
                },
                {
                  "move": 20
                },
                {
                  "move": 21
                },
                {
                  "move": 22
                },
                {
                  "move": 23
                },
                {
                  "move": 24
                },
                {
                  "move": 25
                },
                {
                  "move": 26
                },
                {
                  "move": 27
                },
                {
                  "move": 28
                },
                {
                  "move": 29
                },
                {
                  "move": 30
                }
              ],
              "sample": {
                "mode": "sequential"
              },
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "Loop",
              "tardy": true,
              "shuffleGroups": [],
              "template": {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "line",
                    "left": 125,
                    "top": 25,
                    "angle": 0,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": 125,
                    "top": -175,
                    "angle": 0,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": 125,
                    "top": -75,
                    "angle": 0,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": 125,
                    "top": 225,
                    "angle": 0,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": 125,
                    "top": 125,
                    "angle": 0,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": 125,
                    "top": -275,
                    "angle": 0,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": -125,
                    "top": -25.5,
                    "angle": 90,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": 375,
                    "top": -25,
                    "angle": 90,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": 275,
                    "top": -25,
                    "angle": 90,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": 175,
                    "top": -25,
                    "angle": 90,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": 75,
                    "top": -25,
                    "angle": 90,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "line",
                    "left": -25,
                    "top": -25,
                    "angle": 90,
                    "width": 500,
                    "height": 0,
                    "stroke": "black",
                    "strokeWidth": 1,
                    "fill": "rgb(0,0,0)"
                  },
                  {
                    "type": "i-text",
                    "left": -250,
                    "top": -25,
                    "angle": 0,
                    "width": 305.94,
                    "height": 36.16,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "#ff0000",
                    "text": "${ invalidMoveTxt[0] }",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": 32,
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "center"
                  },
                  {
                    "type": "image",
                    "left": "${ pacPosXY[0] }",
                    "top": "${ pacPosXY[1] }",
                    "angle": 0,
                    "width": 88.67999999999999,
                    "height": 88.67999999999999,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"pacman.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -261.54,
                    "top": -175,
                    "angle": 0,
                    "width": 252,
                    "height": 180,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"02_bewegungen.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png",
                  "02_bewegungen.png": "embedded\u002F1ea3576ff6557d164e6509ea97939ac1712ffe32647caa258de72fff83ab69b3.png"
                },
                "responses": {
                  "keypress(c)": "left",
                  "keypress(v)": "down",
                  "keypress(b)": "right"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
// get potential new pacman position idx
switch(this.state.response) {
    case 'left':
        pacPosIdx[0]--
        pacPosIdx[1]--
        break
    case 'down':
        pacPosIdx[0]++
        break
    case 'right':
        pacPosIdx[0]--
        pacPosIdx[1]++
        break
}


if((pacPosIdx.some(x => x<0)) || (pacPosIdx.some(x => x>4)))
  {

    invalidMoveTxt[0] = ['ungültiger Zug']

    // update position (back to initial position)
    switch(this.state.response) {
    case 'left':
        pacPosIdx[0]++
        pacPosIdx[1]++
        break
    case 'down':
        pacPosIdx[0]--
        break
    case 'right':
        pacPosIdx[0]++
        pacPosIdx[1]--
        break
      }
  }
  else {
    // update pacman position on grid
    invalidMoveTxt[0] = ['']
    switch(this.state.response) {
      case 'left':
          pacPosXY[0] -= 100
          pacPosXY[1] -= 100
          break
      case 'down':
          pacPosXY[1] += 100
          break
      case 'right':
          pacPosXY[0] += 100
          pacPosXY[1] -= 100
          break
          }

}

this.state.response = -999;
}
                },
                "title": "Move",
                "tardy": true,
                "skip": "${ (this.parameters.moveCount\u003E=4) }",
                "plugins": []
              }
            }
          ]
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "instrCount": 1
            },
            {
              "instrCount": 2
            },
            {
              "instrCount": 3
            },
            {
              "instrCount": 4
            },
            {
              "instrCount": 5
            },
            {
              "instrCount": 6
            },
            {
              "instrCount": 7
            },
            {
              "instrCount": 8
            },
            {
              "instrCount": 9
            },
            {
              "instrCount": 10
            },
            {
              "instrCount": 11
            },
            {
              "instrCount": 12
            },
            {
              "instrCount": 13
            },
            {
              "instrCount": 14
            },
            {
              "instrCount": 15
            },
            {
              "instrCount": 16
            },
            {
              "instrCount": 17
            },
            {
              "instrCount": 18
            },
            {
              "instrCount": 19
            },
            {
              "instrCount": 20
            },
            {
              "instrCount": 21
            },
            {
              "instrCount": 22
            },
            {
              "instrCount": 23
            },
            {
              "instrCount": 24
            },
            {
              "instrCount": 25
            },
            {
              "instrCount": 26
            },
            {
              "instrCount": 27
            },
            {
              "instrCount": 28
            },
            {
              "instrCount": 29
            },
            {
              "instrCount": 30
            }
          ],
          "sample": {
            "mode": "sequential"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Instructions_II",
          "tardy": true,
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Sequence",
            "tardy": true,
            "skip": "${ (instrEnd[0]) }",
            "content": [
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 441.43,
                    "height": 169.05,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Sie können in jedem Block jeweils vier Kreise\nmit der Spielfigur einsammeln.\n\nSie müssen immer genau vier Kreise \neinsammeln, d.h. Sie können nicht nur \neins, zwei oder drei Kreise einsammeln.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"01_grid.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 117.81,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "01_grid.png": "embedded\u002Fcf05bf8271b02e524d1b4eeebe3cf6e1ccd74b0475f5c5e654f411d7cb041bef.png",
                  "vor.png": "embedded\u002F03a3b8a36438276e323a0a083908138f21b60122346c17f29d832b5f6979187b.png"
                },
                "responses": {
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_1",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===1)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 456.09,
                    "height": 226.72,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Die Farbe der Kreise gibt an, wie viele Punkte\nSie beim Einsammeln für das Feld bekommen.\n\nDabei stehen rote Kreise für negative Punkte \nund grüne Kreise für positive Punkte.\n\nDie Farbintensität der Kreise signalisiert wie \nviele Punkte es für das Feld gibt.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 352.22999999999996,
                    "height": 248.82,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n07_kreise.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n07_kreise.png": "embedded\u002F1053eb9440c239a94ab9a71cbd1b4474c437edcba4b02ddf194e2e2dd24d8607.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_2",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===2)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 481.84,
                    "height": 284.4,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Je dunkler die Färbung eines Kreises,\ndesto mehr negative bzw. positive Punkte gibt es.\n\nDie niedrigste bzw. höchste Punktzahl \nist -60 (dunkelrot) bzw. +60 (dunkelgrün).\n\nDie genaue Punktzahl variiert jedoch immer \nein bisschen, z.B. kann der hellste rote Kreis \neinmal -11 und ein anderes Mal -8 Punkte \nliefern. Der Durchschnitt ist jedoch -10 Punkte.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 352.22999999999996,
                    "height": 248.82,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n07_kreise.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n07_kreise.png": "embedded\u002F1053eb9440c239a94ab9a71cbd1b4474c437edcba4b02ddf194e2e2dd24d8607.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_3",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===3)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 452.48,
                    "height": 82.54,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Sie starten jeden Block mit null Punkten und\ndie Punkte die Sie in einem Block durch Ihre \nvier Entscheidungen sammeln werden addiert.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"display_end_no_ds.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "display_trial_new.png": "embedded\u002Fb368e17208d1d17eb5040e84204c74c298ac8f2c010c80fa8d0991064c24be71.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "display_end_no_ds.png": "embedded\u002F61be8d3075a0dfe62b5877032231555f950a9b3a0ae51d894970eb54e37a121c.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;
}
                },
                "title": "Screen_4",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===4)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 413.34,
                    "height": 169.05,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Ihr aktueller Punktestand wird links neben \ndem Spielfeld angezeigt.\n\nDie Punkte, die Sie für Ihren letzten Zug\nbekommen haben, werden in der Mitte \ndes Spielfeldes angezeigt.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"display_end_no_ds.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "display_trial_new.png": "embedded\u002Fb368e17208d1d17eb5040e84204c74c298ac8f2c010c80fa8d0991064c24be71.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "display_end_no_ds.png": "embedded\u002F61be8d3075a0dfe62b5877032231555f950a9b3a0ae51d894970eb54e37a121c.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_5",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===5)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 469.59,
                    "height": 140.21,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Ausserdem sehen Sie im unteren linken Bereich\nbei welcher Entscheidung Sie sich gerade\nbefinden (hier wäre es die erste Entscheidung).\n\nSie können als nächstes zehn Blöcke üben.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"display_start_no_ds.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "display_trial_new.png": "embedded\u002Fb368e17208d1d17eb5040e84204c74c298ac8f2c010c80fa8d0991064c24be71.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "display_start_no_ds.png": "embedded\u002F49afb15a77f5e2ceca19e908e200dbdc2d2990c9903cbe2435020f69414e24ef.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_6",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===6)) }"
              }
            ]
          }
        },
        {
          "type": "lab.flow.Sequence",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
// reset counter instruction screen
instrSite[0] = 1;

// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25];
pacPosIdx =  [2, 2];
invalidMoveTxt = [''];
}
          },
          "title": "Training_II",
          "tardy": true,
          "content": [
            {
              "type": "lab.flow.Loop",
              "templateParameters": [
                {
                  "trialN": 0
                },
                {
                  "trialN": 1
                },
                {
                  "trialN": 2
                },
                {
                  "trialN": 3
                },
                {
                  "trialN": 4
                },
                {
                  "trialN": 5
                },
                {
                  "trialN": 6
                },
                {
                  "trialN": 7
                },
                {
                  "trialN": 8
                },
                {
                  "trialN": 9
                }
              ],
              "sample": {
                "mode": "sequential"
              },
              "files": {
                "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png",
                "points.csv": "embedded\u002F5d04a261732bd409afa82cf09b2614f9431f20469e61004fd4f3573cfebe1b0b.csv"
              },
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {
                "before:prepare": function anonymous(
) {
// define grid for this training section
pointsVec = [-60,  -50,  -40,  -30,  -20,
 -10,  10,  20,  30,  40,
  50,  60,   0,  60,  50,
  40,  30,  20,  10, -10,
 -20, -30, -40, -50, -60];

// get the noise
blNoise = new Array(nTrials);
blNoise = blockNoise[0].map(x=>pointsNoiseM[x]);

// add the points of the fields to the noise
pointsNoise = Array(nTrials);

for(let t=0; t<nTrials; t++) {
  pointsNoise[t] = blNoise[t].map(function (num, idx) {
    return num + pointsVec[idx] });
}
}
              },
              "title": "Block",
              "tardy": true,
              "shuffleGroups": [],
              "template": {
                "type": "lab.flow.Sequence",
                "files": {},
                "responses": {},
                "parameters": {},
                "messageHandlers": {
                  "before:prepare": function anonymous(
) {
// counter for moves
moveCount = [0]
invalidMoveTxt = ['']
pointColor = ['white']
currPP = [13]
timeoutText = ['']


// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25]
pacPosIdx =  [2, 2]

// starting configuration of progress bar
boxColors = ['black', 'white', 'white', 'white']

// preallocation of point vector for current trial
points = [0, -999, -999, -999, -999]

// colors of grid circles
colors = []

for(x=0;x<25;x++) {
  colors.push(colorM[pointsVec[x]/10+6])
}

colors[12] = 'white'

}
                },
                "title": "Trial",
                "tardy": true,
                "content": [
                  {
                    "type": "lab.flow.Loop",
                    "templateParameters": [
                      {
                        "move": 1
                      },
                      {
                        "move": 2
                      },
                      {
                        "move": 3
                      },
                      {
                        "move": 4
                      },
                      {
                        "move": 5
                      },
                      {
                        "move": 6
                      },
                      {
                        "move": 7
                      },
                      {
                        "move": 8
                      },
                      {
                        "move": 9
                      },
                      {
                        "move": 10
                      },
                      {
                        "move": 11
                      },
                      {
                        "move": 12
                      },
                      {
                        "move": 13
                      },
                      {
                        "move": 14
                      },
                      {
                        "move": 15
                      }
                    ],
                    "sample": {
                      "mode": "sequential"
                    },
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Loop",
                    "tardy": true,
                    "shuffleGroups": [],
                    "template": {
                      "type": "lab.canvas.Screen",
                      "content": [
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "${ colors[2] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": "#ffffff",
                          "strokeWidth": 0,
                          "fill": "${ colors[3] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[4] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[10] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[8] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[9] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[7] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[6] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[5] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[0] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[1] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[11] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[16] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[12] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[23] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[18] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[13] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[22] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[21] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[20] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[19] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[17] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[15] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[14] }"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 25,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -175,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -75,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 225,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 125,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -275,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -125,
                          "top": -25.5,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 375,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 275,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 175,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 75,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -25,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[24] }"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -100,
                          "angle": 0,
                          "width": 476.76,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Punkte: ${ points[moveCount[0]] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": -363,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[1] }"
                        },
                        {
                          "type": "rect",
                          "left": -450,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[0] }"
                        },
                        {
                          "type": "rect",
                          "left": -275,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[2] }"
                        },
                        {
                          "type": "rect",
                          "left": -187,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[3] }"
                        },
                        {
                          "type": "i-text",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 1033.78,
                          "height": 56.5,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ pointColor[0] }",
                          "text": "${ pointsNoise[this.parameters.trialN][currPP] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "50",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "image",
                          "left": "${ pacPosXY[0] }",
                          "top": "${ pacPosXY[1] }",
                          "angle": 0,
                          "width": 88.67999999999999,
                          "height": 88.67999999999999,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "black",
                          "src": "${ this.files[\"pacman.png\"] }"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -25,
                          "angle": 0,
                          "width": 305.94,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#ff0000",
                          "text": "${ invalidMoveTxt[0] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        }
                      ],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {
                        "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                      },
                      "responses": {
                        "keypress(c)": "left",
                        "keypress(v)": "down",
                        "keypress(b)": "right"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "after:end": function anonymous(
) {
// get potential new pacman position idx
switch(this.state.response) {
    case 'left':
        pacPosIdx[0]--
        pacPosIdx[1]--
        break
    case 'down':
        pacPosIdx[0]++
        break
    case 'right':
        pacPosIdx[0]--
        pacPosIdx[1]++
        break
}

if((moveCount[0]<4) && (this.state.response!==-999)) {
  // check if Pacman is still inside the grid and not in the middle
  if((pacPosIdx.some(x => x<0)) || (pacPosIdx.some(x => x>4)) || (pacPosIdx.every(x => x===2)))
  {

    invalidMoveTxt[0] = ['ungültiger Zug']

    // update position (back to initial position)
    switch(this.state.response) {
    case 'left':
        pacPosIdx[0]++
        pacPosIdx[1]++
        break
    case 'down':
        pacPosIdx[0]--
        break
    case 'right':
        pacPosIdx[0]++
        pacPosIdx[1]--
        break
      }
  }
  else {
    // update pacman position on grid
    switch(this.state.response) {
      case 'left':
          pacPosXY[0] -= 100
          pacPosXY[1] -= 100
          break
      case 'down':
          pacPosXY[1] += 100
          break
      case 'right':
          pacPosXY[0] += 100
          pacPosXY[1] -= 100
          break
          }

      // get idx of Pacman
      currPP[0] = gridIdx[pacPosIdx[0]][pacPosIdx[1]]-1
      // hide chosen cell
      colors[currPP] = 'white'

      // update progress bar
      boxColors[moveCount[0]+1] = 'black'
      boxColors[moveCount[0]] = 'white'

      // update points
      points[moveCount[0]+1] = points[moveCount[0]]+pointsNoise[this.parameters.trialN][currPP]

      moveCount[0]++
      invalidMoveTxt[0] = ['']

      if(pointsNoise[this.parameters.trialN][currPP]>0) {
        pointColor[0] = ['green']
      }
      else {
        pointColor[0] = ['red']
      }
        
  }
  
}

this.state.response = -999

}
                      },
                      "title": "Move",
                      "tardy": true,
                      "skip": "${ (moveCount\u003E=4) }",
                      "plugins": []
                    }
                  },
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "${ colors[2] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[8] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[3] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[4] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[10] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[9] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[7] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[0] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[6] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[5] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[1] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[11] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[12] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[23] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[18] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[13] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[22] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[21] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[20] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[19] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[17] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[16] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[15] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[14] }"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 25,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -175,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -75,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 225,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 125,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -275,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -125,
                        "top": -25.5,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 375,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 275,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 175,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 75,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -25,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[24] }"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -100,
                        "angle": 0,
                        "width": 476.76,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Punkte: ${ points[moveCount[0]] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 1033.78,
                        "height": 56.5,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ pointColor[0] }",
                        "text": "${ pointsNoise[this.parameters.trialN][currPP] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "50",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "image",
                        "left": "${ pacPosXY[0] }",
                        "top": "${ pacPosXY[1] }",
                        "angle": 0,
                        "width": 88.67999999999999,
                        "height": 88.67999999999999,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "black",
                        "src": "${ this.files[\"pacman.png\"] }"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                    },
                    "responses": {},
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Feedback",
                    "timeout": "4000",
                    "tardy": true
                  }
                ]
              }
            }
          ]
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "instrCount": 1
            },
            {
              "instrCount": 2
            },
            {
              "instrCount": 3
            },
            {
              "instrCount": 4
            },
            {
              "instrCount": 5
            },
            {
              "instrCount": 6
            },
            {
              "instrCount": 7
            },
            {
              "instrCount": 8
            },
            {
              "instrCount": 9
            },
            {
              "instrCount": 10
            },
            {
              "instrCount": 11
            },
            {
              "instrCount": 12
            },
            {
              "instrCount": 13
            },
            {
              "instrCount": 14
            },
            {
              "instrCount": 15
            },
            {
              "instrCount": 16
            },
            {
              "instrCount": 17
            },
            {
              "instrCount": 18
            },
            {
              "instrCount": 19
            },
            {
              "instrCount": 20
            },
            {
              "instrCount": 21
            },
            {
              "instrCount": 22
            },
            {
              "instrCount": 23
            },
            {
              "instrCount": 24
            },
            {
              "instrCount": 25
            },
            {
              "instrCount": 26
            },
            {
              "instrCount": 27
            },
            {
              "instrCount": 28
            },
            {
              "instrCount": 29
            },
            {
              "instrCount": 30
            }
          ],
          "sample": {
            "mode": "sequential"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Instructions_III",
          "tardy": true,
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Sequence",
            "tardy": true,
            "skip": "${ (instrEnd[0]) }",
            "content": [
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 445.12,
                    "height": 226.72,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Während des Experiments haben Sie in \njedem Block ein Punkteziel, das Ihnen \nzu Beginn des Blocks links neben dem\nSpielfeld angezeigt wird.\n\nSie sollen diesem Punkteziel durch das \nEinsammeln der Punkte so nahe wie möglich \nkommen.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 114.83999999999999,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"display_goal_only.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n03_display_goal.png": "embedded\u002F86544f90e08b716e3371815c71019c9563083a5bf15d7f568da23be70f29e691.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "vor.png": "embedded\u002F5bfe965230d053b438d5a5f14eaa7d9a52f504cef8ac8fd07b5955d375b5090a.png",
                  "display_goal_only.png": "embedded\u002F209bff363d43ef52c75377fd4ac4e2f5fda47e42c5eb71e309cb5e4647a4faed.png"
                },
                "responses": {
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_1",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===1)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 449.61,
                    "height": 226.72,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Aus der Abweichung des Punkteziels und\nIhren gesammelten Punkten ergibt sich Ihr \nGewinn, der Ihren Eurobonus für das \nExperiment bestimmt.\n\nJe geringer die Differenz zwischen Punkteziel \nund Ihren gesammelten Punkten, desto \nhöher ist Ihr Gewinn.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"display_goal_only.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n03_display_goal.png": "embedded\u002F86544f90e08b716e3371815c71019c9563083a5bf15d7f568da23be70f29e691.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "display_goal_only.png": "embedded\u002F209bff363d43ef52c75377fd4ac4e2f5fda47e42c5eb71e309cb5e4647a4faed.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_2",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===2)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 479.38,
                    "height": 197.89,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Die Höhe Ihres Gewinns wird Ihnen immer am\nEnde eines Blocks in Form eines grünen Balkens\nangezeigt.\n\nAls nächstes können Sie zehn Blöcke mit\nPunkteziel üben. Die Gewinne dieser Übung \nbestimmen noch nicht Ihren Eurobonus.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"display_feedback_no_ds.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n09_display_end.png": "embedded\u002F7645a3cb89bb8236d02a1ed756559d0cd1d112503754dbfdc1b8b45df68b4563.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "display_feedback_no_ds.png": "embedded\u002F6962ed85242c53934e48193b620890ec76ccec9f208f9a3634a7310b6e032c4f.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;


}
                },
                "title": "Screen_3",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===3)) }"
              }
            ]
          }
        },
        {
          "type": "lab.flow.Sequence",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
// reset counter instruction screen
instrSite[0] = 1;

// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25];
pacPosIdx =  [2, 2];
invalidMoveTxt = [''];
}
          },
          "title": "Training_III",
          "tardy": true,
          "content": [
            {
              "type": "lab.flow.Loop",
              "templateParameters": [
                {
                  "trialN": 0
                },
                {
                  "trialN": 1
                },
                {
                  "trialN": 2
                },
                {
                  "trialN": 3
                },
                {
                  "trialN": 4
                },
                {
                  "trialN": 5
                },
                {
                  "trialN": 6
                },
                {
                  "trialN": 7
                },
                {
                  "trialN": 8
                },
                {
                  "trialN": 9
                }
              ],
              "sample": {
                "mode": "sequential"
              },
              "files": {
                "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png",
                "points.csv": "embedded\u002F5d04a261732bd409afa82cf09b2614f9431f20469e61004fd4f3573cfebe1b0b.csv"
              },
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {
                "before:prepare": function anonymous(
) {
// define parameters of the different blocks
goalsVec = [0,10,20,30,40,50,60,70,80,90];

// grid for this training section
pointsVec = [-60,  -50,  -40,  -30,  -20,
 -10,  10,  20,  30,  40,
  50,  60,   0,  60,  50,
  40,  30,  20,  10, -10,
 -20, -30, -40, -50, -60];

// get the noise
blNoise = new Array(nTrials);
blNoise = blockNoise[10].map(x=>pointsNoiseM[x]);

// add the points of the fields to the noise
pointsNoise = Array(nTrials);

for(let t=0; t<nTrials; t++) {
  //bp = blNoise[t].map((x) =>parseInt(x, 10))
  pointsNoise[t] = blNoise[t].map(function (num, idx) {
    return num + pointsVec[idx] });
}
}
              },
              "title": "Block",
              "tardy": true,
              "shuffleGroups": [],
              "template": {
                "type": "lab.flow.Sequence",
                "files": {},
                "responses": {},
                "parameters": {},
                "messageHandlers": {
                  "before:prepare": function anonymous(
) {
// counter for moves
moveCount = [0]
invalidMoveTxt = ['']
pointColor = ['white']
currPP = [13]
timeoutText = ['']


// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25]
pacPosIdx =  [2, 2]

// starting configuration of progress bar
boxColors = ['black', 'white', 'white', 'white']

// preallocation of point vector for current trial
points = [0, -999, -999, -999, -999]

// colors of grid circles
colors = []

for(x=0;x<25;x++) {
  colors.push(colorM[pointsVec[x]/10+6])
}

colors[12] = 'white'

}
                },
                "title": "Trial",
                "tardy": true,
                "content": [
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "line",
                        "left": 125,
                        "top": 25,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -175,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -75,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 225,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 125,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -275,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -125,
                        "top": -25.5,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 375,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 275,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 175,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 75,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -25,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -250,
                        "angle": 0,
                        "width": 519.37,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                    },
                    "responses": {},
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Goal",
                    "timeout": "1000",
                    "tardy": true,
                    "skip": "${ (this.parameters.moveCount\u003E=4) }",
                    "plugins": []
                  },
                  {
                    "type": "lab.flow.Loop",
                    "templateParameters": [
                      {
                        "move": 1
                      },
                      {
                        "move": 2
                      },
                      {
                        "move": 3
                      },
                      {
                        "move": 4
                      },
                      {
                        "move": 5
                      },
                      {
                        "move": 6
                      },
                      {
                        "move": 7
                      },
                      {
                        "move": 8
                      },
                      {
                        "move": 9
                      },
                      {
                        "move": 10
                      },
                      {
                        "move": 11
                      },
                      {
                        "move": 12
                      },
                      {
                        "move": 13
                      },
                      {
                        "move": 14
                      },
                      {
                        "move": 15
                      }
                    ],
                    "sample": {
                      "mode": "sequential"
                    },
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Loop",
                    "tardy": true,
                    "shuffleGroups": [],
                    "template": {
                      "type": "lab.canvas.Screen",
                      "content": [
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "${ colors[2] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": "#ffffff",
                          "strokeWidth": 0,
                          "fill": "${ colors[3] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[4] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[10] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[8] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[9] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[7] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[6] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[5] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[0] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[1] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[11] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[12] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[23] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[18] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[13] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[22] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[21] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[20] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[19] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[17] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[16] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[15] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[14] }"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 25,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -175,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -75,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 225,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 125,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -275,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -125,
                          "top": -25.5,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 375,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 275,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 175,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 75,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -25,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[24] }"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -250,
                          "angle": 0,
                          "width": 519.37,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -100,
                          "angle": 0,
                          "width": 476.76,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Punkte: ${ points[moveCount[0]] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": -363,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[1] }"
                        },
                        {
                          "type": "rect",
                          "left": -450,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[0] }"
                        },
                        {
                          "type": "rect",
                          "left": -275,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[2] }"
                        },
                        {
                          "type": "rect",
                          "left": -187,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[3] }"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -25,
                          "angle": 0,
                          "width": 297.05,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#ff0000",
                          "text": "${ invalidMoveTxt[0]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 942.08,
                          "height": 56.5,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ pointColor[0] }",
                          "text": "${ pointsNoise[parameters.trialN][currPP] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "50",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "image",
                          "left": "${ pacPosXY[0] }",
                          "top": "${ pacPosXY[1] }",
                          "angle": 0,
                          "width": 88.67999999999999,
                          "height": 88.67999999999999,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "black",
                          "src": "${ this.files[\"pacman.png\"] }"
                        }
                      ],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {
                        "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                      },
                      "responses": {
                        "keypress(c)": "left",
                        "keypress(v)": "down",
                        "keypress(b)": "right"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "after:end": function anonymous(
) {
// get potential new pacman position idx
switch(this.state.response) {
    case 'left':
        pacPosIdx[0]--
        pacPosIdx[1]--
        break
    case 'down':
        pacPosIdx[0]++
        break
    case 'right':
        pacPosIdx[0]--
        pacPosIdx[1]++
        break
}


if((moveCount[0]<4) && (this.state.response!==-999)) {
  // check if Pacman is still inside the grid and not in the middle
  if((pacPosIdx.some(x => x<0)) || (pacPosIdx.some(x => x>4)) || (pacPosIdx.every(x => x===2)))
  {
    invalidMoveTxt[0] = ['ungültiger Zug']

    // update position (back to initial position)
    switch(this.state.response) {
    case 'left':
        pacPosIdx[0]++
        pacPosIdx[1]++
        break
    case 'down':
        pacPosIdx[0]--
        break
    case 'right':
        pacPosIdx[0]++
        pacPosIdx[1]--
        break
      }
  }
  else {
    // update pacman position on grid
    switch(this.state.response) {
      case 'left':
          pacPosXY[0] -= 100
          pacPosXY[1] -= 100
          break
      case 'down':
          pacPosXY[1] += 100
          break
      case 'right':
          pacPosXY[0] += 100
          pacPosXY[1] -= 100
          break
          }

      // get idx of Pacman
      currPP[0] = gridIdx[pacPosIdx[0]][pacPosIdx[1]]-1
      // hide chosen cell
      colors[currPP] = 'white'

      // update progress bar
      boxColors[moveCount[0]+1] = 'black'
      boxColors[moveCount[0]] = 'white'

      // update points
      points[moveCount[0]+1] = points[moveCount[0]]+pointsNoise[this.parameters.trialN][currPP]

      moveCount[0]++
      invalidMoveTxt[0] = ['']

      if(pointsNoise[this.parameters.trialN][currPP]>0) {
        pointColor[0] = ['green']
      }
      else {
        pointColor[0] = ['red']
      }
        
  }

}

this.state.response = -999

}
                      },
                      "title": "Move",
                      "tardy": true,
                      "skip": "${ (moveCount\u003E=4) }",
                      "plugins": []
                    }
                  },
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "${ colors[2] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[8] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[3] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[4] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[10] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[9] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[7] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[0] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[6] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[5] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[1] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[11] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[12] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[23] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[18] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[13] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[22] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[21] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[20] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[19] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[17] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[16] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[15] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[14] }"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 25,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -175,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -75,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 225,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 125,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -275,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -125,
                        "top": -25.5,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 375,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 275,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 175,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 75,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -25,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[24] }"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -250,
                        "angle": 0,
                        "width": 519.37,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -100,
                        "angle": 0,
                        "width": 476.76,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Punkte: ${ points[moveCount[0]] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -25,
                        "angle": 0,
                        "width": 256.16,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#ff0000",
                        "text": "${ timeoutText[0] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 942.08,
                        "height": 56.5,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ pointColor[0] }",
                        "text": "${ pointsNoise[parameters.trialN][currPP] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "50",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "image",
                        "left": "${ pacPosXY[0] }",
                        "top": "${ pacPosXY[1] }",
                        "angle": 0,
                        "width": 88.67999999999999,
                        "height": 88.67999999999999,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "black",
                        "src": "${ this.files[\"pacman.png\"] }"
                      },
                      {
                        "type": "rect",
                        "left": -300,
                        "top": 190,
                        "angle": 0,
                        "width": 204,
                        "height": 55,
                        "stroke": "#000000",
                        "strokeWidth": 5,
                        "fill": "#ffffff"
                      },
                      {
                        "type": "rect",
                        "left": "${ rewardLeft }",
                        "top": 190,
                        "angle": 0,
                        "width": "${ rewardWidth }",
                        "height": 50,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#00D400"
                      },
                      {
                        "type": "i-text",
                        "left": -350,
                        "top": 140,
                        "angle": 0,
                        "width": 117.39,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Gewinn:",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                    },
                    "responses": {},
                    "parameters": {},
                    "messageHandlers": {
                      "before:prepare": function anonymous(
) {
diff = Math.abs(goalsVec[this.parameters.trialN]-points[moveCount[0]])

reward = 100-(diff*2)

if(reward<0) { 
  reward = 0
}

if(moveCount[0]!==4) {
  timeoutText[0] = ['zu langsam']
  reward = 0
}

rewardWidth = reward*2;
rewardLeft = -300-diff*2;
}
                    },
                    "title": "Feedback",
                    "timeout": "4000",
                    "tardy": true
                  }
                ]
              }
            }
          ]
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "instrCount": 1
            },
            {
              "instrCount": 2
            },
            {
              "instrCount": 3
            },
            {
              "instrCount": 4
            },
            {
              "instrCount": 5
            },
            {
              "instrCount": 6
            },
            {
              "instrCount": 7
            },
            {
              "instrCount": 8
            },
            {
              "instrCount": 9
            },
            {
              "instrCount": 10
            },
            {
              "instrCount": 11
            },
            {
              "instrCount": 12
            },
            {
              "instrCount": 13
            },
            {
              "instrCount": 14
            },
            {
              "instrCount": 15
            },
            {
              "instrCount": 16
            },
            {
              "instrCount": 17
            },
            {
              "instrCount": 18
            },
            {
              "instrCount": 19
            },
            {
              "instrCount": 20
            },
            {
              "instrCount": 21
            },
            {
              "instrCount": 22
            },
            {
              "instrCount": 23
            },
            {
              "instrCount": 24
            },
            {
              "instrCount": 25
            },
            {
              "instrCount": 26
            },
            {
              "instrCount": 27
            },
            {
              "instrCount": 28
            },
            {
              "instrCount": 29
            },
            {
              "instrCount": 30
            }
          ],
          "sample": {
            "mode": "sequential"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Instructions_IV",
          "tardy": true,
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Sequence",
            "tardy": true,
            "skip": "${ (instrEnd[0]) }",
            "content": [
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 416.91,
                    "height": 197.89,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Eine Standardzugfolge ist immer grau\nhinterlegt.\n\nDiese wird sowohl zusammen mit dem Ziel\nam Anfang von jedem Block angezeigt, als\nauch während des Blocks, wenn Sie die \nPunkte einsammeln.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n03_display_goal.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 114.83999999999999,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n03_display_goal.png": "embedded\u002F86544f90e08b716e3371815c71019c9563083a5bf15d7f568da23be70f29e691.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "vor.png": "embedded\u002F5bfe965230d053b438d5a5f14eaa7d9a52f504cef8ac8fd07b5955d375b5090a.png"
                },
                "responses": {
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_1",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===1)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 406.02,
                    "height": 197.89,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Wie viele Punkte diese im Schnitt\nliefert steht jeweils am Anfang des Blocks\nin der Mitte des Spielfeldes.\n\nSie sind nicht gezwungen die Standard-\nzugfolge zu wählen. Diese ist lediglich ein\nAngebot.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n03_display_goal.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n03_display_goal.png": "embedded\u002F86544f90e08b716e3371815c71019c9563083a5bf15d7f568da23be70f29e691.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_2",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===2)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 410.94,
                    "height": 140.21,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Als nächstes können Sie zehn Blöcke mit\nHinterlegung der Standardzugfolge üben.\n\nAuch hier beeinflussen die Gewinne noch \nnicht Ihren Eurobonus.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n03_display_goal.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n03_display_goal.png": "embedded\u002F86544f90e08b716e3371815c71019c9563083a5bf15d7f568da23be70f29e691.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;
}
                },
                "title": "Screen_3",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===3)) }"
              }
            ]
          }
        },
        {
          "type": "lab.flow.Sequence",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
// reset counter instruction screen
instrSite[0] = 1;


// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25];
pacPosIdx =  [2, 2];
invalidMoveTxt = [''];
}
          },
          "title": "Training_IV",
          "tardy": true,
          "content": [
            {
              "type": "lab.flow.Loop",
              "templateParameters": [
                {
                  "trialN": 0
                },
                {
                  "trialN": 1
                },
                {
                  "trialN": 2
                },
                {
                  "trialN": 3
                },
                {
                  "trialN": 4
                },
                {
                  "trialN": 5
                },
                {
                  "trialN": 6
                },
                {
                  "trialN": 7
                },
                {
                  "trialN": 8
                },
                {
                  "trialN": 9
                }
              ],
              "sample": {
                "mode": "sequential"
              },
              "files": {
                "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png",
                "points.csv": "embedded\u002F5d04a261732bd409afa82cf09b2614f9431f20469e61004fd4f3573cfebe1b0b.csv"
              },
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {
                "before:prepare": function anonymous(
) {
// define parameters of the different blocks
goalsVec = [150,150,150,150,150,150,150,150,150,150];
//goalsVec = trialGoals[blockN];

// grid for this training section
pointsVec = [-60,  -50,  -40,  -30,  -20,
 -10,  10,  20,  30,  40,
  50,  60,   0,  60,  50,
  40,  30,  20,  10, -10,
 -20, -30, -40, -50, -60];

// get the noise
blNoise = new Array(nTrials);
blNoise = blockNoise[5].map(x=>pointsNoiseM[x]);

// add the points of the fields to the noise
pointsNoise = Array(nTrials);

for(let t=0; t<nTrials; t++) {
  pointsNoise[t] = blNoise[t].map(function (num, idx) {
    return num + pointsVec[idx] });
}
}
              },
              "title": "Block",
              "tardy": true,
              "shuffleGroups": [],
              "template": {
                "type": "lab.flow.Sequence",
                "files": {},
                "responses": {},
                "parameters": {},
                "messageHandlers": {
                  "before:prepare": function anonymous(
) {
// counter for moves
moveCount = [0]
invalidMoveTxt = ['']
pointColor = ['white']
currPP = [13]
timeoutText = ['']

// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25]
pacPosIdx =  [2, 2]

// starting configuration of progress bar
boxColors = ['black', 'white', 'white', 'white']

// preallocation of point vector for current trial
points = [0, -999, -999, -999, -999]

// colors of grid circles
colors = []

for(x=0;x<25;x++) {
  colors.push(colorM[pointsVec[x]/10+6])
}

colors[12] = 'white'

}
                },
                "title": "Trial",
                "tardy": true,
                "content": [
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "rect",
                        "left": 25,
                        "top": -25,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "rect",
                        "left": -75,
                        "top": -25,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "rect",
                        "left": 25,
                        "top": 75,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "rect",
                        "left": 25,
                        "top": -125,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 25,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -175,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -75,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 225,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 125,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -275,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -125,
                        "top": -25.5,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 375,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 275,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 175,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 75,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -25,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -250,
                        "angle": 0,
                        "width": 519.37,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 83.42,
                        "height": 56.5,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa",
                        "text": "150",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "50",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                    },
                    "responses": {},
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Goal",
                    "timeout": "1000",
                    "tardy": true,
                    "skip": "${ (moveCount\u003E=4) }",
                    "plugins": []
                  },
                  {
                    "type": "lab.flow.Loop",
                    "templateParameters": [
                      {
                        "move": 1
                      },
                      {
                        "move": 2
                      },
                      {
                        "move": 3
                      },
                      {
                        "move": 4
                      },
                      {
                        "move": 5
                      },
                      {
                        "move": 6
                      },
                      {
                        "move": 7
                      },
                      {
                        "move": 8
                      },
                      {
                        "move": 9
                      },
                      {
                        "move": 10
                      },
                      {
                        "move": 11
                      },
                      {
                        "move": 12
                      },
                      {
                        "move": 13
                      },
                      {
                        "move": 14
                      },
                      {
                        "move": 15
                      }
                    ],
                    "sample": {
                      "mode": "sequential"
                    },
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Loop",
                    "tardy": true,
                    "shuffleGroups": [],
                    "template": {
                      "type": "lab.canvas.Screen",
                      "content": [
                        {
                          "type": "rect",
                          "left": -75,
                          "top": -25,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": -25,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "${ colors[2] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": "#ffffff",
                          "strokeWidth": 0,
                          "fill": "${ colors[3] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[4] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[10] }"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": -125,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[8] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[9] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[7] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[6] }"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": 75,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[5] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[0] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[1] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[11] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[12] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[23] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[18] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[13] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[22] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[21] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[20] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[19] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[17] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[16] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[15] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[14] }"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 25,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -175,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -75,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 225,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 125,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -275,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -125,
                          "top": -25.5,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 375,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 275,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 175,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 75,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -25,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[24] }"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -250,
                          "angle": 0,
                          "width": 519.37,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -100,
                          "angle": 0,
                          "width": 476.76,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Punkte: ${ points[moveCount[0]] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": -363,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[1] }"
                        },
                        {
                          "type": "rect",
                          "left": -450,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[0] }"
                        },
                        {
                          "type": "rect",
                          "left": -275,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[2] }"
                        },
                        {
                          "type": "rect",
                          "left": -186,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[3] }"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -25,
                          "angle": 0,
                          "width": 297.05,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#ff0000",
                          "text": "${ invalidMoveTxt[0]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 942.08,
                          "height": 56.5,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ pointColor[0] }",
                          "text": "${ pointsNoise[parameters.trialN][currPP] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "50",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "image",
                          "left": "${ pacPosXY[0] }",
                          "top": "${ pacPosXY[1] }",
                          "angle": 0,
                          "width": 88.67999999999999,
                          "height": 88.67999999999999,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "black",
                          "src": "${ this.files[\"pacman.png\"] }"
                        }
                      ],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {
                        "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                      },
                      "responses": {
                        "keypress(c)": "left",
                        "keypress(v)": "down",
                        "keypress(b)": "right"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "after:end": function anonymous(
) {
// get potential new pacman position idx
switch(this.state.response) {
    case 'left':
        pacPosIdx[0]--
        pacPosIdx[1]--
        break
    case 'down':
        pacPosIdx[0]++
        break
    case 'right':
        pacPosIdx[0]--
        pacPosIdx[1]++
        break
}

if((moveCount[0]<4) && (this.state.response!==-999)) {
  // check if Pacman is still inside the grid and not in the middle
  if((pacPosIdx.some(x => x<0)) || (pacPosIdx.some(x => x>4)) || (pacPosIdx.every(x => x===2)))
  {
    invalidMoveTxt[0] = ['ungültiger Zug']

    // update position (back to initial position)
    switch(this.state.response) {
    case 'left':
        pacPosIdx[0]++
        pacPosIdx[1]++
        break
    case 'down':
        pacPosIdx[0]--
        break
    case 'right':
        pacPosIdx[0]++
        pacPosIdx[1]--
        break
      }
  }
  else {
    // update pacman position on grid
    switch(this.state.response) {
      case 'left':
          pacPosXY[0] -= 100
          pacPosXY[1] -= 100
          break
      case 'down':
          pacPosXY[1] += 100
          break
      case 'right':
          pacPosXY[0] += 100
          pacPosXY[1] -= 100
          break
          }

      // get idx of Pacman
      currPP[0] = gridIdx[pacPosIdx[0]][pacPosIdx[1]]-1
      // hide chosen cell
      colors[currPP] = 'white'

      // update progress bar
      boxColors[moveCount[0]+1] = 'black'
      boxColors[moveCount[0]] = 'white'

      // update points
      points[moveCount[0]+1] = points[moveCount[0]]+pointsNoise[this.parameters.trialN][currPP]

      moveCount[0]++
      invalidMoveTxt[0] = ['']

      if(pointsNoise[this.parameters.trialN][currPP]>0) {
        pointColor[0] = ['green']
      }
      else {
        pointColor[0] = ['red']
      }
        
  }

 
}

this.state.response = -999;
}
                      },
                      "title": "Move",
                      "tardy": true,
                      "skip": "${ (moveCount\u003E=4) }",
                      "plugins": []
                    }
                  },
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "${ colors[2] }"
                      },
                      {
                        "type": "rect",
                        "left": 25,
                        "top": -125,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[8] }"
                      },
                      {
                        "type": "rect",
                        "left": -75,
                        "top": -25,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "rect",
                        "left": 25,
                        "top": -25,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[3] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[4] }"
                      },
                      {
                        "type": "rect",
                        "left": 25,
                        "top": 75,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[10] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[9] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[7] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[0] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[6] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[5] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[1] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[11] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[12] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[23] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[18] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[13] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[22] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[21] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[20] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[19] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[17] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[16] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[15] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[14] }"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 25,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -175,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -75,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 225,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 125,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -275,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -125,
                        "top": -25.5,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 375,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 275,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 175,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 75,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -25,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[24] }"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -250,
                        "angle": 0,
                        "width": 519.37,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -100,
                        "angle": 0,
                        "width": 476.76,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Punkte: ${ points[moveCount[0]] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -25,
                        "angle": 0,
                        "width": 256.16,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#ff0000",
                        "text": "${ timeoutText[0] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 942.08,
                        "height": 56.5,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ pointColor[0] }",
                        "text": "${ pointsNoise[parameters.trialN][currPP] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "50",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "image",
                        "left": "${ pacPosXY[0] }",
                        "top": "${ pacPosXY[1] }",
                        "angle": 0,
                        "width": 88.67999999999999,
                        "height": 88.67999999999999,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "black",
                        "src": "${ this.files[\"pacman.png\"] }"
                      },
                      {
                        "type": "rect",
                        "left": "-300",
                        "top": "190",
                        "angle": 0,
                        "width": 204,
                        "height": 55,
                        "stroke": "#000000",
                        "strokeWidth": 5,
                        "fill": "#ffffff"
                      },
                      {
                        "type": "rect",
                        "left": "${ rewardLeft }",
                        "top": "190",
                        "angle": 0,
                        "width": "${ rewardWidth }",
                        "height": 50,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#00D400"
                      },
                      {
                        "type": "i-text",
                        "left": "-350",
                        "top": "140",
                        "angle": 0,
                        "width": 117.39,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Gewinn:",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                    },
                    "responses": {},
                    "parameters": {},
                    "messageHandlers": {
                      "before:prepare": function anonymous(
) {
diff = Math.abs(goalsVec[this.parameters.trialN]-points[moveCount[0]])

reward = 100-(diff*2)

if(reward<0) { 
  reward = 0
}

if(moveCount[0]!==4) {
  timeoutText[0] = ['zu langsam']
  reward = 0
}

rewardWidth = reward*2;
rewardLeft = -300-diff*2;
}
                    },
                    "title": "Feedback",
                    "timeout": "4000",
                    "tardy": true
                  }
                ]
              }
            }
          ]
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "instrCount": 1
            },
            {
              "instrCount": 2
            },
            {
              "instrCount": 3
            },
            {
              "instrCount": 4
            },
            {
              "instrCount": 5
            },
            {
              "instrCount": 6
            },
            {
              "instrCount": 7
            },
            {
              "instrCount": 8
            },
            {
              "instrCount": 9
            },
            {
              "instrCount": 10
            },
            {
              "instrCount": 11
            },
            {
              "instrCount": 12
            },
            {
              "instrCount": 13
            },
            {
              "instrCount": 14
            },
            {
              "instrCount": 15
            },
            {
              "instrCount": 16
            },
            {
              "instrCount": 17
            },
            {
              "instrCount": 18
            },
            {
              "instrCount": 19
            },
            {
              "instrCount": 20
            },
            {
              "instrCount": 21
            },
            {
              "instrCount": 22
            },
            {
              "instrCount": 23
            },
            {
              "instrCount": 24
            },
            {
              "instrCount": 25
            },
            {
              "instrCount": 26
            },
            {
              "instrCount": 27
            },
            {
              "instrCount": 28
            },
            {
              "instrCount": 29
            },
            {
              "instrCount": 30
            }
          ],
          "sample": {
            "mode": "sequential"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Instructions_V",
          "tardy": true,
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Sequence",
            "tardy": true,
            "skip": "${ (instrEnd[0]) }",
            "content": [
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 435.37,
                    "height": 342.07,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "In manchen Blöcken besteht die Möglichkeit \nbei der Wahl der Standardzugfolge einen \nBonus zu bekommen.\n\nOb es für die aktuellen Blöcke eine Chance \nauf Bonuspunkte gibt, wird Ihnen während \ndes Experiments mitgeteilt.\n\nAußerdem werden die Punkte für die \nStandardzugfolge in blau angezeigt, \nwenn im aktuellen Block die Chance auf \neinen Bonus besteht.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 114.83999999999999,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n03_display_goal_bonus.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n03_display_goal.png": "embedded\u002F86544f90e08b716e3371815c71019c9563083a5bf15d7f568da23be70f29e691.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "vor.png": "embedded\u002F5bfe965230d053b438d5a5f14eaa7d9a52f504cef8ac8fd07b5955d375b5090a.png",
                  "n03_display_goal_bonus.png": "embedded\u002Fdbf8cb18ec4a5142d2c48f982c495f5af65515d27edc66564894f41736a2157a.png"
                },
                "responses": {
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;


}
                },
                "title": "Screen_1",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===1)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 417.06,
                    "height": 169.05,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Als nächstes können Sie zehn Blöcke mit\nChance auf Bonus, bei der Ausführung der\nStandardzugfolge üben.\n\nAuch hier beeinflussen die Gewinne noch \nnicht Ihren Eurobonus.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n03_display_goal_bonus.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n03_display_goal.png": "embedded\u002F86544f90e08b716e3371815c71019c9563083a5bf15d7f568da23be70f29e691.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "n03_display_goal_bonus.png": "embedded\u002Fdbf8cb18ec4a5142d2c48f982c495f5af65515d27edc66564894f41736a2157a.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_2",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===2)) }"
              }
            ]
          }
        },
        {
          "type": "lab.flow.Sequence",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
// reset counter instruction screen
instrSite[0] = 1;


// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25];
pacPosIdx =  [2, 2];
invalidMoveTxt = [''];
}
          },
          "title": "Training_V",
          "tardy": true,
          "content": [
            {
              "type": "lab.flow.Loop",
              "templateParameters": [
                {
                  "trialN": 0
                },
                {
                  "trialN": 1
                },
                {
                  "trialN": 2
                },
                {
                  "trialN": 3
                },
                {
                  "trialN": 4
                },
                {
                  "trialN": 5
                },
                {
                  "trialN": 6
                },
                {
                  "trialN": 7
                },
                {
                  "trialN": 8
                },
                {
                  "trialN": 9
                }
              ],
              "sample": {
                "mode": "sequential"
              },
              "files": {
                "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png",
                "points.csv": "embedded\u002F5d04a261732bd409afa82cf09b2614f9431f20469e61004fd4f3573cfebe1b0b.csv"
              },
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {
                "before:prepare": function anonymous(
) {
// define parameters of the different blocks
goalsVec = [150,150,150,150,150,150,150,150,150,150];

// grid for this training section
pointsVec = [-60,  -50,  -40,  -30,  -20,
 -10,  10,  20,  30,  40,
  50,  60,   0,  60,  50,
  40,  30,  20,  10, -10,
 -20, -30, -40, -50, -60];

bonusVecTrain = [1,0,0,1,1,0,0,0,1,0];

// get the noise
blNoise = new Array(nTrials);
blNoise = blockNoise[14].map(x=>pointsNoiseM[x]);

// add the points of the fields to the noise
pointsNoise = Array(nTrials);

for(let t=0; t<nTrials; t++) {
  pointsNoise[t] = blNoise[t].map(function (num, idx) {
    return num + pointsVec[idx] });
}
}
              },
              "title": "Block",
              "tardy": true,
              "shuffleGroups": [],
              "template": {
                "type": "lab.flow.Sequence",
                "files": {},
                "responses": {},
                "parameters": {},
                "messageHandlers": {
                  "before:prepare": function anonymous(
) {
// counter for moves
moveCount = [0]
invalidMoveTxt = ['']
pointColor = ['white']
currPP = [13]
timeoutText = ['']

// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25]
pacPosIdx =  [2, 2]

// starting configuration of progress bar
boxColors = ['black', 'white', 'white', 'white']

// preallocation of point vector for current trial
points = [0, -999, -999, -999, -999]

// preallocation moves
movesTrial = []

// colors of grid circles
colors = []

for(x=0;x<25;x++) {
  colors.push(colorM[pointsVec[x]/10+6])
}

colors[12] = 'white'
}
                },
                "title": "Trial",
                "tardy": true,
                "content": [
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "rect",
                        "left": 25,
                        "top": -25,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "rect",
                        "left": -75,
                        "top": -25,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "rect",
                        "left": 25,
                        "top": 75,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "rect",
                        "left": 25,
                        "top": -125,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 25,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -175,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -75,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 225,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 125,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -275,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -125,
                        "top": -25.5,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 375,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 275,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 175,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 75,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -25,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -250,
                        "angle": 0,
                        "width": 519.37,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 83.42,
                        "height": 56.5,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#0070d9",
                        "text": "150",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "50",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                    },
                    "responses": {},
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Goal",
                    "timeout": "1000",
                    "tardy": true,
                    "skip": "${ (moveCount\u003E=4) }",
                    "plugins": []
                  },
                  {
                    "type": "lab.flow.Loop",
                    "templateParameters": [
                      {
                        "move": 1
                      },
                      {
                        "move": 2
                      },
                      {
                        "move": 3
                      },
                      {
                        "move": 4
                      },
                      {
                        "move": 5
                      },
                      {
                        "move": 6
                      },
                      {
                        "move": 7
                      },
                      {
                        "move": 8
                      },
                      {
                        "move": 9
                      },
                      {
                        "move": 10
                      },
                      {
                        "move": 11
                      },
                      {
                        "move": 12
                      },
                      {
                        "move": 13
                      },
                      {
                        "move": 14
                      },
                      {
                        "move": 15
                      }
                    ],
                    "sample": {
                      "mode": "sequential"
                    },
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Loop",
                    "tardy": true,
                    "shuffleGroups": [],
                    "template": {
                      "type": "lab.canvas.Screen",
                      "content": [
                        {
                          "type": "rect",
                          "left": -75,
                          "top": -25,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": -25,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "${ colors[2] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": "#ffffff",
                          "strokeWidth": 0,
                          "fill": "${ colors[3] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[4] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[10] }"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": -125,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[8] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[9] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[7] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[6] }"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": 75,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[5] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[0] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[1] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[11] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[12] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[23] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[18] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[13] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[22] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[21] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[20] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[19] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[17] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[16] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[15] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[14] }"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 25,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -175,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -75,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 225,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 125,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -275,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -125,
                          "top": -25.5,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 375,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 275,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 175,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 75,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -25,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[24] }"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -250,
                          "angle": 0,
                          "width": 519.37,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -100,
                          "angle": 0,
                          "width": 476.76,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Punkte: ${ points[moveCount[0]] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": -363,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[1] }"
                        },
                        {
                          "type": "rect",
                          "left": -450,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[0] }"
                        },
                        {
                          "type": "rect",
                          "left": -275,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[2] }"
                        },
                        {
                          "type": "rect",
                          "left": -187,
                          "top": 175,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "${ boxColors[3] }"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -25,
                          "angle": 0,
                          "width": 297.05,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#ff0000",
                          "text": "${ invalidMoveTxt[0]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 942.08,
                          "height": 56.5,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ pointColor[0] }",
                          "text": "${ pointsNoise[parameters.trialN][currPP] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "50",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "image",
                          "left": "${ pacPosXY[0] }",
                          "top": "${ pacPosXY[1] }",
                          "angle": 0,
                          "width": 88.67999999999999,
                          "height": 88.67999999999999,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "black",
                          "src": "${ this.files[\"pacman.png\"] }"
                        }
                      ],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {
                        "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                      },
                      "responses": {
                        "keypress(c)": "left",
                        "keypress(v)": "down",
                        "keypress(b)": "right"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "after:end": function anonymous(
) {
// get potential new pacman position idx
switch(this.state.response) {
    case 'left':
        pacPosIdx[0]--
        pacPosIdx[1]--
        break
    case 'down':
        pacPosIdx[0]++
        break
    case 'right':
        pacPosIdx[0]--
        pacPosIdx[1]++
        break
}

if((moveCount[0]<4) && (this.state.response!==-999)) {
  // check if Pacman is still inside the grid and not in the middle
  if((pacPosIdx.some(x => x<0)) || (pacPosIdx.some(x => x>4)) || (pacPosIdx.every(x => x===2)))
  {
    invalidMoveTxt[0] = ['ungültiger Zug']

    // update position (back to initial position)
    switch(this.state.response) {
    case 'left':
        pacPosIdx[0]++
        pacPosIdx[1]++
        break
    case 'down':
        pacPosIdx[0]--
        break
    case 'right':
        pacPosIdx[0]++
        pacPosIdx[1]--
        break
      }
  }
  else {
    // update pacman position on grid
    switch(this.state.response) {
      case 'left':
          pacPosXY[0] -= 100;
          pacPosXY[1] -= 100;
          movesTrial.push(0);
          break
      case 'down':
          pacPosXY[1] += 100;
          movesTrial.push(1);
          break
      case 'right':
          pacPosXY[0] += 100;
          pacPosXY[1] -= 100;
          movesTrial.push(2);
          break
          }

      // get idx of Pacman
      currPP[0] = gridIdx[pacPosIdx[0]][pacPosIdx[1]]-1
      // hide chosen cell
      colors[currPP] = 'white'

      // update progress bar
      boxColors[moveCount[0]+1] = 'black'
      boxColors[moveCount[0]] = 'white'

      // update points
      //points[move] = move
      points[moveCount[0]+1] = points[moveCount[0]]+pointsNoise[this.parameters.trialN][currPP]

      moveCount[0]++
      invalidMoveTxt[0] = ['']

      if(pointsNoise[this.parameters.trialN][currPP]>0) {
        pointColor[0] = ['green']
      }
      else {
        pointColor[0] = ['red']
      }
        
  }
  
}

this.state.response = -999;
}
                      },
                      "title": "Move",
                      "tardy": true,
                      "skip": "${ (moveCount\u003E=4) }",
                      "plugins": []
                    }
                  },
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "rect",
                        "left": 25,
                        "top": -25,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "rect",
                        "left": 25,
                        "top": 75,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "rect",
                        "left": -75,
                        "top": -25,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "${ colors[2] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[8] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[3] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[4] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[10] }"
                      },
                      {
                        "type": "rect",
                        "left": 25,
                        "top": -125,
                        "angle": 0,
                        "width": 95,
                        "height": 95,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#aaaaaa"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[9] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[7] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[0] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[6] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": -125,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[5] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -225,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[1] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[12] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[23] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[11] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[18] }"
                      },
                      {
                        "type": "circle",
                        "left": 225,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[13] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[22] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": -25,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[14] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[21] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[20] }"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[19] }"
                      },
                      {
                        "type": "circle",
                        "left": 125,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[17] }"
                      },
                      {
                        "type": "circle",
                        "left": 25,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[16] }"
                      },
                      {
                        "type": "circle",
                        "left": -75,
                        "top": 75,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[15] }"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 25,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -175,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -75,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 225,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": 125,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 125,
                        "top": -275,
                        "angle": 0,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -125,
                        "top": -25.5,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 375,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 275,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 175,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": 75,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "line",
                        "left": -25,
                        "top": -25,
                        "angle": 90,
                        "width": 500,
                        "height": 0,
                        "stroke": "black",
                        "strokeWidth": 1,
                        "fill": "rgb(0,0,0)"
                      },
                      {
                        "type": "circle",
                        "left": 325,
                        "top": 175,
                        "angle": 0,
                        "width": 90,
                        "height": 90,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ colors[24] }"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -250,
                        "angle": 0,
                        "width": 519.37,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -100,
                        "angle": 0,
                        "width": 476.76,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Punkte: ${ points[moveCount[0]] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -250,
                        "top": -25,
                        "angle": 0,
                        "width": 256.16,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#ff0000",
                        "text": "${ timeoutText[0] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": 125,
                        "top": -25,
                        "angle": 0,
                        "width": 942.08,
                        "height": 56.5,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ pointColor[0] }",
                        "text": "${ pointsNoise[parameters.trialN][currPP] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "50",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "image",
                        "left": "${ pacPosXY[0] }",
                        "top": "${ pacPosXY[1] }",
                        "angle": 0,
                        "width": 88.67999999999999,
                        "height": 88.67999999999999,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "black",
                        "src": "${ this.files[\"pacman.png\"] }"
                      },
                      {
                        "type": "rect",
                        "left": -300,
                        "top": 190,
                        "angle": 0,
                        "width": 204,
                        "height": 55,
                        "stroke": "#000000",
                        "strokeWidth": 5,
                        "fill": "#ffffff"
                      },
                      {
                        "type": "rect",
                        "left": "${ rewardLeft }",
                        "top": 190,
                        "angle": 0,
                        "width": "${ rewardWidth }",
                        "height": 50,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#00D400"
                      },
                      {
                        "type": "i-text",
                        "left": -350,
                        "top": 140,
                        "angle": 0,
                        "width": 117.39,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Gewinn:",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -215,
                        "top": 140,
                        "angle": 0,
                        "width": 238.41,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "#0070d9",
                        "text": "${ bonusText[0] }",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "rect",
                        "left": -175,
                        "top": 190,
                        "angle": 0,
                        "width": 44,
                        "height": 55,
                        "stroke": "#000000",
                        "strokeWidth": 5,
                        "fill": "#ffffff"
                      },
                      {
                        "type": "rect",
                        "left": -175,
                        "top": 190,
                        "angle": 0,
                        "width": 40,
                        "height": 50,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "${ bonusBarOn }"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                    },
                    "responses": {},
                    "parameters": {},
                    "messageHandlers": {
                      "before:prepare": function anonymous(
) {
bonusText = ['']
bonusBarOn = ['white']

// calculate reward
diff = Math.abs(goalsVec[this.parameters.trialN]-points[moveCount[0]])

reward = 100-(diff*2)

// check for DS
ds = 1;
dsMoves = [0,1,1,0];
for (var i = 0; i < 4; i++) {
  if (movesTrial[i]!==dsMoves[i]) {
    ds = 0;
  }
}

// check negative reward
if(reward<0) { 
  reward = 0
}

// check time out
if(moveCount[0]!==4) {
  timeoutText[0] = ['zu langsam']
  reward = 0
}

// width of bonus bar
rewardWidth = reward*2;
rewardLeft = -300-diff*2;

// check for bonus, based on DS
if (ds===1) {
  if (bonusVecTrain[this.parameters.trialN]===1) {
    bonusText[0] = ['+ Bonus'];
    reward += 20;
    bonusBarOn = ['#0070d9']
  }
}
}
                    },
                    "title": "Feedback",
                    "timeout": "4000",
                    "tardy": true
                  }
                ]
              }
            }
          ]
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "instrCount": 1
            },
            {
              "instrCount": 2
            },
            {
              "instrCount": 3
            },
            {
              "instrCount": 4
            },
            {
              "instrCount": 5
            },
            {
              "instrCount": 6
            },
            {
              "instrCount": 7
            },
            {
              "instrCount": 8
            },
            {
              "instrCount": 9
            },
            {
              "instrCount": 10
            },
            {
              "instrCount": 11
            },
            {
              "instrCount": 12
            },
            {
              "instrCount": 13
            },
            {
              "instrCount": 14
            },
            {
              "instrCount": 15
            },
            {
              "instrCount": 16
            },
            {
              "instrCount": 17
            },
            {
              "instrCount": 18
            },
            {
              "instrCount": 19
            },
            {
              "instrCount": 20
            },
            {
              "instrCount": 21
            },
            {
              "instrCount": 22
            },
            {
              "instrCount": 23
            },
            {
              "instrCount": 24
            },
            {
              "instrCount": 25
            },
            {
              "instrCount": 26
            },
            {
              "instrCount": 27
            },
            {
              "instrCount": 28
            },
            {
              "instrCount": 29
            },
            {
              "instrCount": 30
            },
            {
              "instrCount": 31
            },
            {
              "instrCount": 32
            },
            {
              "instrCount": 33
            },
            {
              "instrCount": 34
            },
            {
              "instrCount": 35
            },
            {
              "instrCount": 36
            },
            {
              "instrCount": 37
            },
            {
              "instrCount": 38
            },
            {
              "instrCount": 39
            },
            {
              "instrCount": 40
            }
          ],
          "sample": {
            "mode": "sequential"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Instructions_VI",
          "tardy": true,
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Sequence",
            "tardy": true,
            "skip": "${ (instrEnd[0]) }",
            "content": [
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 420.65,
                    "height": 197.89,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Während des Experiments haben Sie ein\nZeitlimit von 6 Sekunden für Ihre vier Züge.\n\nÜberschreiten Sie dieses Zeitlimit, d.h. \nSie sammeln weniger als vier Kreise in \n6 Sekunden, dann bekommen Sie für \ndiesen Block keinen Gewinn.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n09_display_end.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 114.83999999999999,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n09_display_end.png": "embedded\u002F7645a3cb89bb8236d02a1ed756559d0cd1d112503754dbfdc1b8b45df68b4563.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png",
                  "vor.png": "embedded\u002F5bfe965230d053b438d5a5f14eaa7d9a52f504cef8ac8fd07b5955d375b5090a.png"
                },
                "responses": {
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_1",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===1)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 454.97,
                    "height": 226.72,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Das Experiment ist unterteilt in 16 Abschnitte \nmit je 20 Blöcken. \n\nInnerhalb dieser Abschnitte ändert sich die\nAnordnung der Punkte auf dem Spielfeld nicht.\n\nAuch die Standardzugfolge ändert sich \ninnerhalb eines Abschnittes nicht.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -940,
                    "top": 325,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "data:image\u002Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAB4MAAADsCAYAAAB+BABqAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuVgAALlYBcQIutwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7N15nBTVuT\u002F+Ty29zw4zwyzAsK+yqghCJCrKYvCqqLlE0RiXSELUq9EkXuOaxZi4RuNN3K65in5j1J+ioGiiIioIiiwyLOIMCLMyS0\u002FvXV31+6MXmmGEGeb01HTP5\u002F169Wuqe6pPPQ1dUM95Tp0jgYiIiPqifAB5sYcKIBeABUAWABsAZ+xhi71mie0jx96rAMhJek9c++dxdgCODl6Pt91eKwC93WsGgJYO9tUAtHXwPAjAB8APIADAAyAMwA0gAqA5dozW2OuepPd4Ysdqjb2XiIiIiIgoTsahfCof0ZwqG4dyKQeiOVBncqn2uVK8jfZcAKwdvJ4Ta7O95g5eiyCaD7UXz4PiQgC8OJRLeWOvdSaX8sW23YjmVC2xfYiIiMgkktkBEBER0XGxACgG0B+HOiGO9sht95w6L4BDnRjf9mhGtCMk+bUadNzRQkRERERE5rMDKAJQiG\u002FPm74tt8oxId505sWhwbadza2aEM2pfB20R0RERF3AYjAREVHv4gJQhmihtxTAAAAlsUdx7HdFsUc6io8wby8+ejwPR16fxEfOpyMfoh0YtbHHAQB1APYDqI\u002F9rIttt78TmoiIiIiIui4X0VwqOX9qn2MNAFBgVoDdFL9btz0Ponft5nbwu2+bwSkdeHAob4rnUzU4lGfFX2swK0AiIqLejsVgIiKinmMFMAhABYAhST\u002FLcaijwpXiGJKnP26RJKkVgE+SJD+ixdj49F9tiE633AJAj+0XkSTJrapqWJIkjyzLAUVR\u002FKqq+q1WazD5IKqqRq688sqU3hX78ssv2+rr64+YPs3n8+UZhiFrmpYLQA2Hw9mGYVgR\u002FbN1GIZhw6Ep1rJxaJpsxTCMXMSKz4ZhxKfSjt8d0NHUa6JEEO3AiHdmVMUeXyf97GiaNyIiIiKivsSOI\u002FOpCkRzqRJEi7wdLU8jUnz64+ScKiBJkg8d5FKxfSKx18OSJHlUVQ1IkuRXFMUny3LQarV6VVU9bCplu90evvzyyz2p\u002FCDLly93tLa22pNf03VdDgQCObquq5FIJBuANRwOuwzDiE997YzlV4flUojlTIZhZCM2NbZhGMl3U+en8rMg+mcfH3Bbi0N5VHJO1fYt7yUiIspoLAYTERGJJQEYDGAUgNGxn6MAjEC0g0IWcIwwgAZJkvYDaIx1PrQAaJFluVWSpJb4Q5blFqfT2ZKVldV68sknt5x55pmagOP3SQ8\u002F\u002FHB2Y2NjbltbW56u63m6ric6NwzDyNN1PTe+DaCfYRhFiHZIibqruRXAHgA7Yo\u002FKpG1OnUZEREREmUJFtMA7GofnVMMRvb4WIQCgXpKkAwAOSpKUmKY4llPF86pWWZZbXC5Xc3Z2dus555zTMn78eM7oc5zuu+++vNbW1lyv13tYTpWcT+FQTlVgGEZ8pqyO1lA+HgcRzakqcXg+tQvRwdFEREQZicVgIiKi45cHYCKASbGfEwGMwfGPRPfEOiPqJEmqkSSpXpKkGlVVa2VZrrNarQeKiorq77nnHk5\u002FlUYee+wx55YtWwYEg8EBkUikWNO0EsMwigzDKNN1vQhAiWEYxYhOX3c8gwUMAHsBbAHwBYBNscdXsd8REREREfVWhYjmU\u002FHHBAAjEZ3F53g0S5JUi1ihV5blBgDfqKraoCjKAYvFUldWVlZ3++23NwmJnnrEAw88kFVZWVkaDoeLNE0r1TStCECJrusDYrlUPKcqPM5DRBC9ezieT8V\u002F7hUQPhERkelYDCYiIuocFcBkADMAzAQwFdEpyTrLAFArSVKVJElVsixXSZJUbbVaq2w2276xY8fWXHTRRby7sw\u002FbunWrsnr16sLGxsYyTdMGh8PhCsMwBuu6XgFgsGEYFYhOy9ZZbYh2YnwEYG3sZ6PouImIiIiIOskO4EQAp8YeUxFdw7ezIgAOxHKqalmWq1RV\u002FVpRlGqHw7Fv0qRJdQsXLuxoLV3qI9asWWNZv359YVNTU3k4HB6iadpgwzAqdF0fDKDCMIyB6NpAgyYAnyGaS30E4GNEpwknIiJKKywGExERdUxGtKNiHoDTAJyMzq3n2yZJ0i5ZlncqilKpKMoup9O5a9asWbvOPfdcdkxQt9x2223lbrd7ZDAYHKFp2ihd10cCGBHr1OjMdV0looXh1QDeBtchJiIiIqLUsSBa9J0LYBai+VVnCnHNkiTtlGV5h6IoOxVF2Zmdnb3jnHPO+XrWrFnhY7+dqGPV1dXyX\u002F\u002F610FtbW0jQ6HQyFhONcIwjFGIrjd9LBEAWwGsQTSf+hcAbwpDJiIiEoLFYCIiokOyAZwDYD6As3GMKaZio9G3KIryhdVq3dyvX78t9913X1UPxEl0mCeeeCJ748aN4z0ezwRN0ybquj7BMIyxOPqdxBFER7a\u002FCeA1ANt6IlYiIiIiymj9AZyL6KDaOQByjrKvLknSV\u002FGcymazbS4pKdl8zz331PRIpERJHnnkkbwvvvhiUiAQOCESiUzQdX1irEhsOcrbggDeB7ASwKuITjVNRETU67AYTEREfZ0MYDaAywGcj2+\u002F+9cvSdJnFovlY6vV+vEJJ5yw7vLLL+ddldRrbd26VX3xxRfHtba2ztA0bZqu6zMMwyg7yls2APhfAMsBHOyZKImIiIgoA1gQHVB7GYAF+Pa7fz2KoqxTFOUTu93+0SmnnLLhggsu8PRYlERd9P7779vefvvtSW63+5RIJDJd1\u002FVTDMP4tkHjBqKF4f8F8BIAfreJiKjXYDGYiIj6KiuAHwL4BYCKDn6vx4q\u002Fb2dnZ7970UUXfT59+vRQj0ZIJNg999wz8JtvvjktGAyeFYlETgeQ18FuIUQLwncD+KpHAyQiIiKidJIFYBmA6wEUdfD7sKIon1gslrcLCgr+dfXVV28dOnRopGdDJBLr9ttvH15bWzs7FAqdFYlETkPHA8q9AJ4A8HsAtT0aIBERUQdYDCYior5GRvQu4NtwZBE4rCjKapvN9srIkSPfueqqqxp7OjiinrJr1y712WefPamtrW2+pmkXGYZR2m4XDcCzAO4AsK\u002FHAyQiIiKi3sqGaBH4Zhy5tI5fUZTXXC7X69OnT\u002F\u002FXwoUL23o+PKKesW7dOttrr7020+v1zg+HwxcCyG+3iw\u002FAXwD8FkBTjwdIREQUw2IwERH1JeUA\u002Fg\u002FAackvSpK0zW63\u002F9\u002FYsWP\u002FcdlllzWYExqReQ4cOKD87W9\u002Fm+12u\u002F8zHA4vRLSDL84N4CeInjtERERE1LeNQ3QWmROSX1QUZZ3D4Xhu9uzZL5911lksAFOf8\u002Fnnn9v++c9\u002Fnu31ehdHIpGzER2IHleD6KD0t00JjoiI+jwWg4mIqK8YDWA1ogVhAIAsy9tyc3N\u002F++tf\u002F\u002FpNp9NpmBcaUe\u002Fx2GOPlW\u002Ffvv2mUCj0A0TXf4u7A8Cd5kRFRERERL3ALACvA8iNv6AoykeFhYW\u002FufPOO9eaFxZR7\u002FLHP\u002F5x9Ndff\u002F0LTdMW4lBRWANwDYCnzIuMiIj6KhaDiYioLygEsB6xaaElSWrNycn55S9+8YsX7HY7i8BEHXjiiScqKisrH4pEIt9JevkaAH81KyYiIiIiMs1oAB8hNg2uJEk1+fn51912222rzQ2LqPe6\u002F\u002F77J+zfv\u002F9RXdfHx16KAPgegJUmhkVERH0Qi8FERNQXvAzgPACQJOmbcePGnbd06dKvTI6JqNdraWmR77zzzt8Fg8GrYi\u002F5AUwBUGliWERERETUs1QAHwM4EQBkWd4yY8aMRYsXL+YSO0THsHXrVttf\u002F\u002FrXv2madk7spXoA4wHw\u002FCEioh7DYjAREWW6MxGdHhoAAiNHjpxz8803f2lmQETpJBAISNdff\u002F3\u002FaZo2N\u002FbSGwDOOdp7iIiIiCijXIXY7DCSJDXMmjXrtCVLltSZHBNR2ti6davt4YcfXqnr+sTYS38GsMzMmIiIqG9hMZiIiDLdWgAzACArK+vu3\u002F\u002F+9w+ZHA9R2vnnP\u002F\u002FZ\u002F7333ltvGEZO7KVTAKwzMyYiIiIi6hFWALsADAKAgoKCK++6665XzQ2JKP08\u002FPDDY3bu3PkeAAVAEMAIAPtMDYqIiPoMFoOJiCiTzQPwJgBIklR\u002F7bXXnjhx4kS\u002FyTERpaX\u002F+q\u002F\u002FusXr9d4Ue\u002FoWgLlH25+IiIiIMsJPEL2LEbIsb3nwwQfPsNlshskxEaWlZcuWPRoKhS6KPX0cwLVmxkNERH2HanYAREREKXRDfCM7O\u002FuRE088MQAOhCI6LvPnz\u002F+fl1566UrDMPIAnI3oOldbTQ6LiIiIiFJHAnB9\u002FElxcfF9WVlZ8deJqIsmTJjwpw0bNpyPaJ\u002F8DwHcCqDJ3KiIiKgv4MUbERFlqoEAqgDIkiS1\u002FuxnP5swevTogMkxEaW1G2+88b99Pl98bas\u002FAvi5mfEQERERUUrNBLAGAGRZ3nX\u002F\u002FffP4l3BRN1z3XXX\u002FTUUCp0be\u002FoTAI+ZGQ8REfUNvDOYiIgy1RIAMgA4HI7\u002Fb\u002Fz48UFwEBRRt4wbN+6FTz\u002F9NF4MvhTALwFoJoZERERERKlzeXwjJyfnBZfLBTCnIuqW4uLiF\u002Fft2xcvBl8GFoOJiKgH8AKOiIgy1Q4AIwFg9OjR37vllls2mBwPUUa46qqr3tA0bUrs6QLE1uUmIiIiooziBFADIAdAZM6cOScuXry41uSYiNJefX29+otf\u002FGKDYRjFsZfGAthuZkxERJT5eGcwERFlovGIFYJlWd5zww03bAyFQhwA1UXr1693+Xw+9cCBA9mapiktLS25hmHIfr8\u002FW9d1SygUchmGYdU0zaFpmsMwDGskEnEBsMTb0HXdbhiGrX3buq5nI3bn9tHIsuxFB3eeKorS2u65G4BusVhaYz\u002FbJEkK22w2ryzLIbvd7nc6nX6r1Rrq37+\u002F1+l0hk866aQ2l8ulH8cfTZ+Wm5v70sGDB+PF4PPBYjARERFRJjoT0UIwLBbLmkWLFtUxp+q6tWvXZofDYXnfvn25uq7Lra2tObquq4FAwBWJRGzhcNihaZrdMAybpmkuwzDUSCSSDUCJt6HrutMwDEv7tnVdz0EnbvSRZbkNwGF5jyRJeuz1BEVRWiRJMlRVdQMIWywWnyzLQavV6rfZbH5FUUJZWVleVVW10tJSt6qq+uzZsw\u002FLy+jY8vLyIi6X62WPx3Nt7KXzAfzGzJiIiCjzsRhMRESZaH58w+l0rlJVtc92Wqxfv961devWAY2NjQV+vz8nFArlhsPhHE3TciKRSG4kEsnRdT1X1\u002FUcwzBydV3PNQwj2zCMHGT4dcLy5cshSZJHkiS3LMtuSZJaZVl2y7LcKsuyW1EUt6qqraqquq1Wq9tut7uzs7MPlpSUHJw7d25jXy0kT5s2beWbb775G0Q7nubHfnLtOCIiIqLMksip8vPzV\u002FblnGrNmjU527ZtK25tbS0IBAI5wWAwV9O09jlVTiyXyonlVnmxnCqj\u002F9xiOVVbPJdKyqnciqK0yrLsVlXVbbFYWmM5VWt2dnbzkCFDGufPn99odvxmKSsre2vHjh3xYvA8sBhMREQpltEXJERE1Gf9G8BsABg1atRFN91008fmhiPeG2+80X\u002F\u002F\u002Fv39GxsbBwQCgcJAIFAcCoUKdV0v1DRtQCQS6W8YRrFhGE6zY81QEVmWG2VZrlcUpV5V1UZFUWptNluj0+msdTqdjWVlZbUzZ86sLysrC5kdrGjXXnvtW5qmjY09nQxgk5nxEBEREZFwVQAGA8CZZ545\u002FeKLL\u002F7G3HDE8vl88jvvvNN\u002F\u002F\u002F79RU1NTcU+n69\u002FOBweEAqF+muaNkDX9f6RSKTYMIyijmY6IiHCsiw3KopSJ8tyg6qqdYqiNNhstgaXy1XrcrkaBw4cWHvaaac19O\u002Ff\u002F4jZotJZa2ur8vOf\u002F\u002FxzwzDyAUQAFAM4aHJYRESUwTL6jh8iIuqTcgCcCgCSJHkuueSSDek4nZnf75dXrVpVsnfv3sHNzc0VwWBwcDAYrIhEIhWRSKTCMAxHqo5ts9mQn5+PrKws5ObmQlVVZGdnw2q1wuVywW63w+FwwOl0wmazISsrCxaLBTk5OVAUBfn5+Ue0GX9Pe\u002FH3tud2uxGJRA57Tdd1tLYeOQuZz+dDMBiEx+NBOBxOvLelpQWRSAStra3QNA1tbW0IhULwer0IBALweDxoaWnpsM1OUHRdL9Z1vVjTNASDwSN22L59O9555x1dluUaRVGqrVZrldVqrcrOzq4uLCysOuWUU6rGjh3rP56Dm83pdP7b7XbHi8HzwWIwERERUSYZj1ghWFXVneedd97+dMypmpqa1Hfffbds7969g9va2ioCgUBFKBSq0DStIhKJDAJgTdWxnU4n8vLykJWV1eVcSpZl5ObmdtimzXZkXTr+3vaam5uPeC2eF7XXPpdqbm5O5F8d5VJ+vx8+ny+RU3XUZidYdF0v0XW9BMBhOVVDQwMAYNu2bVi1apUmy\u002FJ+i8VSrapqlc1mq8rJyakqLi6umjNnzt6SkpK0G3zrcDh0u92+xu\u002F3L0R0SvCzACw3OSwiIspgLAYTEVGmOR2xNWttNtuHRUVFEfTimTCamprUV155ZcS+ffvGejyeMeFwuCIcDg8R0TmRlZWFsrIyFBUVobi4GAUFBcjLyzvmo6OibSYzDAMtLS1obm5GS0tLh4\u002F475qamrB\u002F\u002F37U1dWhvr4eun7MmaJlXdfLdF0vC4fDM7xeL5qbm7F3715s3LgRsizXKYpSZbVaq+12+86CgoIvp02b9uWsWbOO7LnpRQYOHPjetm3bfhJ7ejaA35oZDxEREREJdVZ8w+FwvNfbp4jevXu37e233x5VV1c31uv1jg6FQkM0TRsciUQGopt9n3l5eSgpKUFxcTGKi4sTOVN+fv5hOVT751ZryurMvVJ8MG5yTvVt+VVjYyMOHDiA+vp61NfXd6Z5Vdf1wbEB0t\u002Fxer1oampCVVUV1q1bp8uyXGOxWKpUVa12OByVxcXF22fOnPnllClTPKn+3N2Rl5f3XqwYDERzKhaDiYgoZXr1xRwREdFx+BOA\u002FwKA4uLi\u002F77tttv+z+R4DvPiiy9W7N69e6rb7T4xGAxO0DRtJGLF687KysrCkCFDUF5ejuLiYpSWlqK4uBglJSWJjorS0lK4XK4UfQoCoh0e9fX1qK2txYEDB1BXV4f9+\u002Fejvr4+8by6uhr79++HYXRtSd1Yh8Y2p9P5WUlJyYY5c+ZsHjFiRCBFH6XLmpub1V\u002F\u002F+tdfGIbhAhAAkAsg7UbkExEREVGHXgHwHwAwfPjwJddff\u002F0HJseT4Pf75Zdeeml4VVXViW1tbSeGQqHxmqYNRReLvvn5+aioqEBZWVkifyoqKjrs+YABA2C321P0SQgAwuEw6urqEvlTTU0NampqDnvt66+\u002FRl1dXVebNmRZ3me1WrdmZWVtLC0t3XDhhRduy8\u002FP7zXTTa9atap4xYoV62JPvwIw3Mx4iIgos7EYTEREmWYdgJMBYPr06XOXLFmyw8xgVq9eXfjJJ5\u002FMbm5uPi0YDJ6s63phZ96Xn5+PYcOGYfjw4Rg+fPhh2wMGDEh12CSQ3+\u002FHV199hd27d2P37t2Hbe\u002Fbt++I6bC\u002FRdhisWx2uVwfVlRUvHfZZZdtttvtx7wtOZWuu+6650Kh0IzY0+kAPjEzHiIiIiISQgJQC6AIQOTqq6+ePHny5OOaA1iUV199deDnn38+2+12nxYMBk80DOPIOZQ7UFhYmMih2udV\u002Ffr1S3XYJFBbW9sRuVT8eWcH30qS5LdYLJ9nZ2evGTly5HtLliyp7IHQj+onP\u002FnJB7quD4w9LQVQY2Y8RESUuVgMJiKiTOIA0ALAKkmS+6GHHpricDh6vGD25ptvDlizZs1\u002FtLa2zg+Hw+NwlP9v8\u002FLyMHHiREycOBGTJk3C2LFj2TnRh4RCIXz99dfYsWMHNm\u002FejC+++AKff\u002F459uzZc9QODVmWm51O57uDBw9+5Zprrllnxvf85ptvvqG5uXlZ7OlNiN6VT0RERETpbRSASgCwWCxfPvbYY+eYEcQLL7xQ8dlnn53vdrvnRSKRYUfbt7CwEJMmTcKkSZMwceJEjBkzBsOGDetw3V3KPPHBtzt27MAXX3yBTZs2YdOmTdi3b99R3yfLcq3L5Vo9atSof15zzTWbeyjcw1x33XX3+3y+\u002F4g9vQDAy2bEQUREmY\u002FFYCIiyiSzAfwbAOx2+\u002Fv333\u002F\u002FFT158AceeOA7+\u002Fbt+2EgEDgVgNL+97IsY+zYsZg5cyZOPfVUzJgxA0OHDu3JEClNuN1ubNiwAR9++CE++ugjfPzxx3C73R3uK8vy\u002Fry8vP93wQUXPDt58uSOd0qBBx544Du7du16Ovb0ZUQ7L4iIiIgovV0B4EkAyM7O\u002Fvu99957R08dOBAIyA8++OD82traS0Oh0FR00G+pqiomT56MU089FaeeeiqmT5+OsrKyngqR0sjBgwexbt06rF27Fh9++CE+\u002FfRT+P3+DvdVFGV3v379nr\u002F00ktfHDZsWI8tz3PXXXf9oLa29q7Y0z8hOsiWiIhIOBaDiYgok\u002FwSwG8BoH\u002F\u002F\u002Fg\u002F85je\u002FebQnDvrnP\u002F952o4dO24MhUJT2v+uuLgYc+fOxbx58zBnzhwUFBT0REiUYSKRCDZu3Ig333wTb775JjZu3AhdP\u002FxmYEmSWvv16\u002Ff0j370oyeGDh2a8g6Mzz\u002F\u002FPOfxxx\u002FfAEBGdCrBklQfk4iIiIhS7m8ArgSAioqK\u002F\u002FrlL3\u002F5Wk8c9N577z17375914fD4RHtfzd48GDMmzcP8+bNw+mnn46srKyeCIkyTDgcxtq1a7Fy5Uq8+eab2Lp16xH7yLJcX1RU9NjPf\u002F7z5VlZWZ1az6c7nnnmmTEff\u002Fzx67GnHwOYcbT9iYiIjheLwURElEn+AWARAIwbN+6yG2644aNUHszj8Sh33333soMHD16LaEEMAJCTk4NFixbh8ssvx8yZMyFJ\u002FO+WxKqpqcHzzz+PZ5555ohODIvFUnnGGWf8dNGiRdWpjuPaa69dFQ6H49P2lQE4kOpjEhEREVFKbQQwBQAWLFhw+nnnnXf0uXa7qbq62vbQQw\u002Fd7na7L0x+vbCwEIsXL8aSJUswZcoRY26Jum3Pnj149tln8eyzz+Lrr78+7Hd2u\u002F3jCy+88IbTTjvtYCpj8Hg8yg033PC5YRgOAD4AOQBSXoQmIqK+h73TRESUSXYDGAYAS5YsmTZjxozmVB1I0zTplltuecDr9c6Pv1ZcXIxbbrkF11xzDZxOZ6oOTXSYjz76CHfccQdWr16deE2SpLZZs2Z9f\u002FHixbtSeewbb7zxT16v93uxpwsAvJnK4xERERFRSlkAtAGwSZLkfuSRR05SVdVI1cFqa2stv\u002F3tb\u002F+ePMPS0KFDcdttt+EHP\u002FgBLBZLqg5NlGAYBlauXIk77rgDn376aeJ1WZZrLrrookWzZ89uSOXxf\u002Fazn70YCoUmx56OBbA9lccjIqK+ST72LkRERGkhB8BQAFAUpWbmzJktsixLqXrcc889P0ouBC9btgx79uzBDTfcwEIw9agZM2bg7bffxurVq1FSEp2p2TCM7I8\u002F\u002FviRnTt3ZqXyPHC5XJVJoUwy50+AiIiIiAQZC8AGADabrdJqtSKV15IPPPDArfFCsKqq+M1vfoPKykpcfvnlLARTj5EkCfPnz8f69evx\u002FPPPIycnBwCg63rJq6+++oDf71dTeR7Y7XbmVERElHIsBhMRUaaYgNiMF1artVJRFClVj5deemlYbW3tjfEDP\u002Froo3j44YdZBCZTnXnmmfjss89QUVEBAAiHw0OfeuqpG1N5LpSUlCSPWp9oygcnIiIiIlES13N2uz2lOdWjjz56amtr62IAkGUZr776Kn71q1+xCEym+s\u002F\u002F\u002FE+sW7cOeXl5AIBAIHDyvffee1kqz4Xc3FzmVERElHKq2QEQEREJkhhB63K5KgOBQMoGPK1du\u002FanABQAuOSSS7B06dJUHYqoSwYMGIAXX3wRM2bMQCQSQWtr64UrVqx46swzz6xJxfGmTp1a+cUXX8SfchQ7ERERUXpLFKJyc3N3pDKn2r59+3Xx7VtvvRULFixI1aGIumT06NF44oknsGjRIgBAfX39VV9++eU\u002Fhg4d6kvF8crKynbs25dYmps5FRERpQTvDCYiokxxQnyjX79+O1M1avfVV18d4fV65wKA3W7Hvffea94nJurAySefjB\u002F84AcAAMMwrP\u002F617+uSdX5cPLJJ7cqilIXO\u002FRwAC7TPjgRERERddeE+MagQYNSllM9\u002Fvjj3wmFQhMBoKSkBL\u002F85S\u002FN+8REHbjgggswa9YsAICu6wXPPffc4lSdD6effvpuAJHYoXlnMBERpQSLwURElCnGxDeGDRu2O1Xr+WzYsOEixP7\u002FvOaaa1BaWmraByb6NrfddhtUNToBjNvt\u002Fl5VVZUrVeeE1WrdEzusDGCkaR+aiIiIiLornlPpZ5xxxp5UXT\u002Fu2bPn4vgBb7nlFjgcDpM+LtG3u\u002FPOOxPbDQ0NFxuGIafifKioqAhaLJb9sUMNAJBvygcmIqKMxmIwERFlitGxn5FTTjllfyQSkUQ\u002FGhoaLK2trfPjB7z22mtN+qhERzd8+HCcffbZAADDMBwvvvjiWak4JyKRiGS3279OOvQocz4xEREREXVTNoBSAFAUpaa4uDiUimvHdevW9fP5fLMAwOVy4YorrjD1QxN9m+9+97s44YToBGSRSKTs6aefnpqqnMpqtSbnVBxgS0REwrEYTEREmaAAQCEAWCyWb4qLi7VUjNhdvnz5d3RdzweAmTNnYtQo1r2o97r88ssT27W1tQtTdWdHTk5OVdJhR7ePg4iIiIjSwigAEgDYbLaqVF07vvXWWwsMw1AB4Pzzz0d2drapH5roaC699NLE9o4dO85N1Xlht9urkg7LnIqIiIRjMZiIiDJBIlmy2WxfpypB27t37xnx4yxZssScT0rUSd\u002F73veQnx+dYczv95+4efPm\u002FFScF0VFRdVJh+UICSIiIqL0lMipHA5HynKqgwcPMqeitHHJJZdAURQAQFtb23c17jQTdAAAIABJREFUTVNScV7k5uYypyIiopRSzQ6AiIhIgESy5HA4qiKRiCT6AJFIRPJ6vacCgCRJWLhwoehD9HptbW3Yv38\u002FGhoa0NjYiIaGBoTDYXg8nsP2y8rKgsViQU5ODoqKilBYWIj+\u002FfujpKTEpMj7JpvNhrlz52L58uUAIK9evXrGCSecsFL0cUaOHFn16aefxp9yFDsRERFRekrkVDk5OdWpyKl27tzpCgQCE2PHwGmnnSb6EERClZSU4KSTTsInn3wCXdfzli9ffsIll1yyWfRxCgsLq\u002Fbs2RN\u002FypyKiIiEYzGYiIgyQaLjIjc3t1qWZeEdFy+++OLYSCTSDwCmTp2K4uJi0YfoNTRNw5YtW7Bu3Tps3LgRO3bswK5du1BbW9utdu12O4YNG4Zhw4Zh1KhRmDJlCqZMmYIRI0ZAkoT\u002FlRGAefPmxYvBqK+vnynL8irRx5g5c2bD888\u002F7zMMw4no+lYyAF30cYiIiIgopRI5VXFxcUpyqpUrV54anyL67LPPhsViEX2IhLa2NmialrL2jyU+QJbS37x58\u002FDJJ58AAHbt2jVTluUtoo8xderUqnXr1sWfshhMRETCsRhMRESZYFh8o7CwcF8qRrHv2LFjRnx77ty5ops3XWVlJVatWoVVq1ZhzZo18Pl8wo8RCASwbds2bNu27bDXc3JyMGPGDHz3u9\u002FF6aefjsmTJyem4qLumTt3LmRZhq7rcLvdM0KhkKwoiiH6OFardW8wGBwNwAlgAIADoo9BRERERCk1NL4xfPjwlORUNTU1PZZTzZkzB0nFNVM5HA7k5uYiLy8Pubm5yM3NRXFxMcrLy1FWVoZBgwZh0KBBGD16NGw2m9nhUjvz58\u002FH7bffDgBoaWk5NRKJPC76GCeccEKLLMttuq5nAxiC6PrdwvM2IiLqu1gMJiKiTDAkvjFixIgDqRjF3tLSMiW+PWfOHNHNm6K6uhrPPfccnnvuOXz55ZemxeF2uxOFaAAoKCjAwoULcf7552POnDmw2+2mxZbuCgsLMXHiRHz++efQdT3\u002F7bffrliwYEGV6ONYrdaaWDEYACrAYjARERFRuhkKAJIkhaZNm9aYipzK6\u002FVOjm9nSk7VGX6\u002FH36\u002F\u002F5gzLSmKgmHDhmH8+PGYOHEiZs6ciVNOOQVOp7OHIqWOTJkyBQUFBWhqakIwGBx94MABZ3l5uV\u002F0cSwWy4FgMDgKgB3RAbY1oo9BRER9l2x2AERERAJUAIAkSeF4x4XIh6ZpSiAQOAEArFYrTjrpJFM\u002FbHcYhoG33noLc+fOxZAhQ3DrrbeaWgjuSFNTE5555hksXLgQRUVF+OEPf4i1a9eaHVbaOvXUUxPblZWVE0WfH7IsSw6HI7n4O+TIKIiIiIioF8sBkA8AFoul1m63G6KvFzdt2lQQDocHAcDgwYMxcOBAUz9wbxSJRLBz5068\u002FPLLuP3223HGGWcgLy8P06dPx913333EDEvUM2RZxvTp0+NPlXfeeWd8KnIqq9XKnIqIiFKGxWAiIkp32QD6AYCqqrWKohiRSEQS+XjttddG6LqeBUTXC3Y4HKZ+4OOh6zqWL1+OcePGYe7cuXjrrbdgGL1\u002F1qm2tjY888wzmDlzJsaMGYMHH3wQbW1tZoeVVmbMSMzGh4aGhkmiz49IJCK5XC52XBARERGlr8T1m9VqPZCK68W1a9dOQnTq28MGK9LRhcNhfPLJJ\u002Fj1r3+N8ePHY8yYMfjd736HxsZGs0PrU5Jzqr1796Ykp+IAWyIiSiUWg4mIKN0d1nGRihG6u3fvnhg\u002FRjp2XKxatQpTp07F4sWLsX37drPDOW6VlZW44YYbMHjwYPzqV7865jRrFJX8nfV6vRNScY7069ePHRdERERE6Stx\u002FWaz2VKSU9XV1SVyquTCGnVNZWUlfvWrX2HQoEG48sorsWfPHrND6hOSc6rW1taU5FQulyt5WmjmVEREJBSLwURElO4SSZLdbq8xDEMW\u002FWhpaYmvhYpp06aZ8ymPQ01NDZYsWYJ58+Zh06ZNZocjTHNzM373u9\u002FhySefNDuUtDBo0CCUlJQAAEKh0KC9e\u002Fe6RJ8jAwcOTK7Ms+OCiIiIKL0krt+cTmdtKnIqj8eTyKlOOeUUcz5lBvH7\u002FXjyyScxevRoXHfddWhtbTU7pIx20kknQVEUAIDf7x+dinOkoKCAxWAiIkoZFoOJiCjdDY5vOJ3OmlRM1+T1ekfGjzF58mRzPmUX\u002FeUvf8GoUaPw97\u002F\u002F3exQUsJut+Pqq682O4y0kfS9lT\u002F66KPhos+RiRMn1gKIzzvOjgsiIiKi9JLIqfLy8mpTkVMFAoHhAKCqKsaNG2feJ80w4XAYDz\u002F8MMaPH481a9aYHU7GcjqdGDky2i0QiUQKNm7c2F\u002F0OTJw4EAWg4mIKGVYDCYionRXHt\u002FIzc2tFz1Vk8\u002FnU4PB4FAAyMnJwdChQ837pJ3Q2tqK73\u002F\u002F+1i6dGlGr627ePFiFBYWmh1G2pg0aVJie9++faNEnycDBgwIKooSvx2hFLH14IiIiIgoLSRyqv79+9eJvlZcv379gEgkkgcAY8eOhd1uN++TZqhvvvkGp59+Ov7whz+YHUrGSs6pNm3aNFL0eTJ27Nj6pMOV9vwnJCKiTKaaHQAREVE3DYhv5OXlNcmyLLQI9eGHH1YYhmEFgIkTJ0KSem+Na\u002FPmzVi4cCGqq6vNDiXlfvrTn5odQlqZODGxRBuam5uHiz5PAEBV1aZYJ58VQD6AJtHHICIiIqKUSORUZWVlB0VfK27dunVEfDu5oEZiaZqGW265BQ0NDbjvvvvMDifjTJw4EcuXLwcA1NfXj5RleZ3I9isqKvyyLPt1XXcAKBHZNhEREYvBRESU7hJJUmFh4cFIJCK042LPnj3D4tsTJkwQ2bRQb7\u002F9Ni666KI+sVbUaaedljbTdfcWyZ1uPp9vuOjzBABUVT0Yv4se0fOSxWAiIiKi9JDIqUaMGNEi+lqxvr4+LXKqTPHHP\u002F4Rsizj3nvvNTuUjJKcU7W0tAxLVU4VCoXKAeQAcAHwij4GERH1TSwGExFRukt0XAwZMqRZ9Cj25ubmgfHt0aNHi2xamGeeeQZXXXUVNE0zO5QesWzZMrNDSDvDhg2D1WpFKBRCMBgsT8WdwTab7aDXm+irKAGwTfQxiIiIiCglBgCALMueAQMGBCF4yQ+fz5eYhrq35lSZ5g9\u002F+APGjx+PSy+91OxQMsaoUaMS26FQKCU5lcViiReDgeh5+ZXoYxARUd\u002FEYjAREaW7AQAgSVJ45MiRHtEJmd\u002FvL4tvDx8+XGTTQvzv\u002F\u002F4vfvSjH0HXdbND6RGDBw\u002FGueeea3YYaUdRFAwePBi7du1CJBLJ27dvX9bgwYOFjjK32+3JdwIP+NYdiYiIiKg3yQXgBACLxSJ82R0A8Pv9iWJwb8ypMtXSpUtxyimnYMSIEcfemY5p0KBBsNlsCAaDCAQCqSoGt8+pWAwmIiIhWAwmIqJ0ZgVQAACKojQBgOipmnpzMfj555\u002FHFVdcYUoh2GKxoLS0FHl5eXA4HMjKygIAeDwehMNh1NXVoaamBpFIROhxly5dClXl5cvxGD58OHbt2gUA2LRp08Dy8vIdItt3Op3NSU+5xhURERFRekgM4lNVVfiyOwAQDAbLAECWZVRUVIhunr6Fx+PBDTfcgBUrVpgdSkaQZRlDhgxBZWUldF3P3r59e+7IkSPdIo\u002FRboAtcyoiIhKGvalERJTOBiA2hZnVaj2YipG5gUCgHABUVcXgwYNFN3\u002FcPvjggx4rBNtsNkybNg3f\u002Fe53MW3aNAwfPhwVFRWwWCxHfZ+maThw4AAqKyuxceNGfPbZZ1izZg3q6uqOKw6n04krr7zyuN5LwIgRI7By5UoAwP79+8tlWd4psv3s7OyDSU95ZzARERFRekgUnGw2m\u002FCcqqGhwa5pWj\u002Fg0J2V6SArK+uwaYG7Kj5Itrm5GZqmoa2tTWB0nffGG2\u002Fgrbfewtlnn23K8TPNiBEjUFlZCQCorKwsHz169HaR7TscDs62REREKcFiMBERpbNEx4XVaj0oSZLQjosDBw44IpFIPhCdnvhYxc+esnPnTpx33nkIBoMpO4aiKDjrrLPwwx\u002F+EOeccw4cDkeX21BVFYMGDcKgQYNw1llnAQAMw8Bnn32GVatW4aWXXsKmTZs63d6ll16KgoKCLsdBUcOGDUtst7S0lIk+XwoKCjiKnYiIiCj9JK7bHA5Hk+hrxM8++6wMsQG8vW2mpaOZMGEC1q5dK6y9UCiE6upq7NmzJ\u002FH46KOPsH79emiaJuw4Hfnd737HYrAgyd\u002FhmpqaMkmSKkW2n5WVxZyKiIhSgsVgIiJKZ4mRsjabrVnXdaEdF59\u002F\u002FvnA+HZv6bgIBAJYtGgRmpqajr3zcbDZbLjmmmvw85\u002F\u002FHOXl5cd+QxdJkoSpU6di6tSpuPXWW7F9+3YsX74cy5cvx+7du4\u002F6vmXLlgmPpy9J\u002Fg57PJ4y0edLcXFx8jTRHMVORERElB4S1212u71J9DXi3r17uV4wAKvVihEjRhyxfq\u002Fb7ca\u002F\u002F\u002F1vrFy5Ei+88AJaW1uFH\u002FuDDz5AZWUlRo8eLbztviZ5gG1zc\u002FNA0edLbm4ucyoiIkoJ2ewAiIiIuuGwUeyyLEsiH\u002Fv37+916wXfeOON2LJli\u002FB2JUnCZZddhp07d+Khhx5KSSG4I2PGjMFdd92FXbt2Yd26dVi2bBlycnKO2O+MM87AuHHjeiSmTJX8Hfb5fOWiz5eRI0dyFDsRERFR+klct+Xm5grPqZqamhI5VXIhjaJycnJw7rnn4vHHH8f+\u002Fftx3333CZ8NyTAMPP3000Lb7KuScyqv11sq+nwpLi5mTkVERCnBYjAREaWzxEjZ7OzsZsMwZJGP5ubmREW0N3RcrFixAo899pjwdktKSrBixQo888wzGDRokPD2O+vkk0\u002FGww8\u002FjG+++QaPPPLIYWt0\u002FexnPzMtrkwxZMgQqGp0UphgMFgq+nwpLS0NyLIciB2Oo9iJiIiI0kPiui03N7dF9DWix+PpdQNseyuXy4WbbroJX375JebPny+07bfeektoe31VuwG2ZaLPl4EDB\u002FLOYCIiSgkWg4mIKJ0dNopd13VJ5MPtdpfG2ze746KtrQ1Lly4V3u5ZZ52FLVu2CO9s6I7s7Gz89Kc\u002Fxfbt27Fy5UpcccUVWLBggdlhpT2LxZIo9muaVnDgwAGn6HPGYrHER7LnAXCa9mGJiIiIqLMSOVVRUVGz6OtDv9\u002FPYnAXFRcX4\u002FXXX8fVV18trM3Nmzejrq5OWHt9VUVFBaxWKwAgEAiUiT5fRowY4ZYkKb6INO8MJiIiYVgMJiKidJYYKVtYWNgsCebz+XpNMfi2227Dvn37hLZ52WWXYcWKFejXr5\u002FQdkWRJAlz587Fk08+CVnmJYsIyWuUbd68uVz0OWOxWJJHshf3\u002FCckIiIioi5K5FRDhw5tEn196Pf7S4Hotf3QoUPN+5RpRpZl\u002FOUvfxE2KNYwDHzyySdC2urLFEVBRUUFACASieRWV1dnizxfVFWFoijxhaMLAShmfVYiIsosqtkBEBERdUNipGxZWVmzruuSyMbD4XBhfDue8Jnhyy+\u002FxJ\u002F\u002F\u002FGehbd588834\u002Fe9\u002FD0kS+kdGvdyQIUMS27W1tYW6rn8lsn2r1dp+jauvRbZPRERERMKVAIAkSeHy8nKfyJxK13VJ07R+QPRuV6eTE8d0hSzLeOqppzBq1Ci0tLR0u72dO3cKiIqGDBmS+LPcs2dP4aBBg7wi27dYLE2x80YBUASgRmT7RETUN\u002FE2GyIiSmfxOw+NIUOGuEWOyJUkSQqHwwUAkJ+fD4fDYdqH\u002FO\u002F\u002F\u002Fm9EIhFh7V1yySUsBPdRAwYcWnaqra2tn+hzxm63c40rIiIiovRhAVAAAKqqNiuKApHXhrt27co3DEMBgNLS0qMGQh0rKirC9ddfL6QtFoPFKCk5NHtzfX19KnKq5AG2zKmIiEgI3hlMRETprB8AKIrizc7OjgAQVt3cu3evS9d1G3B4Aa2nrV+\u002FHq+++qqw9hYsWICnn36aheA+Krnjwuv1FsiyLPSLYLfb25KeFohsm4iIiIiEK0Ash7JYLG7R14b79+9PrEdjZk6V7q666ircdddd0HW9W+3s379fUER9W\u002FJ32e12C8+pLBYLcyoiIhKOxWAiIkpXFgAuAFBV1St6iujq6upE0pVcQOtpd999NwzDENLWwIED8eyzz0JV+d9\u002FX5XcceH3+wtEnzd2uz15irQ8kW0TERERkXCJ6zWLxeIRfW1YX1\u002FfK3KqdFdaWopJkybhs88+61Y7Xq\u002FQ2Yz7rPbFYNHnjdVq9SQ9ZU5FRERCsDeYiIjSVSIpUhTFIwm+1bWhoSExit2sjoudO3fizTffFNKWqqp44YUXUFDAgcV9WfJ3ORgM5os+b1gMJiIiIkorycVgr+hrw7a2NhaDBZk2bVq3i8Eej+fYO9ExJX+XA4FAgejzxmq1+pKeMqciIiIhWAwmIqJ0ldKOi+bm5vz4tllTmt1\u002F\u002F\u002F3dngos7tZbb8WMGTOEtEXpK7njIhQKCe+4yMrKYjGYiIiIKH2kNKfyeDyJYjCnie6eESNGdLuNYDAoIBJKdTHY4XAkF4Pzv3VHIiKiLmAxmIiI0lWi4yIV00S73W5T7wz2er147rnnhLQ1cOBA3HzzzULaovRWXFwMWZah6zqCwWC+6PMmKyuLo9iJiIiI0kfies1qtQrPqbxeL+8MFiQvr\u002FuX1na7XUAklDywIRAICM+p2s22lCuybSIi6rtYDCYionR1WMeFLMtCEzC\u002F358YgWtGx8U\u002F\u002FvEPYdN4\u002FelPf4LT6RTSFqU3i8WCgoICNDY2QtO0fACyLMtiFqUGkJ2dzWIwERERUfpIzql8onOqQCBgak6VSWw2W7fbyMrKEhAJJX+Xw+Fwgejzxul0MqciIiLhWAwmIqJ0lehYSMWUZsnFYDOmNHv22WeFtDNt2jQsWrRISFuUGUpKStDY2AjDMNS9e\u002FdmDxkypE1U2\u002F379+c00URERETpI5HzOBwOn+icKhQKmb70Tqbw+XzH3ukYWJAXIysrC1lZWfB4PAiHw3miz5ucnBzmVEREJByLwURElK4SSZHNZvNrmiaLbDwYDJo2pVlNTQ3ef\u002F99IW3ddNNNEJybUporKSnBli1bAAD79u0rGDhwoPcYb+m0fv36+ZOesuOCiIiIqHdLTEHrcDiETxMdCoW4ZrAgzc3N3W6jrKxMQCQERHOqXbt2IRKJOOvr6x39+\u002FcPiGqbsy0REVEqsBhMRETpKpEU2e124aPYg8GgaVOavf7669B1vdvtDBkyBOedd56AiCiTJHfENTQ0FEiS9I2otktKSgKSJOmGYchgxwURERFRb5e4XnM6nf7YNZww4XA4D4iud+twOEQ23edUV1d3u43x48cLiISAaE61a9cuAEBVVVVBv379akW1nZ+fzwG2REQkHIvBRESUrhKj2F0ul\u002FA1g+MdF3a7Hbm5ucfaXagVK1YIaWfZsmVQFEVIW5Q5kgc3tLS05Is+d2RZ9kciERfYcUFERETU2yWu13JycoTmVLW1tQ5d120A7woW4Ysvvuh2G5MnTxYQCQGH51T19fX5sizXiWq7uLiYdwYTEZFwLAYTEVG6Sh7F7hM5pZmu65KmaVkA0L9\u002F\u002Fx6dZjkYDOLdd9\u002FtdjuyLOPiiy8WEBFlmsLCwsS21+vNET0doKqq3lgx2AXABiAosn0iIiIiEiaRU2VnZ\u002FtFXhfW1tbmxLeTrz+p63w+HzZs2NCtNgoKCnDCCScIioiSv9Nut1toTlVUVORPmm0p\u002F5hvICIi6gQWg4koFaYBGNTJfXUA\u002F0xhLJS5kjsuhE4TXV9f7wIgAdGkuSdt2LABPp\u002Fv2Dsew3e+8x2UlpYKiIgyTV7eocHlwWDQJXqKdVVVvcFgov6bC6BeZPtEREREJEziwrCgoEBoTtXc3JyV1LaoZvuk119\u002FHYFA95aknTNnDmRZ6CzgfVp+\u002FqEarc\u002FnE5pTKYrC2ZaIiEg4FoOJKBV+BmBxJ\u002FcNgsVgOj6JpCgvL090MTjRcZFcOOsJa9asEdLOhRdeKKQdyjzJ3+lQKCS8GGyxWLzJhwOLwURERES9VeLCsLS0VGhO5fF4TMupMs2jjz7a7TYWL+5sFw11RvJSUn6\u002FPysVOVXSbEtWACGR7RORqSoALAAwDkABgDYAlQBWAvjSvLAo07EYTOlKBTAZwAAAXkT\u002FoaztRnv9AEwAkAWgEcBn4LSWRL1dokchNzdX6JRmyaPYe7rjYu3atULamTdvnpB2KPO0vzNY9DTRVquVa1wRERERpYc8AJAkKZKbmxsSeV3odrtZDBbgtdde6\u002FaA4bKyMuaHgqU6p1IUJTmnygXQILJ9IjKFHcADAK4CoHTw+\u002FsAvAjgGgDuHoyL+ggWgyndWAD8AsD1iI6cSfYugOsAbOtCe8MB3I\u002FoaJzk+XI8AB4HcBuA7s3FQ0Spksi+CgsLfbIsC0u+2traXImD9HDHRXfXggKAgQMHYsiQIQKioUyU\u002FJ0Oh8MukecOAFgsFhaDiYiIiNJDHhAtPCmKAsSWyhHB5\u002FOZllNlipqaGvz4xz\u002FudjvXXXcdLBaLgIgorn0xWHROZbVavV5vYsKlPLAYTJTuZAD\u002FD8D3jrKPBOD7AMoBnAHOCECCsRhM6cQC4HUAZ3\u002FL788A8DGA2Yje2XsskwH8G9ERdu1lAbgJwPRYu7xLmKj3iY9i1\u002Fv16xcUORLX6\u002FWa0nHR0NCA2truTHIQdfrppwuIhjJV+2Kw6FHsNpuNxWAiIiKi3s+G6F1KUFXVJ\u002FqaMBAIJHKq5Cl1qXPq6upw9tlno6amplvtlJeX4yc\u002F+YmgqCiu\u002FdI7os8fVVWZUxFllvNx9EJwspmI3j3c\u002FTUCiJLIx96FqNe4At9eCI7LBvAsOvfd\u002Fhs6LgQnOxXAzZ1oi4h6XhYAyLIcUBQFkkBmjWLfvHmzkHZmzpwppB3KTMnfaU3TXCLPHUmSJKvVmjyjRnbPf0IiIiIi6oTEdZqiKH7R14TBYNAZb593BnfNe++9hxNPPBFbtmzpdlt\u002F\u002FOMf4XQ6j70jdUm7AbZO0eePxWJhTkWUWS7r4v5XpiQK6tN4ZzClk8Wd3G8cgBkAPjzKPiMBTO1ke1cDuLuT+xJRz3ECgCzLYUmSMmIU+7ZtXZnl\u002FtuNHz9eSDuUmfLy8iBJEgzDQCQScYo+f1RVDSc9tYtsm4iIiIiEccQ3VFUVnlOFw2FOE91F69atw7333otXXnlFSHsXX3wxLr74YiFt0eE6GmArsn3mVEQZ5+Qu7j8B0X5P37F2JOosFoMpnXSlunEijl4MPqELbZUDKAHQvbl5iEgkC2L\u002FhymKEhI9JZNZo9irqqq63YYkSRgzZkz3g6GMpSgKsrKy0NbWhnA47BR9\u002FlgsluR1bXgbAhEREVHvlLhOk2U5FTkVi8HHEAqF8P777+ONN97AihUr8NVXXwlre\u002Fz48fif\u002F\u002FkfYe3R4dpNEy08p1IUhTkVUeaQAfQ7jvf0B7BXfDjUV7EYTOkkpwv7HivT6OoUK3lgMZioN0mMYpdlOSTLckZ0XFRXV3e7jfLycq7JRceUl5eHtrY2RCIRh6ZpitVq1UW1bbVak0exO751RyIiIiIyU\u002FKdwcJzqnA4nNbTRHs8HmzcuLFbbbS2tiIYDMLj8aCtrQ0+nw9fffUVdu7ciV27duHrr7+GpmmCIj6koqICb7zxBvPCFGo325JL9PljtVqTi8HMqYjSmw5AA6B08X2hY+9C1HksBlM6cQMo6OS+LZ1oqyuau7g\u002FEaXWYR0XhmF0Zp3wTguFQlnx7XQrBo8YMUJAJJTp8vLysG\u002FfPgCQGhsbXSUlJV5RbdtsNhaDiYiIiHq\u002FxHWaoijhFORUaX1n8ObNm3HiiSeaHUaXjRkzBm+\u002F\u002FTbKy8vNDiWjqaoKl8sFj8eDcDjsEn3+qKqaPEqAORVR+tsLoCsddl4AjSmKhfooFoMpnWwCcHon911\u002FjN9\u002F0YXjVgOo7cL+RJR6yXcGh0VPyRQKhUwZxV5T0\u002F0JCEpLSwVEQpku+Xvd0NDgKi4uFrYODe8MJiIiIkoLhxWDRedUmqaldTE4HV144YV48sknkZ3d1cnw6Hjk5eXB4\u002FEgEonYg8GgYrFYhM221G7NYOZUROnvHXStGPwuoncTizYDwMNH+f2ZOPZNdpSmWAymdPJ3dK4Y\u002FAWAj4+xz1cA1gI4tRPtPd6JfYioZx3WcSFJUkZMadbU1NTtNgYMGCAgEsp0yd\u002FrtrY2lyRJwkacshhMRERElBYS12kWiyVlOZUkScjJ6cqqX9RVJSUlePDBB3HRRReZHUqfkpeXh2+++QYApKamJueAAQOEzbbEnIoo4zwE4EcArJ3YVwdwb4riuBTA1KP8nvXCDMa\u002FXEonfwdwPoDvHWUfN4AlAIxOtHcNgDUA8o+yz\u002FsA7u9sgETUY5KLwcLXt9I0zR7f7qlR1T6fD4FAoNvtsBhMnZHcIefz+ewizyG73c6OCyIiIqLeL6VrBuu6bgMAl8sFRenqMonUGYMGDcL111+PH\u002F\u002F4x3A4eNnd05JzKrfbbS8tLRU22xKX3iHKODsALAXwPzj62sEGgFsAfJSCGFQAF6SgXUoTLAZTOokgWgz+BYAbAbS\u002FXe9dAD8FUNnJ9rYBOBHRkTkLACQnPj4AfwZwO7hYO1FvlLhz12KxCJ\u002FSTNf1xEg9p9N5tF2FaW4WszR5\u002F\u002F79hbRDmc1uT4x3QDAYtIo8h6xWK9e3IiIiIur9EomOqqopy6lYpBSrqKgICxYswKJFizB37lzIstClaqkLknMqv98vNKeyWCwsBhNlnicRLQrfCeA0HFkUXg\u002FgDgArU3T80wEUpqhtSgMsBlO60QDcA+A+AFMAlAHwIzo19DfH0d4eRO80Lo61lwWgBsDGWLtE1Dsddmew6CnNkovByQleKvl8YgYR91TxmtJb8vckGAzaRJ5DTqczeRAVv5BEREREvVPPP4n8AAAgAElEQVTKponWdV3SdV0FmJ+I8sADD+Css87C6NGjWQDuJZK\u002F24FAQGhOZbfbmVMRZaYPAZwBIAfAOADZiN6UthNAfYqP\u002Ff0Ut0+9HIvBlK6COPa6wF1Rh9SNuiEi8VK6vlUkErEAgM1m67EpzcLh8LF36gSbzSakHcpsyXdoaJpmFVwM5p3BRERERL1f4jrNarUKzancbnciKeGdwWK89NJLqKmpwfTp0zF79mzk5bWfLI96WvJ3OxQKCc2pLBYLcyqizOaG2NrGsVgBnNuDx6NeiMVgIiJKR8nrW4UNw0j7Kc1CITEz0rMYTJ3RvuNC5Dnkcrk4pRkRERFR73fYAFuR14Mejycx0xKLwWKsXbsWa9euBQCoqooZM2bg\u002FPPPx\u002Fe\u002F\u002F30UFxebHF3flPzd9vl8QnMqh8PBnIqIRJoLoMDsIMhcnFeEiIjS0WHFYETX\u002FBb20HXdAvRsx4WmacfeqROsVuuxd6I+L\u002Fm7HQ6HrRB4\u002FrhcLo5iJyIiIur9DrszGAKvBwOBAIvBKaRpGj744ANcf\u002F31KC8vx3nnnYcPP\u002FzQ7LD6nFTmVCwGE5FgF5sdAJmPxWAiIkpHyaPYNUmgcDisGoYhAz3bcaGqYibr0HVdSDuU2dp3XIg8h7Kzs9lxQURERNT7Ja7TbDab0JyKxeCeo2kaXn31VcyaNQuzZ8\u002FGxo0bzQ6pz+hommhRHA4HB9gSkSh2AOeYHQSZj8VgIiJKR8mj2EOGYUiiHm1tbaZ0XNjtdiHtBINBIe1QZmu\u002FZrDIc8jhcEQAGPFDmfIBiYiIiOhYUpZTeb1erhlsgvfffx8nn3wyli5dCq\u002FXa3Y4Ga+jpXdEPex2OwfYEpEo3wOQY3YQZD4Wg4mIKB054xuqqgodxe7xeBIdF06ns+Ojp4CotX5FrT1Mma1dMdgi8hySZRmyLMdHsrPjgoiIiKh3StmdwaFQKDHAtidzKorOFPWXv\u002FwFU6ZMwfbt280OJ6O1KwbbRJ5DLpeLxWAiEoVTRBMAQMyclERERD3rsI6L+LTOIvj9flNGsfPOYOpJyZ1y4XDYJvIcAgBFUcKxtbfZ+0dERETUOyWu0+x2u9CcKhAI8M5gk+3cuRMzZszAK6+8gtmzZ5sdTkZKzqkikYhV5DnkdDojyU9FtUuUgfoBGBp7FCB6B6wDQABABEATgG8AVAPYDUDruJmMlQtgvtlBpIgFwGBE\u002F+4HIvp3b0X030xf7FGPQ3\u002F3jeaE2SP6AzgJQBmi50H8HGgD4EH08+9iMZiORx6A7wCYDmACgHxEv2QRAH5Ev2B1AHYBeA3AenPC7HMGAzgZwKjYdhmi\u002FxDIiP4dBRD9R7AFgBfRfwx3xh6VAPag7\u002F2HSOkr0bmgqqpmGIYkqmGfz5fW00RzOjDqjOTvdqzjQtg5BACyLMdHsou55Z2IiIiIREtcp1kslojI68FgMJj2awZPmDABTz31VLfaCAaD8Pl8aGlpgd\u002Fvh9\u002FvR1NTE6qqqlBZWYkvv\u002FwSDQ0NgiI+UktLC8455xysXr0a06dPT9lx+qqOpokW2HZy\u002Fxxzqp53K4DsLux\u002FB6L9rqJdAmB8F9\u002FzHID\u002Fn737jpOrqv8\u002F\u002Frrba3onxYQQSAgkFGmJgoAJRSxfRfmC\u002FBClyVfFr+gX+WLhCwhfkCIWRL42ELEgWEBa6BIigYSEYoAkpCebkGy272yZmd8fZ2e4u2yy98ycO23fz8djHsySe889d+\u002Fc2XvO55zPeTWEunwAONVi+98Ar4dQj6HAx4ATeuo01WLfNmAZ8CxwP7Dcee32bDbmegZ1P+nFVEqAzwHfxS67wLcx8Z1UbAZ+nOK+QR2Guf4fxMRBbM5tHbAEeAh4EGh0Xrs9+yowboBtbK\u002F5VOBc4NOYeNBAmhLB4BOAOywOlGlzMAHGoG4APmmx\u002FceA16xqZO\u002F3mOh8UDMwwdVUfQD49QDbRDBfRPEBtks4FrgQ+ARm4fEgdhPsQ3wbsDBgmWA+s+sttk\u002FFg8DMgNu2Y\u002F\u002FHOV2VwEnAvwEfBsamWV4T8AzweM\u002FrX2mWlwvOAb5juU8T5ne6zn11xKHkYKaSkpK453l533HhKhi8Y8cOJ+VIYesvTbTL8ouKihLPFsWAR\u002FBnDRERERHJjGSbqqysLObyedCfJjpfg8E1NTUcdthhoR9n165dvPTSSyxatIi\u002F\u002Fe1vrF692mn5ra2tnHbaaSxbtowpU6Y4LXuw6zPA1mmbqrS01P+jJnNl3hHARy22fwx40nEdPOB\u002FMZN9bJQAX3dcF4AvAv8ecNs48EPHxz8S+BrmuqTagVaFiZl8ABPwX42p568wE6fCtD9wmcX2b5NaMNjDxMWuIViAsK+vpLBPwouEEwyuAS4CvgAckEY5U3teZwIdmODrTZgBAmE7FzOpcm+6CXbNp2G+Gz6J3TLAWxJ\u002FTKp7CslVtmk2RmN3PpkYYTWBzP6OqwIebxKwcYBt9geuBk5PoR5bAm43FrvfT+nAm6RtH4LXKZNT8SYAF2C+nIc7LHcIZkH503p+fgMzoOCXQHhDVcPzMeDn2D00twOfR4HgfFCceFNUVBR3OQK3vb09Kx0XlZWV1NTU0NJiM\u002FbpvRQMliDCnhkMxHzvi0hvgJuIiIiIuFfse++0TVUIweBMGTlyJAsXLmThwoXceOONLFmyhFtvvZU\u002F\u002FelPRKNuHqF37drF6aefzuLFi\u002FsGGSUNYc4MLikp8Q+mLd7jhhKWR7ALBh+P+2DwwdgHgsFMtnIdDPYw5xjUK8BWR8eeA3wfMxHKtf2AH2Fmz34L+D9692XkmxOB64DDs10RR0oxAwC+gUkH7lI5ZnDDvwMP9BxnjeNj2Boo0F2Mmbn9TVKLZ251uj6c5KW9zXz1MDfba6QWCAZ3X\u002FxiAr8\u002FwuS5\u002Fy5uA8H9OQAzymQjZsRMPvkw8AfsAsFdmM\u002F5M6HUSFzrFQz2HOrq6spax8X48ePTLkPBYAmiz\u002FpWpS7voR7+BpQ6L0RERERyT\u002FIZraSkBJcPgl1dXcmIo4LBdo4++mh+\u002F\u002Fvf88orr3Dsscc6K\u002FfFF1\u002FklltucVaeZKRN5c+2JJn1qOX2NoHSoFJd53U2MNFlRXrKtMlI+YiDY5YD12Jmm4YRCPYbBdyOSSGcyxMm9+T9mCyfiyicQPARmBm7\u002F4v7QHBfp2HiX5di4mHZsrc43QTgCUxMKNWJrVsUDJY9fchqMaMibiC9dCRBZwbL3n0CeBP4EplPD1MBvJzhY6bjGODP2H0xxjAppf8eSo0kDP6Oizjmj7WTV3d3d7LssrJkXDgjXASD6+rqHNRECp1\u002FRkAsFkukcnb28nVcgDovRERERHJR8hmttLTUaZsqGo36U1Bn4FQKz6xZs3jqqae49tprKSpy03171VVXsX37didlyXvaVCU4blPx7gxFtacy723gLYvt34\u002FdGsNBpBoMBrulGIM4wXL7dIPB44GngcvJTHbQhCMw6wifNtCGOeQw4AXsr1EuOx\u002F4B3BQBo9ZDtwI\u002FBWTljobptN\u002F3Gc6ZqBCuiPEFAyWfqefD8OsdWCzKPyeaGZwekowX0T3YdKfZ8MLwKosHdvWHExAt9pinzhwMfC7UGokYUk2hjzPi8fjcc\u002FVKxqNJssuLs5sm8tFMNj1GlNSmPyf7Xg8XuTyHorH456nmcEiIiIiue49aaJdvfAt95bpNlUh8TyPyy+\u002FnLvuustJQLi1tZWbb77ZQc0EMtKm0szg7LKZHVwCfNDhsYcDR6WxfzaDwc3A82kcaxZmNnA655+OoZi1ZP9flo5vq5zszmZ17SbgDiBbI8lOw8yyHpGFY5cB+\u002Fb5fzMwAyMmOyhfwWB5z8zgKkwg2MUXbj1mDVZJTSkmQJntFAW\u002FzuKxbczAPKgNs9zvcuBn7qsjIes1M9hpHqZ4PGsdFy6CwZs2bUp73WEpfH07LlzeQ4lbyX+4zJ+hiIiIiAyg18xglw+CsVhMwWCHzjrrLK677jonZf3sZz+jvV1ddS5koE2lmcHZZTu71WWq6AWklxnyxDT397MNdD8BdKZ4rP0wgbhU1kp2qQTTH35Glusx2NyAWbs3247ExMdsJpu54p+4ORx4EHf3g4LB0usD5gG\u002FxKS2cEEpolNXDPwR+FSW6xEBfp\u002FlOgQxCbMugs36FQDXAde7r45kQGhrBmczGDxxYvrLusTjcd56yyabkQxG\u002Fs92LBYLs+MC1HkhIiIikotCCwb721SuUhwPdl\u002F\u002F+tedrCHc2NjIX\u002F\u002F6Vwc1kj79BQoGF56nMf2iQbkMBp+c5v7DMSmPXTgCGGKxfaopokdh+nbTnyXhhgf8CrMcoYTv68A3sl0Jn8OA3+LLdJIhiYmbRcA9mAESrmzN9NqjknvGYBbh3gX8J\u002FAZh2UrGJy6G4CPZ7sSmDz5DdmuxADGYB4WbNMl3A5c4b46kiH+YDA9qcic6Fk\u002FNVl2Js2aNctJOa+\u002F\u002FjqHHnqok7KkMPXtuHB5D4EZpOH7Uc+bIiIiIrmn1wOh4zaVZgY7VlRUxE033cT73\u002F9+4vH4wDvsxX333ccZZ2jCW7r6DrB13abylCY629ow65Z+OOD2B\u002FNuH3s6ioCT0iyDnjLSSdecYLsWrU167YRiTHbMKSnsC9CFOdflwM6eVwUmwDwFM1N6QgrlVvTU62CgMcW6ycCOx0zYStUWzIz0DZhrH8Hci6MxQd1jSK1f6mPAV4AfpFE3W4lg8MW4+R7w25IPnXPrUKrhsB0A1AHXOC5X6wWn5gzcpkSIYO6hSswfMRu\u002FdliPMAzDPGTsb7nfPcB\u002FYNYLlvzUK000DlOpZ3Nm8OzZs52Us2TJEs4++2wnZUlh6pvSDMfLEXhKEy0iIiKS63rNDMZtmypZtoLB7hx22GF88IMf5JlnnkmrnCeeeIJoNKprk6a+wWDct6kSM4Pzof++UD1K8GBwEfAh4E9pHvNQ7DMf9mch8B0H5dgEg1cB61M4xjcxAVtb64CrMGv8Ng2w7SHAZcCnsbtXJwM3A19IoX6ZsBa4cC\u002F\u002FfjEwx6K8S4FU1557J4V9RmD66W2\u002F56KYmbs3AysH2HYoZgLkd7BPuXwt8BCQqRSMB2AGLnzPcblRoC7xS36c9y5OHIbPAd+22L4bOAszukPCMw\u002FzxV6ZRhn9NRw0M9jeaODHaewfw4yE+TuwGFhN75FLlZgHijnAXEyqj+Mwa0X3tQUz4zZXVWPOc67lfg9ivotiA2wnue09aaJdFZzNYPCkSZMYNmwYDQ3pTchfvHixoxpJoepvfSuX5XtKEy0iIiKS63oFbB0\u002FD2pmcEjOPvvstIPBu3fvZtWqVc4GIw9W\u002FaWJdnwIzQzOvkeAGy22P570g8GnBNgmwsATfg7HzIzdmUZdqoCjLLZPZVbwdOBblvvEeva5ieDrE7+MmYB1M3Avdhkmz8X0179ssU+mbAfu2Mu\u002Fn4JdMPgu0vvM2Loe+8EPrwL\u002FDrwecPtGzO\u002FoN5jJkDaT8CoxdfyETQXTMBf4J8FTs3dhZsQvA9ZgAvIdQDlQC4wDZmF+x9FEMLgNeNtdnfs1A5OG2MZVwJIQ6iK92ayZugH4CybQ+Dq9Z25XYj6o0zDpE151WMfB4iZMGgNbccws3qsx12RP2jEjtNZjUkCDeXiYD5yKGR2VSJtxN2bUSC4qw4z6sl234WnMOWqASf7rFQwupJRmBx54YNrB3Ndee436+npGjBjhqFZSaMJOE62ZwSIiIiI5zx8MLqg2VSH78IeDTlLcu5UrVyoYnKa+A2xDaFNpzeDsex3YDEwMuP2HHBwzSDD4dODP7H02ZRFmVvPv0qjLfExQKahU1gv+IXaZLFsxkwdTXfx8KXA08DAmfhGEh5mpGeTaSHBHYj\u002Fj+hHMLN+BZoL3px0z83kDcAvB1wP+GKauL6RwTFtlwKQA272KuXfuA3YHLTxTiyGWYaZt11js8w\u002FMNGzJDU9i0jVMBb6KGUHzL3qn8G7HjEZZAvwMN+sSDCYHAZ9NYb+dwALg8+w9ELwnEUx2gP\u002FEjIo6EfgVuZsiuhiTPmKB5X4vYb68lXa+MPjTRIP5e+bk5V8zOBsdFwcddFDaZcRiMZ566ikHtZFC1U9KM6evPmsGq\u002FNCREREJPf4B9iC2zaVgsEhmTx5MmPGjEm7nFWrVjmozeCWwTaVh+MU1GLFZrbrAdinofUbBbx\u002FgG26MP30A6XGBZMqOh02KaLbANu0BUcCJ1vucy6pB4ITtmImRdVb7HMS767nKm58B7vvtuWYGbqpBIL9fojdjH8P+0muYdkGnImZ7f1zLALBkLlg8FWY1ARBNWCCYrk6K3Ew2Ql8CvPl\u002FwRaYzVM38b+4W4bZpTW447qEMVc588Dbzgq0yUP+D\u002Fgk5b7\u002FQvzcJHuHwvJHb1mBvNu48jFK6sdF\u002FPmzXNSzv333++kHClMe1gz2NlLaaJFREREcl7fAbbOngWzufTOYDB9+vS0y9iyRSu7patPm6oYtakKle1s13RmB5\u002FEwPGalZjA63MByltIegMJbILBz2AmHNm4wnL7H2EmqLmwGTjfYnuPva\u002FNK3YOxW4gQCMm26ftZ2xPvo1JrRzUJ4D0R2KlZxFmNvvvSDFGl4lg8PHANyz3uRDYGEJdxM4KzI15X7YrMghMwT7A2YGZ6fqm++rkrFswI8BsrMOkRcnkegcSvl6j2OPxuOfqFY1Gs9pxccIJJ+BiqaEHHniASMTVM5IUmj4dF87un8RLaaJFREREct570kQ7fCkYHKJRo0alXca2bdsc1GRw6y9NtNpUBelxoNti++PTOFaQ4FgiE2eQYPA47NaL9RsBHGKxvW3QfBJmdm5Qu7APHg\u002FkfuxS\u002F36GzE2uLHQXYjdQ4QZgrcPjd2ICwkGVYSZMZsvvMPdLWvGNsD+8IzGLTtsc51fAH8Opjlh4CTOSaVO2KzJIfBb7+\u002FFK4EX3VclZVwKXWO6zFRMI3uq8NpJt\u002FlHscc+hnhG95iBZ6LgYP348BxxwQNrlNDc38+ijNtmMZDDp23Hh8h7yPM8rKirSKHYRERGR3NZrZrDLZ0EFg8NVXV2ddhktLS0OajK49R1gGwK1qXJDA2ad2aBsZtP6FRMsrbNNMJiAZfbnQ9j1VdsGg237wm8Bmi2PEcSPLbYdh5k4J+mpwMzyDaoRuC2EejyC3SQ7m8ELLj0C\u002FD9Mivi0hB0M\u002Fj\u002Fs8uSvBr4SUl0kuE3AaZg\u002FdpIZZ1tu\u002FzZwUxgVyYIgaQ3+E\u002FiuZbn1mAcel6OGJHeEFgzOhfWtjj8+nYGk7\u002FrJT37ipBwpPH0+286DwZ5GsYuIiIjkuuQzWmlpqesBtllvUxWyrq60+4OVRcqBDAywVZsqd9gEOicD+6ZwjCMwE+sG8s+e\u002F9YBawJsf1IKdQG7oPbbwFuW5Z9hsW0X4QQDwaSdbrfYfkFI9RhMTgKGWWz\u002Fc8KJU8WB31psfxxQGkI99mYD5l6xyU6wR2EGg8\u002FH5NIOqguz+LGGpmVXDDPSoC7bFRlEpgP7W+5zPQ5Gg+SIgUZ1fR77wHczJrXKaynVSPJBaGmicyEYfOKJJzop5\u002FHHH+df\u002F\u002FqXk7KksGQ4TXRJ5s9QRERERAbQa4BtobWpCllra2vaZcRisYE3kr3yf7ZjsZjzNNGYPtoEtamyy3bWayoj\u002FE8JsM0WTHAoIcjs4GOA2hTqY3MOtr+f8cBBFtv\u002FA9hteYygOjAZUoM6PKR6DCa2s9X\u002FFkotjMUW21YBB4ZVkT24ADMz2omwgsH7Y6bu2\u002Fg2djeehOMu4OlsV2KQsY36NAP3hFGRLGnay799CrgDuzUEIsDHsUvhIvknGWjqaSQ5exUVvfunMR4PMnHdvQULFlBbm8qzem\u002FxeJwf\u002FOAHDmokBc7pPeR7JWTnRhIRERGRvUk+o0Wj0SIcPgd6npd8FsxWm6qQbd2a\u002FkpYNTU1DmoiCT39CGpTFa5l2K3VGVYweEmfn4MEssowKZ9tTMJu4pJtMPhE7Pp6H7Qs31bf3+veKE10+j5ssW0976ZGD8NS7GbdZvL6Pwo85rLAMILBZZhAlc0CFk8C3w+hLmKnC\u002FhOtisxCNn+QX6IwppBv6dg8OHAb7BLhdMNfAbznSKFLZp4E4\u002FHnY7A9c9ozNZo6aqqKv7t3\u002F7NSVm\u002F\u002FOUvee01TZKX3qLR5C2E53mxMGYH+w+X+TMUERERkQEkn9Fcz2rMhTZVoYrH46xfvz7tclysOzzY9WlTOZ1d3\u002FPy99urTZVdMeyCMh\u002FCLtg5DjgkwHZ9g2JB1w22TRVtE8zuAJ6yLP8DltvbzN5MxRsW207GrHkrqRmPXRr1F3CUInkPWjAz7oPaL6yK9ONG1wWGEQz+HnYR8l2YtMR6Osy+v2DWC5bMmmu5\u002FaOh1CJ7+kt1MAa4H7s\u002FrjHgXMJNHSG5I9kQikajTtfm8a\u002FL42\u002FcZdpZZ53lpJxoNMpll13mpCwpHH07LlzeQ57nefR+xlTHhYiIiEju6RUMdvksmCttqkK0evVqGhvTzxg5bJjNco3Snwy0qTTANrfY9MeOxS6d7MkECx73ncH6JvBOgP1s0\u002FLarBf8HPaTlg623P5Ny+1t2cz69oB9wqrIIJBr1x7srv\u002FE0GrR20bgCdeFug4GHwt8zXKfL2IXfZfwFFLq4XxRhVkz2MbyMCqSRX1bMaXAHzEpSWx8HbjbSY0kHyQHELnuuPCv+5PNjovjjz+eCRMmOCnroYce4oEHHnBSlhSGsDsu\u002FOvEoY4LERERkVyUbFNFo9Fil8+CxcXFCgaH5JlnnnFSzrRp05yUM5j5P9tFRUUxl\u002FeQ53maGZx7HsMuXbfN7NqTA2wT4b19wnGCzZqdBsywqI9NMNh20lIRMNti+zocrpm6BzbBQAA3nXWDU74HgzM1EOCvhLA8gMvF50dhgok2AeafAfc6rIOkrgtYlO1KDEIHYHfPdGOXuiIfNPf5+WbMwBIb38J+nXLJb8mGUHd3d3GflLRpyZVR7MXFxZx99tlcf\u002F31Tsr7whe+wMqVKxk\u002FfryT8iS\u002F9Zcm2mX56rgQERERyXn+NlWR4+fBnGhTFaI\u002F\u002FvGPTsqZPt12XoL01V+aaJflq02Vc+qAFQRL5wwmGPzDANuVEmwN1ReBzn7+\u002F2Lg4wH2Xwi8FWC7mdgFO23XC56A3fKi1YQfs7BdRF2LrqfONs3yRcAnw6iIj02AOlPXPpTU6C6DwT\u002FH7otiFfaziCU8rwGt2a7EIGSbWmA1Zi2GQuIf3XU28CXL\u002FW\u002FFpKeXwaXXmsHYrcWyV55vfatsd1xccskl3HrrrUQikbTLeueddzjnnHN45JFHKCoKY5UIySd9g8E4vIcAtGawiIiISM7zL71TjMPnQc0MDseaNWt46inbpTn7N2OGzSRB6U\u002FfYDBqUw0GjxA8GHwsUMzA1+5oIEje9if38P+fDlifhcCPAmxnMyt4M\u002FCqxfZgP6u2FjjRcp+wVWW7AnnM9vrPCaUWqavM0HFs76tAXPUGXwR8zGL7DuBMoM3R8SV9b2e7AoPUOMvtC21WMEBTz3\u002FfD9xhue+dwH+6rY7kCf\u002F6VsWYv2dOXrmSJhpg\u002FPjxnHvuuc7KW7RoEV\u002F+8pedlSf5q5+OC2f3EFCkUewiIiIiOa9vMNjZs2AuDbAtJFdddZWT32dlZSWHH364gxoNbv5r0TMAwmmbyrf0TpwQ0oVKSmxSIg8DDg2w3SkBy9vT+qHLgV0B9j8OKA+wXZgpoqEwUiwH+T1K\u002F\u002FL9+mfq2gdZC9yai2DwTOAmy30ux6RVkNxhmxtf3LDN19oQSi2yqwkYC9wPVFjuux9uMxxI\u002FvB3XBTF43HP1StX0kQnfPOb36S0tNRZebfddhtXXnmls\u002FIkP\u002FVZ3yru8h7qeSkYLCIiIpLb3pMmulDbVIXgiSee4O6773ZS1tFHH015uWIZ6eovTbTrV+JQ2TlD6cfzvDupJYgg6wYHCQa3Ai\u002Fs4d9i7HnWsF818IEBtinGBI2Dsk0RDWap0XznNAvAIJPv1z8T1z4G1IdRcLrB4HLgt9hNjX8M+EGaxxX3QhltIAOyWSMB3ru+biFoBf6AfcpsgGOAa9xWR\u002FJErzTRnkO51nExefJkzjrrLKdl\u002Fs\u002F\u002F\u002FA\u002Ff+c53iMc1uHiw6ttx4fIe8jzP33EB6rwQERERyUW9si25fBZUmmi31q1bx2c\u002F+1ln7bcTT8y1jKv5KQNtqkS\u002FvW6i3NFFsMBrwkDB4EnAQQHKeZb+1wtOeDxgfRYO8O+HESxlNUC3xXH9bCcCSWHR9R9YAyF976cbDL6W4HnyAXYA56DUFrmoceBNJAS2X4AtodQiu67ErKORqm8Ap7qpiuSR\u002FtYMdvLKxY6L6667jmHDgj6PB3P11Vfz6U9\u002FmrY2rdgwGPWdGYzDewjQzGARERGR3OcPBjttU3neu+MCc6VNla\u002FefvttFixYQF1dnZPyioqKOPPMM52UNdiF3abi3Rlo3aGfjNiwSY08Hyjby7+fHLCcPaWITlgUsJyTBvj3IDOZE\u002F5JahkslZZgcFMweGAdYRWcTjB4AXZrdcaBcwE3Ty\u002F5J9fTB8SyXYEclIlrZvsFWIgzg0ekub+HWTt4koO6SP4IM000vrKzcnJ9jRs3jquuusp5uX\u002F605+YN28eK1bkx8oNmsnsTtgpzXzrW4E6L0RERERy0aBZeidfPfTQQxx99NGsWbPGWZnHHXccU6ZMcVbeYJaBNNGaGZybbFIjVwFz9\u002FLvroLB64C1AcqZzd4zMw6URtovlRTRsPfguBQ+d+vgibVUg8GjgF9jFyz7EfBQiscrBDaptCU3ZOKa2Qacc31QQbaMBO5Ff1AGk9DSRPtnBsdiuTNO5uKLL+awww5zXu6KFSs44ogjuOKKK3JylvA777zD3XffzZlnnhnK+Q9WfUaxx1zeQ56nNNEiIiIieaDXzGCXz4K5mG0pn7z11lucccYZnHrqqezYscNp2V\u002F84hedljeY+T\u002FbxcXFYbapdBPllvXAmxbbH7mH\u002F18GBMnZvhN4JcB2QVM2L9jD\u002F\u002FeAowOWAakHg0Ob9Sh5Qdc\u002Fi0pS2McDfmS2CMAAACAASURBVAGMt9jndeCbKRyrkNRkuwJiLRPXzPYLsDaUWhSGI4Gr0XfNYPGeYLCrgnN1FHtxcTG33347xxxzDF1dXU7L7urq4tprr+XnP\u002F85l156KRdffDE1Ndn5s9Xd3c1LL73EI488wsMPP8xLL72UDMpPnjw5K3UqRP2tb+X4EEoTLSIiIpLbQmtTeZ6XkwNsc1kkEmHRokX84he\u002F4O9\u002F\u002Fzvd3e6T6xxyyCF88pOfdF7uYBV2m0rB4Jz2CLB\u002FwG2PwkyS62s+wfqeFxEso+djwIUBtjsO+GU\u002F\u002F38WMDzA\u002FmCWAn054LZ9tVtuvwVYleKxwrIt2xXIY+3AUIvt\u002F0FuBZC3ZrsC6UglGHwx8FGL7SPAmdjf6IVGweD8k4lrFrHcXp+jvfsvYAnw12xXREL3npRmrgr2cnh9q8MPP5zvf\u002F\u002F7fPWrXw2l\u002FB07dnDZZZdx\u002FfXX85nPfIYzzzyTefPm4T5O+K5IJMLSpUt55pln+Mc\u002F\u002FsGSJUtoaSnE5dFzS38pzVyWr5nBIiIiIjkv+YzW3d3ttE2VqwNsc0V3dzerV6\u002Fmtdde49VXX2XFihU8+eSTtLa2hnrca665JtS23WCTgTaV0kTnrkeBSwJue9Qe\u002Fv9A6\u002FcmBJ2B+wRmiaaB4j3H7uH\u002FHxPwOGDOP9WRPrYp6Z4HPp3isST32MYIv4iZaCoO2AaDDwS+b7nPpQRLZVDoqrNdAbHikZk00bYRjyGh1CI3vQL8HPihxT6JzAXLgU1hVEpyRq+UZjhMoV5WVpZ8oO3s7HRVrDOXXHIJS5cu5Z577gntGPX19fz0pz\u002Flpz\u002F9KZMmTeL444\u002FnAx\u002F4APPmzWPGjBn411W2sXPnTtauXcsrr7zCq6++yssvv8yLL75IR0cuDfIbHPyf7eLi4hiOlyHwdVyAOi9EREREclGvmcE4fB4sLS3N6TZVEG+++Saf\u002FnT68YeOjg5aWlpobGykqamJlpYW6uvrM94G+tSnPsUpp5yS0WMWOn\u002FGrp7U6JoZPHg8g5ngUxFg22nAGMxsWr89pWv2ixE8GNwIvADMG2C7ycBUzDrDfgPt55dqimiAOsvtbbLTSu6rw3z+ghqHgsHO2ASDK4B7gEqLfR4AfmpVo8JUgmZ05ptaoDgDx9luuf3oUGqRe\u002F4CnI0Jlu8P\u002FIfFviOB32HSnrjPqyS5IrSUZhUVFcmy29tzM6nFHXfcwWuvvcYrr4Q\u002F1mrTpk3ceeed3HnnnQCUlZUxZcoUpk6dyqRJk6isrKS6upra2lqKi4tpaGgAoLm5mV27drFz507q6urYsGGDZvzmEP9nu7S0tDvElGagzgsRERGRXOQfYFvs8nmwtLQ059tUA9m1axf33ntvtqvhxOjRo\u002FnJT36S7WoUnLa2dyc4lpWVhdmmUnsq97QBzxIsoAtmabsHfD8PAw4KsN8y3htE3ptHCRbU\u002FSCpB4NjBF+fuD+2k3fGpXEsyT2bsFubWtffIZtg8P8CB1tsvx04H4gPtOEgsC+ZCSyKOzMydBzbNQZmh1KL3BEHbgD+m3fTjVyKeSCZa1HOPOAatH5wIes1M9hlOqaysrKc77iorq7mr3\u002F9K8ceeywbN27M6LE7OztZvXo1q1evzuhxxS3\u002FZ7ukpCQacppoLRQnIiIikntCW3onH9pUg0VJSQl33303Y8aMyXZVCk6fAbZO21TRaFSDa3PfIwQPBh9F72DwMUCQlGu2M3AfBa4KsN1xwJ2+n8dg4hdB2Aao+7INBk\u002FAxFV0HxQG207MSaHUYpAKmufxJOArFuXGMLP6bGc9ZktpyOXPDLn8wahQrtlmy+0nYbfIej5pA87ABHD9gYMOzLrjtovn\u002FBegHEiFKznrOxqNFnsO5cPMYID3ve99PPvss7zvfe\u002FLdlUkD\u002Fk\u002F24lR7C7FYjH\u002FKHYNDBQRERHJPf42VZHLZ8Hy8vK8aFMNBj\u002F84Q9ZsCBovEpshNmmikaj\u002FklFynqXmx612PbIPj\u002FPD7jfQxbHABOo3RVgu77rBs8jeJrzh61q9F7NwHqL7auAQ9I8puSO1yy3D3qvSABBgsGjgV9ht+7BzcCilGqUHWGncFYw2L1CuWarsJsx5VGYs4O3YEal\u002FXEP\u002F74KuMSyTA\u002F4DTAl9WpJDksusNTd3V0cj8c9V6986riYMmUKTz\u002F9tALCYs2f0iwxM9jlKxqNJrLPaEFoERERkdyUfE7r6uoqGaxtqkJ29dVX88UvfjHb1ShY\u002FjZVYmawq1d7e7s\u002Fm6faVLnpXwSf5XgEvbOGHhNgn13Ai5Z1ihIshfNUzNrBNvVJsAmC78lyy+2Pd3BMyQ3LLLf\u002FAHbZjWUvBgoGe5hAsE1u7uXAFSnXyA3bdIRDQqnFuwoxeOfaYL1mrdiNhoLgazjki27gMAZ+wPkF8HvLskcAv0V\u002FNApRskehs7OzNB6PF7l6VVRUJL+P\u002FI27XDVlyhQef\u002FxxZs7UuCMJrp800c7uoXg8XuQLBuf+TSQiIiIyOCWf0zo6Opy2qfxpovOhTVVoPM\u002Fjpptu4lvf+la2q1LQ+swMdtqmikQiZb5D6SbKXUEDo7XA9J73RcChAfZ5jNRSIwetk3\u002Fd1qMC7rMbeMGuOv2yDXJ\u002FyMExJTe8AbRYbD8EODykugw6AwWDvwScalFeKyada2fKNXIjYrn9PqHUwvCAE0Isv1Dk0jUr5b3pMsK0wnL7j4RSi+yJEjyl\u002FEXA25blJ9YPlsKSbAx1dnaWukzHVFlZmXej2Pfdd1+WLl3K6aefnu2qSJ4IO020LxicHzeRiIiIyOCTfE7r6Ohw2qbKl6V3ClFNTQ1\u002F+MMf+NrXvpbtqhQ8\u002F2e7vLw86vIeam9v9y+Pp5sod9ms6ZuYeDQDExweSKrpmB8j2FJN\u002FgDbQQHLXoSbtXtt10I+Hhjr4LiSfd0Em73u9+9hVGQw2lsweDZwg2V5XwXeTL06ztgGFueGUgvjSPRlFUQuXbPjCH\u002Fmsd9TltvPB\u002FYNoyJ5oBHzB6DLcr\u002F\u002FAk52Xx3JomRjyHVKs3ztuEg0+n\u002Fwgx9QUqLJ8LJ3\u002Fs+265RmbW1t6rgQERERyX3+bEtqUxWAww47jGXLlmmQcIaE2abq6OjwN+p1E+WuJwi+pvOBPf8NMis4RurpmLcArwfY7rCe\u002F04EhgYs2zaIuycrgc0W25cBynmfGttJm1Wh1KK3By23\u002F3\u002FAsDAqMtjsKRhcAfyu579B3Qf8PO0aubHDcvsgX8Kp+lyIZReSwXzNnrTc3sPM2h+slmKfit4D7sI84EhhSDaGuru7nY5iLysri3ueF4P867jwPI9LLrmEZ599ljlz5mS7OpLD+qY0c3kPqeNCREREJC\u002F4B9i6nhmcXHon39pU+aiqqoorr7yS559\u002FnhkzZmS7OoNGmDODOzs7NcA2PzQC\u002Fwy4bWJmcJA+7WXY95X7BQkkH4qJDR040IY94gHLDVrWfZb7\u002FCcwxtHxB5MGy+2Hh1KL3h7ALkg9DLgspLoMKnsKBt+A3Zqpm4EL0q+OM1stt5\u002FDu3n7XRqPGbkgA7O9Zsdgfr+uTQMyPYRyFbDWcp+LgMkh1CVf3IT9A8gozCAXTZksDL1mBmMC\u002Fs5excXFUcjfjoujjz6a5cuX87Of\u002FYwhQzKZ6EDyRd+OCxzeP5FIRB0XIiIiIrkvtDZVPi69k488z+OMM87gjTfe4Lvf\u002FS5lZWUD7yTOhNmm0gDbvBJ0tmwi6HpwgG1TTRGd8FiAbYZi+sGDBoNfwb7\u002Ffm\u002FusNx+CPBjh8cfLGyDwTNDqUVvO4A\u002FW+5zKeFmih0U+gsGn4rdrMMYcDZQ76RGbqy23N4jnKDt94DKEMotRLbXrAQ4K4R6XI9ZMziT4sBvLfepwPzR9NxXJy\u002FEgHOAOsv95gNXu6+OZIF\u002FZrDTlGbxeNwrKSnJ62AwQFFRERdccAGrVq3iwgsvpKLCJtmHFLowU5pFIhF1XIiIiIjkvtDSRPcExsxB8rhNlavKy8s5++yzefXVV\u002Fnd737HpEmTsl2lQalvtiWliR60gk5W2Q+T7jhIsC3ddMzPEuxzM53gwWBXKaIT\u002FgU8Y7nP6cBXHNej0NkGg48NpRbvdbvl9qXAvcDIEOoyaPQNBo8FfoldgOl\u002FgaddVciR1zDBIhtfxu1M008B5zosr9C9msI+XwdGOKzD5zDXLRvuxv4zu5DwA5u1wOiQj5Gq7ZhBHLa\u002FN60fXBh6jWJ3mY7J8zyvpKSkG6Cjo4NoNLrnWuSBCRMmcPvtt7N+\u002FXquuOIKhg\u002FPRMYXt2pra\u002FnsZz\u002FLHXfYDhyVPWlra0u+d53SrM\u002FM4Lb3Hl1EREREckBG0kT7nzsldZ7nMW\u002FePG699VY2bdrEXXfdxYEHBo3hSBj8n+2Kioow00TrJsptywmW0rkUOBzYZ4DtdmGWyEtHhGCB1qlkLxgM8D8p7HMzmV\u002Fi8UDgIxk+pivbLLc\u002Fi8ysz\u002Fs09jHF6ZhZ85kMCFdiJsK6jEFljT8Y7AG\u002Fxi73+lLgSof1caUFExC2MQy4jT2nzraxEPiNg3IGk23Aest9xgI\u002FwM3s2E9gn57CpdXAX1PY7wpMQNj1DOERmHt7PXCY47JdWgR833KfIrR+cCFINobCDAYDRCKR7JyhY2PHjuWaa65h48aN3HHHHZx44omUlORu1vQJEyZw3nnncf\u002F997N9+3Z+85vfsHDhwmxXq2CEub5VT5rB5KEyf3YiIiIiEkBobaqSkhLyfemdXDB+\u002FHjOOOMMbrvtNtavX89zzz3HV77yFUaPztUx+4OL\u002F7PtOhisNlVeiWH6J4M4g4H7cB8DXMxKCJIqeg4wK8B2zcDz6VWnX09hH2Quxkxm\u002FF\u002FCXQqwGvg85rxfAz4e4rHC9Lrl9rWYeEsmfBOTMdXG+4ElwCHuq9PLHOBHmNTodwE1IR8vI\u002Fw3zFeAkyz2bQbOBLqc1sidxwiWg9\u002Fv45iLey6pnVcJJn\u002F5NWhd0lQ8Clxouc\u002FZmIeii0ntD2UZ8N\u002FAt3EzECAd12KC0ra+hfkivBDYkMbxizBplD+DmXGbL19y38aksDjKYp9RwD3A8UD3ANtKbnpPmmiXhSc6LsCM9q2urnZZfFbV1NRw\u002Fvnnc\u002F7557Nz507+8pe\u002FcN9997F48WKam5uzVq999tmH+fPnM3\u002F+fI499lhmz56N5w3WTPjh8w9yKC0tjbm8h9rb27VmsIiIiEjuC7tN1R2NRosVDN67iooKRo8ezT777MO0adOYPXs2M2fO5OCDD2batGnZrp7shb9NVVZW5rRNpTTReecRgi1n+OUA26S7XnBCkPTVQfvhnwA606jL3nwVeBm7pTY94DLMbN3\u002FwvzObIOK\u002FRkNLMBklDwNs05xvnsF8x1i8\u002Fs9B2gEvoHddS8Cygn+nfUCJrD\u002FBYtjgEm5\u002FgLwE8yggO2W+\u002FenCDNz\u002F2Tgo8ChDsrMOYk\u002FLAdjfnE2vgSsdVsdp+7DpBG2dRZm6v\u002FlBB+ZUgl8EjOaQTlaUnc\u002F9sFggAswozUux4woCqIaE\u002FT8JuYLJBe8BPwO+PcU9l0IvIWZ3f9rzBdikPTJ0zAjaY7DfIZdpkrPlC7MwJSXgaEW+30AM6v68jAqJaHzd1wU43h2fFlZWXJAUFNTU8GOvB41ahTnnXce5513HtFolNdff50lS5awZMkSli9fztq1a52ndRs9ejTTp09nv\u002F32Y+bMmRxyyCHMnTuXsWPHOj2O7F1jY2PyfU1NTRcO7yGNYhcRERHJC\u002F400c7bVKWlpd2dnZ3lra2tRKNRiouLXRY\u002FoB\u002F96Ee9nnlzwdChQykqKqKmpobS0lJGjBjBsGGZyMYpYejTpurG4T3U3d2tNlV+eQzTD5vuRKMYwdcgHsi\u002FgE2Ai0XFXdWpP29i+udvTWHfA4G\u002FA6swk34ewgQ\u002Fg0z8qQH2B2YAs4ETMcHAbE8Wcy0CPAd82HK\u002Fr2DiDTcBD9J\u002FuumxmN\u002FfYZhJWidgYoZ\u002FsDjO13r2e59l\u002FUoxAwm+iIkp\u002FRmTGj1IynYPmIy5\u002FvsDR2LOdZRlHfJOCSaQeQ9QYbFfO2bkRaZypW8DLrHc55+YafCpBGfnYkaUvAU8jpl6\u002Fk7PqxTzwRiFyfF\u002FFPAh8mcWZS57HDOzdUoK+x4JPIn58n8cc\u002F3fwayzUIa5XiMxN\u002FqRmGtWlX6VnfsaZgRKKq2BMkxg\u002FAKgHngRM2CjHpM6fXhPucOAcZgAeqG0OtZhztvmjw2Y0WPPEM66FxKuXqPYPcdTSCsrK5Mj3xoaGlwWnbOKi4s5+OCDOfjgg7nwwnfH5ezYsYMNGzawfv16Nm3aRGtra\u002FLV2dlJQ0MDpaWlVFdXU11dTVlZGcOGDaOkpIQhQ4ZQXV3NpEmTGDNmDBMnTqSmRn8uc4H\u002Fc11bW9vl8h7q7OxUx4WIiIhI7gu1TVVeXt7Z2tpaHY\u002FHaWxsZMSIzC639\u002F73vz+jx5PBJ9Gm8jwvXltb2+3yHtIA27yzAzNJJd2l9pYRLJgV1GPYz7rsT9j9pj\u002FG9NWnmop5JmbCz9WYJRA2YGICuzD94jWY9MdVmAli4xh47eZC8kfsg8FgAqWJZTW3AzsxsbFyTCDYJp64J02YSV5PplheOWZiXWJy3RZMXRNxoTjmutdiJpFVYSbH2cyULhglwI3YB0wrgdPdV2eP3kpxvxuAO9M47oye18VplCHBxTCfxx+lUcbMnleQtBu5qA4zouV3aZYzAjOiZTD5I2YU1\u002FkW+yTWDz4E88dC8keyMRSNRp2nNKuoqEjODB4sweA9GTNmDGPGjFFnSoHpGwxWSjMRERGRQcc\u002FM9h5m6q8vLzXANtMB4NFwpZoU5WWlnYVFRXhuE2lpXfyz6OkHwx2lSI64VHSDwa\u002FAaxPvyp7FcNka30GMzs3HVWY2IC864+YmItNRs2+xva8wrAEk5r696SfYWEfBleg30oRJvBUqH6LSQ2Qbd2YfPNLsl2RPPB\u002F5Eb68Q7M+rmvZeHYvwduycJxC8FXMWlQbIzGBN+1znd+6dVxgfl75uylYLAUOv8o9pqamigO75\u002Fu7m51XIiIiIjkvl4zg3HcpqqsrFSbSgpWV1cXra2tAFRUVHTi+P5Rmui85GL2rOtg8BNANM0yMpVNsQ04FViRoeMNJk3AD7JdiQH8EROnTPfzKntRhOM1QXJMFPg8wfLEh+m7wCJMfnbZuw7MNQuy3m2Yvg4s7nllwzdIf3bwYNQGnIH9g\u002FIHgKvcV0dClFzINhqNJta3cvaqqqoadGmiZXDxj2LvWb\u002FN2f3TJ02020WnRURERMSV5HNaT+DJaZuqJ0AGqE0lhcf\u002FmS4rK+vE8f3TJ0202lT54Z9AOguV78Is+edSYhnBdGRyab0dwHGYGcLi1g3kxgS8vfkZJt1zR7YrUqgKbUHs\u002FiwjuymDfwxc1\u002FP++SzWI588C1yexeNfi7lukL1rFgXOJr0054PVq5i1l21dBpzkuC4Snu6eF11dXcXxeNxz+dIodilk3d3dyVHs5eXlXa7vn87OzmLf4TSKXURERCQ3+bMtOW9TKduSFDL\u002FZzqMNlV3d7faVPmnCzMTN1WPEs6syEfT2LcN00+fSY2YDKs3YtZ7FTfaMGvz5vr3yb2YbK1rsl2RQjQYgsEAtwPfIrNfIHHMiIuv+I6rYHBwNwDXZ\u002FiYMeA7wBW+\u002F5fNaxYFPocJbHbtfVPp43bgfst9EusHa12B\u002FNEGZs1gzzF\u002FMLixMZ2BnSK5p6GhgXjcPJqUl5d3ur5\u002F+qQ0i2TnLEVERERkAL3SRLt+JtQAWylk\u002Fs90RUWF8zZVn2xLalPlj3QCr2HNwH0sjX2fITvBw05M1syTyZ3ZrIUQmF6KyaiZ6zNvXwIOxcwUzpW00dnOYuvEYAkGA3wPOBdozcCx6oFPYGYa+r8odqBRDTa+CVxMZh56dmD+wFzd5\u002F+vAbZn4Ph7cwtmRMzyLB0\u002F22nWU3UesMFyn9HAPWj94HzRDGbN4FgsVuSy4VVdXa2OCylYfUexu7x3PM\u002FzIpFIme9wTZk\u002FQxEREREJIPmc1tXVVer6mVDBYClk\u002Fs90ZWWl8zZVZ2dnqe9walPlj1SDwbE09h3IC8DuFPfNZIro\u002FjwKzMIEhndmqQ5LMDGlr2Tp+K79DTPzeku2KzKAZuAiTFA4rHtjII2Y7LEHA5uzVAenBlMwGEzK3Tm4X4w9oRv4KXAA8Nc9bKPZwXZ+irnpnwyp\u002FE7gZsw129NIqVy4ZkuBI4ALyNyAgieADwGPZ+h4ru0GzsI+mP1B4H\u002FcV0dC0AAQj8e9lpaWUpcpmWpqatRxIQWr7yh21ynN+gSDdQOJiIiI5KZOemZ8RSIRp+2peDzuVVdXJ9cMVrYlKTR92lTO00SrTZW3NgCrUthvGWaiUhiipJ6+OtvBYDB\u002Fq24EJmMm\u002FizLwDE3AD\u002FBxJGOAX5N7qdXtvEsJsD5I9xmI20A6hyWB\u002FAKZlnHg4D\u002FI\u002FzBMR3AU8AXgAmY5WdfDfmYGTMYZ7+tBU7BzLT8MvBxoGyvewysHvOlcDuweoBtFwP\u002FL83jDTargBOA4zHX7COk\u002F9ndAfwKc83WD7Dt85iZ3tkWxXzp\u002FQL4GOZztBCodHiMHcADPcdY4rDcbFkMXAlcY7nfNzF\u002FGLM18kiCSTaIWlpayocMGeJsFnttba2CwVKw+o5iBzyX5UciEf8odt1AIiIiIrmrAajs7Owsw\u002FEzYXV1dbJ9pjaVFBr\u002FZ7qqqsp5m6qjo0PB4Px1K6Yf28aDYVTE59fYpzluAt5yX5WUtWP6q38BTMXEdE7ETJ4alUa5UcyszxcxQfPHCWci1mbMerhBvR1CHfzqMbOdr8ME2f8NmGtZRjcmWPs8sAjTjx5WCurXMJPkvoyJEX0UE6ifRXpxoibgTeBpzLV\u002Fjp5lCR17rOc4QaQ6k39AJcCnwyrcoeYQynyu5zUC+DDmS\u002FpQYDZQPsC+LZiL9wzmQj5D8FTGfybYBU03D\u002FlK7K7tyjSPlwlP9rxGYdIZnIj5kjqQgQP6TcAbmGv1KPAPzMiiIO5h4HTDmUylHMN8jv4MVGN+D0f1vGYBYwKW04H54\u002FYm8DpmtNc\u002FcZMD\u002F4fAXwJuG3bO\u002FeswAwqKLffTOs25L9kgampqKhs\u002FfryzP9b+jovdu0P7GyySFX2DwfF43GnHRXt7uzouRERERPJDAzA+Ho97ra2tpVVVVc76NnoCZIDaVFJ4wm5T9ZkZrKn1+eVnPa9c8veeV6FYh1lW8Zaen6cC+2NmD0\u002FExA6KgeGYPvtmTICvA\u002FN3rwkTbH0bM0ksaIwgHS+Qm3G4bZhlM6\u002FGxBQOBaZjYmaJVzEmHtaICSKv6Xm9RTiB073pwGT9TWT+rcbE896Huf7jgBrM5LkKTL07Mde9o+fnzbx7\u002Fd\u002FJUL2\u002FkaHj7FUJdiMSClE98IeeF5jU2WMx08CHY35HZZi1hhswMyc3pXG8d8jM77wuQ8fJhp2YAO09PT8X8+41G4a5ZqWYa9aI+V2kkwd\u002FK7n7u2zFpCT3pyWvBKYAQ4Hanp+7MV94jZiRVM2Y8wprEfYXel65IAbcn+1KSCiSra+2trYyz\u002FOcNb6GDh2qmcFSsPydcRUVFV0u7x14zyh29fyJiIiI5C7\u002FANvy6upqZ30EWnpHClnfmcGu21S+NYNb0GQFkYGs63lJenaQG6nBbbSSW3GInDYY00QPJIYZEbEt2xWRwKKYwObWbFckR7RjZkGLFLpk66u1tdVpMLi6ujrqeV48Ho976riQQtPU9O4SK1VVVd0hdlyARrGLiIiI5LK+bSpnayL6l\u002FFRm0oKjX8d7Orqaqdtqmg06nV1dSX67DW4VkREnFAwWERE8lWvmcEu0zIVFRVRXl7eGYlEyt955x3i8TiO42UiWbNjx47k+5qams4QU5ppFLuIiIhIbku2qZqbm522qYYNG5ZMu+l\u002F\u002FhQpBP7PdG1trdM2VZ97USMpRETEiaJsV0BERCRFvYLBgOfyVV1d3QHQ0dGhNa6koGzb9m7ykxEjRkRweN\u002FEYrEi3yh2dVyIiIiI5LbQ2lTV1dXR0tLSboC6uroMnY5IZvjbVKNHj+7A4b3T0tLiX3ZHbSoREXFCM4NFRCRf9e24cDrAqaamJrJr164hYDovRowY4bJ4kazpEwzuxOG909LSUqpR7CIiIiJ5Iznq1fXSOwDV1dUdDQ0NJY2NjbS1tVFVVeWyeJGs8bepRo0a1eHy3lEwWEREwqBgsIiI5Ktko6i9vb3UdarbmpqajsT7bdu2MWvWLJfFi2SNf2bGyJEjO1ynNPP9qI4LERERkdyWXPi0ra2tLBaLOR1gW11dHWloaKgG8ww6bdo0l8WLZE2iTVVWVtZVVlYWd3nvqE0lIiJhUDBYRETyVbJRFIlEnI9iHzJkSK9gsEihSHyei4uLY0OHDu3GpCNzQqPYRURERPKKf4Ct8zZV3wG2CgZLIWhubqa1tRUwn3HX901P5rMEtalERMQJBYNFRCRfJRtFHR0dpTgMaAEMHTo02XGhNa6kUHR2dlJfXw9AVVVVYm0rZ9ra2kp9P6rjQkRERCS39cq2hONnQ\u002F8AW7WppFD4B4tXV1erTSUiInlBwWAREclXoaaJ9geDNTNYCkVdXR3xeBww62K7vm\u002F6zAzevccNRURERCQXhNqmqq2tVZtKCo7\u002FsxxGm6q9vV0zg0VExDkFg0VEJF\u002F500SXuk7NNHz48M7Ee41il0Lh\u002FyzX1tYqpZmIiIjI4NYr25LrZ8Nhw4apTSUFx\u002F9ZHjJkSGcIbSrNDBYREecUDBYRkXzVAMQBr7Oz03nHxYgRIzSKXQqO\u002F7NcW1vrvOOiJ71gQqPLskVERETEuV4zg0MIBqtNJQXH\u002F1keOnSo8wG2kUhEwWAREXFOwWAREclX3UArUBOJREpcp2YaOXJkchS7Oi6kUPSdGez6vtEodhEREZG80ivbkutnQw2wlULUd2ZwCGmi1aYSERHnFAwWEZF8Vg\u002FUdHZ2lkSj0aLi4uK4q4JramqiJSUl0e7u7mKlNJNC0WcUeycQZproepdli4iIiIhzu+nJttSzTmloA2zVppJC4W9TZI1hNwAAIABJREFUDR8+vAO1qUREJA8oGCwiIvmsDpgcj8e9Xbt2VYwdOzbisvCamprOhoaGyoaGBtrb26msrHRZvEjG+Tvhhg0b5jxNdHNzc7nvR03\u002FEBEREcltXcAuYFRbW1uZ62fD4cOHdxcVFcVjsZinmcFSKLZv3558P3z48C61qUREJB8UZbsCIiIiaUg2jHbt2lURj8c9l68hQ4a0J8pft25dds5QxKH169cn348ePTri+p7p03Gh6R8iIiIiuW8bQDQaLWpoaChz+WzoeR7V1dURMAG0tra27J6piAP+voExY8Y4b1O1trYm2lRRYGdWTlJERAqOgsEiIpLPksHghoaGcs+xESNGJIPBa9euzc4Ziji0evXq5PsJEyZEXN8zLS0t\u002FmDw9vfWQERERERyTLJNVV9fX+H6+TDRporH47z99tvZO0sRB6LRaHKAbWVlZeeQIUOiLu+XWCxW1JOyHWAHJiAsIiKSNgWDRUQknyVnHjY0NJS7HpE7evToZDB4zZo12TlDEUe6urrYuHEjANXV1Z3V1dXREEaxJzoudgPte6yMiIiIiOSKZJuqvr7eeZtq5MiRalNJwVi\u002Ffj2dnWYp7BEjRrS7vl\u002Fq6+vLYrFYIu20UkSLiIgzWjNYRETyWbJx1NjYWBGPx50OchozZkxyDWLNDJZ8t27dOrq7uwEYMWJEm+v7paWlpaS7u7u450d1XIiIiIjkB3+2JedtqtGjRyfbVAoGS77zf4Z7gsFO75eGhoYK349qU4mIiDMKBouISD5LjmJvamoq8zzP29vGtsaPH69R7FIw+nRcRFzfL\u002FX19VovWERERCT\u002F+NtU5a6fEceMGaOld6Rg+NtUY8aMaQ+hTeUPBqtNJSIizigYLCIi+Sw5Ura5ubk8Ho87bYjts88+GsUuBcO\u002FXvDo0aPbXd8vu3fv9geDNYpdREREJD\u002F4sy05b1ONGzdObSopGP7P8OjRoyOu75eGhga1qUREJBQKBouISD5LjpRtaWlxPjO4qqoqVlVV1dnW1laWWBuorKxs4B1FcpB\u002FJsbYsWOdj2Lv03GhUewiIiIi+SH53Nbc3Oy8TTVx4kRlW5KC4f8Mjx8\u002F3nmbqqmpyd\u002FhoDaViIg443RdAxERkQyrA2IALS0t5YDn+jVy5MgIQDQaZcOGDZk6LxHn+nRcRHB8rzQ2NioYLCIiIpJ\u002F\u002FNmWynD8jFhRURGvqanpBNi4cSMdHR2ZOSuREPjbVD2ZxJzeLz33YILaVCIi4oyCwSIiks+6gHqA1tbWsng87rl+jRgxQiPZpSD4P7\u002Fjxo3rcH2v9BnFrpRmIiIiIvkh+dzW0tJSHmabKhaLsW7duuydqUga\u002FJ\u002FfioqK7pqamqjre6XPAFu1qURExBmliRYRkXy3DRgVjUa9pqam0qFDh3a7LHz06NFa40ryXnd3N+vXrwegqqqqq7a2NooZfe6MgsEiIiIieakZaAWqw0gTDTBy5MjIxo0bh4JpUx1wwAGuDyESOv\u002FM9hEjRjhPEQ1m+Svfj2pTiYiIM5oZLCIi+S6ZOmn37t3lnmPjxo1LBoPffPPN7JyhSJrWrl1LV1cXACNGjIi4vk88z1NKMxEREZH8VQfQ2dlZ3NHRUez6OXHMmDHJNtUbb7yRvbMUSYP\u002Fsztq1KhQ2lR9gsHbM3+WIiJSqDQzWERE8l1ytGxDQ0NZPB5v39vGtiZNmpQsb8WKFS6LFsmYl19+Ofl+\u002FPjxrfF4XKPYRURERCRhG7AvwK5du8onTJgQGWB7KxMnTmxLvF+5cqXLokUyxt+mmjBhQltIbarSnreNQNvethUREbGhmcEiIpLvkkGn3bt3l2NS3zp7TZ48OVJaWhoD03ERi8Uyc1YiDvk73Xo645zeJ4B\u002FZnAH0BD2OYmIiIiIM\u002F42VRmOnxOnTZuWDGppgK3kK3+bavLkyc7bVK2trSVdXV3FPYfQ4FoREXFKM4NFRCTfbU28SaSJdll4cXExo0ePbtu6dWtNS0sLb7\u002F9NtOnT3d5CJHQ+Tvdpk6d2ub6PolEIkWRSCTxXLkNiLssX0RERERClWxT1dfXl3ue1+Ky8NGjR3dVVlZ2t7e3l7zxxhtEIhEqKipcHkIkdP421bRp05y3qXbt2lXu+1HBYBERcUozg0VEJN+tT7ypr68vj8fjnuvX+PHjNZJd8lric+t5HlOmTGl3fY\u002FU1dX5e\u002FPWZecsRURERCRF6xNvdu7cWRFmm6q7u5vXX389aycqkorW1lbWrFkDQHV1ddfw4cO7Xd8j27dvV5tKRERCo2CwiIjku\u002FWJN\u002FX19RWYv21OX5MnT06uG\u002FzPf\u002F4z7PMRcWrDhg3U1dUBMGrUqPaeWRhO75Ht27dX+g6pjgsRERGR\u002FLI+8WbXrl2htKn86wYvWbIk7PMRcerFF18kGo0CZr1gQrhHdu7cqWCwiIiERsFgERHJd8lGUn19vfM1gwFv\u002F\u002F33T6ZJe+6550I\u002FIRGX\u002FJ\u002FZKVOmtBLCPbJz505\u002FSjN1XIiIiIjkl9DbVNOnT0+2qRYvXhz6CYm45G9T7bvvvi2E06ZSMFhEREKjYLCIiOS7ZmAXQGNjY1ksFivCcaNsypQpkfLy8ijA8uXLaWtLDmoXyXnPP\u002F988n1YHRd91rdSx4WIiIhIfkk+vzU0NIQ1wLY1cYx\u002F\u002FOMfoZ+QiEv+NtX06dNDGWDbMxAjQW0qERFxSsFgEREpBOsAYrGYt2vXrjIcN8qKioq8yZMntwJ0dXXx4osvZu7MRNLk77iYMWNGG+q4EBEREZHemoB6gIaGhrJ4PO78eXHYsGHRUaNGRQC2bNnCxo0bM3ZyIumIxWLJ5aKKiori++23n9pUIiKSdxQMFhGRQpBsKO3YsSOUkew9MyoBWLRoUegnJOLCjh07eOWVVwCorq7unjhxYgfhd1ysD\u002Fu8RERERMS5dQDRaDSUAbaAN3Xq1OTsYLWpJF8sW7aM3bt3AzB+\u002FPj2ioqKOCHcHw0NDWU9h4wAdZk4NxERGTwUDBYRkUKwNvGmrq6ughAaZrNnz04Ggx955JHQT0jEhUceeYRYLAbAjBkzmgjh3qB3MLgV2JaBUxMRERERt5Jtqq1bt4bSppo1a1Zz4hhqU0m+eOihh5LvZ86cGUqbqqGhoTQSiRT3HOZtIB72eYmIyOCiYLCIiBSCtxJv6urqQpkZvN9++7XX1NR0gVk3eNs2xbsk9z388MPJ97Nnz24mhHtj586dZZ2dnYlnyrdQx4WIiIhIPnoz8SasAbZz585tKSoqigM89thjdHV1ZeTERNLhb1PNmTMnlDZVzwCMhDdCPSERERmUFAwWEZFCkGws7dixI5SOC8CbMWNGC0A8HufBBx\u002FMxHmJpCwSifDoo48C4HlefM6cOS2EcF9s2bJFHRciIiIi+S\u002F0YHBVVVVs8uTJbQBNTU08\u002FfTTmTgvkZRt3bqVF198EYCqqqru6dOnt6M2lYiI5CEFg0VEpBCsSrzZuXNnKDODAe+QQw5pShznzjvvDPucRNLywAMPJNe2mjZtWmttbW2MEO6Lbdu2+Tsu3kRERERE8lEyAPXOO++E1qaaM2dOsk111113hX1OImm5++67k8vuHHjggc1FRUWh3Bc9g9oT1KYSERHnFAwWEZFC0ADsAKivry\u002Fr7u4uIoQG2mGHHdZSXV3dDbB48WLefFNtNMldv\u002F71r5PvjzzyyAZC6tDbvn17Oe\u002FSTSEiIiKSn96kZ7mPHTt2hBYMnj9\u002FfmMiVfR9991HY2Njhk5PxN5vfvOb5PtjjjlGbSoREclbCgaLiEiheBMgFot5Ya0bXFxczKGHHprsrbjtttsycmIitlavXp1MEV1WVhY74ogjQlnbCvB6OgsTlNJMREREJD+1AFsBGhsbyyKRSDEhPDsOGTIkuv\u002F++7cAtLe386tf\u002FSpT5ydi5YknnuC1114DYPjw4Z0zZ85sI6Q2Vc9s\u002FAQFg0VExDkFg0VEpFAkU0Vv3rw5tHWDjz322AbP8wC444472LJlSwZOTcTO1VdfTTQaBeDQQw9trKysjBPSPbF9+\u002FZESrMY8FYGTk9EREREwrEKIB6Ps2XLltBmBx977LG7Ewe8\u002FvrraWtry8S5iVi58sork+\u002FnzZu32zMdAc5fHR0dxQ0NDWU9h9qGyXwmIiLilILBIiJSKF5JvNm4cWOFF5LJkyd3zp07twkgEolw2WWXZe+MRfrxwgsvcM899wBQUlISP+2003aFdT80NjaWNjc3l\u002FQc+i1APXkiIiIi+Wtl4s3GjRsrw3qGPPTQQ1snT57cDlBXV8d1112XvTMW6ce9997Lc889B0B1dXX3hz\u002F84Yaw7ocNGzZUJNYlBlZk7aRFRKSgKRgsIiKFItlo2rJlS2UsFisK6\u002FWRj3xkV3FxcRzgt7\u002F9rdJFS86oq6vjM5\u002F5THJW8JFHHtkwcuTIaFj3wttvv13pO7w6LkRERETyWzIYvGnTpoow21SnnXbazsSxrr32Wh588MHsnLFIH6tWreKCCy5I\u002FnziiSfWl5eXE9a9sGHDBrWpREQkdAoGi4hIoViJSVPL1q1by8Matet5njdx4sSuU089Ndl58R\u002F\u002F8R98+ctfprW1NWsnL\u002FLoo49yyCGHsGHDBgBGjRrVefrpp4c2K9jzPG\u002FTpk0Vviqs7L9mIiIiIpIn\u002FANsQ8u25Hmed\u002FDBB7fPmzevASAWi\u002FHxj3+c733ve3R1dWXv7GVQi8fj3H333Rx55JE0NJhMzdOmTWtbuHBhaLOCPc\u002FzelKyJ6hNJSIioVAwWERECkULsBagqamppLGxsYSQ1rgCvFNOOaVhzpw5zYmD\u002F\u002FjHP2bq1KnceOONtLS0hH+2Ij2effZZTjjhBE466STq6uoAqKioiF100UXbwlwrGPA2b97s77jQKHYRERGR\u002FLYKiABs27atPB6Ph\u002FYcCXhnnnnmzve9733tANFolG9961vMmDGDX\u002FziF3R0dGTmjGXQi8ViPPDAAxx++OGcffbZNDebZv7QoUO7L7zwwrri4uJQ74PNmzf7B9iqTSUiIqFQMFhERApJchTthg0bKgixweZ5nnfRRRdtX7BgQb3neQC88847fOMb32D8+PGcc845PPXUU\u002FjW\u002FhFxZvPmzVx\u002F\u002FfXMmjWLY489lieffDL5bxMmTOi4\u002FPLLN02aNKmLEO8BwNu2bZtGsYuIiIgUjm7gdYCOjo6i7du3lxHis2RJSQmXXnrp1iOPPLIpUYH169dz3nnnMWHCBL70pS+xdOnS8M9aBqW33nqLb3\u002F720ydOpWPfvSjLF++PPlv06dPb7viiis2DRs2LEaI90A0GvV67jOANmBNuGctIiKDlZftCoiIiDj0TeA6gJNOOqn+E5\u002F4xO5MHPSNN96o+Mtf\u002FjJy3bp1FX3\u002FbdSoUSxcuJBTTjmFBQsWMGrUqExUSQpMd3c3S5cu5aGHHuLhhx\u002Fm5ZdfJh6P99qmsrIy9qEPfajhlFNOaSgtLY3voShnWltbiy699NKpPfXYBkwI+5giIiIiEro7gPMBzj777O3z58\u002FPSNqjZcuWVf\u002Ftb38bUVdXV9b33yZOnMjJJ5\u002FMySefzIknnkhtbW0mqiQFpqOjg+eee46HH36Yv\u002F\u002F977zxxhvv2WbIkCHdCxcu3H388cc3FRWFP4dqw4YNZddee+2knh+fB+aFflARERmUFAwWEZFC8kHgGYAZM2a0X3rppdsyefBXX3218oknnhj65ptvVsZisff8jfU8jwMOOIBjjjmG+fPnc9RRRzFjxgwy0ciU\u002FFJfX8\u002FSpUt5\u002FvnnWbx4MUuXLt1j+vERI0Z0HXXUUc0LFixoqqyszNhU9Jdffrnq9ttvH9fz45+A0zN1bBEREREJzeeAXwEcc8wxTeecc87OTB04Ho+zdOnS6qeeemro+vXrK\u002FoOfgQoLi7moIMOYv78+Rx99NEcffTRTJ06NVNVlDxSV1fHCy+8wOLFi3n++edZtmwZkUik323HjRvXOX\u002F+\u002FKbjjjuuORMDaxMWLVo05E9\u002F+lNixPj3gf\u002FK1LFFRGRwUTBYREQKSSXQAJSVl5fHbrnllg3FxcUZr8Tu3buLlyxZUrN8+fLqzZs3l\u002FfXiZFQXV3NwQcfzNy5c5k7dy6zZs1iv\u002F32Y+zYsRmssWRLe3s7a9asYfXq1axcuZIVK1awYsUKNm7cuNf9ampqogceeGDb0Ucf3XLAAQdEEqnKM+nee+8d\u002Fvjjjw\u002Fr+fFrwC0Zr4SIiIiIuLYf8BbA+PHjO6+88sot2ajE9u3bS5577rnaV155paq\u002F2cJ+w4YNY+7cucyZM4e5c+cyc+ZMpk+fzsiRIzNVXcmi5uZm1qxZw1tvvcXLL7\u002FMihUrWLlyJXV1dXvdb\u002Fjw4d2zZ89umzdvXvPUqVM7M1TdXm6\u002F\u002FfbRL7\u002F8ck3Pj58A\u002FpKNeoiISOFTMFhERArNEuAogP\u002F+7\u002F\u002FeOmXKlKw06hKampqKV65cWfn6669Xrl27tqKpqSlQdLq2tpbp06czffp09t133+T76dOns88++4RdbXGotbWVNWvW9PvasmXLe9I996ekpCQ+adKkjpkzZ0YOOuigtqlTp3ZmIwDsd8MNN4xbu3ZtIjX6UcAL2ayPiIiIiDizDRjneR4333zzxqqqqoxln+nPrv\u002Ff3r3FxnHdZwD\u002FzszsndwLr8u7KFGJaSmWXDVpKqdGCidF27jNQ+u85KEvbVG4D07Rh\u002FilFwQpigAt+tI3F3VstHBgtAFqO3ai1LER2JKlJpKo0JJ405XkXrgkd5fcmb3MpQ8zs1peRVIil1x+P+BgZoc7O2cBAdrv\u002FOecmZ9Xrl69Grh+\u002FXrg9u3bvkKhsKVMFYvFVuSooaEhHD9+HENDQ2hvb9\u002FtbtNjlMvl1mSpiYkJTE5OIpVKbekzvF6vOTAwUBoeHi6eOnVK7e3trexytx\u002Fq29\u002F+dm82m1Wcl10ANq9gExER7RCLwURE1Gj+CcBfA8ALL7yw8NWvfnWpzv1ZYW5uThkbG\u002FPdunXLd+\u002FePW8ikfBWKpVt\u002FX8cDAZx9OhR9PT0oLOzE11dXejq6kJnZye6u7vR0dGBnp4ePktrl1UqFaTTaczOziKZTCKZTCKRSCCVSmFmZgbpdBp37txBIrG91cqFEIjFYnpvb295cHCwdPz48dLRo0fLiqLs2XJlD2MYBl566aX+crksAGgAogDqeuMFERERET02P4Q9SxEvvvhi+vTp01qd+7PCzMyMZ3Jy0jc5Oembnp72JpNJj2EY28pU4XAYg4OD6OnpqeYnN1vF43HE43F0d3cjGAzu1tcg2M\u002Fxrc1Ps7OzSKVSSCQSSCQSSCaTuHPnDubm5rb1uZIkobW1tdLX11c+evRo6fjx46X+\u002Fv5yPVYO28jCwoL88ssv9zovpwAM1bM\u002FRETU2JSHv4WIiOhA+QhOMfjmzZv+r3zlK+s\u002FaLVO2trajLa2NvWZZ55RAcA0TczOznru3bvnmZ6e9qbTaWVubs4zPz+vbFQkVlUVo6OjGB0d3fRawWCwOpjR0dGBlpYWRKPRh7ampqZNP7fR6LqObDaLbDaLxcXFdffdNj8\u002Fj9nZWaTTaaTT6Ue6rhACkUhEb2tr0zs6OvSurq5Kf39\u002Fub+\u002Fv7Le7AvLsvbNTXzj4+M+pxAMAP8HFoKJiIiIGslHcIrBN27c8J86dWr9B63WSXd3t97d3a0\u002F++yzBQDQdV1MT0977t+\u002F75mZmfGk02nP3NycsrCwoOi6vu5v6Hw+j5GREYyMjGx6raampmrBuLOzE7FYbEuZ6rAVkUul0prsVNtqs9Xc3Fz1ZtqFhYVHuq4kSYjFYnpbW5ve3t5e6e7urgwMDJT7+\u002FsrXq939c20YiurMu2V0dHRQM3Lj+rWESIiOhRYDCYiokbzM9iFKe\u002F4+HhA13VpP82oXE2SJPT29uq9vb067BmWVYuLi3IymVRSqZQyNzenzM3NKZlMxjM3N6fUFOI2pKoqpqamMDU1ta0+KYqCaDSKcDiM5uZmKIqCSCTiBm1IkoRIJAKPx4Ompib4fD4Eg0EEAgH4\u002FX7IsoxwOLzmc5uamuDxeNZca\u002FUM5kqlguXltTX8fD4PwzBWHCuXyygUCrAsC9lsFoZhIJ\u002FPVz+jVCpBVVVomoZisYhCoYByuYx8Pg9N05DNZte91uMiSRKi0ag7OKG3t7frHR0dejwe1zs6OnSPx7PRv819U\u002Fhdz69+9avagYsf160jRERERLQbfgLgnwHg008\u002FDQDI1bc7m1MUBUeOHKkcOXJkxbK\u002FlmUhk8koqVRKSafTSjqdVjKZjJJOp5X5+fkNC8W1lpeXMTY2hrGxsW31yefzIRqNIhQKrchSblbaKEuFQiF4vV54vV6EQqE1n+t+1uprrS4+uzlotWw2u+YxNW5W2k6WMgwD2WwWqqoim81C03Zv8rgsy1YsFjPcTNXZ2Vnp6OjQOzs79ba2NmOTvL+vM9WqYjAzFRER7SoWg4mIqNHkAZwH8OVSqSTGxsZ8J06cKNW7UzsRi8XMWCxWHh4eXjPrMp\u002FPS7lcTl5cXJTd\u002FVwuV91fWlqS8\u002Fm8XCqVth2AdV1HJpNBJpN5PF+kAcmybIVCITMajRpNTU1mOBw2otGo0dzcbMZiMSMcDhstLS1GJBIxH3Izwr4eoNjI9evXawcu3q1bR4iIiIhoN3wK4C6AgXQ67Umn056Ojg693p3aLiEE2tvbjfb2dgPAikzo3Ewq5\u002FN5yclUcjablZaWlqq5Kp\u002FPy\u002Fl8Xt7uY32AB8sf08YURbGamprMSCRiNDc3V\u002FNUNBo1wuGwEYlEzFgsZkSjUWN1AXyVA5epTNPE+Pi433lpAPhpPftDRESNj8VgIiJqRO8B+DJg32174sSJyuZvP3jC4TDC4bDR19dnbPa+UqkkFhcX5aWlJUlVVaGqqqSqqqRp2op9TdOkYrEonNdSsVgUW7lT\u002FqALBAKm3++3gsGg6ff7zUAgYAWDwdqtGQwGrWAwaAaDQdMp\u002FJqRSGTNMs4bEDiAgxObWVhYkBOJhDvFOwHgWj37Q0RERES74j0AfwHYq8I899xzhTr357ESQiAWi1mxWMwYGBjYNFMVi0WxsLAgLy8vS4VCoTZLCU3TJFVVV2QpVVVFsViUisWi2O6zjA8aIcRmmcoMBoOWs63mKqcAbDY3N281U21aCT6IJiYmvKqqut\u002FrAoD5evaHiIgaH4vBRETUiH4E4HsAcO3aNf83vvGNJSEaOoNvyOfzIR6PG\u002FF4fNMBjvXoui5KpZIol8uiUqmgVCqJSqUiisWiME1TaJomDMMQmqYJ0zRRLBYlXdexejZysViUTHNlznffv9n1FUWx1nnOEwKBgCWEqB6XJAmBQMCSZdny+XyWx+OxvF6v5fF4LI\u002FHA7\u002Ffb0qShFAoZAkhrFAoZEmSZAUCgUdZPvxw\u002FoMCcPnyZX\u002FN0nI\u002FArBvl2EnIiIioh17F04xeGRkxP\u002Fcc8+tXXP4kPD7\u002Feju7jZgz+DcFidLiVKpJHRdr2YmTdMky7KgqqowDEO4hePa\u002FFXLfX8t9\u002F2bXd\u002FJRGt+rweDwRUBTZZl+P1+N0NV85Tf77ecvOVmKlMIgWAwaCmKYvl8PmaqHbhy5UrtSkvv1a0jRER0aLAYTEREjehTAGMAPpvJZJTJyUnv0NBQw80O3m2yLMO5e7shi32WZR3awYdHcfHixdoHkv2wbh0hIiIiot30v7AfwROemJjwzc\u002FPKy0tLdsuhh52Ho8HHo+nNlNtdTbsgcBMtX2maeKXv\u002FxlbTGYmYqIiHYdi8FERNSoXgfwDwBw\u002Fvz54PHjx\u002FN17g\u002FRgTczM6Pcu3fPXSI6BT7bioiIiKhRaQDeBPCnpmnik08+CXzta19rqKWiiephdHTUl8\u002Fn3VWyLgK4Wc\u002F+EBHR4dBwz1wgIiJyvA7nruvLly\u002F7y+WyhAfPb2VjY9tBO3\u002F+fO0d7K8D0EFEREREjeo1d+fixYt+ZxYoGxvbI7RVmeo1EBER7QEWg4mIqFFNw17aDMViUXzwwQcB7IPgx8Z2UFuhUJA+\u002FvhjDlwQERERHR4fA5gEgFQqpVy5csWPffC7lI3toLZkMqlcu3bNB1sJwA9ARES0B1gMJiKiRvYv7s65c+eCxWKRs4PZ2HbYzp07F9Q0TcD2Y9jP5iYiIiKixmWhJlO99dZbQc4OZmPbeXv77bdDpll9bPS\u002FA1gEERHRHmAxmIiIGtmPYd\u002FNjuXlZen999\u002Fn7GA2th20XC4nf\u002Fjhh7Wzgv8eRERERHQY\u002FBuAuwCQSCSUS5cucXYwG9sO2vT0tHL58uXaWcH\u002FCCIioj3CYjARETW6v3V33n333cC9e\u002FcU7IMgyMZ2UJplWeK1115rKhaLArZ3AFwEERERER0GZQDfdV+8+eabwWw2K2Mf\u002FE5lYzsorVKpSK+++mpTzazgVwDcBxER0R4R9e4AERHRHvgvAH8EANFo1PzWt7613NXVZdS5T0T7nmmaeOONN4I\u002F\u002F\u002FnP3TvYNQBPAxirY7eIiIiIaG8pAM4D+DwA9PT0GC+99NJyJBIxNz+NiMrlsnjllVdC165d8ziHUgBOAsjUsVtERHTIsBhMRESHQRuASwAGAcDv91svvPCC9qUvfaksBP8rJFpPKpWSXn\u002F99eDExIRSc\u002FjPYC8VSERERESHy2cAfAIgBgCRSMT85je\u002FqZ0+fbpS324R7V+3b9+Wv\u002F\u002F97wcTiYTsHNIBPA\u002FgJ3XsFhERHUIcASciosPiCQDnAPS5B7q6uoznn3++dObMmQqLwkS2TCYjvfPOO75Lly55DWPFBPq\u002FA\u002FCdOnWLiIiIiOrvtwC8BSDqHhgcHDS+\u002FvWvF4eHh\u002FX6dYtof5menpbffvtt38jIiMeyLPewDuDPAbxav54REdFhxZFvIiI6TLoB\u002FAeA3649GI\u002FHzbNnz5a\u002F+MUvViKRiLX+qUSNyzRNjI6OKhcuXPCMjIx4VhWBswBeBPBGfXpHRERERPvIMOzfhadqDw4MDBhnz56tfOELX6gEg0FmKjp0KpUKrl696rlw4YLn+vXrSk0RGABmAPwJgPfr0zsiIjrsWAwmIqI2VBGJAAAIPklEQVTDRsAOYX8D4GjtHyRJwvDwsHHmzBn9c5\u002F7nB4OhzmIQQ3LMAxMTEzIIyMjyi9+8Qsln8+v\u002Fl1YgX3X+ndgD14QEREREQGAF8BfAngZQEftHzweD5566in96aef1p988kkjFAoxU1HDqlQquHnzpnzlyhXl8uXLiqZpqzNVAcC\u002FAvgegMW97yEREZGNxWAiIjqsPLCLwi8DOLb6j0II9Pb2midOnDBOnjxpHDlyxPB4PHveSaLHKZPJiJs3b8qjo6PyzZs35XUGKwCgBOA\u002FAXwXwO297SERERERHSAh2EXhvwIQX\u002F1HSZIwODhonDx50njyySeNvr4+U5blNR9CdFBYloVkMinduHFDHh0dlcfHx+VKZd3HZi8BeAV2ETi9p50kIiJaB4vBRER02AkAz8IuDP8xgOb13qQoCvr7+82jR48aQ0ND5rFjx0zOHKb9zDAM3L17V5qampKmpqbkW7duSblcbrPffp8AeB3AD8C71omIiIho6xQAvws7U\u002F0BAN96b\u002FL5fBgYGDCOHTtmuo1LStN+Vi6XcffuXWlyclKempqSbt26JRUKhY0ylQngZ7Az1X8DUPeso0RERA\u002FBYjAREdEDIQC\u002F77TfA9C52Zuj0ajV29tr9vT0WH19fWZ\u002Ff7\u002FZ3t5uCcH\u002FXmlvqaoq7t+\u002FL+7fvy9NT09L09PTIpFISKue\u002FbuaDuAjAO8B+B8AY3vRVyIiIiJqaDEAfwg7U\u002F0OgOhmb25tbbX6+vrMnp4es6+vz+rv7zdbWlpYIKY9t7S0VM1Ubq5Kp9PCNM3NTtMAfAjgXdiZ6v4edJWIiGjbOFpNRES0PgHgDOyi8LMAfgMbzBqu5fV60dHRYXZ2dlrxeNyKx+NWZ2en1dXVZXq93l3uMjUyy7IwPz8vUqmUSCaTIpFISKlUSqRSKfGQGb\u002FVjwBwA8DHAM4B+CmA3G72mYiIiIgONQXAWdizhn8LwK8D8D\u002FsJL\u002Ffj87OzmqmcrZmPB63FEXZ5S5TIzNNE5lMRszOzopUKiW52SqVSonl5eWtZCodwDXYmeonAD4AZwATEdEBwGIwERHR1sgAngLwDIDfBPB52M8alrb6Ac3NzVZra6vV2tqK9vZ2q7W11Wpra7NaWlqsWCxm+XzrrqZGh4Rpmsjn82JxcRGZTEZkMhkxPz9f3S4sLAhd17fzkYsArgI4D+CCs+Xyz0RERERUL17YN9yehZ2rfg3AwFZPFkIgHA5bbW1tVltbm9Xa2orW1larvb3damlpsaLRqOXxeHap63QQ6LqOfD4vFhYWxPz8fDVXuZlqcXHxYTN9V0sDuAw7T30M4CKA5V3oOhER0a5iMZiIiGjnmgCcctpppz2BLcwgXo\u002FX60UkErHC4TAikYhVux8OhxGNRq1wOIxwOMylqA+QUqmExcVFkc\u002FnkcvlRC6Xq+7n83lks1mxtLSE5eVlYVk7WhHPAHAX9h3qV502AuDOY\u002FsSRERERES7I4YHWeo07Btwn8AWZhCvx+\u002F3IxKJWM3NzW5+siKRCNytm63C4TCXoj5AVFV185PIZrPI5\u002FMil8uhNlstLS2J5eUd12krAG7BzlFXa1ri8XwDIiKi+uJIMhER0ePXC+CzTht2tkMA+mAvlfZIJElCc3MzwuGw1dzcjEAgYAWDQTjNCgQC1f3Vx7ms2s5pmoZCoSA0TYOqqlBVtbqvaZpwjkFVVRQKBbG0tIRsNivK5fLj6sI87AGKcdjLPY85bRxA6XFdhIiIiIioziTYM4Y\u002FC7sw\u002FASAzwA4DqAb21idaSOKoqCpqcmKRqMIhULVvBQKhar5ynm9Jl9J0iNf\u002FlCyLGvdTOXkqWq+KhQK0DRNFAoF5HI55PN5UalUHlc3UrAz1Q3YOWrM2b8FuyBMRETUkFgMJiIi2jsK7ILwEQCDTjsCoB9AB4Ae7HBW8VZ5vV44gxlWIBCA3++H3++HLMvw+XyW1+uFx+OBu\u002FX5fJBlGX6\u002F35IkCYFAAKu3siyvu8S1e+5u0TQNq2fSGoaBUqkkdF1HqVRCpVJBpVJBuVyGc0wYhlE9t1AowLIsqKoK0zRRLBaFrusoFovQNK06KKGqu\u002F4YqArsJchmASQB3K5pd5xtfrc7QURERES0z3lhF4pr89Qg7CwVh10sDu5mB3w+H5xisRUMBuHz+eDz+aAoCrxer+XuuznL7\u002Fe72WlFpqr9u6IoltfrXXMt99zdsl7O0XUd5XJZuDmqJkvByVKiNkNpmlbd6rouyuUyKpVKNVO5RV5N03btezhKsIu9M3iQqe7gQa66BWDXO0FERLQfsRhMRES0vwQBdDkt7mw7YQ9uuAXjTmf\u002FwN2SLoRAIBBYc9zr9UJRlM0GI\u002Faie7uhAGAaKwu9SWc\u002F5WzTzj4RERERET26JtirNXXALg53Ots4HhSMO5x24Dg38q457vP5IEnSukVX9ybZAyoLe7lmt9CbdrYp53jS2S7Uq4NERET7HYvBREREB5MMe1CjFUB0Gy3mbPkbYOsKsAcg1mu5Va8Xa7ZJ51wiIiIiItp\u002FvLALwm2wM1IE28tWtHVL2DhTbdTmYRd8i3XoLxERUUPhQDAREdHhVDvQoTiv5ZrXzbAHR0IAAgD8zr4XQLjmvbJzbq1mrH02suyct1oQwNrb2u1i6molAOut15wHYNS8LsJe\u002Fkt1zlkCoMMu3BqwBxZ053gZdsFWc84rOMfyeDAIcWBvoSciIiIiol3j3mjr5iJ3G8aDLOWHnafcLOVmpSjslZ5q81etCNauBOWBPet5tSbnb7VM2PlnNTf3rJYFUPsMns2ylAE7L7lZys1fbpZyz6kt7NbmNSIiItpj\u002Fw9sAYJ0quYP8wAAAABJRU5ErkJggg=="
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n08_pause.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n08_pause.png": "embedded\u002F7bead0ebaf47ce67dc85f7e3a72f42260fb6436d92be3ddd772339b25a3ae219.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_2",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===2)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 430.48,
                    "height": 226.72,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Nach jedem Abschnitt haben Sie die \nMöglichkeit eine kurze selbstbestimmte\nPause einzulegen.\n\nEs wird Ihnen außerdem mitgeteilt, dass \nsich die Anordnung des Spielfeldes ändert \nund ob ein Bonus im kommenden Abschnitt \nmöglich ist.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -940,
                    "top": 325,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "data:image\u002Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAB4MAAADsCAYAAAB+BABqAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuVgAALlYBcQIutwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7N15nBTVuT\u002F+Ty29zw4zwyzAsK+yqghCJCrKYvCqqLlE0RiXSELUq9EkXuOaxZi4RuNN3K65in5j1J+ioGiiIioIiiwyLOIMCLMyS0\u002FvXV31+6MXmmGEGeb01HTP5\u002F169Wuqe6pPPQ1dUM95Tp0jgYiIiPqifAB5sYcKIBeABUAWABsAZ+xhi71mie0jx96rAMhJek9c++dxdgCODl6Pt91eKwC93WsGgJYO9tUAtHXwPAjAB8APIADAAyAMwA0gAqA5dozW2OuepPd4Ysdqjb2XiIiIiIgoTsahfCof0ZwqG4dyKQeiOVBncqn2uVK8jfZcAKwdvJ4Ta7O95g5eiyCaD7UXz4PiQgC8OJRLeWOvdSaX8sW23YjmVC2xfYiIiMgkktkBEBER0XGxACgG0B+HOiGO9sht95w6L4BDnRjf9mhGtCMk+bUadNzRQkRERERE5rMDKAJQiG\u002FPm74tt8oxId505sWhwbadza2aEM2pfB20R0RERF3AYjAREVHv4gJQhmihtxTAAAAlsUdx7HdFsUc6io8wby8+ejwPR16fxEfOpyMfoh0YtbHHAQB1APYDqI\u002F9rIttt78TmoiIiIiIui4X0VwqOX9qn2MNAFBgVoDdFL9btz0Ponft5nbwu2+bwSkdeHAob4rnUzU4lGfFX2swK0AiIqLejsVgIiKinmMFMAhABYAhST\u002FLcaijwpXiGJKnP26RJKkVgE+SJD+ixdj49F9tiE633AJAj+0XkSTJrapqWJIkjyzLAUVR\u002FKqq+q1WazD5IKqqRq688sqU3hX78ssv2+rr64+YPs3n8+UZhiFrmpYLQA2Hw9mGYVgR\u002FbN1GIZhw6Ep1rJxaJpsxTCMXMSKz4ZhxKfSjt8d0NHUa6JEEO3AiHdmVMUeXyf97GiaNyIiIiKivsSOI\u002FOpCkRzqRJEi7wdLU8jUnz64+ScKiBJkg8d5FKxfSKx18OSJHlUVQ1IkuRXFMUny3LQarV6VVU9bCplu90evvzyyz2p\u002FCDLly93tLa22pNf03VdDgQCObquq5FIJBuANRwOuwzDiE997YzlV4flUojlTIZhZCM2NbZhGMl3U+en8rMg+mcfH3Bbi0N5VHJO1fYt7yUiIspoLAYTERGJJQEYDGAUgNGxn6MAjEC0g0IWcIwwgAZJkvYDaIx1PrQAaJFluVWSpJb4Q5blFqfT2ZKVldV68sknt5x55pmagOP3SQ8\u002F\u002FHB2Y2NjbltbW56u63m6ric6NwzDyNN1PTe+DaCfYRhFiHZIibqruRXAHgA7Yo\u002FKpG1OnUZEREREmUJFtMA7GofnVMMRvb4WIQCgXpKkAwAOSpKUmKY4llPF86pWWZZbXC5Xc3Z2dus555zTMn78eM7oc5zuu+++vNbW1lyv13tYTpWcT+FQTlVgGEZ8pqyO1lA+HgcRzakqcXg+tQvRwdFEREQZicVgIiKi45cHYCKASbGfEwGMwfGPRPfEOiPqJEmqkSSpXpKkGlVVa2VZrrNarQeKiorq77nnHk5\u002FlUYee+wx55YtWwYEg8EBkUikWNO0EsMwigzDKNN1vQhAiWEYxYhOX3c8gwUMAHsBbAHwBYBNscdXsd8REREREfVWhYjmU\u002FHHBAAjEZ3F53g0S5JUi1ihV5blBgDfqKraoCjKAYvFUldWVlZ3++23NwmJnnrEAw88kFVZWVkaDoeLNE0r1TStCECJrusDYrlUPKcqPM5DRBC9ezieT8V\u002F7hUQPhERkelYDCYiIuocFcBkADMAzAQwFdEpyTrLAFArSVKVJElVsixXSZJUbbVaq2w2276xY8fWXHTRRby7sw\u002FbunWrsnr16sLGxsYyTdMGh8PhCsMwBuu6XgFgsGEYFYhOy9ZZbYh2YnwEYG3sZ6PouImIiIiIOskO4EQAp8YeUxFdw7ezIgAOxHKqalmWq1RV\u002FVpRlGqHw7Fv0qRJdQsXLuxoLV3qI9asWWNZv359YVNTU3k4HB6iadpgwzAqdF0fDKDCMIyB6NpAgyYAnyGaS30E4GNEpwknIiJKKywGExERdUxGtKNiHoDTAJyMzq3n2yZJ0i5ZlncqilKpKMoup9O5a9asWbvOPfdcdkxQt9x2223lbrd7ZDAYHKFp2ihd10cCGBHr1OjMdV0looXh1QDeBtchJiIiIqLUsSBa9J0LYBai+VVnCnHNkiTtlGV5h6IoOxVF2Zmdnb3jnHPO+XrWrFnhY7+dqGPV1dXyX\u002F\u002F610FtbW0jQ6HQyFhONcIwjFGIrjd9LBEAWwGsQTSf+hcAbwpDJiIiEoLFYCIiokOyAZwDYD6As3GMKaZio9G3KIryhdVq3dyvX78t9913X1UPxEl0mCeeeCJ748aN4z0ezwRN0ybquj7BMIyxOPqdxBFER7a\u002FCeA1ANt6IlYiIiIiymj9AZyL6KDaOQByjrKvLknSV\u002FGcymazbS4pKdl8zz331PRIpERJHnnkkbwvvvhiUiAQOCESiUzQdX1irEhsOcrbggDeB7ASwKuITjVNRETU67AYTEREfZ0MYDaAywGcj2+\u002F+9cvSdJnFovlY6vV+vEJJ5yw7vLLL+ddldRrbd26VX3xxRfHtba2ztA0bZqu6zMMwyg7yls2APhfAMsBHOyZKImIiIgoA1gQHVB7GYAF+Pa7fz2KoqxTFOUTu93+0SmnnLLhggsu8PRYlERd9P7779vefvvtSW63+5RIJDJd1\u002FVTDMP4tkHjBqKF4f8F8BIAfreJiKjXYDGYiIj6KiuAHwL4BYCKDn6vx4q\u002Fb2dnZ7970UUXfT59+vRQj0ZIJNg999wz8JtvvjktGAyeFYlETgeQ18FuIUQLwncD+KpHAyQiIiKidJIFYBmA6wEUdfD7sKIon1gslrcLCgr+dfXVV28dOnRopGdDJBLr9ttvH15bWzs7FAqdFYlETkPHA8q9AJ4A8HsAtT0aIBERUQdYDCYior5GRvQu4NtwZBE4rCjKapvN9srIkSPfueqqqxp7OjiinrJr1y712WefPamtrW2+pmkXGYZR2m4XDcCzAO4AsK\u002FHAyQiIiKi3sqGaBH4Zhy5tI5fUZTXXC7X69OnT\u002F\u002FXwoUL23o+PKKesW7dOttrr7020+v1zg+HwxcCyG+3iw\u002FAXwD8FkBTjwdIREQUw2IwERH1JeUA\u002Fg\u002FAackvSpK0zW63\u002F9\u002FYsWP\u002FcdlllzWYExqReQ4cOKD87W9\u002Fm+12u\u002F8zHA4vRLSDL84N4CeInjtERERE1LeNQ3QWmROSX1QUZZ3D4Xhu9uzZL5911lksAFOf8\u002Fnnn9v++c9\u002Fnu31ehdHIpGzER2IHleD6KD0t00JjoiI+jwWg4mIqK8YDWA1ogVhAIAsy9tyc3N\u002F++tf\u002F\u002FpNp9NpmBcaUe\u002Fx2GOPlW\u002Ffvv2mUCj0A0TXf4u7A8Cd5kRFRERERL3ALACvA8iNv6AoykeFhYW\u002FufPOO9eaFxZR7\u002FLHP\u002F5x9Ndff\u002F0LTdMW4lBRWANwDYCnzIuMiIj6KhaDiYioLygEsB6xaaElSWrNycn55S9+8YsX7HY7i8BEHXjiiScqKisrH4pEIt9JevkaAH81KyYiIiIiMs1oAB8hNg2uJEk1+fn51912222rzQ2LqPe6\u002F\u002F77J+zfv\u002F9RXdfHx16KAPgegJUmhkVERH0Qi8FERNQXvAzgPACQJOmbcePGnbd06dKvTI6JqNdraWmR77zzzt8Fg8GrYi\u002F5AUwBUGliWERERETUs1QAHwM4EQBkWd4yY8aMRYsXL+YSO0THsHXrVttf\u002F\u002FrXv2madk7spXoA4wHw\u002FCEioh7DYjAREWW6MxGdHhoAAiNHjpxz8803f2lmQETpJBAISNdff\u002F3\u002FaZo2N\u002FbSGwDOOdp7iIiIiCijXIXY7DCSJDXMmjXrtCVLltSZHBNR2ti6davt4YcfXqnr+sTYS38GsMzMmIiIqG9hMZiIiDLdWgAzACArK+vu3\u002F\u002F+9w+ZHA9R2vnnP\u002F\u002FZ\u002F7333ltvGEZO7KVTAKwzMyYiIiIi6hFWALsADAKAgoKCK++6665XzQ2JKP08\u002FPDDY3bu3PkeAAVAEMAIAPtMDYqIiPoMFoOJiCiTzQPwJgBIklR\u002F7bXXnjhx4kS\u002FyTERpaX\u002F+q\u002F\u002FusXr9d4Ue\u002FoWgLlH25+IiIiIMsJPEL2LEbIsb3nwwQfPsNlshskxEaWlZcuWPRoKhS6KPX0cwLVmxkNERH2HanYAREREKXRDfCM7O\u002FuRE088MQAOhCI6LvPnz\u002F+fl1566UrDMPIAnI3oOldbTQ6LiIiIiFJHAnB9\u002FElxcfF9WVlZ8deJqIsmTJjwpw0bNpyPaJ\u002F8DwHcCqDJ3KiIiKgv4MUbERFlqoEAqgDIkiS1\u002FuxnP5swevTogMkxEaW1G2+88b99Pl98bas\u002FAvi5mfEQERERUUrNBLAGAGRZ3nX\u002F\u002FffP4l3BRN1z3XXX\u002FTUUCp0be\u002FoTAI+ZGQ8REfUNvDOYiIgy1RIAMgA4HI7\u002Fb\u002Fz48UFwEBRRt4wbN+6FTz\u002F9NF4MvhTALwFoJoZERERERKlzeXwjJyfnBZfLBTCnIuqW4uLiF\u002Fft2xcvBl8GFoOJiKgH8AKOiIgy1Q4AIwFg9OjR37vllls2mBwPUUa46qqr3tA0bUrs6QLE1uUmIiIiooziBFADIAdAZM6cOScuXry41uSYiNJefX29+otf\u002FGKDYRjFsZfGAthuZkxERJT5eGcwERFlovGIFYJlWd5zww03bAyFQhwA1UXr1693+Xw+9cCBA9mapiktLS25hmHIfr8\u002FW9d1SygUchmGYdU0zaFpmsMwDGskEnEBsMTb0HXdbhiGrX3buq5nI3bn9tHIsuxFB3eeKorS2u65G4BusVhaYz\u002FbJEkK22w2ryzLIbvd7nc6nX6r1Rrq37+\u002F1+l0hk866aQ2l8ulH8cfTZ+Wm5v70sGDB+PF4PPBYjARERFRJjoT0UIwLBbLmkWLFtUxp+q6tWvXZofDYXnfvn25uq7Lra2tObquq4FAwBWJRGzhcNihaZrdMAybpmkuwzDUSCSSDUCJt6HrutMwDEv7tnVdz0EnbvSRZbkNwGF5jyRJeuz1BEVRWiRJMlRVdQMIWywWnyzLQavV6rfZbH5FUUJZWVleVVW10tJSt6qq+uzZsw\u002FLy+jY8vLyIi6X62WPx3Nt7KXzAfzGzJiIiCjzsRhMRESZaH58w+l0rlJVtc92Wqxfv961devWAY2NjQV+vz8nFArlhsPhHE3TciKRSG4kEsnRdT1X1\u002FUcwzBydV3PNQwj2zCMHGT4dcLy5cshSZJHkiS3LMtuSZJaZVl2y7LcKsuyW1EUt6qqraqquq1Wq9tut7uzs7MPlpSUHJw7d25jXy0kT5s2beWbb775G0Q7nubHfnLtOCIiIqLMksip8vPzV\u002FblnGrNmjU527ZtK25tbS0IBAI5wWAwV9O09jlVTiyXyonlVnmxnCqj\u002F9xiOVVbPJdKyqnciqK0yrLsVlXVbbFYWmM5VWt2dnbzkCFDGufPn99odvxmKSsre2vHjh3xYvA8sBhMREQpltEXJERE1Gf9G8BsABg1atRFN91008fmhiPeG2+80X\u002F\u002F\u002Fv39GxsbBwQCgcJAIFAcCoUKdV0v1DRtQCQS6W8YRrFhGE6zY81QEVmWG2VZrlcUpV5V1UZFUWptNluj0+msdTqdjWVlZbUzZ86sLysrC5kdrGjXXnvtW5qmjY09nQxgk5nxEBEREZFwVQAGA8CZZ545\u002FeKLL\u002F7G3HDE8vl88jvvvNN\u002F\u002F\u002F79RU1NTcU+n69\u002FOBweEAqF+muaNkDX9f6RSKTYMIyijmY6IiHCsiw3KopSJ8tyg6qqdYqiNNhstgaXy1XrcrkaBw4cWHvaaac19O\u002Ff\u002F4jZotJZa2ur8vOf\u002F\u002FxzwzDyAUQAFAM4aHJYRESUwTL6jh8iIuqTcgCcCgCSJHkuueSSDek4nZnf75dXrVpVsnfv3sHNzc0VwWBwcDAYrIhEIhWRSKTCMAxHqo5ts9mQn5+PrKws5ObmQlVVZGdnw2q1wuVywW63w+FwwOl0wmazISsrCxaLBTk5OVAUBfn5+Ue0GX9Pe\u002FH3tud2uxGJRA57Tdd1tLYeOQuZz+dDMBiEx+NBOBxOvLelpQWRSAStra3QNA1tbW0IhULwer0IBALweDxoaWnpsM1OUHRdL9Z1vVjTNASDwSN22L59O9555x1dluUaRVGqrVZrldVqrcrOzq4uLCysOuWUU6rGjh3rP56Dm83pdP7b7XbHi8HzwWIwERERUSYZj1ghWFXVneedd97+dMypmpqa1Hfffbds7969g9va2ioCgUBFKBSq0DStIhKJDAJgTdWxnU4n8vLykJWV1eVcSpZl5ObmdtimzXZkXTr+3vaam5uPeC2eF7XXPpdqbm5O5F8d5VJ+vx8+ny+RU3XUZidYdF0v0XW9BMBhOVVDQwMAYNu2bVi1apUmy\u002FJ+i8VSrapqlc1mq8rJyakqLi6umjNnzt6SkpK0G3zrcDh0u92+xu\u002F3L0R0SvCzACw3OSwiIspgLAYTEVGmOR2xNWttNtuHRUVFEfTimTCamprUV155ZcS+ffvGejyeMeFwuCIcDg8R0TmRlZWFsrIyFBUVobi4GAUFBcjLyzvmo6OibSYzDAMtLS1obm5GS0tLh4\u002F475qamrB\u002F\u002F37U1dWhvr4eun7MmaJlXdfLdF0vC4fDM7xeL5qbm7F3715s3LgRsizXKYpSZbVaq+12+86CgoIvp02b9uWsWbOO7LnpRQYOHPjetm3bfhJ7ejaA35oZDxEREREJdVZ8w+FwvNfbp4jevXu37e233x5VV1c31uv1jg6FQkM0TRsciUQGopt9n3l5eSgpKUFxcTGKi4sTOVN+fv5hOVT751ZryurMvVJ8MG5yTvVt+VVjYyMOHDiA+vp61NfXd6Z5Vdf1wbEB0t\u002Fxer1oampCVVUV1q1bp8uyXGOxWKpUVa12OByVxcXF22fOnPnllClTPKn+3N2Rl5f3XqwYDERzKhaDiYgoZXr1xRwREdFx+BOA\u002FwKA4uLi\u002F77tttv+z+R4DvPiiy9W7N69e6rb7T4xGAxO0DRtJGLF687KysrCkCFDUF5ejuLiYpSWlqK4uBglJSWJjorS0lK4XK4UfQoCoh0e9fX1qK2txYEDB1BXV4f9+\u002Fejvr4+8by6uhr79++HYXRtSd1Yh8Y2p9P5WUlJyYY5c+ZsHjFiRCBFH6XLmpub1V\u002F\u002F+tdfGIbhAhAAkAsg7UbkExEREVGHXgHwHwAwfPjwJddff\u002F0HJseT4Pf75Zdeeml4VVXViW1tbSeGQqHxmqYNRReLvvn5+aioqEBZWVkifyoqKjrs+YABA2C321P0SQgAwuEw6urqEvlTTU0NampqDnvt66+\u002FRl1dXVebNmRZ3me1WrdmZWVtLC0t3XDhhRduy8\u002FP7zXTTa9atap4xYoV62JPvwIw3Mx4iIgos7EYTEREmWYdgJMBYPr06XOXLFmyw8xgVq9eXfjJJ5\u002FMbm5uPi0YDJ6s63phZ96Xn5+PYcOGYfjw4Rg+fPhh2wMGDEh12CSQ3+\u002FHV199hd27d2P37t2Hbe\u002Fbt++I6bC\u002FRdhisWx2uVwfVlRUvHfZZZdtttvtx7wtOZWuu+6650Kh0IzY0+kAPjEzHiIiIiISQgJQC6AIQOTqq6+ePHny5OOaA1iUV199deDnn38+2+12nxYMBk80DOPIOZQ7UFhYmMih2udV\u002Ffr1S3XYJFBbW9sRuVT8eWcH30qS5LdYLJ9nZ2evGTly5HtLliyp7IHQj+onP\u002FnJB7quD4w9LQVQY2Y8RESUuVgMJiKiTOIA0ALAKkmS+6GHHpricDh6vGD25ptvDlizZs1\u002FtLa2zg+Hw+NwlP9v8\u002FLyMHHiREycOBGTJk3C2LFj2TnRh4RCIXz99dfYsWMHNm\u002FejC+++AKff\u002F459uzZc9QODVmWm51O57uDBw9+5Zprrllnxvf85ptvvqG5uXlZ7OlNiN6VT0RERETpbRSASgCwWCxfPvbYY+eYEcQLL7xQ8dlnn53vdrvnRSKRYUfbt7CwEJMmTcKkSZMwceJEjBkzBsOGDetw3V3KPPHBtzt27MAXX3yBTZs2YdOmTdi3b99R3yfLcq3L5Vo9atSof15zzTWbeyjcw1x33XX3+3y+\u002F4g9vQDAy2bEQUREmY\u002FFYCIiyiSzAfwbAOx2+\u002Fv333\u002F\u002FFT158AceeOA7+\u002Fbt+2EgEDgVgNL+97IsY+zYsZg5cyZOPfVUzJgxA0OHDu3JEClNuN1ubNiwAR9++CE++ugjfPzxx3C73R3uK8vy\u002Fry8vP93wQUXPDt58uSOd0qBBx544Du7du16Ovb0ZUQ7L4iIiIgovV0B4EkAyM7O\u002Fvu99957R08dOBAIyA8++OD82traS0Oh0FR00G+pqiomT56MU089FaeeeiqmT5+OsrKyngqR0sjBgwexbt06rF27Fh9++CE+\u002FfRT+P3+DvdVFGV3v379nr\u002F00ktfHDZsWI8tz3PXXXf9oLa29q7Y0z8hOsiWiIhIOBaDiYgok\u002FwSwG8BoH\u002F\u002F\u002Fg\u002F85je\u002FebQnDvrnP\u002F952o4dO24MhUJT2v+uuLgYc+fOxbx58zBnzhwUFBT0REiUYSKRCDZu3Ig333wTb775JjZu3AhdP\u002FxmYEmSWvv16\u002Ff0j370oyeGDh2a8g6Mzz\u002F\u002FPOfxxx\u002FfAEBGdCrBklQfk4iIiIhS7m8ArgSAioqK\u002F\u002FrlL3\u002F5Wk8c9N577z17375914fD4RHtfzd48GDMmzcP8+bNw+mnn46srKyeCIkyTDgcxtq1a7Fy5Uq8+eab2Lp16xH7yLJcX1RU9NjPf\u002F7z5VlZWZ1az6c7nnnmmTEff\u002Fzx67GnHwOYcbT9iYiIjheLwURElEn+AWARAIwbN+6yG2644aNUHszj8Sh33333soMHD16LaEEMAJCTk4NFixbh8ssvx8yZMyFJ\u002FO+WxKqpqcHzzz+PZ5555ohODIvFUnnGGWf8dNGiRdWpjuPaa69dFQ6H49P2lQE4kOpjEhEREVFKbQQwBQAWLFhw+nnnnXf0uXa7qbq62vbQQw\u002Fd7na7L0x+vbCwEIsXL8aSJUswZcoRY26Jum3Pnj149tln8eyzz+Lrr78+7Hd2u\u002F3jCy+88IbTTjvtYCpj8Hg8yg033PC5YRgOAD4AOQBSXoQmIqK+h73TRESUSXYDGAYAS5YsmTZjxozmVB1I0zTplltuecDr9c6Pv1ZcXIxbbrkF11xzDZxOZ6oOTXSYjz76CHfccQdWr16deE2SpLZZs2Z9f\u002FHixbtSeewbb7zxT16v93uxpwsAvJnK4xERERFRSlkAtAGwSZLkfuSRR05SVdVI1cFqa2stv\u002F3tb\u002F+ePMPS0KFDcdttt+EHP\u002FgBLBZLqg5NlGAYBlauXIk77rgDn376aeJ1WZZrLrrookWzZ89uSOXxf\u002Fazn70YCoUmx56OBbA9lccjIqK+ST72LkRERGkhB8BQAFAUpWbmzJktsixLqXrcc889P0ouBC9btgx79uzBDTfcwEIw9agZM2bg7bffxurVq1FSEp2p2TCM7I8\u002F\u002FviRnTt3ZqXyPHC5XJVJoUwy50+AiIiIiAQZC8AGADabrdJqtSKV15IPPPDArfFCsKqq+M1vfoPKykpcfvnlLARTj5EkCfPnz8f69evx\u002FPPPIycnBwCg63rJq6+++oDf71dTeR7Y7XbmVERElHIsBhMRUaaYgNiMF1artVJRFClVj5deemlYbW3tjfEDP\u002Froo3j44YdZBCZTnXnmmfjss89QUVEBAAiHw0OfeuqpG1N5LpSUlCSPWp9oygcnIiIiIlES13N2uz2lOdWjjz56amtr62IAkGUZr776Kn71q1+xCEym+s\u002F\u002F\u002FE+sW7cOeXl5AIBAIHDyvffee1kqz4Xc3FzmVERElHKq2QEQEREJkhhB63K5KgOBQMoGPK1du\u002FanABQAuOSSS7B06dJUHYqoSwYMGIAXX3wRM2bMQCQSQWtr64UrVqx46swzz6xJxfGmTp1a+cUXX8SfchQ7ERERUXpLFKJyc3N3pDKn2r59+3Xx7VtvvRULFixI1aGIumT06NF44oknsGjRIgBAfX39VV9++eU\u002Fhg4d6kvF8crKynbs25dYmps5FRERpQTvDCYiokxxQnyjX79+O1M1avfVV18d4fV65wKA3W7Hvffea94nJurAySefjB\u002F84AcAAMMwrP\u002F617+uSdX5cPLJJ7cqilIXO\u002FRwAC7TPjgRERERddeE+MagQYNSllM9\u002Fvjj3wmFQhMBoKSkBL\u002F85S\u002FN+8REHbjgggswa9YsAICu6wXPPffc4lSdD6effvpuAJHYoXlnMBERpQSLwURElCnGxDeGDRu2O1Xr+WzYsOEixP7\u002FvOaaa1BaWmraByb6NrfddhtUNToBjNvt\u002Fl5VVZUrVeeE1WrdEzusDGCkaR+aiIiIiLornlPpZ5xxxp5UXT\u002Fu2bPn4vgBb7nlFjgcDpM+LtG3u\u002FPOOxPbDQ0NFxuGIafifKioqAhaLJb9sUMNAJBvygcmIqKMxmIwERFlitGxn5FTTjllfyQSkUQ\u002FGhoaLK2trfPjB7z22mtN+qhERzd8+HCcffbZAADDMBwvvvjiWak4JyKRiGS3279OOvQocz4xEREREXVTNoBSAFAUpaa4uDiUimvHdevW9fP5fLMAwOVy4YorrjD1QxN9m+9+97s44YToBGSRSKTs6aefnpqqnMpqtSbnVBxgS0REwrEYTEREmaAAQCEAWCyWb4qLi7VUjNhdvnz5d3RdzweAmTNnYtQo1r2o97r88ssT27W1tQtTdWdHTk5OVdJhR7ePg4iIiIjSwigAEgDYbLaqVF07vvXWWwsMw1AB4Pzzz0d2drapH5roaC699NLE9o4dO85N1Xlht9urkg7LnIqIiIRjMZiIiDJBIlmy2WxfpypB27t37xnx4yxZssScT0rUSd\u002F73veQnx+dYczv95+4efPm\u002FFScF0VFRdVJh+UICSIiIqL0lMipHA5HynKqgwcPMqeitHHJJZdAURQAQFtb23c17jQTdAAAIABJREFUTVNScV7k5uYypyIiopRSzQ6AiIhIgESy5HA4qiKRiCT6AJFIRPJ6vacCgCRJWLhwoehD9HptbW3Yv38\u002FGhoa0NjYiIaGBoTDYXg8nsP2y8rKgsViQU5ODoqKilBYWIj+\u002FfujpKTEpMj7JpvNhrlz52L58uUAIK9evXrGCSecsFL0cUaOHFn16aefxp9yFDsRERFRekrkVDk5OdWpyKl27tzpCgQCE2PHwGmnnSb6EERClZSU4KSTTsInn3wCXdfzli9ffsIll1yyWfRxCgsLq\u002Fbs2RN\u002FypyKiIiEYzGYiIgyQaLjIjc3t1qWZeEdFy+++OLYSCTSDwCmTp2K4uJi0YfoNTRNw5YtW7Bu3Tps3LgRO3bswK5du1BbW9utdu12O4YNG4Zhw4Zh1KhRmDJlCqZMmYIRI0ZAkoT\u002FlRGAefPmxYvBqK+vnynL8irRx5g5c2bD888\u002F7zMMw4no+lYyAF30cYiIiIgopRI5VXFxcUpyqpUrV54anyL67LPPhsViEX2IhLa2NmialrL2jyU+QJbS37x58\u002FDJJ58AAHbt2jVTluUtoo8xderUqnXr1sWfshhMRETCsRhMRESZYFh8o7CwcF8qRrHv2LFjRnx77ty5ops3XWVlJVatWoVVq1ZhzZo18Pl8wo8RCASwbds2bNu27bDXc3JyMGPGDHz3u9\u002FF6aefjsmTJyem4qLumTt3LmRZhq7rcLvdM0KhkKwoiiH6OFardW8wGBwNwAlgAIADoo9BRERERCk1NL4xfPjwlORUNTU1PZZTzZkzB0nFNVM5HA7k5uYiLy8Pubm5yM3NRXFxMcrLy1FWVoZBgwZh0KBBGD16NGw2m9nhUjvz58\u002FH7bffDgBoaWk5NRKJPC76GCeccEKLLMttuq5nAxiC6PrdwvM2IiLqu1gMJiKiTDAkvjFixIgDqRjF3tLSMiW+PWfOHNHNm6K6uhrPPfccnnvuOXz55ZemxeF2uxOFaAAoKCjAwoULcf7552POnDmw2+2mxZbuCgsLMXHiRHz++efQdT3\u002F7bffrliwYEGV6ONYrdaaWDEYACrAYjARERFRuhkKAJIkhaZNm9aYipzK6\u002FVOjm9nSk7VGX6\u002FH36\u002F\u002F5gzLSmKgmHDhmH8+PGYOHEiZs6ciVNOOQVOp7OHIqWOTJkyBQUFBWhqakIwGBx94MABZ3l5uV\u002F0cSwWy4FgMDgKgB3RAbY1oo9BRER9l2x2AERERAJUAIAkSeF4x4XIh6ZpSiAQOAEArFYrTjrpJFM\u002FbHcYhoG33noLc+fOxZAhQ3DrrbeaWgjuSFNTE5555hksXLgQRUVF+OEPf4i1a9eaHVbaOvXUUxPblZWVE0WfH7IsSw6HI7n4O+TIKIiIiIioF8sBkA8AFoul1m63G6KvFzdt2lQQDocHAcDgwYMxcOBAUz9wbxSJRLBz5068\u002FPLLuP3223HGGWcgLy8P06dPx913333EDEvUM2RZxvTp0+NPlXfeeWd8KnIqq9XKnIqIiFKGxWAiIkp32QD6AYCqqrWKohiRSEQS+XjttddG6LqeBUTXC3Y4HKZ+4OOh6zqWL1+OcePGYe7cuXjrrbdgGL1\u002F1qm2tjY888wzmDlzJsaMGYMHH3wQbW1tZoeVVmbMSMzGh4aGhkmiz49IJCK5XC52XBARERGlr8T1m9VqPZCK68W1a9dOQnTq28MGK9LRhcNhfPLJJ\u002Fj1r3+N8ePHY8yYMfjd736HxsZGs0PrU5Jzqr1796Ykp+IAWyIiSiUWg4mIKN0d1nGRihG6u3fvnhg\u002FRjp2XKxatQpTp07F4sWLsX37drPDOW6VlZW44YYbMHjwYPzqV7865jRrFJX8nfV6vRNScY7069ePHRdERERE6Stx\u002FWaz2VKSU9XV1SVyquTCGnVNZWUlfvWrX2HQoEG48sorsWfPHrND6hOSc6rW1taU5FQulyt5WmjmVEREJBSLwURElO4SSZLdbq8xDEMW\u002FWhpaYmvhYpp06aZ8ymPQ01NDZYsWYJ58+Zh06ZNZocjTHNzM373u9\u002FhySefNDuUtDBo0CCUlJQAAEKh0KC9e\u002Fe6RJ8jAwcOTK7Ms+OCiIiIKL0krt+cTmdtKnIqj8eTyKlOOeUUcz5lBvH7\u002FXjyyScxevRoXHfddWhtbTU7pIx20kknQVEUAIDf7x+dinOkoKCAxWAiIkoZFoOJiCjdDY5vOJ3OmlRM1+T1ekfGjzF58mRzPmUX\u002FeUvf8GoUaPw97\u002F\u002F3exQUsJut+Pqq682O4y0kfS9lT\u002F66KPhos+RiRMn1gKIzzvOjgsiIiKi9JLIqfLy8mpTkVMFAoHhAKCqKsaNG2feJ80w4XAYDz\u002F8MMaPH481a9aYHU7GcjqdGDky2i0QiUQKNm7c2F\u002F0OTJw4EAWg4mIKGVYDCYionRXHt\u002FIzc2tFz1Vk8\u002FnU4PB4FAAyMnJwdChQ837pJ3Q2tqK73\u002F\u002F+1i6dGlGr627ePFiFBYWmh1G2pg0aVJie9++faNEnycDBgwIKooSvx2hFLH14IiIiIgoLSRyqv79+9eJvlZcv379gEgkkgcAY8eOhd1uN++TZqhvvvkGp59+Ov7whz+YHUrGSs6pNm3aNFL0eTJ27Nj6pMOV9vwnJCKiTKaaHQAREVE3DYhv5OXlNcmyLLQI9eGHH1YYhmEFgIkTJ0KSem+Na\u002FPmzVi4cCGqq6vNDiXlfvrTn5odQlqZODGxRBuam5uHiz5PAEBV1aZYJ58VQD6AJtHHICIiIqKUSORUZWVlB0VfK27dunVEfDu5oEZiaZqGW265BQ0NDbjvvvvMDifjTJw4EcuXLwcA1NfXj5RleZ3I9isqKvyyLPt1XXcAKBHZNhEREYvBRESU7hJJUmFh4cFIJCK042LPnj3D4tsTJkwQ2bRQb7\u002F9Ni666KI+sVbUaaedljbTdfcWyZ1uPp9vuOjzBABUVT0Yv4se0fOSxWAiIiKi9JDIqUaMGNEi+lqxvr4+LXKqTPHHP\u002F4Rsizj3nvvNTuUjJKcU7W0tAxLVU4VCoXKAeQAcAHwij4GERH1TSwGExFRukt0XAwZMqRZ9Cj25ubmgfHt0aNHi2xamGeeeQZXXXUVNE0zO5QesWzZMrNDSDvDhg2D1WpFKBRCMBgsT8WdwTab7aDXm+irKAGwTfQxiIiIiCglBgCALMueAQMGBCF4yQ+fz5eYhrq35lSZ5g9\u002F+APGjx+PSy+91OxQMsaoUaMS26FQKCU5lcViiReDgeh5+ZXoYxARUd\u002FEYjAREaW7AQAgSVJ45MiRHtEJmd\u002FvL4tvDx8+XGTTQvzv\u002F\u002F4vfvSjH0HXdbND6RGDBw\u002FGueeea3YYaUdRFAwePBi7du1CJBLJ27dvX9bgwYOFjjK32+3JdwIP+NYdiYiIiKg3yQXgBACLxSJ82R0A8Pv9iWJwb8ypMtXSpUtxyimnYMSIEcfemY5p0KBBsNlsCAaDCAQCqSoGt8+pWAwmIiIhWAwmIqJ0ZgVQAACKojQBgOipmnpzMfj555\u002FHFVdcYUoh2GKxoLS0FHl5eXA4HMjKygIAeDwehMNh1NXVoaamBpFIROhxly5dClXl5cvxGD58OHbt2gUA2LRp08Dy8vIdItt3Op3NSU+5xhURERFRekgM4lNVVfiyOwAQDAbLAECWZVRUVIhunr6Fx+PBDTfcgBUrVpgdSkaQZRlDhgxBZWUldF3P3r59e+7IkSPdIo\u002FRboAtcyoiIhKGvalERJTOBiA2hZnVaj2YipG5gUCgHABUVcXgwYNFN3\u002FcPvjggx4rBNtsNkybNg3f\u002Fe53MW3aNAwfPhwVFRWwWCxHfZ+maThw4AAqKyuxceNGfPbZZ1izZg3q6uqOKw6n04krr7zyuN5LwIgRI7By5UoAwP79+8tlWd4psv3s7OyDSU95ZzARERFRekgUnGw2m\u002FCcqqGhwa5pWj\u002Fg0J2V6SArK+uwaYG7Kj5Itrm5GZqmoa2tTWB0nffGG2\u002Fgrbfewtlnn23K8TPNiBEjUFlZCQCorKwsHz169HaR7TscDs62REREKcFiMBERpbNEx4XVaj0oSZLQjosDBw44IpFIPhCdnvhYxc+esnPnTpx33nkIBoMpO4aiKDjrrLPwwx\u002F+EOeccw4cDkeX21BVFYMGDcKgQYNw1llnAQAMw8Bnn32GVatW4aWXXsKmTZs63d6ll16KgoKCLsdBUcOGDUtst7S0lIk+XwoKCjiKnYiIiCj9JK7bHA5Hk+hrxM8++6wMsQG8vW2mpaOZMGEC1q5dK6y9UCiE6upq7NmzJ\u002FH46KOPsH79emiaJuw4Hfnd737HYrAgyd\u002FhmpqaMkmSKkW2n5WVxZyKiIhSgsVgIiJKZ4mRsjabrVnXdaEdF59\u002F\u002FvnA+HZv6bgIBAJYtGgRmpqajr3zcbDZbLjmmmvw85\u002F\u002FHOXl5cd+QxdJkoSpU6di6tSpuPXWW7F9+3YsX74cy5cvx+7du4\u002F6vmXLlgmPpy9J\u002Fg57PJ4y0edLcXFx8jTRHMVORERElB4S1212u71J9DXi3r17uV4wAKvVihEjRhyxfq\u002Fb7ca\u002F\u002F\u002F1vrFy5Ei+88AJaW1uFH\u002FuDDz5AZWUlRo8eLbztviZ5gG1zc\u002FNA0edLbm4ucyoiIkoJ2ewAiIiIuuGwUeyyLEsiH\u002Fv37+916wXfeOON2LJli\u002FB2JUnCZZddhp07d+Khhx5KSSG4I2PGjMFdd92FXbt2Yd26dVi2bBlycnKO2O+MM87AuHHjeiSmTJX8Hfb5fOWiz5eRI0dyFDsRERFR+klct+Xm5grPqZqamhI5VXIhjaJycnJw7rnn4vHHH8f+\u002Fftx3333CZ8NyTAMPP3000Lb7KuScyqv11sq+nwpLi5mTkVERCnBYjAREaWzxEjZ7OzsZsMwZJGP5ubmREW0N3RcrFixAo899pjwdktKSrBixQo888wzGDRokPD2O+vkk0\u002FGww8\u002FjG+++QaPPPLIYWt0\u002FexnPzMtrkwxZMgQqGp0UphgMFgq+nwpLS0NyLIciB2Oo9iJiIiI0kPiui03N7dF9DWix+PpdQNseyuXy4WbbroJX375JebPny+07bfeektoe31VuwG2ZaLPl4EDB\u002FLOYCIiSgkWg4mIKJ0dNopd13VJ5MPtdpfG2ze746KtrQ1Lly4V3u5ZZ52FLVu2CO9s6I7s7Gz89Kc\u002Fxfbt27Fy5UpcccUVWLBggdlhpT2LxZIo9muaVnDgwAGn6HPGYrHER7LnAXCa9mGJiIiIqLMSOVVRUVGz6OtDv9\u002FPYnAXFRcX4\u002FXXX8fVV18trM3Nmzejrq5OWHt9VUVFBaxWKwAgEAiUiT5fRowY4ZYkKb6INO8MJiIiYVgMJiKidJYYKVtYWNgsCebz+XpNMfi2227Dvn37hLZ52WWXYcWKFejXr5\u002FQdkWRJAlz587Fk08+CVnmJYsIyWuUbd68uVz0OWOxWJJHshf3\u002FCckIiIioi5K5FRDhw5tEn196Pf7S4Hotf3QoUPN+5RpRpZl\u002FOUvfxE2KNYwDHzyySdC2urLFEVBRUUFACASieRWV1dnizxfVFWFoijxhaMLAShmfVYiIsosqtkBEBERdUNipGxZWVmzruuSyMbD4XBhfDue8Jnhyy+\u002FxJ\u002F\u002F\u002FGehbd588834\u002Fe9\u002FD0kS+kdGvdyQIUMS27W1tYW6rn8lsn2r1dp+jauvRbZPRERERMKVAIAkSeHy8nKfyJxK13VJ07R+QPRuV6eTE8d0hSzLeOqppzBq1Ci0tLR0u72dO3cKiIqGDBmS+LPcs2dP4aBBg7wi27dYLE2x80YBUASgRmT7RETUN\u002FE2GyIiSmfxOw+NIUOGuEWOyJUkSQqHwwUAkJ+fD4fDYdqH\u002FO\u002F\u002F\u002Fm9EIhFh7V1yySUsBPdRAwYcWnaqra2tn+hzxm63c40rIiIiovRhAVAAAKqqNiuKApHXhrt27co3DEMBgNLS0qMGQh0rKirC9ddfL6QtFoPFKCk5NHtzfX19KnKq5AG2zKmIiEgI3hlMRETprB8AKIrizc7OjgAQVt3cu3evS9d1G3B4Aa2nrV+\u002FHq+++qqw9hYsWICnn36aheA+Krnjwuv1FsiyLPSLYLfb25KeFohsm4iIiIiEK0Ash7JYLG7R14b79+9PrEdjZk6V7q666ircdddd0HW9W+3s379fUER9W\u002FJ32e12C8+pLBYLcyoiIhKOxWAiIkpXFgAuAFBV1St6iujq6upE0pVcQOtpd999NwzDENLWwIED8eyzz0JV+d9\u002FX5XcceH3+wtEnzd2uz15irQ8kW0TERERkXCJ6zWLxeIRfW1YX1\u002FfK3KqdFdaWopJkybhs88+61Y7Xq\u002FQ2Yz7rPbFYNHnjdVq9SQ9ZU5FRERCsDeYiIjSVSIpUhTFIwm+1bWhoSExit2sjoudO3fizTffFNKWqqp44YUXUFDAgcV9WfJ3ORgM5os+b1gMJiIiIkorycVgr+hrw7a2NhaDBZk2bVq3i8Eej+fYO9ExJX+XA4FAgejzxmq1+pKeMqciIiIhWAwmIqJ0ldKOi+bm5vz4tllTmt1\u002F\u002F\u002F3dngos7tZbb8WMGTOEtEXpK7njIhQKCe+4yMrKYjGYiIiIKH2kNKfyeDyJYjCnie6eESNGdLuNYDAoIBJKdTHY4XAkF4Pzv3VHIiKiLmAxmIiI0lWi4yIV00S73W5T7wz2er147rnnhLQ1cOBA3HzzzULaovRWXFwMWZah6zqCwWC+6PMmKyuLo9iJiIiI0kfies1qtQrPqbxeL+8MFiQvr\u002FuX1na7XUAklDywIRAICM+p2s22lCuybSIi6rtYDCYionR1WMeFLMtCEzC\u002F358YgWtGx8U\u002F\u002FvEPYdN4\u002FelPf4LT6RTSFqU3i8WCgoICNDY2QtO0fACyLMtiFqUGkJ2dzWIwERERUfpIzql8onOqQCBgak6VSWw2W7fbyMrKEhAJJX+Xw+Fwgejzxul0MqciIiLhWAwmIqJ0lehYSMWUZsnFYDOmNHv22WeFtDNt2jQsWrRISFuUGUpKStDY2AjDMNS9e\u002FdmDxkypE1U2\u002F379+c00URERETpI5HzOBwOn+icKhQKmb70Tqbw+XzH3ukYWJAXIysrC1lZWfB4PAiHw3miz5ucnBzmVEREJByLwURElK4SSZHNZvNrmiaLbDwYDJo2pVlNTQ3ef\u002F99IW3ddNNNEJybUporKSnBli1bAAD79u0rGDhwoPcYb+m0fv36+ZOesuOCiIiIqHdLTEHrcDiETxMdCoW4ZrAgzc3N3W6jrKxMQCQERHOqXbt2IRKJOOvr6x39+\u002FcPiGqbsy0REVEqsBhMRETpKpEU2e124aPYg8GgaVOavf7669B1vdvtDBkyBOedd56AiCiTJHfENTQ0FEiS9I2otktKSgKSJOmGYchgxwURERFRb5e4XnM6nf7YNZww4XA4D4iud+twOEQ23edUV1d3u43x48cLiISAaE61a9cuAEBVVVVBv379akW1nZ+fzwG2REQkHIvBRESUrhKj2F0ul\u002FA1g+MdF3a7Hbm5ucfaXagVK1YIaWfZsmVQFEVIW5Q5kgc3tLS05Is+d2RZ9kciERfYcUFERETU2yWu13JycoTmVLW1tQ5d120A7woW4Ysvvuh2G5MnTxYQCQGH51T19fX5sizXiWq7uLiYdwYTEZFwLAYTEVG6Sh7F7hM5pZmu65KmaVkA0L9\u002F\u002Fx6dZjkYDOLdd9\u002FtdjuyLOPiiy8WEBFlmsLCwsS21+vNET0doKqq3lgx2AXABiAosn0iIiIiEiaRU2VnZ\u002FtFXhfW1tbmxLeTrz+p63w+HzZs2NCtNgoKCnDCCScIioiSv9Nut1toTlVUVORPmm0p\u002F5hvICIi6gQWg4koFaYBGNTJfXUA\u002F0xhLJS5kjsuhE4TXV9f7wIgAdGkuSdt2LABPp\u002Fv2Dsew3e+8x2UlpYKiIgyTV7eocHlwWDQJXqKdVVVvcFgov6bC6BeZPtEREREJEziwrCgoEBoTtXc3JyV1LaoZvuk119\u002FHYFA95aknTNnDmRZ6CzgfVp+\u002FqEarc\u002FnE5pTKYrC2ZaIiEg4FoOJKBV+BmBxJ\u002FcNgsVgOj6JpCgvL090MTjRcZFcOOsJa9asEdLOhRdeKKQdyjzJ3+lQKCS8GGyxWLzJhwOLwURERES9VeLCsLS0VGhO5fF4TMupMs2jjz7a7TYWL+5sFw11RvJSUn6\u002FPysVOVXSbEtWACGR7RORqSoALAAwDkABgDYAlQBWAvjSvLAo07EYTOlKBTAZwAAAXkT\u002FoaztRnv9AEwAkAWgEcBn4LSWRL1dokchNzdX6JRmyaPYe7rjYu3atULamTdvnpB2KPO0vzNY9DTRVquVa1wRERERpYc8AJAkKZKbmxsSeV3odrtZDBbgtdde6\u002FaA4bKyMuaHgqU6p1IUJTmnygXQILJ9IjKFHcADAK4CoHTw+\u002FsAvAjgGgDuHoyL+ggWgyndWAD8AsD1iI6cSfYugOsAbOtCe8MB3I\u002FoaJzk+XI8AB4HcBuA7s3FQ0Spksi+CgsLfbIsC0u+2traXImD9HDHRXfXggKAgQMHYsiQIQKioUyU\u002FJ0Oh8MukecOAFgsFhaDiYiIiNJDHhAtPCmKAsSWyhHB5\u002FOZllNlipqaGvz4xz\u002FudjvXXXcdLBaLgIgorn0xWHROZbVavV5vYsKlPLAYTJTuZAD\u002FD8D3jrKPBOD7AMoBnAHOCECCsRhM6cQC4HUAZ3\u002FL788A8DGA2Yje2XsskwH8G9ERdu1lAbgJwPRYu7xLmKj3iY9i1\u002Fv16xcUORLX6\u002FWa0nHR0NCA2truTHIQdfrppwuIhjJV+2Kw6FHsNpuNxWAiIiKi3s+G6F1KUFXVJ\u002FqaMBAIJHKq5Cl1qXPq6upw9tlno6amplvtlJeX4yc\u002F+YmgqCiu\u002FdI7os8fVVWZUxFllvNx9EJwspmI3j3c\u002FTUCiJLIx96FqNe4At9eCI7LBvAsOvfd\u002Fhs6LgQnOxXAzZ1oi4h6XhYAyLIcUBQFkkBmjWLfvHmzkHZmzpwppB3KTMnfaU3TXCLPHUmSJKvVmjyjRnbPf0IiIiIi6oTEdZqiKH7R14TBYNAZb593BnfNe++9hxNPPBFbtmzpdlt\u002F\u002FOMf4XQ6j70jdUm7AbZO0eePxWJhTkWUWS7r4v5XpiQK6tN4ZzClk8Wd3G8cgBkAPjzKPiMBTO1ke1cDuLuT+xJRz3ECgCzLYUmSMmIU+7ZtXZnl\u002FtuNHz9eSDuUmfLy8iBJEgzDQCQScYo+f1RVDSc9tYtsm4iIiIiEccQ3VFUVnlOFw2FOE91F69atw7333otXXnlFSHsXX3wxLr74YiFt0eE6GmArsn3mVEQZ5+Qu7j8B0X5P37F2JOosFoMpnXSlunEijl4MPqELbZUDKAHQvbl5iEgkC2L\u002FhymKEhI9JZNZo9irqqq63YYkSRgzZkz3g6GMpSgKsrKy0NbWhnA47BR9\u002FlgsluR1bXgbAhEREVHvlLhOk2U5FTkVi8HHEAqF8P777+ONN97AihUr8NVXXwlre\u002Fz48fif\u002F\u002FkfYe3R4dpNEy08p1IUhTkVUeaQAfQ7jvf0B7BXfDjUV7EYTOkkpwv7HivT6OoUK3lgMZioN0mMYpdlOSTLckZ0XFRXV3e7jfLycq7JRceUl5eHtrY2RCIRh6ZpitVq1UW1bbVak0exO751RyIiIiIyU\u002FKdwcJzqnA4nNbTRHs8HmzcuLFbbbS2tiIYDMLj8aCtrQ0+nw9fffUVdu7ciV27duHrr7+GpmmCIj6koqICb7zxBvPCFGo325JL9PljtVqTi8HMqYjSmw5AA6B08X2hY+9C1HksBlM6cQMo6OS+LZ1oqyuau7g\u002FEaXWYR0XhmF0Zp3wTguFQlnx7XQrBo8YMUJAJJTp8vLysG\u002FfPgCQGhsbXSUlJV5RbdtsNhaDiYiIiHq\u002FxHWaoijhFORUaX1n8ObNm3HiiSeaHUaXjRkzBm+\u002F\u002FTbKy8vNDiWjqaoKl8sFj8eDcDjsEn3+qKqaPEqAORVR+tsLoCsddl4AjSmKhfooFoMpnWwCcHon911\u002FjN9\u002F0YXjVgOo7cL+RJR6yXcGh0VPyRQKhUwZxV5T0\u002F0JCEpLSwVEQpku+Xvd0NDgKi4uFrYODe8MJiIiIkoLhxWDRedUmqaldTE4HV144YV48sknkZ3d1cnw6Hjk5eXB4\u002FEgEonYg8GgYrFYhM221G7NYOZUROnvHXStGPwuoncTizYDwMNH+f2ZOPZNdpSmWAymdPJ3dK4Y\u002FAWAj4+xz1cA1gI4tRPtPd6JfYioZx3WcSFJUkZMadbU1NTtNgYMGCAgEsp0yd\u002FrtrY2lyRJwkacshhMRERElBYS12kWiyVlOZUkScjJ6cqqX9RVJSUlePDBB3HRRReZHUqfkpeXh2+++QYApKamJueAAQOEzbbEnIoo4zwE4EcArJ3YVwdwb4riuBTA1KP8nvXCDMa\u002FXEonfwdwPoDvHWUfN4AlAIxOtHcNgDUA8o+yz\u002FsA7u9sgETUY5KLwcLXt9I0zR7f7qlR1T6fD4FAoNvtsBhMnZHcIefz+ewizyG73c6OCyIiIqLeL6VrBuu6bgMAl8sFRenqMonUGYMGDcL111+PH\u002F\u002F4x3A4eNnd05JzKrfbbS8tLRU22xKX3iHKODsALAXwPzj62sEGgFsAfJSCGFQAF6SgXUoTLAZTOokgWgz+BYAbAbS\u002FXe9dAD8FUNnJ9rYBOBHRkTkLACQnPj4AfwZwO7hYO1FvlLhz12KxCJ\u002FSTNf1xEg9p9N5tF2FaW4WszR5\u002F\u002F79hbRDmc1uT4x3QDAYtIo8h6xWK9e3IiIiIur9EomOqqopy6lYpBSrqKgICxYswKJFizB37lzIstClaqkLknMqv98vNKeyWCwsBhNlnicRLQrfCeA0HFkUXg\u002FgDgArU3T80wEUpqhtSgMsBlO60QDcA+A+AFMAlAHwIzo19DfH0d4eRO80Lo61lwWgBsDGWLtE1Dsddmew6CnNkovByQleKvl8YgYR91TxmtJb8vckGAzaRJ5DTqczeRAVv5BEREREvVPPP4n8AAAgAElEQVTKponWdV3SdV0FmJ+I8sADD+Css87C6NGjWQDuJZK\u002F24FAQGhOZbfbmVMRZaYPAZwBIAfAOADZiN6UthNAfYqP\u002Ff0Ut0+9HIvBlK6COPa6wF1Rh9SNuiEi8VK6vlUkErEAgM1m67EpzcLh8LF36gSbzSakHcpsyXdoaJpmFVwM5p3BRERERL1f4jrNarUKzancbnciKeGdwWK89NJLqKmpwfTp0zF79mzk5bWfLI96WvJ3OxQKCc2pLBYLcyqizOaG2NrGsVgBnNuDx6NeiMVgIiJKR8nrW4UNw0j7Kc1CITEz0rMYTJ3RvuNC5Dnkcrk4pRkRERFR73fYAFuR14Mejycx0xKLwWKsXbsWa9euBQCoqooZM2bg\u002FPPPx\u002Fe\u002F\u002F30UFxebHF3flPzd9vl8QnMqh8PBnIqIRJoLoMDsIMhcnFeEiIjS0WHFYETX\u002FBb20HXdAvRsx4WmacfeqROsVuuxd6I+L\u002Fm7HQ6HrRB4\u002FrhcLo5iJyIiIur9DrszGAKvBwOBAIvBKaRpGj744ANcf\u002F31KC8vx3nnnYcPP\u002FzQ7LD6nFTmVCwGE5FgF5sdAJmPxWAiIkpHyaPYNUmgcDisGoYhAz3bcaGqYibr0HVdSDuU2dp3XIg8h7Kzs9lxQURERNT7Ja7TbDab0JyKxeCeo2kaXn31VcyaNQuzZ8\u002FGxo0bzQ6pz+hommhRHA4HB9gSkSh2AOeYHQSZj8VgIiJKR8mj2EOGYUiiHm1tbaZ0XNjtdiHtBINBIe1QZmu\u002FZrDIc8jhcEQAGPFDmfIBiYiIiOhYUpZTeb1erhlsgvfffx8nn3wyli5dCq\u002FXa3Y4Ga+jpXdEPex2OwfYEpEo3wOQY3YQZD4Wg4mIKB054xuqqgodxe7xeBIdF06ns+Ojp4CotX5FrT1Mma1dMdgi8hySZRmyLMdHsrPjgoiIiKh3StmdwaFQKDHAtidzKorOFPWXv\u002FwFU6ZMwfbt280OJ6O1KwbbRJ5DLpeLxWAiEoVTRBMAQMyclERERD3rsI6L+LTOIvj9flNGsfPOYOpJyZ1y4XDYJvIcAgBFUcKxtbfZ+0dERETUOyWu0+x2u9CcKhAI8M5gk+3cuRMzZszAK6+8gtmzZ5sdTkZKzqkikYhV5DnkdDojyU9FtUuUgfoBGBp7FCB6B6wDQABABEATgG8AVAPYDUDruJmMlQtgvtlBpIgFwGBE\u002F+4HIvp3b0X030xf7FGPQ3\u002F3jeaE2SP6AzgJQBmi50H8HGgD4EH08+9iMZiORx6A7wCYDmACgHxEv2QRAH5Ev2B1AHYBeA3AenPC7HMGAzgZwKjYdhmi\u002FxDIiP4dBRD9R7AFgBfRfwx3xh6VAPag7\u002F2HSOkr0bmgqqpmGIYkqmGfz5fW00RzOjDqjOTvdqzjQtg5BACyLMdHsou55Z2IiIiIREtcp1kslojI68FgMJj2awZPmDABTz31VLfaCAaD8Pl8aGlpgd\u002Fvh9\u002FvR1NTE6qqqlBZWYkvv\u002FwSDQ0NgiI+UktLC8455xysXr0a06dPT9lx+qqOpokW2HZy\u002Fxxzqp53K4DsLux\u002FB6L9rqJdAmB8F9\u002FzHID\u002Fn737jpOrqv8\u002F\u002Frrba3onxYQQSAgkFGmJgoAJRSxfRfmC\u002FBClyVfFr+gX+WLhCwhfkCIWRL42ELEgWEBa6BIigYSEYoAkpCebkGy272yZmd8fZ2e4u2yy98ycO23fz8djHsySe889d+\u002Fc2XvO55zPeTWEunwAONVi+98Ar4dQj6HAx4ATeuo01WLfNmAZ8CxwP7Dcee32bDbmegZ1P+nFVEqAzwHfxS67wLcx8Z1UbAZ+nOK+QR2Guf4fxMRBbM5tHbAEeAh4EGh0Xrs9+yowboBtbK\u002F5VOBc4NOYeNBAmhLB4BOAOywOlGlzMAHGoG4APmmx\u002FceA16xqZO\u002F3mOh8UDMwwdVUfQD49QDbRDBfRPEBtks4FrgQ+ARm4fEgdhPsQ3wbsDBgmWA+s+sttk\u002FFg8DMgNu2Y\u002F\u002FHOV2VwEnAvwEfBsamWV4T8AzweM\u002FrX2mWlwvOAb5juU8T5ne6zn11xKHkYKaSkpK453l533HhKhi8Y8cOJ+VIYesvTbTL8ouKihLPFsWAR\u002FBnDRERERHJjGSbqqysLObyedCfJjpfg8E1NTUcdthhoR9n165dvPTSSyxatIi\u002F\u002Fe1vrF692mn5ra2tnHbaaSxbtowpU6Y4LXuw6zPA1mmbqrS01P+jJnNl3hHARy22fwx40nEdPOB\u002FMZN9bJQAX3dcF4AvAv8ecNs48EPHxz8S+BrmuqTagVaFiZl8ABPwX42p568wE6fCtD9wmcX2b5NaMNjDxMWuIViAsK+vpLBPwouEEwyuAS4CvgAckEY5U3teZwIdmODrTZgBAmE7FzOpcm+6CXbNp2G+Gz6J3TLAWxJ\u002FTKp7CslVtmk2RmN3PpkYYTWBzP6OqwIebxKwcYBt9geuBk5PoR5bAm43FrvfT+nAm6RtH4LXKZNT8SYAF2C+nIc7LHcIZkH503p+fgMzoOCXQHhDVcPzMeDn2D00twOfR4HgfFCceFNUVBR3OQK3vb09Kx0XlZWV1NTU0NJiM\u002FbpvRQMliDCnhkMxHzvi0hvgJuIiIiIuFfse++0TVUIweBMGTlyJAsXLmThwoXceOONLFmyhFtvvZU\u002F\u002FelPRKNuHqF37drF6aefzuLFi\u002FsGGSUNYc4MLikp8Q+mLd7jhhKWR7ALBh+P+2DwwdgHgsFMtnIdDPYw5xjUK8BWR8eeA3wfMxHKtf2AH2Fmz34L+D9692XkmxOB64DDs10RR0oxAwC+gUkH7lI5ZnDDvwMP9BxnjeNj2Boo0F2Mmbn9TVKLZ251uj6c5KW9zXz1MDfba6QWCAZ3X\u002FxiAr8\u002FwuS5\u002Fy5uA8H9OQAzymQjZsRMPvkw8AfsAsFdmM\u002F5M6HUSFzrFQz2HOrq6spax8X48ePTLkPBYAmiz\u002FpWpS7voR7+BpQ6L0RERERyT\u002FIZraSkBJcPgl1dXcmIo4LBdo4++mh+\u002F\u002Fvf88orr3Dsscc6K\u002FfFF1\u002FklltucVaeZKRN5c+2JJn1qOX2NoHSoFJd53U2MNFlRXrKtMlI+YiDY5YD12Jmm4YRCPYbBdyOSSGcyxMm9+T9mCyfiyicQPARmBm7\u002F4v7QHBfp2HiX5di4mHZsrc43QTgCUxMKNWJrVsUDJY9fchqMaMibiC9dCRBZwbL3n0CeBP4EplPD1MBvJzhY6bjGODP2H0xxjAppf8eSo0kDP6Oizjmj7WTV3d3d7LssrJkXDgjXASD6+rqHNRECp1\u002FRkAsFkukcnb28nVcgDovRERERHJR8hmttLTUaZsqGo36U1Bn4FQKz6xZs3jqqae49tprKSpy03171VVXsX37didlyXvaVCU4blPx7gxFtacy723gLYvt34\u002FdGsNBpBoMBrulGIM4wXL7dIPB44GngcvJTHbQhCMw6wifNtCGOeQw4AXsr1EuOx\u002F4B3BQBo9ZDtwI\u002FBWTljobptN\u002F3Gc6ZqBCuiPEFAyWfqefD8OsdWCzKPyeaGZwekowX0T3YdKfZ8MLwKosHdvWHExAt9pinzhwMfC7UGokYUk2hjzPi8fjcc\u002FVKxqNJssuLs5sm8tFMNj1GlNSmPyf7Xg8XuTyHorH456nmcEiIiIiue49aaJdvfAt95bpNlUh8TyPyy+\u002FnLvuustJQLi1tZWbb77ZQc0EMtKm0szg7LKZHVwCfNDhsYcDR6WxfzaDwc3A82kcaxZmNnA655+OoZi1ZP9flo5vq5zszmZ17SbgDiBbI8lOw8yyHpGFY5cB+\u002Fb5fzMwAyMmOyhfwWB5z8zgKkwg2MUXbj1mDVZJTSkmQJntFAW\u002FzuKxbczAPKgNs9zvcuBn7qsjIes1M9hpHqZ4PGsdFy6CwZs2bUp73WEpfH07LlzeQ4lbyX+4zJ+hiIiIiAyg18xglw+CsVhMwWCHzjrrLK677jonZf3sZz+jvV1ddS5koE2lmcHZZTu71WWq6AWklxnyxDT397MNdD8BdKZ4rP0wgbhU1kp2qQTTH35Glusx2NyAWbs3247ExMdsJpu54p+4ORx4EHf3g4LB0usD5gG\u002FxKS2cEEpolNXDPwR+FSW6xEBfp\u002FlOgQxCbMugs36FQDXAde7r45kQGhrBmczGDxxYvrLusTjcd56yyabkQxG\u002Fs92LBYLs+MC1HkhIiIikotCCwb721SuUhwPdl\u002F\u002F+tedrCHc2NjIX\u002F\u002F6Vwc1kj79BQoGF56nMf2iQbkMBp+c5v7DMSmPXTgCGGKxfaopokdh+nbTnyXhhgf8CrMcoYTv68A3sl0Jn8OA3+LLdJIhiYmbRcA9mAESrmzN9NqjknvGYBbh3gX8J\u002FAZh2UrGJy6G4CPZ7sSmDz5DdmuxADGYB4WbNMl3A5c4b46kiH+YDA9qcic6Fk\u002FNVl2Js2aNctJOa+\u002F\u002FjqHHnqok7KkMPXtuHB5D4EZpOH7Uc+bIiIiIrmn1wOh4zaVZgY7VlRUxE033cT73\u002F9+4vH4wDvsxX333ccZZ2jCW7r6DrB13abylCY629ow65Z+OOD2B\u002FNuH3s6ioCT0iyDnjLSSdecYLsWrU167YRiTHbMKSnsC9CFOdflwM6eVwUmwDwFM1N6QgrlVvTU62CgMcW6ycCOx0zYStUWzIz0DZhrH8Hci6MxQd1jSK1f6mPAV4AfpFE3W4lg8MW4+R7w25IPnXPrUKrhsB0A1AHXOC5X6wWn5gzcpkSIYO6hSswfMRu\u002FdliPMAzDPGTsb7nfPcB\u002FYNYLlvzUK000DlOpZ3Nm8OzZs52Us2TJEs4++2wnZUlh6pvSDMfLEXhKEy0iIiKS63rNDMZtmypZtoLB7hx22GF88IMf5JlnnkmrnCeeeIJoNKprk6a+wWDct6kSM4Pzof++UD1K8GBwEfAh4E9pHvNQ7DMf9mch8B0H5dgEg1cB61M4xjcxAVtb64CrMGv8Ng2w7SHAZcCnsbtXJwM3A19IoX6ZsBa4cC\u002F\u002FfjEwx6K8S4FU1557J4V9RmD66W2\u002F56KYmbs3AysH2HYoZgLkd7BPuXwt8BCQqRSMB2AGLnzPcblRoC7xS36c9y5OHIbPAd+22L4bOAszukPCMw\u002FzxV6ZRhn9NRw0M9jeaODHaewfw4yE+TuwGFhN75FLlZgHijnAXEyqj+Mwa0X3tQUz4zZXVWPOc67lfg9ivotiA2wnue09aaJdFZzNYPCkSZMYNmwYDQ3pTchfvHixoxpJoepvfSuX5XtKEy0iIiKS63oFbB0\u002FD2pmcEjOPvvstIPBu3fvZtWqVc4GIw9W\u002FaWJdnwIzQzOvkeAGy22P570g8GnBNgmwsATfg7HzIzdmUZdqoCjLLZPZVbwdOBblvvEeva5ieDrE7+MmYB1M3Avdhkmz8X0179ssU+mbAfu2Mu\u002Fn4JdMPgu0vvM2Loe+8EPrwL\u002FDrwecPtGzO\u002FoN5jJkDaT8CoxdfyETQXTMBf4J8FTs3dhZsQvA9ZgAvIdQDlQC4wDZmF+x9FEMLgNeNtdnfs1A5OG2MZVwJIQ6iK92ayZugH4CybQ+Dq9Z25XYj6o0zDpE151WMfB4iZMGgNbccws3qsx12RP2jEjtNZjUkCDeXiYD5yKGR2VSJtxN2bUSC4qw4z6sl234WnMOWqASf7rFQwupJRmBx54YNrB3Ndee436+npGjBjhqFZSaMJOE62ZwSIiIiI5zx8MLqg2VSH78IeDTlLcu5UrVyoYnKa+A2xDaFNpzeDsex3YDEwMuP2HHBwzSDD4dODP7H02ZRFmVvPv0qjLfExQKahU1gv+IXaZLFsxkwdTXfx8KXA08DAmfhGEh5mpGeTaSHBHYj\u002Fj+hHMLN+BZoL3px0z83kDcAvB1wP+GKauL6RwTFtlwKQA272KuXfuA3YHLTxTiyGWYaZt11js8w\u002FMNGzJDU9i0jVMBb6KGUHzL3qn8G7HjEZZAvwMN+sSDCYHAZ9NYb+dwALg8+w9ELwnEUx2gP\u002FEjIo6EfgVuZsiuhiTPmKB5X4vYb68lXa+MPjTRIP5e+bk5V8zOBsdFwcddFDaZcRiMZ566ikHtZFC1U9KM6evPmsGq\u002FNCREREJPf4B9iC2zaVgsEhmTx5MmPGjEm7nFWrVjmozeCWwTaVh+MU1GLFZrbrAdinofUbBbx\u002FgG26MP30A6XGBZMqOh02KaLbANu0BUcCJ1vucy6pB4ITtmImRdVb7HMS767nKm58B7vvtuWYGbqpBIL9fojdjH8P+0muYdkGnImZ7f1zLALBkLlg8FWY1ARBNWCCYrk6K3Ew2Ql8CvPl\u002FwRaYzVM38b+4W4bZpTW447qEMVc588Dbzgq0yUP+D\u002Fgk5b7\u002FQvzcJHuHwvJHb1mBvNu48jFK6sdF\u002FPmzXNSzv333++kHClMe1gz2NlLaaJFREREcl7fAbbOngWzufTOYDB9+vS0y9iyRSu7patPm6oYtakKle1s13RmB5\u002FEwPGalZjA63MByltIegMJbILBz2AmHNm4wnL7H2EmqLmwGTjfYnuPva\u002FNK3YOxW4gQCMm26ftZ2xPvo1JrRzUJ4D0R2KlZxFmNvvvSDFGl4lg8PHANyz3uRDYGEJdxM4KzI15X7YrMghMwT7A2YGZ6fqm++rkrFswI8BsrMOkRcnkegcSvl6j2OPxuOfqFY1Gs9pxccIJJ+BiqaEHHniASMTVM5IUmj4dF87un8RLaaJFREREct570kQ7fCkYHKJRo0alXca2bdsc1GRw6y9NtNpUBelxoNti++PTOFaQ4FgiE2eQYPA47NaL9RsBHGKxvW3QfBJmdm5Qu7APHg\u002FkfuxS\u002F36GzE2uLHQXYjdQ4QZgrcPjd2ICwkGVYSZMZsvvMPdLWvGNsD+8IzGLTtsc51fAH8Opjlh4CTOSaVO2KzJIfBb7+\u002FFK4EX3VclZVwKXWO6zFRMI3uq8NpJt\u002FlHscc+hnhG95iBZ6LgYP348BxxwQNrlNDc38+ijNtmMZDDp23Hh8h7yPM8rKirSKHYRERGR3NZrZrDLZ0EFg8NVXV2ddhktLS0OajK49R1gGwK1qXJDA2ad2aBsZtP6FRMsrbNNMJiAZfbnQ9j1VdsGg237wm8Bmi2PEcSPLbYdh5k4J+mpwMzyDaoRuC2EejyC3SQ7m8ELLj0C\u002FD9Mivi0hB0M\u002Fj\u002Fs8uSvBr4SUl0kuE3AaZg\u002FdpIZZ1tu\u002FzZwUxgVyYIgaQ3+E\u002FiuZbn1mAcel6OGJHeEFgzOhfWtjj8+nYGk7\u002FrJT37ipBwpPH0+286DwZ5GsYuIiIjkuuQzWmlpqesBtllvUxWyrq60+4OVRcqBDAywVZsqd9gEOicD+6ZwjCMwE+sG8s+e\u002F9YBawJsf1IKdQG7oPbbwFuW5Z9hsW0X4QQDwaSdbrfYfkFI9RhMTgKGWWz\u002Fc8KJU8WB31psfxxQGkI99mYD5l6xyU6wR2EGg8\u002FH5NIOqguz+LGGpmVXDDPSoC7bFRlEpgP7W+5zPQ5Gg+SIgUZ1fR77wHczJrXKaynVSPJBaGmicyEYfOKJJzop5\u002FHHH+df\u002F\u002FqXk7KksGQ4TXRJ5s9QRERERAbQa4BtobWpCllra2vaZcRisYE3kr3yf7ZjsZjzNNGYPtoEtamyy3bWayoj\u002FE8JsM0WTHAoIcjs4GOA2hTqY3MOtr+f8cBBFtv\u002FA9hteYygOjAZUoM6PKR6DCa2s9X\u002FFkotjMUW21YBB4ZVkT24ADMz2omwgsH7Y6bu2\u002Fg2djeehOMu4OlsV2KQsY36NAP3hFGRLGnay799CrgDuzUEIsDHsUvhIvknGWjqaSQ5exUVvfunMR4PMnHdvQULFlBbm8qzem\u002FxeJwf\u002FOAHDmokBc7pPeR7JWTnRhIRERGRvUk+o0Wj0SIcPgd6npd8FsxWm6qQbd2a\u002FkpYNTU1DmoiCT39CGpTFa5l2K3VGVYweEmfn4MEssowKZ9tTMJu4pJtMPhE7Pp6H7Qs31bf3+veKE10+j5ssW0976ZGD8NS7GbdZvL6Pwo85rLAMILBZZhAlc0CFk8C3w+hLmKnC\u002FhOtisxCNn+QX6IwppBv6dg8OHAb7BLhdMNfAbznSKFLZp4E4\u002FHnY7A9c9ozNZo6aqqKv7t3\u002F7NSVm\u002F\u002FOUvee01TZKX3qLR5C2E53mxMGYH+w+X+TMUERERkQEkn9Fcz2rMhTZVoYrH46xfvz7tclysOzzY9WlTOZ1d3\u002FPy99urTZVdMeyCMh\u002FCLtg5DjgkwHZ9g2JB1w22TRVtE8zuAJ6yLP8DltvbzN5MxRsW207GrHkrqRmPXRr1F3CUInkPWjAz7oPaL6yK9ONG1wWGEQz+HnYR8l2YtMR6Osy+v2DWC5bMmmu5\u002FaOh1CJ7+kt1MAa4H7s\u002FrjHgXMJNHSG5I9kQikajTtfm8a\u002FL42\u002FcZdpZZ53lpJxoNMpll13mpCwpHH07LlzeQ57nefR+xlTHhYiIiEju6RUMdvksmCttqkK0evVqGhvTzxg5bJjNco3Snwy0qTTANrfY9MeOxS6d7MkECx73ncH6JvBOgP1s0\u002FLarBf8HPaTlg623P5Ny+1t2cz69oB9wqrIIJBr1x7srv\u002FE0GrR20bgCdeFug4GHwt8zXKfL2IXfZfwFFLq4XxRhVkz2MbyMCqSRX1bMaXAHzEpSWx8HbjbSY0kHyQHELnuuPCv+5PNjovjjz+eCRMmOCnroYce4oEHHnBSlhSGsDsu\u002FOvEoY4LERERkVyUbFNFo9Fil8+CxcXFCgaH5JlnnnFSzrRp05yUM5j5P9tFRUUxl\u002FeQ53maGZx7HsMuXbfN7NqTA2wT4b19wnGCzZqdBsywqI9NMNh20lIRMNti+zocrpm6BzbBQAA3nXWDU74HgzM1EOCvhLA8gMvF50dhgok2AeafAfc6rIOkrgtYlO1KDEIHYHfPdGOXuiIfNPf5+WbMwBIb38J+nXLJb8mGUHd3d3GflLRpyZVR7MXFxZx99tlcf\u002F31Tsr7whe+wMqVKxk\u002FfryT8iS\u002F9Zcm2mX56rgQERERyXn+NlWR4+fBnGhTFaI\u002F\u002FvGPTsqZPt12XoL01V+aaJflq02Vc+qAFQRL5wwmGPzDANuVEmwN1ReBzn7+\u002F2Lg4wH2Xwi8FWC7mdgFO23XC56A3fKi1YQfs7BdRF2LrqfONs3yRcAnw6iIj02AOlPXPpTU6C6DwT\u002FH7otiFfaziCU8rwGt2a7EIGSbWmA1Zi2GQuIf3XU28CXL\u002FW\u002FFpKeXwaXXmsHYrcWyV55vfatsd1xccskl3HrrrUQikbTLeueddzjnnHN45JFHKCoKY5UIySd9g8E4vIcAtGawiIiISM7zL71TjMPnQc0MDseaNWt46inbpTn7N2OGzSRB6U\u002FfYDBqUw0GjxA8GHwsUMzA1+5oIEje9if38P+fDlifhcCPAmxnMyt4M\u002FCqxfZgP6u2FjjRcp+wVWW7AnnM9vrPCaUWqavM0HFs76tAXPUGXwR8zGL7DuBMoM3R8SV9b2e7AoPUOMvtC21WMEBTz3\u002FfD9xhue+dwH+6rY7kCf\u002F6VsWYv2dOXrmSJhpg\u002FPjxnHvuuc7KW7RoEV\u002F+8pedlSf5q5+OC2f3EFCkUewiIiIiOa9vMNjZs2AuDbAtJFdddZWT32dlZSWHH364gxoNbv5r0TMAwmmbyrf0TpwQ0oVKSmxSIg8DDg2w3SkBy9vT+qHLgV0B9j8OKA+wXZgpoqEwUiwH+T1K\u002F\u002FL9+mfq2gdZC9yai2DwTOAmy30ux6RVkNxhmxtf3LDN19oQSi2yqwkYC9wPVFjuux9uMxxI\u002FvB3XBTF43HP1StX0kQnfPOb36S0tNRZebfddhtXXnmls\u002FIkP\u002FVZ3yru8h7qeSkYLCIiIpLb3pMmulDbVIXgiSee4O6773ZS1tFHH015uWIZ6eovTbTrV+JQ2TlD6cfzvDupJYgg6wYHCQa3Ai\u002Fs4d9i7HnWsF818IEBtinGBI2Dsk0RDWap0XznNAvAIJPv1z8T1z4G1IdRcLrB4HLgt9hNjX8M+EGaxxX3QhltIAOyWSMB3ru+biFoBf6AfcpsgGOAa9xWR\u002FJErzTRnkO51nExefJkzjrrLKdl\u002Fs\u002F\u002F\u002FA\u002Ff+c53iMc1uHiw6ttx4fIe8jzP33EB6rwQERERyUW9si25fBZUmmi31q1bx2c\u002F+1ln7bcTT8y1jKv5KQNtqkS\u002FvW6i3NFFsMBrwkDB4EnAQQHKeZb+1wtOeDxgfRYO8O+HESxlNUC3xXH9bCcCSWHR9R9YAyF976cbDL6W4HnyAXYA56DUFrmoceBNJAS2X4AtodQiu67ErKORqm8Ap7qpiuSR\u002FtYMdvLKxY6L6667jmHDgj6PB3P11Vfz6U9\u002FmrY2rdgwGPWdGYzDewjQzGARERGR3OcPBjttU3neu+MCc6VNla\u002FefvttFixYQF1dnZPyioqKOPPMM52UNdiF3abi3Rlo3aGfjNiwSY08Hyjby7+fHLCcPaWITlgUsJyTBvj3IDOZE\u002F5JahkslZZgcFMweGAdYRWcTjB4AXZrdcaBcwE3Ty\u002F5J9fTB8SyXYEclIlrZvsFWIgzg0ekub+HWTt4koO6SP4IM000vrKzcnJ9jRs3jquuusp5uX\u002F605+YN28eK1bkx8oNmsnsTtgpzXzrW4E6L0RERERy0aBZeidfPfTQQxx99NGsWbPGWZnHHXccU6ZMcVbeYJaBNNGaGZybbFIjVwFz9\u002FLvroLB64C1AcqZzd4zMw6URtovlRTRsPfguBQ+d+vgibVUg8GjgF9jFyz7EfBQiscrBDaptCU3ZOKa2Qacc31QQbaMBO5Ff1AGk9DSRPtnBsdiuTNO5uKLL+awww5zXu6KFSs44ogjuOKKK3JylvA777zD3XffzZlnnhnK+Q9WfUaxx1zeQ56nNNEiIiIieaDXzGCXz4K5mG0pn7z11lucccYZnHrqqezYscNp2V\u002F84hedljeY+T\u002FbxcXFYbapdBPllvXAmxbbH7mH\u002F18GBMnZvhN4JcB2QVM2L9jD\u002F\u002FeAowOWAakHg0Ob9Sh5Qdc\u002Fi0pS2McDfmS2CMAAACAASURBVAGMt9jndeCbKRyrkNRkuwJiLRPXzPYLsDaUWhSGI4Gr0XfNYPGeYLCrgnN1FHtxcTG33347xxxzDF1dXU7L7urq4tprr+XnP\u002F85l156KRdffDE1Ndn5s9Xd3c1LL73EI488wsMPP8xLL72UDMpPnjw5K3UqRP2tb+X4EEoTLSIiIpLbQmtTeZ6XkwNsc1kkEmHRokX84he\u002F4O9\u002F\u002Fzvd3e6T6xxyyCF88pOfdF7uYBV2m0rB4Jz2CLB\u002FwG2PwkyS62s+wfqeFxEso+djwIUBtjsO+GU\u002F\u002F38WMDzA\u002FmCWAn054LZ9tVtuvwVYleKxwrIt2xXIY+3AUIvt\u002F0FuBZC3ZrsC6UglGHwx8FGL7SPAmdjf6IVGweD8k4lrFrHcXp+jvfsvYAnw12xXREL3npRmrgr2cnh9q8MPP5zvf\u002F\u002F7fPWrXw2l\u002FB07dnDZZZdx\u002FfXX85nPfIYzzzyTefPm4T5O+K5IJMLSpUt55pln+Mc\u002F\u002FsGSJUtoaSnE5dFzS38pzVyWr5nBIiIiIjkv+YzW3d3ttE2VqwNsc0V3dzerV6\u002Fmtdde49VXX2XFihU8+eSTtLa2hnrca665JtS23WCTgTaV0kTnrkeBSwJue9Qe\u002Fv9A6\u002FcmBJ2B+wRmiaaB4j3H7uH\u002FHxPwOGDOP9WRPrYp6Z4HPp3isST32MYIv4iZaCoO2AaDDwS+b7nPpQRLZVDoqrNdAbHikZk00bYRjyGh1CI3vQL8HPihxT6JzAXLgU1hVEpyRq+UZjhMoV5WVpZ8oO3s7HRVrDOXXHIJS5cu5Z577gntGPX19fz0pz\u002Flpz\u002F9KZMmTeL444\u002FnAx\u002F4APPmzWPGjBn411W2sXPnTtauXcsrr7zCq6++yssvv8yLL75IR0cuDfIbHPyf7eLi4hiOlyHwdVyAOi9EREREclGvmcE4fB4sLS3N6TZVEG+++Saf\u002FnT68YeOjg5aWlpobGykqamJlpYW6uvrM94G+tSnPsUpp5yS0WMWOn\u002FGrp7U6JoZPHg8g5ngUxFg22nAGMxsWr89pWv2ixE8GNwIvADMG2C7ycBUzDrDfgPt55dqimiAOsvtbbLTSu6rw3z+ghqHgsHO2ASDK4B7gEqLfR4AfmpVo8JUgmZ05ptaoDgDx9luuf3oUGqRe\u002F4CnI0Jlu8P\u002FIfFviOB32HSnrjPqyS5IrSUZhUVFcmy29tzM6nFHXfcwWuvvcYrr4Q\u002F1mrTpk3ceeed3HnnnQCUlZUxZcoUpk6dyqRJk6isrKS6upra2lqKi4tpaGgAoLm5mV27drFz507q6urYsGGDZvzmEP9nu7S0tDvElGagzgsRERGRXOQfYFvs8nmwtLQ059tUA9m1axf33ntvtqvhxOjRo\u002FnJT36S7WoUnLa2dyc4lpWVhdmmUnsq97QBzxIsoAtmabsHfD8PAw4KsN8y3htE3ptHCRbU\u002FSCpB4NjBF+fuD+2k3fGpXEsyT2bsFubWtffIZtg8P8CB1tsvx04H4gPtOEgsC+ZCSyKOzMydBzbNQZmh1KL3BEHbgD+m3fTjVyKeSCZa1HOPOAatH5wIes1M9hlOqaysrKc77iorq7mr3\u002F9K8ceeywbN27M6LE7OztZvXo1q1evzuhxxS3\u002FZ7ukpCQacppoLRQnIiIikntCW3onH9pUg0VJSQl33303Y8aMyXZVCk6fAbZO21TRaFSDa3PfIwQPBh9F72DwMUCQlGu2M3AfBa4KsN1xwJ2+n8dg4hdB2Aao+7INBk\u002FAxFV0HxQG207MSaHUYpAKmufxJOArFuXGMLP6bGc9ZktpyOXPDLn8wahQrtlmy+0nYbfIej5pA87ABHD9gYMOzLrjtovn\u002FBegHEiFKznrOxqNFnsO5cPMYID3ve99PPvss7zvfe\u002FLdlUkD\u002Fk\u002F24lR7C7FYjH\u002FKHYNDBQRERHJPf42VZHLZ8Hy8vK8aFMNBj\u002F84Q9ZsCBovEpshNmmikaj\u002FklFynqXmx612PbIPj\u002FPD7jfQxbHABOo3RVgu77rBs8jeJrzh61q9F7NwHqL7auAQ9I8puSO1yy3D3qvSABBgsGjgV9ht+7BzcCilGqUHWGncFYw2L1CuWarsJsx5VGYs4O3YEal\u002FXEP\u002F74KuMSyTA\u002F4DTAl9WpJDksusNTd3V0cj8c9V6986riYMmUKTz\u002F9tALCYs2f0iwxM9jlKxqNJrLPaEFoERERkdyUfE7r6uoqGaxtqkJ29dVX88UvfjHb1ShY\u002FjZVYmawq1d7e7s\u002Fm6faVLnpXwSf5XgEvbOGHhNgn13Ai5Z1ihIshfNUzNrBNvVJsAmC78lyy+2Pd3BMyQ3LLLf\u002FAHbZjWUvBgoGe5hAsE1u7uXAFSnXyA3bdIRDQqnFuwoxeOfaYL1mrdiNhoLgazjki27gMAZ+wPkF8HvLskcAv0V\u002FNApRskehs7OzNB6PF7l6VVRUJL+P\u002FI27XDVlyhQef\u002FxxZs7UuCMJrp800c7uoXg8XuQLBuf+TSQiIiIyOCWf0zo6Opy2qfxpovOhTVVoPM\u002Fjpptu4lvf+la2q1LQ+swMdtqmikQiZb5D6SbKXUEDo7XA9J73RcChAfZ5jNRSIwetk3\u002Fd1qMC7rMbeMGuOv2yDXJ\u002FyMExJTe8AbRYbD8EODykugw6AwWDvwScalFeKyada2fKNXIjYrn9PqHUwvCAE0Isv1Dk0jUr5b3pMsK0wnL7j4RSi+yJEjyl\u002FEXA25blJ9YPlsKSbAx1dnaWukzHVFlZmXej2Pfdd1+WLl3K6aefnu2qSJ4IO020LxicHzeRiIiIyOCTfE7r6Ohw2qbKl6V3ClFNTQ1\u002F+MMf+NrXvpbtqhQ8\u002F2e7vLw86vIeam9v9y+Pp5sod9ms6ZuYeDQDExweSKrpmB8j2FJN\u002FgDbQQHLXoSbtXtt10I+Hhjr4LiSfd0Em73u9+9hVGQw2lsweDZwg2V5XwXeTL06ztgGFueGUgvjSPRlFUQuXbPjCH\u002Fmsd9TltvPB\u002FYNoyJ5oBHzB6DLcr\u002F\u002FAk52Xx3JomRjyHVKs3ztuEg0+n\u002Fwgx9QUqLJ8LJ3\u002Fs+265RmbW1t6rgQERERyX3+bEtqUxWAww47jGXLlmmQcIaE2abq6OjwN+p1E+WuJwi+pvOBPf8NMis4RurpmLcArwfY7rCe\u002F04EhgYs2zaIuycrgc0W25cBynmfGttJm1Wh1KK3By23\u002F3\u002FAsDAqMtjsKRhcAfyu579B3Qf8PO0aubHDcvsgX8Kp+lyIZReSwXzNnrTc3sPM2h+slmKfit4D7sI84EhhSDaGuru7nY5iLysri3ueF4P867jwPI9LLrmEZ599ljlz5mS7OpLD+qY0c3kPqeNCREREJC\u002F4B9i6nhmcXHon39pU+aiqqoorr7yS559\u002FnhkzZmS7OoNGmDODOzs7NcA2PzQC\u002Fwy4bWJmcJA+7WXY95X7BQkkH4qJDR040IY94gHLDVrWfZb7\u002FCcwxtHxB5MGy+2Hh1KL3h7ALkg9DLgspLoMKnsKBt+A3Zqpm4EL0q+OM1stt5\u002FDu3n7XRqPGbkgA7O9Zsdgfr+uTQMyPYRyFbDWcp+LgMkh1CVf3IT9A8gozCAXTZksDL1mBmMC\u002Fs5excXFUcjfjoujjz6a5cuX87Of\u002FYwhQzKZ6EDyRd+OCxzeP5FIRB0XIiIiIrkvtDZVPi69k488z+OMM87gjTfe4Lvf\u002FS5lZWUD7yTOhNmm0gDbvBJ0tmwi6HpwgG1TTRGd8FiAbYZi+sGDBoNfwb7\u002Ffm\u002FusNx+CPBjh8cfLGyDwTNDqUVvO4A\u002FW+5zKeFmih0U+gsGn4rdrMMYcDZQ76RGbqy23N4jnKDt94DKEMotRLbXrAQ4K4R6XI9ZMziT4sBvLfepwPzR9NxXJy\u002FEgHOAOsv95gNXu6+OZIF\u002FZrDTlGbxeNwrKSnJ62AwQFFRERdccAGrVq3iwgsvpKLCJtmHFLowU5pFIhF1XIiIiIjkvtDSRPcExsxB8rhNlavKy8s5++yzefXVV\u002Fnd737HpEmTsl2lQalvtiWliR60gk5W2Q+T7jhIsC3ddMzPEuxzM53gwWBXKaIT\u002FgU8Y7nP6cBXHNej0NkGg48NpRbvdbvl9qXAvcDIEOoyaPQNBo8FfoldgOl\u002FgaddVciR1zDBIhtfxu1M008B5zosr9C9msI+XwdGOKzD5zDXLRvuxv4zu5DwA5u1wOiQj5Gq7ZhBHLa\u002FN60fXBh6jWJ3mY7J8zyvpKSkG6Cjo4NoNLrnWuSBCRMmcPvtt7N+\u002FXquuOIKhg\u002FPRMYXt2pra\u002FnsZz\u002FLHXfYDhyVPWlra0u+d53SrM\u002FM4Lb3Hl1EREREckBG0kT7nzsldZ7nMW\u002FePG699VY2bdrEXXfdxYEHBo3hSBj8n+2Kioow00TrJsptywmW0rkUOBzYZ4DtdmGWyEtHhGCB1qlkLxgM8D8p7HMzmV\u002Fi8UDgIxk+pivbLLc\u002Fi8ysz\u002Fs09jHF6ZhZ85kMCFdiJsK6jEFljT8Y7AG\u002Fxi73+lLgSof1caUFExC2MQy4jT2nzraxEPiNg3IGk23Aest9xgI\u002FwM3s2E9gn57CpdXAX1PY7wpMQNj1DOERmHt7PXCY47JdWgR833KfIrR+cCFINobCDAYDRCKR7JyhY2PHjuWaa65h48aN3HHHHZx44omUlORu1vQJEyZw3nnncf\u002F997N9+3Z+85vfsHDhwmxXq2CEub5VT5rB5KEyf3YiIiIiEkBobaqSkhLyfemdXDB+\u002FHjOOOMMbrvtNtavX89zzz3HV77yFUaPztUx+4OL\u002F7PtOhisNlVeiWH6J4M4g4H7cB8DXMxKCJIqeg4wK8B2zcDz6VWnX09hH2Quxkxm\u002FF\u002FCXQqwGvg85rxfAz4e4rHC9Lrl9rWYeEsmfBOTMdXG+4ElwCHuq9PLHOBHmNTodwE1IR8vI\u002Fw3zFeAkyz2bQbOBLqc1sidxwiWg9\u002Fv45iLey6pnVcJJn\u002F5NWhd0lQ8Clxouc\u002FZmIeii0ntD2UZ8N\u002FAt3EzECAd12KC0ra+hfkivBDYkMbxizBplD+DmXGbL19y38aksDjKYp9RwD3A8UD3ANtKbnpPmmiXhSc6LsCM9q2urnZZfFbV1NRw\u002Fvnnc\u002F7557Nz507+8pe\u002FcN9997F48WKam5uzVq999tmH+fPnM3\u002F+fI499lhmz56N5w3WTPjh8w9yKC0tjbm8h9rb27VmsIiIiEjuC7tN1R2NRosVDN67iooKRo8ezT777MO0adOYPXs2M2fO5OCDD2batGnZrp7shb9NVVZW5rRNpTTReecRgi1n+OUA26S7XnBCkPTVQfvhnwA606jL3nwVeBm7pTY94DLMbN3\u002FwvzObIOK\u002FRkNLMBklDwNs05xvnsF8x1i8\u002Fs9B2gEvoHddS8Cygn+nfUCJrD\u002FBYtjgEm5\u002FgLwE8yggO2W+\u002FenCDNz\u002F2Tgo8ChDsrMOYk\u002FLAdjfnE2vgSsdVsdp+7DpBG2dRZm6v\u002FlBB+ZUgl8EjOaQTlaUnc\u002F9sFggAswozUux4woCqIaE\u002FT8JuYLJBe8BPwO+PcU9l0IvIWZ3f9rzBdikPTJ0zAjaY7DfIZdpkrPlC7MwJSXgaEW+30AM6v68jAqJaHzd1wU43h2fFlZWXJAUFNTU8GOvB41ahTnnXce5513HtFolNdff50lS5awZMkSli9fztq1a52ndRs9ejTTp09nv\u002F32Y+bMmRxyyCHMnTuXsWPHOj2O7F1jY2PyfU1NTRcO7yGNYhcRERHJC\u002F400c7bVKWlpd2dnZ3lra2tRKNRiouLXRY\u002FoB\u002F96Ee9nnlzwdChQykqKqKmpobS0lJGjBjBsGGZyMYpYejTpurG4T3U3d2tNlV+eQzTD5vuRKMYwdcgHsi\u002FgE2Ai0XFXdWpP29i+udvTWHfA4G\u002FA6swk34ewgQ\u002Fg0z8qQH2B2YAs4ETMcHAbE8Wcy0CPAd82HK\u002Fr2DiDTcBD9J\u002FuumxmN\u002FfYZhJWidgYoZ\u002FsDjO13r2e59l\u002FUoxAwm+iIkp\u002FRmTGj1IynYPmIy5\u002FvsDR2LOdZRlHfJOCSaQeQ9QYbFfO2bkRaZypW8DLrHc55+YafCpBGfnYkaUvAU8jpl6\u002Fk7PqxTzwRiFyfF\u002FFPAh8mcWZS57HDOzdUoK+x4JPIn58n8cc\u002F3fwayzUIa5XiMxN\u002FqRmGtWlX6VnfsaZgRKKq2BMkxg\u002FAKgHngRM2CjHpM6fXhPucOAcZgAeqG0OtZhztvmjw2Y0WPPEM66FxKuXqPYPcdTSCsrK5Mj3xoaGlwWnbOKi4s5+OCDOfjgg7nwwnfH5ezYsYMNGzawfv16Nm3aRGtra\u002FLV2dlJQ0MDpaWlVFdXU11dTVlZGcOGDaOkpIQhQ4ZQXV3NpEmTGDNmDBMnTqSmRn8uc4H\u002Fc11bW9vl8h7q7OxUx4WIiIhI7gu1TVVeXt7Z2tpaHY\u002FHaWxsZMSIzC639\u002F73vz+jx5PBJ9Gm8jwvXltb2+3yHtIA27yzAzNJJd2l9pYRLJgV1GPYz7rsT9j9pj\u002FG9NWnmop5JmbCz9WYJRA2YGICuzD94jWY9MdVmAli4xh47eZC8kfsg8FgAqWJZTW3AzsxsbFyTCDYJp64J02YSV5PplheOWZiXWJy3RZMXRNxoTjmutdiJpFVYSbH2cyULhglwI3YB0wrgdPdV2eP3kpxvxuAO9M47oye18VplCHBxTCfxx+lUcbMnleQtBu5qA4zouV3aZYzAjOiZTD5I2YU1\u002FkW+yTWDz4E88dC8keyMRSNRp2nNKuoqEjODB4sweA9GTNmDGPGjFFnSoHpGwxWSjMRERGRQcc\u002FM9h5m6q8vLzXANtMB4NFwpZoU5WWlnYVFRXhuE2lpXfyz6OkHwx2lSI64VHSDwa\u002FAaxPvyp7FcNka30GMzs3HVWY2IC864+YmItNRs2+xva8wrAEk5r696SfYWEfBleg30oRJvBUqH6LSQ2Qbd2YfPNLsl2RPPB\u002F5Eb68Q7M+rmvZeHYvwduycJxC8FXMWlQbIzGBN+1znd+6dVxgfl75uylYLAUOv8o9pqamigO75\u002Fu7m51XIiIiIjkvl4zg3HcpqqsrFSbSgpWV1cXra2tAFRUVHTi+P5Rmui85GL2rOtg8BNANM0yMpVNsQ04FViRoeMNJk3AD7JdiQH8EROnTPfzKntRhOM1QXJMFPg8wfLEh+m7wCJMfnbZuw7MNQuy3m2Yvg4s7nllwzdIf3bwYNQGnIH9g\u002FIHgKvcV0dClFzINhqNJta3cvaqqqoadGmiZXDxj2LvWb\u002FN2f3TJ02020WnRURERMSV5HNaT+DJaZuqJ0AGqE0lhcf\u002FmS4rK+vE8f3TJ0202lT54Z9AOguV78Is+edSYhnBdGRyab0dwHGYGcLi1g3kxgS8vfkZJt1zR7YrUqgKbUHs\u002FiwjuymDfwxc1\u002FP++SzWI588C1yexeNfi7lukL1rFgXOJr0054PVq5i1l21dBpzkuC4Snu6eF11dXcXxeNxz+dIodilk3d3dyVHs5eXlXa7vn87OzmLf4TSKXURERCQ3+bMtOW9TKduSFDL\u002FZzqMNlV3d7faVPmnCzMTN1WPEs6syEfT2LcN00+fSY2YDKs3YtZ7FTfaMGvz5vr3yb2YbK1rsl2RQjQYgsEAtwPfIrNfIHHMiIuv+I6rYHBwNwDXZ\u002FiYMeA7wBW+\u002F5fNaxYFPocJbHbtfVPp43bgfst9EusHa12B\u002FNEGZs1gzzF\u002FMLixMZ2BnSK5p6GhgXjcPJqUl5d3ur5\u002F+qQ0i2TnLEVERERkAL3SRLt+JtQAWylk\u002Fs90RUWF8zZVn2xLalPlj3QCr2HNwH0sjX2fITvBw05M1syTyZ3ZrIUQmF6KyaiZ6zNvXwIOxcwUzpW00dnOYuvEYAkGA3wPOBdozcCx6oFPYGYa+r8odqBRDTa+CVxMZh56dmD+wFzd5\u002F+vAbZn4Ph7cwtmRMzyLB0\u002F22nWU3UesMFyn9HAPWj94HzRDGbN4FgsVuSy4VVdXa2OCylYfUexu7x3PM\u002FzIpFIme9wTZk\u002FQxEREREJIPmc1tXVVer6mVDBYClk\u002Fs90ZWWl8zZVZ2dnqe9walPlj1SDwbE09h3IC8DuFPfNZIro\u002FjwKzMIEhndmqQ5LMDGlr2Tp+K79DTPzeku2KzKAZuAiTFA4rHtjII2Y7LEHA5uzVAenBlMwGEzK3Tm4X4w9oRv4KXAA8Nc9bKPZwXZ+irnpnwyp\u002FE7gZsw129NIqVy4ZkuBI4ALyNyAgieADwGPZ+h4ru0GzsI+mP1B4H\u002FcV0dC0AAQj8e9lpaWUpcpmWpqatRxIQWr7yh21ynN+gSDdQOJiIiI5KZOemZ8RSIRp+2peDzuVVdXJ9cMVrYlKTR92lTO00SrTZW3NgCrUthvGWaiUhiipJ6+OtvBYDB\u002Fq24EJmMm\u002FizLwDE3AD\u002FBxJGOAX5N7qdXtvEsJsD5I9xmI20A6hyWB\u002FAKZlnHg4D\u002FI\u002FzBMR3AU8AXgAmY5WdfDfmYGTMYZ7+tBU7BzLT8MvBxoGyvewysHvOlcDuweoBtFwP\u002FL83jDTargBOA4zHX7COk\u002F9ndAfwKc83WD7Dt85iZ3tkWxXzp\u002FQL4GOZztBCodHiMHcADPcdY4rDcbFkMXAlcY7nfNzF\u002FGLM18kiCSTaIWlpayocMGeJsFnttba2CwVKw+o5iBzyX5UciEf8odt1AIiIiIrmrAajs7Owsw\u002FEzYXV1dbJ9pjaVFBr\u002FZ7qqqsp5m6qjo0PB4Px1K6Yf28aDYVTE59fYpzluAt5yX5WUtWP6q38BTMXEdE7ETJ4alUa5UcyszxcxQfPHCWci1mbMerhBvR1CHfzqMbOdr8ME2f8NmGtZRjcmWPs8sAjTjx5WCurXMJPkvoyJEX0UE6ifRXpxoibgTeBpzLV\u002Fjp5lCR17rOc4QaQ6k39AJcCnwyrcoeYQynyu5zUC+DDmS\u002FpQYDZQPsC+LZiL9wzmQj5D8FTGfybYBU03D\u002FlK7K7tyjSPlwlP9rxGYdIZnIj5kjqQgQP6TcAbmGv1KPAPzMiiIO5h4HTDmUylHMN8jv4MVGN+D0f1vGYBYwKW04H54\u002FYm8DpmtNc\u002FcZMD\u002F4fAXwJuG3bO\u002FeswAwqKLffTOs25L9kgampqKhs\u002FfryzP9b+jovdu0P7GyySFX2DwfF43GnHRXt7uzouRERERPJDAzA+Ho97ra2tpVVVVc76NnoCZIDaVFJ4wm5T9ZkZrKn1+eVnPa9c8veeV6FYh1lW8Zaen6cC+2NmD0\u002FExA6KgeGYPvtmTICvA\u002FN3rwkTbH0bM0ksaIwgHS+Qm3G4bZhlM6\u002FGxBQOBaZjYmaJVzEmHtaICSKv6Xm9RTiB073pwGT9TWT+rcbE896Huf7jgBrM5LkKTL07Mde9o+fnzbx7\u002Fd\u002FJUL2\u002FkaHj7FUJdiMSClE98IeeF5jU2WMx08CHY35HZZi1hhswMyc3pXG8d8jM77wuQ8fJhp2YAO09PT8X8+41G4a5ZqWYa9aI+V2kkwd\u002FK7n7u2zFpCT3pyWvBKYAQ4Hanp+7MV94jZiRVM2Y8wprEfYXel65IAbcn+1KSCiSra+2trYyz\u002FOcNb6GDh2qmcFSsPydcRUVFV0u7x14zyh29fyJiIiI5C7\u002FANvy6upqZ30EWnpHClnfmcGu21S+NYNb0GQFkYGs63lJenaQG6nBbbSSW3GInDYY00QPJIYZEbEt2xWRwKKYwObWbFckR7RjZkGLFLpk66u1tdVpMLi6ujrqeV48Ho976riQQtPU9O4SK1VVVd0hdlyARrGLiIiI5LK+bSpnayL6l\u002FFRm0oKjX8d7Orqaqdtqmg06nV1dSX67DW4VkREnFAwWERE8lWvmcEu0zIVFRVRXl7eGYlEyt955x3i8TiO42UiWbNjx47k+5qams4QU5ppFLuIiIhIbku2qZqbm522qYYNG5ZMu+l\u002F\u002FhQpBP7PdG1trdM2VZ97USMpRETEiaJsV0BERCRFvYLBgOfyVV1d3QHQ0dGhNa6koGzb9m7ykxEjRkRweN\u002FEYrEi3yh2dVyIiIiI5LbQ2lTV1dXR0tLSboC6uroMnY5IZvjbVKNHj+7A4b3T0tLiX3ZHbSoREXFCM4NFRCRf9e24cDrAqaamJrJr164hYDovRowY4bJ4kazpEwzuxOG909LSUqpR7CIiIiJ5Iznq1fXSOwDV1dUdDQ0NJY2NjbS1tVFVVeWyeJGs8bepRo0a1eHy3lEwWEREwqBgsIiI5Ktko6i9vb3UdarbmpqajsT7bdu2MWvWLJfFi2SNf2bGyJEjO1ynNPP9qI4LERERkdyWXPi0ra2tLBaLOR1gW11dHWloaKgG8ww6bdo0l8WLZE2iTVVWVtZVVlYWd3nvqE0lIiJhUDBYRETyVbJRFIlEnI9iHzJkSK9gsEihSHyei4uLY0OHDu3GpCNzQqPYRURERPKKf4Ct8zZV3wG2CgZLIWhubqa1tRUwn3HX901P5rMEtalERMQJBYNFRCRfJRtFHR0dpTgMaAEMHTo02XGhNa6kUHR2dlJfXw9AVVVVYm0rZ9ra2kp9P6rjQkRERCS39cq2hONnQ\u002F8AW7WppFD4B4tXV1erTSUiInlBwWAREclXoaaJ9geDNTNYCkVdXR3xeBww62K7vm\u002F6zAzevccNRURERCQXhNqmqq2tVZtKCo7\u002FsxxGm6q9vV0zg0VExDkFg0VEJF\u002F500SXuk7NNHz48M7Ee41il0Lh\u002FyzX1tYqpZmIiIjI4NYr25LrZ8Nhw4apTSUFx\u002F9ZHjJkSGcIbSrNDBYREecUDBYRkXzVAMQBr7Oz03nHxYgRIzSKXQqO\u002F7NcW1vrvOOiJ71gQqPLskVERETEuV4zg0MIBqtNJQXH\u002F1keOnSo8wG2kUhEwWAREXFOwWAREclX3UArUBOJREpcp2YaOXJkchS7Oi6kUPSdGez6vtEodhEREZG80ivbkutnQw2wlULUd2ZwCGmi1aYSERHnFAwWEZF8Vg\u002FUdHZ2lkSj0aLi4uK4q4JramqiJSUl0e7u7mKlNJNC0WcUeycQZproepdli4iIiIhzu+nJttSzTmloA2zVppJC4W9TZI1hNwAAIABJREFUDR8+vAO1qUREJA8oGCwiIvmsDpgcj8e9Xbt2VYwdOzbisvCamprOhoaGyoaGBtrb26msrHRZvEjG+Tvhhg0b5jxNdHNzc7nvR03\u002FEBEREcltXcAuYFRbW1uZ62fD4cOHdxcVFcVjsZinmcFSKLZv3558P3z48C61qUREJB8UZbsCIiIiaUg2jHbt2lURj8c9l68hQ4a0J8pft25dds5QxKH169cn348ePTri+p7p03Gh6R8iIiIiuW8bQDQaLWpoaChz+WzoeR7V1dURMAG0tra27J6piAP+voExY8Y4b1O1trYm2lRRYGdWTlJERAqOgsEiIpLPksHghoaGcs+xESNGJIPBa9euzc4Ziji0evXq5PsJEyZEXN8zLS0t\u002FmDw9vfWQERERERyTLJNVV9fX+H6+TDRporH47z99tvZO0sRB6LRaHKAbWVlZeeQIUOiLu+XWCxW1JOyHWAHJiAsIiKSNgWDRUQknyVnHjY0NJS7HpE7evToZDB4zZo12TlDEUe6urrYuHEjANXV1Z3V1dXREEaxJzoudgPte6yMiIiIiOSKZJuqvr7eeZtq5MiRalNJwVi\u002Ffj2dnWYp7BEjRrS7vl\u002Fq6+vLYrFYIu20UkSLiIgzWjNYRETyWbJx1NjYWBGPx50OchozZkxyDWLNDJZ8t27dOrq7uwEYMWJEm+v7paWlpaS7u7u450d1XIiIiIjkB3+2JedtqtGjRyfbVAoGS77zf4Z7gsFO75eGhoYK349qU4mIiDMKBouISD5LjmJvamoq8zzP29vGtsaPH69R7FIw+nRcRFzfL\u002FX19VovWERERCT\u002F+NtU5a6fEceMGaOld6Rg+NtUY8aMaQ+hTeUPBqtNJSIizigYLCIi+Sw5Ura5ubk8Ho87bYjts88+GsUuBcO\u002FXvDo0aPbXd8vu3fv9geDNYpdREREJD\u002F4sy05b1ONGzdObSopGP7P8OjRoyOu75eGhga1qUREJBQKBouISD5LjpRtaWlxPjO4qqoqVlVV1dnW1laWWBuorKxs4B1FcpB\u002FJsbYsWOdj2Lv03GhUewiIiIi+SH53Nbc3Oy8TTVx4kRlW5KC4f8Mjx8\u002F3nmbqqmpyd\u002FhoDaViIg443RdAxERkQyrA2IALS0t5YDn+jVy5MgIQDQaZcOGDZk6LxHn+nRcRHB8rzQ2NioYLCIiIpJ\u002F\u002FNmWynD8jFhRURGvqanpBNi4cSMdHR2ZOSuREPjbVD2ZxJzeLz33YILaVCIi4oyCwSIiks+6gHqA1tbWsng87rl+jRgxQiPZpSD4P7\u002Fjxo3rcH2v9BnFrpRmIiIiIvkh+dzW0tJSHmabKhaLsW7duuydqUga\u002FJ\u002FfioqK7pqamqjre6XPAFu1qURExBmliRYRkXy3DRgVjUa9pqam0qFDh3a7LHz06NFa40ryXnd3N+vXrwegqqqqq7a2NooZfe6MgsEiIiIieakZaAWqw0gTDTBy5MjIxo0bh4JpUx1wwAGuDyESOv\u002FM9hEjRjhPEQ1m+Svfj2pTiYiIM5oZLCIi+S6ZOmn37t3lnmPjxo1LBoPffPPN7JyhSJrWrl1LV1cXACNGjIi4vk88z1NKMxEREZH8VQfQ2dlZ3NHRUez6OXHMmDHJNtUbb7yRvbMUSYP\u002Fsztq1KhQ2lR9gsHbM3+WIiJSqDQzWERE8l1ytGxDQ0NZPB5v39vGtiZNmpQsb8WKFS6LFsmYl19+Ofl+\u002FPjxrfF4XKPYRURERCRhG7AvwK5du8onTJgQGWB7KxMnTmxLvF+5cqXLokUyxt+mmjBhQltIbarSnreNQNvethUREbGhmcEiIpLvkkGn3bt3l2NS3zp7TZ48OVJaWhoD03ERi8Uyc1YiDvk73Xo645zeJ4B\u002FZnAH0BD2OYmIiIiIM\u002F42VRmOnxOnTZuWDGppgK3kK3+bavLkyc7bVK2trSVdXV3FPYfQ4FoREXFKM4NFRCTfbU28SaSJdll4cXExo0ePbtu6dWtNS0sLb7\u002F9NtOnT3d5CJHQ+Tvdpk6d2ub6PolEIkWRSCTxXLkNiLssX0RERERClWxT1dfXl3ue1+Ky8NGjR3dVVlZ2t7e3l7zxxhtEIhEqKipcHkIkdP421bRp05y3qXbt2lXu+1HBYBERcUozg0VEJN+tT7ypr68vj8fjnuvX+PHjNZJd8lric+t5HlOmTGl3fY\u002FU1dX5e\u002FPWZecsRURERCRF6xNvdu7cWRFmm6q7u5vXX389aycqkorW1lbWrFkDQHV1ddfw4cO7Xd8j27dvV5tKRERCo2CwiIjku\u002FWJN\u002FX19RWYv21OX5MnT06uG\u002FzPf\u002F4z7PMRcWrDhg3U1dUBMGrUqPaeWRhO75Ht27dX+g6pjgsRERGR\u002FLI+8WbXrl2htKn86wYvWbIk7PMRcerFF18kGo0CZr1gQrhHdu7cqWCwiIiERsFgERHJd8lGUn19vfM1gwFv\u002F\u002F33T6ZJe+6550I\u002FIRGX\u002FJ\u002FZKVOmtBLCPbJz505\u002FSjN1XIiIiIjkl9DbVNOnT0+2qRYvXhz6CYm45G9T7bvvvi2E06ZSMFhEREKjYLCIiOS7ZmAXQGNjY1ksFivCcaNsypQpkfLy8ijA8uXLaWtLDmoXyXnPP\u002F988n1YHRd91rdSx4WIiIhIfkk+vzU0NIQ1wLY1cYx\u002F\u002FOMfoZ+QiEv+NtX06dNDGWDbMxAjQW0qERFxSsFgEREpBOsAYrGYt2vXrjIcN8qKioq8yZMntwJ0dXXx4osvZu7MRNLk77iYMWNGG+q4EBEREZHemoB6gIaGhrJ4PO78eXHYsGHRUaNGRQC2bNnCxo0bM3ZyIumIxWLJ5aKKiori++23n9pUIiKSdxQMFhGRQpBsKO3YsSOUkew9MyoBWLRoUegnJOLCjh07eOWVVwCorq7unjhxYgfhd1ysD\u002Fu8RERERMS5dQDRaDSUAbaAN3Xq1OTsYLWpJF8sW7aM3bt3AzB+\u002FPj2ioqKOCHcHw0NDWU9h4wAdZk4NxERGTwUDBYRkUKwNvGmrq6ughAaZrNnz04Ggx955JHQT0jEhUceeYRYLAbAjBkzmgjh3qB3MLgV2JaBUxMRERERt5Jtqq1bt4bSppo1a1Zz4hhqU0m+eOihh5LvZ86cGUqbqqGhoTQSiRT3HOZtIB72eYmIyOCiYLCIiBSCtxJv6urqQpkZvN9++7XX1NR0gVk3eNs2xbsk9z388MPJ97Nnz24mhHtj586dZZ2dnYlnyrdQx4WIiIhIPnoz8SasAbZz585tKSoqigM89thjdHV1ZeTERNLhb1PNmTMnlDZVzwCMhDdCPSERERmUFAwWEZFCkGws7dixI5SOC8CbMWNGC0A8HufBBx\u002FMxHmJpCwSifDoo48C4HlefM6cOS2EcF9s2bJFHRciIiIi+S\u002F0YHBVVVVs8uTJbQBNTU08\u002FfTTmTgvkZRt3bqVF198EYCqqqru6dOnt6M2lYiI5CEFg0VEpBCsSrzZuXNnKDODAe+QQw5pShznzjvvDPucRNLywAMPJNe2mjZtWmttbW2MEO6Lbdu2+Tsu3kRERERE8lEyAPXOO++E1qaaM2dOsk111113hX1OImm5++67k8vuHHjggc1FRUWh3Bc9g9oT1KYSERHnFAwWEZFC0ADsAKivry\u002Fr7u4uIoQG2mGHHdZSXV3dDbB48WLefFNtNMldv\u002F71r5PvjzzyyAZC6tDbvn17Oe\u002FSTSEiIiKSn96kZ7mPHTt2hBYMnj9\u002FfmMiVfR9991HY2Njhk5PxN5vfvOb5PtjjjlGbSoREclbCgaLiEiheBMgFot5Ya0bXFxczKGHHprsrbjtttsycmIitlavXp1MEV1WVhY74ogjQlnbCvB6OgsTlNJMREREJD+1AFsBGhsbyyKRSDEhPDsOGTIkuv\u002F++7cAtLe386tf\u002FSpT5ydi5YknnuC1114DYPjw4Z0zZ85sI6Q2Vc9s\u002FAQFg0VExDkFg0VEpFAkU0Vv3rw5tHWDjz322AbP8wC444472LJlSwZOTcTO1VdfTTQaBeDQQw9trKysjBPSPbF9+\u002FZESrMY8FYGTk9EREREwrEKIB6Ps2XLltBmBx977LG7Ewe8\u002FvrraWtry8S5iVi58sork+\u002FnzZu32zMdAc5fHR0dxQ0NDWU9h9qGyXwmIiLilILBIiJSKF5JvNm4cWOFF5LJkyd3zp07twkgEolw2WWXZe+MRfrxwgsvcM899wBQUlISP+2003aFdT80NjaWNjc3l\u002FQc+i1APXkiIiIi+Wtl4s3GjRsrw3qGPPTQQ1snT57cDlBXV8d1112XvTMW6ce9997Lc889B0B1dXX3hz\u002F84Yaw7ocNGzZUJNYlBlZk7aRFRKSgKRgsIiKFItlo2rJlS2UsFisK6\u002FWRj3xkV3FxcRzgt7\u002F9rdJFS86oq6vjM5\u002F5THJW8JFHHtkwcuTIaFj3wttvv13pO7w6LkRERETyWzIYvGnTpoow21SnnXbazsSxrr32Wh588MHsnLFIH6tWreKCCy5I\u002FnziiSfWl5eXE9a9sGHDBrWpREQkdAoGi4hIoViJSVPL1q1by8Matet5njdx4sSuU089Ndl58R\u002F\u002F8R98+ctfprW1NWsnL\u002FLoo49yyCGHsGHDBgBGjRrVefrpp4c2K9jzPG\u002FTpk0Vviqs7L9mIiIiIpIn\u002FANsQ8u25Hmed\u002FDBB7fPmzevASAWi\u002FHxj3+c733ve3R1dWXv7GVQi8fj3H333Rx55JE0NJhMzdOmTWtbuHBhaLOCPc\u002FzelKyJ6hNJSIioVAwWERECkULsBagqamppLGxsYSQ1rgCvFNOOaVhzpw5zYmD\u002F\u002FjHP2bq1KnceOONtLS0hH+2Ij2effZZTjjhBE466STq6uoAqKioiF100UXbwlwrGPA2b97s77jQKHYRERGR\u002FLYKiABs27atPB6Ph\u002FYcCXhnnnnmzve9733tANFolG9961vMmDGDX\u002FziF3R0dGTmjGXQi8ViPPDAAxx++OGcffbZNDebZv7QoUO7L7zwwrri4uJQ74PNmzf7B9iqTSUiIqFQMFhERApJchTthg0bKgixweZ5nnfRRRdtX7BgQb3neQC88847fOMb32D8+PGcc845PPXUU\u002FjW\u002FhFxZvPmzVx\u002F\u002FfXMmjWLY489lieffDL5bxMmTOi4\u002FPLLN02aNKmLEO8BwNu2bZtGsYuIiIgUjm7gdYCOjo6i7du3lxHis2RJSQmXXnrp1iOPPLIpUYH169dz3nnnMWHCBL70pS+xdOnS8M9aBqW33nqLb3\u002F720ydOpWPfvSjLF++PPlv06dPb7viiis2DRs2LEaI90A0GvV67jOANmBNuGctIiKDlZftCoiIiDj0TeA6gJNOOqn+E5\u002F4xO5MHPSNN96o+Mtf\u002FjJy3bp1FX3\u002FbdSoUSxcuJBTTjmFBQsWMGrUqExUSQpMd3c3S5cu5aGHHuLhhx\u002Fm5ZdfJh6P99qmsrIy9qEPfajhlFNOaSgtLY3voShnWltbiy699NKpPfXYBkwI+5giIiIiEro7gPMBzj777O3z58\u002FPSNqjZcuWVf\u002Ftb38bUVdXV9b33yZOnMjJJ5\u002FMySefzIknnkhtbW0mqiQFpqOjg+eee46HH36Yv\u002F\u002F977zxxhvv2WbIkCHdCxcu3H388cc3FRWFP4dqw4YNZddee+2knh+fB+aFflARERmUFAwWEZFC8kHgGYAZM2a0X3rppdsyefBXX3218oknnhj65ptvVsZisff8jfU8jwMOOIBjjjmG+fPnc9RRRzFjxgwy0ciU\u002FFJfX8\u002FSpUt5\u002FvnnWbx4MUuXLt1j+vERI0Z0HXXUUc0LFixoqqyszNhU9Jdffrnq9ttvH9fz45+A0zN1bBEREREJzeeAXwEcc8wxTeecc87OTB04Ho+zdOnS6qeeemro+vXrK\u002FoOfgQoLi7moIMOYv78+Rx99NEcffTRTJ06NVNVlDxSV1fHCy+8wOLFi3n++edZtmwZkUik323HjRvXOX\u002F+\u002FKbjjjuuORMDaxMWLVo05E9\u002F+lNixPj3gf\u002FK1LFFRGRwUTBYREQKSSXQAJSVl5fHbrnllg3FxcUZr8Tu3buLlyxZUrN8+fLqzZs3l\u002FfXiZFQXV3NwQcfzNy5c5k7dy6zZs1iv\u002F32Y+zYsRmssWRLe3s7a9asYfXq1axcuZIVK1awYsUKNm7cuNf9ampqogceeGDb0Ucf3XLAAQdEEqnKM+nee+8d\u002Fvjjjw\u002Fr+fFrwC0Zr4SIiIiIuLYf8BbA+PHjO6+88sot2ajE9u3bS5577rnaV155paq\u002F2cJ+w4YNY+7cucyZM4e5c+cyc+ZMpk+fzsiRIzNVXcmi5uZm1qxZw1tvvcXLL7\u002FMihUrWLlyJXV1dXvdb\u002Fjw4d2zZ89umzdvXvPUqVM7M1TdXm6\u002F\u002FfbRL7\u002F8ck3Pj58A\u002FpKNeoiISOFTMFhERArNEuAogP\u002F+7\u002F\u002FeOmXKlKw06hKampqKV65cWfn6669Xrl27tqKpqSlQdLq2tpbp06czffp09t133+T76dOns88++4RdbXGotbWVNWvW9PvasmXLe9I996ekpCQ+adKkjpkzZ0YOOuigtqlTp3ZmIwDsd8MNN4xbu3ZtIjX6UcAL2ayPiIiIiDizDRjneR4333zzxqqqqoxln+nPrv\u002Ff3r3FxnHdZwD\u002FzszsndwLr8u7KFGJaSmWXDVpKqdGCidF27jNQ+u85KEvbVG4D07Rh\u002FilFwQpigAt+tI3F3VstHBgtAFqO3ai1LER2JKlJpKo0JJ405XkXrgkd5fcmb3MpQ8zs1peRVIil1x+P+BgZoc7O2cBAdrv\u002FOecmZ9Xrl69Grh+\u002FXrg9u3bvkKhsKVMFYvFVuSooaEhHD9+HENDQ2hvb9\u002FtbtNjlMvl1mSpiYkJTE5OIpVKbekzvF6vOTAwUBoeHi6eOnVK7e3trexytx\u002Fq29\u002F+dm82m1Wcl10ANq9gExER7RCLwURE1Gj+CcBfA8ALL7yw8NWvfnWpzv1ZYW5uThkbG\u002FPdunXLd+\u002FePW8ikfBWKpVt\u002FX8cDAZx9OhR9PT0oLOzE11dXejq6kJnZye6u7vR0dGBnp4ePktrl1UqFaTTaczOziKZTCKZTCKRSCCVSmFmZgbpdBp37txBIrG91cqFEIjFYnpvb295cHCwdPz48dLRo0fLiqLs2XJlD2MYBl566aX+crksAGgAogDqeuMFERERET02P4Q9SxEvvvhi+vTp01qd+7PCzMyMZ3Jy0jc5Oembnp72JpNJj2EY28pU4XAYg4OD6OnpqeYnN1vF43HE43F0d3cjGAzu1tcg2M\u002Fxrc1Ps7OzSKVSSCQSSCQSSCaTuHPnDubm5rb1uZIkobW1tdLX11c+evRo6fjx46X+\u002Fv5yPVYO28jCwoL88ssv9zovpwAM1bM\u002FRETU2JSHv4WIiOhA+QhOMfjmzZv+r3zlK+s\u002FaLVO2trajLa2NvWZZ55RAcA0TczOznru3bvnmZ6e9qbTaWVubs4zPz+vbFQkVlUVo6OjGB0d3fRawWCwOpjR0dGBlpYWRKPRh7ampqZNP7fR6LqObDaLbDaLxcXFdffdNj8\u002Fj9nZWaTTaaTT6Ue6rhACkUhEb2tr0zs6OvSurq5Kf39\u002Fub+\u002Fv7Le7AvLsvbNTXzj4+M+pxAMAP8HFoKJiIiIGslHcIrBN27c8J86dWr9B63WSXd3t97d3a0\u002F++yzBQDQdV1MT0977t+\u002F75mZmfGk02nP3NycsrCwoOi6vu5v6Hw+j5GREYyMjGx6raampmrBuLOzE7FYbEuZ6rAVkUul0prsVNtqs9Xc3Fz1ZtqFhYVHuq4kSYjFYnpbW5ve3t5e6e7urgwMDJT7+\u002FsrXq939c20YiurMu2V0dHRQM3Lj+rWESIiOhRYDCYiokbzM9iFKe\u002F4+HhA13VpP82oXE2SJPT29uq9vb067BmWVYuLi3IymVRSqZQyNzenzM3NKZlMxjM3N6fUFOI2pKoqpqamMDU1ta0+KYqCaDSKcDiM5uZmKIqCSCTiBm1IkoRIJAKPx4Ompib4fD4Eg0EEAgH4\u002FX7IsoxwOLzmc5uamuDxeNZca\u002FUM5kqlguXltTX8fD4PwzBWHCuXyygUCrAsC9lsFoZhIJ\u002FPVz+jVCpBVVVomoZisYhCoYByuYx8Pg9N05DNZte91uMiSRKi0ag7OKG3t7frHR0dejwe1zs6OnSPx7PRv819U\u002Fhdz69+9avagYsf160jRERERLQbfgLgnwHg008\u002FDQDI1bc7m1MUBUeOHKkcOXJkxbK\u002FlmUhk8koqVRKSafTSjqdVjKZjJJOp5X5+fkNC8W1lpeXMTY2hrGxsW31yefzIRqNIhQKrchSblbaKEuFQiF4vV54vV6EQqE1n+t+1uprrS4+uzlotWw2u+YxNW5W2k6WMgwD2WwWqqoim81C03Zv8rgsy1YsFjPcTNXZ2Vnp6OjQOzs79ba2NmOTvL+vM9WqYjAzFRER7SoWg4mIqNHkAZwH8OVSqSTGxsZ8J06cKNW7UzsRi8XMWCxWHh4eXjPrMp\u002FPS7lcTl5cXJTd\u002FVwuV91fWlqS8\u002Fm8XCqVth2AdV1HJpNBJpN5PF+kAcmybIVCITMajRpNTU1mOBw2otGo0dzcbMZiMSMcDhstLS1GJBIxH3Izwr4eoNjI9evXawcu3q1bR4iIiIhoN3wK4C6AgXQ67Umn056Ojg693p3aLiEE2tvbjfb2dgPAikzo3Ewq5\u002FN5yclUcjablZaWlqq5Kp\u002FPy\u002Fl8Xt7uY32AB8sf08YURbGamprMSCRiNDc3V\u002FNUNBo1wuGwEYlEzFgsZkSjUWN1AXyVA5epTNPE+Pi433lpAPhpPftDRESNj8VgIiJqRO8B+DJg32174sSJyuZvP3jC4TDC4bDR19dnbPa+UqkkFhcX5aWlJUlVVaGqqqSqqqRp2op9TdOkYrEonNdSsVgUW7lT\u002FqALBAKm3++3gsGg6ff7zUAgYAWDwdqtGQwGrWAwaAaDQdMp\u002FJqRSGTNMs4bEDiAgxObWVhYkBOJhDvFOwHgWj37Q0RERES74j0AfwHYq8I899xzhTr357ESQiAWi1mxWMwYGBjYNFMVi0WxsLAgLy8vS4VCoTZLCU3TJFVVV2QpVVVFsViUisWi2O6zjA8aIcRmmcoMBoOWs63mKqcAbDY3N281U21aCT6IJiYmvKqqut\u002FrAoD5evaHiIgaH4vBRETUiH4E4HsAcO3aNf83vvGNJSEaOoNvyOfzIR6PG\u002FF4fNMBjvXoui5KpZIol8uiUqmgVCqJSqUiisWiME1TaJomDMMQmqYJ0zRRLBYlXdexejZysViUTHNlznffv9n1FUWx1nnOEwKBgCWEqB6XJAmBQMCSZdny+XyWx+OxvF6v5fF4LI\u002FHA7\u002Ffb0qShFAoZAkhrFAoZEmSZAUCgUdZPvxw\u002FoMCcPnyZX\u002FN0nI\u002FArBvl2EnIiIioh17F04xeGRkxP\u002Fcc8+tXXP4kPD7\u002Feju7jZgz+DcFidLiVKpJHRdr2YmTdMky7KgqqowDEO4hePa\u002FFXLfX8t9\u002F2bXd\u002FJRGt+rweDwRUBTZZl+P1+N0NV85Tf77ecvOVmKlMIgWAwaCmKYvl8PmaqHbhy5UrtSkvv1a0jRER0aLAYTEREjehTAGMAPpvJZJTJyUnv0NBQw80O3m2yLMO5e7shi32WZR3awYdHcfHixdoHkv2wbh0hIiIiot30v7AfwROemJjwzc\u002FPKy0tLdsuhh52Ho8HHo+nNlNtdTbsgcBMtX2maeKXv\u002FxlbTGYmYqIiHYdi8FERNSoXgfwDwBw\u002Fvz54PHjx\u002FN17g\u002FRgTczM6Pcu3fPXSI6BT7bioiIiKhRaQDeBPCnpmnik08+CXzta19rqKWiiephdHTUl8\u002Fn3VWyLgK4Wc\u002F+EBHR4dBwz1wgIiJyvA7nruvLly\u002F7y+WyhAfPb2VjY9tBO3\u002F+fO0d7K8D0EFEREREjeo1d+fixYt+ZxYoGxvbI7RVmeo1EBER7QEWg4mIqFFNw17aDMViUXzwwQcB7IPgx8Z2UFuhUJA+\u002FvhjDlwQERERHR4fA5gEgFQqpVy5csWPffC7lI3toLZkMqlcu3bNB1sJwA9ARES0B1gMJiKiRvYv7s65c+eCxWKRs4PZ2HbYzp07F9Q0TcD2Y9jP5iYiIiKixmWhJlO99dZbQc4OZmPbeXv77bdDpll9bPS\u002FA1gEERHRHmAxmIiIGtmPYd\u002FNjuXlZen999\u002Fn7GA2th20XC4nf\u002Fjhh7Wzgv8eRERERHQY\u002FBuAuwCQSCSUS5cucXYwG9sO2vT0tHL58uXaWcH\u002FCCIioj3CYjARETW6v3V33n333cC9e\u002FcU7IMgyMZ2UJplWeK1115rKhaLArZ3AFwEERERER0GZQDfdV+8+eabwWw2K2Mf\u002FE5lYzsorVKpSK+++mpTzazgVwDcBxER0R4R9e4AERHRHvgvAH8EANFo1PzWt7613NXVZdS5T0T7nmmaeOONN4I\u002F\u002F\u002FnP3TvYNQBPAxirY7eIiIiIaG8pAM4D+DwA9PT0GC+99NJyJBIxNz+NiMrlsnjllVdC165d8ziHUgBOAsjUsVtERHTIsBhMRESHQRuASwAGAcDv91svvPCC9qUvfaksBP8rJFpPKpWSXn\u002F99eDExIRSc\u002FjPYC8VSERERESHy2cAfAIgBgCRSMT85je\u002FqZ0+fbpS324R7V+3b9+Wv\u002F\u002F97wcTiYTsHNIBPA\u002FgJ3XsFhERHUIcASciosPiCQDnAPS5B7q6uoznn3++dObMmQqLwkS2TCYjvfPOO75Lly55DWPFBPq\u002FA\u002FCdOnWLiIiIiOrvtwC8BSDqHhgcHDS+\u002FvWvF4eHh\u002FX6dYtof5menpbffvtt38jIiMeyLPewDuDPAbxav54REdFhxZFvIiI6TLoB\u002FAeA3649GI\u002FHzbNnz5a\u002F+MUvViKRiLX+qUSNyzRNjI6OKhcuXPCMjIx4VhWBswBeBPBGfXpHRERERPvIMOzfhadqDw4MDBhnz56tfOELX6gEg0FmKjp0KpUKrl696rlw4YLn+vXrSk0RGABmAPwJgPfr0zsiIjrsWAwmIqI2VBGJAAAIPklEQVTDRsAOYX8D4GjtHyRJwvDwsHHmzBn9c5\u002F7nB4OhzmIQQ3LMAxMTEzIIyMjyi9+8Qsln8+v\u002Fl1YgX3X+ndgD14QEREREQGAF8BfAngZQEftHzweD5566in96aef1p988kkjFAoxU1HDqlQquHnzpnzlyhXl8uXLiqZpqzNVAcC\u002FAvgegMW97yEREZGNxWAiIjqsPLCLwi8DOLb6j0II9Pb2midOnDBOnjxpHDlyxPB4PHveSaLHKZPJiJs3b8qjo6PyzZs35XUGKwCgBOA\u002FAXwXwO297SERERERHSAh2EXhvwIQX\u002F1HSZIwODhonDx50njyySeNvr4+U5blNR9CdFBYloVkMinduHFDHh0dlcfHx+VKZd3HZi8BeAV2ETi9p50kIiJaB4vBRER02AkAz8IuDP8xgOb13qQoCvr7+82jR48aQ0ND5rFjx0zOHKb9zDAM3L17V5qampKmpqbkW7duSblcbrPffp8AeB3AD8C71omIiIho6xQAvws7U\u002F0BAN96b\u002FL5fBgYGDCOHTtmuo1LStN+Vi6XcffuXWlyclKempqSbt26JRUKhY0ylQngZ7Az1X8DUPeso0RERA\u002FBYjAREdEDIQC\u002F77TfA9C52Zuj0ajV29tr9vT0WH19fWZ\u002Ff7\u002FZ3t5uCcH\u002FXmlvqaoq7t+\u002FL+7fvy9NT09L09PTIpFISKue\u002FbuaDuAjAO8B+B8AY3vRVyIiIiJqaDEAfwg7U\u002F0OgOhmb25tbbX6+vrMnp4es6+vz+rv7zdbWlpYIKY9t7S0VM1Ubq5Kp9PCNM3NTtMAfAjgXdiZ6v4edJWIiGjbOFpNRES0PgHgDOyi8LMAfgMbzBqu5fV60dHRYXZ2dlrxeNyKx+NWZ2en1dXVZXq93l3uMjUyy7IwPz8vUqmUSCaTIpFISKlUSqRSKfGQGb\u002FVjwBwA8DHAM4B+CmA3G72mYiIiIgONQXAWdizhn8LwK8D8D\u002FsJL\u002Ffj87OzmqmcrZmPB63FEXZ5S5TIzNNE5lMRszOzopUKiW52SqVSonl5eWtZCodwDXYmeonAD4AZwATEdEBwGIwERHR1sgAngLwDIDfBPB52M8alrb6Ac3NzVZra6vV2tqK9vZ2q7W11Wpra7NaWlqsWCxm+XzrrqZGh4Rpmsjn82JxcRGZTEZkMhkxPz9f3S4sLAhd17fzkYsArgI4D+CCs+Xyz0RERERUL17YN9yehZ2rfg3AwFZPFkIgHA5bbW1tVltbm9Xa2orW1larvb3damlpsaLRqOXxeHap63QQ6LqOfD4vFhYWxPz8fDVXuZlqcXHxYTN9V0sDuAw7T30M4CKA5V3oOhER0a5iMZiIiGjnmgCcctpppz2BLcwgXo\u002FX60UkErHC4TAikYhVux8OhxGNRq1wOIxwOMylqA+QUqmExcVFkc\u002FnkcvlRC6Xq+7n83lks1mxtLSE5eVlYVk7WhHPAHAX9h3qV502AuDOY\u002FsSRERERES7I4YHWeo07Btwn8AWZhCvx+\u002F3IxKJWM3NzW5+siKRCNytm63C4TCXoj5AVFV185PIZrPI5\u002FMil8uhNlstLS2J5eUd12krAG7BzlFXa1ri8XwDIiKi+uJIMhER0ePXC+CzTht2tkMA+mAvlfZIJElCc3MzwuGw1dzcjEAgYAWDQTjNCgQC1f3Vx7ms2s5pmoZCoSA0TYOqqlBVtbqvaZpwjkFVVRQKBbG0tIRsNivK5fLj6sI87AGKcdjLPY85bRxA6XFdhIiIiIioziTYM4Y\u002FC7sw\u002FASAzwA4DqAb21idaSOKoqCpqcmKRqMIhULVvBQKhar5ynm9Jl9J0iNf\u002FlCyLGvdTOXkqWq+KhQK0DRNFAoF5HI55PN5UalUHlc3UrAz1Q3YOWrM2b8FuyBMRETUkFgMJiIi2jsK7ILwEQCDTjsCoB9AB4Ae7HBW8VZ5vV44gxlWIBCA3++H3++HLMvw+XyW1+uFx+OBu\u002FX5fJBlGX6\u002F35IkCYFAAKu3siyvu8S1e+5u0TQNq2fSGoaBUqkkdF1HqVRCpVJBpVJBuVyGc0wYhlE9t1AowLIsqKoK0zRRLBaFrusoFovQNK06KKGqu\u002F4YqArsJchmASQB3K5pd5xtfrc7QURERES0z3lhF4pr89Qg7CwVh10sDu5mB3w+H5xisRUMBuHz+eDz+aAoCrxer+XuuznL7\u002Fe72WlFpqr9u6IoltfrXXMt99zdsl7O0XUd5XJZuDmqJkvByVKiNkNpmlbd6rouyuUyKpVKNVO5RV5N03btezhKsIu9M3iQqe7gQa66BWDXO0FERLQfsRhMRES0vwQBdDkt7mw7YQ9uuAXjTmf\u002FwN2SLoRAIBBYc9zr9UJRlM0GI\u002Faie7uhAGAaKwu9SWc\u002F5WzTzj4RERERET26JtirNXXALg53Ots4HhSMO5x24Dg38q457vP5IEnSukVX9ybZAyoLe7lmt9CbdrYp53jS2S7Uq4NERET7HYvBREREB5MMe1CjFUB0Gy3mbPkbYOsKsAcg1mu5Va8Xa7ZJ51wiIiIiItp\u002FvLALwm2wM1IE28tWtHVL2DhTbdTmYRd8i3XoLxERUUPhQDAREdHhVDvQoTiv5ZrXzbAHR0IAAgD8zr4XQLjmvbJzbq1mrH02suyct1oQwNrb2u1i6molAOut15wHYNS8LsJe\u002Fkt1zlkCoMMu3BqwBxZ053gZdsFWc84rOMfyeDAIcWBvoSciIiIiol3j3mjr5iJ3G8aDLOWHnafcLOVmpSjslZ5q81etCNauBOWBPet5tSbnb7VM2PlnNTf3rJYFUPsMns2ylAE7L7lZys1fbpZyz6kt7NbmNSIiItpj\u002Fw9sAYJ0quYP8wAAAABJRU5ErkJggg=="
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"n08_pause.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "n08_pause.png": "embedded\u002F7bead0ebaf47ce67dc85f7e3a72f42260fb6436d92be3ddd772339b25a3ae219.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_3",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===3)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 412.13,
                    "height": 111.37,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Wir bitten Sie alle möglichen Ablenkungen\nund Hintergrundgeräusche, wie z.B. Ihr \nHandy oder Mailprogramm, stumm- bzw. \nauszuschalten.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"01_grid.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": 0,
                    "top": 250,
                    "angle": 0,
                    "width": 307.68,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"vor_zurueck.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "01_grid.png": "embedded\u002Fcf05bf8271b02e524d1b4eeebe3cf6e1ccd74b0475f5c5e654f411d7cb041bef.png",
                  "zurueck.png": "embedded\u002F0ee47810b2f1b80b6987a92ea5a086c4cb8aa31e16642141e807ef038ddb048c.png",
                  "start_leerstaste.png": "embedded\u002F6625f6ea5fd55ada018b08a52434c564a1dfd937ebcb4e86e079b8f11bb80790.png",
                  "vor_zurueck.png": "embedded\u002F7f9db4c4c11ac4bbcbe1d26166835219aeb99dc33a7732a4c3387dd6637a7078.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(b)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrSite[0]++;
      break
}

this.state.response = undefined;
}
                },
                "title": "Screen_4",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===4)) }"
              },
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 0,
                    "angle": 0,
                    "width": 463.51,
                    "height": 313.24,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Zu Beginn haben Sie die Möglichkeit die \nAufgabe über zwei Abschnitte mit je \n20 Blöcken zu trainieren.\n\nDas Zeitlimit während des Trainings beträgt \nhier 10 Sekunden.\n\nDer Gewinn, den Sie im Training erzielen, \nwird nicht zu Ihrem Eurobonus hinzugezählt. \n\nSie können sich also ohne Risiko ausprobieren.",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "22",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "left"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 0,
                    "angle": 0,
                    "width": 350,
                    "height": 250,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"01_grid.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": -200,
                    "top": 250,
                    "angle": 0,
                    "width": 113.05000000000001,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"zurueck.png\"] }"
                  },
                  {
                    "type": "image",
                    "left": 113,
                    "top": 250,
                    "angle": 0,
                    "width": 369.75,
                    "height": 36.720000000000006,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"start_leerstaste.png\"] }"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "01_grid.png": "embedded\u002Fcf05bf8271b02e524d1b4eeebe3cf6e1ccd74b0475f5c5e654f411d7cb041bef.png",
                  "zurueck.png": "embedded\u002F0ee47810b2f1b80b6987a92ea5a086c4cb8aa31e16642141e807ef038ddb048c.png",
                  "start_leerstaste.png": "embedded\u002F6625f6ea5fd55ada018b08a52434c564a1dfd937ebcb4e86e079b8f11bb80790.png"
                },
                "responses": {
                  "keypress(c)": "back",
                  "keypress(Space)": "cont"
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
switch(this.state.response) {
    case 'back':
      instrSite[0]--;
      break
    case 'cont':
      instrEnd[0] = true;
      break
}

this.state.response = undefined;

}
                },
                "title": "Screen_5",
                "tardy": true,
                "skip": "${ (!(instrSite[0]===5)) }"
              }
            ]
          }
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "blockN_Train": 0
            },
            {
              "blockN_Train": 1
            }
          ],
          "sample": {
            "mode": "sequential"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
bonusVecTrain = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,1,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0]];
}
          },
          "title": "Loop_Training",
          "tardy": true,
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Sequence",
            "content": [
              {
                "type": "lab.flow.Sequence",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {
                  "before:prepare": function anonymous(
) {
// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25];
pacPosIdx =  [2, 2];
invalidMoveTxt = [''];
}
                },
                "title": "Training",
                "tardy": true,
                "content": [
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "i-text",
                        "left": 0,
                        "top": 0,
                        "angle": 0,
                        "width": 807.8,
                        "height": 361.96,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Als nächstes können Sie zwei Abschnitte mit je 20 Blöcken üben.\n\nDie Standardzugfolge und die Anordnung der Punkte ändert sich\ninnerhalb eines Abschnittes nicht.\n\nDer gesammelte Gewinn zählt nicht zu ihrem Eurobonus.\n\nSie haben für jeden Block jeweils 10 Sekunden Zeit.\n\nIm ersten Abschnitt ist KEIN Bonus möglich.",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "28",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -125,
                        "top": 250,
                        "angle": 0,
                        "width": 119.13,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Start mit",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": 0,
                        "top": -250,
                        "angle": 0,
                        "width": 178.79,
                        "height": 56.5,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Training",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "50",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "image",
                        "left": 75,
                        "top": 250,
                        "angle": 0,
                        "width": 245.48000000000002,
                        "height": 40.120000000000005,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "black",
                        "src": "${ this.files[\"leerstaste.png\"] }"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "leerstaste.png": "embedded\u002Fe6242b1a9f3b6301219f0d59967e92038a592b74996f03f76f304976c6c8ade7.png"
                    },
                    "responses": {
                      "keypress(Space)": "cont"
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Reminder",
                    "tardy": true,
                    "skip": "${ this.parameters.blockN_Train===1}"
                  },
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "i-text",
                        "left": 0,
                        "top": -100,
                        "angle": 0,
                        "width": 365,
                        "height": 56.5,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Training - Pause",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "50",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -125,
                        "top": 250,
                        "angle": 0,
                        "width": 143.42,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Weiter mit",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": 0,
                        "top": 25,
                        "angle": 0,
                        "width": 529.27,
                        "height": 45.2,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Spielfeld wird neu angeordnet",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "40",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "image",
                        "left": 75,
                        "top": 250,
                        "angle": 0,
                        "width": 245.48000000000002,
                        "height": 40.120000000000005,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "black",
                        "src": "${ this.files[\"leerstaste.png\"] }"
                      },
                      {
                        "type": "i-text",
                        "left": 0,
                        "top": 100,
                        "angle": 0,
                        "width": 729.25,
                        "height": 45.2,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Im nächsten Abschnitt ist Bonus möglich.",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "40",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "leerstaste.png": "embedded\u002Fe6242b1a9f3b6301219f0d59967e92038a592b74996f03f76f304976c6c8ade7.png"
                    },
                    "responses": {
                      "keypress(Space)": "continue"
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "Break",
                    "skip": "${ this.parameters.blockN_Train===0}"
                  },
                  {
                    "type": "lab.flow.Loop",
                    "templateParameters": [
                      {
                        "trialN": 0
                      },
                      {
                        "trialN": 1
                      },
                      {
                        "trialN": 2
                      },
                      {
                        "trialN": 3
                      },
                      {
                        "trialN": 4
                      },
                      {
                        "trialN": 5
                      },
                      {
                        "trialN": 6
                      },
                      {
                        "trialN": 7
                      },
                      {
                        "trialN": 8
                      },
                      {
                        "trialN": 9
                      },
                      {
                        "trialN": 10
                      },
                      {
                        "trialN": 11
                      },
                      {
                        "trialN": 12
                      },
                      {
                        "trialN": 13
                      },
                      {
                        "trialN": 14
                      },
                      {
                        "trialN": 15
                      },
                      {
                        "trialN": 16
                      },
                      {
                        "trialN": 17
                      },
                      {
                        "trialN": 18
                      },
                      {
                        "trialN": 19
                      }
                    ],
                    "sample": {
                      "mode": "sequential"
                    },
                    "files": {
                      "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png",
                      "points.csv": "embedded\u002F5d04a261732bd409afa82cf09b2614f9431f20469e61004fd4f3573cfebe1b0b.csv"
                    },
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {
                      "before:prepare": function anonymous(
) {
// define parameters of the different blocks
goalsVec = [0,10,20,30,40,50,60,70,60,50,40,30,20,10,0,-10,-20,-30,-40,-50];

// grid for this training section
pointsVec = [-30,  40,  10,  50,  50,
 -20, -10,  20, -30,  30,
  50, -10,   0,  20,  60,
 -10, -10, -10, -50,  50,
  50,  60, -50, -30,  30];
  
// get the noise
blNoise = new Array(nTrials);
blNoise = blockNoise[8].map(x=>pointsNoiseM[x]);

// add the points of the fields to the noise
pointsNoise = Array(nTrials);

for(let t=0; t<nTrials; t++) {
  pointsNoise[t] = blNoise[t].map(function (num, idx) {
    return num + pointsVec[idx] });
}
}
                    },
                    "title": "Block",
                    "tardy": true,
                    "shuffleGroups": [],
                    "template": {
                      "type": "lab.flow.Sequence",
                      "files": {},
                      "responses": {},
                      "parameters": {},
                      "messageHandlers": {
                        "before:prepare": function anonymous(
) {
// counter for moves
moveCount = [0]
invalidMoveTxt = ['']
pointColor = ['white']
currPP = [13]
timeoutText = ['']


// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25]
pacPosIdx =  [2, 2]

// preallocation moves
movesTrial = []

// starting configuration of progress bar
boxColors = ['black', 'white', 'white', 'white']

// preallocation of point vector for current trial
points = [0, -999, -999, -999, -999]

// colors of grid circles
colors = []

for(x=0;x<25;x++) {
  colors.push(colorM[pointsVec[x]/10+6])
}

colors[12] = 'white'

}
                      },
                      "title": "Trial",
                      "tardy": true,
                      "content": [
                        {
                          "type": "lab.canvas.Screen",
                          "content": [
                            {
                              "type": "rect",
                              "left": 25,
                              "top": -25,
                              "angle": 0,
                              "width": 95,
                              "height": 95,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#aaaaaa"
                            },
                            {
                              "type": "rect",
                              "left": -75,
                              "top": -25,
                              "angle": 0,
                              "width": 95,
                              "height": 95,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#aaaaaa"
                            },
                            {
                              "type": "rect",
                              "left": 25,
                              "top": 75,
                              "angle": 0,
                              "width": 95,
                              "height": 95,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#aaaaaa"
                            },
                            {
                              "type": "rect",
                              "left": 25,
                              "top": -125,
                              "angle": 0,
                              "width": 95,
                              "height": 95,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#aaaaaa"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": 25,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": -175,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": -75,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": 225,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": 125,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": -275,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": -125,
                              "top": -25.5,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 375,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 275,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 175,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 75,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": -25,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "i-text",
                              "left": -250,
                              "top": -250,
                              "angle": 0,
                              "width": 519.37,
                              "height": 36.16,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "black",
                              "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                              "fontStyle": "normal",
                              "fontWeight": "normal",
                              "fontSize": 32,
                              "fontFamily": "sans-serif",
                              "lineHeight": 1.16,
                              "textAlign": "center"
                            },
                            {
                              "type": "i-text",
                              "left": 125,
                              "top": -25,
                              "angle": 0,
                              "width": 55.62,
                              "height": 56.5,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ bonusColors[this.parameters.blockN_Train] }",
                              "text": "20",
                              "fontStyle": "normal",
                              "fontWeight": "normal",
                              "fontSize": "50",
                              "fontFamily": "sans-serif",
                              "lineHeight": 1.16,
                              "textAlign": "center"
                            }
                          ],
                          "viewport": [
                            800,
                            600
                          ],
                          "files": {
                            "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                          },
                          "responses": {},
                          "parameters": {},
                          "messageHandlers": {},
                          "title": "Goal",
                          "timeout": "1000",
                          "tardy": true,
                          "skip": "${ (moveCount\u003E=4) }",
                          "plugins": []
                        },
                        {
                          "type": "lab.flow.Loop",
                          "templateParameters": [
                            {
                              "move": 1
                            },
                            {
                              "move": 2
                            },
                            {
                              "move": 3
                            },
                            {
                              "move": 4
                            },
                            {
                              "move": 5
                            },
                            {
                              "move": 6
                            },
                            {
                              "move": 7
                            },
                            {
                              "move": 8
                            },
                            {
                              "move": 9
                            },
                            {
                              "move": 10
                            },
                            {
                              "move": 11
                            },
                            {
                              "move": 12
                            },
                            {
                              "move": 13
                            },
                            {
                              "move": 14
                            },
                            {
                              "move": 15
                            }
                          ],
                          "sample": {
                            "mode": "sequential"
                          },
                          "files": {},
                          "responses": {
                            "": ""
                          },
                          "parameters": {},
                          "messageHandlers": {},
                          "title": "Loop",
                          "timeout": "10000",
                          "tardy": true,
                          "shuffleGroups": [],
                          "template": {
                            "type": "lab.canvas.Screen",
                            "content": [
                              {
                                "type": "rect",
                                "left": -75,
                                "top": -25,
                                "angle": 0,
                                "width": 95,
                                "height": 95,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "#aaaaaa"
                              },
                              {
                                "type": "rect",
                                "left": 25,
                                "top": -25,
                                "angle": 0,
                                "width": 95,
                                "height": 95,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "#aaaaaa"
                              },
                              {
                                "type": "circle",
                                "left": 125,
                                "top": -225,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 0,
                                "fill": "${ colors[2] }"
                              },
                              {
                                "type": "circle",
                                "left": 225,
                                "top": -225,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": "#ffffff",
                                "strokeWidth": 0,
                                "fill": "${ colors[3] }"
                              },
                              {
                                "type": "circle",
                                "left": 325,
                                "top": -225,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[4] }"
                              },
                              {
                                "type": "circle",
                                "left": -75,
                                "top": -25,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[10] }"
                              },
                              {
                                "type": "rect",
                                "left": 25,
                                "top": -125,
                                "angle": 0,
                                "width": 95,
                                "height": 95,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "#aaaaaa"
                              },
                              {
                                "type": "circle",
                                "left": 225,
                                "top": -125,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[8] }"
                              },
                              {
                                "type": "circle",
                                "left": 325,
                                "top": -125,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[9] }"
                              },
                              {
                                "type": "circle",
                                "left": 125,
                                "top": -125,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[7] }"
                              },
                              {
                                "type": "circle",
                                "left": 25,
                                "top": -125,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[6] }"
                              },
                              {
                                "type": "rect",
                                "left": 25,
                                "top": 75,
                                "angle": 0,
                                "width": 95,
                                "height": 95,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "#aaaaaa"
                              },
                              {
                                "type": "circle",
                                "left": -75,
                                "top": -125,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[5] }"
                              },
                              {
                                "type": "circle",
                                "left": -75,
                                "top": -225,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[0] }"
                              },
                              {
                                "type": "circle",
                                "left": 25,
                                "top": -225,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[1] }"
                              },
                              {
                                "type": "circle",
                                "left": 25,
                                "top": -25,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[11] }"
                              },
                              {
                                "type": "circle",
                                "left": 125,
                                "top": -25,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[12] }"
                              },
                              {
                                "type": "circle",
                                "left": 225,
                                "top": 175,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[23] }"
                              },
                              {
                                "type": "circle",
                                "left": 225,
                                "top": 75,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[18] }"
                              },
                              {
                                "type": "circle",
                                "left": 225,
                                "top": -25,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[13] }"
                              },
                              {
                                "type": "circle",
                                "left": 125,
                                "top": 175,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[22] }"
                              },
                              {
                                "type": "circle",
                                "left": 25,
                                "top": 175,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[21] }"
                              },
                              {
                                "type": "circle",
                                "left": -75,
                                "top": 175,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[20] }"
                              },
                              {
                                "type": "circle",
                                "left": 325,
                                "top": 75,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[19] }"
                              },
                              {
                                "type": "circle",
                                "left": 125,
                                "top": 75,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[17] }"
                              },
                              {
                                "type": "circle",
                                "left": 25,
                                "top": 75,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[16] }"
                              },
                              {
                                "type": "circle",
                                "left": -75,
                                "top": 75,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[15] }"
                              },
                              {
                                "type": "circle",
                                "left": 325,
                                "top": -25,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[14] }"
                              },
                              {
                                "type": "line",
                                "left": 125,
                                "top": 25,
                                "angle": 0,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": 125,
                                "top": -175,
                                "angle": 0,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": 125,
                                "top": -75,
                                "angle": 0,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": 125,
                                "top": 225,
                                "angle": 0,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": 125,
                                "top": 125,
                                "angle": 0,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": 125,
                                "top": -275,
                                "angle": 0,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": -125,
                                "top": -25.5,
                                "angle": 90,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": 375,
                                "top": -25,
                                "angle": 90,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": 275,
                                "top": -25,
                                "angle": 90,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": 175,
                                "top": -25,
                                "angle": 90,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": 75,
                                "top": -25,
                                "angle": 90,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "line",
                                "left": -25,
                                "top": -25,
                                "angle": 90,
                                "width": 500,
                                "height": 0,
                                "stroke": "black",
                                "strokeWidth": 1,
                                "fill": "rgb(0,0,0)"
                              },
                              {
                                "type": "circle",
                                "left": 325,
                                "top": 175,
                                "angle": 0,
                                "width": 90,
                                "height": 90,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ colors[24] }"
                              },
                              {
                                "type": "i-text",
                                "left": -250,
                                "top": -250,
                                "angle": 0,
                                "width": 519.37,
                                "height": 36.16,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "black",
                                "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                                "fontStyle": "normal",
                                "fontWeight": "normal",
                                "fontSize": 32,
                                "fontFamily": "sans-serif",
                                "lineHeight": 1.16,
                                "textAlign": "center"
                              },
                              {
                                "type": "i-text",
                                "left": -250,
                                "top": -100,
                                "angle": 0,
                                "width": 476.76,
                                "height": 36.16,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "black",
                                "text": "Punkte: ${ points[moveCount[0]] }",
                                "fontStyle": "normal",
                                "fontWeight": "normal",
                                "fontSize": 32,
                                "fontFamily": "sans-serif",
                                "lineHeight": 1.16,
                                "textAlign": "center"
                              },
                              {
                                "type": "rect",
                                "left": -363,
                                "top": 175,
                                "angle": 0,
                                "width": 60,
                                "height": 60,
                                "stroke": "#000000",
                                "strokeWidth": 5,
                                "fill": "${ boxColors[1] }"
                              },
                              {
                                "type": "rect",
                                "left": -450,
                                "top": 175,
                                "angle": 0,
                                "width": 60,
                                "height": 60,
                                "stroke": "#000000",
                                "strokeWidth": 5,
                                "fill": "${ boxColors[0] }"
                              },
                              {
                                "type": "rect",
                                "left": -275,
                                "top": 175,
                                "angle": 0,
                                "width": 60,
                                "height": 60,
                                "stroke": "#000000",
                                "strokeWidth": 5,
                                "fill": "${ boxColors[2] }"
                              },
                              {
                                "type": "rect",
                                "left": -187,
                                "top": 175,
                                "angle": 0,
                                "width": 60,
                                "height": 60,
                                "stroke": "#000000",
                                "strokeWidth": 5,
                                "fill": "${ boxColors[3] }"
                              },
                              {
                                "type": "i-text",
                                "left": -250,
                                "top": -25,
                                "angle": 0,
                                "width": 297.05,
                                "height": 36.16,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "#ff0000",
                                "text": "${ invalidMoveTxt[0]}",
                                "fontStyle": "normal",
                                "fontWeight": "normal",
                                "fontSize": 32,
                                "fontFamily": "sans-serif",
                                "lineHeight": 1.16,
                                "textAlign": "center"
                              },
                              {
                                "type": "i-text",
                                "left": 125,
                                "top": -25,
                                "angle": 0,
                                "width": 942.08,
                                "height": 56.5,
                                "stroke": null,
                                "strokeWidth": 1,
                                "fill": "${ pointColor[0] }",
                                "text": "${ pointsNoise[parameters.trialN][currPP] }",
                                "fontStyle": "normal",
                                "fontWeight": "normal",
                                "fontSize": "50",
                                "fontFamily": "sans-serif",
                                "lineHeight": 1.16,
                                "textAlign": "center"
                              },
                              {
                                "type": "image",
                                "left": "${ pacPosXY[0] }",
                                "top": "${ pacPosXY[1] }",
                                "angle": 0,
                                "width": 88.67999999999999,
                                "height": 88.67999999999999,
                                "stroke": null,
                                "strokeWidth": 0,
                                "fill": "black",
                                "src": "${ this.files[\"pacman.png\"] }"
                              }
                            ],
                            "viewport": [
                              800,
                              600
                            ],
                            "files": {
                              "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                            },
                            "responses": {
                              "keypress(c)": "left",
                              "keypress(v)": "down",
                              "keypress(b)": "right"
                            },
                            "parameters": {},
                            "messageHandlers": {
                              "after:end": function anonymous(
) {
// get potential new pacman position idx
switch(this.state.response) {
    case 'left':
        pacPosIdx[0]--
        pacPosIdx[1]--
        break
    case 'down':
        pacPosIdx[0]++
        break
    case 'right':
        pacPosIdx[0]--
        pacPosIdx[1]++
        break
}

if((moveCount[0]<4) && (this.state.response!==-999)) {
  // check if Pacman is still inside the grid and not in the middle
  if((pacPosIdx.some(x => x<0)) || (pacPosIdx.some(x => x>4)) || (pacPosIdx.every(x => x===2)))
  {
    invalidMoveTxt[0] = ['ungültiger Zug']

    // update position (back to initial position)
    switch(this.state.response) {
    case 'left':
        pacPosIdx[0]++
        pacPosIdx[1]++
        break
    case 'down':
        pacPosIdx[0]--
        break
    case 'right':
        pacPosIdx[0]++
        pacPosIdx[1]--
        break
      }
  }
  else {
    // update pacman position on grid
    switch(this.state.response) {
      case 'left':
          pacPosXY[0] -= 100;
          pacPosXY[1] -= 100;
          movesTrial.push(0);
          break
      case 'down':
          pacPosXY[1] += 100;
          movesTrial.push(1);
          break
      case 'right':
          pacPosXY[0] += 100;
          pacPosXY[1] -= 100;
          movesTrial.push(2);
          break
          }

      // get idx of Pacman
      currPP[0] = gridIdx[pacPosIdx[0]][pacPosIdx[1]]-1
      // hide chosen cell
      colors[currPP] = 'white'

      // update progress bar
      boxColors[moveCount[0]+1] = 'black'
      boxColors[moveCount[0]] = 'white'

      // update points
      points[moveCount[0]+1] = points[moveCount[0]]+pointsNoise[this.parameters.trialN][currPP]

      moveCount[0]++
      invalidMoveTxt[0] = ['']

      if(pointsNoise[this.parameters.trialN][currPP]>0) {
        pointColor[0] = ['green']
      }
      else {
        pointColor[0] = ['red']
      }
        
  }
  
}

this.state.response = -999;
}
                            },
                            "title": "Move",
                            "tardy": true,
                            "skip": "${ (moveCount\u003E=4) }",
                            "plugins": []
                          }
                        },
                        {
                          "type": "lab.canvas.Screen",
                          "content": [
                            {
                              "type": "rect",
                              "left": 25,
                              "top": -25,
                              "angle": 0,
                              "width": 95,
                              "height": 95,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#aaaaaa"
                            },
                            {
                              "type": "rect",
                              "left": 25,
                              "top": 75,
                              "angle": 0,
                              "width": 95,
                              "height": 95,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#aaaaaa"
                            },
                            {
                              "type": "rect",
                              "left": -75,
                              "top": -25,
                              "angle": 0,
                              "width": 95,
                              "height": 95,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#aaaaaa"
                            },
                            {
                              "type": "circle",
                              "left": 125,
                              "top": -225,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 0,
                              "fill": "${ colors[2] }"
                            },
                            {
                              "type": "circle",
                              "left": 225,
                              "top": -125,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[8] }"
                            },
                            {
                              "type": "circle",
                              "left": 225,
                              "top": -225,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[3] }"
                            },
                            {
                              "type": "circle",
                              "left": 325,
                              "top": -225,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[4] }"
                            },
                            {
                              "type": "circle",
                              "left": -75,
                              "top": -25,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[10] }"
                            },
                            {
                              "type": "rect",
                              "left": 25,
                              "top": -125,
                              "angle": 0,
                              "width": 95,
                              "height": 95,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#aaaaaa"
                            },
                            {
                              "type": "circle",
                              "left": 325,
                              "top": -125,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[9] }"
                            },
                            {
                              "type": "circle",
                              "left": 125,
                              "top": -125,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[7] }"
                            },
                            {
                              "type": "circle",
                              "left": -75,
                              "top": -225,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[0] }"
                            },
                            {
                              "type": "circle",
                              "left": 25,
                              "top": -125,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[6] }"
                            },
                            {
                              "type": "circle",
                              "left": -75,
                              "top": -125,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[5] }"
                            },
                            {
                              "type": "circle",
                              "left": 25,
                              "top": -225,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[1] }"
                            },
                            {
                              "type": "circle",
                              "left": 125,
                              "top": -25,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[12] }"
                            },
                            {
                              "type": "circle",
                              "left": 225,
                              "top": 175,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[23] }"
                            },
                            {
                              "type": "circle",
                              "left": 25,
                              "top": -25,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[11] }"
                            },
                            {
                              "type": "circle",
                              "left": 225,
                              "top": 75,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[18] }"
                            },
                            {
                              "type": "circle",
                              "left": 225,
                              "top": -25,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[13] }"
                            },
                            {
                              "type": "circle",
                              "left": 125,
                              "top": 175,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[22] }"
                            },
                            {
                              "type": "circle",
                              "left": 325,
                              "top": -25,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[14] }"
                            },
                            {
                              "type": "circle",
                              "left": 25,
                              "top": 175,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[21] }"
                            },
                            {
                              "type": "circle",
                              "left": -75,
                              "top": 175,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[20] }"
                            },
                            {
                              "type": "circle",
                              "left": 325,
                              "top": 75,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[19] }"
                            },
                            {
                              "type": "circle",
                              "left": 125,
                              "top": 75,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[17] }"
                            },
                            {
                              "type": "circle",
                              "left": 25,
                              "top": 75,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[16] }"
                            },
                            {
                              "type": "circle",
                              "left": -75,
                              "top": 75,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[15] }"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": 25,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": -175,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": -75,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": 225,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": 125,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 125,
                              "top": -275,
                              "angle": 0,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": -125,
                              "top": -25.5,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 375,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 275,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 175,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": 75,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "line",
                              "left": -25,
                              "top": -25,
                              "angle": 90,
                              "width": 500,
                              "height": 0,
                              "stroke": "black",
                              "strokeWidth": 1,
                              "fill": "rgb(0,0,0)"
                            },
                            {
                              "type": "circle",
                              "left": 325,
                              "top": 175,
                              "angle": 0,
                              "width": 90,
                              "height": 90,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ colors[24] }"
                            },
                            {
                              "type": "i-text",
                              "left": -250,
                              "top": -250,
                              "angle": 0,
                              "width": 519.37,
                              "height": 36.16,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "black",
                              "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                              "fontStyle": "normal",
                              "fontWeight": "normal",
                              "fontSize": 32,
                              "fontFamily": "sans-serif",
                              "lineHeight": 1.16,
                              "textAlign": "center"
                            },
                            {
                              "type": "i-text",
                              "left": -250,
                              "top": -100,
                              "angle": 0,
                              "width": 476.76,
                              "height": 36.16,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "black",
                              "text": "Punkte: ${ points[moveCount[0]] }",
                              "fontStyle": "normal",
                              "fontWeight": "normal",
                              "fontSize": 32,
                              "fontFamily": "sans-serif",
                              "lineHeight": 1.16,
                              "textAlign": "center"
                            },
                            {
                              "type": "i-text",
                              "left": -250,
                              "top": -25,
                              "angle": 0,
                              "width": 256.16,
                              "height": 36.16,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#ff0000",
                              "text": "${ timeoutText[0] }",
                              "fontStyle": "normal",
                              "fontWeight": "normal",
                              "fontSize": 32,
                              "fontFamily": "sans-serif",
                              "lineHeight": 1.16,
                              "textAlign": "center"
                            },
                            {
                              "type": "i-text",
                              "left": 125,
                              "top": -25,
                              "angle": 0,
                              "width": 942.08,
                              "height": 56.5,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ pointColor[0] }",
                              "text": "${ pointsNoise[parameters.trialN][currPP] }",
                              "fontStyle": "normal",
                              "fontWeight": "normal",
                              "fontSize": "50",
                              "fontFamily": "sans-serif",
                              "lineHeight": 1.16,
                              "textAlign": "center"
                            },
                            {
                              "type": "image",
                              "left": "${ pacPosXY[0] }",
                              "top": "${ pacPosXY[1] }",
                              "angle": 0,
                              "width": 88.67999999999999,
                              "height": 88.67999999999999,
                              "stroke": null,
                              "strokeWidth": 0,
                              "fill": "black",
                              "src": "${ this.files[\"pacman.png\"] }"
                            },
                            {
                              "type": "i-text",
                              "left": -350,
                              "top": 140,
                              "angle": 0,
                              "width": 117.39,
                              "height": 36.16,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "black",
                              "text": "Gewinn:",
                              "fontStyle": "normal",
                              "fontWeight": "normal",
                              "fontSize": 32,
                              "fontFamily": "sans-serif",
                              "lineHeight": 1.16,
                              "textAlign": "center"
                            },
                            {
                              "type": "i-text",
                              "left": -215,
                              "top": 140,
                              "angle": 0,
                              "width": 238.41,
                              "height": 36.16,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#0070d9",
                              "text": "${ bonusText[0] }",
                              "fontStyle": "normal",
                              "fontWeight": "normal",
                              "fontSize": 32,
                              "fontFamily": "sans-serif",
                              "lineHeight": 1.16,
                              "textAlign": "center"
                            },
                            {
                              "type": "rect",
                              "left": -175,
                              "top": 190,
                              "angle": 0,
                              "width": 44,
                              "height": 55,
                              "stroke": "${ bonusBarColors[this.parameters.blockN_Train] }",
                              "strokeWidth": 5,
                              "fill": "#ffffff"
                            },
                            {
                              "type": "rect",
                              "left": -300,
                              "top": 190,
                              "angle": 0,
                              "width": 204,
                              "height": 55,
                              "stroke": "#000000",
                              "strokeWidth": 5,
                              "fill": "#ffffff"
                            },
                            {
                              "type": "rect",
                              "left": "${ rewardLeft }",
                              "top": 190,
                              "angle": 0,
                              "width": "${ rewardWidth }",
                              "height": 50,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "#00D400"
                            },
                            {
                              "type": "rect",
                              "left": "-175",
                              "top": "190",
                              "angle": 0,
                              "width": "40",
                              "height": 50,
                              "stroke": null,
                              "strokeWidth": 1,
                              "fill": "${ bonusBarOn }"
                            }
                          ],
                          "viewport": [
                            800,
                            600
                          ],
                          "files": {
                            "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                          },
                          "responses": {},
                          "parameters": {},
                          "messageHandlers": {
                            "before:prepare": function anonymous(
) {
bonusText = ['']
bonusBarOn = ['white']

// calculate reward
diff = Math.abs(goalsVec[this.parameters.trialN]-points[moveCount[0]])

reward = 100-(diff*2)

// check for DS
ds = 1;
dsMoves = [0,1,1,0];
for (var i = 0; i < 4; i++) {
  if (movesTrial[i]!==dsMoves[i]) {
    ds = 0;
  }
}

// check negative reward
if(reward<0) { 
  reward = 0
}

// check time out
if(moveCount[0]!==4) {
  timeoutText[0] = ['zu langsam']
  reward = 0
}

// width of bonus bar
rewardWidth = reward*2;
rewardLeft = -300-diff*2;

// check for bonus, based on DS
if (ds===1) {
  if (bonusVecTrain[this.parameters.blockN_Train][this.parameters.trialN]===1) {
    bonusText[0] = ['+ Bonus'];
    reward += 20;
    bonusBarOn = ['#0070d9']
  }
}
}
                          },
                          "title": "Feedback",
                          "timeout": "4000",
                          "tardy": true
                        }
                      ]
                    }
                  },
                  {
                    "type": "lab.canvas.Screen",
                    "content": [
                      {
                        "type": "i-text",
                        "left": 0,
                        "top": -200,
                        "angle": 0,
                        "width": 428.96,
                        "height": 56.5,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Ende des Trainings",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": "50",
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": 0,
                        "top": 25,
                        "angle": 0,
                        "width": 914.29,
                        "height": 203.94,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Ab jetzt beginnt das eigentliche Experiment.\n\nDie Gewinne, die Sie jetzt erspielen zählen zu Ihrem Eurobonus.\n\nSie haben ab jetzt nur noch 6 Sekunden Zeit pro Block.",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "i-text",
                        "left": -100,
                        "top": 250,
                        "angle": 0,
                        "width": 119.13,
                        "height": 36.16,
                        "stroke": null,
                        "strokeWidth": 1,
                        "fill": "black",
                        "text": "Start mit",
                        "fontStyle": "normal",
                        "fontWeight": "normal",
                        "fontSize": 32,
                        "fontFamily": "sans-serif",
                        "lineHeight": 1.16,
                        "textAlign": "center"
                      },
                      {
                        "type": "image",
                        "left": 100,
                        "top": 250,
                        "angle": 0,
                        "width": 245.48000000000002,
                        "height": 40.120000000000005,
                        "stroke": null,
                        "strokeWidth": 0,
                        "fill": "black",
                        "src": "${ this.files[\"leerstaste.png\"] }"
                      }
                    ],
                    "viewport": [
                      800,
                      600
                    ],
                    "files": {
                      "leerstaste.png": "embedded\u002Fe6242b1a9f3b6301219f0d59967e92038a592b74996f03f76f304976c6c8ade7.png"
                    },
                    "responses": {
                      "keypress(Space)": "cont"
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "End Training",
                    "tardy": true,
                    "skip": "${ this.parameters.blockN_Train===0}"
                  }
                ]
              }
            ]
          }
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "blockN": 0
            },
            {
              "blockN": 1
            },
            {
              "blockN": 2
            },
            {
              "blockN": 3
            },
            {
              "blockN": 4
            },
            {
              "blockN": 5
            },
            {
              "blockN": 6
            },
            {
              "blockN": 7
            },
            {
              "blockN": 8
            },
            {
              "blockN": 9
            },
            {
              "blockN": 10
            },
            {
              "blockN": 11
            },
            {
              "blockN": 12
            },
            {
              "blockN": 13
            },
            {
              "blockN": 14
            },
            {
              "blockN": 15
            }
          ],
          "sample": {
            "mode": "sequential"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Task",
          "tardy": true,
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Sequence",
            "tardy": true,
            "content": [
              {
                "type": "lab.canvas.Screen",
                "content": [
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": -150,
                    "angle": 0,
                    "width": 141.78,
                    "height": 56.5,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Pause",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "50",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "center"
                  },
                  {
                    "type": "i-text",
                    "left": -125,
                    "top": 250,
                    "angle": 0,
                    "width": 143.42,
                    "height": 36.16,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Weiter mit",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": 32,
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "center"
                  },
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 150,
                    "angle": 0,
                    "width": 529.27,
                    "height": 45.2,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "Spielfeld wird neu angeordnet",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "40",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "center"
                  },
                  {
                    "type": "image",
                    "left": 75,
                    "top": 250,
                    "angle": 0,
                    "width": 245.48000000000002,
                    "height": 40.120000000000005,
                    "stroke": null,
                    "strokeWidth": 0,
                    "fill": "black",
                    "src": "${ this.files[\"leerstaste.png\"] }"
                  },
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": 50,
                    "angle": 0,
                    "width": 204.53,
                    "height": 45.2,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "${ stratTxt }",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "40",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "center"
                  },
                  {
                    "type": "i-text",
                    "left": 0,
                    "top": -50,
                    "angle": 0,
                    "width": 282.37,
                    "height": 45.2,
                    "stroke": null,
                    "strokeWidth": 1,
                    "fill": "black",
                    "text": "${ progressTxt }",
                    "fontStyle": "normal",
                    "fontWeight": "normal",
                    "fontSize": "40",
                    "fontFamily": "sans-serif",
                    "lineHeight": 1.16,
                    "textAlign": "center"
                  }
                ],
                "viewport": [
                  800,
                  600
                ],
                "files": {
                  "leerstaste.png": "embedded\u002Fe6242b1a9f3b6301219f0d59967e92038a592b74996f03f76f304976c6c8ade7.png"
                },
                "responses": {
                  "keypress(Space)": "continue"
                },
                "parameters": {},
                "messageHandlers": {
                  "before:prepare": function anonymous(
) {
if (bonusBlocks[this.parameters.blockN]===1) {
  stratTxt = ['Im nächsten Block ist Bonus möglich.'];
}
else {
  stratTxt = ['Im nächsten Block ist KEIN Bonus möglich.'];
}

progressTxt = ['Abschnitt: ' + (this.parameters.blockN+1) + '/16'];

}
                },
                "title": "Break"
              },
              {
                "type": "lab.flow.Loop",
                "templateParameters": [
                  {
                    "trialN": 0
                  },
                  {
                    "trialN": 1
                  },
                  {
                    "trialN": 2
                  },
                  {
                    "trialN": 3
                  },
                  {
                    "trialN": 4
                  },
                  {
                    "trialN": 5
                  },
                  {
                    "trialN": 6
                  },
                  {
                    "trialN": 7
                  },
                  {
                    "trialN": 8
                  },
                  {
                    "trialN": 9
                  },
                  {
                    "trialN": 10
                  },
                  {
                    "trialN": 11
                  },
                  {
                    "trialN": 12
                  },
                  {
                    "trialN": 13
                  },
                  {
                    "trialN": 14
                  },
                  {
                    "trialN": 15
                  },
                  {
                    "trialN": 16
                  },
                  {
                    "trialN": 17
                  },
                  {
                    "trialN": 18
                  },
                  {
                    "trialN": 19
                  }
                ],
                "sample": {
                  "mode": "sequential"
                },
                "files": {
                  "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png",
                  "points.csv": "embedded\u002F5d04a261732bd409afa82cf09b2614f9431f20469e61004fd4f3573cfebe1b0b.csv"
                },
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {
                  "before:prepare": function anonymous(
) {
// define parameters of the different blocks
goalsVec = trialGoals[this.parameters.blockN];

pointsVec = pointsM[this.parameters.blockN];

// get the noise
blNoise = new Array(nTrials);
blNoise = blockNoise[this.parameters.blockN].map(x=>pointsNoiseM[x]);

// add the points of the fields to the noise
pointsNoise = Array(nTrials);

for(let t=0; t<nTrials; t++) {
  pointsNoise[t] = blNoise[t].map(function (num, idx) {
    return num + pointsVec[idx] });
}
}
                },
                "title": "Block",
                "tardy": true,
                "shuffleGroups": [],
                "template": {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {},
                  "parameters": {},
                  "messageHandlers": {
                    "before:prepare": function anonymous(
) {
// counter for moves
this.parameters.moveCount = [0]
invalidMoveTxt = ['']
pointColor = ['white']
this.parameters.currPP = [12]
timeoutText = ['']

// starting position of pacman (x, y) and (grid idx)
pacPosXY = [125, -25]
pacPosIdx =  [2, 2]

// starting configuration of progress bar
boxColors = ['black', 'white', 'white', 'white']

// preallocation of point vector for current trial
this.parameters.points = [0, -999, -999, -999, -999]

// preallocation moves
this.parameters.movesTrial = []

// preallocation visited fields
this.parameters.visitedFields = []

// colors of grid circles
colors = []

for(x=0;x<25;x++) {
  colors.push(colorM[pointsVec[x]/10+6])
}

colors[12] = 'white'

}
                  },
                  "title": "Trial",
                  "tardy": true,
                  "content": [
                    {
                      "type": "lab.canvas.Screen",
                      "content": [
                        {
                          "type": "rect",
                          "left": 25,
                          "top": -125,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": -25,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "rect",
                          "left": -75,
                          "top": -25,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": 75,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 25,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -175,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -75,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 225,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 125,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -275,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -125,
                          "top": -25.5,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 375,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 275,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 175,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 75,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -25,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -250,
                          "angle": 0,
                          "width": 519.37,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 783.73,
                          "height": 56.5,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ bonusColors[bonusBlocks[parameters.blockN]] }",
                          "text": "${ blockGoals[parameters.blockN] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "50",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        }
                      ],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {
                        "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                      },
                      "responses": {},
                      "parameters": {},
                      "messageHandlers": {},
                      "title": "Goal",
                      "timeout": "1000",
                      "tardy": true,
                      "skip": "${ (this.parameters.moveCount\u003E=4) }",
                      "plugins": []
                    },
                    {
                      "type": "lab.flow.Loop",
                      "templateParameters": [
                        {
                          "move": 1
                        },
                        {
                          "move": 2
                        },
                        {
                          "move": 3
                        },
                        {
                          "move": 4
                        },
                        {
                          "move": 5
                        },
                        {
                          "move": 6
                        },
                        {
                          "move": 7
                        },
                        {
                          "move": 8
                        },
                        {
                          "move": 9
                        },
                        {
                          "move": 10
                        }
                      ],
                      "sample": {
                        "mode": "sequential"
                      },
                      "files": {},
                      "responses": {
                        "": ""
                      },
                      "parameters": {},
                      "messageHandlers": {},
                      "title": "Loop",
                      "timeout": "6000",
                      "tardy": true,
                      "shuffleGroups": [],
                      "template": {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "rect",
                            "left": 25,
                            "top": -125,
                            "angle": 0,
                            "width": 95,
                            "height": 95,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#aaaaaa"
                          },
                          {
                            "type": "rect",
                            "left": 25,
                            "top": -25,
                            "angle": 0,
                            "width": 95,
                            "height": 95,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#aaaaaa"
                          },
                          {
                            "type": "circle",
                            "left": 125,
                            "top": -225,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 0,
                            "fill": "${ colors[2] }"
                          },
                          {
                            "type": "circle",
                            "left": 225,
                            "top": -125,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[8] }"
                          },
                          {
                            "type": "circle",
                            "left": 225,
                            "top": -225,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": "#ffffff",
                            "strokeWidth": 0,
                            "fill": "${ colors[3] }"
                          },
                          {
                            "type": "rect",
                            "left": -75,
                            "top": -25,
                            "angle": 0,
                            "width": 95,
                            "height": 95,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#aaaaaa"
                          },
                          {
                            "type": "circle",
                            "left": 325,
                            "top": -225,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[4] }"
                          },
                          {
                            "type": "circle",
                            "left": -75,
                            "top": -25,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[10] }"
                          },
                          {
                            "type": "circle",
                            "left": 325,
                            "top": -125,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[9] }"
                          },
                          {
                            "type": "circle",
                            "left": 125,
                            "top": -125,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[7] }"
                          },
                          {
                            "type": "circle",
                            "left": 25,
                            "top": -125,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[6] }"
                          },
                          {
                            "type": "rect",
                            "left": 25,
                            "top": 75,
                            "angle": 0,
                            "width": 95,
                            "height": 95,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#aaaaaa"
                          },
                          {
                            "type": "circle",
                            "left": -75,
                            "top": -125,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[5] }"
                          },
                          {
                            "type": "circle",
                            "left": -75,
                            "top": -225,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[0] }"
                          },
                          {
                            "type": "circle",
                            "left": 25,
                            "top": -225,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[1] }"
                          },
                          {
                            "type": "circle",
                            "left": 25,
                            "top": -25,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[11] }"
                          },
                          {
                            "type": "circle",
                            "left": 125,
                            "top": -25,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[12] }"
                          },
                          {
                            "type": "circle",
                            "left": 225,
                            "top": 175,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[23] }"
                          },
                          {
                            "type": "circle",
                            "left": 225,
                            "top": 75,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[18] }"
                          },
                          {
                            "type": "circle",
                            "left": 225,
                            "top": -25,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[13] }"
                          },
                          {
                            "type": "circle",
                            "left": 125,
                            "top": 175,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[22] }"
                          },
                          {
                            "type": "circle",
                            "left": 25,
                            "top": 175,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[21] }"
                          },
                          {
                            "type": "circle",
                            "left": -75,
                            "top": 175,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[20] }"
                          },
                          {
                            "type": "circle",
                            "left": 325,
                            "top": 75,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[19] }"
                          },
                          {
                            "type": "circle",
                            "left": 125,
                            "top": 75,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[17] }"
                          },
                          {
                            "type": "circle",
                            "left": 25,
                            "top": 75,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[16] }"
                          },
                          {
                            "type": "circle",
                            "left": -75,
                            "top": 75,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[15] }"
                          },
                          {
                            "type": "circle",
                            "left": 325,
                            "top": -25,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[14] }"
                          },
                          {
                            "type": "line",
                            "left": 125,
                            "top": 25,
                            "angle": 0,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": 125,
                            "top": -175,
                            "angle": 0,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": 125,
                            "top": -75,
                            "angle": 0,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": 125,
                            "top": 225,
                            "angle": 0,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": 125,
                            "top": 125,
                            "angle": 0,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": 125,
                            "top": -275,
                            "angle": 0,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": -125,
                            "top": -25.5,
                            "angle": 90,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": 375,
                            "top": -25,
                            "angle": 90,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": 275,
                            "top": -25,
                            "angle": 90,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": 175,
                            "top": -25,
                            "angle": 90,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": 75,
                            "top": -25,
                            "angle": 90,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "line",
                            "left": -25,
                            "top": -25,
                            "angle": 90,
                            "width": 500,
                            "height": 0,
                            "stroke": "black",
                            "strokeWidth": 1,
                            "fill": "rgb(0,0,0)"
                          },
                          {
                            "type": "circle",
                            "left": 325,
                            "top": 175,
                            "angle": 0,
                            "width": 90,
                            "height": 90,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ colors[24] }"
                          },
                          {
                            "type": "i-text",
                            "left": -250,
                            "top": -250,
                            "angle": 0,
                            "width": 519.37,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "black",
                            "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          },
                          {
                            "type": "i-text",
                            "left": -250,
                            "top": -100,
                            "angle": 0,
                            "width": 818.23,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "black",
                            "text": "Punkte: ${ parameters.points[parameters.moveCount[0]] }",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          },
                          {
                            "type": "rect",
                            "left": -363,
                            "top": 175,
                            "angle": 0,
                            "width": 60,
                            "height": 60,
                            "stroke": "#000000",
                            "strokeWidth": 5,
                            "fill": "${ boxColors[1] }"
                          },
                          {
                            "type": "rect",
                            "left": -450,
                            "top": 175,
                            "angle": 0,
                            "width": 60,
                            "height": 60,
                            "stroke": "#000000",
                            "strokeWidth": 5,
                            "fill": "${ boxColors[0] }"
                          },
                          {
                            "type": "rect",
                            "left": -275,
                            "top": 175,
                            "angle": 0,
                            "width": 60,
                            "height": 60,
                            "stroke": "#000000",
                            "strokeWidth": 5,
                            "fill": "${ boxColors[2] }"
                          },
                          {
                            "type": "rect",
                            "left": -187,
                            "top": 175,
                            "angle": 0,
                            "width": 60,
                            "height": 60,
                            "stroke": "#000000",
                            "strokeWidth": 5,
                            "fill": "${ boxColors[3] }"
                          },
                          {
                            "type": "i-text",
                            "left": -250,
                            "top": -25,
                            "angle": 0,
                            "width": 297.05,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#ff0000",
                            "text": "${ invalidMoveTxt[0]}",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          },
                          {
                            "type": "i-text",
                            "left": 125,
                            "top": -25,
                            "angle": 0,
                            "width": 1208.85,
                            "height": 56.5,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "${ pointColor[0] }",
                            "text": "${ pointsNoise[parameters.trialN][parameters.currPP] }",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": "50",
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          },
                          {
                            "type": "image",
                            "left": "${ pacPosXY[0] }",
                            "top": "${ pacPosXY[1] }",
                            "angle": 0,
                            "width": 88.67999999999999,
                            "height": 88.67999999999999,
                            "stroke": null,
                            "strokeWidth": 0,
                            "fill": "black",
                            "src": "${ this.files[\"pacman.png\"] }"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {
                          "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                        },
                        "responses": {
                          "keypress(c)": "left",
                          "keypress(v)": "down",
                          "keypress(b)": "right"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "after:end": function anonymous(
) {
// get potential new pacman position idx
switch(this.state.response) {
    case 'left':
        pacPosIdx[0]--
        pacPosIdx[1]--
        break
    case 'down':
        pacPosIdx[0]++
        break
    case 'right':
        pacPosIdx[0]--
        pacPosIdx[1]++
        break
}

if((this.parameters.moveCount[0]<4) && (this.state.response!==-999)) {
  // check if Pacman is still inside the grid and not in the middle
  if((pacPosIdx.some(x => x<0)) || (pacPosIdx.some(x => x>4)) || (pacPosIdx.every(x => x===2)))
  {
    invalidMoveTxt[0] = ['ungültiger Zug']

    // update position (back to initial position)
    switch(this.state.response) {
    case 'left':
        pacPosIdx[0]++
        pacPosIdx[1]++
        break
    case 'down':
        pacPosIdx[0]--
        break
    case 'right':
        pacPosIdx[0]++
        pacPosIdx[1]--
        break
      }
  }
  else {
    // update pacman position on grid
    switch(this.state.response) {
      case 'left':
          pacPosXY[0] -= 100
          pacPosXY[1] -= 100
          this.parameters.movesTrial.push(0)
          break
      case 'down':
          pacPosXY[1] += 100
          this.parameters.movesTrial.push(1)
          break
      case 'right':
          pacPosXY[0] += 100
          pacPosXY[1] -= 100
          this.parameters.movesTrial.push(2)
          break
          }

      // get idx of Pacman
      this.parameters.currPP[0] = gridIdx[pacPosIdx[0]][pacPosIdx[1]]-1
      // hide chosen cell
      colors[this.parameters.currPP] = 'white'

      // add to visited fields
      this.parameters.visitedFields.push(this.parameters.currPP[0])


      // update progress bar
      boxColors[this.parameters.moveCount[0]+1] = 'black'
      boxColors[this.parameters.moveCount[0]] = 'white'

      // update points
      this.parameters.points[this.parameters.moveCount[0]+1] = this.parameters.points[this.parameters.moveCount[0]]+pointsNoise[this.parameters.trialN][this.parameters.currPP]

      this.parameters.moveCount[0]++
      invalidMoveTxt[0] = ['']

      if(pointsNoise[this.parameters.trialN][this.parameters.currPP]>0) {
        pointColor[0] = ['green']
      }
      else {
        pointColor[0] = ['red']
      }
      
  }
  
}

this.state.response = -999;
}
                        },
                        "title": "Move",
                        "tardy": true,
                        "skip": "${ (this.parameters.moveCount\u003E=4) }",
                        "plugins": []
                      }
                    },
                    {
                      "type": "lab.canvas.Screen",
                      "content": [
                        {
                          "type": "rect",
                          "left": 25,
                          "top": -25,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": 75,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "rect",
                          "left": -75,
                          "top": -25,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "${ colors[2] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[8] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[3] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[4] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[10] }"
                        },
                        {
                          "type": "rect",
                          "left": 25,
                          "top": -125,
                          "angle": 0,
                          "width": 95,
                          "height": 95,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#aaaaaa"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[9] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[7] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[0] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[6] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": -125,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[5] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -225,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[1] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[12] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[23] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[11] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[18] }"
                        },
                        {
                          "type": "circle",
                          "left": 225,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[13] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[22] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": -25,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[14] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[21] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[20] }"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[19] }"
                        },
                        {
                          "type": "circle",
                          "left": 125,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[17] }"
                        },
                        {
                          "type": "circle",
                          "left": 25,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[16] }"
                        },
                        {
                          "type": "circle",
                          "left": -75,
                          "top": 75,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[15] }"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 25,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -175,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -75,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 225,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": 125,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 125,
                          "top": -275,
                          "angle": 0,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -125,
                          "top": -25.5,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 375,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 275,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 175,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": 75,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "line",
                          "left": -25,
                          "top": -25,
                          "angle": 90,
                          "width": 500,
                          "height": 0,
                          "stroke": "black",
                          "strokeWidth": 1,
                          "fill": "rgb(0,0,0)"
                        },
                        {
                          "type": "circle",
                          "left": 325,
                          "top": 175,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ colors[24] }"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -250,
                          "angle": 0,
                          "width": 519.37,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Ziel: ${ goalsVec[parameters.trialN] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -100,
                          "angle": 0,
                          "width": 818.23,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Punkte: ${ parameters.points[parameters.moveCount[0]] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": -175,
                          "top": 190,
                          "angle": 0,
                          "width": 44,
                          "height": 55,
                          "stroke": "${ bonusBarColors[bonusBlocks[parameters.blockN]] }",
                          "strokeWidth": 5,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": -25,
                          "angle": 0,
                          "width": 256.16,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#ff0000",
                          "text": "${ timeoutText[0] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 125,
                          "top": -25,
                          "angle": 0,
                          "width": 1208.85,
                          "height": 56.5,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ pointColor[0] }",
                          "text": "${ pointsNoise[parameters.trialN][parameters.currPP] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "50",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "image",
                          "left": "${ pacPosXY[0] }",
                          "top": "${ pacPosXY[1] }",
                          "angle": 0,
                          "width": 88.67999999999999,
                          "height": 88.67999999999999,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "black",
                          "src": "${ this.files[\"pacman.png\"] }"
                        },
                        {
                          "type": "rect",
                          "left": -300,
                          "top": 190,
                          "angle": 0,
                          "width": 204,
                          "height": 55,
                          "stroke": "#000000",
                          "strokeWidth": 5,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": "${ rewardLeft }",
                          "top": 190,
                          "angle": 0,
                          "width": "${ rewardWidth }",
                          "height": 50,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#00D400"
                        },
                        {
                          "type": "i-text",
                          "left": -350,
                          "top": 140,
                          "angle": 0,
                          "width": 117.39,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "Gewinn:",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -215,
                          "top": 140,
                          "angle": 0,
                          "width": 238.41,
                          "height": 36.16,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "#0070d9",
                          "text": "${ bonusText[0] }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": 32,
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": -175,
                          "top": 190,
                          "angle": 0,
                          "width": 40,
                          "height": 50,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ bonusBarOn }"
                        }
                      ],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {
                        "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
                      },
                      "responses": {},
                      "parameters": {},
                      "messageHandlers": {
                        "before:prepare": function anonymous(
) {
bonusText = ['']
bonusBarOn = ['white']

// calculate reward
this.parameters.diff = Math.abs(goalsVec[this.parameters.trialN]-this.parameters.points[this.parameters.moveCount[0]])

this.parameters.reward = 100-(this.parameters.diff*2)

// check for bonus
ds = 1;
dsMoves = [0,1,1,0];
for (var i = 0; i < 4; i++) {
  if (this.parameters.movesTrial[i]!==dsMoves[i]) {
    ds = 0;
  }
}

// negative reward is not possible
if(this.parameters.reward<0) { 
  this.parameters.reward = 0
}

// check for time out
if(this.parameters.moveCount[0]!==4) {
  timeoutText[0] = ['zu langsam']
  this.parameters.reward = 0
}

rewardWidth = this.parameters.reward*2;
rewardLeft = -300-this.parameters.diff*2;


if (ds===1) {
  if (bonusVec[this.parameters.blockN][this.parameters.trialN]===1) {
    bonusText[0] = ['+Bonus'];
    this.parameters.reward += 20;
    bonusBarOn = ['#0070d9'];
  }
}
}
                      },
                      "title": "Feedback",
                      "timeout": "4000",
                      "tardy": true
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "left": 0,
          "top": -200,
          "angle": 0,
          "width": 272.38,
          "height": 67.8,
          "stroke": null,
          "strokeWidth": 1,
          "fill": "black",
          "text": "Geschafft!",
          "fontStyle": "normal",
          "fontWeight": "normal",
          "fontSize": "60",
          "fontFamily": "sans-serif",
          "lineHeight": 1.16,
          "textAlign": "center"
        },
        {
          "type": "image",
          "left": 0,
          "top": 50,
          "angle": 0,
          "width": 169.97,
          "height": 169.97,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"pacman.png\"] }"
        },
        {
          "type": "i-text",
          "left": 0,
          "top": -100,
          "angle": 0,
          "width": 599.46,
          "height": 36.16,
          "stroke": null,
          "strokeWidth": 1,
          "fill": "black",
          "text": "Als letztes folgt eine kurze Nachbefragung",
          "fontStyle": "normal",
          "fontWeight": "normal",
          "fontSize": 32,
          "fontFamily": "sans-serif",
          "lineHeight": 1.16,
          "textAlign": "center"
        },
        {
          "type": "image",
          "left": 0,
          "top": 200,
          "angle": 0,
          "width": 114.83999999999999,
          "height": 40.120000000000005,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"vor.png\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png",
        "vor.png": "embedded\u002F5bfe965230d053b438d5a5f14eaa7d9a52f504cef8ac8fd07b5955d375b5090a.png"
      },
      "responses": {
        "keypress(b)": "cont"
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "End Task"
    },
    {
      "type": "lab.html.Form",
      "content": "\u003Cmain\u003E\n  \u003Ccenter\u003E\n  \u003Ch1\u003ENachbefragung\u003C\u002Fh1\u003E\n\u003Cfont size=5\u003E\n\u003Cform\u003E\n   \u003Clabel for=\"Strategie\"\u003EHaben Sie bei der Bearbeitung der Aufgabe eine bestimmte Strategie angewandt?\u003Cbr\u003E Und wenn ja, wie sah diese aus?\u003C\u002Flabel\u003E\u003Cbr\u003E\n   \u003Ctextarea name=\"Strategie\" rows=\"5\" cols=\"100\"\u003E\u003C\u002Ftextarea\u003E \n\n  Haben Sie eine Vermutung oder Annahme in Bezug auf den Zweck der Studie?\u003Cbr\u003E\n  \u003Ctextarea name=\"Zweck\" rows=\"5\" cols=\"100\"\u003E\u003C\u002Ftextarea\u003E\n\n  Hatten Sie Probleme bei der Bearbeitung der Aufgabe?\u003Cbr\u003E\n  \u003Ctextarea name=\"Probleme\" rows=\"5\" cols=\"100\"\u003E\u003C\u002Ftextarea\u003E \n  \u003Cbutton type=\"submit\"\u003Eweiter\u003C\u002Fbutton\u003E\n\u003C\u002Fform\u003E\n\u003C\u002Fcenter\u003E\n\u003C\u002Fmain\u003E",
      "scrollTop": true,
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Form"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "left": 0,
          "top": -175,
          "angle": 0,
          "width": 594.24,
          "height": 45.2,
          "stroke": null,
          "strokeWidth": 1,
          "fill": "black",
          "text": "Vielen Dank für Ihre Teilnahme!",
          "fontStyle": "normal",
          "fontWeight": "bold",
          "fontSize": "40",
          "fontFamily": "sans-serif",
          "lineHeight": 1.16,
          "textAlign": "center"
        },
        {
          "type": "image",
          "left": 0,
          "top": 50,
          "angle": 0,
          "width": 273.43,
          "height": 273.43,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"pacman.png\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "pacman.png": "embedded\u002F445eebf8f9417859ead65eeec3794bc66db878afc32bbdf65ec54808f1902350.png"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "End",
      "timeout": "5000"
    }
  ]
})

// Let's go!
study.run()