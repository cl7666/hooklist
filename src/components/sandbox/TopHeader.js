import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from "react-router";

const { Header } = Layout
export default function TopHeader() {
    let navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    function changeCollapsed() {
        return (
            setCollapsed(!collapsed)
        );
    }
    const { role: { roleName }, username } = JSON.parse(localStorage.getItem("token"))
    const menu = (
        <Menu>
            <Menu.Item>{roleName}</Menu.Item>
            <Menu.Item danger onClick={() => {
                localStorage.removeItem("token")
                navigate("/login");
            }}>退出登录</Menu.Item>
        </Menu>
    );
    return (
        <Header className="site-layout-background" style={{ padding: "0 16px" }}>
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }
            <div style={{ float: "right" }}>
                <span>欢迎{username}回来！</span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}