import { useState } from "react";

export const useAppModal = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleOpen = () => {
      setIsModalOpen(true);
   };

   const handleClose = () => {
      setIsModalOpen(false);
   };

   return {
      isModalOpen,
      handleOpen,
      handleClose
   }
}