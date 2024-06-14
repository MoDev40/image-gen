import React from 'react'

interface Params {
  id:string
}
function TransformationPage({params}:{params:Params}) {
  return (
    <div>
      <h1>TransformationPage</h1>
      <h2>id: {params.id}</h2>
    </div>
  )
}

export default TransformationPage