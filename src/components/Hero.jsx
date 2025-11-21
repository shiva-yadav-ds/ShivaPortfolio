import { motion } from "framer-motion";

import { styles } from "../styles";
import { NeuralNetworkCanvas, FloatingConsole } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 pointer-events-none`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#00FFFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className="z-10 pointer-events-auto">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  duration: 1.25,
                  delay: 0.2,
                },
              },
            }}
          >
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm <span className='text-[#00FFFF]'>Shiva</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              Aspiring Data Scientist <br className='sm:block hidden' />
              and Problem Solver
            </p>
            <div className="mt-8 md:hidden flex justify-start">
              <FloatingConsole />
            </div>
          </motion.div>
        </div>
        
        <div className="hidden md:flex absolute right-10 lg:right-48 top-24 z-10 pointer-events-auto">
            <FloatingConsole />
        </div>
      </div>

      <div className="absolute inset-0 top-0 z-[-1] h-screen">
        <NeuralNetworkCanvas />
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
