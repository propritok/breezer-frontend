"use client";
import { HiFilter } from "react-icons/hi";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import React from "react";

interface CatalogFiltersProps {
  brands: string[];
  selectedBrands: string[];
  onChangeBrands: (values: string[]) => void;
}

const FiltersContent: React.FC<CatalogFiltersProps> = ({
  brands,
  selectedBrands,
  onChangeBrands,
}) => {
  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onChangeBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      onChangeBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[var(--secondary-color)]">
        Производители
      </h2>
      {brands.length > 0 ? (
        <ul className="space-y-2" aria-label="Фильтр по производителям">
          {brands.map((b) => {
            const isActive = selectedBrands.includes(b);
            return (
              <li key={b}>
                <button
                  type="button"
                  onClick={() => toggleBrand(b)}
                  className={`${
                    isActive
                      ? "text-[var(--secondary-color)] font-semibold"
                      : "text-gray-600"
                  } hover:text-[var(--secondary-color)] transition-colors`}
                >
                  {b}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">Производители не найдены</p>
      )}
    </div>
  );
};

export const CatalogFilters: React.FC<CatalogFiltersProps> = (props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden mb-4">
        <Button
          onPress={onOpen}
          className="bg-[var(--secondary-color)] text-white"
        >
          <HiFilter className="w-5 h-5" />
        </Button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="bg-white border-2 border-[var(--secondary-color)] rounded-lg p-4">
          <FiltersContent {...props} />
        </div>
      </aside>

      {/* Mobile drawer (modal styled as drawer) */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom">
        <ModalContent className="p-0 overflow-hidden rounded-t-2xl">
          <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE] px-6 py-4">
            <ModalHeader className="flex flex-col gap-1 p-0 text-white">
              Фильтры
            </ModalHeader>
          </div>
          <ModalBody className="p-6">
            <FiltersContent {...props} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CatalogFilters;
