import React from 'react'
import MUIButton from '@mui/material/Button';

export default function Button({children, variant, ...props}) {
    

  return (
    <MUIButton variant={variant ?? "contained"} {...props}>{children}</MUIButton>
  )
}


