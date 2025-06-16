import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard"; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=100");
        setProducts(res.data.products);
        setFiltered(res.data.products);
        setLoading(false);
      } catch (err) {
        console.error("Product fetch error:", err);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };

    fetchAll();
    fetchCategories();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, category, products]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat} value={cat}>
                {typeof cat === "string"
                  ? cat.charAt(0).toUpperCase() + cat.slice(1)
                  : ""}
              </option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
