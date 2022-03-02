import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, HomeOutlined, CrownOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useNavigate } from "react-router";
import axios from 'axios'
const { Sider } = Layout;

const menuList = [
    {
        key: "/home",
        title: "首页",
        icon: <HomeOutlined />,
    },
    {
        key: "/user-manage",
        title: "用户管理",
        icon: <UserOutlined />,
        children: [
            {
                key: "/user-manage/list",
                title: "用户列表",
                icon: <UserOutlined />,
            },
        ],
    },
    {
        key: "/right-manage",
        title: "权限管理",
        icon: <CrownOutlined />,
        children: [
            {
                key: "/right-manage/role/list",
                title: "角色列表",
                icon: <CrownOutlined />,
            },
            {
                key: "/right-manage/right/list",
                title: "权限列表",
                icon: <CrownOutlined />,
            },
        ],
    },
];

export default function SideMenu({ collapsed }) {
    useEffect(()=>{

    })
    let navigate = useNavigate();
    // Menu
    const renderMenu = (menuList) => {
        return menuList.map((item) => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => navigate(item.key)}
                >
                    {item.title}
                </Menu.Item>
            );
        });
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                {renderMenu(menuList)}
            </Menu>
        </Sider>
    );
}