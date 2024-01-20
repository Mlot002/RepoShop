import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import cheerio from 'cheerio';

const Parser = () => {
  useEffect(() => {
    const pageCount = 2;
    const urls = [
      {
        url: 'https://www.x-kom.pl/g-2/c/159-laptopy-notebooki-ultrabooki.html',
        category: 'Laptopy',
      },
      {
        url: 'https://www.x-kom.pl/g-4/c/1590-smartfony-i-telefony.html',
        category: 'Smartfony',
      },
      {
        url: 'https://www.x-kom.pl/g-8/c/1117-telewizory.html',
        category: 'Telewizory',
      },
      {
        url: 'https://www.x-kom.pl/g-4/c/1663-tablety.html',
        category: 'Tablety',
      },
      {
        url: 'https://www.x-kom.pl/g-6/c/15-monitory.html',
        category: 'Monitory',
      },
      {
        url: 'https://www.x-kom.pl/g-6/c/6-drukarki.html',
        category: 'Drukarki',
      },
      {
        url: 'https://www.x-kom.pl/g-2/c/175-komputery-stacjonarne.html',
        category: 'Komputery',
      },
    ];

    const parserAsync = async (urlBase, pageCount, category) => {
      const div = "//div[@class='sc-1s1zksu-0 dzLiED sc-162ysh3-1 irFnoT']";
      const productsData = [];

      for (let i = 1; i <= pageCount; i++) {
        const url = `${urlBase}?page=${i}`;

        try {
          const response = await axios.get(url, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            },
          });
          const content = response.data;

          const $ = cheerio.load(content);
          const products = $(div);

          products.each((index, element) => {
            const name = $(element).find('h3').first().text().trim();
            const link = $(element).find('a').first().attr('href');
            const price = $(element)
              .find('span[data-name="productPrice"]')
              .first()
              .text()
              .trim();
            const image = $(element).find('img').first().attr('src');

            const productData = {
              name,
              link,
              price,
              image,
              category,
            };

            productsData.push(productData);
          });
        } catch (error) {
          console.error(error);
        }
      }

      return productsData;
    };

    const allProductsData = [];

    const parseAllCategories = async () => {
      for (const urlData of urls) {
        const productsData = await parserAsync(urlData.url, pageCount, urlData.category);
        allProductsData.push(...productsData);
      }

      onProductsParsed(allProductsData);
    };

    parseAllCategories();
  }, []);

  return <div></div>; // Placeholder component
};

export default Parser;