# VizFlow: High-Performance Data Visualization Dashboard

VizFlow is a Next.js 14+ application demonstrating how to build a high-performance, real-time dashboard capable of smoothly rendering and updating thousands of data points while maintaining a fluid user experience.

## ✨ Features

- **Real-time Data Stream**: Simulates a live data feed updating every 100ms.
- **Multiple Chart Visualizations**: Includes Line, Bar, and Scatter plots.
- **Interactive Controls**: Aggregate data by different time windows (raw, 1min, 5min, 1hr).
- **AI-Powered Performance Tuning**: An integrated AI assistant analyzes performance metrics (FPS, Memory) and suggests optimizations.
- **Responsive Design**: The dashboard is fully responsive and works across desktop, tablet, and mobile devices.
- **Modern Tech Stack**: Built with Next.js App Router, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 
- npm or yarn

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd vizflow-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project:
    ```.env.local
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000/dashboard`.

### Production Build

To run the app in production mode:

```bash
npm run build
npm start
```

## 🧪 Performance Testing

The dashboard includes a built-in performance monitor in the top-right corner, displaying:

- **FPS (Frames Per Second)**: Measures UI rendering smoothness. The target is 60 FPS.
- **Memory Usage**: Shows the estimated JavaScript heap size.

You can stress-test the application by:
1.  Letting it run for an extended period to monitor memory stability.
2.  Interacting with the aggregation controls to see how the UI responds to heavy data processing.
3.  Using the "Suggest Optimization" feature to see AI-powered recommendations based on live metrics.

## ✅ Browser Compatibility

VizFlow is tested and optimized for the latest versions of modern browsers:

- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

## 🛠️ Next.js Optimizations Used

- **App Router**: For improved routing, layout management, and Server Component capabilities.
- **Client Components (`'use client'`)**: Used for all interactive UI elements, enabling rich, client-side state and effects.
- **React `useTransition`**: Prevents the UI from blocking when changing data aggregation levels, which is a computationally intensive task.
- **React `useMemo`**: Memoizes expensive calculations, such as data aggregation and preparation for charts, to prevent re-computation on every render.
- **Component-Based Architecture**: The UI is broken down into modular components, leveraging `shadcn/ui` for a professional and accessible component library.
