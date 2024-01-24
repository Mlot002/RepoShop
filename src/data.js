import axios from "axios";
import cheerio from 'cheerio';

  export const sliderItems = [
    {
      id: 1,
      img: "./Laptopy.jpg",
      title: "SUMMER SALE",
      desc: "DON'T DEAL WITH OUR PRICES.",
      bg: "fbf0f4",
      link: "/products/laptopy",
    },
    {
      id: 2,
      img: "./Komputery.jpg",
      title: "STOCK CLEARENCE",
      desc: "DON'T DEAL WITH OUR PRICES.",
      bg: "f5fafd",
      link: "/products/komputery",
    },
    {
      id: 3,
      img: "./Drukarki.jpg",
      title: "PRINT CHEAPLY",
      desc: "DON'T DEAL WITH OUR PRICES.",
      bg: "fcf1ed",
      link: "/products/drukarki",
    },
  ];

  export const categories = [
    {
      id: 0,
      name: "Laptopy",
      url: 'https://www.x-kom.pl/g-2/c/159-laptopy-notebooki-ultrabooki.html',
      pageCount: 2,
    },
    {
      id: 1,
      name: "Monitory",
      url: 'https://www.x-kom.pl/g-6/c/15-monitory.html',
      pageCount: 2,
    },
    {
      id: 2,
      name: "Telewizory",
      url: 'https://www.x-kom.pl/g-8/c/1117-telewizory.html',
      pageCount: 2,
    },
    {
      id: 3,
      name: "Komputery",
      url: 'https://www.x-kom.pl/g-2/c/175-komputery-stacjonarne.html',
      pageCount: 2,
    },
    {
      id: 4,
      name: "Tablety",
      url: 'https://www.x-kom.pl/g-4/c/1663-tablety.html',
      pageCount: 2,
    },
    {
      id: 5,
      name: "Smartfony",
      url: 'https://www.x-kom.pl/g-4/c/22-smartfony.html',
      pageCount: 2,
    },
    {
      id: 6,
      name: "Drukarki",
      url: 'https://www.x-kom.pl/g-8/c/12-drukarki.html',
      pageCount: 2,
    },
  ];

  export const products = [
    {
      id: 1,
      name: "1",
      price: 10,
      img: "../photo2.jpg",
    },
    {
      id: 2,
      name: "1",
      price: 10,
      img: "../photo2.jpg",
    },
    {
      id: 3,
      name: "1",
      price: 10,
      img: "../photo2.jpg",
    },
    {
      id: 4,
      name: "1",
      price: 10,
      img: "../photo2.jpg",
    },
    {
      id: 5,
      name: "1",
      price: 10,
      img: "../photo2.jpg",
    },
    {
      id: 6,
      name: "1",
      price: 10,
      img: "../photo2.jpg",
    },
    {
      id: 7,
      name: "1",
      price: 10,
      img: "../photo2.jpg",
    },
    {
      id: 8,
      name: "1",
      price: 10,
      img: "../photo2.jpg",
    },
  ];

