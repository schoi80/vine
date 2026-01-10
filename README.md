# In the Vine (포도나무 안에서) 🍇

A comprehensive bilingual (English/Korean) Bible reading companion powered by a **Neo4j Knowledge Graph**. Explore Scripture not just as text, but as a rich web of interconnected people, places, and historic events.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Neo4j](https://img.shields.io/badge/Neo4j-Graph_DB-blue)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-pink)

---

## ✨ Features

- **📖 Contextual Reading**: Read the Bible with real-time entity highlighting. See exactly which people, places, and events are mentioned in every verse.
- **🇰🇷 Bilingual Support**: Seamlessly switch between English and Korean across the entire interface and Scripture text.
- **🕸️ Knowledge Graph**: Navigate the complex relationships of the Bible. Explore family trees, event timelines, and geographic locations.
- **🗺️ Interactive Maps**: Visualize the travels and locations mentioned in the Word using integrated mapping tools.
- **⏳ Living Timeline**: Trace the history of redemption through an interactive event timeline.
- **🎨 Premium UI**: A modern, responsive interface built with Tailwind CSS v4 and Framer Motion for smooth, meaningful transitions.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [Neo4j](https://neo4j.com/) (Graph Database)
- **API**: [Apollo Server](https://www.apollographql.com/docs/apollo-server/) & [GraphQL](https://graphql.org/)
- **Visualizations**: [React Leaflet](https://react-leaflet.js.org/) (Maps), [D3.js](https://d3js.org/) (Graphs), [Framer Motion](https://www.framer.com/motion/) (Animations)
- **Testing**: [Vitest](https://vitest.dev/) & [Storybook](https://storybook.js.org/)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS)
- Neo4j Database (Local or Aura)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/schoi80/vine.git
   cd vine
   ```

2. **Install dependencies**:

   ```bash
   make install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root:

   ```env
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/api/graphql
   NEO4J_URI=neo4j://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=your_password
   ```

4. **Run the development server**:
   ```bash
   make dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📂 Project Structure

The project follows a modern Next.js `src` directory layout:

```text
vine/
├── src/
│   ├── app/            # Next.js App Router (Pages & API)
│   ├── components/     # Reusable UI components (Feature-based)
│   ├── lib/            # Core logic (Apollo, Neo4j, Utils)
│   ├── types/          # TypeScript definitions
│   └── stories/        # Storybook UI components documentation
├── public/             # Static assets
├── .storybook/         # Storybook configuration
└── Makefile            # Shortcut commands for development
```

---

## 🧪 Development & Quality

- **Storybook**: `make storybook` - View and develop components in isolation.
- **Linting**: `make lint` - Run ESLint checks.
- **Formatting**: `make format` - Auto-format code with Prettier.
- **Testing**: `npm test` - Run unit and component tests with Vitest.
- **Type Check**: `make typecheck` - Run TypeScript compiler checks.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for the Kingdom.
