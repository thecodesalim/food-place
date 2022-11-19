"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFormInput } from "../hooks/useFormInput";
import Input from "./Input";
const Entry = ({ isVisible }: { isVisible: Boolean }) => {
  const useInput = useFormInput("");
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Input
            type="text"
            placeholder="Restuarant"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              useInput.onChange(e.target.value)
            }
            value={useInput.value}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Entry;
