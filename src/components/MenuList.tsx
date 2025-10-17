import { ChevronRight } from "lucide-react";
import type { MenuListType } from "../types/MenuList.type";

interface MenuListProps {
  currentItems: MenuListType[];
  onItemClick: (id: number) => void;
}

export const MenuList = ({ currentItems, onItemClick }: MenuListProps) => {
  return (
    <div className="space-y-2">
      {currentItems.map((item) => (
        <div 
          key={item.id} 
          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          onClick={() => item.children && onItemClick(item.id)}
        >
          {item.icon}
          <div className="flex-1">
            <h3 className="text-gray-900 font-medium">{item.name}</h3>
            {item.subTitle && (
              <p className="text-gray-500 text-sm">{item.subTitle}</p>
            )}
          </div>
          {item.children && (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      ))}
    </div>
  );
};
