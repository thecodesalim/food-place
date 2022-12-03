"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFormInput } from "../hooks/useFormInput";
import Button from "./Button";
import Input from "./Input";

const List = ({ isVisible, item }: { isVisible: Boolean; item: Function }) => {
  const useRestaurant = useFormInput("");
  const useMeal = useFormInput("");
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className=" flex flex-col"
        >
          <Input
            type="text"
            placeholder="title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              useRestaurant.onChange(e.target.value)
            }
            value={useRestaurant.value}
          />
          <Input
            type="text"
            placeholder="description"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              useMeal.onChange(e.target.value)
            }
            value={useMeal.value}
          />
          <div className=" pt-5">
            <Button
              hidden={false}
              title="Save"
              onClick={() =>
                item({ name: useRestaurant.value, meal: useMeal.value })
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default List;
