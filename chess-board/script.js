/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */

function getIdFourSide (row, col, offset) {
    const rowPlus = Number(row) + Number(offset);
    const rowMinus = Number(row) - Number(offset);
    const colPlus = Number(col) + Number(offset);
    const colMinus = Number(col) - Number(offset);
    
    return [`${rowPlus}_${colPlus}`,`${rowMinus}_${colPlus}`, `${rowPlus}_${colMinus}`, `${rowMinus}_${colMinus}`]
    
}

function fillAcitveColor(selectedRow, selectedCol, boardSize) {
    let offset = 0;
	while (offset < boardSize) {
        const list = getIdFourSide(selectedRow, selectedCol, offset);
        list.forEach((id)=>{
            const $box = document.getElementById(id);
            if($box) {
                $box.className = "box active";
            }
        })
        offset++;  
    }
}

function init(boardSize) {
    for (let row = 1; row <= boardSize; row++) { 
     for (let col = 1; col <= boardSize; col++) {
         const $box = document.getElementById(`${row}_${col}`);
         const isEvenRow = !!(row % 2);
         const isEvenCol = !!(col % 2)
         const isBlack = isEvenRow ^ isEvenCol;
         $box.className = isBlack ? "box black" : "box";
     }
    }
}

function Board(board, count) {
  const $board = document.querySelector(board);
  let selectedBoxId = '';
	
  for (let row = 1; row <= count; row++) { 
     const boxRowContainer = document.createElement("div");
     boxRowContainer.className = "row"
     $board.appendChild(boxRowContainer);
      
     for (let col = 1; col <= count; col++) {
         const box = document.createElement("div");
         const isEvenRow = !!(row % 2);
         const isEvenCol = !!(col % 2)
         const isBlack = isEvenRow ^ isEvenCol;
         box.className = isBlack ? "box black" : "box";
         box.id = `${row}_${col}`
         
         boxRowContainer.appendChild(box);
         box.addEventListener("click", (e) => {
             selectedBoxId = e.currentTarget.id;
             const [row, col] = selectedBoxId.split('_');
             init(count);
             fillAcitveColor(row, col, count);
        });
     }
    
   
  }
}
