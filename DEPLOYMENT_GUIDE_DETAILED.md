# DDRiVE-M — Complete Beginner Deployment Guide
## From Your Computer → GitHub → Vercel (Live Website)

---

## WHAT YOU'RE DOING (Big Picture)

You have one file: **DDRiVEM.jsx** — your entire platform.

The goal is:
1. Wrap it in a proper React project on your computer
2. Upload it to GitHub (cloud storage for code)
3. Connect GitHub to Vercel (free web hosting that auto-publishes it)

---

## TOOLS YOU WILL USE

| Tool | What It Is | Where to Open It |
|------|-----------|-----------------|
| **Terminal** | A text-based window where you type commands to control your computer | Built into every computer — instructions below |
| **VS Code** | A free code editor — like Microsoft Word but for code | Download at https://code.visualstudio.com |
| **GitHub** | A website that stores your code online | https://github.com |
| **Vercel** | A website that turns your code into a live public URL | https://vercel.com |

---

## HOW TO OPEN YOUR TERMINAL

The Terminal is where you will type all the commands in this guide.

**On Windows:**
- Press the `Windows` key on your keyboard
- Type `cmd` and press Enter
- A black window opens — this is your Terminal (also called Command Prompt)
- Alternative: search for **PowerShell** and open that instead

**On Mac:**
- Press `Command + Space` on your keyboard
- Type `Terminal` and press Enter
- A white or black window opens

**On Linux:**
- Press `Ctrl + Alt + T`

> 💡 Every time this guide says "run this command" or shows a code block like `npm install`, you type that into the Terminal and press **Enter**.

---

## STEP 1 — INSTALL THE PREREQUISITES

You only do this once ever on your computer.

### Install Node.js
Node.js is the engine that runs React projects.

1. Go to https://nodejs.org
2. Click the big green button that says **LTS** (the recommended version)
3. Download and install it like any normal program (click Next → Next → Install)
4. When done, **open your Terminal** and type this to confirm it worked:

```
node --version
```

You should see something like `v20.11.0`. Any number is fine — it just means Node is installed.

### Install Git
Git is the tool that saves and uploads your code to GitHub.

1. Go to https://git-scm.com/downloads
2. Download the version for your operating system (Windows/Mac/Linux)
3. Install it (all default options are fine)
4. Confirm it worked — in your Terminal type:

```
git --version
```

You should see something like `git version 2.43.0`.

### Install VS Code (Code Editor)
1. Go to https://code.visualstudio.com
2. Download and install it
3. This is where you will view and edit your files — you don't strictly need it to deploy, but it helps you see what's happening

---

## STEP 2 — CHOOSE WHERE TO CREATE YOUR PROJECT

You need to decide **which folder on your computer** the project will live in.

A good location is your **Desktop** or a **Documents/Projects** folder.

**Example — create a Projects folder:**

In your Terminal, type these commands one at a time, pressing Enter after each:

**On Windows:**
```
cd Desktop
mkdir Projects
cd Projects
```

**On Mac/Linux:**
```
cd ~/Desktop
mkdir Projects
cd Projects
```

> 💡 `cd` means "change directory" (navigate into a folder). `mkdir` means "make directory" (create a new folder). After running these, your Terminal is now "inside" the Projects folder on your Desktop.

You can confirm where you are at any time by typing:
```
pwd
```
It will print something like `/Users/YourName/Desktop/Projects` — that's your current location.

---

## STEP 3 — CREATE THE REACT PROJECT

Still inside your Terminal (which should be in your Projects folder), run this command:

```
npm create vite@latest ddrive-m -- --template react
```

> 💡 This creates a new folder called `ddrive-m` inside Projects and fills it with a starter React app. `npm` is the package manager that came with Node.js.

When it asks questions:
- **Package name:** press Enter (accept default)
- **Framework:** React (use arrow keys to select, then Enter)
- **Variant:** JavaScript (not TypeScript)

Then run:
```
cd ddrive-m
```
(This navigates you into your new project folder.)

Then install the project's dependencies:
```
npm install
```
> 💡 This downloads all the code libraries the project needs. It may take 30–60 seconds. You'll see a lot of text scroll by — that's normal.

---

## STEP 4 — ADD YOUR PLATFORM FILE

Now you need to replace the default starter file with your **DDRiVEM.jsx** file.

### Where is your DDRiVEM.jsx file?
It was downloaded when you clicked the download link in this conversation. It's probably in your **Downloads** folder (or wherever your browser saves files).

### What to do:

**Option A — Using File Explorer (easiest):**
1. Open your file manager (Windows Explorer or Mac Finder)
2. Navigate to where you downloaded **DDRiVEM.jsx**
3. Navigate to your project folder: `Desktop → Projects → ddrive-m → src`
4. You will see a file called **App.jsx** already there
5. **Delete App.jsx**
6. **Copy DDRiVEM.jsx into the src folder**
7. **Rename DDRiVEM.jsx to App.jsx**

Your `src` folder should now contain:
- `App.jsx` ← your DDRiVE-M platform (renamed from DDRiVEM.jsx)
- `main.jsx` ← leave this alone, don't touch it
- `App.css` ← open this file and delete everything inside it (leave it empty)
- `index.css` ← open this file and delete everything inside it (leave it empty)

