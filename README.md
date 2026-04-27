# Rakoo – Multi-Cloud AI Analysis Platform

Projekt Rakoo je pokročilá webová platforma na analýzu dát pomocou umelej inteligencie, využívajúca hybridnú cloudovú infraštruktúru (**Azure + AWS**). Systém je kompletne kontajnerizovaný pomocou Dockeru a postavený na mikroservisnej logike.

## 🏗️ Architektúra systému (Hybrid Cloud)

Aplikácia je distribuovaná medzi dvoch najväčších poskytovateľov cloudu, aby sa využili silné stránky každej platformy:

### ☁️ Microsoft Azure (Aplikačná vrstva)
V prostredí Azure beží jadro aplikácie a používateľské dáta:
* **Frontend:** React.js aplikácia nasadená v rámci **Azure App Service** (Docker container).
* **Backend:** Flask (Python) API bežiace v **Azure App Service for Containers**, ktoré riadi biznis logiku a autentifikáciu.
* **Databáza:** **Azure Database for PostgreSQL (Flexible Server)** – spravovaná SQL databáza pre bezpečné ukladanie používateľských profilov a hashovaných hesiel.

### ☁️ Amazon Web Services - AWS (AI vrstva)
AWS je využívané na výpočtovo náročnú časť – predikciu:
* **AI Container:** Model (TensorFlow/Keras) je zabalený do Docker obrazu a nasadený ako **AWS Lambda Function**.
* **Serverless Inference:** Tento prístup umožňuje škálovať AI model na nulu, keď sa nepoužíva, čím sa šetria náklady pri zachovaní vysokej dostupnosti.

---

## 🛠️ Technické detaily komponentov

### 🔵 Backend & Bezpečnosť
- **Technológia:** Python 3.9 / Flask.
- **Autentifikácia:** Implementácia **JWT (JSON Web Tokens)**. Každá požiadavka na AI analýzu musí obsahovať platný Bearer token.
- **Šifrovanie:** Citlivé údaje (heslá) sú spracované knižnicou **Bcrypt**.

### 🟡 Frontend
- **Technológia:** React 18 s využitím moderných Hookov a **React Router DOM v6**.
- **Komunikácia:** Využíva asynchrónne volania na Azure API, ktoré následne preposiela dáta do AWS.

### 🟣 Databáza (PostgreSQL)
- **Schéma:** Obsahuje tabuľky pre `users` (id, email, password_hash, created_at) a logy analýz.

---

## 📡 Sieťová komunikácia a Tok dát (Data Flow)

1.  **Používateľ** nahrá obrázok cez React aplikáciu (Azure).
2.  **React** odošle obrázok spolu s JWT tokenom na **Flask Backend** (Azure).
3.  **Flask** overí identitu používateľa v **PostgreSQL** (Azure).
4.  Po úspešnom overení **Flask** vykoná zabezpečené HTTPS volanie na **AWS Lambda URL**.
5.  **AWS Lambda** spustí AI kontajner, spracuje obrázok a vráti výsledok (JSON) späť do Azure.
6.  **Backend** vráti finálnu odpoveď používateľovi.

---

## ⚙️ Inštalácia (Lokálny vývoj)

Všetky časti je možné spustiť naraz pomocou Docker Compose, čo simuluje cloudové prostredie:

```bash
docker-compose up --build


Momentálnu verziu ešte budem meniť ale zatiaľ vieme nahrávať súbory obrázkov a ukladajú sa do backend.
spustiť:docker compose up --build

Momentálne beží táto web aplikácia na: http://localhost:5174/

Backend -Flask,Frontend-React

Main kód ku Frontend je v súbore:frontend/src/App.jsx

Dataset som zatiaľ vybrala ale dala len link, kedže je dosť veľký ten dataset,tak musíme sa rozhodnúť či použijeme celý.
Potrebujeme si vybrať Cloud providera a publishnúť web,vybrať službu providera ,prepojiť na natrénovať na datasete,testovať a ďalej rozvíjať.
Hl.funkcia bude rozpoznanie či je obrázok deepfake alebo real.
