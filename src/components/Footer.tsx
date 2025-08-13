import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-800 text-white py-8">
      <div className="container mx-auto text-center">
        &copy;{currentYear} Pet Service Request System - All rights reserved.
      </div>
    </footer>
  );
}
