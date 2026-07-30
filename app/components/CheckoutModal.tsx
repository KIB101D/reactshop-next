"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import PaymentLoading from "./PaymentLoading";
import PaymentSuccess from "./PaymentSuccess";
import ModalWrapper from "./ModalWrapper";

type PaymentStatus = "idle" | "loading" | "success";

type CheckoutModalProps = {
  onClose: () => void;
  subtotal: number;
  shipping: number;
  total: number;
  itemsCount: number;
  removeAllFromCart: () => void;
};

function CheckoutModal({
  onClose,
  subtotal,
  shipping,
  total,
  itemsCount,
  removeAllFromCart,
}: CheckoutModalProps) {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const router = useRouter();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Чистимо таймер, якщо компонент закрився раніше
  useEffect(() => {
    return () => clearTimer();
  }, []);

  const handleContinue = () => {
    clearTimer();
    router.push("/");
  };

  const handlePay = () => {
    if (status !== "idle") return;
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      removeAllFromCart();

      timeoutRef.current = setTimeout(() => {
        router.push("/");
      }, 3000);
    }, 1500);
  };

  return (
    <ModalWrapper onClose={onClose} canClose={status === "idle"}>
      {status === "idle" && (
        <CheckoutForm
          handlePay={handlePay}
          onClose={onClose}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          itemsCount={itemsCount}
        />
      )}
      {status === "loading" && <PaymentLoading />}
      {status === "success" && <PaymentSuccess onContinue={handleContinue} />}
    </ModalWrapper>
  );
}

export default CheckoutModal;
