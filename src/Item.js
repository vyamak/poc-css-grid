import React from 'react'
import { Box, Typography } from '@material-ui/core'
import * as Comps from './comps'
import makeStyles from '@material-ui/core/styles/makeStyles'
import cx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedItem, selectDisplayOptions } from './selectors'
import { selectItem } from './reducer'

const useStyles = makeStyles(theme => ({
  root: {
    border: '2px solid transparent',
    margin: -2, // pour compenser le border
    // minWidth: 0, // pour éviter le dépassement (grid blowout)
    '&:hover': {
      borderColor: theme.palette.action.focus,
    },
    '&.selected': {
      borderColor: theme.palette.info.main,
    },
  },
}))
const DefaultComp = ({ compName }) => (
  <Typography color="error">unknown component type *{compName}*</Typography>
)

const Item = ({ layout, component, options, children, id, i }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { showName, showContent } = useSelector(selectDisplayOptions)
  const { id: selectedId } = useSelector(selectSelectedItem) || {}
  const { render: TheComp, color, isContainer, items } = Comps[component] || {}
  return (
    <Box
      className={cx(classes.root, {
        selected: selectedId === id,
      })}
      onClick={e => {
        dispatch(selectItem(id))
        e.stopPropagation()
      }}
      position="relative"
      style={{
        gridRowStart: layout.rowStart || 'auto',
        gridColumnStart: layout.colStart || 'auto',
        gridRowEnd: layout.rowEnd || 'auto',
        gridColumnEnd: layout.colEnd || 'auto',
      }}
    >
      {Comps[component] ? (
        <>
          {showContent ? (
            <>
              {showName && (
                <Typography variant="caption" color="textSecondary">
                  {component}
                </Typography>
              )}
              <TheComp {...options}>{children}</TheComp>
            </>
          ) : (
            <Box
              height="100%"
              minHeight={isContainer && !!items ? 0 : '3rem'}
              bgcolor={color}
              position="relative"
            >
              {showName && (
                <Typography variant="caption">{component}</Typography>
              )}
              <Box position="absolute" left={0} top={0} zIndex={1}>
                {i}
              </Box>
              <Box>{children}</Box>
            </Box>
          )}
        </>
      ) : (
        <DefaultComp compName={component} />
      )}
    </Box>
  )
}

export default Item
