import React from 'react'
import styled from 'styled-components'
import Carousel from './Carousel'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Page = styled.div`
  width: 100px;
  height: 50px;
  background: #e5f7ff;
  border: 1px solid #d4e8f1;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.124);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BasicCarousel = () => (
  <Container>
    <Carousel>
      <Page>Page 1!</Page>
      <Page>Page 2!</Page>
    </Carousel>
  </Container>
)
