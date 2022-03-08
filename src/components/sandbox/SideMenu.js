import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, HomeOutlined, CrownOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useNavigate, useLocation } from "react-router";
import axios from 'axios'
import './index.css'
const { Sider } = Layout;

// const menuList = [
//     {
//         key: "/home",
//         title: "首页",
//         icon: <HomeOutlined />,
//     },
//     {
//         key: "/user-manage",
//         title: "用户管理",
//         icon: <UserOutlined />,
//         children: [
//             {
//                 key: "/user-manage/list",
//                 title: "用户列表",
//                 icon: <UserOutlined />,
//             },
//         ],
//     },
//     {
//         key: "/right-manage",
//         title: "权限管理",
//         icon: <CrownOutlined />,
//         children: [
//             {
//                 key: "/right-manage/role/list",
//                 title: "角色列表",
//                 icon: <CrownOutlined />,
//             },
//             {
//                 key: "/right-manage/right/list",
//                 title: "权限列表",
//                 icon: <CrownOutlined />,
//             },
//         ],
//     },
// ];

const iconList = {
    "/home": <HomeOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UserOutlined />,
    "/right-manage": <CrownOutlined />,
    "/right-manage/role/list": <CrownOutlined />,
    "/right-manage/right/list": <CrownOutlined />,
}

export default function SideMenu({ collapsed }) {
    let navigate = useNavigate();
    const [menu, setMenu] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/rights?_embed=children").then(res => {
            setMenu(res.data)
        })
    }, [])
    const checkPagePermission = (item) => {
        return item.pagepermission === 1
    }
    // Menu
    const renderMenu = (menuList) => {
        return menuList.map((item) => {
            if (item.children?.length > 0 && checkPagePermission(item)) {
                return (
                    <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
                        {renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return checkPagePermission(item) && <Menu.Item
                key={item.key}
                icon={iconList[item.key]}
                onClick={() => navigate(item.key)}
            >
                {item.title}
            </Menu.Item>

        });
    };
    let location = useLocation();
    const selectKeys = [location.pathname];
    const openKeys = ["/" + location.pathname.split("/")[1]];
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
                <div className="logo" >全球新闻发布管理系统</div>
                <div style={{ flex: 1, overflow: "auto" }}>
                    <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
                        {renderMenu(menu)}
                    </Menu>
                </div>
            </div>
        </Sider>
    );
}