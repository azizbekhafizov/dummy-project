import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="border rounded p-4 hover:shadow-lg transition bg-white flex flex-col justify-between"
    >
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover mb-3 rounded"
        />
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2">
          {product.category.toUpperCase()}
        </p>
        <p className="font-bold text-blue-600">${product.price}</p>
      </div>

      <button
        onClick={handleAdd}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
