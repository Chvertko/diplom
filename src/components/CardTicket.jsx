import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardHeader,
  Chip,
  Link,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import moment from "moment/moment";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";
import { selectOptionCurrency } from "../store/selectors";

export const CardTicket = ({ ticket }) => {
  const currency = useSelector(selectOptionCurrency);
  const [priceInCurrency, setPriceInCurrency] = useState(ticket.price);

  useEffect(() => {
    const calculatePriceInCurrency = () => {
      let calculatedPrice = ticket.price;
      if (currency === "usd") {
        calculatedPrice = ticket.price * 16.35;
      } else if (currency === "eur") {
        calculatedPrice = ticket.price * 17.2;
      } else if (currency === "mdl") {
        calculatedPrice = ticket.price / 0.87;
      } else if (currency === "rub") {
        calculatedPrice = ticket.price / 0.19;
      }
      setPriceInCurrency(calculatedPrice.toFixed(1));
    };

    calculatePriceInCurrency();
  }, [currency, ticket]);

  const generateReport = () => {
    const doc = new jsPDF();

    // Создание QR-кода в формате data URL
    const qrCodeDataURL = document
      .querySelector("#qrCodeCanvas")
      .toDataURL("image/jpeg");

    doc.setFont("Arial", "bold");
    doc.text(`Ticket Details`, 10, 30);
    doc.setFontSize(12);
    doc.text(`Origin: ${ticket.origin}`, 10, 50);
    doc.text(`Destination: ${ticket.destination}`, 10, 65);
    doc.text(`Origin Airport: ${ticket.origin_airport}`, 10, 80);
    doc.text(`Destination Airport: ${ticket.destination_airport}`, 10, 95);
    doc.text(`Price: ${ticket.price} ${currency.toUpperCase()}`, 10, 110);
    doc.text(`Airline: ${ticket.airline}`, 10, 125);
    doc.text(`Flight Number: ${ticket.flight_number}`, 10, 140);
    doc.text(
      `Departure Date: ${moment(ticket.departure_at).format("DD/MM/HH:mm")}`,
      10,
      155
    );
    doc.text(
      `Return Date: ${moment(ticket.return_at).format("DD/MM/HH:mm")}`,
      10,
      170
    );
    doc.text(`Transfers to Destination: ${ticket.transfers} `, 10, 185);
    doc.text(`Transfers on Return: ${ticket.return_transfers}`, 10, 200);
    doc.text(`Flight Duration to Destination: ${ticket.duration}`, 10, 215);

    doc.setFontSize(25);
    doc.setFont("Arial", "bold");
    doc.text(
      `PRICE:${ticket.price} ${currency}`,
      doc.internal.pageSize.width - 10,
      doc.internal.pageSize.height - 10,
      {
        align: "right",
      }
    );

    // Добавление QR-кода в документ PDF
    doc.addImage(qrCodeDataURL, "JPEG", 10, 230, 40, 40);

    doc.save("ticket.pdf");
  };

  return (
    <Card sx={{ minWidth: 780, minHeight: 200 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="Airline Avatar">{ticket.airline[0]}</Avatar>
        }
        title={`${ticket.airline} Flight ${ticket.flight_number}`}
        subheader={`${moment(ticket.departure_at).format(
          "MMMM Do YYYY, HH:mm"
        )} - ${moment(ticket.return_at).format("MMMM Do YYYY, HH:mm")}`}
      />
      <CardContent>
        <Box display="flex" alignItems="center" position='relative'>
        <Box mt={2} sx={{position:'absolute', right:0,top:0}}>
            <QRCode
              id="qrCodeCanvas"
              value={`https://www.aviasales.ru${ticket.link}`}
              size={200}
            />
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {`${ticket.origin} - ${ticket.destination}`}
          </Typography>
          <Typography variant="body1" component="div">
            {`${moment(ticket.departure_at).format("HH:mm")} - ${moment(
              ticket.return_at
            ).format("HH:mm")}`}
          </Typography>
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {`${ticket.price} ${currency} /`}
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "medium" }}
          >
            {`${priceInCurrency || ""} RUB.PMR`}
          </Typography>
        </Box>
        <Box mt={2}>
          <Chip
            label={`Пересадки: ${ticket.transfers}`}
            sx={{ marginRight: 1 }}
          />
          <Chip label={`Обратные пересадки: ${ticket.return_transfers}`} />
        </Box>
        <Box mt={2}>
          <Button variant="contained" onClick={generateReport}>
            На печать
          </Button>
        </Box>
        <Box mt={2}>
          <Button
            href={`https://www.aviasales.ru${ticket.link}`}
            variant="contained"
          >
            Подробнее
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
