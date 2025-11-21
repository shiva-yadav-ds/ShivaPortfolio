import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";

const stats = [
  { title: "Projects Completed", value: 10, suffix: "+" },
  { title: "Years of Experience", value: 2, suffix: "+" },
  { title: "Technologies Mastered", value: 15, suffix: "+" },
  { title: "Code Commits", value: 500, suffix: "+" },
];

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
};

const Stats = () => {
  return (
    <div className={`mt-10 pb-10 flex flex-wrap justify-center gap-10`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="flex flex-col items-center justify-center p-5 bg-tertiary rounded-2xl border border-accent-cyan min-w-[150px]"
        >
          <h3 className="text-white text-[30px] font-bold flex">
            <CountUp end={stat.value} />
            {stat.suffix}
          </h3>
          <p className="text-secondary text-[14px] uppercase tracking-wider text-center">
            {stat.title}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default SectionWrapper(Stats, "");
