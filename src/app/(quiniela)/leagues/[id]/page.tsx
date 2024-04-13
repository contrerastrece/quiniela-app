import React from "react";

const CategoryPage = ({ params }: any) => {
  const { id } = params;

  console.log(id);
  return (
    <div>
      {/* <Title title={`Articulos ${labels[id]}`} subtitle="Todos los productos" /> */}
      {/* <ProductGrid products={categoryFilter} /> */}
    </div>
  );
};

export default CategoryPage;
