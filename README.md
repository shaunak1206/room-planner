# 🏠 Room Builder

🌐 https://room-planner-beryl.vercel.app/

A 3D room-design web app built with **React**, **React Three Fiber**, and **@react-three/drei** that lets users place, rotate, and remove furniture and wall items in a virtual space. Built with:

- ⚛️ React for UI management
- 🎨 React Three Fiber for rendering Three.js in React
- 🛠️ @react-three/drei for helpers (OrbitControls, Html tooltips)
- 🕹️ Three.js as the 3D engine
- 🚀 Vercel for seamless deployment

---

## ✨ Features

- 🪑 Furniture: Place chair, table, sofa, bed, dresser, rug, desk+monitor, bookshelf, floor lamp
- 🖼️ Wall Items: Add painting, poster, pillar, clock
- 🔄 Manipulation: Select, rotate (snap-to-wall for wall items), and remove objects
- 🎥 Camera: Constrained orbit camera that stays inside room bounds
- 💡 Guidance: Alignment tooltip guides wall-mounted items into place
- 🎨 Customization: Live wall-color picker

---

## 🚀 Getting Started

### 1. Clone the repo 🛎️
```bash
git clone https://github.com/your-username/room-builder.git
cd room-builder
```

### 2. Install dependencies 📦
```bash
npm install
# or yarn install
```

### 3. Run in development mode 👩‍💻
```bash
npm start
# Open http://localhost:3000 in your browser.
```


## 📦 Deployment

### Deployment via Vercel Dashboard
 1. Push your code to GitHub.
 2. Log in at [Vercel](https://vercel.com/new) and import project.
 3. Framework preset: Create React App.
 4. Build command: npm run build
 5. Output dir: build
 6. Click Deploy.


### Deployment via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel       # follow prompts
vercel --prod
```


## 🎯 Usage

### Usage Instructions
1. **Select Item**: Click a furniture or wall-item button.
2. **Place Item**: Click on the floor or a wall.
3. **Select/Rotate/Remove**: Click an object; use Rotate or Remove.
4. **Snap Wall Items**: Rotate until tooltip disappears (snaps at 0°, 90°, 180°, 270°).
5. **Change Wall Color**: Use the color picker in the sidebar.


## 🗂️ Project Structure

```bash
room-builder/
├── public/
│   └── index.html         # HTML template
├── src/
│   ├── components/        # furniture & wall-item React components
│   ├── App.jsx            # main application logic
│   ├── index.jsx          # React entry point
│   └── styles.css         # global styles
├── .env                   # environment variables (ignored)
├── package.json           # project manifest
└── README.md              # this readme
```


## 🤝 Contributing


Contributions welcome! Fork, branch, commit, and open a PR:
```bash
git checkout -b feature/my-change
git commit -m "Add my feature"
git push origin feature/my-change
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://mit-license.org/) file for details


---

*Created by Shaunak Kapur*
