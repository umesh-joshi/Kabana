import React, { useState } from "react";
import { Card } from "./Card";
import { DropIndicator } from "./DropIndicator";
import { AddCard } from "./AddCard";
import axios from 'axios';

export const Column = ({ title, headingColor, cards, column, setCards }) => {
    const [active, setActive] = useState(false);
  
    const handleDragStart = (e, card) => {
      e.dataTransfer.setData("cardId", card.taskid);
    };
  
    const handleDragEnd = (e) => {
      const cardId = e.dataTransfer.getData("cardId");
  
      setActive(false);
      clearHighlights();
  
      const indicators = getIndicators();
      const { element } = getNearestIndicator(e, indicators);
  
      const before = element.dataset.before || "-1";
  
      if (before !== cardId) {
        let copy = [...cards];
  
        let cardToTransfer = copy.find((c) => c.taskid === cardId);
        if (!cardToTransfer) return;
        cardToTransfer = { ...cardToTransfer, column };
  
        copy = copy.filter((c) => c.taskid !== cardId);
  
        const moveToBack = before === "-1";
  
        if (moveToBack) {
          copy.push(cardToTransfer);
        } else {
          const insertAtIndex = copy.findIndex((el) => el.taskid === before);
          if (insertAtIndex === undefined) return;
  
          copy.splice(insertAtIndex, 0, cardToTransfer);
        }
  
        setCards(copy);

        updateCardInDB(cardToTransfer);
      }
    };

   const updateCardInDB = (cardToTransfer) => {
      axios.put(`http://localhost:8000/card/${cardToTransfer.taskid}`, cardToTransfer)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  
    const handleDragOver = (e) => {
      e.preventDefault();
      highlightIndicator(e);
  
      setActive(true);
    };
  
    const clearHighlights = (els) => {
      const indicators = els || getIndicators();
  
      indicators.forEach((i) => {
        i.style.opacity = "0";
      });
    };
  
    const highlightIndicator = (e) => {
      const indicators = getIndicators();
  
      clearHighlights(indicators);
  
      const el = getNearestIndicator(e, indicators);
  
      el.element.style.opacity = "1";
    };
  
    const getNearestIndicator = (e, indicators) => {
      const DISTANCE_OFFSET = 50;
  
      const el = indicators.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
  
          const offset = e.clientY - (box.top + DISTANCE_OFFSET);
  
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        {
          offset: Number.NEGATIVE_INFINITY,
          element: indicators[indicators.length - 1],
        }
      );
  
      return el;
    };
  
    const getIndicators = () => {
      return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };
  
    const handleDragLeave = () => {
      clearHighlights();
      setActive(false);
    };
  
    const filteredCards = cards.filter((c) => c.column === column);
  
    return (
      <div className="w-56 shrink-0">
        <div className="mb-3 flex items-center justify-between">
          <h3 className={`font-medium ${headingColor}`}>{title}</h3>
          <span className="rounded text-sm text-neutral-400">
            {filteredCards.length}
          </span>
        </div>
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full transition-colors border border-neutral-500 bg-neutral-500/20 text-neutral-500 px-1 ${
            active ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
        >
          {filteredCards.map((c) => {
            return <Card key={c.taskid} {...c} handleDragStart={handleDragStart} />;
          })}
          <DropIndicator beforeId={null} column={column} />
          <AddCard column={column} setCards={setCards} />
        </div>
      </div>
    );
  };