import { motion } from 'framer-motion';
import WeekSlider from './components/WeekSlider';
import './App.css';

function App() {
  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="app-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Sasha & Julia
      </motion.h1>
      <WeekSlider />
    </motion.div>
  );
}

export default App;
