# 📐 Ertodb – ER Diagram Designer (Frontend)

**Ertodb** is a web-based Entity-Relationship Diagram (ERD) builder that allows users to visually model database schemas. Built with **React.js**, it provides an intuitive drag-and-drop interface for creating entities, attributes, and relationships. It supports features like attribute typing, primary/foreign keys, diagram saving, and more.

---

## ✨ Features

- 🖱️ Drag-and-drop interface to build ER diagrams
- ➕ Add and customize entities and their attributes
- 🔑 Define primary keys, foreign keys, and data types
- 🔗 Connect entities with relationships (1:1, 1:N, N:M)
- 💾 Save diagrams per user (with backend integration)
- 🧾 Export diagram to SQL 
- 👤 JWT-based authentication for users 

---

## 🚀 Quick Start

### 🔧 Prerequisites

- Node.js ≥ 16
- npm or yarn

### 📦 Installation

```bash
git clone https://github.com/yourusername/ertodb.git
cd ertodb
npm install
npm start

```
### ERD
````
+----------------+         +----------------+         +----------------+
|     User       |         |    Diagram     |         |     Entity     |
+----------------+         +----------------+         +----------------+
| id (PK)        | 1     * | id (PK)        | 1     * | id (PK)        |
| name           |--------<| user_id (FK)   |--------<| diagram_id (FK)|
| email          |         | title          |         | name           |
| password_hash  |         | created_at     |         | x (canvas pos) |
+----------------+         +----------------+         | y (canvas pos) |
                                                   1/ +----------------+
                                                   /
                       +----------------+         /
                       |   Attribute    |        /
                       +----------------+       /
                       | id (PK)        |      /
                       | entity_id (FK) |     /
                       | name           |    / 
                       | type           | * /  
                       | isPrimaryKey   |  /   
                       | isNullable     |     
                       +----------------+     

````
### 🔐 Authentication

Backend with JWT support 

Diagrams are tied to authenticated users

Usage of  token-based requests for secured endpoints
