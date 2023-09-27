
function displayBoard() {
    let tab = RAW_MAZE.table
    for (let i = 0; i < tab.length; i++) {
        let lengthOfLine = tab[i].length;
        for (let j = 0; j < lengthOfLine; j++) {
            switch (tab[i][j]) {
                /*case 0:
                    $(`#board`).append(`<span class="empty" style="top:15*${i}; left:15*${j};">.</span>`)
                    break;
                */
                case 1:
                    $(`#board`).append(`<div class="wall" style="top:${15*i}px; left:${15*j}px;"><span>.</span></div>`)
                    break;
                case 2:
                    $(`#board`).append(`<div class="pac-dot" style="top:${15*i}px; left:${15*j}px;"></div>`)
                    break;
                /*
                 case 3:
                     $(`#board`).append(`<span class="energizer" style="top:15*${i}; left:15*${j};">.</span>`)
                     break;
                 case 4:
                     $(`#board`).append(`<span class="pacman" style="top:15*${i}; left:15*${j};">.</span>`)
                     break;
                 case 5:
                     $(`#board`).append(`<span class="ghost" style="top:15*${i}; left:15*${j};">.</span>`)
                     break;
                     */
                default:
                    $(`#board`).append(`<div class="empty" style="top:${15*i}px; left:${15*j}px;"></div>`)
            }
        }
    }
}
