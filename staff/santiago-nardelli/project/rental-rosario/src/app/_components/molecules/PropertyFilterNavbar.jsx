"use client";

import React from "react";
import usePropertyFilter from "../../hooks/usePropertyFilter.js";
import { Card } from "../ui/card.jsx";
import { Label } from "../ui/label.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select.jsx";
import { Button } from "../ui/button.jsx";

const PropertyFilterNavbar = () => {
  const { type, bedrooms, handleFilterChange, applyFilters, resetFilters } =
    usePropertyFilter();

  return (
    <Card className="w-full bg-secondary/10 rounded-md shadow-sm">
      <div className="p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="type" className="text-sm font-medium">
            Tipo:
          </Label>
          <Select
            value={type}
            onValueChange={(value) =>
              handleFilterChange({ target: { name: "type", value } })
            }
            className="w-full sm:w-[150px]"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="apartment">Apartamento</SelectItem>
              <SelectItem value="house">Casa</SelectItem>
              <SelectItem value="studio">Estudio</SelectItem>
              {/* Agrega más opciones de tipo según tus datos */}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="bedrooms" className="text-sm font-medium">
            Habitaciones:
          </Label>
          <Select
            value={bedrooms}
            onValueChange={(value) =>
              handleFilterChange({ target: { name: "bedrooms", value } })
            }
            className="w-full sm:w-[120px]"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="0">Estudio</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reintroduce el filtro de lugar si lo deseas */}
        {/* <div className="flex items-center space-x-2">
            <Label htmlFor="location" className="text-sm font-medium">Lugar:</Label>
            <Input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => handleFilterChange(e)}
              placeholder="Ingrese la ubicación"
              className="w-[200px]"
            />
          </div> */}

        <div className="flex justify-end space-x-2 ml-auto">
          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            className="text-sm"
          >
            Limpiar
          </Button>
          <Button type="button" onClick={applyFilters} className="text-sm">
            Aplicar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyFilterNavbar;
