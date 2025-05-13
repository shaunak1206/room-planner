import React from 'react'

export function Palette({ onSelect }) {
  return (
    <div className="palette">
      <button onClick={() => onSelect('chair')}>Chair</button>
      <button onClick={() => onSelect('table')}>Table</button>
    </div>
  )
}
