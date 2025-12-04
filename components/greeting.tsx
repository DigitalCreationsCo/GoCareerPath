import { useGoldenRatio } from "@/hooks/use-golden-ratio";
import { motion } from "framer-motion";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export const greetingMessageParts = [
  "Welcome to GoCareerPath.",
  "Work is changing fast — automation is redefining every profession. \nFortunately, your experience has real value, and investing in the rights skills today will secure a stable, high-earning future.",
  "Answer a few short questions to get your Career Path Report and see which paths offer long-term security, strong demand, and higher income potential in the years ahead.",
];

export const Greeting = () => {
  const delays = useGoldenRatio(1.0, 1.7, greetingMessageParts.length);

  return (
    <div className="mx-auto mt-4 flex size-full flex-col justify-center px-2 space-y-4" key="overview">
      {greetingMessageParts.map((text, i) => (
        <motion.div
          key={i}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: delays[i] }}
          className={cn([
            'text-lg leading-snug flex',
            i === 0 ? "text-xl text-foreground" : "text-muted-foreground", 
          ])}
        >
          <div className="flex items-center float-left gap-2">
            {/* {i === 0 && <Logo />} */}
            {text}
          </div>
        </motion.div>
      ))}
    </div>
  );
};