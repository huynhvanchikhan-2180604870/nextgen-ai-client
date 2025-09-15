# NextGenAI Frontend - Tech Universe 🚀

Giao diện frontend cho nền tảng **NextGenAI** - Hành tinh Code & AI với thiết kế Space Tech Universe ấn tượng.

## ✨ Tính năng

### 🌟 **Space Tech Universe Theme**

- Thiết kế vũ trụ công nghệ với hiệu ứng neon, hologram
- Glassmorphism và backdrop blur effects
- Gradient colors và neon glow animations
- Responsive design cho mọi thiết bị

### 🏠 **Launch Zone (Home Page)**

- AI Typing Loader với animation gõ chữ
- 3D Spaceship bay qua code galaxy
- Hero section với slogan "Build, Buy, Imagine with AI + Source"
- Code snippets và project cards xuất hiện từ các ngôi sao

### 🪐 **Code Marketplace (Explore)**

- Projects hiển thị dưới dạng hành tinh 3D tương tác
- Hover effects làm hành tinh xoay và phát sáng
- Filters dạng "constellations" của tags
- Search và sort functionality

### 🤖 **AI Planner Hub**

- Giao diện hologram AI room
- Chat interactions hiển thị trên floating hologram cards
- Real-time WebSocket communication
- Analysis functions với 3D light grids

### 📖 **Project Storybook**

- 3D flip-book interface
- Cover page với logo + description
- Screenshots + live preview
- "Unlock code" button với safe-opening animation

### 💎 **My Vault**

- Glass neon storage room interface
- Projects dạng glowing cubes
- Unlock animation như mở capsule
- User's purchased projects

### 📊 **Control Center (Dashboard)**

- Neon radar system design
- Live moving graphs cho revenue, downloads, trends
- AI bubbles với suggestions
- User profile và wallet management

## 🛠️ **Công nghệ sử dụng**

- **React 19.1.1** - Framework chính
- **Vite 7.1.2** - Build tool
- **Three.js + React Three Fiber** - 3D rendering
- **Framer Motion** - Animations
- **TailwindCSS** - Styling với custom theme
- **Zustand** - State management
- **React Query** - Data fetching
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Router DOM** - Routing

## 📁 **Cấu trúc dự án**

```
src/
├── components/
│   ├── 3d/              # 3D components
│   │   ├── SpaceScene.jsx
│   │   ├── PlanetMarketplace.jsx
│   │   └── HologramAI.jsx
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout components
│   └── ui/              # UI components
├── pages/
│   ├── auth/            # Auth pages
│   ├── dashboard/       # Dashboard pages
│   ├── Home.jsx         # Launch Zone
│   ├── Explore.jsx      # Code Marketplace
│   ├── AIPlanner.jsx    # AI Planner Hub
│   └── ProjectDetail.jsx # Project Storybook
├── services/            # API services
├── stores/              # Zustand stores
├── hooks/               # React Query hooks
└── config/              # Configuration
```

## 🚀 **Cài đặt và chạy**

### 1. **Clone repository**

```bash
git clone <repository-url>
cd nextgen-ai-app
```

### 2. **Cài đặt dependencies**

```bash
npm install
```

### 3. **Thiết lập environment variables**

```bash
cp env.example .env
```

Chỉnh sửa file `.env` với các thông tin của bạn:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=http://localhost:5001
```

### 4. **Chạy development server**

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### 5. **Build cho production**

```bash
npm run build
```

### 6. **Preview production build**

```bash
npm run preview
```

## 🎨 **Custom Theme**

### **Colors**

- **Neon Blue**: `#00f5ff` - Primary neon color
- **Neon Purple**: `#bf00ff` - Secondary neon color
- **Neon Green**: `#00ff41` - Accent neon color
- **Dark**: `#0f172a` to `#334155` - Background gradients

### **Fonts**

- **Display**: Orbitron - Futuristic headers
- **Sans**: Inter - Body text
- **Mono**: JetBrains Mono - Code snippets

### **Animations**

- `glow` - Neon glow effect
- `float` - Floating animation
- `pulse-slow` - Slow pulse effect
- `typewriter` - Typing animation
- `blink` - Cursor blink

## 🔧 **Scripts**

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 📱 **Responsive Design**

- **Mobile First**: Thiết kế ưu tiên mobile
- **Breakpoints**: xs, sm, md, lg, xl, 2xl, 3xl
- **Touch Friendly**: Optimized cho touch interactions
- **Performance**: Lazy loading và code splitting

## 🌐 **Browser Support**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 **Performance**

- **Lazy Loading**: Components và routes
- **Code Splitting**: Automatic với Vite
- **Image Optimization**: WebP support
- **Caching**: Service worker ready
- **Bundle Size**: Optimized với tree shaking

## 🔒 **Security**

- **XSS Protection**: Sanitized inputs
- **CSRF Protection**: Token-based
- **Content Security Policy**: Implemented
- **Secure Headers**: Production ready

## 📈 **SEO Optimized**

- **Meta Tags**: Comprehensive meta information
- **Open Graph**: Social media sharing
- **Twitter Cards**: Twitter optimization
- **Structured Data**: JSON-LD schema
- **Sitemap**: Auto-generated

## 🎮 **3D Features**

- **Three.js Integration**: Full 3D scene support
- **Interactive Objects**: Clickable 3D elements
- **Animations**: Smooth 3D transitions
- **Performance**: Optimized rendering
- **Mobile Support**: Touch controls

## 🤝 **Contributing**

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 **License**

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 **Team**

- **Frontend Developer**: NextGenAI Team
- **UI/UX Designer**: Space Universe Design
- **3D Artist**: Tech Galaxy Creative

---

**Made with ❤️ by NextGenAI Team** 🚀✨
