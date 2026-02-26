import React from 'react'
import { CButton } from '@coreui/react'

const ARouteButton = ({type=null, color="primary", click, applyWidth=false, name}) => {
  return (
    <div style={{ textAlign: 'right', marginBottom: '20px', marginLeft: '10px' }}>
      <CButton
        type={type ? type : 'button'}
        color={color}
        onClick={click}
        style={applyWidth ? { width: '50%' } : {}}
      >
        {name}
      </CButton>
    </div>
  )
}
export default ARouteButton
