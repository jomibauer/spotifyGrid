import { useState,useEffect } from 'react';
import GridSquare from './GridSquare';

function generateAlbumGrid(albumList, maxRows, maxColumns, onSquareClick, onPlayClick) {
  let gridContent = [];
  let col = 0;
  let tempRow = [];
  let numAlbums = albumList.length;
  for (let i = 0; i < numAlbums; i++){
    tempRow.push(<td key={i}><GridSquare id={i} album={albumList[i]} onClick={onSquareClick} onPlayClick={onPlayClick}/></td>)
    
    col++;
    if(col >= maxColumns){
      gridContent.push(<tr>{tempRow}</tr>);
      tempRow = [];
      col = 0;
    }
  }

  while(gridContent.length < maxRows) {
    while(tempRow.length < maxColumns) {
      let tempKey = String(gridContent.length) + " " + String(tempRow.length);
      tempRow.push(<td><GridSquare key={tempKey} album={getRandomAlbum(albumList, numAlbums)} onClick={onSquareClick} onPlayClick={onPlayClick}/></td>);
    }
    gridContent.push(<tr>{tempRow}</tr>);
  }

  return gridContent;
}

function getRandomAlbum(albumList, numAlbums) {
  return albumList[Math.floor(Math.random() * ((numAlbums-1) - 0 + 1) + 0)];
}

const Grid = ({albums, maxRows, maxColumns, onSquareClick, onPlayClick}) => {
  const [gridContent, setGridContent] = useState();
  
  useEffect(() => {
    setGridContent(generateAlbumGrid(albums, maxRows, maxColumns, onSquareClick, onPlayClick));
    console.log("updated content");
  }, [setGridContent, albums, maxRows, maxColumns, onSquareClick, onPlayClick]);
  
  return (
    <div>
      <table className='w-100 grid-table' cellSpacing="0" cellPadding="0">
        <tbody>
          {gridContent}
        </tbody>
      </table>
    </div>
  );
};

Grid.defaultProps = {
  maxRows: 4,
  maxColumns: 8
}

export default Grid;
