import { ChevronRight } from "lucide-react";
import type { MenuListType } from "../types/MenuList.type";

interface MenuListProps {
  currentItems: MenuListType[];
  onItemClick: (id: number) => void;
  navigationLevel: number;
}

export const MenuList = ({
  currentItems,
  onItemClick,
  navigationLevel,
}: MenuListProps) => {
  const handleKeyDown = (e: React.KeyboardEvent, item: MenuListType) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (item.children) {
        onItemClick(item.id);
      }
    }
  };

  return (
    <ul className="space-y-2" role="menu" aria-orientation="vertical">
      {currentItems.map((item) => {
        const hasChildren = Boolean(item.children);
        const menuItemId = `menu-item-${navigationLevel}-${item.id}`;

        return (
          <li key={item.id} role="none">
            <button
              id={menuItemId}
              type="button"
              role="menuitem"
              {...(hasChildren && {
                "aria-haspopup": "true",
                "aria-expanded": "false",
              })}
              aria-label={
                hasChildren
                  ? `${item.name}. ${
                      item.subTitle || ""
                    }. Has submenu, press Enter to open.`
                  : `${item.name}. ${item.subTitle || ""}`
              }
              className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-50 text-left"
              onClick={() => {
                if (hasChildren) onItemClick(item.id);
              }}
              onKeyDown={(e) => {
                if (hasChildren) handleKeyDown(e, item);
              }}
              tabIndex={0}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span className="flex-1">
                <span className="text-gray-900 font-medium block text-sm sm:text-base">
                  {item.name}
                </span>
                {item.subTitle && (
                  <span className="text-gray-500 text-xs sm:text-sm block">
                    {item.subTitle}
                  </span>
                )}
              </span>
              {hasChildren && (
                <ChevronRight
                  className="w-4 h-4 text-gray-400 mt-1 sm:mt-0"
                  aria-hidden="true"
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
