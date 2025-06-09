// src/components/ui/card.jsx
import React from "react";

export const Card = ({ children }) => (
  <div className="bg-white rounded-xl shadow p-4">{children}</div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);
