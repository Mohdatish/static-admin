import "./card.css";
import {
  PermIdentityOutlined,
  BusinessCenterOutlined,
  RoomServiceOutlined,
  EventAvailableOutlined,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import Toptag from "../../components/topTag/Toptag";
import React, { useEffect, useState, useMemo, PureComponent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import APIFunction from '../../ApiFunction'
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../../slice/count";
import { getRequest } from "../../ApiFunction";
import API from "../../Api";
import {
  AreaChart,
  BarChart,
  Bar,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { visualization, visualizationBooking } from "../Function";
import moment from "moment";

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function Card() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState({
    userData: [],
    providerData: [],
    supportData: [],
    bookingData: [],
  });

  const [analysis, setAnalysis] = useState({
    user_analysis: [],
    business_analysis: [],
    service_analysis: [],
    booking_analysis: [],
    booking_overview: [],
  });

  const user = useSelector((state) => state.userinfo.user);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getCounts = async () => {
    try {
      const result = await getRequest(`${API.GET_COUNTS}`);
      if (!result.data.status) {
        if (result.data.code === 203) {
          toast.error(result.data.message);
          navigate("/");
          localStorage.clear();
        } else {
          toast.error(result.data.message);
        }
      } else {
        setAllData(result.data.data2);
        dispatch(setCount(result.data.data));
        localStorage.setItem("count", JSON.stringify(result.data.data));
        await delay(2000);
        getAnalysis();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAnalysis = async () => {
    try {
      const user_result = await visualization(allData.userData);
      const business_result = await visualization(allData.providerData);
      const service_result = await visualization(allData.serviceData);
      const support_result = await visualization(allData.supportData);
      const booking_result = await visualization(allData.bookingData);
      const booking_overview = await visualizationBooking(allData.bookingData);
      setAnalysis((prevDetails) => ({
        ...prevDetails,
        user_analysis: Object.values(user_result),
        business_analysis: Object.values(business_result),
        service_analysis: Object.values(service_result),
        booking_analysis: Object.values(booking_result),
        booking_overview: Object.values(booking_overview),
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const usersCount = useSelector((state) => state.count.counts?.userCount);

  const providersCount = useSelector(
    (state) => state.count.counts?.providerCount
  );
  const servicesCount = useSelector((state) => state.count.counts?.serviceCount);
  const supportCount = useSelector((state) => state.count.counts?.supportCount);
  const bookingCount = useSelector((state) => state.count.counts?.bookingCount);
  const categoryCount = useSelector(
    (state) => state.count.counts?.categoryCount
  );
  const reviewCount = useSelector((state) => state.count.counts?.reviewCount);

  useEffect(() => {
    getCounts();
    getAnalysis();
  }, [!isLoading]);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <div className="mt-4"></div>
          <div className="container mt-4">
            <div className="cardWrapper">
              <NavLink to="/users" className="link">
                <div
                  className="cardContainer"
                  style={{ backgroundColor: "#b8c0ff" }}
                >
                  <div className="d-flex flex-column m-3">
                    <span className="userCount">{usersCount}</span>
                    <span className="cardTitle">Total Users</span>
                  </div>
                  <div className="cardTopLogo">
                    <PermIdentityOutlined className="cardLogo" />
                  </div>
                </div>
              </NavLink>
              <NavLink to="/businesses" className="link">
                <div
                  className="cardContainer"
                  style={{ backgroundColor: "#bbd0ff" }}
                >
                  <div className="d-flex flex-column m-3">
                    <span className="userCount">{providersCount}</span>
                    <span className="cardTitle">Businesses</span>
                  </div>
                  <div className="cardTopLogo">
                    <BusinessCenterOutlined className="cardLogo" />
                  </div>
                </div>
              </NavLink>
              <NavLink to="/all-services" className="link">
                <div
                  className="cardContainer"
                  style={{ backgroundColor: "#e7c6ff" }}
                >
                  <div className="d-flex flex-column m-3">
                    <span className="userCount">{servicesCount}</span>
                    <span className="cardTitle">Services</span>
                  </div>
                  <div className="cardTopLogo">
                    <RoomServiceOutlined className="cardLogo" />
                  </div>
                </div>
              </NavLink>
              <NavLink to="/submitted-supports" className="link">
                <div
                  className="cardContainer"
                  style={{ backgroundColor: "#e0b1cb" }}
                >
                  <div className="d-flex flex-column m-3">
                    <span className="userCount">{supportCount}</span>
                    <span className="cardTitle">Support</span>
                  </div>
                  <div className="cardTopLogo">
                    <SupportAgent className="cardLogo" />
                  </div>
                </div>
              </NavLink>
              <NavLink to="/bookings" className="link">
                <div
                  className="cardContainer"
                  style={{ backgroundColor: "#f1faee" }}
                >
                  <div className="d-flex flex-column m-3">
                    <span className="userCount">+{bookingCount}</span>
                    <span className="cardTitle">Bookings</span>
                  </div>
                  <div className="cardTopLogo">
                    <EventAvailableOutlined className="cardLogo" />
                  </div>
                </div>
              </NavLink>
              <NavLink to="/service-category" className="link">
                <div
                  className="cardContainer"
                  style={{ backgroundColor: "#f79d65" }}
                >
                  <div className="d-flex flex-column m-3">
                    <span className="userCount">{categoryCount}</span>
                    <span className="cardTitle">Categories</span>
                  </div>
                  <div className="cardTopLogo">
                    <ClassOutlined className="cardLogo" />
                  </div>
                </div>
              </NavLink>
              <NavLink to="/ratings" className="link">
                <div
                  className="cardContainer"
                  style={{ backgroundColor: "#cdb4db" }}
                >
                  <div className="d-flex flex-column m-3">
                    <span className="userCount">{reviewCount}</span>
                    <span className="cardTitle">Rating & Reviews</span>
                  </div>
                  <div className="cardTopLogo">
                    <ReviewsOutlined className="cardLogo" />
                  </div>
                </div>
              </NavLink>
            </div>
          </div> */}
          <div className="card-section">
            <div className="">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="d-flex flex-wrap gap-4">
                    <NavLink to="/users" className="link">
                      <div className="new-white-x">
                        <div className="w-100 d-flex justify-content-between">
                          <div className="d-flex flex-column">
                            <span className="userCount">{usersCount}</span>
                            <span className="cardTitle">Total Users</span>
                          </div>
                          <PermIdentityOutlined className="cardLogo mt-2 mb-3" />
                        </div>
                        <AreaChart
                          width={300}
                          height={150}
                          data={analysis.user_analysis}
                        >
                          <XAxis
                            dataKey="format_date"
                            style={{ fontSize: "12px" }}
                          />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#b5838d"
                            fill="#e5989b"
                          />
                        </AreaChart>
                        <div className="text">Last 7 days update.</div>
                      </div>
                    </NavLink>
                    <NavLink to="/businesses" className="link">
                      <div className="new-white-x">
                        <div className="w-100 d-flex justify-content-between">
                          <div className="d-flex flex-column">
                            <span className="userCount">{providersCount}</span>
                            <span className="cardTitle">Businesses</span>
                          </div>
                          <BusinessCenterOutlined className="cardLogo mt-2 mb-3" />
                        </div>
                        <AreaChart
                          width={300}
                          height={150}
                          data={analysis.business_analysis}
                        >
                          <CartesianGrid strokeDasharray="3 3" />

                          <XAxis
                            dataKey="format_date"
                            style={{ fontSize: "12px" }}
                          />
                          <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#81b29a"
                            fill="#a8dadc"
                          />
                        </AreaChart>
                        <div className="text">Last 7 days update.</div>
                      </div>
                    </NavLink>
                    <NavLink to="/bookings" className="link">
                      <div className="new-white-x">
                        <div className="w-100 d-flex justify-content-between">
                          <div className="d-flex flex-column">
                            <span className="userCount">+{bookingCount}</span>
                            <span className="cardTitle">Bookings</span>
                          </div>
                          <EventAvailableOutlined className="cardLogo mt-2 mb-3" />
                        </div>
                        <BarChart
                          width={300}
                          height={150}
                          data={analysis.booking_analysis}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="format_date"
                            style={{ fontSize: "12px" }}
                          />
                          <Bar dataKey="count" fill="#4361ee" barSize={15} />
                        </BarChart>
                        <div className="text">Last 7 days update.</div>
                      </div>
                    </NavLink>
                    <NavLink to="/all-services" className="link">
                      <div className="new-white-x">
                        <div className="w-100 d-flex justify-content-between">
                          <div className="d-flex flex-column">
                            <span className="userCount">{servicesCount}</span>
                            <span className="cardTitle">Services</span>
                          </div>
                          <RoomServiceOutlined className="cardLogo mt-2 mb-3" />
                        </div>
                        <LineChart
                          width={300}
                          height={150}
                          data={analysis.service_analysis}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="format_date"
                            style={{ fontSize: "12px" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#720026"
                            strokeWidth={2}
                          />
                        </LineChart>
                        <div className="text">
                          Last update of service added.
                        </div>
                      </div>
                    </NavLink>
                    <div
                      className="new-white-x"
                      style={{ height: "auto" }}
                    >
                      {analysis.booking_overview.map((element, index) => {
                        return(
                        <>
                          <div className="text"  key={index}>{element.name}</div>
                          <div
                           
                            className="progress mb-3"
                            role="progressbar"
                            aria-label="Success example"
                            aria-valuenow={element.count}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className={`progress-bar ${
                                element.name === "completed"
                                  ? "bg-success"
                                  : element.name === "accepted"
                                  ? "bg-info"
                                  : element.name === "rejected"
                                  ? "bg-warning"
                                  : element.name === "expired"
                                  ? "bg-danger"
                                  : ""
                              }`}
                              style={{ width: element.count }}
                            >
                              {element.count}
                            </div>
                          </div>
                        </>
                        )
                      })}
                      {/* <div className="text">Last 7 days update.</div> */}
                    </div>
                  </div>
                </div>
             
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
