<h1>
  <img src="./public/favicon.ico" alt="Blogging website Logo" width="30" style="margin-right: 10px;">
  Blogging website
</h1>

**Blogging website** is a responsive and feature-rich web application that empowers users to create, explore, and interact with blogs across a wide range of topics. Whether you're sharing your thoughts, tutorials, or personal stories, this platform offers a clean, intuitive, and engaging experience for writers and readers alike.

## 🔥 Features

* 📝 **Rich Blog Editor** — Write blogs using a powerful, modern editor built with Tiptap.
* 🔐 **Secure Authentication** — Log in with Google or GitHub using NextAuth.
* 👤 **User Profiles** — View your own and others' profiles with listed blogs.
* 👏 **Clap System** — Readers can show appreciation for blogs they enjoy.
* 🔎 **Search Functionality** — Easily find blogs by title or author.
* 📃 **View Blogs** — Browse all published blogs in a clean, paginated feed.
* 📊 **Full Blog Management** — Create, read, update, and delete blog posts.
* 🛋️ **Responsive Design** — Optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack

* **Frontend**: Next.js + Tailwind CSS + Tiptap + TypeScript
* **Backend**: Next.js API Routes + Prisma
* **Database**: PostgreSQL
* **Authentication**: NextAuth.js (Google, GitHub OAuth)
* **Deployment**: Vercel

## 📂 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Ganapathi810/blogging-app.git
cd blogging-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file at the root:

```env
DATABASE_URL=your-postgresql-url
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Setup the Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the App

```bash
npm run dev
```

## 🧪 Routes Overview

### 🔐 Authentication

| Method   | Route            | Description          |
| -------- | ---------------- | -------------------- |
| GET/POST | /api/auth/signin | Sign in via provider |

### 🏠 Main Pages

| Route                       | Description         |
| --------------------------- | ------------------- |
| /                           | Home route          |
| /blogs/new                  | Create a new blog   |
| /blogs/\[slug]              | View a blog by slug |
| /blogs/\[slug]/edit         | Edit a blog         |
| /author/\[authorId]/profile | View author profile |

### 📁 API Endpoints

| Method | Endpoint                    | Description                          |
| ------ | --------------------------- | ------------------------------------ |
| GET    | /api/blog/\[slug]           | Fetch blog in client component       |
| GET    | /api/blog/search?query=slug | Fetch blogs matching query parameter |

> ✨ Auth-protected routes require a valid session via NextAuth.

---

## 👨‍💻 Made with 💙 by Ganapathi Othoju
