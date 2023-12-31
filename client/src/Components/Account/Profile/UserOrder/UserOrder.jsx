import React, { useEffect } from "react";
import "./UserOrder.css";
import ProfileSideBar from "../ProfileSideBar";
import { NavLink } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserOrder } from "../../../../redux/actions/OrderAction";
import Loading from "../../../Loading/Loading";

const UserOrder = () => {
  const UserAllOrderData = useSelector((state) => state.order.UserAllOrderData);
  const orderLoading = useSelector((state) => state.order.orderLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoginUserOrder());
  }, []);

  return (
    <>
      {orderLoading ? (
        <Loading />
      ) : (
        <div className="profile">
          <div>
            <ProfileSideBar />
          </div>
          <div>
            <NavLink to="/profile">
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: " 6px 10px",
                  margin: "10px",
                }}
              >
                Profile
              </button>
            </NavLink>
            <h1 className="text-center mt-3 font-bold text-3xl">Your Order</h1>
            <div className="invintory_item">
              {/* ---------------- table  */}
              <table>
                <tr
                  style={{
                    borderTop: "2px solid red",
                    borderBottom: "2px solid red",
                  }}
                >
                  <th>id</th>
                  <th>price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {UserAllOrderData &&
                UserAllOrderData.length > 0 &&
                UserAllOrderData ? (
                  UserAllOrderData.map((item, index) => {
                    let cartTotal = 0;
                    item.cart.forEach((orderItem) => {
                      const totalPrice =
                        orderItem.discountPrice * orderItem.quantity + 2;
                      cartTotal += totalPrice;
                    });
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>

                        <td>${cartTotal}</td>
                        <td
                          style={
                            item.Orderstatus === "Processing"
                              ? { color: "red" }
                              : { color: "green" }
                          }
                        >
                          {item.Orderstatus}
                        </td>
                        <td>
                          <NavLink to={`/single/order/${item._id}`}>
                            <AiFillEye className="svg1" />
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p
                    className="seractdata"
                    style={{
                      marginTop: 10,
                      backgroundColor: "gray",
                      padding: 10,
                    }}
                  >
                    No Order Found
                  </p>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrder;
