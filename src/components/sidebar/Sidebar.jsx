import React, { useState } from "react";
import "./sidebar.css";

import { NavLink } from "react-router-dom";

import {
  PeopleOutline,
  ContentPasteOutlined,
  StoreMallDirectoryOutlined,
  RoomService,
  SupportAgent,
  HomeRepairService,
  Home,
  BookOnline,
  Category,
  StarBorderPurple500,
  EqualizerOutlined,
  BusinessCenterOutlined,
  LiveHelp,
  Info,
  Gavel,
  Shield,
  FiberNew,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const user = useSelector((state) => state.userinfo.user);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <NavLink to="/dashboard">
            <div className="sidebarSelect">
              <div className="sidebarSelectHead">
                <EqualizerOutlined className="icon" />
                <span>Dashboard</span>
              </div>
            </div>
          </NavLink>
        </div>
        <hr></hr>
        <div className="sidebarMenu">
          <NavLink to="/users">
            <div className="sidebarSelect">
              <div className="sidebarSelectHead">
                <PeopleOutline className="icon" />
                <span>Users</span>
              </div>
            </div>
          </NavLink>
        </div>
        <hr></hr>
        <div className="sidebarMenu">
          <NavLink to="/products">
            <div className="sidebarSelect">
              <div className="sidebarSelectHead">
                <BusinessCenterOutlined className="icon" />
                <span>Products</span>
              </div>
            </div>
          </NavLink>
        </div>
        <hr></hr>
        <div className="sidebarMenu">
          <NavLink to="/loans">
            <div className="sidebarSelect">
              <div className="sidebarSelectHead">
                <FiberNew className="icon" />
                <span>Loans</span>
              </div>
            </div>
          </NavLink>
        </div>
        <hr></hr>
        <div className="sidebarMenu">
          <NavLink to="/notifications">
            <div className="sidebarSelect">
              <div className="sidebarSelectHead">
                <RoomService className="icon" />
                <span>Notifications</span>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
