import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  cyan: {
    backgroundColor: '#00FFFF',
    color: 'black',
  },
  magenta: {
    backgroundColor: '#FF00FF',
    color: 'black',
  },
  yellow: {
    backgroundColor: '#FFFF00',
    color: 'black',
  },
  black: {
    backgroundColor: 'black',
    color: 'white',
  },
};

function App() {
  const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill({ color: null, shape: null })));
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedShape, setSelectedShape] = useState('');
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [fileContent, setFileContent] = useState('');

  const handleCellClick = (rowIndex, colIndex) => {
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      const cell = newBoard[rowIndex][colIndex];
      if (cell.shape === null) { // Only update if the cell is empty
        newBoard[rowIndex][colIndex] = { color: selectedColor, shape: selectedShape };
      }
      return newBoard;
    });
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleShapeSelection = (shape) => {
    setSelectedShape(shape);
  };

  const toggleFileMenu = () => {
    setIsFileMenuOpen(!isFileMenuOpen);
  };

  const handleOpenFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      setFileContent(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        {/* File Options Menu */}
        <div className="col">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" onClick={toggleFileMenu}>
              Archivo
            </button>
            {isFileMenuOpen && (
              <ul className="dropdown-menu show" style={{ position: 'absolute' }}>
                <li><input type="file" className="dropdown-item" onChange={handleOpenFile} /></li>
                <li><a className="dropdown-item" href="#">Nuevo archivo</a></li>
                <li><a className="dropdown-item" href="#">Guardar archivo como...</a></li>
                <li><a className="dropdown-item" href="#">Guardar</a></li>
                <li><a className="dropdown-item" href="#">Imprimir</a></li>
                <li><a className="dropdown-item" href="#">Salir</a></li>
              </ul>
            )}
          </div>
        </div>
        <div className="col">
          <button className="btn btn-primary">PDF</button>
        </div>
        <div className="col">
          <button className="btn btn-secondary">Ayuda</button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <textarea className="form-control" rows="3" value={fileContent} readOnly style={{ width: '100%', minHeight: '100px' }}></textarea>
        </div>
      </div>

      <div className="row mt-3" style={{ height: '300px' }}>
        <div className="col-9" style={{ height: '100%' }}>
          <div className="d-flex flex-column h-100">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="d-flex flex-grow-1">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className="p-2 border text-center flex-grow-1 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: cell.color || 'white', fontSize: '2rem' }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell.shape}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="col-3">
          <div>
            <label>Figuras</label>
            {/* Shape Selection */}
            <button className="btn btn-info mb-2 w-100" onClick={() => handleShapeSelection('▲')}>&#9650;</button>
            <button className="btn btn-info mb-2 w-100" onClick={() => handleShapeSelection('○')}>&#9675;</button>
            <button className="btn btn-info mb-2 w-100" onClick={() => handleShapeSelection('×')}>&#215;</button>
            <button className="btn btn-info mb-2 w-100" onClick={() => handleShapeSelection('★')}>&#11088;</button>
          </div>
          <div>
            <label>Colores</label>
            {/* Color Selection */}
            <button className="btn w-100 mb-1" style={styles.cyan} onClick={() => handleColorSelection('cyan')}>Cyan</button>
            <button className="btn w-100 mb-1" style={styles.magenta} onClick={() => handleColorSelection('magenta')}>Magenta</button>
            <button className="btn w-100 mb-1" style={styles.yellow} onClick={() => handleColorSelection('yellow')}>Amarillo</button>
            <button className="btn w-100" style={styles.black} onClick={() => handleColorSelection('black')}>Negro</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
