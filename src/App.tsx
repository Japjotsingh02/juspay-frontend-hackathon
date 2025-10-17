import { Drawer } from "vaul";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MenuData } from "./constants/menuData";
import { ChevronLeft } from "lucide-react";
import { MenuList } from "./components/MenuList";
import type { MenuListType } from "./types/MenuList.type";

export default function MenuDrawer() {
  const [navigationPath, setNavigationPath] = useState<number[]>([]);
  
  const findMenuItem = (items: MenuListType[], id: number): MenuListType | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findMenuItem(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const getCurrentItems = (): MenuListType[] => {
    if (navigationPath.length === 0) return MenuData;
    const lastIndex = navigationPath.length - 1;
    
    const lastId = navigationPath[lastIndex];
    const currentItem = findMenuItem(MenuData, lastId);
    return currentItem?.children || [];
  };

  const handleItemClick = (id: number) => {
    const item = findMenuItem(MenuData, id);
    if (item?.children) {
      setNavigationPath([...navigationPath, id]);
    }
  };

  const handleBack = () => {
    setNavigationPath(navigationPath.slice(0, -1));
  };

  const currentItems = getCurrentItems();
  const isSubMenu = navigationPath.length > 0;

  return (
    <div className="font-inter h-screen flex items-center justify-center">
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger className="bg-blue-500 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-blue-700 transition">
          Open Menu
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            <Drawer.Content
              className="
                fixed bottom-0 left-0 right-0
                bg-white rounded-3xl
                shadow-lg
                max-h-[85vh] overflow-y-auto
                scrollbar-hide
                p-4
                m-4
                flex flex-col
              "
            >
            <AnimatePresence mode="wait">
              <motion.div
                key={navigationPath.join('-') || 'main'}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.15, ease: [0.32, 0.72, 0, 1] }}
              >
                {isSubMenu && (
                  <button
                    className="text-sm mb-4 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition p-3 rounded-xl"
                    onClick={handleBack}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="font-medium">Back</span>
                  </button>
                )}
                
                <MenuList currentItems={currentItems} onItemClick={handleItemClick} />
              </motion.div>
            </AnimatePresence>
            </Drawer.Content>
          </motion.div>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
