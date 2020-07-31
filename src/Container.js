import React from 'react'
import Item from './Item'
import styled from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import cx from 'clsx'
import { Box } from '@material-ui/core'

const Wrapper = styled.div`
  position: relative;
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); */
  grid-template-columns: repeat(4, 1fr);
  &.layout-tablet {
    grid-template-columns: repeat(8, 1fr);
  }
  &.layout-desktop {
    grid-template-columns: repeat(12, 1fr);
  }
  /* grid-template-rows: repeat(auto-fill, minmax(3rem, 1fr)); */
  grid-auto-rows: 1fr;
  grid-gap: 1rem;

  & > span:first-child {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
`

const Container = ({ items }) => {
  const { ref, width } = useResizeObserver()
  return (
    <Wrapper
      ref={ref}
      className={cx({
        'layout-tablet': width >= 600,
        'layout-desktop': width >= 960,
      })}
    >
      <Box position="absolute" right={0} top={0} zIndex={1}>
        {width}
      </Box>
      {items?.map((o, i) => (
        <Item key={o.id} {...o} i={i}>
          {o.items && <Container {...o} />}
        </Item>
      ))}
    </Wrapper>
  )
}

export default Container
