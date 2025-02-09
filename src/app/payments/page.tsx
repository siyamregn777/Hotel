"use client";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from "./payments.module.css";

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState<"paypal" | "bank" | null>(null);

  // Handle bank payment (display bank details)
  const handleBankPayment = () => {
    alert(
      "Please transfer the payment to the following bank account:\n\n" +
        "Bank Name: Example Bank\n" +
        "Account Number: 123456789\n" +
        "Routing Number: 987654321\n" +
        "Please include your booking ID as the reference."
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Options</h1>
      <div className={styles.paymentOptions}>
        {/* PayPal Option */}
        <div
          className={`${styles.option} ${selectedOption === "paypal" ? styles.selected : ""}`}
          onClick={() => setSelectedOption("paypal")}
        >
          <h2>Pay with PayPal</h2>
          <p>Secure and fast payment through PayPal.</p>
          {selectedOption === "paypal" && (
            <PayPalScriptProvider
              options={{
                clientId: "AY3cVdkPkRGUIXNJTrN4Sb0wegu8acxT6nVsU5K52Q5pOuJwf1JCyJ7j4Y0bRD87-X5ZpWINJVD-fY04", // Replace with your PayPal client ID
                currency: "USD",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }} 
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          value: "100.00", // Replace with the actual amount
                          currency_code: "USD",
                        },
                        description: "Payment for Booking",
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  // Ensure actions.order is defined
                  if (!actions.order) {
                    return Promise.reject("Order not found");
                  }
                  
                  // Handle successful payment
                  return actions.order.capture().then((details) => {
                    alert(`Payment completed by ${details.payer?.name?.given_name || "a user"}`);
                    console.log("Payment details:", details);
                  });
                }}
                onError={(error) => {
                  console.error("PayPal error:", error);
                  alert("An error occurred during payment. Please try again.");
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>

        {/* Bank Transfer Option */}
        <div
          className={`${styles.option} ${selectedOption === "bank" ? styles.selected : ""}`}
          onClick={() => setSelectedOption("bank")}
        >
          <h2>Pay via Bank Transfer</h2>
          <p>Make a direct transfer to our bank account.</p>
          {selectedOption === "bank" && (
            <button className={styles.payButton} onClick={handleBankPayment}>
              View Bank Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;