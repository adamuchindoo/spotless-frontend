"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getLaundryOrders, updateLaundryOrder } from "@/services/auth";

/* ================= TYPES ================= */

type LaundryItem = {
  name: string;
  quantity: number;
  price: string;
  amount: string;
};

type LaundryOrder = {
  order_id: number;
  full_name: string;
  phone_number: string;
  total_cost: string;
  point: string | null;
  stage: string;
  payment_status: string;
  status: string;
  items: LaundryItem[];
};

export default function OrdersPage() {
  /* ================= STATES ================= */

  const [orders, setOrders] = useState<LaundryOrder[]>([]);

  const [loading, setLoading] = useState(false);

  const [openOrder, setOpenOrder] = useState<number | null>(null);

  /* ================= PAGINATION ================= */

  const [page, setPage] = useState(1);

  const [pageSize] = useState(5);

  const [totalPages, setTotalPages] = useState(1);

  const [hasNext, setHasNext] = useState(false);

  const [hasPrevious, setHasPrevious] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async (currentPage: number) => {
    try {
      setLoading(true);

      const res = await getLaundryOrders(currentPage, pageSize);

      setOrders(res.data);

      setTotalPages(res.num_pages);

      setHasNext(res.has_next);

      setHasPrevious(res.has_previous);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE ================= */

  const updateOrder = async (id: number) => {
    try {
      await updateLaundryOrder(id);

      toast.success("Order updated");

      fetchOrders(page);
    } catch (err: any) {
      toast.error(err.message || "Failed to update order");
    }
  };

  /* ================= TOGGLE ================= */

  const toggleOrder = (id: number) => {
    if (openOrder === id) {
      setOpenOrder(null);
    } else {
      setOpenOrder(id);
    }
  };

  /* ================= PAGINATION ================= */

  const nextPage = () => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevious) {
      setPage((prev) => prev - 1);
    }
  };

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-yellow-400 p-4 md:p-8">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 flex items-center gap-4">
          <img
            src="/logo.PNG"
            alt="Spotless Logo"
            width={70}
            height={70}
            className="rounded-2xl"
          />

          <div>
            <h1 className="text-3xl font-bold text-black">Laundry Orders</h1>

            <p className="text-gray-600">Manage and track all laundry orders</p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="bg-white rounded-3xl p-8 text-center">
            <p className="text-black text-xl font-semibold">
              Loading Orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center">
            <p className="text-black text-xl font-semibold">
              No laundry orders found
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order, orderIndex) => (
              <div
                key={`${order.order_id}-${orderIndex}`}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                {/* ORDER HEADER */}
                <div
                  onClick={() => toggleOrder(order.order_id)}
                  className="cursor-pointer p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* LEFT */}
                    <div>
                      <h2 className="text-xl font-bold text-black">
                        {order.full_name}
                      </h2>

                      <p className="text-gray-600">{order.phone_number}</p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-yellow-200 text-black px-4 py-2 rounded-2xl text-sm font-semibold">
                        ₦{order.total_cost}
                      </div>

                      <div className="bg-gray-200 text-black px-4 py-2 rounded-2xl text-sm capitalize">
                        {order.stage}
                      </div>

                      <div className="bg-black text-white px-4 py-2 rounded-2xl text-sm capitalize">
                        {order.payment_status}
                      </div>

                      <div className="bg-red-100 text-red-700 px-4 py-2 rounded-2xl text-sm capitalize">
                        {order.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* EXPANDED SECTION */}
                {openOrder === order.order_id && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    {/* INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <p className="text-gray-500 text-sm mb-1">
                          Order Stage
                        </p>

                        <p className="text-black font-bold capitalize">
                          {order.stage}
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <p className="text-gray-500 text-sm mb-1">
                          Reward Point
                        </p>

                        <p className="text-black font-bold">
                          {order.point || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* ITEMS */}
                    <div>
                      <h3 className="text-xl font-bold text-black mb-4">
                        Laundry Items
                      </h3>

                      <div className="space-y-3">
                        {order.items?.map((item, itemIndex) => (
                          <div
                            key={`${item.name}-${itemIndex}`}
                            className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm"
                          >
                            <div>
                              <p className="text-black font-semibold capitalize">
                                {item.name}
                              </p>

                              <p className="text-gray-600 text-sm">
                                Quantity: {item.quantity}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-black font-bold">
                                ₦{item.amount}
                              </p>

                              <p className="text-gray-500 text-sm">
                                ₦{item.price} each
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={() => updateOrder(order.order_id)}
                      className="mt-6 bg-black text-white px-6 py-3 rounded-2xl hover:opacity-90 transition font-semibold"
                    >
                      Update Order
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={prevPage}
                disabled={!hasPrevious}
                className={`px-5 py-3 rounded-2xl font-semibold ${
                  hasPrevious
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Previous
              </button>

              <div className="bg-white px-5 py-3 rounded-2xl text-black font-bold shadow">
                Page {page} of {totalPages}
              </div>

              <button
                onClick={nextPage}
                disabled={!hasNext}
                className={`px-5 py-3 rounded-2xl font-semibold ${
                  hasNext
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
