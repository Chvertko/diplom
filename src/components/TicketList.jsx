import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { CardTicket } from "./CardTicket";
import { useSelector } from "react-redux";

export const TicketList = ({ tickets }) => {
  const isLoading = useSelector((state) => state.ticket.isLoading);

  // Функция для сравнения по значению ticket.price
  const compareByPrice = (a, b) => a.price - b.price;

  // Функция для сравнения по значению ticket.duration
  const compareByDuration = (a, b) => a.duration - b.duration;


  // Отсортировать массив tickets по указанным условиям
  const sortedTickets = [...tickets]
    .sort(compareByPrice)
    .sort(compareByDuration)

  // Функция для получения соответствующего label для каждого билета
  const getLabel = (index) => {
    if (index === 0) {
      return "Самый дешевый";
    } else if (index === 1) {
      return "Самый быстрый";
    }
    return "";
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : sortedTickets.length === 0 ? null : (
        sortedTickets.map((ticket, index) => (
          <CardTicket
            ticket={ticket}
            label={getLabel(index)}
            key={ticket.id}
          />
        ))
      )}
      {sortedTickets.length === 0 && !isLoading && (
        <h1 style={{ margin: "0 auto" }}>
          По заданным критериям билетов не найдено
        </h1>
      )}
    </Box>
  );
};
