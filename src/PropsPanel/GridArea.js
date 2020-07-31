import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setItemLayout } from '../reducer'
import { selectSelectedItem } from '../selectors'

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 4px;
  }

  & input {
    width: 48px;
  }
`

const Separator = () => <Typography>/</Typography>

const Input = ({ label, value, onChange }) => (
  <Box position="relative">
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
    <Box position="absolute">
      <Typography variant="caption">{label}</Typography>
    </Box>
  </Box>
)

export default function GridArea() {
  const dispatch = useDispatch()
  const { layout } = useSelector(selectSelectedItem)
  return (
    <div>
      <Wrapper>
        <Typography>grid-area:</Typography>
        <Input
          label="row-start"
          value={layout.rowStart}
          onChange={rowStart =>
            dispatch(setItemLayout({ ...layout, rowStart }))
          }
        />
        <Separator />
        <Input
          label="col-start"
          value={layout.colStart}
          onChange={colStart =>
            dispatch(setItemLayout({ ...layout, colStart }))
          }
        />
        <Separator />
        <Input
          label="row-end"
          value={layout.rowEnd}
          onChange={rowEnd => dispatch(setItemLayout({ ...layout, rowEnd }))}
        />
        <Separator />
        <Input
          label="col-end"
          value={layout.colEnd}
          onChange={colEnd => dispatch(setItemLayout({ ...layout, colEnd }))}
        />
      </Wrapper>
    </div>
  )
}
