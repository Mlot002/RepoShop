# Dokumentacja Techniczna Projektu

## 1. Wprowadzenie

Dokumentacja techniczna przedstawia projekt strony internetowej, która umożliwia porównywanie cen produktów z dwóch różnych sklepów. Projekt wykorzystuje różne technologie, w tym JavaScript, React, Node.js, parser oraz backend z API napisane w .NET. Baza danych została zaimplementowana w MySQL, zlokalizowana w chmurze Azure.

## 2. Architektura Systemu

### 2.1. Frontend

Frontend strony został zbudowany przy użyciu technologii:

- JavaScript (ES6+)
- React.js

Aplikacja frontendowa jest odpowiedzialna za prezentację interfejsu użytkownika oraz interakcję z użytkownikiem. Komunikuje się z backendem za pomocą zapytań HTTP.

### 2.2. Backend

Backend składa się z trzech głównych części:

- **Parser**: Odpowiada za pobieranie danych z dwóch różnych sklepów internetowych i przetwarzanie ich do spójnej postaci, aby umożliwić porównanie cen.
- **API (.NET)**: Dostarcza interfejs do komunikacji z bazą danych oraz udostępnia endpointy dla frontendu do pobierania danych.
- **API (Node.JS)**: Dostarcza interfejs do komunikacji z bazą danych oraz udostępnia endpointy dla frontendu do pobierania danych.

### 2.3. Baza Danych

Baza danych została zaimplementowana w MySQL i znajduje się na chmurze Azure. Zawiera tabele przechowujące informacje o użytkownikach, produktach, ich cenach oraz inne istotne dane potrzebne do porównania.

## 3. Technologie

- JavaScript (ES6+): Język programowania użyty do tworzenia frontendu oraz części logiki biznesowej.
- React.js: Biblioteka JavaScript do budowania interfejsów użytkownika.
- Node.js: Środowisko uruchomieniowe JavaScript, wykorzystane do tworzenia backendu.
- .NET: Framework użyty do implementacji backendu oraz API.
- MySQL: System zarządzania relacyjnymi bazami danych, wykorzystany do przechowywania danych.
- Chmura Azure: Wykorzystana do hostowania bazy danych.

## 4. Konfiguracja Środowiska

### 4.1. Frontend

Wymagane narzędzia:

- Node.js (z npm)

Aby uruchomić projekt frontendowy:

1. Przejdź do katalogu `frontend`.
2. Uruchom `npm install` w celu zainstalowania wszystkich zależności.
3. Uruchom `npm start` aby uruchomić aplikację w trybie deweloperskim.

### 5.2. Backend

Wymagane narzędzia:

- Node.js
- .NET SDK

Aby uruchomić projekt backendowy:

1. Przejdź do katalogu `backend`.
2. Uruchom `npm install` w celu zainstalowania zależności dla Node.JS.
3. Uruchom `node server.js` aby uruchomić backend w Node.JS
4. Uruchom `dotnet run` aby uruchomić API (.NET).




# Dokumentacja Funkcjonalna Projektu

## 1. Wprowadzenie

Dokumentacja funkcjonalna przedstawia funkcje i możliwości dostępne na stronie internetowej umożliwiającej porównywanie cen produktów z dwóch różnych sklepów. Strona ta oferuje również funkcjonalności wyszukiwania, sortowania, dodawania produktów do ulubionych oraz opcję rejestracji i logowania.

## 2. Funkcje

### 2.1. Porównywanie Cen

Użytkownik ma możliwość porównywania cen produktów z dwóch różnych sklepów, prezentowanych w czytelnej formie, co umożliwia łatwe wybieranie najlepszej oferty.

### 2.2. Wyszukiwanie Produktów

Strona umożliwia wyszukiwanie produktów na podstawie nazwy lub kategorii, co ułatwia znalezienie interesujących produktów.

### 2.3. Sortowanie Produktów

Użytkownik może sortować produkty według kategorii lub nazwy, co ułatwia poruszanie się po stronie oraz szybkie odnalezienie potrzebnych informacji.

### 2.4. Dodawanie Produktów do Ulubionych

Użytkownik ma możliwość dodawania interesujących go produktów do listy ulubionych, co pozwala na szybki dostęp do nich w przyszłości.

### 2.5. Rejestracja i Logowanie

Strona zapewnia opcję rejestracji nowych użytkowników oraz logowania dla istniejących użytkowników, co umożliwia personalizację doświadczenia użytkownika oraz dostęp do dodatkowych funkcji, takich jak lista ulubionych produktów.

## 3. Interfejs Użytkownika

### 3.1. Strona Główna

Strona główna zawiera wyszukiwarkę produktów, listę produktów do porównania oraz opcje sortowania i filtracji.

### 3.2. Strona Produktu

Strona produktu wyświetla szczegółowe informacje na temat danego produktu, w tym ceny z obu sklepów, opinie użytkowników oraz opcję dodania do ulubionych.

### 3.3. Panel Użytkownika

Zalogowani użytkownicy mają dostęp do panelu użytkownika, gdzie mogą zarządzać swoim kontem, przeglądać listę ulubionych produktów oraz historię porównań.

## 4. Scenariusze Użycia

### 4.1. Porównanie Cen

1. Użytkownik wprowadza nazwę produktu do wyszukiwarki.
2. Wybiera interesujący produkt z wyników wyszukiwania.
3. Porównuje ceny produktu z dwóch różnych sklepów.

### 4.2. Dodanie Produktu do Ulubionych

1. Użytkownik znajduje produkt, który chce dodać do ulubionych.
2. Klikając odpowiedni przycisk na stronie produktu, dodaje produkt do listy ulubionych.

### 4.3. Rejestracja i Logowanie

1. Nowy użytkownik wchodzi na stronę rejestracji i wprowadza swoje dane.
2. Po potwierdzeniu rejestracji, loguje się na swoje konto za pomocą podanych danych.
