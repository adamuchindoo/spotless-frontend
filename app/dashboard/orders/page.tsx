"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

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
  created_at: string;
  items: LaundryItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<LaundryOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [openOrder, setOpenOrder] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

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

  const updateOrder = async (id: number) => {
    try {
      await updateLaundryOrder(id);
      toast.success("Order updated");
      fetchOrders(page);
    } catch (err: any) {
      toast.error(err.message || "Failed to update order");
    }
  };

  const toggleOrder = (id: number) => {
    setOpenOrder((prev) => (prev === id ? null : id));
  };

  const nextPage = () => {
    if (hasNext) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (hasPrevious) setPage((prev) => prev - 1);
  };

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
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                {/* ORDER HEADER */}
                <button
                  onClick={() => toggleOrder(order.order_id)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* LEFT */}
                    <div>
                      <h2 className="text-xl font-bold text-black">Date</h2>
                      <p className="text-gray-600">{order.created_at}</p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="bg-yellow-200 text-black px-4 py-2 rounded-2xl text-sm font-semibold">
                        ₦{order.total_cost}
                      </div>

                     <div className="bg-gray-200 text-black px-4 py-2 rounded-2xl text-sm">
  <span className="font-semibold">Stage:</span>{" "}
  <span className="capitalize">{order.stage}</span>
</div>

<div className="bg-black text-white px-4 py-2 rounded-2xl text-sm">
  <span className="font-semibold">Payment:</span>{" "}
  <span className="capitalize">{order.payment_status}</span>
</div>

<div className="bg-red-100 text-red-700 px-4 py-2 rounded-2xl text-sm">
  <span className="font-semibold">Status:</span>{" "}
  <span className="capitalize">{order.status}</span>
</div>

                      {/* EXPAND ICON */}
                      <ChevronDown
                        size={22}
                        className={`text-black transition-transform duration-300 ${
                          openOrder === order.order_id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

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
                        {order.items?.map((item, idx) => (
                          <div
                            key={`${item.name}-${idx}`}
                            className="bg-white rounded-2xl p-4 flex justify-between shadow-sm"
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
                    {order.stage === "review" && (
                      <button
                        onClick={() => updateOrder(order.order_id)}
                        className="mt-6 bg-black text-white px-6 py-3 rounded-2xl hover:opacity-90 transition font-semibold"
                      >
                        Confirm Order
                      </button>
                    )}
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

              <div className="bg-white px-5 py-3 rounded-2xl text-black font-bold shadow text-xs sm:text-sm md:text-base">
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
