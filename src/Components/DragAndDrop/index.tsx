import React, { FC, useState, useEffect, useCallback } from 'react'
import Typography from '@mui/material/Typography';
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DragElement } from '../DragElement'

export interface Item {
  id: number;
  slug: string;
}

export interface DragAndDropProps {
    heading: string;
}

export interface ContainerState {
  cards: Item[]
}

export const DragAndDrop = ({ heading }: DragAndDropProps) => {
    const [cards, setCards] = useState([
      {
        id: 1,
        slug: 'Write a cool JS library',
      },
      {
        id: 2,
        slug: 'Make it generic enough',
      },
      {
        id: 3,
        slug: 'Write README',
      },
      {
        id: 4,
        slug: 'Create some examples',
      },
      {
        id: 5,
        slug: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        slug: '???',
      },
      {
        id: 7,
        slug: 'PROFIT',
      },
    ])

    useEffect(() => {
        console.log(cards);
    }, [cards]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        }),
      )
    }, [])

    const renderCard = useCallback(
      (card: { id: number, slug: string }, index: number) => {
        return (
          <DragElement
            key={card.id}
            index={index}
            id={card.id}
            text={card.slug}
            moveCard={moveCard}
          />
        )
      },
      [],
    )

    return (
      <>
            <Typography style={{ marginBottom: '10px' }} variant="h6" component="div">
                { heading }
            </Typography>
            <DndProvider backend={HTML5Backend}>
                <div>{cards.map((card, i) => renderCard(card, i))}</div>
            </DndProvider>
      </>
    )
  }