**Option B — Using Terminal commands:**
```
# Windows (adjust the path to where your file actually downloaded):
copy C:\Users\YourName\Downloads\DDRiVEM.jsx src\App.jsx

# Mac/Linux:
cp ~/Downloads/DDRiVEM.jsx src/App.jsx
```

Then empty the CSS files (Mac/Linux):
```
echo "" > src/App.css
echo "" > src/index.css
```

---

## STEP 5 — VERIFY IT WORKS ON YOUR COMPUTER

In your Terminal (make sure you're inside the `ddrive-m` folder — run `pwd` to check), type:

```
npm run dev
```

You'll see output like:
```
  VITE v5.x.x  ready in 400ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Now open your web browser (Chrome, Edge, Firefox) and go to:
```
http://localhost:5173
```

**You should see the DDRiVE-M platform running on your computer.**

> 💡 This is running *locally* — only visible on your computer. Nobody else can see it yet. To stop it, go back to Terminal and press `Ctrl + C`.

---

## STEP 6 — INITIALIZE GIT (Save Your Code History)

Git tracks every change you make to your code, like a save history.

Make sure your Terminal is still in the `ddrive-m` folder, then run these commands **one at a time**:

```
git init
```
> Creates a hidden Git tracker inside your project folder.

```
git add .
```
> Stages all your files (the dot `.` means "everything in this folder").

```
git commit -m "Initial commit — DDRiVE-M Platform v1.0"
```
> Takes a snapshot of your files with a label/message.

**First-time Git setup only** — if Git asks for your name and email, run these (replace with your real info):
```
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```
Then redo the `git commit` command above.

---

## STEP 7 — CREATE A GITHUB REPOSITORY

GitHub is the cloud storage for your code.

1. Go to https://github.com and sign in (or create a free account)
2. Click the **+** button in the top-right corner → **New repository**
3. Fill in:
   - **Repository name:** `ddrive-m`
   - **Description:** `DDRiVE-M AI Disaster Resilience Platform`
   - **Public** or **Private** (your choice)
   - ⚠️ Do NOT check "Add a README file" — leave all checkboxes empty
4. Click **Create repository**
5. GitHub will show you a page with setup instructions — look for the section that says **"…or push an existing repository from the command line"**
6. Copy and run those 3 lines in your Terminal. They look like this (with YOUR username):

```
git remote add origin https://github.com/YOUR_USERNAME/ddrive-m.git
git branch -M main
git push -u origin main
```

> 💡 This connects your local project to GitHub and uploads it. You may be asked to log in to GitHub in a browser popup — just approve it.

After this, refresh the GitHub page — you should see your files listed there.

---

## STEP 8 — DEPLOY TO VERCEL (Make It Live)

1. Go to https://vercel.com and sign in with your GitHub account (click "Continue with GitHub")
2. Click **Add New → Project**
3. You'll see a list of your GitHub repositories — find **ddrive-m** and click **Import**
4. Vercel automatically detects it's a Vite project and sets:
   - **Framework:** Vite ✓
   - **Build Command:** `npm run build` ✓
   - **Output Directory:** `dist` ✓
5. Click **Deploy**
6. Wait about 60 seconds
7. You'll see confetti 🎉 and a live URL like: `https://ddrive-m-abc123.vercel.app`

**Click that URL — your platform is now live on the internet.**

---

## STEP 9 — FUTURE UPDATES (How to Push Changes)

Every time you edit a file and want to update the live site:

```
git add .
git commit -m "What you changed"
git push
```

Vercel automatically detects the push and re-deploys in about 30 seconds. That's it.

---

## QUICK REFERENCE CARD

```
WHERE TO DO THINGS:
─────────────────────────────────────────────────────────
Steps 2–6        → Terminal (Command Prompt on Windows)
Step 4 file copy → File Explorer / Finder
Step 7           → https://github.com (website)
Step 8           → https://vercel.com (website)
After that       → Terminal for updates, Vercel for URL
─────────────────────────────────────────────────────────

KEY TERMINAL COMMANDS:
  cd FOLDER        → go into a folder
  cd ..            → go back one folder
  pwd              → show where you currently are
  ls               → list files in current folder (Mac/Linux)
  dir              → list files in current folder (Windows)
  npm run dev      → start local preview at localhost:5173
  npm run build    → build for production
  git add .        → stage all changes
  git commit -m "" → save snapshot with a message
  git push         → upload to GitHub (triggers Vercel redeploy)
```

---

## IF SOMETHING GOES WRONG

| Problem | Fix |
|---------|-----|
| `npm: command not found` | Node.js not installed — redo Step 1 |
| `git: command not found` | Git not installed — redo Step 1 |
| `Permission denied` on Mac | Add `sudo ` before the command |
| White screen at localhost:5173 | Check that App.css and index.css are empty |
| `git push` asks for password | Use a GitHub Personal Access Token — go to GitHub → Settings → Developer Settings → Personal Access Tokens |
| Vercel shows build error | In Vercel dashboard, click the failed deployment to see the error log |

---

*DDRiVE-M | ASilva Innovations | https://asilvainnovations.com*
