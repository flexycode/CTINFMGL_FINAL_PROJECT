# 💫 CTINFMGL INFORMATION MANAGEMENT 

<!-- Background github cover with short introduction down below (I will change this BG picture after we finish the project) -->
<img src="https://github.com/flexycode/CTINFMGL/blob/main/asset/Information-Management.png" />

### Subject & Section: [CTINFMGL - COM231](https://www.youtube.com/watch?v=dQw4w9WgXcQ)     
### Professor: 👩 [Jensen A. Santillan](https://www.youtube.com/watch?v=Zi_XLOBDo_Y)                    
### No. of Units: [3 Units](https://www.youtube.com/watch?v=d_Z-neEBuWM) 
### Prerequisite: [CCDATRCL - Data Structure and Algorithm](https://github.com/flexycode/CCDATRCL)     
### Course Repo: [CTINFMGL - INFORMATION MANAGEMENT](https://github.com/flexycode/CTINFMGL) 

<!-- Table of contents down below -->
# 📊 Table of Contents

- [Introduction](#-introduction) 
- [Key Features](#-key-features)           
- [Folder Structure](#-folder-structure) 
- [Contributing](#-contributing)           
- [License](#-license)   
- [Acknowledgements](#-acknowledgements) 
- [FAQ](#-faq)       
- [Changelog](#-changelogs)   

<!-- Introduction down below -->
# 🧠 [Introduction](#introduction)

A flight booking web application designed to simplify the process of booking flights with the used of modern JavaScript techstacks

## 🏦 Case Study: Flight Booking App

Overview
The Flight Booking App is a web application designed to simplify the process of booking flights for users. The app allows users to search for flights, book tickets, manage their itineraries, and make payments seamlessly. The app also includes an admin panel for managing flights, users, and payments. The goal is to provide a user-friendly, efficient, and secure platform for flight bookings.

<!-- Key Features -->
## ✨ Key Features

🚀 1. **User Authentication:** Users can create accounts, log in, and manage their profiles.

🚀 2. **Flight Search:** Users can search for flights based on destination, departure time, and other criteria.

🚀 3. **Booking Management:** Users can book flights, view their bookings, and cancel or modify them.

🚀 4. **Payment Integration:** Secure payment gateway integration for processing payments.

🚀 5. **Admin Panel:** Admins can manage flights, users, and payments.

<!-- Techstacks down below (temporary need some proper decision for the group team in order to inlign for the project -->
## 💻 Techstacks
#### PERN STACK 
* **Frontend:** [React.js](https://react.dev/) or Next.js (JavaScript)
* **Backend:** [Node.js](https://nodejs.org/en) with [Express.js](https://expressjs.com/) or (Node.js framework)
* **Database:** [MySQL](https://www.mysql.com/) for flexible use of SQL
* **Authentication:** JWT (JSON Web Tokens)
* **Payment Gateway:** Stripe or PayPal ( Not required!)
* **State Management:** Redux or Context API
* **Styling:** CSS-in-JS (Styled-components) or Tailwind CSS
* **Deployment:** [Vercel](https://vercel.com/) (for Next.js) or [Heroku](https://www.heroku.com/) or [Dokploy](https://dokploy.com/#pricing)

## 🕵️ Resources
```
https://dokploy.com/#pricing)
```

# 💻 How to Run this Application

## 👷 Install Dependencies
Run npm install to to install node modules
```
npm install
```

## 🚀 Run React-app
Direct to frontend folder after you install the node modules
```
cd frontend
npm start
```

## 🚍 Run Node.js 
Open another terminal in the current codebase to run nodejs for VS Code or other IDE base on what you are using such as Webstorm
```
cd backend
node index.js
```

<!-- Front-End Overview -->
# 🚀 Screenshot of Project Overview

### 🌟 Design Overview

<!-- Front Page -->
<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/assets/Front%20Page.png" />

### 🌟 Search Flight

<!-- Search Flight -->
<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/assets/Search%20Flight.png" />

### 🌟 Background Video 

<!-- Background Video -->
<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/assets/Video%20Page.png" />


<!-- Database Schema Revision, Also image for Data Model and Entity Relationship Diagram ERD. Link should be point out through assets folder for editing README.md -->
## 🧊 Database Schema
#### SQL
```
See Database folder above
```
## 🧊 Data Insertion Example
sql
```
INSERT INTO `flights` (departure_city, arrival_city, flight_date, duration_hours, base_price, flight_status) VALUES
('New York', 'London', '2024-11-10', 7, 500.00, 'Full'),
('Los Angeles', 'Paris', '2024-11-11', 10, 900.00, 'Available');

INSERT INTO `users` (username, password_hash, role, email, phone_number) VALUES
('akosidogi', '$2b$10$yFTXogxecYrNSRLvFMb.dej4A4snSkHF72ZLItUjwrDFT16tlHCvK', 'admin', 'admin@example.com', '1234567890');

INSERT INTO `carts` (flight_id, user_id) VALUES
(1, 1);

INSERT INTO `seats` (flight_id, seat_number, class, status, seat_price) VALUES
(1, '1A', 'Economy', 'Available', 100.00),
(1, '1B', 'Economy', 'Booked', 100.00);

INSERT INTO `flight_names` (flight_id, region, name) VALUES
(1, 'Europe', 'Transatlantic Express');
```


<!-- Data Model Image link down below -->
# 🧊 Data Model
```
Description Coming Soon
```

## 🧊 Flow Chart

<!-- Flow Chart Image -->
<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/assets/Flow%20Chart.png" />

<!-- Entity Attribute Value Model Image link down below -->
## 🧊 Entity Attribute Value Model
```
Entity Attribute Value Model will be uploaded in this section file after 💥 Myckle Vince fininish the Normalization
```

<!-- Normalization link down below -->
## 🧊 Normalization

<!-- Normalization Images -->
<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/documentation/images/Normalization%20SS-1.png" />

<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/documentation/images/Normalization%20SS-2.png" />

<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/documentation/images/Normalization%20SS-3.png" />

```
Full Overview of Normalization is in the Folder of documentation
```

<!-- Entity Relationship Diagram Image link down below -->
## 🧊 Entity Relationship Diagram

<!-- ERD Image -->
<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/assets/Entity%20Relationship%20Diagram%20-%20ALA.png" />

<!-- Sequence Diagram Image link down below -->
## 🧊 Sequence Diagram

<!-- Sequence Diagram Image -->
<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/assets/Sequence%20Diagram.png" />

<!-- Cloud Architecture Image link down below -->
## 🧊 Cloud Architecture

<!-- Cloud Architecture Image -->
<img src="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT/blob/main/assets/Cloud%20Architecture.png" />

<!-- 📜 Folder Structure down below -->
# 📜 Folder Structure  
```
Coming Soon
```

<!-- 🏆 Contributers down below -->
# 🏆 Contributing     

### Contributing     
If you would like to contribute to the Flight Booking App, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

### 🧠 Submitting Changes

🧠 Contributions are welcome! If you have ideas for improvements or want to add more exercises, follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request. 💕💕💕💕

<!-- Contributors down below, kindly paste your github URL thanks and also you can revise your suited job title position -->
### 👋 Contributors
### Special thanks to all my groupmates: 
 * ####  😎 [Jay Arre Talosig](https://github.com/flexycode) - Machine Learning Engineer | Blockchain Developer | Bioinformatics Scientist    
 * ####  🧭 [Custer Valencerina](https://github.com/Cegeurun) - Machine Learning Engineer | Full Stack Engineer | Front-End Developer
 * ####  💥 [Myckle Vince Natividad](https://github.com/Kyelkyel) - Cybersecurity Forensic Engineer | Cloud Security Architect | Cyber Defense Forensic Analyst | Cybersecurity Scrum Master
 * ####  🎲 [Angelo Castillo](https://github.com/gabcsx) - Network Security Engineer | Machine Learning Engineer | Security Forensic Analyst
 * ####  🤖 [Neo Flores](https://github.com/moridin04) - Machine Learning Engineer | Network Engineer | DevOps Engineer
 * ####  🌟 [Yeshua Venezuela](https://github.com/Yesh01) - Cyber Intelligence Specialist | Software Engineer | UI / UX Designer | Digital Forensic Analyst

<!--  Reporting issues -->
### 🛸 Reporting Issues

```bash
Some changes need to be address
- Coming Soon
- Coming Soon
- Coming Soon
```

###### 🤖 If you encounter any issues or have suggestions, please open an issue to let us know.

<!--  License will provide soon -->
# 🔑 License     

```
Coming Soon In the License tab 
```
## National University of Manila License   

The National University of Manila License grants permission to students of the National University of Manila to use, modify, and distribute this project for educational purposes within the scope of their coursework and assignments.

### Usage 

- You may use this project as a reference or learning material for your studies at the National University of Manila.
- You may modify the project to suit your educational needs and requirements.
- You may share the project with your fellow students or instructors for educational purposes.

### Restrictions

- You may not use this project for commercial purposes.
- You may not redistribute or publish this project outside the National University of Manila without explicit permission.

## Disclaimer

This project is provided "as is" without warranty of any kind, express or implied. The National University of Manila and the project contributors disclaim any liability or responsibility for any direct, indirect, incidental, special, exemplary, or consequential damages arising out of the use or misuse of this project.


# 🔭 Acknowledgements     

<!--  Need to revise this background info of Professor Jensen A. Santillan  -->
### ✨ Professor
Professor Mrs. Jensen Santillan is a highly respected academic and industry practitioner. Her expertise spans a wide range of areas, including Data Analytics, Data Science, Data Analysis, Data Structures, and Information Management. As a distinguished faculty member at the College of Computing and Information Technology at National University, she shares her knowledge and skills with students.

### ✨ CCIT Dean
<!--  Need to revise this background info for Dean Yabut   -->
Your dedication to advancing knowledge in this field and your commitment to educating future professionals have been invaluable. Thank you for your guidance, support, and the wealth of information you have shared. Your efforts have greatly enriched this final project and will undoubtedly have a lasting impact on all who engage with this repository.



<!-- Always document your changes, pull-request, bugfix, updates, patch notes for this final project. Always use this "🧊 Flight Booking" for commiting message for "pushing code" or "Pull-request"   -->
# 📫 Changelogs 
Chronological list of updates, bug fixes, new features, and other modifications for our Flight Booking Appplication.

## 💻 [01.1.5] - 2024-01-29      
### Added
- 💻 Final Project requirements for our project
- ✨ Create a repository for this Flight Booking App
- ✨ Brainstorming for our Project requirements  
- ✨ Coming Soon 💻 🚀
- ✨ Coming Soon 🧠 🔑

## 💻 [01.1.1] - 2024-01-29
### Activity
- ✨ Brainstorming on what database should we use

## 💻 [01.1.1] - 2024-01-31
### Added
- ✨ Custer Uploaded ERD Diagram
    
## 💻 [10.1.1] - 2025-02-01
### Activity
- ✨ Angelo, Myckle, Neo revise the EAV model
- ✨ Uploaded the EAV model

## 💻 [01.1.1] - 2025-02-10
### Fix
- ✨ Fix Node modules for Flight Booking Client source codebase

## 💻 [01.1.2] - 2025-02-12
### Changes
- ✨ Fix EAV and Normalization
- ✨ Revise the Entity Attributes View model

## 💻 [01.1.2] - 2025-02-16
### Added
- ✨ FrontEnd (Client) for our Flight Booking 
### Changes
- ✨ Fix attributes for EAV and Normalization
- ✨ Revision for Backend and database

## 💻 [01.1.2] - 2025-02-21
### Added
- ✨ Revise ERD

## 💻 [01.1.2] - 2025-02-24
### Added
- ✨ Upload ERD
- ✨ Upload Screenshot for Flight Booking
- ✨ Push the Front-end folder
- ✨ Update Changelogs for Flight Booking

## 💻 [01.1.2] - 2025-02-24
### Added
- ✨ Upload Normalization

🧊 Flight Booking

<!-- This comment is intended for commiting message in pull-request 
Always use this "🧊 Flight Booking" for commiting message for "Pull-request"
<!-- End point line for this comment  -->

  
<!-- Introduction Pannel button link, it will redirect to the top -->
#### [Back to Table of Content](#-introduction)

<!-- End point line insert Thanks for visiting enjoy your day, feel free to modify this  -->
---
<p align="center">
<img src="https://readme-typing-svg.demolab.com/?lines=Thanks+For+Visiting+Enjoy+Your+Day+~!;" alt="mystreak"/>
</p>

<!-- Genshin Impact -->
<div align="center">
<img src="https://media.giphy.com/media/wcVQHVg5lYsCDkxz4J/giphy.gif?cid=ecf05e47yz4oc4o3pl85zwujqt2e6xumb1fhticxniefaqmu&ep=v1_stickers_search&rid=giphy.gif&ct=s" width="300">
</div>

<!-- End point line insert Comeback again next time, feel free to modify this  -->
<p align="center">
<img src="https://readme-typing-svg.demolab.com/?lines=💎💎Come+Back+Again+next+time💎💎" alt="mystreak"/>
</p>

</p>
    
<br>
<!-- End point insert background effect line of sight color red -->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="1000">


   
