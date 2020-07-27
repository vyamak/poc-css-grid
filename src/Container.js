import React from 'react'
import Item from './Item'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 1rem;
`

const Container = ({ items }) => {
  return (
    <Wrapper>
      {items?.map(o => (
        <Item key={o.id} {...o}>
          {o.items && <Container {...o} />}
        </Item>
      ))}
    </Wrapper>
  )
}

export default Container
